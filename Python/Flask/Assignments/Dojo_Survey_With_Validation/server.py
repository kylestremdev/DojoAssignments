from flask import Flask, render_template, request, redirect, flash

app = Flask(__name__)
app.secret_key = "ThisIsSecret"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/result', methods=["POST"])
def handle_form():
    data = {}

    if len(request.form['name']) < 1:
        flash("Name cannot be empty!")
        return redirect('/')
    else:
        data['name'] = request.form['name']

    data['location'] = request.form['location']
    data['language'] = request.form['language']

    if len(request.form['comment']) < 1:
        flash("Comment cannot be empty!")
        return redirect('/')
    elif len(request.form['comment']) > 120:
        flash("Comment cannot be longer than 120 characters")
        return redirect('/')
    else:
        data['comment'] = request.form['comment']
    return render_template('results.html', data=data)

app.run(debug=True)
