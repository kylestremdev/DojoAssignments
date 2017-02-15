from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^result$', views.results),
    url(r'^surveys/process$', views.process)

]
