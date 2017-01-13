import datetime
from rest_framework import serializers
from rest_framework.reverse import reverse
from models import Collection, Group, Item, User


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
    status = serializers.CharField(read_only=True)
    url = serializers.URLField()
    created_by = UserSerializer(read_only=True)
    metadata = serializers.CharField(allow_blank=True)
    date_added = serializers.DateTimeField(read_only=True, allow_null=True)
    date_submitted = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Item

    def create(self, validated_data):
        user = self.context['request'].user
        collection_id = self.context['request'].parser_context['kwargs'].get('pk', None)
        collection = Collection.objects.get(id=collection_id)
        group_id = self.context['request'].parser_context['kwargs'].get('group_id', None)
        if group_id:
            validated_data['group'] = Group.objects.get(id=group_id)
        status = 'pending'
        if user.id == collection.created_by_id:
            status = 'approved'
            validated_data['date_added'] = datetime.datetime.now()
        validated_data['status'] = status
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


class GroupSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField(allow_blank=True)
    created_by = UserSerializer(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_updated = serializers.DateTimeField(read_only=True)
    items = serializers.SerializerMethodField()

    class Meta:
        model = Group

    def create(self, validated_data):
        user = self.context['request'].user
        collection_id = self.context['request'].parser_context['kwargs'].get('pk', None)
        collection = Collection.objects.get(id=collection_id)
        return Group.objects.create(
            created_by=user,
            collection=collection,
            **validated_data
        )

    def update(self, group, validated_data):
        group.title = validated_data['title']
        description = validated_data['description']
        if description:
            group.description = description
        group.save()
        return group

    def get_items(self, obj):
        collection_id = self.context['request'].parser_context['kwargs'].get('pk', None)
        return reverse('group-item-list', kwargs={'pk': collection_id, 'group_id': obj.id}, request=self.context['request'])


class CollectionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField(allow_blank=True)
    tags = serializers.CharField(allow_blank=True)
    created_by = UserSerializer(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_updated = serializers.DateTimeField(read_only=True)
    groups = serializers.SerializerMethodField()
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

    def get_groups(self, obj):
        return reverse('group-list', kwargs={'pk': obj.id}, request=self.context['request'])

    def get_items(self, obj):
        return reverse('collection-item-list', kwargs={'pk': obj.id}, request=self.context['request'])
