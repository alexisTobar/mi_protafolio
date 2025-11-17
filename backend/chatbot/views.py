# --- 1. IMPORTACIONES ---
# Importamos las herramientas de Django (APIView, Response)
from rest_framework.views import APIView
from rest_framework.response import Response

# Importamos el limpiador de texto (acentos)
from unidecode import unidecode

# Importamos las herramientas de IA (sklearn)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Importamos las herramientas de Hora (para Chile)
import datetime
import pytz


# --- 2. BASE DE CONOCIMIENTOS DE ALEXIS ---
# Aquí "entrenamos" al bot.
# Puedes agregar todas las 'patterns' (preguntas de ejemplo) que quieras.
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
        # ¡Personalízalo!
        'respuesta': '¡Claro! Todos los proyectos que ves en esta página fueron creados por él. Si quieres ver más código, puedes visitar su GitHub: https://github.com/alexisTobar.'
    },
    'contacto': {
        'patterns': ['como te contacto', 'cual es tu email', 'tu correo', 'tienes linkedin', 'contacto', 'hablar contigo'],
         # ¡Personalízalo!
        'respuesta': 'Puedes contactar a Alexis directamente a su correo: TOBARALEXIS.89@GMAIL.COM o encontrarlo en LinkedIn: https://www.linkedin.com/in/alexistobarsalazar/.'
    },
    'ayuda': {
        'patterns': ['que puedes hacer', 'ayuda', 'que preguntas respondes', 'opciones', 'que podemos hacer'],
        'respuesta': 'Puedo responder preguntas sobre las tecnologías, proyectos y experiencia de Alexis. También puedes pedirme su email/contacto o la hora actual.'
    },
    'hora': {
        'patterns': ['que hora es', 'dime la hora', 'la hora', 'hora exacta'],
        'respuesta': '' # La respuesta es dinámica, la generamos abajo
    },
    'default': {
        'patterns': [],
        'respuesta': "No estoy seguro de entenderte. Prueba a preguntarme: '¿qué tecnologías dominas?', '¿cuál es tu email?' o '¿qué hora es?'."
    }
}


# --- 3. CLASE PARA "ENTRENAR" EL MODELO ---
# (Esta es la lógica de IA/NLP)
class ChatbotTrainer:
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base
        # 'TfidfVectorizer' es el cerebro matemático que convierte texto en números
        self.vectorizer = TfidfVectorizer()
        self.intents_map = {}
        self.matrix_tfidf = None

        patterns = []
        intents = []
        # Recorre la base de conocimientos y prepara los datos de entrenamiento
        for intent, data in self.knowledge_base.items():
            if intent == 'default':
                continue
            for pattern in data['patterns']:
                patterns.append(self.limpiar(pattern))
                intents.append(intent)

        self.intents_map = {i: intent for i, intent in enumerate(intents)}
        # Entrena el "cerebro" con todas las preguntas de ejemplo
        self.matrix_tfidf = self.vectorizer.fit_transform(patterns)

    # Función para limpiar acentos y mayúsculas
    def limpiar(self, texto):
        return unidecode(texto.lower())

    # Función que "predice" la intención del usuario
    def predecir_intencion(self, texto_usuario):
        texto_limpio = self.limpiar(texto_usuario)
        vector_usuario = self.vectorizer.transform([texto_limpio])

        # 'cosine_similarity'
        # Compara matemáticamente la pregunta del usuario con TODAS las preguntas
        # que conoce y encuentra la más parecida.
        similitudes = cosine_similarity(vector_usuario, self.matrix_tfidf)

        max_sim = similitudes.max()

        # Si la pregunta no se parece a NADA (menos del 20%), usa 'default'
        if max_sim < 0.2: 
            return 'default'

        # Si no, devuelve la intención más parecida (ej: 'contacto')
        idx_mas_similar = similitudes.argmax()
        return self.intents_map[idx_mas_similar]


# --- 4. ENTRENAMIENTO (Se ejecuta 1 vez cuando Django arranca) ---
print("🤖 Entrenando chatbot Nivel 4...")
# Creamos un "entrenador global" que vive en la memoria
GLOBAL_TRAINER = ChatbotTrainer(KNOWLEDGE_BASE)
print("✅ Chatbot entrenado y listo.")


# --- 5. LA "VENTANILLA" API (Mejorada) ---
class ChatbotView(APIView):
    # Esta función se activa cuando React le envía un 'POST'
    def post(self, request, *args, **kwargs):
        mensaje_usuario = request.data.get('mensaje', '')

        # 1. Usa el "cerebro" para predecir la intención
        intencion = GLOBAL_TRAINER.predecir_intencion(mensaje_usuario)

        # --- 6. LÓGICA DE ACCIONES ---

        # Si la intención es 'hora', ejecuta código Python
        if intencion == 'hora':
            # (Usamos tu zona horaria de Chile)
            tz_chile = pytz.timezone('America/Santiago') 
            hora_actual = datetime.datetime.now(tz_chile).strftime("%H:%M") # Formato 24h
            respuesta = f"¡Claro! En Chile son las {hora_actual}."

        # Si no, solo busca la respuesta estática en la Base de Conocimientos
        else:
            respuesta = KNOWLEDGE_BASE[intencion]['respuesta']

        # Devuelve el JSON a React
        return Response({'respuesta': respuesta})