from rest_framework import generics
from serializers import CollectionSerializer
from models import Collection


class CollectionList(generics.ListCreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
