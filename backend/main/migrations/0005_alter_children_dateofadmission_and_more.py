# Generated by Django 5.0.4 on 2024-04-18 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_remove_children_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='children',
            name='dateOfAdmission',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='children',
            name='dateOfBirth',
            field=models.DateField(),
        ),
    ]
