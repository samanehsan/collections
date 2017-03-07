import requests
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from rest_framework import authentication


class OSFAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        osf_bearer_token = request.META.get('HTTP_AUTHORIZATION', None)
        if not osf_bearer_token:
            return None

        osf_user = requests.get('https://staging-api.osf.io/v2/users/me/', headers={'Authorization': 'Bearer ' + osf_bearer_token})

        if osf_user.status_code != 200:
            return None

        user_id = osf_user.json()['data']['id']
        user_model = get_user_model()
        try:
            user = user_model.objects.get(id=user_id, username=user_id)
        except ObjectDoesNotExist:
            user = user_model.objects.create_user(id=user_id, username=user_id)

        return (user, None)
