from __future__ import unicode_literals

from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.db import models

# Create your models here.
def validateIsNotEmpty(value):
    if len(value) < 1:
        raise ValidationError(
            '{} must not be empty'.format(value)
        )

def validateLengthGreaterThanEight(value):
    if len(value) < 8:
        raise ValidationError(
            '{} must be longer than: 8'.format(value)
        )

class User(models.Model):
    name = models.CharField(max_length=45, validators=[validateIsNotEmpty])
    alias = models.CharField(max_length=45, validators=[validateIsNotEmpty])
    email = models.CharField(max_length=45, validators=[EmailValidator])
    password = models.CharField(max_length=255)
