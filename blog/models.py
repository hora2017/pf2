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
        return self.created_date.strftime("%Y / %m / %d / %I:%M %p")

class Comment(models.Model):
    post = models.ForeignKey('blog.Post', related_name='comments')
    author = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    approved_comment = models.BooleanField(default=False)

    def approve(self):
        self.approved_comment = True
        self.save()

    def __str__(self):
        return self.text