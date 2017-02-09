from flask import Flask, render_template, request, redirect, flash
from mysqlconnection import MySQLConnector

import re

EMAIL_REGEX = re.compile(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')

app = Flask(__name__)
app.secret_key = "ThisIsSecret"

mysql = MySQLConnector(app, 'flaskMySQL_Email_Validation')

@app.route('/')
def index():
    query = "SELECT * FROM emails"
    emails = mysql.query_db(query)
    return render_template('index.html', emails=emails)

@app.route('/create', methods=["POST"])
def create():
    if not EMAIL_REGEX.match(request.form['email']):
        flash(u"Email was not valid", 'error')
    else:
        email = request.form["email"]
        flash(u'Thank you for entering ' + email + ' it is now in our database', 'success')

        query = "INSERT INTO emails (email, created_at) VALUES (:email, NOW())"
        data = {
            'email': email
        }
        mysql.query_db(query, data)
    return redirect('/')

@app.route('/delete', methods=["POST"])
def delete():
    email_id = request.form['id']
    query = "DELETE FROM emails WHERE id = :id"
    data = {
        'id': email_id
    }
    mysql.query_db(query, data)
    return redirect('/')


app.run(debug=True)
