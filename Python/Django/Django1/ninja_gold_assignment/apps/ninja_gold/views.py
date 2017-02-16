from django.shortcuts import render, redirect
import random, datetime

# Create your views here.
def index(request):
    if 'gold' not in request.session:
        request.session['gold'] = 0
        request.session['activities'] = []

    return render(request, 'index.html')

def process_money(request, user_action):
    if request.method == "POST":
        coins = 0
        if user_action == 'farm':
            #handle farm
            coins = random.randrange(10,21)
        elif user_action == 'cave':
            #handle cave
            coins = random.randrange(5,11)
        elif user_action == 'house':
            #handle house
            coins = random.randrange(2,6)
        elif user_action == 'casino':
            #handle casino
            coins = random.randrange(-50,51)

        time = datetime.datetime.now().strftime('%Y/%m/%d %I:%M %p')

        if coins >= 0:
            activity = {
                'message': "Earned {} at the {}! ({})".format(coins, user_action, time),
                'context': 'success'
            }
            request.session['activities'].insert(0, activity)
        else:
            activity = {
                'message': "Lost {} at the {}! ({})".format(-coins, user_action, time),
                'context': 'error'
            }
            request.session['activities'].insert(0, activity)

        request.session['gold'] += coins

        # update session gold
        return redirect('/')

def reset(request):
    request.session.pop('gold')
    request.session.pop('activities')

    return redirect('/')
