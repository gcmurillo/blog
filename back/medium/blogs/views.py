from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserSerializerPost, PostSerializer, PostSerializerPost
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Post


class UsersViewset (viewsets.ViewSet):

    def list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def create(self, request):
        serializer = UserSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostViewset (viewsets.ViewSet):

    def list(self, request):
        posts = Post.objects.all().order_by('created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = PostSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            serializer = PostSerializerPost(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            post.delete()
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

