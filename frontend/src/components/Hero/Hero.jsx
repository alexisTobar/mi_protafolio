// Hero.jsx (v4 - Híbrido)
import React from 'react';
import styles from './Hero.module.css';

// ¡Ya no necesitamos la constante 'BACKEND_URL'!
// Usaremos la URL completa de la API.

function Hero({ perfil }) {

    // --- Función de Descarga (¡Corregida!) ---
    const handleDownload = async () => {
        // 1. Revisa el campo 'cv_url'
        if (!perfil || !perfil.cv_url) return;

        // 2. Usa la URL completa 'cv_url'
        const fileUrl = perfil.cv_url;
        console.log("Intentando descargar:", fileUrl);

        try {
            // (Mejora: modo 'cors' por si el link es de Google Drive)
            const response = await fetch(fileUrl, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            // Nombre de archivo genérico
            link.setAttribute('download', 'CV-AlexisTobar.pdf');

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error al descargar el CV:", error);
            // Plan B: Si el 'fetch' falla, solo abre el link en una pestaña nueva.
            window.open(fileUrl, '_blank');
        }
    };
    // --- FIN DE LA FUNCIÓN ---

    // Estado de Carga: Si el perfil no ha llegado, muestra un 'placeholder'
    if (!perfil) {
        return (
            <div className={styles.hero}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroColumnLeft}>
                        <h1 className={styles.heroTitle}>Cargando...</h1>
                    </div>
                    <div className={styles.heroImageContainer}></div>
                    <div className={styles.heroColumnRight}>
                        <h1 className={styles.heroTitle}>&lt;...&gt;</h1>
                    </div>
                </div>
            </div>
        );
    }

    // ¡Estado Cargado! Dibuja el Hero con tus datos.
    return (
        <div className={styles.hero}>
            <div className={styles.heroGrid}>

                {/* --- Columna Izquierda (¡DINÁMICA!) --- */}
                <div className={styles.heroColumnLeft}>
                    <h1 className={styles.heroTitle}>
                        {/* ¡Tu Nombre con Gradiente! */}
                        <span className={styles.name}>{perfil.nombre_completo}</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {/* ¡Tu Bío Corta! */}
                        {perfil.bio_corta}
                    </p>

                    {/* ¡El Botón de CV (solo si existe)! */}
                    {perfil.cv_url && (
                        <button
                            onClick={handleDownload}
                            className={styles.cvButton}
                        >
                            Descargar CV
                        </button>
                    )}
                </div>

                {/* --- Elemento Visual Central (Imagen IA) --- */}
                <div className={styles.heroImageContainer}>
                    <img
                        src="https://i.postimg.cc/mr5XLFGh/Gemini-Generated-Image-j3gc9gj3gc9gj3gc.png"
                        alt="Arte de Programación IA"
                        className={styles.heroImage}
                    />
                </div>

                {/* --- Columna Derecha (¡DINÁMICA!) --- */}
                <div className={styles.heroColumnRight}>
                    <h1 className={styles.heroTitle}>&lt;Sobre Mí&gt;</h1>
                    <p className={styles.heroSubtitle}>
                        {/* ¡Tu Bío Larga! */}
                        {perfil.bio_larga}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Hero;