import requests
from django.contrib.auth import login, authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model


class OSFTokenAuthMiddleware(object):

    def process_request(self, request):
        cookie_val = request.COOKIES.get('osf')
        if not cookie_val:
            return None

        osf_user = requests.get('http://localhost:8000/v2/users/me/', cookies={'osf': cookie_val})
        if osf_user.status_code != 200:
            return None

        user_id = osf_user.json()['data']['id']
        user_model = get_user_model()

        try:
            user = user_model.objects.get(username=user_id)
        except ObjectDoesNotExist:
            user = user_model.objects.create_user(username=user_id)

        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)

        return None
