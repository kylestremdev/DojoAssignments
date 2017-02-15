from django.shortcuts import render, redirect
import random

# Create your views here.
def index(request):
    try:
        request.session['attempts'] += 1
    except:
        request.session['attempts'] = 1

    return render(request, 'random_word/index.html')

def generate(request):
    if request.method == "POST":
        alpha = 'abcdefghijklmnopqrstuvwxyz'
        word = ''
        for _ in range(14):
            num = random.randrange(0,26)
            word += alpha[num]
        request.session['random_word'] = word
        return redirect('/')
    else:
        return redirect('/')
