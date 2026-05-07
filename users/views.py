from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializer import WeeklyLogsSerializer, UserSerializer,idSerializer,SaveWeeklyLogsSerializer,SaveInternshipPlacementsSerializer, InternshipPlacementsSerializer,LoginSerializer, StaffSerializer,createStudentlogSerializer, SupervisorMessageSerializer, MessagingUserSerializer,StudentlogNotificationSerializer,weeklylogAlertSerializer,AllUsersSerializer,MessageSerializer,ViewMessageSerializer,MessageNotificationSerializer
from .models import WeeklyLogs,CustomUser, internshipPlacements,Studentlog, SupervisorMessage,StudentlogNotification,weeklylogNotification,Messages,MessageNotification
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings

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
          logs= WeeklyLogs.objects.filter(Student_Name=request.user).order_by('-Created_at')
    elif user.role == 'INTERN_SUPERVISOR':
            logs= WeeklyLogs.objects.filter(Supervisor=request.user.username) .order_by('-Created_at')
    elif user.role == 'ACADEMIC_SUPERVISOR':
            logs=WeeklyLogs.objects.all() .order_by('-Created_at')       
    serializer= WeeklyLogsSerializer(logs, many=True)
    return Response(serializer.data)


#this is to change status when seen by the student
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def seen(request,pk):
   user=request.user
   if user.role=='STUDENT':
      try:
         log=WeeklyLogs.objects.get(pk=pk)
         log.is_read=True
         log.save()
         return Response({'message':'Log marked as read'}, status=200)
      except WeeklyLogs.DoesNotExist:
         return Response({'error':'Log not found'}, status=404)
   else:
      return Response({'error':'Access denied'}, status=403)

# this view is for creating weekly logs
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_weekly_logs(request): 
       user=request.user  
       student_id = request.data.get('Student_Name')
       try:
          student=CustomUser.objects.get(id=student_id)
          if user.role == 'INTERN_SUPERVISOR' :
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
      if user.role =='ACADEMIC_SUPERVISOR':
        placements = internshipPlacements.objects.all()
      elif user.role == 'INTERN_SUPERVISOR':
         placements = internshipPlacements.objects.filter(Supervisor_email =request.user.email)  
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
         
         # Send email notification to the Intern Supervisor
         if supervisor.email:
             subject = f"New Weekly Log Submitted by {user.first_name} {user.last_name}"
             message = f"Hello {supervisor.first_name},\n\nYour student {user.first_name} {user.last_name} has just submitted a new weekly log.\n\nPlease log in to the portal to review it."
             from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@sdp-project.com')
             
             try:
                 send_mail(subject, message, from_email, [supervisor.email], fail_silently=True)
             except Exception as e:
                 print(f"Error sending email: {e}")

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
      elif user.role == 'STUDENT':
         supervisors = CustomUser.objects.filter(role__in=['INTERN_SUPERVISOR', 'ACADEMIC_SUPERVISOR'])
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
         data= Studentlog.objects.filter(Student_Name=request.user).order_by('-Submittion_Date')
         serializer=createStudentlogSerializer(data,many=True)
         return Response(serializer.data,status=200)
      elif user.role =='INTERN_SUPERVISOR':
         data = Studentlog.objects.filter(Supervisor=request.user).order_by('-Submittion_Date')
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
    # Show messages where the user is either the sender or the receiver
    messages = SupervisorMessage.objects.filter(
        Q(sender=user) | Q(receiver=user)
    ).order_by('created_at')
    
    serializer = SupervisorMessageSerializer(messages, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "role": request.user.role,
        "full_name": f"{request.user.first_name} {request.user.last_name}"
    })
# this view is to get notifications for the intern supervisor
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def intern_supervisor_notifications(request):
   user=request.user
   if user.role != 'INTERN_SUPERVISOR':
      return Response({'error':'Access denied'}, status=403)
   else:
     try:
       notifications= StudentlogNotification.objects.filter(recepient=request.user, is_read=False).order_by('-created_at')
       serializer=StudentlogNotificationSerializer(notifications, many=True)
       return Response(serializer.data, status=200)
     except Exception as e:
         return Response({'error': str(e)}, status=400)
     
#this view is to get notification  for the student
@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def student_notification(request):
   user=request.user
   if user.role !='STUDENT':
      return Response({'error':'Access denied'}, status=403)   
   else:
      try:
         alerts=weeklylogNotification.objects.filter(recepient=request.user, is_read=False).order_by('-created_at')
         serializer=weeklylogAlertSerializer(alerts,many=True)
         return Response(serializer.data, status=200)
      except Exception as e:
         return Response({'error':str(e)}, status=400)


#this view is to save messages between the intern supervisor , academic supervisor and the student
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_message(request):
   serializer=MessageSerializer(data=request.data)
   if serializer.is_valid():
      serializer.save(sender=request.user)
      return Response(serializer.data, status=201)
   else:
      return Response(serializer.errors, status=400)
   
#this view is to get messages between the intern supervisor , academic supervisor and the student
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_message(request):
   try:
    message=Messages.objects.filter(Q(receiver=request.user)| Q(sender=request.user)).order_by('-created_at') 
    serializer=ViewMessageSerializer(message, many=True)
    return Response(serializer.data, status=200)  
   except Exception as e:
      return Response({'error':str(e)}, status=400)
     
   
#this view is to get all users in the custom user model
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Users(request):
   try:
      users=CustomUser.objects.all()
      serializer=AllUsersSerializer(users,many=True)
      return Response(serializer.data, status=200)
   except Exception as e:
      return Response({'error':str(e)}, status=400)

#this view is to sent message notifications between the intern supervisor , academic supervisor and the student
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def send_alert(request):
   try:
      message=MessageNotification.objects.filter(recepient=request.user, is_read=False)
      serializer=MessageNotificationSerializer(message, many=True)
      return Response(serializer.data, status=200)
   except Exception as e:
      return Response({'error':str(e)}, status=400)
   






        

       

