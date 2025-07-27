from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Configure your database URI (update username, password, and db name)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://shielduser:250711@localhost:5432/cybershield_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# User model with role field
class User(db.Model):
    __tablename__ = 'users'  # optional but good practice
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')  # default to 'user'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


DEFAULT_ADMIN_EMAIL = 'admin@cybershield.com'
DEFAULT_ADMIN_PASSWORD = 'Admin@123'  # Change this in production!
DEFAULT_ADMIN_NAME = 'Administrator'


# Register route - only creates users with role = "user"
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Basic validations
    if not all([name, email, password, confirm_password]):
        return jsonify({'success': False, 'message': 'All fields are required.'}), 400

    if password != confirm_password:
        return jsonify({'success': False, 'message': 'Passwords do not match.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already registered.'}), 409

    # Create user with role='user' ONLY
    new_user = User(name=name, email=email, role='user')
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'User registered successfully.'}), 201


# Login route returns user role as well
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({'success': True, 'role': user.role}), 200

    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

def create_admin():
    admin_user = User.query.filter_by(email=DEFAULT_ADMIN_EMAIL).first()
    if not admin_user:
        admin_user = User(
            name=DEFAULT_ADMIN_NAME,
            email=DEFAULT_ADMIN_EMAIL,
            role='admin'
        )
        admin_user.set_password(DEFAULT_ADMIN_PASSWORD)
        db.session.add(admin_user)
        db.session.commit()
        print("Default admin user created.")
    else:
        print("Admin user already exists.")
        
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        create_admin()
    app.run(debug=True)
