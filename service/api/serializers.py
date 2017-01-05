from rest_framework import serializers
from models import Collection, Item


class CollectionSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(required=True)
    # items = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     view_name='item-detail'
    # )

    class Meta:
        model = Collection

    def create(self, validated_data):
        return Collection.objects.create(**validated_data)


class ItemSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id')
    title = serializers.CharField(required=True)
    url = serializers.URLField()

    class Meta:
        model = Item

    def create(self, validated_data):
        return Item.objects.create(**validated_data)
