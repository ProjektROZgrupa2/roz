from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from main import views as main_views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'mains', main_views.MainView, 'main')

urlpatterns = [

      path('api/login/', main_views.LoginView.as_view(), name='login'),
      path('api/register/', main_views.RegistrationView.as_view(), name='register'),
      path('', include(router.urls)),
      path('admin/', admin.site.urls),
      path('api/', include(router.urls)),
      path('token/', 
            jwt_views.TokenObtainPairView.as_view(), 
            name='token_obtain_pair'),
      path('token/refresh/', 
            jwt_views.TokenRefreshView.as_view(), 
            name='token_refresh'),
      path('api/logout/', main_views.LogoutView.as_view(), name='logout'),
      path('api/addChild/', main_views.ChildrenView.as_view(), name='addChild'),
      path('api/change_password/', main_views.ChangePasswordView.as_view(), name='change_password'),
      path('api/posts/', main_views.PostView.as_view(), name= 'posts_list'),
      path('api/children/', main_views.ChildrenView.as_view(), name='children'),
      path('api/files/', main_views.AllFilesView.as_view(), name='files'),
      path('api/child-files/', main_views.ChildFilesView.as_view(), name='child_files'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


