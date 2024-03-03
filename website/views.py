from django.shortcuts import render
from api.models import Products
from django.shortcuts import get_object_or_404

# Create your views here.

def home(request):
    pro = Products.objects.all()
    ctx = {"Products" : pro}
    return render(request, 'home/home.html', ctx)

def product(request, pk):
    pro = get_object_or_404(Products, id=pk)
    ctx = {'product' : pro}
    return render(request, 'product.html', ctx)