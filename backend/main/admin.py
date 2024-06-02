from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Main, Children
from .models import Post

class MainAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class ChildrenAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'dateOfBirth', 'placeOfBirth', 'dateOfAdmission', 'referralNumber', 'mother', 'father', 'legalGuardian', 'siblings', 'comments')

# Register your models here.

admin.site.register(Main, MainAdmin)
admin.site.register(Children, ChildrenAdmin)
admin.site.register(Post)