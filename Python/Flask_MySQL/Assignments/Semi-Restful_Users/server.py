from flask import Flask, render_template, redirect, request, flash
from mysqlconnection import MySQLConnector

app = Flask(__name__)
app.secret_key = 'Kyle'

mysql = MySQLConnector(app, 'flaskMySQL_Semi-Restful_Users')

@app.route('/users/')
def index():
    query = """SELECT * FROM users"""

    users = mysql.query_db(query)

    return render_template('index.html', users=users)

@app.route('/users/new')
def new():
    return render_template('new.html')

@app.route('/users/<user_id>/edit')
def edit(user_id):
    query = """SELECT * FROM users WHERE id = :user_id"""

    data = { 'user_id': user_id }

    user = mysql.query_db(query, data)[0]

    return render_template('edit.html', user=user)

@app.route('/users/<user_id>', methods=["GET"])
def show(user_id):
    query = """SELECT * FROM users WHERE id = :user_id"""

    data = { 'user_id': user_id }

    user = mysql.query_db(query, data)[0]

    return render_template('show.html', user=user)

@app.route('/users/create', methods=["POST"])
def create():
    query = """INSERT INTO users (first_name, last_name, email, created_at)
                VALUES (:first_name, :last_name, :email, NOW())"""

    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email']
    }

    user_id = mysql.query_db(query, data)

    return redirect('/users/{}'.format(user_id))

@app.route('/users/<user_id>/destroy')
def destroy(user_id):
    query = """DELETE FROM users WHERE id = :user_id"""

    data = { 'user_id': user_id }

    mysql.query_db(query, data)

    return redirect('/users')

@app.route('/users/<user_id>', methods=['POST'])
def update(user_id):
    query = """UPDATE users
                SET first_name = :first_name, last_name = :last_name, email = :email
                WHERE id = :user_id"""

    data = {
        'user_id': user_id,
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email']
    }

    mysql.query_db(query, data)

    return redirect('/users/{}'.format(data['user_id']))

app.run(debug=True)
