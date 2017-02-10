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
    if 'user_id' in session:
        return redirect('/wall')

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

    session['user_id'] = user[0]['id']

    return redirect('/wall')


@app.route('/wall')
def wall():
    if 'user_id' not in session:
        return redirect('/')

    users_query = """SELECT * FROM users"""

    users = mysql.query_db(users_query)

    messages_query = """SELECT * FROM messages"""

    messages = mysql.query_db(messages_query)

    comments_query = """SELECT * FROM comments"""

    comments = mysql.query_db(comments_query)

    posts = {}


    for index in range(len(messages)-1, -1, -1):
        posts[len(messages) - 1 - index] = {
            'id': messages[index]['id'],
            'user_id': messages[index]['user_id'],
            'message': messages[index]['message'],
            'updated_at': messages[index]['updated_at'],
            'comments': []
        }

    for comment in comments:
        for post in posts:
            if posts[post]['id'] == comment['messages_id']:
                posts[post]['comments'].insert(0, comment)

    return render_template('wall.html', posts=posts, users=users)

@app.route('/message', methods=["POST"])
def post_message():
    query = """INSERT INTO messages (user_id, message, created_at, updated_at)
                VALUES (:user_id, :message, NOW(), NOW())"""

    data = {
        'user_id': request.form['user_id'],
        'message': request.form['message']
    }

    if len(data['message']) < 1:
        flash('Message must not be blank')
        return redirect('/wall')

    mysql.query_db(query, data)

    return redirect('/wall')

@app.route('/comment', methods=["POST"])
def post_comment():
    query = """INSERT INTO comments (messages_id, users_id, comment, created_at, updated_at)
                VALUES (:messages_id, :users_id, :comment, NOW(), NOW())"""

    data = {
        'messages_id': request.form['messages_id'],
        'users_id': request.form['users_id'],
        'comment': request.form['comment']
    }

    if len(data['comment']) < 1:
        flash('Comment must not be blank')
        return redirect('/wall')

    mysql.query_db(query, data)

    return redirect('/wall')

@app.route('/logout')
def logout():
    if 'user_id' in session:
        session.pop('user_id')

    return redirect('/')

@app.route('/delete/<content>/<the_id>')
def delete(content, the_id):
    if content == 'message':

        query = """SELECT * FROM messages WHERE id = :id"""
        data = { 'id': the_id }

        message = mysql.query_db(query, data)[0]

        if session['user_id'] == message['user_id']:
            del_query = """DELETE FROM messages WHERE id = :id"""

            mysql.query_db(query, data)

        return redirect('/wall')

    if content == 'comment':

        query = """SELECT * FROM comments WHERE id = :id"""
        data = { 'id': the_id }

        comment = mysql.query_db(query, data)[0]

        if session['user_id'] == comment['user_id']:
            del_query = """DELETE FROM comments WHERE id = :id"""

            mysql.query_db(query, data)

        return redirect('/wall')


app.run(debug=True)
