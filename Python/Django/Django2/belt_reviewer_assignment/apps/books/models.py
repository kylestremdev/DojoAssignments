from __future__ import unicode_literals

from django.db import models
from ..users.models import User

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BookManager(models.Manager):
    def new_book(self, post_data):
        errors = []
        if len(post_data['author_text']) < 1 and post_data['author_select'] == "None":
            errors.append('Must select author from list or add a new one')
        if len(post_data['title']) < 1:
            errors.append('Title cannot be empty')
        if len(post_data['review']) < 1:
            errors.append('Review cannot be empty')

        if len(errors) != 0:
            return errors

        new_author = False
        if len(post_data['author_text']) > 0:
            new_author = True

        author = None
        if new_author:
            author = Author.objects.create(name=post_data['author_text'])
        else:
            author = Author.objects.get(id=int(post_data['author_select']))

        user = User.objects.get(id=int(post_data['user_id']))

        book = Book.objects.create(
            title=post_data['title'],
            author=author
        )

        review = Review.objects.create(
            user=user,
            book=book,
            review=post_data['review'],
            rating=int(post_data['rating'])
        )

        return book.id



class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, related_name="books")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = BookManager()

class Review(models.Model):
    user = models.ForeignKey(User, related_name="user_reviews")
    book = models.ForeignKey(Book, related_name="book_reviews")
    review = models.TextField(max_length=400)
    rating = models.SmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
