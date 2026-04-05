from rest_framework import serializers
from .models import WeeklyLogs, CustomUser

class WeeklyLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyLogs
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['first_name','last_name','email','role','Student_id','password']       
        password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user=CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            Student_id=validated_data['Student_id']
        )
        return user 