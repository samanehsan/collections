from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User


class Collection(models.Model):
    title = models.TextField()
    description = models.TextField()
    tags = models.TextField()
    created_by = models.ForeignKey(User)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Item(models.Model):
    _id = models.TextField(primary_key=True)
    title = models.TextField()
    type = models.TextField()
    status = models.TextField()
    url = models.URLField()
    collection = models.ForeignKey(to='Collection')
    created_by = models.ForeignKey(User)
    is_displayed = models.BooleanField(default=True)
    metadata = models.TextField()
    date_added = models.DateTimeField()
