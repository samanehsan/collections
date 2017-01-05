from rest_framework import serializers
from models import Collection


class CollectionSerializer(serializers.Serializer):
    title = serializers.CharField(required=True)

    class Meta:
        model = Collection

    def create(self, validated_data):
        return Collection.objects.create(**validated_data)

