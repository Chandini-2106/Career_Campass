import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'ai-career-guidance-secret-key-2026')
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f"sqlite:///{os.path.join(BASE_DIR, 'career_guidance.db')}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MODEL_DIR = os.path.join(BASE_DIR, 'saved_model')
