# 'from rest_framework.routers import DefaultRouter'
# Importa el "enrutador" de DRF. Esta herramienta crea las URLs
# (como /proyectos/ y /proyectos/1/) automáticamente.
from rest_framework.routers import DefaultRouter

# 'from . import views'
# Importa tu archivo 'views.py'.
from . import views

# 'router = DefaultRouter()'
# Crea una instancia del enrutador.
router = DefaultRouter()

# 'router.register(...)'
# Registra tus ventanillas (ViewSets) en el enrutador.
# 'r'proyectos'' -> La dirección web (ej: /api/proyectos/)
# 'views.ProyectoViewSet' -> La ventanilla que debe atender
# 'basename='proyecto'' -> Un nombre interno para la ruta
router.register(r'proyectos', views.ProyectoViewSet, basename='proyecto')
router.register(r'tecnologias', views.TecnologiaViewSet, basename='tecnologia')
router.register(r'perfil', views.PerfilViewSet, basename='perfil')

# 'urlpatterns = router.urls'
# Exporta todas las URLs que el enrutador creó.
urlpatterns = router.urls