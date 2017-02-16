from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Name: {}".format(self.name)

class Description(models.Model):
    course = models.OneToOneField(
        Course,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Course: {}, Content: {}".format(self.course, self.content)
