from django.core.checks import messages
from django.shortcuts import render
from rest_framework import response
# .. Access Token 
# Create your views here.
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
# from . serializer import *

def verifyLiveUser (sender) :
    liveUserList = liveUsers.objects.filter(user_id=sender)
    if (len(liveUserList)==0):
        return False
    elif (len(liveUserList)==1):
        return True
    else :
        return False
   
def verifyUser (receiver) :
    UserList = user.objects.filter(user_id=receiver)
    if (len(UserList)==0):
        return False
    elif (len(UserList)==1):
        return True
    else :
        return False

def isEmail (email) :
    atpt=0
    try :
        for i in range(0,len(email)) :
            if email[i]=='@':
                atpt=i
        if atpt>5 :
            for j in range(atpt+2,len(email)):
                if email[j]=='.' :
                    if j+1 <len(email):
                        return True

        return False
    except :
        return False 
                

class Signup (APIView) :
    def post (self,request):
        data={}
        name=""
        email=""
        password=""
        try :
            in_data=request.data
            print(in_data)
            email=in_data['email']
            # print(email)
            password=in_data['password']
            name=in_data['name']
            x=name[5]+email[5]+password[5]
            print(x)
            x+="Good"
            if (not isEmail(email)):
                x+=email[len(email)+100]

        except :
            data['status']="Please Enter Name , Email , Password with each atleast 6 characters and a valid  email Address"
            return Response(data)
        
        User = user(name=name,email=email,password=password)
        try :
            User.save()
            # print(User.user_id)    
            data['status']="success"
            data['userid']=User.user_id
            
        except :
            data['status']='Failed'
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
# TODO: Signup Tested
class Signin (APIView) :
    def post (self,request):
        data={}
        email=""
        password=""
        try :
            in_data=request.data
            email=in_data['email']
            password=in_data['password']
            x=email[5]+password[5]
            x+="good"
            if (not isEmail(email)):
                x+=email[len(email)+100]

        except :
            data['status']="Enter Email Password properly"
            return (data)
        User = user.objects.filter(email=email)
        if len(email)==0 or len(email)==0 :
            data['status']="System Error Please Try Again"
            return (data)
        if len(User)==0:
            data['status']="No User Found"
        elif len(User) == 1 :
            one_User = User[0]
            if one_User.password == password :
                LiveUserList =liveUsers.objects.filter(email=email)
                if len(LiveUserList)== 0 :
                    live = liveUsers(email=email,user_id=int(one_User.user_id))
                    try :
                        live.save()
                        data['status']='success'
                        data['userid']=one_User.user_id
                        return Response(data)
                    except :
                        data['status']='sign in Failed'
                elif len(LiveUserList) ==1 :
                    data['status']="Already Sign In"
                else :
                    data['status']="Unidentified Error Occured"

            else :
                data['status']="Email Password Doesn't Match"
        else :
            data['status']="Unidentified Error Occured"
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)

# TODO:signin Tested
class Signout (APIView):
    def post (self,request) :
        data={}
        email=""
        try   :
            in_data = request.data
            email=in_data['email']
            x=email[5]
            if (not isEmail(email)):
                x+=email[len(email)+100]
        except :
            data['status']="Enter Email Properly"
            return (data)
        
        if email == "" :
            data['status']="System Error Please Try Again"
            return (data)
        if len(liveUsers.objects.filter(email=email)) == 0 :
            data['status']="User not signed in "
            return Response(data)
        try :
            liveUsers.objects.filter(email=email).delete()
            data['status']="success"
        except :
            data['status'] = "signout Failed"
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
# TODO: Signout Tested DOne till here 
class Send (APIView):
    def post(self,request):
        data={}
        sender=0
        receiver=0
        message=""
        highSecurity=0
        try : 
            inData = request.data
            sender=inData['sender']
            receiver=inData['receiver']
            message=inData['message']
            highSecurity=inData['highSecurity']
        except :
            data['status']="Data  Formatting Error"
            return Response(data)
        if (sender==0 or receiver == 0 or message=="" ):
            # print(sender,receiver,message,highSecurity==0)
            data['status']="Server Failure"
            return Response (data)
        if (verifyLiveUser(sender)) :
            if (verifyUser(receiver)):
                # receiver_ob=user.objects.get(user_id=receiver)
                # receiver_ob.newMessages = True
               
                new_msg = messages_to_process(sender=sender,receiver=receiver,message=message,highSecurity=highSecurity)
                
                try :
                    new_msg.save()
                    data['msg_id']=new_msg.message_id
                    user.objects.filter(user_id=receiver).update(newMessages=True)
                    
                    data['status']='success'
                except :
                    data['status']='Failed'
            else :
                data['status']="User not Found"
        else :
            data['status']="Sender is Inactice"
        return Response(data)
            
    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
