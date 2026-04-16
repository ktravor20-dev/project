from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializer import WeeklyLogsSerializer, UserSerializer,idSerializer,SaveWeeklyLogsSerializer,SaveInternshipPlacementsSerializer, InternshipPlacementsSerializer,LoginSerializer, StaffSerializer,createStudentlogSerializer
from .models import WeeklyLogs,CustomUser, internshipPlacements,Studentlog
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


# Create your views here.
# this view is for student account registration
@api_view(['POST'])
def register(request):
      serializer=UserSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
      else:
         return Response(serializer.errors, status=400)

# this view is for creating a staff account
@api_view(['POST'])
def create_staff(request):
   serializer=StaffSerializer(data=request.data)
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
    id=CustomUser.objects.filter(role='STUDENT')    
    serializer=idSerializer(id, many=True)
    return Response(serializer.data)
   

# this veiw helps the intern supervisor to get weekly log for a specific student
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_log(request):
 user = request.user
 if user.role =='INTERN_SUPERVISOR':
    try:
     student =request.query_params.get('student_id')
     log= WeeklyLogs.objects.filter(Student_Name= student)
     serializer= WeeklyLogsSerializer(log ,many=True)
     return Response(serializer.data)
    except :
     return Response({'error':'Error occurred'})
 else:
    return Response({'error':'Access denied'},status=403)
      
   

@api_view(['POST'])
def login(request):
   serializer = LoginSerializer(data=request.data)

   if serializer.is_valid():
      username = serializer.validated_data['username']
      password = serializer.validated_data['password']

      user = authenticate(request, username=username, password=password)

      if user is not None:
         refresh = RefreshToken.for_user(user)

         role = user.role

         return Response({
               'access': str(refresh.access_token),
               'refresh': str(refresh),
               'role': user.role,
               'username': user.username
         })
      else:
         return Response({'error': 'Invalid credentials'}, status=400)
      






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
      if user.role in ['ACADEMIC_SUPERVISOR', 'INTERN_SUPERVISOR']:
        placements = internshipPlacements.objects.all()
      elif user.role == 'STUDENT':
        placements = internshipPlacements.objects.filter(Student_Name = user) # this line of code helps to only acesss his or her data only
      else:
            return Response({'error':'ACCESS DENIED'}, status=403)
      serializer= InternshipPlacementsSerializer(placements, many=True)
      return Response(serializer.data, status=200)
    except Exception as e:
       return Response({'error': str(e)}, status=400)
    
#this is to delete a weeklylog of a specific person
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_weekly_log(request,pk):
   # pk stands for primary key(ID for the log we want to delete)
   user=request.user
   if user.role == "INTERN_SUPERVISOR":
      try:
         log=WeeklyLogs.objects.get(id=pk)# here we are finding a specfic log in database using its id
         log.delete()#here we are telling the database to delete that log
         return Response (status=204)
      except WeeklyLogs.DoesNotExist:
         return Response({'error': 'Weekly log not found'}, status=404)
   else:
      return Response({'error': 'You are not authorized to delete this log'}, status=403)
       
# this view is for creating student logs
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createlog(request):
   user=request.user
   if user.role=='STUDENT':
      supervisor_id= request.data.get('Supervisor') #get the id for the supervisor from the data sent from the forntend

      try:
         supervisor=CustomUser.objects.get(id=supervisor_id)
      except CustomUser.DoesNotExist:
         return Response({'error':'Ivalid supervisor id'})
      serializer=createStudentlogSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save(Student_Name=request.user,Supervisor=supervisor)
         return Response(serializer.data, status=201)
      else:
         return Response(serializer.errors,status=400)

       
   else:
      return Response({'error':'you are not allowed to perform this operation'})  
   
# this view is to return all supervisors   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_supervisors(request):
   try:
    supervisors=CustomUser.objects.filter(role='INTERN_SUPERVISOR')
    serializer= idSerializer(supervisors,many=True)
    return Response(serializer.data, status=203)
   except:
      return Response({'error':'an error while fetching data'},status=400)

         
#this view is to get student logs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewStudentlog(request):
   user=request.user
   try:
      if user.role == 'STUDENT':
         data= Studentlog.objects.filter(Student_Name=request.user)
         serializer=createStudentlogSerializer(data,many=True)
         return Response(serializer.data,status=200)
      elif user.role =='INTERN_SUPERVISOR':
         data = Studentlog.objects.filter(Supervisor=request.user)
         serializer=createStudentlogSerializer(data,many=True)
         return Response(serializer.data,status=201)

      else:
         return Response({'Error':'ACCESS DENIED'},status=203) 
   except:
      return Response(serializer.errors,status=400)     


# this is to delete a student log
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_student_log(request,pk):
   # pk stands for primary key(ID for the log we want to delete)
   user=request.user
   if user.role == "STUDENT":
      try:
         log=Studentlog.objects.get(id=pk)# here we are finding a specfic log in database using its id
         log.delete()#here we are telling the database to delete that log
         return Response (status=204)
      except Studentlog.DoesNotExist:
         return Response({'error': 'Student log not found'}, status=404)
   else:
      return Response({'error': 'You are not authorized to delete this log'}, status=403)
   
#this view is for the status changes
@api_view(['PATCH'])   
@permission_classes([IsAuthenticated])
def mark_as_read(request,pk):
   user=request.user
   if user.role =='INTERN_SUPERVISOR':
      try:
         log=Studentlog.objects.get(id=pk)
         log.is_read=True
         log.save()
         return Response({'message':'Log marked as read'}, status=200)
      except Studentlog.DoesNotExist:
         return Response({'error':'log not found'}, status=404)
    


        

       

