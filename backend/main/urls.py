from django.urls import path
from main import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/register/', views.RegistrationView.as_view(), name='register'),
    path('api/main/', views.MainView.as_view({'get': 'list', 'post': 'create'}), name='main-list'),
    path('api/main/<int:pk>/', views.MainView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='main-detail'),
    path('api/addChild/', views.ChildrenView.as_view(), name='addChild'),
    path('api/posts/', views.PostView.as_view(), name= 'posts_list'),
    path('api/children/', views.ChildrenView.as_view(), name='children'),
    path('api/files/', views.AllFilesView.as_view(), name='files'),
    path('api/child-files/', views.ChildFilesView.as_view(), name='child_files'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
