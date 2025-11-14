from rest_framework import viewsets
from .models import Proyecto
from .serializers import ProyectoSerializer

class ProyectoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Esta API ViewSet muestra automáticamente la lista de proyectos.
    Solo permite leer (GET), no crear o borrar desde la API pública.
    """
    queryset = Proyecto.objects.all().order_by('-fecha_creacion')
    serializer_class = ProyectoSerializer

# Create your views here.
