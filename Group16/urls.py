"""
URL configuration for Group16 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from  users import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/login/', views.login, name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/',views.register, name='register'),
    path('api/get_user_id/',views.get_user_id, name='get_user_id'),
    path('api/create_weekly_logs/',views.create_weekly_logs, name='create_weekly_logs'),
    path('api/internship_placements/',views.create_internship_placement, name='internship_placements'),
    path('api/get_placements/',views.get_internPlacement,name='get_placement'),
    path('api/get_weekly_logs/',views.get_weekly_logs, name='get_weekly_logs'),
    path('api/create_staff/',views.create_staff, name='create_staff'),
    path('api/delete_weekly_log/<int:pk>/',views.delete_weekly_log, name='delete_weekly_log'),

]
