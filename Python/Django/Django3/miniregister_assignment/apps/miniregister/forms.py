from django import forms

from .models import User

class RegisterForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'
        widgets = {
            'password': forms.PasswordInput
        }

    password_confirmation = forms.CharField(max_length=255, widget=forms.PasswordInput)
