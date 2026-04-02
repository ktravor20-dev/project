from django.contrib import admin
from .models import CustomUser,WeeklyLogs,internshipPlacements,Student,internSupervisor ,academicSupervisor

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(WeeklyLogs)
admin.site.register(internshipPlacements)
admin.site.register(Student)
admin.site.register(internSupervisor)
admin.site.register(academicSupervisor)
