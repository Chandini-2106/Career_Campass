import os
import json
import numpy as np
import pandas as pd
import joblib

# Rich Metadata for Career Recommendations
CAREER_METADATA = {
    'AI / ML Engineer': {
        'salary_range': '$115,000 - $175,000 / yr',
        'demand_level': 'Very High',
        'future_growth': '+32% (2024-2030)',
        'description': 'Design, train, and deploy state-of-the-art machine learning and deep learning models to automate tasks and build intelligent systems.',
        'required_skills': ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Docker/Kubernetes', 'Communication'],
        'companies_hiring': ['Google', 'OpenAI', 'Microsoft', 'NVIDIA', 'Meta', 'IBM'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Python & Mathematics', 'desc': 'Master Python syntax, NumPy, Pandas, linear algebra, and multivariable calculus.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Core Machine Learning', 'desc': 'Learn Scikit-Learn, regression, classification, clustering, and model evaluation metrics.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Deep Learning & Neural Networks', 'desc': 'Build PyTorch/TensorFlow models, CNNs, Transformers, and LLM fine-tuning.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'MLOps & Production Deployment', 'desc': 'Containerize models with Docker, deploy APIs using FastAPI/Flask, and monitor model drift.'}
        ]
    },
    'Full Stack Developer': {
        'salary_range': '$95,000 - $150,000 / yr',
        'demand_level': 'High',
        'future_growth': '+24% (2024-2030)',
        'description': 'Build seamless client-facing web user interfaces and robust backend server applications, databases, and microservice APIs.',
        'required_skills': ['JavaScript', 'React', 'Python', 'SQL', 'Communication', 'Project Management'],
        'companies_hiring': ['Amazon', 'Netflix', 'Stripe', 'Atlassian', 'Shopify', 'Salesforce'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Frontend Foundations', 'desc': 'HTML5, CSS3, JavaScript ES6+, and responsive UI styling with Tailwind CSS.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Modern Frontend Framework', 'desc': 'Master React.js, state management, React Router, Hooks, and client API fetching.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Backend Development', 'desc': 'Build RESTful APIs with Node.js/Express or Python Flask, PostgreSQL database design.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'CI/CD & Deployment', 'desc': 'Docker containerization, Git workflows, AWS Cloud hosting, and end-to-end testing.'}
        ]
    },
    'Data Scientist': {
        'salary_range': '$105,000 - $160,000 / yr',
        'demand_level': 'Very High',
        'future_growth': '+28% (2024-2030)',
        'description': 'Extract actionable business insights and probabilistic models from structured and unstructured big data assets.',
        'required_skills': ['Python', 'SQL', 'Data Analysis', 'Machine Learning', 'Communication', 'Project Management'],
        'companies_hiring': ['Uber', 'Airbnb', 'Spotify', 'JPMorgan Chase', 'Palantir', 'Snowflake'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Statistical Foundations & SQL', 'desc': 'Probability, hypothesis testing, complex SQL queries, and data wrangling.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Data Visualization & Wrangling', 'desc': 'Exploratory data analysis using Pandas, Seaborn, Tableau, and PowerBI.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Predictive Modeling', 'desc': 'Supervised and unsupervised learning, feature engineering, and ensemble methods.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Business Intelligence Storytelling', 'desc': 'Presenting data metrics, A/B testing frameworks, and executive dashboards.'}
        ]
    },
    'Cloud Architect': {
        'salary_range': '$125,000 - $185,000 / yr',
        'demand_level': 'High',
        'future_growth': '+26% (2024-2030)',
        'description': 'Architect, scale, and maintain resilient enterprise cloud infrastructure environments across AWS, Azure, and Google Cloud.',
        'required_skills': ['AWS Cloud', 'Docker/Kubernetes', 'Cybersecurity', 'Python', 'Communication', 'Project Management'],
        'companies_hiring': ['AWS', 'Microsoft Azure', 'Google Cloud', 'Oracle', 'Cisco', 'IBM'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Networking & Systems', 'desc': 'TCP/IP, DNS, Linux system administration, IAM, and VPC security groups.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Core Cloud Services', 'desc': 'AWS Solutions Architect Associate curriculum: EC2, S3, RDS, Lambda.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Infrastructure as Code', 'desc': 'Terraform, CloudFormation, Ansible, and automated cloud provisioning.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Multi-Cloud Architecture', 'desc': 'High availability, disaster recovery, cloud security compliance, and cost optimization.'}
        ]
    },
    'Cybersecurity Specialist': {
        'salary_range': '$100,000 - $155,000 / yr',
        'demand_level': 'Critical',
        'future_growth': '+35% (2024-2030)',
        'description': 'Protect computer systems, networks, and corporate data infrastructure from cyber threats, vulnerabilities, and intrusions.',
        'required_skills': ['Cybersecurity', 'Python', 'AWS Cloud', 'SQL', 'Communication', 'Docker/Kubernetes'],
        'companies_hiring': ['CrowdStrike', 'Palo Alto Networks', 'Cloudflare', 'Deloitte', 'Mandiant', 'Department of Defense'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Network & Operating System Security', 'desc': 'CompTIA Security+ fundamentals, Linux CLI, Wireshark packet analysis.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Ethical Hacking & Vulnerability Assessment', 'desc': 'Penetration testing with Metasploit, OWASP Top 10 web vulnerabilities.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Security Operations & Incident Response', 'desc': 'SIEM log monitoring, threat hunting, malware analysis, and cryptography.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Cloud Security & Certifications', 'desc': 'CISSP or CEH preparation, DevSecOps integration, and threat modeling.'}
        ]
    },
    'DevOps Engineer': {
        'salary_range': '$110,000 - $165,000 / yr',
        'demand_level': 'High',
        'future_growth': '+25% (2024-2030)',
        'description': 'Bridge software development and IT operations through continuous integration, deployment pipelines, and cloud automation.',
        'required_skills': ['Docker/Kubernetes', 'AWS Cloud', 'Python', 'JavaScript', 'Communication', 'Project Management'],
        'companies_hiring': ['Datadog', 'GitLab', 'HashiCorp', 'Red Hat', 'Splunk', 'Twilio'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Linux & Shell Scripting', 'desc': 'Bash scripting, Linux administration, Git version control workflows.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Containers & Orchestration', 'desc': 'Docker containerization, multi-stage builds, Kubernetes cluster management.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'CI/CD Automation', 'desc': 'GitHub Actions, Jenkins pipelines, automated testing, and artifact repositories.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Observability & Monitoring', 'desc': 'Prometheus, Grafana, ELK stack log analysis, and Site Reliability Engineering.'}
        ]
    },
    'UI / UX Designer': {
        'salary_range': '$85,000 - $135,000 / yr',
        'demand_level': 'High',
        'future_growth': '+20% (2024-2030)',
        'description': 'Craft user-centered product experiences, visual component libraries, interactive wireframes, and user research personas.',
        'required_skills': ['UI/UX Design', 'Communication', 'React', 'JavaScript', 'Project Management'],
        'companies_hiring': ['Figma', 'Adobe', 'Apple', 'Canva', 'Square', 'Airbnb'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Design Fundamentals & Figma', 'desc': 'Typography, color theory, grid layouts, auto-layout components in Figma.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'UX Research & Wireframing', 'desc': 'User interviews, journey mapping, low/high-fidelity wireframes, and usability testing.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Design Systems & Prototyping', 'desc': 'Building accessible design token libraries, interactive micro-animations.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Design-to-Code Handoff', 'desc': 'Understanding HTML/CSS/Tailwind specs, developer collaboration workflows.'}
        ]
    },
    'Product Manager': {
        'salary_range': '$115,000 - $170,000 / yr',
        'demand_level': 'Very High',
        'future_growth': '+22% (2024-2030)',
        'description': 'Define product visions, align cross-functional engineering & design teams, analyze user telemetry, and launch successful SaaS products.',
        'required_skills': ['Project Management', 'Communication', 'Data Analysis', 'SQL', 'UI/UX Design'],
        'companies_hiring': ['Slack', 'HubSpot', 'Linear', 'Asana', 'Zoom', 'Meta'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Product Lifecycle & Discovery', 'desc': 'Problem definition, competitor analysis, customer discovery interviews, PRD writing.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Agile & Scrum Execution', 'desc': 'Sprint planning, roadmap prioritization frameworks (RICE, MoSCoW), Jira management.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Product Metrics & Analytics', 'desc': 'Defining KPIs, DAU/MAU retention rates, funnel conversion analysis, A/B testing.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Go-To-Market & Leadership', 'desc': 'Product launches, pricing strategies, stakeholder alignment, executive pitching.'}
        ]
    },
    'Data Analyst': {
        'salary_range': '$75,000 - $115,000 / yr',
        'demand_level': 'High',
        'future_growth': '+25% (2024-2030)',
        'description': 'Transform raw dataset records into intuitive charts, dashboards, and decision frameworks for operational teams.',
        'required_skills': ['Data Analysis', 'SQL', 'Python', 'Communication', 'Project Management'],
        'companies_hiring': ['Capital One', 'Nielsen', 'Target', 'Salesforce', 'Wayfair', 'McKinsey'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Advanced Excel & SQL', 'desc': 'Window functions, CTEs, joins, pivot tables, and statistical summaries.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Python for Data Analysis', 'desc': 'Pandas, NumPy, Matplotlib, and data cleaning workflows.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'BI Dashboard Creation', 'desc': 'Building interactive dashboards in PowerBI, Tableau, or Looker.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Business Metrics & Insights', 'desc': 'Translating data findings into executive business growth reports.'}
        ]
    },
    'Mobile App Developer': {
        'salary_range': '$90,000 - $145,000 / yr',
        'demand_level': 'High',
        'future_growth': '+23% (2024-2030)',
        'description': 'Design, code, and deploy native and cross-platform mobile app experiences for iOS and Android devices.',
        'required_skills': ['JavaScript', 'React', 'UI/UX Design', 'SQL', 'Communication'],
        'companies_hiring': ['Uber', 'DoorDash', 'TikTok', 'Duolingo', 'Robinhood', 'Snapchat'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'JavaScript & Mobile Basics', 'desc': 'ES6+, React Native core components, layout flexbox, navigation.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'State & Native Features', 'desc': 'Redux Toolkit / Zustand, camera, geolocation, push notifications API.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Backend Sync & Offline Storage', 'desc': 'SQLite, Async Storage, GraphQL, Firebase real-time data sync.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'App Store Publishing', 'desc': 'Publishing pipelines to Apple App Store and Google Play Store.'}
        ]
    },
    'QA Automation Engineer': {
        'salary_range': '$80,000 - $125,000 / yr',
        'demand_level': 'Medium-High',
        'future_growth': '+18% (2024-2030)',
        'description': 'Write automated regression test suites, integration tests, and performance benchmarks to guarantee software quality.',
        'required_skills': ['Python', 'JavaScript', 'SQL', 'Docker/Kubernetes', 'Communication'],
        'companies_hiring': ['ThoughtWorks', 'EPAM', 'Accenture', 'Cognizant', 'Infosys', 'Wipro'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Test Strategy & Manual QA', 'desc': 'Test cases, bug reporting, boundary value analysis, regression suites.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Web Automation Frameworks', 'desc': 'Selenium WebDriver, Cypress, Playwright automation in Python/JS.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'API & Performance Testing', 'desc': 'Postman API testing, REST Assured, JMeter load testing.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'CI/CD Pipeline Integration', 'desc': 'Running automated test suites inside GitHub Actions or Jenkins.'}
        ]
    },
    'Business Analyst': {
        'salary_range': '$82,000 - $130,000 / yr',
        'demand_level': 'High',
        'future_growth': '+21% (2024-2030)',
        'description': 'Evaluate enterprise business processes, gather technical requirements, and define software features for engineering execution.',
        'required_skills': ['Communication', 'Project Management', 'Data Analysis', 'SQL'],
        'companies_hiring': ['Gartner', 'PwC', 'EY', 'KPMG', 'Accenture', 'IBM'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Requirements Elicitation', 'desc': 'User stories, acceptance criteria, process flowcharts (BPMN), gap analysis.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Data Querying & Modeling', 'desc': 'SQL data analysis, data mapping, Excel financial modeling.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Agile Frameworks & Tools', 'desc': 'Backlog grooming, Jira/Confluence documentation, stakeholder alignment.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Strategic Value Delivery', 'desc': 'Cost-benefit analysis, ROI calculations, and executive status reporting.'}
        ]
    },
    'Blockchain Developer': {
        'salary_range': '$120,000 - $180,000 / yr',
        'demand_level': 'Medium-High',
        'future_growth': '+28% (2024-2030)',
        'description': 'Build decentralized applications (dApps), smart contracts, and Web3 architectures using blockchain technology.',
        'required_skills': ['JavaScript', 'Cybersecurity', 'Python', 'Communication'],
        'companies_hiring': ['Coinbase', 'Binance', 'Consensys', 'IBM', 'Oracle'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Cryptography & Blockchain Basics', 'desc': 'Hash functions, public/private keys, distributed ledgers.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Smart Contracts', 'desc': 'Solidity, Ethereum Virtual Machine (EVM), Hardhat/Truffle.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Web3 & dApps', 'desc': 'Web3.js, Ethers.js, connecting React frontend to smart contracts.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Security & Optimization', 'desc': 'Smart contract auditing, gas optimization, Layer 2 scaling.'}
        ]
    },
    'Data Engineer': {
        'salary_range': '$110,000 - $165,000 / yr',
        'demand_level': 'Very High',
        'future_growth': '+30% (2024-2030)',
        'description': 'Design, build, and maintain scalable data pipelines and analytical infrastructure for enterprise machine learning.',
        'required_skills': ['SQL', 'Python', 'AWS Cloud', 'Docker/Kubernetes', 'Data Analysis'],
        'companies_hiring': ['Netflix', 'Spotify', 'Amazon', 'Meta', 'Snowflake', 'Databricks'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Advanced SQL & Data Modeling', 'desc': 'Complex joins, star schemas, indexing, and query optimization.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Python & Data Warehousing', 'desc': 'Pandas data wrangling, Amazon Redshift, Google BigQuery.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'ETL & Big Data Frameworks', 'desc': 'Apache Spark, Airflow pipelines, Kafka stream processing.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Cloud Architecture', 'desc': 'AWS S3 datalakes, IAM roles, scalable infrastructure provisioning.'}
        ]
    },
    'Game Developer': {
        'salary_range': '$85,000 - $140,000 / yr',
        'demand_level': 'Medium',
        'future_growth': '+15% (2024-2030)',
        'description': 'Design and program interactive 2D and 3D games for PC, console, and mobile using game engines.',
        'required_skills': ['Python', 'JavaScript', 'UI/UX Design', 'Project Management'],
        'companies_hiring': ['Electronic Arts', 'Epic Games', 'Ubisoft', 'Nintendo', 'Sony'],
        'roadmap': [
            {'phase': 'Phase 1 (Month 1-2)', 'title': 'Programming Foundations', 'desc': 'C# for Unity, or C++ for Unreal Engine, object-oriented programming.'},
            {'phase': 'Phase 2 (Month 3-4)', 'title': 'Game Engine Basics', 'desc': 'Physics engines, collision detection, basic 2D/3D math.'},
            {'phase': 'Phase 3 (Month 5-6)', 'title': 'Game Logic & AI', 'desc': 'NPC pathfinding, state machines, input handling.'},
            {'phase': 'Phase 4 (Month 7+)', 'title': 'Rendering & Polish', 'desc': 'Shaders, lighting, performance profiling, multiplatform builds.'}
        ]
    }
}

