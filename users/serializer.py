from rest_framework import serializers
from .models import WeeklyLogs, CustomUser, internshipPlacements, Student, internSupervisor, academicSupervisor

class UserdetailSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields =['first_name','last_name' , 'Student_id']



class WeeklyLogsSerializer(serializers.ModelSerializer):
    Student_Name = UserdetailSerializer()
    
    class Meta:
        model = WeeklyLogs
        fields = '__all__'
        

# Serializer for creating a new user 
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
class internshipPlacementsSerializer(serializers.ModelSerializer):
    Student_Name=UserdetailSerializer()

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

