from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, 'survey_form/index.html')

def results(request):
    return render(request, 'survey_form/result.html')

def process(request):
    if request.method == "POST":
        data = {
            'name': request.POST['name'],
            'location': request.POST['location'],
            'language': request.POST['language'],
            'comment': request.POST['comment']
        }

        request.session['form_data'] = data

        return redirect('/result')
