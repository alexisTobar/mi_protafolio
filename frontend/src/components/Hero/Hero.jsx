// Hero.jsx
import React from 'react';
import styles from './Hero.module.css';

// --- ¡AQUÍ ESTÁ EL CAMBIO PARA PRODUCCIÓN! ---
// Definimos la dirección "en vivo" de nuestro Django en Render.
const BACKEND_URL = 'https://alexis-backend.onrender.com';

function Hero({ perfil }) {

    const handleDownload = async () => {
        if (!perfil || !perfil.cv) return;

        // --- ¡Y AQUÍ USAMOS EL CAMBIO! ---
        // Ahora construimos la URL completa para el 'fetch'
        const fileUrl = `${BACKEND_URL}${perfil.cv}`;
        console.log("Intentando descargar:", fileUrl);

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            const fileName = perfil.cv.split('/').pop();
            link.setAttribute('download', fileName || 'cv.pdf');

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error al descargar el CV:", error);
        }
    };
    // --- FIN DE LA NUEVA FUNCIÓN ---


    return (
        <div className={styles.hero}>
            <div className={styles.heroGrid}>

                {/* --- Columna Izquierda --- */}
                <div className={styles.heroColumnLeft}>
                    <h1 className={styles.heroTitle}>Developer</h1>
                    <p className={styles.heroSubtitle}>
                        Desarrollador Full Stack especializado en soluciones
                        robustas con Python y Django.
                    </p>
                </div>

                {/* --- Elemento Visual Central (Imagen IA) --- */}
                <div className={styles.heroImageContainer}>
                    <img
                        src="https://i.postimg.cc/mr5XLFGh/Gemini-Generated-Image-j3gc9gj3gc9gj3gc.png"
                        alt="Arte de Programación IA"
                        className={styles.heroImage}
                    />
                </div>

                {/* --- Columna Derecha --- */}
                <div className={styles.heroColumnRight}>
                    <h1 className={styles.heroTitle}>&lt;Coder&gt;</h1>
                    <p className={styles.heroSubtitle}>
                        Apasionado por el código limpio, eficiente
                        y la creación de interfaces modernas con React.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Hero;