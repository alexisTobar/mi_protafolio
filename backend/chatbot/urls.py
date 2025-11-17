# 'from django.urls import path'
# Importa la herramienta para crear rutas (direcciones).
from django.urls import path

# 'from .views import ChatbotView'
# Importa tu "ventanilla" (la clase) desde views.py
from .views import ChatbotView

urlpatterns = [
    # Cuando visiten la raíz de esta app (ej: /api/chatbot/),
    # llamará a 'ChatbotView'.
    path('', ChatbotView.as_view(), name='chatbot_api'),
]