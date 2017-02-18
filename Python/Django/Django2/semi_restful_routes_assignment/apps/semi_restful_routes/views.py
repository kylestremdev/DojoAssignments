from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from .models import Product

# Create your views here.
def index(request):
    context = {
        'products': Product.objects.all()
    }
    return render(request, 'index.html', context)

def show(request, product_id):
    context = {}
    try:
        context['product'] = Product.objects.get(id=product_id)
    except:
        pass

    return render(request, 'show.html', context)

def new(request):
    return render(request, 'new.html')

def edit(request, product_id):
    context = {}
    try:
        context['product'] = Product.objects.get(id=product_id)
    except:
        pass

    return render(request, 'edit.html', context)

def create(request):
    if request.method == "POST":
        Product.objects.create(
            name=request.POST['name'],
            description=request.POST['description'],
            price=request.POST['price']
        )

        return redirect(reverse('index'))

def update(request, product_id):
    if request.method == "POST":
        product = Product.objects.get(id=product_id)
        product.name = request.POST['name']
        product.description = request.POST['description']
        product.price = request.POST['price']

        product.save()

        return redirect(reverse('index'))

def destroy(request, product_id):
    Product.objects.get(id=product_id).delete()

    return redirect(reverse('index'))
