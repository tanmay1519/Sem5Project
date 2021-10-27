# from django.shortcuts import render
# from rest_framework import response

# # Create your views here.
# from rest_framework.views import APIView
# from .models import *
# from rest_framework.response import Response
# # from . serializer import *


# class Signup (APIView) :
#     def post (self,request):
#         in_data=request.data
#         email=in_data['email']
#         password=in_data['password']
#         name=in_data['name']
#         User = user(name=name,email=email,password=password)
#         data={}
#         try :
#             User.save()
#             data['status':"Success"]
#         except :
#             data['status':'Failed']
#         return Response(data)

# class Signin (APIView) :
#     def post (self,request):
        
#         in_data=request.data
#         email=in_data['email']
#         password=in_data['password']
#         User = user.objects.filter(email=email)
#         data={}
#         if len(User)==0:
#             data['status']="No User Found"
#         elif len(User) == 1 :
#             one_User = User[0]
#             if one_User.password == password :
#                 LiveUserList =liveUsers.objects.filter(email=email)
#                 if len(LiveUserList)== 0 :
#                     live = liveUsers(email=email,user_id=one_User.user_id)
#                     try :
#                         live.save()
#                         data['status']='Success'
#                     except :
#                         data['status']='sign in Failed'
#                 elif len(LiveUserList) ==1 :
#                     data['status']="Already Sign In"
#                 else :
#                     data['status']="Unidentified Error Occured"

#             else :
#                 data['status']="Email Password Doesn't Match"
#         else :
#             data['status']="Unidentified Error Occured"
#         return Response(data)
# class Signout (APIView):
#     def post (self,request) :
#         in_data = request.data
#         email=in_data['email']
#         data={}
#         try :
#             liveUsers.objects.filter(email=email).delete()
#             data['status']="success"
#         except :
#             data['status'] = "signout Failed"
#         return response(data)
