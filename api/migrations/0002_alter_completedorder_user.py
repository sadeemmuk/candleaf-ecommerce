# Generated by Django 4.2.3 on 2024-02-05 00:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='completedorder',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.customers'),
        ),
    ]