from django import forms
from .models import Post, Comment

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('text1', 'text2', 'text3')

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('text',)