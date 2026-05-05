from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Studentlog,StudentlogNotification

@receiver(post_save, sender=Studentlog)
def create_log_notification(sender,instance,created, **kwargs):
    if created:
        # Create a notification for the supervisor when a new log is created
        supervisor = instance.Supervisor
        # Here you can implement the logic to create a notification for the supervisor
        StudentlogNotification.objects.create(
            recepient=supervisor,
            studentlog=instance,
            message=f"{instance.Student_Name.first_name} {instance.Student_Name.last_name } has submitted a new student log for week {instance.Week_Number}"
        )