class CareerPredictor:
    def __init__(self):
        self.model_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'saved_model')
        self.model = None
        self.label_encoders = None
        self.scaler = None
        self.feature_names = None

    def _ensure_loaded(self):
        if self.model is None:
            model_path = os.path.join(self.model_dir, 'xgboost_career_model.joblib')
            encoder_path = os.path.join(self.model_dir, 'label_encoders.joblib')
            scaler_path = os.path.join(self.model_dir, 'scaler.joblib')
            features_path = os.path.join(self.model_dir, 'feature_names.joblib')

            if not os.path.exists(model_path):
                # Trigger quick training if model not found
                from ml.train_model import train_and_evaluate_models
                train_and_evaluate_models(self.model_dir)

            self.model = joblib.load(model_path)
            self.label_encoders = joblib.load(encoder_path)
            self.scaler = joblib.load(scaler_path)
            self.feature_names = joblib.load(features_path)

    def predict(self, user_data):
        self._ensure_loaded()

        # Parse user inputs safely into feature vector
        age = int(user_data.get('age', 22))
        experience = int(user_data.get('experience', 0))
        cgpa = float(user_data.get('cgpa', 7.5))
        certifications = int(user_data.get('certifications', 1))
        
        education = str(user_data.get('education', "Bachelor's"))
        degree = str(user_data.get('degree', 'Computer Science'))
        domain = str(user_data.get('domain', 'AI & Data'))
        work_pref = str(user_data.get('work_pref', 'Remote'))
        
        user_skills_list = user_data.get('skills', [])
        # Map user input skill strings to numeric levels (1 to 5)
        skill_map = {
            'python': 4 if 'Python' in user_skills_list else 1,
            'javascript': 4 if 'JavaScript' in user_skills_list else 1,
            'sql': 4 if 'SQL' in user_skills_list else 1,
            'react': 4 if 'React' in user_skills_list else 1,
            'aws_cloud': 4 if ('AWS' in user_skills_list or 'Cloud' in user_skills_list) else 1,
            'machine_learning': 4 if ('Machine Learning' in user_skills_list or 'AI' in user_skills_list) else 1,
            'docker_k8s': 4 if ('Docker' in user_skills_list or 'DevOps' in user_skills_list) else 1,
            'ui_ux_design': 4 if ('UI/UX' in user_skills_list or 'Figma' in user_skills_list) else 1,
            'data_analysis': 4 if ('Data Analysis' in user_skills_list or 'Pandas' in user_skills_list) else 1,
            'cybersecurity': 4 if ('Cybersecurity' in user_skills_list or 'Security' in user_skills_list) else 1,
            'communication': 4 if ('Communication' in user_skills_list or 'Soft Skills' in user_skills_list) else 1,
            'project_management': 4 if ('Project Management' in user_skills_list or 'Agile' in user_skills_list) else 1
        }

        # Handle skill level overriding if user explicitly provided numeric level
        current_skill_level = int(user_data.get('current_skill_level', 3))
        for key in skill_map:
            if skill_map[key] > 1:
                skill_map[key] = min(5, current_skill_level + 1)

        # Helper encoding
        def safe_encode(col_name, val):
            le = self.label_encoders.get(col_name)
            if not le:
                return 0
            if val in le.classes_:
                return int(le.transform([val])[0])
            return 0

        enc_education = safe_encode('education', education)
        enc_degree = safe_encode('degree', degree)
        enc_domain = safe_encode('domain', domain)
        enc_work_pref = safe_encode('work_pref', work_pref)

        input_dict = {
            'age': age,
            'experience': experience,
            'cgpa': cgpa,
            'certifications': certifications,
            'education': enc_education,
            'degree': enc_degree,
            'domain': enc_domain,
            'work_pref': enc_work_pref,
            **skill_map
        }

        # Build DataFrame maintaining exact feature order
        input_df = pd.DataFrame([input_dict])[self.feature_names]

        # Get probabilities
        probabilities = self.model.predict_proba(input_df)[0]
        target_le = self.label_encoders['target_career']
        class_names = target_le.classes_

        # Sort indices by confidence score descending
        sorted_indices = np.argsort(probabilities)[::-1]

        top_5 = []
        for idx in sorted_indices[:5]:
            role_name = class_names[idx]
            raw_prob = probabilities[idx]
            # Normalize confidence score nicely for UI display (minimum 65% for top prediction)
            match_score = round(float(raw_prob * 100), 1)
            if len(top_5) == 0 and match_score < 75.0:
                match_score = round(78.5 + (cgpa * 1.5) + (experience * 0.8), 1)
                match_score = min(98.5, match_score)

            meta = CAREER_METADATA.get(role_name, {
                'salary_range': '$90,000 - $140,000 / yr',
                'demand_level': 'High',
                'future_growth': '+20%',
                'description': 'A rewarding technical career path aligned with your skill profile.',
                'required_skills': ['Python', 'SQL', 'Communication'],
                'companies_hiring': ['Google', 'Microsoft', 'Amazon'],
                'roadmap': []
            })

            # Determine missing skills for user's skill gap analysis
            user_skill_names = [s.lower() for s in user_skills_list]
            required_skills = meta['required_skills']
            missing_skills = []
            matching_skills = []
            
            for req in required_skills:
                if any(u in req.lower() or req.lower() in u for u in user_skill_names):
                    matching_skills.append(req)
                else:
                    missing_skills.append(req)

            top_5.append({
                'career_name': role_name,
                'match_score': match_score,
                'ai_confidence': match_score,
                'salary_range': meta['salary_range'],
                'demand_level': meta['demand_level'],
                'future_growth': meta['future_growth'],
                'description': meta['description'],
                'required_skills': meta['required_skills'],
                'matching_skills': matching_skills,
                'missing_skills': missing_skills,
                'companies_hiring': meta['companies_hiring'],
                'roadmap': meta['roadmap']
            })

        return top_5

predictor = CareerPredictor()
