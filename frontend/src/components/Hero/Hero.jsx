// Hero.jsx (v5 - Diseño de 2 Columnas)
import React from 'react';
import styles from './Hero.module.css';

function Hero({ perfil }) {

    // --- Función de Descarga (Corregida) ---
    const handleDownload = async () => {
        if (!perfil || !perfil.cv_url) return;
        const fileUrl = perfil.cv_url;

        try {
            const response = await fetch(fileUrl, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'CV-AlexisTobar.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el CV:", error);
            window.open(fileUrl, '_blank');
        }
    };
    // --- FIN DE LA FUNCIÓN ---

    // Estado de Carga
    if (!perfil) {
        return (
            <div className={styles.hero}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroColumnText}>
                        <h1 className={styles.heroTitle}>Cargando...</h1>
                    </div>
                </div>
            </div>
        );
    }

    // ¡Estado Cargado!
    return (
        <div className={styles.hero}>
            <div className={styles.heroGrid}>

                {/* --- Columna Izquierda (Todo el Texto) --- */}
                <div className={styles.heroColumnText}>

                    {/* Tu Nombre */}
                    <h1 className={styles.heroTitle}>
                        <span className={styles.name}>{perfil.nombre_completo}</span>
                    </h1>

                    {/* Tu Bio Corta */}
                    <p className={styles.heroSubtitle}>
                        {perfil.bio_corta}
                    </p>

                    {/* Tu Bio Larga */}
                    <h2 className={styles.descriptionTitle}>&lt;Sobre Mí&gt;</h2>
                    <p className={styles.description}>
                        {perfil.bio_larga}
                    </p>

                    {/* El Botón de CV (solo si existe) */}
                    {perfil.cv_url && (
                        <button
                            onClick={handleDownload}
                            className={styles.cvButton}
                        >
                            Descargar CV
                        </button>
                    )}
                </div>

                {/* --- Columna Derecha (Imagen IA) --- */}
                <div className={styles.heroImageContainer}>
                    <img
                        src="https://i.postimg.cc/mr5XLFGh/Gemini-Generated-Image-j3gc9gj3gc9gj3gc.png"
                        alt="Arte de Programación IA"
                        className={styles.heroImage}
                    />
                </div>

            </div>
        </div>
    );
}

export default Hero;