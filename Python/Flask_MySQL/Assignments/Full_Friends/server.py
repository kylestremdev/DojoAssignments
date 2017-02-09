from flask import Flask, render_template, request, redirect, flash
from mysqlconnection import MySQLConnector

import re

EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

app = Flask(__name__)
app.secret_key = "Kyle"

mysql = MySQLConnector(app, 'flaskMySQL_Full_Friends')

@app.route('/')
def index():
    query = "SELECT * FROM friends"
    friends = mysql.query_db(query)

    return render_template('index.html', friends=friends)

@app.route('/friends', methods=["POST"])
def create():
    error = False
    query = """INSERT INTO friends (first_name, last_name, email, created_at)
                VALUES (:first_name, :last_name, :email, NOW())"""

    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email'],
    }

    if len(data['first_name']) < 1:
        flash(u'First name cannot be blank', 'error')
        error = True

    if len(data['last_name']) < 1:
        flash(u'Last name cannot be blank', 'error')
        error = True

    if len(data['email']) < 1:
        flash(u'Email cannot be blank', 'error')
        error = True
    elif not EMAIL_REGEX.match(data['email']):
        flash(u'Email must be valid', 'error')
        error = True

    if error:
        return redirect('/')

    mysql.query_db(query, data)

    flash(u'Friend added successfully', 'success')
    return redirect('/')

@app.route('/friends/<friend_id>/edit')
def edit(friend_id):
    query = """SELECT * FROM friends WHERE id = :id"""
    data = { 'id': friend_id }

    friend = mysql.query_db(query, data)

    return render_template('edit.html', friend=friend)

@app.route('/friends/<friend_id>', methods=["POST"])
def update(friend_id):
    query = """UPDATE friends
                SET first_name = :first_name, last_name = :last_name, email = :email
                WHERE id = :id"""

    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email'],
        'id': friend_id
    }

    if len(data['first_name']) < 1:
        flash(u'First name cannot be blank', 'error')
        error = True

    if len(data['last_name']) < 1:
        flash(u'Last name cannot be blank', 'error')
        error = True

    if len(data['email']) < 1:
        flash(u'Email cannot be blank', 'error')
        error = True
    elif not EMAIL_REGEX.match(data['email']):
        flash(u'Email must be valid', 'error')
        error = True

    if error:
        return redirect('/friends/'+ str(friend_id) + '/edit')

    mysql.query_db(query, data)

    return redirect('/')

@app.route('/friends/<friend_id>/delete', methods=["POST"])
def destroy(friend_id):
    query = """DELETE FROM friends WHERE id = :id"""
    data = {'id': friend_id}
    mysql.query_db(query, data)

    return redirect('/')

app.run(debug=True)
