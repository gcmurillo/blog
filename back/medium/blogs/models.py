from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=200, validators=[MinLengthValidator(1)])
    body = models.CharField(max_length=1000, validators=[MinLengthValidator(1)])
    created_at = models.DateField()
    updated_at = models.DateField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
            self.updated_at = timezone.now()
        else:
            self.updated_at = timezone.now()
        return super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return "{}::{}".format(self.title, self.author.__str__())