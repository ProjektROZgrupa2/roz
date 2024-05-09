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
      path('api/loginGoogle/', main_views.GoogleLoginView.as_view(), name='loginGoogle'),
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
      path('add_children/', main_views.add_children_view, name='add_children'),
      # path('api/children/', main_views.get_children_view, name='get_children'),
      path('api/addChild/', main_views.ChildrenView.as_view(), name='addChild'),
      path("abc", main_views.rd, name="home"),
      path("accounts/", include("allauth.urls")),
      path('api/change_password/', main_views.ChangePasswordView.as_view(), name='change_password'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


