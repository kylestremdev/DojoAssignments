from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^secrets$', views.secrets),
    url(r'^login$', views.login),
    url(r'^register$', views.register),
    url(r'^post_secret$',views.post_secret),
    url(r'^delete/(?P<post_id>\d+?)$', views.delete),
    url(r'^like/(?P<post_id>\d+?)/(?P<user_id>\d+?)$', views.like),
    url(r'^logout$', views.logout)
]
