# backend/portafolio/admin.py

from django.contrib import admin
from .models import Proyecto, Tecnologia, Perfil

class TecnologiaAdmin(admin.ModelAdmin):
    # 'list_display'
    # Muestra estas 3 columnas en la lista del admin
    list_display = ('nombre', 'icon_name', 'categoria')

    # 'fields'
    # Define el orden de los campos en el formulario de edición
    fields = ('nombre', 'icon_name', 'categoria')

    # 'list_filter'
    # ¡Un bonus! Agrega un filtro en el costado derecho del admin
    # para que puedas filtrar por "Frontend", "Backend", etc.
    list_filter = ('categoria',)


# Registra los modelos
admin.site.register(Proyecto)
# Asegúrate de que Tecnologia use la config avanzada 'TecnologiaAdmin'
admin.site.register(Tecnologia, TecnologiaAdmin) 
admin.site.register(Perfil)