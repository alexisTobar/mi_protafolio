// Importamos React y los "Hooks"
// 'useState' (para la memoria), 'useEffect' (para el scroll)
// y 'useRef' (para saber cuál es el último mensaje)
import React, { useState, useEffect, useRef } from 'react';

// Importamos 'axios' (el "mensajero" para llamar al cerebro)
import axios from 'axios';

// Importamos nuestros estilos
import styles from './Chatbot.module.css';

// Importamos el icono de la burbuja y el de cerrar
import { FaComments, FaTimes } from 'react-icons/fa';

// La URL de la API del cerebro que creamos
// (dentro de Chatbot.jsx)
const CHATBOT_API_URL = 'https://alexis-backend.onrender.com/api/chatbot/';

function Chatbot() {
    // --- 1. ESTADOS (la "memoria" del componente) ---

    // 'isOpen' -> ¿Está abierta la ventana?
    const [isOpen, setIsOpen] = useState(false);

    // 'mensaje' -> Lo que el usuario escribe en el input
    const [mensaje, setMensaje] = useState('');

    // 'historial' -> La lista de todos los mensajes (bot y usuario)
    const [historial, setHistorial] = useState([
        // Mensaje inicial del bot
        { de: 'bot', texto: '¡Hola! Soy el asistente de Alexis. ¿Cómo te puedo ayudar?' }
    ]);

    // 'finMensajesRef' -> Un "marcador" invisible
    // que siempre pondremos al final del último mensaje.
    const finMensajesRef = useRef(null);

    // --- 2. FUNCIÓN PARA HACER SCROLL AUTOMÁTICO ---
    const scrollToBottom = () => {
        // 'scrollIntoView' -> Le dice al navegador: "Haz scroll hasta este punto"
        finMensajesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // --- 3. EFECTO DE SCROLL ---
    // 'useEffect' que se activa CADA VEZ que el 'historial' de mensajes cambia.
    useEffect(() => {
        scrollToBottom();
    }, [historial]); // <-- El "trigger" (disparador) es el historial

    // --- 4. FUNCIÓN PARA MANEJAR EL ENVÍO DEL MENSAJE ---
    const handleSubmit = async (e) => {
        // 'e.preventDefault()' -> Evita que la página se recargue
        e.preventDefault();
        if (!mensaje.trim()) return; // No envía mensajes vacíos

        const mensajeUsuario = mensaje;

        // Actualiza la "memoria" del historial:
        // Toma todo lo anterior ('...prev') y agrega el nuevo mensaje del usuario
        setHistorial(prev => [...prev, { de: 'user', texto: mensajeUsuario }]);
        setMensaje(''); // Limpia el campo de texto

        try {
            // Llama a la API de Django (el cerebro) con el mensaje
            const response = await axios.post(CHATBOT_API_URL, {
                mensaje: mensajeUsuario
            });

            // 'response.data.respuesta' -> El JSON que devuelve Django
            const respuestaBot = response.data.respuesta;

            // Agrega la respuesta del bot al historial
            setHistorial(prev => [...prev, { de: 'bot', texto: respuestaBot }]);

        } catch (error) {
            console.error("Error al contactar al chatbot:", error);
            // Si el backend falla, el bot responde con un error
            setHistorial(prev => [...prev, { de: 'bot', texto: 'Lo siento, estoy teniendo problemas de conexión. Intenta más tarde.' }]);
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
                            <div
                                key={index}
                                // Aplica estilo 'user' o 'bot'
                                className={`${styles.message} ${msg.de === 'user' ? styles.user : styles.bot}`}
                            >
                                {msg.texto}
                            </div>
                        ))}

                        {/* El "marcador" invisible al final de la lista */}
                        <div ref={finMensajesRef} />
                    </div>

                    {/* El formulario para escribir */}
                    <form className={styles.chatInputArea} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className={styles.chatInput}
                            placeholder="Escribe tu pregunta..."
                            value={mensaje}
                            // 'onChange' -> Actualiza la "memoria" 'mensaje' CADA VEZ que tecleas
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                        <button type="submit" className={styles.sendButton}>Enviar</button>
                    </form>
                </div>
            )}

            {/* 5. El botón burbuja que abre/cierra la ventana */}
            <button
                className={styles.chatButton}
                // 'onClick' -> Cambia el estado 'isOpen'
                onClick={() => setIsOpen(prev => !prev)}
            >
                {/* Si está abierto muestra (X), si no, muestra (💬) */}
                {isOpen ? <FaTimes /> : <FaComments />}
            </button>
        </div>
    );
}

export default Chatbot;