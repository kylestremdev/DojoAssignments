from django.shortcuts import render
import datetime

# Create your views here.
def index(request):
    time = datetime.datetime.today()

    date = time.strftime('%A, %b %d, %Y')
    clock = time.strftime('%I:%M %p')

    context = {
        'date': date,
        'time': clock
    }

    return render(request, 'display/index.html', context)
