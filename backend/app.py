import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from database import db, init_db
from models.schema import User, PredictionHistory, ModelMetric
from routes.auth_routes import auth_bp
from routes.predict_routes import predict_bp
from routes.analytics_routes import analytics_bp
from routes.admin_routes import admin_bp
from ml.train_model import train_and_evaluate_models

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all routes (Vite local dev + Vercel deployment)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize Database
    init_db(app)

    # Register API Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(admin_bp)

    # Pre-train or load ML models on startup
    with app.app_context():
        model_saved_dir = app.config['MODEL_DIR']
        model_file = os.path.join(model_saved_dir, 'xgboost_career_model.joblib')
        if not os.path.exists(model_file):
            print("[+] Initializing & Training XGBoost Classifier ML Models...")
            train_and_evaluate_models(model_saved_dir)

        # Seed initial admin & sample users if DB empty
        if User.query.count() == 0:
            admin_user = User(
                name="IBM Administrator",
                email="admin@ai.com",
                password="adminpassword123",
                role="admin"
            )
            demo_user = User(
                name="Sarah Jenkins",
                email="sarah.j@ibm.com",
                password="password123",
                role="user"
            )
            db.session.add_all([admin_user, demo_user])
            db.session.commit()
            print("[+] Seeded initial demo & admin accounts.")

    @app.route('/')
    def root():
        return jsonify({
            'status': 'online',
            'project': 'AI-Powered Career Guidance and Job Recommendation System',
            'version': '1.0.0',
            'capstone': 'IBM SkillsBuild Capstone Project'
        }), 200

    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'database': 'connected', 'model': 'loaded'}), 200

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[*] AI Career Guidance Flask API running on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
