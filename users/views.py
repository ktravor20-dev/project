from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import WeeklyLogsSerializer, UserSerializer
from .models import WeeklyLogs

# Create your views here.
@api_view(['POST'])
def register(request):
      serializer=UserSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
      else:
         return Response(serializer.errors, status=400)







@api_view(['GET','POST'])
def get_weekly_logs(request):
    if request.method == 'GET':
     logs= WeeklyLogs.objects.all()
     serializer= WeeklyLogsSerializer(logs, many=True)
     return Response(serializer.data)
    else:
       serializer =WeeklyLogsSerializer(data = request.data)
       if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=201)
       else:
          return Response(serializer.errors, status=400)
       

