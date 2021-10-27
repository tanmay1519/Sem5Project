# Info Format     Type  * What is Input ? * Attributes that will be returned * Short Desc
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from chat.views import *
urlpatterns = [
    path('admin/', admin.site.urls),

    path('signin/',Signin.as_view(),name="signin"),
    #  POST *    email, password * status * for signing in a user

    path('signout/',Signout.as_view(),name="signout"),
    #  POST * email * status * To signout a user          
    #            
    path('signup/',Signup.as_view(),name="signup"),
    #  POST * email,password,name *  status * To signup a user
    
    path('send/',Send.as_view(),name="send"),
    #  POST * sender(userid) ,receiver(userid),message,highsecurity * status * send a message
    
    path('receive/',Receive.as_view(),name="receive"),
    #  POST * user_id * status,messages(messages is a list of all messages that have arrived first time to given user each mesage has [sender,receiver,message_id,message,highsecurity]) * receive new messages at runtime, hit this route after every few seconds
    
    path('getallusers/',GetAllUsers.as_view(),name="getallusers"),
    #  GET  *  NOTHING NEEDED * status,users(users is list of users each element of list  has [user_id,name,email,newMessages]) *  get  info of all users 
    
    path('getallliveusers/',GetAllLiveUsers.as_view(),name="getallliveusers"),
    #  GET  * NOTHING NEEDED * status,liveusers(liveusers is a list of all users each user has [liveid,email,user_id]) * Get info of all live users 

    path('islive/',Islive.as_view(),name="islive"),
    #  POST  *  user_id * status,isLive(isLive  is  boolean tells if given user is live or not)      * To check if this user is live or not
    
    path('selectuser/',GetUser.as_view(),name="selectuser"),
    #  POST  * query(text that can be part of name or email) * status,users(users is a list that contains users whose name or email contain given query as substring and each element has [email,name,user_id,newMessages])  *To check if entered query is part of any name of email
 
    path('backup/',Backup.as_view(),name="backup"),
    #  POST  * user_id * status ,messages (messages is list of messages of that user . each message contains [sender,receiver,message,highsecurity,message_id]) * To get backup of a user 
 
    path('getkey/',GetKey.as_view(),name="getkey"),
    #  POST  * user_id * status,keyData(keydata is object that  has [userid,key,key_id]) *  to get public key of any user
    
    path('setkey/',Setkey.as_view(),name="setkey"),
    #  POST  * user_id , public_key * status * To change a public key 
    
    path('getchat/',GetaChat.as_view(),name="getchat"),
    #  POST  * user1,user2 (user ids of 2 users ) * status,messges (each message contains [sender,receiver,message,highsecurity,message_id]) *To get  all the chat between these two users
    
    path('chatters/',GetChatters.as_view(),name="chatters"),
    # POST   *  user_id * status,chatters(Chatters is a list that contains users that the user has chatted with (each user has name,email,user_id)) * To get all users with which a user has ever chatted
     path('verifypassword/',VerifyPassword.as_view(),name="verifypassword")

]
