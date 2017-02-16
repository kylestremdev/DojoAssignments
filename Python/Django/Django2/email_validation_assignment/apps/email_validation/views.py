from django.shortcuts import render, redirect
from .models import Email
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your views here.
def index(request):
    return render(request, 'index.html')

def check_email(request):
    if request.method == "POST":
        if EMAIL_REGEX.match(request.POST['email']):
            email = Email(email=request.POST['email'])
            email.save()
            return redirect('/success')
        else:
            request.session['error'] = "Invalid Email"
            return redirect('/')

def success(request):
    context = {
        'emails': Email.objects.all()
    }

    return render(request, 'success.html', context)
