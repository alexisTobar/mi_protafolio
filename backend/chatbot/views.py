from rest_framework.views import APIView
from rest_framework.response import Response
from unidecode import unidecode
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import datetime
import pytz
import requests 

# --- BASE DE CONOCIMIENTOS DE ALEXIS ---
KNOWLEDGE_BASE = {
    'saludo': {
        'patterns': ['hola', 'buenos dias', 'que tal', 'como estas', 'saludos'],
        'respuesta': '¡Hola! 👋 Soy el asistente de Alexis. ¿En qué te puedo ayudar? Puedes preguntarme sobre sus tecnologías, contacto o proyectos.'
    },
    'despedida': {
        'patterns': ['adios', 'chao', 'nos vemos', 'gracias', 'muchas gracias'],
        'respuesta': '¡De nada! Fue un placer ayudarte. ¡Que tengas un gran día!'
    },
    'tecnologias': {
        'patterns': ['que tecnologias usas', 'que dominas', 'cual es tu stack', 'programacion', 'python', 'react'],
        'respuesta': 'Alexis es un desarrollador Full Stack. Domina Python, Django, React, JavaScript, SQL, Power BI y Machine Learning.'
    },
    'proyectos': {
        'patterns': ['cuales son tus proyectos', 'muestrame tu portafolio', 'que has hecho', 'dame un link a un proyecto'],
        'respuesta': '¡Claro! Todos los proyectos que ves en esta página fueron creados por él. Si quieres ver más código, puedes visitar su GitHub: [https://github.com/alexisTobar].'
    },
    'contacto': {
        'patterns': ['como te contacto', 'cual es tu email', 'tu correo', 'tienes linkedin', 'contacto', 'hablar contigo'],
        'respuesta': 'Puedes contactar a Alexis directamente a su correo: [TOBARALEXIS.89@GMAIL.COM] o encontrarlo en LinkedIn: [https://www.linkedin.com/in/alexistobarsalazar/].'
    },
    'ayuda': {
        'patterns': ['que puedes hacer', 'ayuda', 'que preguntas respondes', 'opciones', 'que podemos hacer'],
        'respuesta': 'Puedo responder preguntas sobre las tecnologías, proyectos y experiencia de Alexis. También puedes pedirme su email/contacto, la hora actual'
    },
    'hora': {
        'patterns': ['que hora es', 'dime la hora', 'la hora', 'hora exacta'],
        'respuesta': '' # Dinámica
    },
    
    'default': {
        'patterns': [],
        'respuesta': "No estoy seguro de entenderte. Prueba a preguntarme: '¿qué tecnologías dominas?', '¿cuál es tu email?' o '¿qué hora es?'."
    }
}

# --- CLASE DE ENTRENAMIENTO (sin cambios) ---
class ChatbotTrainer:
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base
        self.vectorizer = TfidfVectorizer()
        self.intents_map = {}
        self.matrix_tfidf = None
        patterns = []
        intents = []
        for intent, data in self.knowledge_base.items():
            if intent == 'default':
                continue
            for pattern in data['patterns']:
                patterns.append(self.limpiar(pattern))
                intents.append(intent)
        self.intents_map = {i: intent for i, intent in enumerate(intents)}
        self.matrix_tfidf = self.vectorizer.fit_transform(patterns)

    def limpiar(self, texto):
        return unidecode(texto.lower())

    def predecir_intencion(self, texto_usuario):
        texto_limpio = self.limpiar(texto_usuario)
        vector_usuario = self.vectorizer.transform([texto_limpio])
        similitudes = cosine_similarity(vector_usuario, self.matrix_tfidf)
        max_sim = similitudes.max()
        if max_sim < 0.2: 
            return 'default'
        idx_mas_similar = similitudes.argmax()
        return self.intents_map[idx_mas_similar]

# --- ENTRENAMIENTO (sin cambios) ---
print("🤖 Entrenando chatbot Nivel 5 (Chile)...")
GLOBAL_TRAINER = ChatbotTrainer(KNOWLEDGE_BASE)
print("✅ Chatbot entrenado y listo.")


# --- API VIEW (NIVEL 5 - HÍBRIDA) ---
class ChatbotView(APIView):
    """
    API View para el chatbot Nivel 5 (NLP + Acciones + APIs Externas).
    Usa la API 2.5 (Gratuita) de OpenWeather.
    """
    def post(self, request, *args, **kwargs):
        mensaje_usuario = request.data.get('mensaje', '')
        intencion = GLOBAL_TRAINER.predecir_intencion(mensaje_usuario)
        
        # --- LÓGICA DE ACCIONES DINÁMICAS ---
        
        if intencion == 'hora':
            # Zona horaria de Chile
            tz_chile = pytz.timezone('America/Santiago') 
            hora_actual = datetime.datetime.now(tz_chile).strftime("%H:%M")
            respuesta = f"¡Claro! En Chile son las {hora_actual}."
        
        
        else:
            # Lógica Estática (para 'saludo', 'contacto', etc.)
            respuesta = KNOWLEDGE_BASE[intencion]['respuesta']
        
        return Response({'respuesta': respuesta})