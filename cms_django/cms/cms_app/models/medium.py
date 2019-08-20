from django.db import models

class Medium(models.Model):
    id = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)