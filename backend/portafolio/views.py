# 'from rest_framework import viewsets'
# Importa 'viewsets', que son "ventanillas" pre-construidas por DRF.
from rest_framework import viewsets

# 'from .models import ...'
# Importa tus "moldes" de datos.
from .models import Proyecto, Tecnologia, Perfil

# 'from .serializers import ...'
# Importa tus "traductores".
from .serializers import ProyectoSerializer, TecnologiaSerializer, PerfilSerializer


# 'class ProyectoViewSet(...):'
# Crea una ventanilla para Proyectos.
# 'viewsets.ReadOnlyModelViewSet'
# Es una ventanilla de "Solo Lectura". Perfecto para un portafolio.
# (No permite que gente desconocida use la API para borrar tus proyectos).
class ProyectoViewSet(viewsets.ReadOnlyModelViewSet):

    # 'queryset = ...'
    # La consulta a la base de datos: "Trae TODOS los objetos Proyecto".
    queryset = Proyecto.objects.all()

    # 'serializer_class = ...'
    # El traductor que debe usar: "Usa el ProyectoSerializer".
    serializer_class = ProyectoSerializer


# Crea una ventanilla de "Solo Lectura" para Tecnologias.
class TecnologiaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer


# Crea una ventanilla de "Solo Lectura" para Perfil.
class PerfilViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
