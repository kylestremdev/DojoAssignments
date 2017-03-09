from django.shortcuts import render, redirect
from django.contrib import messages

from .forms import RegisterForm, LoginForm
from .models import User

# Create your views here.
def index(request):
    if 'user' in session:
        return redirect('/success')
    context = {
        'register': RegisterForm()
    }
    return render(request, 'index.html', context)

def register(request):
    if request.method == "POST":
        regForm = RegisterForm(request.POST)

        if not regForm.is_valid():
            for field in regForm:
                messages.error(request, field.errors)
            return redirect('/')

        if regForm.cleaned_data['password'] != regForm.cleaned_data['password_confirmation']:
            messages.error(request, "Passwords must match")
            return redirect('/')

        user = regForm.save()

        request.session['user'] = {
            'id': user.id,
            'first_name': user.first_name,
            'from': 'register'
        }

        return redirect('/success')

def login(request):
    pass

def success(request):
    return render(request, 'show.html')
