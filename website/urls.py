from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'website'
urlpatterns = [
    path('accounts/login', TemplateView.as_view(template_name="registration/login.html"), name='login'),
    path('accounts/signup', TemplateView.as_view(template_name="registration/signup.html"), name='signup'),
    path('products/<int:pk>', views.product, name='product'),
    path('', views.home, name='home'),
    path('cart', TemplateView.as_view(template_name="cart.html"), name="cart"),
    path('checkout', TemplateView.as_view(template_name="checkout.html"), name='checkout'),
    path('shipping', TemplateView.as_view(template_name='shipping.html')),
    path('confirm', TemplateView.as_view(template_name='confirm.html')),
]