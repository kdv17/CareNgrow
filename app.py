from flask import Flask, request, jsonify, session, render_template, redirect,url_for
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import pymongo

app = Flask(__name__)
app.secret_key = 'your9978752sassfddt3232'  # Set a secret key for session management
CORS(app, supports_credentials=True)


# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["myapp"]
users_collection = db["users"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/planner')
def planner():
    return render_template('planner.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/trackursleep')
def trackursleep_f():
    return render_template('trackursleep.html')

@app.route('/feeling')
def feeling():
    return render_template('feeling.html')

@app.route('/review')
def review():
    return render_template('review.html')

@app.route('/meditation')
def meditation():
    return render_template('meditation.html')

@app.route('/avatar')
def avatar():
    return render_template('avatar.html')

@app.route('/register', methods=['GET'])
def register_form():
    return render_template('register.html')

@app.route('/logout', methods=['POST'])
def logout():
    # Clear the session data (e.g., username)
    session.clear()
    return redirect(url_for('index'))  # Redirect to the index or login page

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'Username already exists'}), 409

    hashed_password = generate_password_hash(password)

    users_collection.insert_one({
        'username': username,
        'password': hashed_password,
        'sleep_entries': []
    })

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = users_collection.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        session['username'] = username  # Store the username in the session
        print(session)
        print(session['username'])
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
@app.route('/change_password', methods=['POST'])
def change_password():
    username = session.get('username')
    print(username)
    if 'username' not in session:
        return jsonify({'message': 'User not logged in'}), 401

    data = request.json
    
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    # Find the user by username and old password
    user = users_collection.find_one({'username': username, 'password': old_password})
    if not user:
        return jsonify({'message': 'Invalid old password'}), 401

    # Update the user's password
    users_collection.update_one(
        {'username': username},
        {'$set': {'password': new_password}}
    )

    return jsonify({'message': 'Password changed successfully'}), 200


@app.route('/trackursleep', methods=['GET', 'POST'])
def trackursleep():
    if request.method == 'POST':
        # Handle the POST request
        data = request.json
        username = session.get('username')
        print(session)  # Get the username from the session
        print(session.get('username'))
        sleep_time = data.get('sleep_time')
        wake_time = data.get('wake_time')

        if not username or not sleep_time or not wake_time:
            return jsonify({'message': 'Username, sleep time and wake time are required'}), 400

        user = users_collection.find_one({'username': username})
        if user:
            # Add the new sleep entry to the user's sleep_entries list
            users_collection.update_one(
                {'username': username},
                {'$push': {'sleep_entries': {'sleep_time': sleep_time, 'wake_time': wake_time}}}
            )
            return jsonify({'message': 'Sleep data added successfully'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        # Handle the GET request
        return render_template('trackursleep.html')


if __name__ == '__main__':
    app.run(debug=True, port=5500)
