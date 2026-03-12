from django.contrib import admin
from .models import CustomUser,WeeklyLogs,internshipPlacements

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(WeeklyLogs)
admin.site.register(internshipPlacements)
