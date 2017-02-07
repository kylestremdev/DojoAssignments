from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    print "Got Post Info"

    data = {}
    data['name'] = request.form['name']
    data['dojo_location'] = request.form['dojo_location']
    data['language'] = request.form['language']
    data['comment'] = request.form['comment']

    return render_template("result.html", data=data)

app.run(debug=True)
