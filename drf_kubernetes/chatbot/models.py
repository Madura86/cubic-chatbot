from django.db import models

class ChatMessage(models.Model):
    role = models.CharField(max_length=10)
    content = models.TextField()
