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


class Group(models.Model):
    title = models.TextField()
    description = models.TextField()
    collection = models.ForeignKey(to='Collection')
    created_by = models.ForeignKey(User)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Item(models.Model):
    source_id = models.TextField()
    title = models.TextField()
    type = models.TextField()
    status = models.TextField()
    url = models.URLField()
    collection = models.ForeignKey(to='Collection')
    group = models.ForeignKey(to='Group', null=True, blank=True, default=None)
    created_by = models.ForeignKey(User)
    metadata = models.TextField()
    date_added = models.DateTimeField(null=True, blank=True, default=None)
    date_submitted = models.DateTimeField(auto_now_add=True)
