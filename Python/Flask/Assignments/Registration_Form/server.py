from flask import Flask, render_template, request, redirect, flash, get_flashed_messages

from datetime import datetime
import re

NAME_REGEX = re.compile(r'[0-9]+')
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASS_REGEX_1 = re.compile(r'[a-zA-Z]+[0-9]+')
PASS_REGEX_2 = re.compile(r'[0-9]+[a-zA-z]+')


app = Flask(__name__)
app.secret_key = "ThisIsSecret"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=["POST"])
def register():
    data = {}
    error = False

    # check first name
    if len(request.form['f_name']) < 1:
        flash(u"First name cannot be blank", 'error')
        error = True
    elif NAME_REGEX.match(request.form['f_name']):
        flash(u"First name cannot contain numbers", 'error')
        error = True
    else:
        data['f_name'] = request.form['f_name']

    #check last name
    if len(request.form['l_name']) < 1:
        flash(u"Last name cannot be blank", 'error')
        error = True
    elif NAME_REGEX.match(request.form['l_name']):
        flash(u"Last name cannot contain numbers", 'error')
        error = True
    else:
        data['l_name'] = request.form['l_name']

    #check email
    if len(request.form['email']) < 1:
        flash(u'Email cannot be blank', 'error')
        error = True
    elif not EMAIL_REGEX.match(request.form['email']):
        flash(u'Invalid email', 'error')
        error = True
    else:
        data['email'] = request.form['email']

    #check password
    if request.form['pass'] != request.form['pass_confirm']:
        flash(u'Passwords do not match', 'error')
        error = True
    elif len(request.form['pass']) < 1:
        flash(u'Password cannot be blank', 'error')
        error = True
    elif len(request.form['pass']) < 9:
        flash(u'Password must be more than 8 characters', 'error')
        error = True
    elif (not PASS_REGEX_1.match(request.form['pass'])) and (not PASS_REGEX_2.match(request.form['pass'])):
        flash(u'Password must be alphanumeric', 'error')
        error = True
    else:
        data['pass'] = request.form['pass']

    # check birthday
    if not request.form['bday']:
        flash(u'Birthday must be filled out', 'error')
        error = True
    elif datetime.strptime(request.form['bday'], '%Y-%m-%d') > datetime.now():
        flash(u'Birthday must be in the past', 'error')
        error = True
    else:
        data['bday'] = request.form['bday']

    if not error:
        flash(u'Registered successfully', 'success')

    return redirect('/')

app.run(debug=True)
