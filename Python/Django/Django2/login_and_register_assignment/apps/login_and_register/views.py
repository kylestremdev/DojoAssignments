from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User


# Create your views here.
def index(request):
    return render(request, 'index.html')

def success(request):
    return render(request, 'success.html')

def login(request):
    if request.method == "POST":
        postData = {
            'email': request.POST['email'],
            'password': request.POST['password']
        }
        memos = []

        user = User.objects.login(memos, postData)



        if user:
            userDict = {
                'id': user.id,
                'first_name':user.first_name
            }

            for memo in memos:
                messages.success(request, memo)

            request.session['user'] = userDict
            return redirect('/success')
        else:
            for memo in memos:
                messages.error(request, memo)
            return redirect('/')


def register(request):
    if request.method == "POST":
        postData = {
            'first_name': request.POST['first_name'],
            'last_name': request.POST['last_name'],
            'email': request.POST['email'],
            'password': request.POST['password'],
            'password_confirmation': request.POST['password_confirmation']
        }

        memos = []

        user = User.objects.register(memos, postData)

        print user

        if user:
            userDict = {
                'id': user.id,
                'first_name':user.first_name
            }

            for memo in memos:
                messages.success(request, memo)

            request.session['user'] = userDict
            return redirect('/success')
        else:
            for memo in memos:
                messages.error(request, memo)

            return redirect('/')
