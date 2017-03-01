from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth import login
import requests

class OSFAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        osf_bearer_token = request.META.get('HTTP_AUTHORIZATION', None)
        if not osf_bearer_token:
            return None

        print("starting DRF authenticator")
        osf_user = requests.get('https://staging-api.osf.io/v2/users/me/', headers={'Authorization': 'Bearer ' + osf_bearer_token})
        print("about to return from drf authenticator")

        if osf_user.status_code is not 200:
            return None

        user_id = osf_user.json()['data']['id']

        try:
            user = User.objects.get(username=user_id)
        except ObjectDoesNotExist:
            user = User.objects.create_user(username=user_id)

        #user.backend = 'django.contrib.auth.backends.ModelBackend' # Hack to allow login without authentication
        #login(request, user)
        return (user, None)
