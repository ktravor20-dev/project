from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
#this is it
class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        STUDENT='STUDENT','student'
        INTERN_SUPERVISOR='INTERN_SUPERVISOR','intern_supervisor'
        ACADEMIC_SUPERVISOR='ACADEMIC_SUPERVISOR','academic_supervisor'
        COMPANY_MANAGER='COMPANY_MANAGER','company_manager'
        SYSTEM_ADMINSTRATOR='SYSTEM_ADMINSTRATOR','system_adminstrator'
    role=models.CharField(max_length=30,choices=Role.choices,default=Role.STUDENT)    
    Student_id=models.CharField(max_length=20,unique=True,null=True,blank=True)
    Stuff_id=models.CharField(max_length=20,unique=True,null=True,blank=True)
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
    
class internshipPlacements(models.Model):
    Student_Name=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    Company_name=models.CharField(max_length=100)
    Company_location=models.CharField(max_length=100)
    Supervisor=models.CharField(max_length=100)
    Supervisor_email=models.EmailField()
    Supervisor_phone=models.CharField(max_length=20)
    Internship_start_date=models.DateField()
    Internship_end_date=models.DateField()
    
    def __str__(self):
        return f'{self.Student_Name} - {self.Company_name}'