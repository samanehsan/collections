from rest_framework import authentication


class OSFAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        user = getattr(request._request, 'user', None)
        if not user:
            return None
        return (user, None)
