from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from serializers import CollectionSerializer, ItemSerializer
from models import Collection, Item


@api_view(['GET'])
def api_root(request):
    return Response({
        'collections': reverse('collection-list', request=request),
        'items': reverse('item-list', request=request)
    })


class CollectionList(generics.ListCreateAPIView):
    """View list of collections and create a new collection. """
    serializer_class = CollectionSerializer

    def get_queryset(self):
        queryset = Collection.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset


class CollectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CollectionSerializer

    def get_object(self):
        return Collection.objects.get(id=self.kwargs['pk'])


class CollectionItemList(generics.ListCreateAPIView):
    """View items in a collection and create a new item to add to the collection. """
    serializer_class = ItemSerializer

    def get_queryset(self):
        return Item.objects.filter(collection=self.kwargs['pk'])


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer

    def get_object(self):
        return Item.objects.get(id=self.kwargs['item_id'])
