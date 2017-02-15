from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'disappearing_ninjas/index.html')

def ninja(request):
    context = { 'link': 'tmnt.png' }
    return render(request, 'disappearing_ninjas/ninja.html', context)

def colors(request, color):
    context = {}

    turtle_color = color

    if turtle_color == 'blue':
        context['link'] = 'leonardo.jpg'
    elif turtle_color == 'orange':
        context['link'] = 'michelangelo.jpg'
    elif turtle_color == 'red':
        context['link'] = 'raphael.jpg'
    elif turtle_color == 'purple':
        context['link'] = 'donatello.jpg'
    else:
        context['link'] = 'notapril.jpg'

    return render(request, 'disappearing_ninjas/ninja.html', context)
