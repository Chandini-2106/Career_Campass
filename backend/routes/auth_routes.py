from flask import Blueprint, request, jsonify
from database import db
from models.schema import User
import json

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required.'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'An account with this email already exists.'}), 400

    # Role assignment: admin if email contains admin@ai.com or first user
    role = 'admin' if ('admin' in email or User.query.count() == 0) else 'user'

    new_user = User(
        name=name,
        email=email,
        password=password,  # In production, use werkzeug.security generate_password_hash
        role=role
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'message': 'Account created successfully!',
        'user': new_user.to_dict(),
        'token': f"mock-jwt-token-for-user-{new_user.id}"
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({'error': 'Invalid email or password credentials.'}), 401

    return jsonify({
        'message': 'Login successful!',
        'user': user.to_dict(),
        'token': f"mock-jwt-token-for-user-{user.id}"
    }), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()

    if not email:
        return jsonify({'error': 'Please provide a valid email address.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'No account associated with this email.'}), 404

    return jsonify({
        'message': 'Password reset link sent to your email address.'
    }), 200

@auth_bp.route('/profile', methods=['GET'])
def profile():
    user_id = request.args.get('user_id', 1, type=int)
    user = User.query.get(user_id)
    if not user:
        # Fallback default user if not logged in
        user = User.query.first()
        if not user:
            user = User(name="Alex Morgan", email="alex.morgan@ibm.com", password="password123", role="user")
            db.session.add(user)
            db.session.commit()

    return jsonify({
        'user': user.to_dict()
    }), 200
