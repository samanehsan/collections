from rest_framework import serializers
from rest_framework.reverse import reverse
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
    id = serializers.CharField(read_only=True)
    source_id = serializers.CharField()
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
        collection = Collection.objects.get(id=collection_id)
        item = Item.objects.create(
            created_by=user,
            collection=collection,
            **validated_data
        )
        return item

    def update(self, item, validated_data):
        item.title = validated_data['title']
        item.url = validated_data['url']
        item.save()
        return item


class CollectionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField(allow_blank=True)
    tags = serializers.CharField(allow_blank=True)
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
        description = validated_data['description']
        tags = validated_data['tags']
        if description:
            collection.description = description
        if tags:
            collection.tags = tags
        collection.save()
        return collection

    def get_items(self, obj):
        return reverse('collection-items', kwargs={'pk': obj.id}, request=self.context['request'])
