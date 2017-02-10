from flask import Flask, render_template, redirect, request, flash, session
from mysqlconnection import MySQLConnector
from flask_bcrypt import Bcrypt

import re
EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

app = Flask(__name__)
app.secret_key = "Kyle"

bcrypt = Bcrypt(app)

mysql = MySQLConnector(app, 'flaskMySQL_The_Wall')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    error = False
    query = """SELECT * FROM users WHERE email = :email LIMIT 1"""
    data = {
        'email': request.form['email'],
        'password': request.form['password']
    }

    user = mysql.query_db(query, data)

    if user:
        if bcrypt.check_password_hash(user[0]['password'], data['password']):
            session['user_id'] = user[0]['id']
        else:
            flash('Incorrect password')
            error = True
    else:
        flash('Incorrect email')
        error = True

    if error:
        return redirect('/')

    return redirect('/wall')

@app.route('/register', methods=["POST"])
def register():
    error = False
    query = """INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
                VALUES (:first_name, :last_name, :email, :password, NOW(), NOW())"""

    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email']
    }

    if len(data['first_name']) < 3:
        flash('First name must be more than 2 characters')
        error = True
    elif not data['first_name'].isalpha():
        flash('First name cannot contain numbers or punctuation')
        error = True

    if len(data['last_name']) < 3:
        flash('Last name must be more than 2 characters')
        error = True
    elif not data['last_name'].isalpha():
        flash('Last name cannot contain numbers or punctuation')
        error = True

    if len(data['email']) < 1:
        flash('Email cannot be blank')
        error = True
    elif not EMAIL_REGEX.match(data['email']):
        flash('Email must be valid')
        error = True

    if len(request.form['password']) < 8:
        flash('Password must be more than 8 character')
        error = True
    elif request.form['password'] != request.form['password_confirmation']:
        flash('Passwords must match')
        error = True
    else:
        data['password'] = bcrypt.generate_password_hash(request.form['password'])

    if error:
        return redirect('/')

    mysql.query_db(query, data)

    user = mysql.query_db("SELECT * FROM users WHERE email = :email AND password = :password", data)

    print user

    session['user_id'] = user[0]['id']

    return redirect('/wall')


@app.route('/wall')
def wall():
    messages_query = """SELECT * FROM messages"""

    messages = mysql.query_db(messages_query)

    comments_query = """SELECT * FROM comments"""

    comments = mysql.query_db(comments_query)

    posts = {}

    for message in messages:
        posts[message['id']] = {
            'message': message['message'],
            'comments': []
        }

    for comment in comments:
        posts[comment['messages_id']]['comments'].push(comment['comment'])

    return render_template('wall.html', posts=posts)

# TODO: Create routes for handling posts and comments


app.run(debug=True)
