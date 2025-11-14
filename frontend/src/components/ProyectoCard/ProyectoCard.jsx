// ProyectoCard.jsx
import React from 'react';
import styles from './ProyectoCard.module.css'; // Importa los estilos

function ProyectoCard({ proyecto }) {
    return (
        <div className={styles.card}>
            {proyecto.imagen && (
                <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className={styles.cardImage}
                />
            )}
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{proyecto.titulo}</h2>
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
                    {proyecto.link_demo && (
                        <a href={proyecto.link_demo} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                            Ver Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProyectoCard;