from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class UserSerializerPost(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return User


class PostSerializer (serializers.ModelSerializer):

    author = UserSerializer()
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            '__str__',
            'author',
            'body',
            'created_at',
            'updated_at'
        ]


class PostSerializerPost (serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = [
            'title',
            'body',
            'author'
        ]