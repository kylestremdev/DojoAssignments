from flask import Flask, render_template, request, redirect, session
from datetime import datetime
import random

app = Flask(__name__)
app.secret_key = 'ThisIsSecret'

@app.route('/')
def index():
    try:
        if not session['gold']:
            session['gold'] = 0
    except KeyError:
        session['gold'] = 0
        session['message'] = []
    return render_template('index.html')

@app.route('/process_money', methods=['POST'])
def process_money():
    if (request.form['activity'] == 'farm'):
        gold_gained = random.randrange(10,21)
        session['gold'] += gold_gained
        arr = ["Earned {} gold from the farm! ({})".format(gold_gained, datetime.now().strftime("%A, %d. %B %Y %I:%M:%S%p")), "good"]
        session['message'].insert(0,arr)
    elif (request.form['activity'] == 'cave'):
        gold_gained = random.randrange(5,11)
        session['gold'] += gold_gained
        arr = ["Earned {} gold from the cave! ({})".format(gold_gained, datetime.now().strftime("%A, %d. %B %Y %I:%M:%S%p")), "good"]
        session['message'].insert(0,arr)
    elif (request.form['activity'] == 'house'):
        gold_gained = random.randrange(2,6)
        session['gold'] += gold_gained
        arr = ["Earned {} gold from the house! ({})".format(gold_gained, datetime.now().strftime("%A, %d. %B %Y %I:%M:%S%p")), "good"]
        session['message'].insert(0,arr)
    elif (request.form['activity'] == 'casino'):
        chance = random.randrange(0,2)
        if chance == 1:
            gold_gained = random.randrange(0,51)
            session['gold'] += gold_gained
            arr = ["Earned {} gold from the casino! ({})".format(gold_gained, datetime.now().strftime("%A, %d. %B %Y %I:%M:%S%p")), "good"]
            session['message'].insert(0,arr)
        else:
            gold_lost = random.randrange(0,51)
            session['gold'] -= gold_lost
            arr = ["Lost {} gold from the casino! ({})".format(gold_lost, datetime.now().strftime("%A, %d. %B %Y %I:%M:%S%p")), "bad"]
            session['message'].insert(0,arr)

    return redirect('/')

@app.route('/new')
def new():
    session['gold'] = 0
    session['message'] = []
    return redirect('/')

app.run(debug=True)
