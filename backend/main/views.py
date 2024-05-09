from rest_framework import viewsets, status, views
from .models import Main, Children
from .serializers import ChangePasswordSerializer, MainSerializer, LoginSerializer, UserSerializer, ChildrenSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from .utils import add_children
from django.views.generic import TemplateView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import redirect

from django.contrib.auth import authenticate, login
from django.conf import settings
import requests


def rd(request):
    return redirect('http://127.0.0.1:3000/home')

def add_children_view(request):
    add_children()
    return HttpResponse("Przykładowe dane zostały dodane do bazy.")


class ChildrenView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        children = Children.objects.all()
        serializer = ChildrenSerializer(children, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChildrenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)


class MainView(viewsets.ModelViewSet):
    serializer_class = MainSerializer
    queryset = Main.objects.all()


class LoginView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        redirect_url = 'http://localhost:3000/home'

        response = Response({
            "user": str(user),
            "token": token.key,
        }, status=status.HTTP_200_OK)
        response['Location'] = redirect_url 
        return response






class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            print(request.META.get('HTTP_AUTHORIZATION'))
            request.user.auth_token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegistrationView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user 
            old_password = serializer.data.get("old_password")
            if not user.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoogleLoginView(views.APIView):
    def post(self, request, *args, **kwargs):
      
        token = request.data.get('token', None)
        
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        
        response = requests.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token)
        if response.status_code != 200:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        
       
        data = response.json()
        google_user_id = data.get('sub', None)
        if not google_user_id:
            return Response({"error": "Unable to fetch user data from Google."}, status=status.HTTP_400_BAD_REQUEST)
            
       
        token, created = Token.objects.get_or_create(user=user)
        
        redirect_url = 'http://localhost:3000/home'
        
       
        response = Response({
            "user": str(user),
            "token": token.key,
        }, status=status.HTTP_200_OK)
        response['Location'] = redirect_url
        return response
