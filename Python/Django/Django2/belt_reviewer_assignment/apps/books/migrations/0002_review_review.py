# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-21 01:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='review',
            field=models.TextField(default=None, max_length=400),
            preserve_default=False,
        ),
    ]
