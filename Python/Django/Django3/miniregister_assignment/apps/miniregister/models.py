from __future__ import unicode_literals

from django.db import models

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
# Create your models here.
def validateLengthAtLeastThree(value):
    if len(value) < 3:
        raise ValidationError(
            '{} must be at least 3 characters'.format(value)
        )

def validateLengthAtLeastEight(value):
    if len(value) < 8:
        raise ValidationError(
            '{} must be at least 8 characters'.format(value)
        )

class User(models.Model):
    first_name = models.CharField(max_length=45, validators=[validateLengthAtLeastThree])
    last_name = models.CharField(max_length=45, validators=[validateLengthAtLeastThree])
    email = models.CharField(max_length=100, validators=[validate_email])
    password = models.CharField(max_length=255, validators=[validateLengthAtLeastEight])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
