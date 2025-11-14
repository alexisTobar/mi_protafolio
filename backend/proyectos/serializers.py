from rest_framework import serializers
from .models import Proyecto

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        # Le decimos qué campos del modelo queremos traducir
        fields = ('id', 'titulo', 'descripcion', 'tecnologias', 'link_github', 'link_demo', 'imagen', 'fecha_creacion')