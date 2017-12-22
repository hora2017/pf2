from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey('auth.User')
    text1 = models.TextField()
    text2 = models.TextField()
    text3 = models.TextField()
    created_date = models.DateTimeField(auto_now=True)

    def publish(self):
        self.save()

    def __str__(self):
        #strTime = str(self.created_date)
        # return strTime
        return self.created_date.strftime("%Y / %m / %d / %I:%M %p")
