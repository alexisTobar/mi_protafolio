from django.contrib import admin
from .models import Proyecto  # 1. Importa tu "molde" Proyecto

# 2. Dile al admin que gestione este molde
admin.site.register(Proyecto)