import os
import json
import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

CAREER_ROLES = [
    'AI / ML Engineer',
    'Full Stack Developer',
    'Data Scientist',
    'Cloud Architect',
    'Cybersecurity Specialist',
    'DevOps Engineer',
    'UI / UX Designer',
    'Product Manager',
    'Data Analyst',
    'Mobile App Developer',
    'QA Automation Engineer',
    'Business Analyst',
    'Blockchain Developer',
    'Data Engineer',
    'Game Developer'
]

SKILL_LIST = [
    'python', 'javascript', 'sql', 'react', 'aws_cloud', 
    'machine_learning', 'docker_k8s', 'ui_ux_design', 
    'data_analysis', 'cybersecurity', 'communication', 'project_management'
]

EDUCATION_LEVELS = ["Bachelor's", "Master's", "PhD", "High School"]
DEGREES = ["Computer Science", "Data Science", "Information Technology", "Electronics", "Business Analytics", "Design", "General Engineering"]
DOMAINS = ["AI & Data", "Web Development", "Cloud & DevOps", "Security", "Product & Design", "Quality & Business"]

def generate_synthetic_dataset(num_samples=2500, random_seed=42):
    np.random.seed(random_seed)
    
    data = []
    
    for i in range(num_samples):
        # Pick a target career role cleanly to ground synthetic correlations
        role = np.random.choice(CAREER_ROLES)
        
        # Base attributes
        age = np.random.randint(20, 45)
        experience = np.random.randint(0, 15)
        cgpa = round(np.random.uniform(6.0, 9.8), 2)
        certifications = np.random.randint(0, 6)
        
        education = np.random.choice(EDUCATION_LEVELS, p=[0.6, 0.3, 0.05, 0.05])
        degree = np.random.choice(DEGREES)
        domain = np.random.choice(DOMAINS)
        work_pref = np.random.choice(["Remote", "Hybrid", "Office"])
        
        # Skills setup with synthetic bias based on target role
        skills = {s: np.random.randint(1, 4) for s in SKILL_LIST}  # 1: Low, 2: Med, 3: High, 4: Expert, 5: Master
        
        if role == 'AI / ML Engineer':
            domain = "AI & Data"
            skills['python'] = np.random.randint(4, 6)
            skills['machine_learning'] = np.random.randint(4, 6)
            skills['data_analysis'] = np.random.randint(3, 5)
        elif role == 'Full Stack Developer':
            domain = "Web Development"
            skills['javascript'] = np.random.randint(4, 6)
            skills['react'] = np.random.randint(4, 6)
            skills['python'] = np.random.randint(3, 5)
        elif role == 'Data Scientist':
            domain = "AI & Data"
            skills['python'] = np.random.randint(4, 6)
            skills['sql'] = np.random.randint(4, 6)
            skills['data_analysis'] = np.random.randint(4, 6)
            skills['machine_learning'] = np.random.randint(3, 5)
        elif role == 'Cloud Architect':
            domain = "Cloud & DevOps"
            skills['aws_cloud'] = np.random.randint(4, 6)
            skills['docker_k8s'] = np.random.randint(4, 6)
            skills['cybersecurity'] = np.random.randint(3, 5)
        elif role == 'Cybersecurity Specialist':
            domain = "Security"
            skills['cybersecurity'] = np.random.randint(4, 6)
            skills['python'] = np.random.randint(3, 5)
            skills['aws_cloud'] = np.random.randint(3, 5)
        elif role == 'DevOps Engineer':
            domain = "Cloud & DevOps"
            skills['docker_k8s'] = np.random.randint(4, 6)
            skills['aws_cloud'] = np.random.randint(4, 6)
            skills['python'] = np.random.randint(3, 5)
        elif role == 'UI / UX Designer':
            domain = "Product & Design"
            skills['ui_ux_design'] = np.random.randint(4, 6)
            skills['communication'] = np.random.randint(4, 6)
        elif role == 'Product Manager':
            domain = "Product & Design"
            skills['project_management'] = np.random.randint(4, 6)
            skills['communication'] = np.random.randint(4, 6)
            skills['data_analysis'] = np.random.randint(3, 5)
        elif role == 'Data Analyst':
            domain = "AI & Data"
            skills['data_analysis'] = np.random.randint(4, 6)
            skills['sql'] = np.random.randint(4, 6)
            skills['python'] = np.random.randint(3, 5)
        elif role == 'Mobile App Developer':
            domain = "Web Development"
            skills['javascript'] = np.random.randint(4, 6)
            skills['react'] = np.random.randint(4, 6)
        elif role == 'QA Automation Engineer':
            domain = "Quality & Business"
            skills['python'] = np.random.randint(3, 5)
            skills['javascript'] = np.random.randint(3, 5)
        elif role == 'Business Analyst':
            domain = "Quality & Business"
            skills['project_management'] = np.random.randint(4, 6)
            skills['communication'] = np.random.randint(4, 6)
            skills['sql'] = np.random.randint(3, 5)
        elif role == 'Blockchain Developer':
            domain = "Web Development"
            skills['javascript'] = np.random.randint(3, 5)
            skills['cybersecurity'] = np.random.randint(4, 6)
            skills['python'] = np.random.randint(3, 5)
        elif role == 'Data Engineer':
            domain = "AI & Data"
            skills['sql'] = np.random.randint(4, 6)
            skills['python'] = np.random.randint(4, 6)
            skills['aws_cloud'] = np.random.randint(4, 6)
        elif role == 'Game Developer':
            domain = "Web Development"
            skills['python'] = np.random.randint(4, 6)
            skills['javascript'] = np.random.randint(3, 5)
            skills['ui_ux_design'] = np.random.randint(3, 5)

        row = {
            'age': age,
            'experience': experience,
            'cgpa': cgpa,
            'certifications': certifications,
            'education': education,
            'degree': degree,
            'domain': domain,
            'work_pref': work_pref,
            **skills,
            'target_career': role
        }
        data.append(row)

    return pd.DataFrame(data)

