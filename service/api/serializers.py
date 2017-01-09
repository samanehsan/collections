from django.db import IntegrityError
from rest_framework import serializers
from models import Collection, Item


class ItemSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    title = serializers.CharField(required=True)
    url = serializers.URLField()

    class Meta:
        model = Item

    def create(self, validated_data):
        collection_id = self.context['request'].parser_context['kwargs']['pk']
        try:
            item = Item.objects.create(**validated_data)
        except IntegrityError:
            item = Item.objects.get(_id=validated_data['_id'])
        collection = Collection.objects.get(id=collection_id)
        collection.items.add(item)
        return item

    def update(self, item, validated_data):
        item.title = validated_data['title']
        item.url = validated_data['url']
        item.save()
        return item


class CollectionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    items = ItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Collection

    def create(self, validated_data):
        return Collection.objects.create(**validated_data)

    def update(self, collection, validated_data):
        collection.title = validated_data['title']
        collection.save()
        return collection