# TODO: Send TESTED
class Islive(APIView):
    def post(self,request):
        indata=request.data
        user=indata['user_id']
        data={}
        try :
            data['isLive']=verifyLiveUser(user)
            data['status']="success"
        except  :
            data['status']="Failed"
            data["isLive"]=False
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
# TODO: isLive Tested

class GetAllUsers (APIView) :
    def get(self,request):
        data={}
        try :
            ob_users=user.objects.filter()
            data['status']="success"
            users=[]
            if len(ob_users) == 0 :
                data['status']="No Users Found"
            for i in ob_users :
                User={}
                User['user_id']=i.user_id
                User['name']=i.name
                User['email']=i.email
                User['newMessages']=i.newMessages
                users.append(User)
            data['users']=users
        except:
            data['status']="Failed"
            data['users']=[]
        # print(data)
        return Response(data)

    def post (self,request) :
        data={}
        data['status']="Post Request is invalid for this URL"
        return Response (data)    
    

# TODO: GetAllUsersisTested

class GetAllLiveUsers (APIView) :
    def get(self,requests):
        data={} 
        try :
            ob_liveusers=liveUsers.objects.filter()
            liveusers=[]
            for i in ob_liveusers :
                user={}
                user['liveid']=i.liveid
                user['email']=i.email
                user['user_id']=i.user_id
                liveusers.append(user)
            if len(liveusers) > 0 :
              data['status']="success"
            elif len(liveusers) == 0 :
                data['status']="No Live User Found"
            data['liveusers']=liveusers
        except:
            data['status']="Failed"
            data['liveusers']=[]
        return Response(data)

    def post (self,request) :
        data={}
        data['status']="Post Request is invalid for this URL"
        return Response (data)
# TODO: Get ALL LIVE USERS TESTED

class GetUser (APIView) :
    def post (self,request):
        query=request.data['query']
        AllUsers=user.objects.filter()
        users=[]
        data={}
        for ob_User in AllUsers :
            if query in ob_User.email or query in ob_User.name :
                    User={}
                    User['email']=ob_User.email
                    User['name']=ob_User.name
                    User['user_id']=ob_User.user_id
                    User['newMessages']=ob_User.newMessages
                    users.append(User)
        if (len(users)==0):
            data['status']="No User Found"
            data['users']=[]
        else :
            data['status']="success"
            data['users']=users[0:4]
        # print(data)
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
# TODO: GetUSer Tested
    
def getMessages (Message_List) :
    retValue=True
    returnData=[]
    not_removed =  False
    for msg in Message_List :
                    id=msg.message_id
                    sender=msg.sender
                    receiver=msg.receiver
                    message=msg.message
                    highSecurity=msg.highSecurity
                    returnData.append({"sender":sender,"receiver":receiver,"message_id":id,"message":message,"highSecurity":highSecurity})
                    removedMessage=messages_processed(sender=sender,receiver=receiver,message=message,message_id=id,highSecurity=highSecurity)
                    try :
                        removedMessage.save()
                        not_removed=True
                        messages_to_process.objects.filter(message_id=id,sender=sender,receiver=receiver).delete()
                        not_removed=False
                    except :
                        if (not_removed):
                            messages_to_process.objects.filter(message_id=id,sender=sender,receiver=receiver).delete()
                        else :
                            retValue=False
    return retValue,returnData

class Receive (APIView):
    def post(self,request):
        indata = request.data
        user_id=indata['user_id']
        data={}
        if (verifyLiveUser(user_id)):
            try : 
                Message_List = messages_to_process.objects.filter(receiver=user_id)
                check=False
                trials=10
                while (trials):
                    isLoaded,msgdata=getMessages(Message_List)
                    if isLoaded :
                        check=True 
                        data['status']="success"
                        data['messages']=msgdata
                        break
                if not check :
                    data['status']="Failed to Load Messages"

            except :
                data['status']="Failed to Load Messages"
        else :
            data['status']="User not Authenticated"
        return Response(data)
    
    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
# TODO: Recieve Tested
class Backup(APIView):
    def post(self,request):
        indata=request.data
        userid=indata['user_id']
        data={}
        if  verifyLiveUser(userid) :
            try :
                receivedmessages=messages_processed.objects.filter(receiver=userid )
                sentmessages_receiveed = messages_processed.objects.filter(sender=userid)
                sentmessages_notreceiveed = messages_to_process.objects.filter(sender=userid)
            
                messages=list(receivedmessages)+list(sentmessages_receiveed)+list(sentmessages_notreceiveed)
             
                msg_list = []
                for i in messages :
                    sender=i.sender
                    receiver=i.receiver
                    message=i.message
                    highSecurity=i.highSecurity
                    message_id = i.message_id
                    msg={}
                    msg['sender']=sender
                    msg['receiver']=receiver
                    msg['message']=message
                    msg['message_id']=message_id
                    msg['highSecurity']=highSecurity
                    msg_list.append(msg)
                data['status']="success"
                data['messages']=msg_list
            except Exception as e:
            
                data['status']="Failed  to get Backup"
                data['messages']=[]
        else :
            data['status']="User not Authenticated"
            data['messages']=[]
            
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)

