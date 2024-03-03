from django.contrib import admin
from . import models

admin.site.register(models.Products)
admin.site.register(models.Customers)
admin.site.register(models.Orders)
admin.site.register(models.Info)