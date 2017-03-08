import json
import datetime
from rest_framework import exceptions
from rest_framework_json_api import serializers
from api.models import Collection, Group, Item, User
from api.base.serializers import RelationshipField
from guardian.shortcuts import assign_perm


class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()

    class Meta:
        model = User

    class JSONAPIMeta:
        resource_name = 'users'

    def create(self, validated_data):
        return User.objects.create_user(
            password='password',
            **validated_data
        )


class ItemSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    source_id = serializers.CharField()
    title = serializers.CharField(required=True)
    type = serializers.ChoiceField(choices=['project', 'preprint', 'registration', 'file', 'website'])
    status = serializers.ChoiceField(choices=['approved', 'pending', 'rejected'])
    url = serializers.URLField()
    created_by = UserSerializer(read_only=True)
    metadata = serializers.CharField(allow_blank=True)
    date_added = serializers.DateTimeField(read_only=True, allow_null=True)
    date_submitted = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Item

    class JSONAPIMeta:
        resource_name = 'items'

    def create(self, validated_data):
        user = self.context['request'].user
        collection_id = self.context.get('collection_id', None) or self.context['request'].parser_context['kwargs'].get('pk', None)
        collection = Collection.objects.get(id=collection_id)

        allow_all = None
        if collection.settings:
            collection_settings = json.loads(collection.settings)
            allow_all = collection_settings.get('allow_all', None)
            collection_type = collection_settings.get('type', None)
            if collection_type and validated_data['type'] != collection_type:
                raise ValueError('Collection only accepts items of type ' + collection_type)

        status = 'pending'
        if user.has_perm('api.approve_items', collection) or allow_all:
            status = 'approved'
            validated_data['date_added'] = datetime.datetime.now()

        group_id = self.context.get('group_id', None) or self.context['request'].parser_context['kwargs'].get('group_id', None)
        if group_id:
            validated_data['group'] = Group.objects.get(id=group_id)

        validated_data['status'] = status
        item = Item.objects.create(
            created_by=user,
            collection=collection,
            **validated_data
        )
        return item

    def update(self, item, validated_data):
        user = self.context['request'].user
        status = validated_data.get('status', item.status)
        collection_id = self.context.get('collection_id', None) or self.context['request'].parser_context['kwargs'].get('pk', None)
        if collection_id:
            collection = Collection.objects.get(id=collection_id)
        else:
            collection = item.collection

        if status != item.status and user.has_perm('api.approve_items', collection):
            raise exceptions.PermissionDenied(detail='Cannot change submission status.')
        elif user.id != item.created_by_id and validated_data.keys() != ['status']:
            raise exceptions.PermissionDenied(detail='Cannot update another user\'s submission.')

        group_id = self.context.get('group_id', None) or self.context['request'].parser_context['kwargs'].get('group_id', None)
        if group_id:
            group = Group.objects.get(id=group_id)
        else:
            group = None

        item_type = validated_data.get('type', item.type)
        if collection.settings:
            collection_type = json.loads(collection.settings).get('type', None)
            if collection_type and item_type != collection_type:
                raise ValueError('Collection only accepts items of type ' + collection_type)

        item.group = group
        item.source_id = validated_data.get('source_id', item.source_id)
        item.title = validated_data.get('title', item.title)
        item.type = item_type
        item.status = status
        item.url = validated_data.get('url', item.url)
        item.metadata = validated_data.get('metadata', item.metadata)
        item.save()
        return item


class GroupSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField(allow_blank=True)
    created_by = UserSerializer(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_updated = serializers.DateTimeField(read_only=True)
    items = RelationshipField(
        related_view='group-item-list',
        related_view_kwargs={'pk': '<collection.id>', 'group_id': '<pk>'}
    )

    class Meta:
        model = Group

    class JSONAPIMeta:
        resource_name = 'groups'

    def create(self, validated_data):
        user = self.context['request'].user
        collection_id = self.context.get('collection_id', None) or self.context['request'].parser_context['kwargs'].get('pk', None)
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


class CollectionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    description = serializers.CharField(allow_blank=True)
    tags = serializers.CharField(allow_blank=True)
    settings = serializers.CharField(required=False)
    created_by = UserSerializer(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_updated = serializers.DateTimeField(read_only=True)
    groups = RelationshipField(
        related_view='collection-group-list',
        related_view_kwargs={'pk': '<pk>'}
    )
    items = RelationshipField(
        related_view='collection-item-list',
        related_view_kwargs={'pk': '<pk>'}
    )

    class Meta:
        model = Collection

    class JSONAPIMeta:
        resource_name = 'collections'

    def create(self, validated_data):
        user = self.context['request'].user
        collection = Collection.objects.create(created_by=user, **validated_data)
        assign_perm('api.approve_items', user, collection)
        return collection

    def update(self, collection, validated_data):
        collection.title = validated_data.get('title', collection.title)
        collection.description = validated_data.get('description', collection.description)
        collection.tags = validated_data.get('tags', collection.tags)
        collection.settings = validated_data.get('settings', collection.settings)
        collection.save()
        return collection
