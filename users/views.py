from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializer import WeeklyLogsSerializer, UserSerializer,idSerializer,SaveWeeklyLogsSerializer,SaveInternshipPlacementsSerializer, InternshipPlacementsSerializer
from .models import WeeklyLogs,CustomUser, internshipPlacements
from rest_framework.permissions import IsAuthenticated


# Create your views here.
# this view is for user registration
@api_view(['POST'])
def register(request):
      serializer=UserSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
      else:
         return Response(serializer.errors, status=400)
      

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_id(request):
   user=request.user
   if user.role  != 'STUDENT':
    id=CustomUser.objects.all()    
    serializer=idSerializer(id, many=True)
    return Response(serializer.data)
      






# this view is for getting and creating weekly logs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_weekly_logs(request):
    user=request.user
    
    
    if user.role =='STUDENT':
          logs= WeeklyLogs.objects.filter(Student_Name=request.user) # this line of code helps to only acesss his or her data only
    elif user.role == 'ACADEMIC_SUPERVISOR' or 'INTERN_SUPERVISOR':
            logs= WeeklyLogs.objects.all() # here the academic supervisor and intern supervisor call view all the weekly logs inthe database
    serializer= WeeklyLogsSerializer(logs, many=True)
    return Response(serializer.data)

# this view is for creating weekly logs
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_weekly_logs(request): 
       user=request.user  
       student_id = request.data.get('Student_Name')
       try:
          student=CustomUser.objects.get(id=student_id)
          if user.role != 'STUDENT':
           serializer =SaveWeeklyLogsSerializer(data = request.data)
           if serializer.is_valid():
            serializer.save(Student_Name=student)
            return Response(serializer.data, status=201)
           else:
              return Response(serializer.errors, status=400)
          
          else: 
              return Response({'error':'you are not allowed to create weekly logs'}, status=403)
       except CustomUser.DoesNotExist:
            return Response({'error':'student not found'}, status=404)
       
# this view is for creating internship placement
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_internship_placement(request):
       user=request.user  
       student_id = request.data.get('Student_Name')
       try:
          student=CustomUser.objects.get(id=student_id)
          if user.role == 'ACADEMIC_SUPERVISOR' :
           serializer =SaveInternshipPlacementsSerializer(data = request.data)
           if serializer.is_valid():
            serializer.save(Student_Name=student)
            return Response(serializer.data, status=201)
           else:
             return Response(serializer.errors, status=400)
          
          else: 
           return Response({'error':'you are not allowed to create internship placement'}, status=403)
       except CustomUser.DoesNotExist:
            return Response({'error':'student not found'}, status=404)       
       
#This view is for getting information for the internship placement
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_internPlacement(request):
    user =request.user
    try:
      if user.role == 'ACADEMIC_SUPERVISOR'or'INTERN_SUPERVISOR':
        placements = internshipPlacements.objects.all()
      elif user.role == 'STUDENT':
        placements = internshipPlacements.objects.filter(Student_Name = request.user)
      else:
        while True:
            return Response({'error':'ACCESS DENIED'})
      serializer= InternshipPlacementsSerializer(placements)
      return Response(serializer.data, status=200)
    except:
       return Response(serializer.error, status=400)

      
        

       

