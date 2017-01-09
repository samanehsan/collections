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
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class CollectionDetail(generics.RetrieveUpdateAPIView):
    serializer_class = CollectionSerializer

    def get_object(self):
        return Collection.objects.get(id=self.kwargs['pk'])


class CollectionItemList(generics.ListCreateAPIView):
    """View items in a collection and create a new item to add to the collection. """
    serializer_class = ItemSerializer

    def get_queryset(self):
        return [item for item in Collection.objects.filter(id=self.kwargs['pk'])[0].items.all()]


class ItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()
        collection_id = self.request.query_params.get('collection_id', None)
        if collection_id is not None:
            queryset = queryset.filter(collection=collection_id)
        return queryset


class ItemDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ItemSerializer

    def get_object(self):
        return Item.objects.get(_id=self.kwargs['item_id'])
