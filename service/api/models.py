from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.TextField(primary_key=True)


class Collection(models.Model):
    title = models.TextField()
    description = models.TextField()
    tags = models.TextField()
    created_by = models.ForeignKey(User)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    settings = models.TextField(null=True)

    class Meta:
        permissions = (
            ('approve_items', 'Approve items'),
        )

    def __str__(self):
        return self.title


class Group(models.Model):
    title = models.TextField()
    description = models.TextField()
    collection = models.ForeignKey(to='Collection', related_name='groups')
    created_by = models.ForeignKey(User)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Item(models.Model):
    TYPES = (
        ('project', 'project'),
        ('preprint', 'preprint'),
        ('registration', 'registration'),
        ('file', 'file'),
        ('website', 'website')
    )
    source_id = models.TextField()
    title = models.TextField()
    type = models.TextField(choices=TYPES)
    status = models.TextField()
    url = models.URLField()
    collection = models.ForeignKey(to='Collection', related_name='items')
    group = models.ForeignKey(to='Group', null=True, blank=True, default=None, related_name='items')
    created_by = models.ForeignKey(User)
    metadata = models.TextField()
    date_added = models.DateTimeField(null=True, blank=True, default=None)
    date_submitted = models.DateTimeField(auto_now_add=True)