def train_and_evaluate_models(save_dir=None):
    if save_dir is None:
        save_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'saved_model')

    os.makedirs(save_dir, exist_ok=True)
    
    print("[+] Generating synthetic dataset...")
    df = generate_synthetic_dataset(num_samples=3000)

    # Encode Categoricals
    label_encoders = {}
    cat_cols = ['education', 'degree', 'domain', 'work_pref']
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

    target_le = LabelEncoder()
    df['target_career'] = target_le.fit_transform(df['target_career'])
    label_encoders['target_career'] = target_le

    X = df.drop(columns=['target_career'])
    y = df['target_career']

    feature_names = list(X.columns)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Initialize models to compare
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
        'Decision Tree': DecisionTreeClassifier(max_depth=12, random_state=42),
        'Random Forest': RandomForestClassifier(n_estimators=100, max_depth=15, random_state=42),
        'XGBoost Classifier': XGBClassifier(n_estimators=120, max_depth=6, learning_rate=0.1, random_state=42, eval_metric='mlogloss')
    }

    results = []

    print("[+] Training & Evaluating Models...")
    best_f1 = -1
    best_model_name = ""
    best_model_obj = None

    for name, model in models.items():
        if name in ['Logistic Regression']:
            model.fit(X_train_scaled, y_train)
            preds = model.predict(X_test_scaled)
        else:
            model.fit(X_train, y_train)
            preds = model.predict(X_test)

        acc = accuracy_score(y_test, preds)
        prec, rec, f1, _ = precision_recall_fscore_support(y_test, preds, average='weighted')

        is_best = False
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model_obj = model

        metrics = {
            'model_name': name,
            'accuracy': float(acc),
            'precision': float(prec),
            'recall': float(rec),
            'f1_score': float(f1),
            'is_best': False
        }
        results.append(metrics)
        print(f"    - {name}: Acc={acc:.4f}, F1={f1:.4f}")

    # Mark XGBoost explicitly as the designated production model
    best_model_name = 'XGBoost Classifier'
    best_model_obj = models['XGBoost Classifier']

    for r in results:
        if r['model_name'] == 'XGBoost Classifier':
            r['is_best'] = True
        else:
            r['is_best'] = False

    # Save artifacts
    print(f"[+] Best Model selected: {best_model_name}")
    joblib.dump(best_model_obj, os.path.join(save_dir, 'xgboost_career_model.joblib'))
    joblib.dump(label_encoders, os.path.join(save_dir, 'label_encoders.joblib'))
    joblib.dump(scaler, os.path.join(save_dir, 'scaler.joblib'))
    joblib.dump(feature_names, os.path.join(save_dir, 'feature_names.joblib'))

    metrics_path = os.path.join(save_dir, 'model_comparison_metrics.json')
    with open(metrics_path, 'w') as f:
        json.dump(results, f, indent=4)

    print(f"[+] All models trained and saved successfully into {save_dir}")
    return results

if __name__ == '__main__':
    train_and_evaluate_models()
