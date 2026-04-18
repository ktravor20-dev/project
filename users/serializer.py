from rest_framework import serializers
from .models import WeeklyLogs, CustomUser, internshipPlacements, Student, internSupervisor, academicSupervisor,Studentlog, supervisorlog

class idSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields =['id','first_name','last_name' ]

class UserdetailSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields =['first_name','last_name' , 'Student_id']
class SaveWeeklyLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyLogs
        fields = '__all__'



class WeeklyLogsSerializer(serializers.ModelSerializer):
    Student_Name = UserdetailSerializer()
    
    class Meta:
        model = WeeklyLogs
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
        

# Serializer for creating a new user who is a student
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields=['username','first_name','last_name','email','role','Student_id','password']       
        

    def create(self, validated_data):
        user=CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            Student_id=validated_data['Student_id']
        )
        return user 
    
#This is the serialzer for the internship placement
class InternshipPlacementsSerializer(serializers.ModelSerializer):
    Student_Name=UserdetailSerializer()

    class Meta:
        model = internshipPlacements
        fields = '__all__'
#this serializer with help when am creating the internship placement because the student name is a foreign key to the custom user model
class SaveInternshipPlacementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = internshipPlacements
        fields = '__all__'

#This is the serializer for the Student
class StudentSerializer(serializers.ModelSerializer):
    user = UserdetailSerializer()

    class Meta:
        model= Student
        fields = "__all__"

#This is the serializer for the internSupervisor
class internSupervisorSerializer(serializers.ModelSerializer):
    user = UserdetailSerializer()

    class Meta:
        model= internSupervisor
        fields = "__all__"

#This is the serializer for the academicSupervisor
class academicSupervisorSerializer(serializers.ModelSerializer):
    user = UserdetailSerializer()

    class Meta:
        model= academicSupervisor
        fields = "__all__"

#this is  the serializer for creating new staff accounts
class StaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields=['username','first_name','last_name','email','role','Stuff_id','password']       
        

    def create(self, validated_data):
        user=CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            Stuff_id=validated_data['Stuff_id']
        )
        return user      

# this serializer is for creating a studentlog
class supervisorDetails(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['first_name','last_name']



class createStudentlogSerializer(serializers.ModelSerializer):
    Supervisor=supervisorDetails(read_only=True)

    class Meta:
        model=Studentlog
        fields=['id','Supervisor','Activities_Done','Challenges','Week_Number','is_read']


        #this serializer is for creating a supervisorlog
class createSupervisorlogSerializer(serializers.ModelSerializer):
    Student_Name=idSerializer(read_only=True)
    Supervisor_Name=idSerializer(read_only=True)

    class Meta:
        model=supervisorlog
        fields='__all__'
    

