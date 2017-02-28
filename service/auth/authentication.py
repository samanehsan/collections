from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions

class OSFAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        return request.get('user', None)
