# Generated by Django 3.2.7 on 2021-09-15 06:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_liveusers'),
    ]

    operations = [
        migrations.DeleteModel(
            name='liveUsers',
        ),
        migrations.DeleteModel(
            name='messages_processed',
        ),
        migrations.DeleteModel(
            name='messages_to_process',
        ),
    ]
