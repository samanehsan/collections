from rest_framework import generics
from serializers import CollectionSerializer, ItemSerializer
from models import Collection, Item


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


class ItemDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ItemSerializer

    def get_object(self):
        return Item.objects.get(_id=self.kwargs['item_id'])
