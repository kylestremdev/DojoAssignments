from django.shortcuts import render, redirect
from .models import Course, Description

# Create your views here.
def index(request):

    context = {
        'courses': Description.objects.all()
    }

    return render(request, 'index.html', context)

def add_course(request):
    if request.method == "POST":
        course = Course(name=request.POST['name'])
        course.save()

        description = Description(content=request.POST['description'], course=course)
        description.save()

        return redirect('/')

def delete_course(request, course_id):

    Course.objects.filter(id=course_id).delete()

    return redirect('/')
