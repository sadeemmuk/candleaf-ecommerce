from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('products/', views.Products.as_view({'get' : 'list'}), name='products'),
    path('products/<int:pk>', views.Products.as_view({'get' : 'retrieve'})),
    path('customers/', views.Customers.as_view({'get' : 'list', 'post' : 'create'})),
    path('customers/<int:pk>/', views.Customers.as_view({'patch' : 'partial_update'})),
    path('orders/', views.Orders.as_view({'get' : 'list', 'post' : 'create'})),
    path('orders/<int:pk>', views.Orders.as_view({'delete' : 'destroy' })),
    path('info/', views.Info.as_view({'get' : 'list', 'post' : 'create'})),
    path('info/<int:pk>', views.Info.as_view({'get' : 'retrieve', 'patch' : 'partial_update'})),
]