import React from 'react';
import styles from './Hero.module.css';

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    Hola, soy <span className={styles.heroName}>Alexis</span>.
                </h1>
                <h2 className={styles.heroSubtitle}>
                    Desarrollador Full Stack
                </h2>
                <p className={styles.heroDescription}>
                    Especializado en crear soluciones web robustas con Python, Django, React y Data Science.
                </p>
                <a href="#proyectos" className={styles.heroButton}>
                    Ver mis Proyectos
                </a>
            </div>
        </div>
    );
}

export default Hero;