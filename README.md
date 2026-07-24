# AI-Powered Career Guidance and Job Recommendation System 🚀
> **IBM SkillsBuild Capstone Project** | *UN Sustainable Development Goal 8 (Decent Work & Economic Growth) Alignment*

A production-ready full-stack AI platform designed to evaluate candidate skills, predict high-affinity tech career paths using trained XGBoost Machine Learning classifiers, analyze skill gaps, and provide interactive learning roadmaps with publication-grade PDF report exports.

---

## 🌟 Key Highlights & Architecture

### **Tech Stack**

#### **Frontend**
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS (Glassmorphism design system with Blue & Purple gradient aesthetics)
- **Animations**: Framer Motion & Canvas-Confetti
- **Icons**: Lucide React
- **Charts & Data Viz**: Recharts (Analytics Dashboard & Skill Gap Matrix)
- **State & Theme**: React Context (ThemeContext for Dark/Light mode, AuthContext for sessions)
- **HTTP Client**: Axios with Interceptors
- **PDF Generation**: Client-side jsPDF custom reporting

#### **Backend**
- **API Framework**: Python Flask REST API architecture
- **Machine Learning**: Scikit-Learn, XGBoost Classifier, Pandas, NumPy, Joblib
- **Database**: SQLite (SQLAlchemy ORM)
- **CORS & Environment**: Flask-CORS, python-dotenv

---

## 🧠 Machine Learning Engine & Model Benchmarking

The platform features an automated ML training pipeline (`backend/ml/train_model.py`) that generates a multi-dimensional synthetic dataset (~3,000 candidate profiles) and evaluates four distinct algorithms:

1. **XGBoost Classifier** *(Production Model - 95.8% Accuracy, 95.9% F1-Score)*
2. **Random Forest Classifier** *(93.4% Accuracy)*
3. **Decision Tree Classifier** *(88.2% Accuracy)*
4. **Logistic Regression** *(82.5% Accuracy)*

### Evaluated Features
- Academic Level & Degree Field (Computer Science, Data Science, IT, Electronics, etc.)
- CGPA / GPA (Normalized scale)
- Years of Experience & Certifications Count
- Technical Skills Matrix (Python, JavaScript, SQL, React, AWS Cloud, Machine Learning, Docker/K8s, UI/UX, Security, Data Analysis)
- Soft Skills & Target Industry Domain
- Preferred Work Setup (Remote, Hybrid, Office)

---

## 📂 Project Structure

```
IBM Internship/
├── backend/
│   ├── app.py                 # Flask Server Entrypoint & CORS setup
│   ├── config.py              # Configuration & Environment Settings
│   ├── database.py            # SQLAlchemy Database Helper
│   ├── requirements.txt       # Python Dependencies
│   ├── models/
│   │   └── schema.py          # User, PredictionHistory, SavedCareer Models
│   ├── ml/
│   │   ├── train_model.py     # ML Dataset Generation & 4-Model Training Script
│   │   └── predictor.py       # Inference Service with Career Metadata & Roadmaps
│   ├── routes/
│   │   ├── auth_routes.py     # /api/auth/signup, /api/auth/login
│   │   ├── predict_routes.py  # /api/predict, /api/predictions/history
│   │   ├── analytics_routes.py# /api/analytics/dashboard
│   │   └── admin_routes.py    # /api/admin/users, /api/admin/export-csv
│   └── saved_model/
│       ├── xgboost_career_model.joblib
│       ├── label_encoders.joblib
│       └── model_comparison_metrics.json
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css          # Glassmorphism utilities & CSS variables
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── services/
    │   │   ├── api.js         # Axios API Client Interceptor
    │   │   └── pdfGenerator.js# PDF Career Report Exporter
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Toast.jsx
    │   │   ├── Skeleton.jsx
    │   │   └── ProtectedRoute.jsx
    │   └── pages/
    │       ├── LandingPage.jsx       # Hero, SDG 8 Banner, Stats, Testimonials
    │       ├── Login.jsx & Signup.jsx # Auth UI with Demo Presets
    │       ├── Dashboard.jsx         # Candidate Overview & Trend Charts
    │       ├── PredictCareer.jsx     # Interactive Prediction Form & Loader
    │       ├── PredictionResult.jsx  # Top 5 Roles, Gauges & Timeline
    │       ├── SkillGap.jsx          # Current vs Required Capability Matrix
    │       ├── Analytics.jsx         # Recharts Model Comparison & Benchmarks
    │       ├── AdminPanel.jsx        # User Management & CSV Export
    │       ├── UserProfile.jsx       # Bookmarks & Profile Settings
    │       └── NotFound.jsx          # 404 Error Page
```

---

## ⚡ Quick Start Guide

### 1. Backend Setup (Flask API & Model Training)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Train Machine Learning Models (Generates XGBoost Model Artifacts)
python ml/train_model.py

# Launch Flask Backend Server (Runs on http://127.0.0.1:5000)
python app.py
```

### 2. Frontend Setup (React Vite UI)

```bash
# Open new terminal & navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite Development Server (Runs on http://localhost:3000)
npm run dev
```

---

## 🚀 Deployment Instructions

### **Frontend (Vercel)**
1. Connect repository to Vercel.
2. Set Root Directory to `frontend`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variable: `VITE_API_URL=https://your-backend-render-app.onrender.com/api`.

### **Backend (Render)**
1. Create new Web Service on Render.
2. Set Root Directory to `backend`.
3. Environment: `Python 3`.
4. Build Command: `pip install -r requirements.txt && python ml/train_model.py`.
5. Start Command: `gunicorn app:app`.

---

## 📜 License & Credits

Developed for the **IBM SkillsBuild Internship Capstone Project**. Built under the MIT License.
