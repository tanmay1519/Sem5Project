from django.db import models
from django.db.models.deletion import CASCADE
# // username Tanmay , password 2001
# Create your models here.
class user  (models.Model):
    user_id = models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=50,unique=True,)
    password=models.CharField(max_length=20)
    newMessages=models.BooleanField(default="False")

class messages_to_process (models.Model) :
    message_id=models.AutoField(primary_key=True)
    sender = models.IntegerField()
    receiver =  models.IntegerField()
    message = models.CharField(max_length=10000)
    highSecurity = models.BooleanField(default="False")

class messages_processed (models.Model) :
    message_id=models.IntegerField(primary_key=True)
    sender = models.IntegerField()
    receiver = models.IntegerField()
    message = models.CharField(max_length=10000)
    highSecurity = models.BooleanField(default="False")



class liveUsers (models.Model) :
    liveid = models.AutoField(primary_key=True)
    user_id =  models.IntegerField(unique=True)
    email=models.CharField(max_length=50,unique=True)
    time = models.DateTimeField(auto_now_add=True)

class publickeys(models.Model):
    key_id=models.AutoField(primary_key=True)
    key=models.CharField(max_length=100)
    user_id = models.IntegerField(unique=True)

# class chats (models.Model) :
#     chat_id=models.AutoField(primary_key=True)
#     user_id=models.IntegerField()
#     chattedWIth=models.CharField(max_length=10000)
# TODO: IMplement if time permits