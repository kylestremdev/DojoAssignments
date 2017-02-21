from __future__ import unicode_literals

from django.db import models

import re, bcrypt

EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

# Create your models here.
class UserManager(models.Manager):
    def register(self, post_data):
        errors = []
        #name
        if len(post_data['name']) < 1:
            errors.append("Name cannot be empty")
        #alias
        if len(post_data['alias']) < 1:
            errors.append("Alias cannot be empty")
        #email
        if len(post_data['email']) < 1:
            errors.append("Email cannot be empty")
        elif not EMAIL_REGEX.match(post_data['email']):
            errors.append("Email must be valid")
        #password
        if len(post_data['password']) < 1:
            errors.append("Password cannot be empty")
        elif len(post_data['password']) < 8:
            errors.append("Password must be longer than 8 characters")
        elif post_data['password'] != post_data['password_confirmation']:
            errors.append("Passwords must match")

        if len(errors) != 0:
            return errors

        password = bcrypt.hashpw(post_data['password'].encode('utf-8'), bcrypt.gensalt())

        user = User(
            name=post_data['name'],
            alias=post_data['alias'],
            email=post_data['email'],
            password=password
        )

        user.save()

        return user

    def login(self, post_data):
        errors = []

        user = None
        #email
        try:
            user = User.objects.get(email=post_data['email'])
        except:
            errors.append("Incorrect Email")
            return errors

        if bcrypt.hashpw(post_data['password'].encode('utf-8'), user.password.encode('utf-8')) == user.password:
            return user
        else:
            errors.append("Incorrect Password")
            return errors

class User(models.Model):
    name = models.CharField(max_length=50)
    alias = models.CharField(max_length=16)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
