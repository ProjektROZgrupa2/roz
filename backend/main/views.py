from rest_framework import viewsets, status, views
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from .utils import upload_to_google_drive
from rest_framework.parsers import MultiPartParser, FormParser
import os
from decouple import Config
from dotenv import find_dotenv
import json

dotenv_path = find_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

config = Config(dotenv_path)


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


class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    GOOGLE_DRIVE_FOLDER_ID = config('GOOGLE_DRIVE_FOLDER_ID')
    GOOGLE_SERVICE_ACCOUNT = config('GOOGLE_SERVICE_ACCOUNT')

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            post = posts_serializer.save()

            files = request.FILES.getlist('file')  
            print("Files: ", files)
            title = request.data.get('title')
            for file in files:
                upload_to_google_drive(file, self.GOOGLE_DRIVE_FOLDER_ID, self.GOOGLE_SERVICE_ACCOUNT, title)

            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
