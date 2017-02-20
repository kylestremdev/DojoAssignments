from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User, Secret, Like
from django.db.models import Count

import bcrypt, re

EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

# Create your views here.
def index(request):
    if 'user' in request.session:
        return redirect('/secrets')

    return render(request, 'index.html')

def secrets(request):
    if 'user' not in request.session:
        return redirect('/')

    context = {
        'recent': Secret.objects.annotate(num_likes=Count('message_likes')).all().order_by('created_at')[:5],
        'popular': Secret.objects.annotate(num_likes=Count('message_likes')).all().order_by('-num_likes')[:5],
        'user_likes': [like.message.id for like in User.objects.get(id=request.session['user']['id']).user_likes.all()]
    }

    return render(request, 'secrets.html', context)

def login(request):
    if request.method == "POST":
        user = None
        try:
            user = User.objects.get(email=request.POST['email'])
        except:
            messages.error(request, "Incorrect email")
            return redirect('/')

        if bcrypt.hashpw(request.POST['password'].encode('utf-8'), user.password.encode('utf-8')) == user.password:
            request.session['user'] = {
                'id': user.id,
                'first_name': user.first_name
            }
            return redirect('/secrets')
        else:
            messages.error(request, "Incorrect Password")
            return redirect('/')

def register(request):
    if request.method == "POST":
        errors = False
        data = {
            'first_name': request.POST['first_name'],
            'last_name': request.POST['last_name'],
            'email': request.POST['email'],
            'password': request.POST['password']
        }

        #first name
        if len(data['first_name']) < 1:
            messages.error(request, "First Name is required")
            errors = True
        #last name
        if len(data['last_name']) < 1:
            messages.error(request, "Last Name is required")
            errors = True
        #email
        if len(data['email']) < 1:
            messages.error(request, "Email is required")
            errors = True
        elif not EMAIL_REGEX.match(data['email']):
            messages.error(request, "Email must be valid")
            errors = True
        #password
        if len(data['password']) < 1:
            message.error(request, "Password is required")
            errors = True
        elif data['password'] != request.POST['password_confirmation']:
            message.error(request, "Passwords must match")
            errors = True

        if errors:
            return redirect('/')

        data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password']
        )
        user.save()

        request.session['user'] = {
            'id': user.id,
            'first_name': user.first_name
        }

        return redirect('/secrets')



def post_secret(request):
    if request.method == "POST":
        if len(request.POST['secret']) < 1:
            message.error(request, "Cannot post empty secret")
            return redirect('/secrets')

        user = User.objects.get(id=request.session['user']['id'])

        Secret.objects.create(user=user, content=request.POST['secret'])

        return redirect('/secrets')

def delete(request, post_id):
    user = None
    try:
        user = User.objects.get(id=request.session['user']['id']).secrets.get(id=post_id)
    except:
        return redirect('/secrets')

    secret = Secret.objects.get(id=post_id)
    secret.delete()

    return redirect('/')

def like(request, post_id, user_id):
    try:
        like = Like.objects.get(user__id=user_id, message__id=post_id)
        like.delete()
        return redirect('/secrets')
    except:
        user = User.objects.get(id=user_id)
        secret = Secret.objects.get(id=post_id)

        Like.objects.create(user=user, message=secret)

        return redirect('/secrets')

def logout(request):
    request.session.pop('user')
    return redirect('/')
