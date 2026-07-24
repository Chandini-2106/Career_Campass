from flask import Blueprint, request, jsonify, Response
from database import db
from models.schema import User, PredictionHistory, SavedCareer
import csv
import io

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/users', methods=['GET'])
def list_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({
        'users': [u.to_dict() for u in users]
    }), 200

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': f"User #{user_id} deleted successfully."}), 200

@admin_bp.route('/predictions', methods=['GET'])
def list_all_predictions():
    predictions = PredictionHistory.query.order_by(PredictionHistory.created_at.desc()).limit(50).all()
    results = []
    for p in predictions:
        p_dict = p.to_dict()
        user = User.query.get(p.user_id)
        p_dict['user_name'] = user.name if user else 'Unknown Candidate'
        p_dict['user_email'] = user.email if user else 'N/A'
        results.append(p_dict)

    return jsonify({
        'predictions': results
    }), 200

@admin_bp.route('/export-csv', methods=['GET'])
def export_predictions_csv():
    predictions = PredictionHistory.query.order_by(PredictionHistory.created_at.desc()).all()

    output = io.StringIO()
    writer = csv.writer(output)

    # Write header
    writer.writerow([
        'Prediction ID', 'User ID', 'User Name', 'User Email', 
        'Primary Prediction', 'Confidence Score (%)', 'Created At'
    ])

    for p in predictions:
        user = User.query.get(p.user_id)
        writer.writerow([
            p.id,
            p.user_id,
            user.name if user else 'Candidate',
            user.email if user else 'N/A',
            p.primary_prediction,
            round(p.confidence_score * 100, 1),
            p.created_at.strftime('%Y-%m-%d %H:%M:%S')
        ])

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype='text/csv',
        headers={'Content-Disposition': 'attachment; filename=career_predictions_export.csv'}
    )
