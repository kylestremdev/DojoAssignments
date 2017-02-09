from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ninja/')
def ninja():
    return render_template('turtle.html', turtle="tmnt.png")

@app.route('/ninja/<color>')
def ninjas(color):
    turtle = 'notapril.jpg'
    if color == 'blue':
        turtle = 'leonardo.jpg'
        return render_template("turtle.html", turtle=turtle)
    elif color == 'orange':
        turtle = 'michelangelo.jpg'
        return render_template("turtle.html", turtle=turtle)
    elif color == 'red':
        turtle = 'raphael.jpg'
        return render_template("turtle.html", turtle=turtle)
    elif color == 'purple':
        turtle = 'donatello.jpg'
        return render_template("turtle.html", turtle=turtle)
    else:
        return render_template("turtle.html", turtle=turtle)

app.run(debug=True)
