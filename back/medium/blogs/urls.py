from .views import UsersViewset, PostViewset
from django.urls import path, include

urlpatterns = [
    path('users/', UsersViewset.as_view({'get': 'list', 'post':'create'})),
    path('posts/', PostViewset.as_view({'get': 'list', 'post': 'create'})),
    path('posts/<int:pk>/', PostViewset.as_view({'get': 'retrieve', 'delete': 'destroy', 'put':'update'})),
]
