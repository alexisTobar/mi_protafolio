// Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chatbot.module.css';

// La URL de la API del cerebro que creamos
const CHATBOT_API_URL = 'https://alexis-backend.onrender.com/api/v1/chatbot/';

function Chatbot() {
    // 1. Estados (la "memoria" del componente)
    const [isOpen, setIsOpen] = useState(false); // ¿Está abierta la ventana?
    const [mensaje, setMensaje] = useState(''); // Lo que el usuario escribe
    const [historial, setHistorial] = useState([
        // Mensaje inicial del bot
        { de: 'bot', texto: '¡Hola! Soy el asistente de Alexis. ¿Cómo te puedo ayudar?' }
    ]);

    // 2. Función para manejar el envío del mensaje
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        if (!mensaje.trim()) return; // No envía mensajes vacíos

        const mensajeUsuario = mensaje;

        // 3. Añade el mensaje del usuario al historial (para verlo en pantalla)
        setHistorial(prev => [...prev, { de: 'user', texto: mensajeUsuario }]);
        setMensaje(''); // Limpia el campo de texto

        try {
            // 4. Llama a la API de Django con el mensaje
            const response = await axios.post(CHATBOT_API_URL, {
                mensaje: mensajeUsuario
            });

            // 5. Añade la respuesta del bot al historial
            setHistorial(prev => [...prev, { de: 'bot', texto: response.data.respuesta }]);

        } catch (error) {
            console.error("Error al contactar al chatbot:", error);
            setHistorial(prev => [...prev, { de: 'bot', texto: 'Lo siento, estoy teniendo problemas. Intenta más tarde.' }]);
        }
    };

    return (
        <div className={styles.chatContainer}>

            {/* 3. La ventana de chat (solo se muestra si 'isOpen' es true) */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>Asistente de Portafolio</div>

                    <div className={styles.chatMessages}>
                        {/* 4. Mapea (recorre) el historial y crea un div por cada mensaje */}
                        {historial.map((msg, index) => (
                            <div key={index} className={`${styles.message} ${msg.de === 'user' ? styles.user : styles.bot}`}>
                                {msg.texto}
                            </div>
                        ))}
                    </div>

                    <form className={styles.chatInputArea} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className={styles.chatInput}
                            placeholder="Escribe tu pregunta..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                        <button type="submit" className={styles.sendButton}>Enviar</button>
                    </form>
                </div>
            )}

            {/* 5. El botón burbuja que abre/cierra la ventana */}
            <button className={styles.chatButton} onClick={() => setIsOpen(prev => !prev)}>
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
}

export default Chatbot;