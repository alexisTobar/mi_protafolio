# 'from rest_framework import serializers'
# Importa las herramientas de "traducción" de Django REST Framework (DRF).
from rest_framework import serializers

# 'from .models import ...'
# Importa los "moldes" que creaste en models.py.
from .models import Proyecto, Tecnologia, Perfil


# 'class ProyectoSerializer(...):'
# Define un traductor para el molde 'Proyecto'.
class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        # 'fields = '__all__''
        # '__all__' es un atajo para "traduce todos los campos" (id, titulo, etc.).
        fields = '__all__'


# Define un traductor para el molde 'Tecnologia'.
class TecnologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tecnologia
        fields = '__all__'


# Define un traductor para el molde 'Perfil'.
class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = '__all__'