from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Products
        fields = ['id', 'name', 'price']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CustomersSerializer(serializers.ModelSerializer):
    owner = UserSerializer
    order = ProductsSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = models.Customers
        fields = ['id', 'owner', 'order', 'total_price', 'status']


    def get_total_price(self, obj):
        user = self.context.get('user')
        orders = models.Orders.objects.filter(customer__owner=user)
        order_s = OrdersSerializer(orders, many=True)
        return sum([item['total_number'] for item in order_s.data])


class OrdersSerializer(serializers.ModelSerializer):
    customer = CustomersSerializer
    product = ProductsSerializer
    total_number = serializers.SerializerMethodField()

    class Meta:
        model = models.Orders
        fields = ['id', 'customer', 'product', 'number', 'total_number']
    

    def get_total_number(self, obj):
        return obj.number * obj.product.price
    


class InfoSerializer(serializers.ModelSerializer):
    owner = UserSerializer
    class Meta:
        model = models.Info
        fields = ['owner', 'first_name', 'last_name', 'phone', 'address','postal_code', 'state']
