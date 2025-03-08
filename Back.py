from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost:3306/dooit'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User profile model storing personal and professional details
class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    current_job = db.Column(db.String(100))
    department = db.Column(db.String(100))
    education = db.Column(db.String(255))
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    skills = db.Column(db.Text)
    personality_traits = db.Column(db.Text)
    transition_job = db.Column(db.String(100))
    career_path = db.Column(db.Text)
    missing_skills = db.Column(db.Text)

# Career Path model
class CareerPath(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_career = db.Column(db.String(100))
    career_path = db.Column(db.Text)

# Job Skills model
class JobSkills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job = db.Column(db.String(100))
    skills = db.Column(db.Text)  # Comma-separated required skills

# Learning Courses model
class LearningCourses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(100))
    course_name = db.Column(db.String(255))
    url = db.Column(db.String(255))

# Overview API
@app.route('/overview', methods=['POST'])
def get_overview():
    data = request.json
    email = data.get('email')
    transition_role = data.get('transition_role')
    user = UserProfile.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    current_job = user.current_job
    job_skills = JobSkills.query.filter_by(job=transition_role).first()
    skills = job_skills.skills.split(',') if job_skills else []
    courses = [
        course.url for skill in skills
        for course in LearningCourses.query.filter_by(skill=skill.strip()).all()
    ][:2]

    return jsonify({
        'current_job': current_job,
        'recommended_videos': courses
    })

# Profile API
@app.route('/profile', methods=['POST'])
def get_profile():
    data = request.json
    email = data.get('email')
    user = UserProfile.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'current_job': user.current_job,
        'education': user.education,
        'department': user.department,
        'phone': user.phone,
        'address': user.address,
        'skills': user.skills.split(',') if user.skills else [],
        'personality_traits': user.personality_traits.split(',') if user.personality_traits else []
    })

# Career API
@app.route('/career', methods=['POST'])
def get_career():
    data = request.json
    email = data.get('email')
    transition_role = data.get('transition_role')
    user = UserProfile.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    job_skills = JobSkills.query.filter_by(job=transition_role).first()
    skills = job_skills.skills.split(',') if job_skills else []
    courses = [
        course.url for skill in skills
        for course in LearningCourses.query.filter_by(skill=skill.strip()).all()
    ][:4]

    career_path = CareerPath.query.filter_by(start_career=transition_role).first()

    return jsonify({
        'career_path': career_path.career_path if career_path else 'No career path found',
        'recommended_videos': courses
    })

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=4000)
