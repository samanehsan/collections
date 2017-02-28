import requests
from django.contrib.auth import login
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User


class OSFTokenAuthMiddleware(object):

    def process_request(self, request):
        osf_bearer_token = request.META.get('HTTP_AUTHORIZATION', None)
        if not osf_bearer_token:
            return None

        osf_user = requests.get('https://staging-api.osf.io/v2/users/me/', headers={'Authorization': 'Bearer ' + osf_bearer_token})
        if osf_user.status_code is not 200:
            return None

        user_id = osf_user.json()['data']['id']

        try:
            user = User.objects.get(username=user_id)
        except ObjectDoesNotExist:
            user = User.objects.create_user(username=user_id)

        user.backend = 'django.contrib.auth.backends.ModelBackend' # Hack to allow login without authentication
        user.save()
        login(request, user)

        return None
