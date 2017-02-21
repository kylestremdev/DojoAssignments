from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.urlresolvers import reverse

from .models import User
from ..books.models import Book, Review
from django.db.models import Count


# Create your views here.
def index(request):
    return render(request, 'users/index.html')

def login(request):
    if request.method == "POST":
        post_data = {
            'email': request.POST['email'],
            'password': request.POST['password']
        }

        response = User.objects.login(post_data)

        if type(response) is list:
            for error in response:
                messages.error(request, error)
            return redirect('/')
        else:
            user = {
                'id': response.id,
                'name': response.alias
            }
            request.session['user'] = user
            return redirect(reverse('books:index'))

def register(request):
    if request.method == "POST":
        post_data = {
            'name': request.POST['name'],
            'alias': request.POST['alias'],
            'email': request.POST['email'],
            'password': request.POST['password'],
            'password_confirmation': request.POST['password_confirmation'],
        }

        response = User.objects.register(post_data)

        if type(response) is list:
            for error in response:
                messages.error(request, error)
            return redirect('/')
        else:
            user = {
                'id': response.id,
                'name': response.alias
            }
            request.session['user'] = user
            return redirect(reverse('books:index'))


def show(request, user_id):
    user = User.objects.annotate(num_reviews=Count('user_reviews')).get(id=user_id)
    books_reviewed = [ {'id': book.id, 'title': book.title} for book in Book.objects.filter(book_reviews__user__id=user_id).distinct() ]

    context = {
        'alias': user.alias,
        'name': user.name,
        'email': user.email,
        'reviews': user.num_reviews,
        'books_reviewed': books_reviewed
    }

    return render(request, 'users/show.html', context)

def logout(request):
    try:
        request.session.pop('user')
        return redirect('/')
    except:
        messages.error(request, "Logout Failed")
        return redirect(reverse('books:index'))
