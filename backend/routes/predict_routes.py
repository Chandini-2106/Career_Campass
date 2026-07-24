from flask import Blueprint, request, jsonify
from database import db
from models.schema import User, PredictionHistory, SavedCareer
from ml.predictor import predictor
import json

predict_bp = Blueprint('predict', __name__, url_prefix='/api')

@predict_bp.route('/predict', methods=['POST'])
def predict_career():
    try:
        user_data = request.get_json() or {}
        
        # Ensure user exists or fallback to sample user
        user_id = user_data.get('user_id', 1)
        user = User.query.get(user_id)
        if not user:
            user = User.query.first()
            if not user:
                user = User(name="Sample Candidate", email="candidate@ibm.com", password="password123", role="user")
                db.session.add(user)
                db.session.commit()
            user_id = user.id

        # Run ML Prediction
        top_careers = predictor.predict(user_data)

        primary_prediction = top_careers[0]['career_name']
        confidence_score = float(top_careers[0]['match_score'] / 100.0)

        # Save prediction entry to DB
        history_entry = PredictionHistory(
            user_id=user_id,
            user_input_json=json.dumps(user_data),
            top_careers_json=json.dumps(top_careers),
            primary_prediction=primary_prediction,
            confidence_score=confidence_score
        )
        db.session.add(history_entry)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'prediction_id': history_entry.id,
            'primary_prediction': primary_prediction,
            'confidence_score': round(confidence_score * 100, 1),
            'top_careers': top_careers,
            'user_input': user_data
        }), 200

    except Exception as e:
        print(f"[!] Error during career prediction: {str(e)}")
        return jsonify({'error': f"Prediction engine error: {str(e)}"}), 500

@predict_bp.route('/predictions/history', methods=['GET'])
def get_prediction_history():
    user_id = request.args.get('user_id', type=int)
    query = PredictionHistory.query
    if user_id:
        query = query.filter_by(user_id=user_id)

    history = query.order_by(PredictionHistory.created_at.desc()).limit(10).all()
    return jsonify({
        'history': [item.to_dict() for item in history]
    }), 200

@predict_bp.route('/careers/save', methods=['POST'])
def save_career():
    data = request.get_json() or {}
    user_id = data.get('user_id', 1)
    career_name = data.get('career_name')
    match_score = data.get('match_score', 90.0)
    career_details = data.get('career_details', {})

    if not career_name:
        return jsonify({'error': 'Career name is required.'}), 400

    # Prevent duplicate saves
    existing = SavedCareer.query.filter_by(user_id=user_id, career_name=career_name).first()
    if existing:
        return jsonify({'message': 'Career already saved in your bookmarks.'}), 200

    saved_entry = SavedCareer(
        user_id=user_id,
        career_name=career_name,
        match_score=match_score,
        career_details_json=json.dumps(career_details)
    )
    db.session.add(saved_entry)
    db.session.commit()

    return jsonify({
        'message': f"Saved {career_name} to your profile!",
        'saved_career': saved_entry.to_dict()
    }), 201

@predict_bp.route('/careers/saved', methods=['GET'])
def get_saved_careers():
    user_id = request.args.get('user_id', 1, type=int)
    saved = SavedCareer.query.filter_by(user_id=user_id).order_by(SavedCareer.created_at.desc()).all()
    return jsonify({
        'saved_careers': [item.to_dict() for item in saved]
    }), 200
