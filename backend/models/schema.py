from datetime import datetime
import json
from database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')  # 'user' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    predictions = db.relationship('PredictionHistory', backref='user', lazy=True, cascade="all, delete-orphan")
    saved_careers = db.relationship('SavedCareer', backref='user', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class PredictionHistory(db.Model):
    __tablename__ = 'prediction_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_input_json = db.Column(db.Text, nullable=False)
    top_careers_json = db.Column(db.Text, nullable=False)
    primary_prediction = db.Column(db.String(100), nullable=False)
    confidence_score = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_input': json.loads(self.user_input_json) if self.user_input_json else {},
            'top_careers': json.loads(self.top_careers_json) if self.top_careers_json else [],
            'primary_prediction': self.primary_prediction,
            'confidence_score': round(self.confidence_score * 100, 1),
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class SavedCareer(db.Model):
    __tablename__ = 'saved_careers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    career_name = db.Column(db.String(100), nullable=False)
    match_score = db.Column(db.Float, nullable=False)
    career_details_json = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'career_name': self.career_name,
            'match_score': self.match_score,
            'career_details': json.loads(self.career_details_json) if self.career_details_json else {},
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class ModelMetric(db.Model):
    __tablename__ = 'model_metrics'
    id = db.Column(db.Integer, primary_key=True)
    model_name = db.Column(db.String(50), nullable=False)
    accuracy = db.Column(db.Float, nullable=False)
    precision = db.Column(db.Float, nullable=False)
    recall = db.Column(db.Float, nullable=False)
    f1_score = db.Column(db.Float, nullable=False)
    is_best = db.Column(db.Boolean, default=False)
    trained_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'model_name': self.model_name,
            'accuracy': round(self.accuracy * 100, 2),
            'precision': round(self.precision * 100, 2),
            'recall': round(self.recall * 100, 2),
            'f1_score': round(self.f1_score * 100, 2),
            'is_best': self.is_best,
            'trained_at': self.trained_at.strftime('%Y-%m-%d %H:%M:%S')
        }
