from django.db.models import Q
from rest_framework import generics
from rest_framework import permissions as drf_permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from serializers import CollectionSerializer, GroupSerializer, ItemSerializer
from models import Collection, Group, Item
from permissions import CanEditCollection, CanEditItem, CanEditGroup


@api_view(['GET'])
def api_root(request):
    return Response({
        'collections': reverse('collection-list', request=request),
        'items': reverse('item-list', request=request)
    })


class CollectionList(generics.ListCreateAPIView):
    """View list of collections and create a new collection. """
    serializer_class = CollectionSerializer
    permission_classes = (drf_permissions.IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        queryset = Collection.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset


class CollectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CollectionSerializer
    permission_classes = (
      drf_permissions.IsAuthenticatedOrReadOnly,
      CanEditCollection
    )

    def get_object(self):
        return Collection.objects.get(id=self.kwargs['pk'])


class GroupList(generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    permission_classes = (
      drf_permissions.IsAuthenticatedOrReadOnly,
      CanEditGroup
    )

    def get_queryset(self):
        groups = Group.objects.all()
        if self.kwargs.get('pk', None):
            return groups.filter(collection=self.kwargs['pk'])
        return groups


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    permission_classes = (
      drf_permissions.IsAuthenticatedOrReadOnly,
      CanEditGroup
    )

    def get_object(self):
        return Group.objects.get(id=self.kwargs['group_id'])


class GroupItemList(generics.ListCreateAPIView):
    """View items in a collection and create a new item to add to the collection. """
    serializer_class = ItemSerializer
    permission_classes = (drf_permissions.IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        user = self.request.user
        collection_id = self.kwargs['pk']
        collection = Collection.objects.get(id=collection_id)
        queryset = Item.objects.filter(group=self.kwargs['group_id'])
        if user.id == collection.created_by_id:
            return queryset
        return queryset.filter(Q(status='approved') | Q(created_by=user.id))


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    permission_classes = (
      drf_permissions.IsAuthenticatedOrReadOnly,
      CanEditItem
    )

    def get_object(self):
        return Item.objects.get(id=self.kwargs['item_id'])


class CollectionItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = (drf_permissions.IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        user = self.request.user
        collection_id = self.kwargs['pk']
        collection = Collection.objects.get(id=collection_id)
        queryset = Item.objects.filter(collection=collection_id, group=None)
        if user.id == collection.created_by_id:
            return queryset
        return queryset.filter(Q(status='approved') | Q(created_by=user.id))


class ItemList(generics.ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = (drf_permissions.IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        user = self.request.user
        return Item.objects.filter(Q(status='approved') | Q(created_by=user.id) | Q(collection__created_by=user.id))
