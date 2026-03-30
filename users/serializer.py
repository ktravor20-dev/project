from rest_framework import serializers
from .models import WeeklyLogs, internshipPlacements

class WeeklyLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyLogs
        fields = '__all__'