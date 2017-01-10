from django.db import IntegrityError
from rest_framework import serializers
from models import Collection, Item, User


class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()

    def create(self, validated_data):
        _id = validated_data['id']
        username = validated_data['username']
        email = validated_data['email']
        return User.objects.create_user(
            id=_id,
            username=username,
            email=email,
            password='password'
        )


class ItemSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id')
    title = serializers.CharField(required=True)
    type = serializers.CharField()
    status = serializers.CharField()
    url = serializers.URLField()
    created_by = UserSerializer(read_only=True)
    is_displayed = serializers.BooleanField()
    metadata = serializers.CharField(allow_blank=True)
    date_added = serializers.DateTimeField()

    class Meta:
        model = Item

    def create(self, validated_data):
        user = self.context['request'].user
        collection_id = self.context['request'].parser_context['kwargs'].get('pk', None)
        collection = None
        if collection_id:
            collection = Collection.objects.get(id=collection_id)
        try:
            item = Item.objects.create(
              created_by=user, collection=collection, **validated_data)
        except IntegrityError:
            item = Item.objects.get(_id=validated_data['_id'])
        return item

    def update(self, item, validated_data):
        item.title = validated_data['title']
        item.url = validated_data['url']
        item.save()
        return item


class CollectionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField()
    tags = serializers.CharField()
    created_by = UserSerializer(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_updated = serializers.DateTimeField(read_only=True)
    items = serializers.SerializerMethodField()

    class Meta:
        model = Collection

    def create(self, validated_data):
        user = self.context['request'].user
        return Collection.objects.create(created_by=user, **validated_data)

    def update(self, collection, validated_data):
        collection.title = validated_data['title']
        collection.save()
        return collection

    def get_items(self):
        url = self.context['request'].build_absolute_uri()
        return url + 'items/'
