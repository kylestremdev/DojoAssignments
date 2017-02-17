from __future__ import unicode_literals

from django.db import models

import bcrypt

import re

import json

EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

# Create your models here.
class UserManager(models.Manager):
    def login(self, memo, postData):
        try:
            user = User.objects.filter(email=postData['email'])[0]
        except:
            print User.objects.filter(email=postData['email'])[0]
            memo.append("Incorrect Email")
            return False

        print bcrypt.hashpw(postData['password'].encode('UTF_8'), user.password.encode('UTF_8')) == user.password

        if bcrypt.hashpw(postData['password'].encode('UTF_8'), user.password.encode('UTF_8')) == user.password:
            memo.append("Successfully registered user!")
            return user
        else:
            memo.append("Incorrect Password")
            return False

    def register(self, memo, postData):
        if len(postData['first_name']) < 2:
            memo.append("First Name must be at least 2 characters.")
        if len(postData['last_name']) < 2:
            memo.append("Last Name must be at least 2 characters.")
        if not EMAIL_REGEX.match(postData['email']):
            memo.append("Invalid Email")
        if len(postData['password']) < 8:
            memo.append("Password must be at least 8 characters")
        if postData['password'] != postData['password_confirmation']:
            memo.append("Passwords must match")

        if len(memo) > 0:
            return False

        password=bcrypt.hashpw(postData['password'].encode('UTF_8'), bcrypt.gensalt())

        user = User(
            first_name=postData['first_name'],
            last_name=postData['last_name'],
            email=postData['email'],
            password=password
        )
        user.save()
        memo.append("Successfully registered user!")

        return user

class User(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __str__(self):
        return "Name: {} {}, Email: {}, Password: {}".format(
            self.first_name,
            self.last_name,
            self.email,
            self.password
        )
