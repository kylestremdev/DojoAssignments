from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse

from .forms import RegisterForm
# Create your views here.
def index(request):
    form = RegisterForm()
    context = { "regForm": form }
    return render(request, 'users/index.html', context)

def register(request):
    if request.method == "POST":
        bound_form = RegisterForm(request.POST)

        print bound_form.is_valid()
        print bound_form
