from flask import Flask, render_template, redirect, request, session
import random

app = Flask(__name__)
app.secret_key = 'ThisIsSecret'

@app.route('/')
def index():
    try:
        if not session['randomNumber']:
            session['randomNumber'] = random.randrange(0,101)
    except KeyError:
        session['randomNumber'] = random.randrange(0,101)
    try:
        session['guess']
    except:
        session['guess'] = None

    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    session['guess'] = int(request.form['guess'])
    return redirect('/')

@app.route('/again', methods=['POST'])
def again():
    session['guess'] = None
    session['randomNumber'] = random.randrange(0,101)
    return redirect('/')

@app.route('/new')
def new_game():
    session.pop('randomNumber')
    session.pop('guess')
    return redirect('/')

app.run(debug=True)
