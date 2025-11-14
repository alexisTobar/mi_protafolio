from django.urls import path
from .views import ChatbotView

urlpatterns = [
    # Cuando visiten la raíz de la app, llamará a ChatbotView
    path('', ChatbotView.as_view(), name='chatbot_api'),
]