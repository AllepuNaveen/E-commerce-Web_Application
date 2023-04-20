from django.urls import path
# from django.conf import settings
# from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,TokenRefreshView,
)
from . import views
from .views import *



urlpatterns = [
    path('users/register/',views.registerUser, name='RegisterUser'),
    path('users/login/',MyTokenObtainPairView.as_view() , name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile,name="userProfile"),
    path('users/', views.getUsers,name="users"),
    path('products/', views.getProducts ,name="Products"),
    path('products/<str:pk>/', views.getProduct ,name="Product"),
]

# urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
