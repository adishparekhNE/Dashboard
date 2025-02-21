from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost:3306/dooit'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads/'

db = SQLAlchemy(app)

# User profile model storing personal and professional details
class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photo_url = db.Column(db.String(255))  # Stores the local path of the uploaded profile picture
    username = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100))
    department = db.Column(db.String(100))
    education = db.Column(db.String(255))
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    skills = db.Column(db.Text)  # Stores user skills as a comma-separated string
    personality_traits = db.Column(db.Text)  # Stores personality traits as a comma-separated string
    transition_role = db.Column(db.String(100))  # Stores the transition role for career change


# Career plan model storing career paths and recommended courses
class CareerPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_profile.id'), nullable=False)
    career_path = db.Column(db.Text)  # The user's planned career path
    action_plan = db.Column(db.Text)  # Steps for achieving career goals
    recommended_courses = db.Column(db.Text)  # Recommended courses as a comma-separated string
    plan_status = db.Column(db.String(100))  # Status of the career plan

# API to retrieve user overview data
@app.route('/overview/<int:user_id>', methods=['GET'])
def get_overview(user_id):
    """Fetches the overview details for the website."""
    user = UserProfile.query.get(user_id)
    career_plan = CareerPlan.query.filter_by(user_id=user_id).first()
    
    if not user or not career_plan:
        return jsonify({'error': 'User or career plan not found'}), 404
    
    return jsonify({
        'recommended_video': career_plan.recommended_courses,
        'event_plan': career_plan.action_plan,
        'current_role': user.job_title,
        'transition_role': user.transition_role,
        'goal_role': career_plan.career_path,
        'plan_status': career_plan.plan_status
    })

# API to retrieve user profile data
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    """Fetches the user profile details from the database."""
    user = UserProfile.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'photo_url': user.photo_url,
        'username': user.username,
        'job_title': user.job_title,
        'department': user.department,
        'education': user.education,
        'email': user.email,
        'phone': user.phone,
        'address': user.address,
        'skills': user.skills.split(',') if user.skills else [],
        'personality_traits': user.personality_traits.split(',') if user.personality_traits else []
    })

# API to fetch a user's career plan
@app.route('/career_plan/<int:user_id>', methods=['GET'])
def get_career_plan(user_id):
    """Retrieves the career development plan for the specified user."""
    career_plan = CareerPlan.query.filter_by(user_id=user_id).first()
    if not career_plan:
        return jsonify({'error': 'Career plan not found'}), 404
    
    return jsonify({
        'career_path': career_plan.career_path,
        'action_plan': career_plan.action_plan,
        'recommended_courses': career_plan.recommended_courses.split(',') if career_plan.recommended_courses else []
    })

# API to upload and update a user's profile picture
@app.route('/profile/upload_photo/<int:user_id>', methods=['POST'])
def upload_photo(user_id):
    """Handles profile picture upload and updates the database with the new photo path."""
    if 'photo' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['photo']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    user = UserProfile.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user.photo_url = filepath
    db.session.commit()
    
    return jsonify({'message': 'Photo uploaded successfully', 'photo_url': filepath})

# API to update user profile information
@app.route('/profile/update/<int:user_id>', methods=['POST'])
def update_user_profile(user_id):
    """Updates user profile information such as name, job title, education, and contact details."""
    data = request.json
    user = UserProfile.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user.username = data.get('username', user.username)
    user.job_title = data.get('job_title', user.job_title)
    user.department = data.get('department', user.department)
    user.education = data.get('education', user.education)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.address = data.get('address', user.address)
    
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'})

# API to update user skills
@app.route('/profile/update_skills/<int:user_id>', methods=['POST'])
def update_skills(user_id):
    """Updates the skills set for a user."""
    data = request.json
    user = UserProfile.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user.skills = ','.join(data.get('skills', []))
    db.session.commit()
    return jsonify({'message': 'Skills updated successfully'})

# API to update user personality traits
@app.route('/profile/update_personality/<int:user_id>', methods=['POST'])
def update_personality(user_id):
    """Updates the personality traits for a user."""
    data = request.json
    user = UserProfile.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user.personality_traits = ','.join(data.get('personality_traits', []))
    db.session.commit()
    return jsonify({'message': 'Personality traits updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)
