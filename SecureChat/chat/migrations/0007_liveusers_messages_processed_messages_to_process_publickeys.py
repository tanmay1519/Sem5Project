# Generated by Django 3.2.7 on 2021-09-15 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_auto_20210915_0603'),
    ]

    operations = [
        migrations.CreateModel(
            name='liveUsers',
            fields=[
                ('liveid', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.CharField(max_length=20, unique=True)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='messages_processed',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('sender', models.CharField(max_length=20, unique=True)),
                ('receiver', models.CharField(max_length=20, unique=True)),
                ('message', models.CharField(max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='messages_to_process',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('sender', models.CharField(max_length=20, unique=True)),
                ('receiver', models.CharField(max_length=20, unique=True)),
                ('message', models.CharField(max_length=10000)),
            ],
        ),
        migrations.CreateModel(
            name='publickeys',
            fields=[
                ('key_id', models.AutoField(primary_key=True, serialize=False)),
                ('key', models.CharField(max_length=100)),
                ('user_id', models.CharField(max_length=20, unique=True)),
                ('email', models.CharField(max_length=50, unique=True)),
            ],
        ),
    ]
