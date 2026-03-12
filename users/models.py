from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        STUDENT='STUDENT','student'
        INTERN_SUPERVISOR='INTERN_SUPERVISOR','intern_supervisor'
        ACADEMIC_SUPERVISOR='ACADEMIC_SUPERVISOR','academic_supervisor'
        COMPANY_MANAGER='COMPANY_MANAGER','company_manager'
        SYSTEM_ADMINSTRATOR='SYSTEM_ADMINSTRATOR','system_adminstrator'
    role=models.CharField(max_length=30,choices=Role.choices,default=Role.STUDENT)    
    def __str__(self):
        return self.username
class WeeklyLogs(models.Model):
    Student_Name=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    Activities=models.TextField()
    Week_Number=models.IntegerField()
    Supervisor=models.CharField()
    Supervisor_Comment=models.TextField()
    Progress=models.IntegerField()
    Hours_Worked=models.IntegerField()
    Remaining_time_for_Internship=models.IntegerField()
    