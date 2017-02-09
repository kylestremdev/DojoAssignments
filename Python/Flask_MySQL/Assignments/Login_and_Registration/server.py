from flask import Flask, render_template, request, redirect, flash, session
from mysqlconnection import MySQLConnector
from flask_bcrypt import Bcrypt

import re

EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

app = Flask(__name__)
app.secret_key = "Kyle"

bcrypt = Bcrypt(app)
mysql = MySQLConnector(app, 'flaskMySQL_Login_and_Registration')

@app.route('/')
def index():
    user = None
    user_id = None
    if 'user_id' in session:
        data = { 'user_id': session['user_id'] }
        query = """SELECT * FROM users WHERE id = :user_id"""

        user = mysql.query_db(query, data)

    return render_template('index.html', user=user)

@app.route('/login', methods=["GET"])
def login():
    return render_template('login.html')

@app.route('/login', methods=["POST"])
def handle_login():
    error = False
    data = {
        'email': request.form['email'],
        'password': request.form['password']
    }

    query = """SELECT * FROM users WHERE email = :email LIMIT 1"""

    user = mysql.query_db(query, data)

    if user:
        if bcrypt.check_password_hash(user[0]['pw_hash'], data['password']):
            session['user_id'] = user[0]['id']
            pass
        else:
            flash('Incorrect password')
            return redirect('/login')
    else:
        flash('Incorrect email')
        return redirect('/login')

    return redirect('/')

@app.route('/register', methods=["GET"])
def register():
    return render_template('register.html')

@app.route('/register', methods=["POST"])
def handle_register():
    error = False
    query = """INSERT INTO users (first_name, last_name, email, pw_hash)
                VALUES (:first_name, :last_name, :email, :pw_hash)"""

    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email']
    }

    if len(data['first_name']) < 3:
        flash('First Name must not be blank')
        error = True
    elif not data['first_name'].isalpha():
        flash('First name must only contain letters')
        error = True

    if len(data['last_name']) < 3:
        flash('Last Name must not be blank')
        error = True
    elif not data['last_name'].isalpha():
        flash('Last name must only contain letters')
        error = True

    if not EMAIL_REGEX.match(data['email']):
        flash('Email must be valid')
        error = True

    if request.form['password'] != request.form['password_confirmation']:
        flash('Passwords must match')
        error = True
    elif len(request.form['password']) < 8:
        flash('Password must be at least 8 characters')
        error = True
    else:
        data['pw_hash'] = bcrypt.generate_password_hash(request.form['password'])

    if error:
        return redirect('/register')

    mysql.query_db(query, data)

    user = mysql.query_db("SELECT * FROM users WHERE email = :email AND pw_hash = :pw_hash", data)

    session['user_id'] = user[0]['id']

    return redirect('/')

@app.route('/logout')
def logout():
    session.pop('user_id')
    return redirect('/')

app.run(debug=True)
