"""
URL configuration for config project.
"""
from django.contrib import admin
from django.urls import path, include

# --- 1. Importaciones Nuevas ---
# Importamos 'settings' y 'static' para servir los archivos
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    # --- AGREGA ESTA LÍNEA ---
    # Le dice a Django: "Cualquier URL que empiece con 'api/chatbot/',
    # envíala al archivo 'chatbot/urls.py'".
    path('api/chatbot/', include('chatbot.urls')),

    # --- 2. AGREGA ESTA LÍNEA ---
    # Le dice a Django: "Cualquier URL que empiece con 'api/',
    # envíala a tu archivo 'portafolio/urls.py'".
    path('api/', include('portafolio.urls')),
]

# --- 2. Línea Nueva para desarrollo ---
# Esto le dice a Django: "Cuando estemos en modo DEBUG (desarrollo),
# muestra los archivos que están en MEDIA_ROOT (tu CV)"
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
