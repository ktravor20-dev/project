from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializer import WeeklyLogsSerializer, UserSerializer,idSerializer,SaveWeeklyLogsSerializer,SaveInternshipPlacementsSerializer, InternshipPlacementsSerializer,LoginSerializer, StaffSerializer,createStudentlogSerializer, SupervisorMessageSerializer, MessagingUserSerializer
from .models import WeeklyLogs,CustomUser, internshipPlacements,Studentlog, SupervisorMessage
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q

User = get_user_model()


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
          logs= WeeklyLogs.objects.filter(Student_Name=request.user) 
    elif user.role == 'ACADEMIC_SUPERVISOR' or 'INTERN_SUPERVISOR':
            logs= WeeklyLogs.objects.all() 
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
        placements = internshipPlacements.objects.filter(Student_Name = user) 
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
 
   user=request.user
   if user.role == "INTERN_SUPERVISOR":
      try:
         log=WeeklyLogs.objects.get(id=pk)
         log.delete()
         return Response (status=204)
      except WeeklyLogs.DoesNotExist:
         return Response({'error': 'Weekly log not found'}, status=404)
   else:
      return Response({'error': 'You are not authorized to delete this log'}, status=403)
       
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createlog(request):
   user=request.user
   if user.role=='STUDENT':
      supervisor_id= request.data.get('Supervisor') 

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
      user = request.user
      if user.role == 'ACADEMIC_SUPERVISOR':
         supervisors = CustomUser.objects.filter(
            role='INTERN_SUPERVISOR'
         ).distinct()
      elif user.role == 'INTERN_SUPERVISOR':
         supervisors = CustomUser.objects.filter(role='ACADEMIC_SUPERVISOR')
      else:
         supervisors = CustomUser.objects.none()

      serializer = MessagingUserSerializer(supervisors, many=True)
      return Response(serializer.data, status=200)
   except Exception as e:
      return Response({'error': str(e)}, status=400)

         
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
   
   user=request.user
   if user.role == "STUDENT":
      try:
         log=Studentlog.objects.get(id=pk)
         log.delete()
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
    
#This view is for the supervisors messaging:
#sending messages
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    sender = request.user
    receiver_id = request.data.get('receiver')
    message_text = request.data.get('message')
    student_id = request.data.get('student')

    if not receiver_id or not message_text:
        return Response({"error": "receiver and message are required"}, status=400)

    try:
        receiver = User.objects.get(id=receiver_id)
    except User.DoesNotExist:
        return Response({"error": "Receiver not found"}, status=404)

    allowed_roles = ['INTERN_SUPERVISOR', 'ACADEMIC_SUPERVISOR']

    if sender.role not in allowed_roles or receiver.role not in allowed_roles:
        return Response({"error": "Not allowed to send messages"}, status=403)

    student = None
    if student_id:
        try:
            student = User.objects.get(id=student_id)
        except User.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)
    else:
        intern_sup = sender if sender.role == 'INTERN_SUPERVISOR' else (receiver if receiver.role == 'INTERN_SUPERVISOR' else None)
        if intern_sup:
            profile = intern_sup.intern_supervisor_profile.first()
            if profile and profile.Supervises_Who:
                student = profile.Supervises_Who.user

    msg = SupervisorMessage.objects.create(
        sender=sender,
        receiver=receiver,
        student=student,
        message=message_text
    )

    serializer = SupervisorMessageSerializer(msg, context={'request': request})
    return Response(serializer.data, status=201)








   
#receiving messages

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request):
    user = request.user

    if user.role not in ['INTERN_SUPERVISOR', 'ACADEMIC_SUPERVISOR']:
        return Response({"error": "Access denied"}, status=403)

    messages = SupervisorMessage.objects.filter(
        Q(sender=user) | Q(receiver=user)
    ).order_by('-created_at')

    serializer = SupervisorMessageSerializer(messages, many=True, context={'request': request})
    return Response(serializer.data)


        

       

