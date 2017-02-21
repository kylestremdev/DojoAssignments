from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^add$', views.add, name="add"),
    url(r'^new_book$', views.new_book, name="new_book"),
    url(r'^(?P<book_id>\d+?)$', views.show_book, name="show_book"),
    url(r'^new_review', views.new_review, name="new_review"),
    url(r'^delete/(?P<review_id>\d+?)/(?P<book_id>\d+?)$', views.delete_review, name="delete")
]
