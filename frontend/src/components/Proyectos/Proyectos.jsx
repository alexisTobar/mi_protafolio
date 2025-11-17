// 'import React from 'react';'
import React from 'react';

// 'import styles from ...'
// Importa los estilos de este componente.
import styles from './Proyectos.module.css';

// --- 1. Sub-Componente "Tarjeta" (Card) ---
// Este componente es "privado" de Proyectos.
// Solo se encarga de dibujar UNA tarjeta.
// Recibe un 'proyecto' individual.
function ProyectoCard({ proyecto }) {
    return (
        <div className={styles.card}>

            {/* 'proyecto.imagen_url && ...'
        ¡Nuestra estrategia a prueba de fallos!
        Si hay un link de imagen, lo muestra.
        No hay subida, no hay fallos.
      */}
            {proyecto.imagen_url && (
                <img
                    src={proyecto.imagen_url}
                    alt={proyecto.titulo}
                    className={styles.cardImage}
                />
            )}

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{proyecto.titulo}</h3>
                <p className={styles.cardDescription}>{proyecto.descripcion}</p>
                <p className={styles.cardTech}>
                    <strong>Tecnologías:</strong> {proyecto.tecnologias}
                </p>

                <div className={styles.cardLinks}>
                    {proyecto.link_github && (
                        <a href={proyecto.link_github} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                            GitHub
                        </a>
                    )}
                    {/* (Podrías agregar 'link_demo' a tu modelo si quisieras) */}
                </div>
            </div>
        </div>
    );
}


// --- 2. Componente Principal "Proyectos" ---
// Este componente recibe la LISTA COMPLETA de proyectos.
function Proyectos({ proyectos }) {
    return (
        // 'id="proyectos"'
        // Esto es un "ancla" para que el menú de navegación pueda
        // hacer scroll hasta aquí.
        <section className={styles.proyectosContainer} id="proyectos">

            <h2 className={styles.sectionTitle}>Mis Proyectos</h2>

            <div className={styles.proyectosGrid}>
                {/* 'proyectos.map(p => (...))'
          Recorre la lista de proyectos y, por cada uno,
          crea un componente 'ProyectoCard', pasándole
          los datos de ese proyecto ('p').
        */}
                {proyectos.map(p => (
                    <ProyectoCard key={p.id} proyecto={p} />
                ))}
            </div>
        </section>
    );
}

export default Proyectos;