# TODO: Backup Tested

class Setkey (APIView) :
    def post (self,request):
        data={}
        key=0
        userid=0
        try :
            indata=request.data
            print(indata)
            key=indata['public_key']
            userid=indata['user_id']
            if ( not verifyUser(userid)) or len(key) <=0 :
                userid=userid[1000]
        except :
            data['status']="Please check Key and User Id"
            return Response(data)
        if (key==0 or userid ==0) :
            data['status']="System Falied"
            return Response(data)
        keyinst=publickeys(user_id=userid,key=key)
        try :
            keyinst.save()
            data['status']="success"
        except :
            data['status']="Failed to save Key"
        return Response(data)

    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)

class GetKey(APIView):
    def post(self,request) :
        data={}
        userid=0
        try :
            indata=request.data
            userid=indata['user_id']
            if ( not verifyUser(int(userid))):
                userid=userid[1000]
        except :
            data['status']="Please check Key and User Id"
            return Response(data)
        if userid == 0 :
            data['status']="System Failure"
            return Response(data)
        try :

            userList=publickeys.objects.filter(user_id=userid)
            if len(userList) == 1 :
                singleuser=userList[0]
                userdata={}
                userdata['userid']=singleuser.user_id
                userdata['key']=singleuser.key
                userdata['key_id']=singleuser.key_id
                data['keyData']=userdata
                data['status']="success"
                return Response(data)
            else :
                data['status']="Please check userid"
                return Response(data)
        except :
            data['status']="System Failure"
            return Response(data)
    
    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)


class GetaChat(APIView) :
    def post (self,request):
        user1=0
        user2=0
        data={}
        try :
            inData=request.data
            user1=inData['user1']
            user2=inData['user2']
            if (not verifyUser(user1))or (not verifyUser(user2)):
                user2=user1[100]
        except :
            data['status']="Users not Signed Up to system"
            return Response(data)
        if (user1==0 or user2 == 0 ):
            data['status']="System Failure ."
            return Response (data)
        msgList=[]
        try :
            msg1=messages_processed.objects.filter(sender=user1,receiver=user2)
            msg2=messages_processed.objects.filter(sender=user2,receiver=user1)
            msg3=messages_to_process.objects.filter(sender=user1,receiver=user2)
            msg=list(msg1)+list(msg2)+list(msg3)
            # print(msg)
            for i in msg :
                sender=i.sender
                receiver=i.receiver
                message = i.message
                highSecurity=i.highSecurity
                message_id=i.message_id
                
                msgList.append({"message_id":message_id, "sender":sender,"receiver":receiver,"message":message,"highSecurity":highSecurity})
            data['status']="success"
        except  Exception as e:
            # print(e)
            data['status']="Error Occured"
            return Response(data)
        data['messages']=msgList
        return Response(data)        
    def get (self,request) :
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)

class GetChatters (APIView):
    
    def post (self,request):
        data={}
        user_id = 0
        try :
            inData=request.data
            user_id=inData['user_id']
            if not verifyUser(user_id):
                user_id=user_id[100]
        except :
            data['status']="Failed to Identify  user"
            return Response(data)
        if user_id == 0 :
            data['status']="System Failure"
            return Response(data)
        users=[]
        userdata=[]
        try :
            msg1=messages_processed.objects.filter(sender=user_id)
            msg2=messages_processed.objects.filter(receiver=user_id)
            msg3=messages_to_process.objects.filter(sender=user_id)
            for i in msg1 :
                receiver=i.receiver
                users.append(receiver)
            for i in msg3 :
                receiver=i.receiver
                users.append(receiver)
            for j in msg2 :
                sender=j.sender
                users.append(sender)
            users=list(set(users))
            
            for i in users :
                info=user.objects.filter(user_id=i)
                if len(info)==1 :
                    u=info[0]
                    userdata.append({"name":u.name,"email":u.email,"user_id":u.user_id})
            data['status']="success"
        except  :
            data['status'] = "Some Error Occured"
            return Response(data)
        data['chatters']=userdata
        return Response(data)
        


    def get (self,request) :
        # Can Improve this 
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)


class VerifyPassword (APIView):
    def get (self,request):
        data={}
        data['status']="Get Request is invalid for this URL"
        return Response (data)
    def post (self,request):
        data={}
        try:
            inData=request.data
            email=inData['email']
            password=inData['password']
            usersobj=user.objects.filter(email=email,password=password)
            if len(usersobj) ==1 :
                data['status']="success"
            else :
                data['status']="Failure"


        except :
            data['status']="System Failure"
        return Response(data)
