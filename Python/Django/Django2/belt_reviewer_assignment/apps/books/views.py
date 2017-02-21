from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.urlresolvers import reverse

from .models import Author, Book, Review
from ..users.models import User

# Create your views here.
def index(request):
    context = {
        'reviews': Review.objects.all().order_by('created_at')[:3],
        'books': Book.objects.all()
    }
    return render(request, 'books/index.html', context)

def add(request):
    return render(request, 'books/add.html')

def new_book(request):
    if request.method == "POST":
        response = Book.objects.new_book(request.POST)

        if type(response) is list:
            for error in response:
                messages.error(request, error)
            return redirect(reverse('books:add'))
        else:
            return redirect(reverse('books:show_book', kwargs={'book_id': response}))

def show_book(request, book_id):
    context = {
        'book': Book.objects.get(id=book_id)
    }

    return render(request, 'books/show.html', context)

def new_review(request):
    if request.method == "POST":
        if len(request.POST['review']) > 1:
            book = Book.objects.get(id=request.POST['book_id'])
            user = User.objects.get(id=request.POST['user_id'])

            Review.objects.create(
                user=user,
                book=book,
                review=request.POST['review'],
                rating=request.POST['rating']
            )

            return redirect(reverse('books:show_book', kwargs={'book_id': request.POST['book_id']}))

def delete_review(request, review_id, book_id):
    review = Review.objects.get(id=review_id)

    if review.user.id == request.session['user']['id']:
        review.delete()
        return redirect(reverse('books:show_book', kwargs={'book_id': book_id}))
    else:
        messages.error('Cannot delete another user\'s review')
        return redirect(reverse('books:show_book', kwargs={'book_id': book_id}))
