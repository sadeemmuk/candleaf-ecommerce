from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from . import models
from . import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication



class Products(ModelViewSet):
    queryset = models.Products.objects.all()
    serializer_class = serializers.ProductsSerializer
    renderer_classes = [JSONRenderer]


class Customers(ModelViewSet):
    queryset = models.Customers.objects.all()
    serializer_class = serializers.CustomersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
    
    def get_serializer_context(self):
        return {"user" : self.request.user}


class Orders(ModelViewSet):
    queryset = models.Orders.objects.all()
    serializer_class = serializers.OrdersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        return self.queryset.filter(customer__owner = self.request.user)



class Info(ModelViewSet):
    queryset = models.Info.objects.all()
    serializer_class = serializers.InfoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    renderer_classes = [JSONRenderer]


    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
