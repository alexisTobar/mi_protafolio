// Importa React (necesario para JSX)
import React from 'react';

// Importa los estilos (el .css que acabamos de editar)
import styles from './Stack.module.css';

// Importa todas las "cajas" de íconos que podríamos necesitar
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// --- EL "SÚPER-MAPA" DE ICONOS ---
// Combina todos los íconos en un solo objeto para búsqueda fácil
const AllIcons = {
    ...FaIcons,
    ...SiIcons,
};

// --- EL COMPONENTE "Icono" (El Mago) ---
const Icono = ({ icon_name }) => {
    // Busca el nombre (ej: "FaPython") dentro del "Súper-Mapa".
    const IconoComponente = AllIcons[icon_name];

    // Si no encuentra el ícono (o el campo está vacío),
    // usa un ícono genérico de "pregunta"
    if (!IconoComponente) {
        return <FaIcons.FaQuestionCircle className={styles.stackIcon} />;
    }

    // Renderiza el ícono que encontró dinámicamente
    return <IconoComponente className={styles.stackIcon} />;
};


// --- COMPONENTE INTERNO "CategoriaStack" ---
// Un componente solo para dibujar una sección (ej: "Frontend")
// Recibe un 'titulo' (ej: "Frontend") y la lista de 'tecnologias' (filtradas)
const CategoriaStack = ({ titulo, tecnologias }) => (
    <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>{titulo}</h3>
        <div className={styles.stackGrid}>
            {tecnologias.map(tec => (
                <div key={tec.id} className={styles.stackItem}>
                    <Icono icon_name={tec.icon_name} />
                    <span>{tec.nombre}</span>
                </div>
            ))}
        </div>
    </div>
);


// --- EL COMPONENTE PRINCIPAL (MODIFICADO) ---
function Stack({ tecnologias }) {

    // --- ¡LA LÓGICA DE FILTRADO! ---
    // Usamos .filter() de JavaScript para separar la lista 'tecnologias'
    // en 3 listas nuevas, basadas en el campo 'categoria' que viene de Django.

    const frontendTecs = tecnologias.filter(t => t.categoria === 'frontend');
    const backendTecs = tecnologias.filter(t => t.categoria === 'backend');
    const databaseTecs = tecnologias.filter(t => t.categoria === 'database');
    // (Puedes agregar 'devopsTecs', 'otherTecs', etc., si las necesitas)

    return (
        <section className={styles.stackContainer} id="stack">
            <h2 className={styles.sectionTitle}>Mi Stack Tecnológico</h2>

            {/* Ahora, en lugar de un solo grid, dibujamos un componente 'CategoriaStack'
        por cada grupo, solo SI ese grupo tiene items (length > 0).
      */}

            {/* Sección Frontend */}
            {frontendTecs.length > 0 && (
                <CategoriaStack titulo="Frontend" tecnologias={frontendTecs} />
            )}

            {/* Sección Backend */}
            {backendTecs.length > 0 && (
                <CategoriaStack titulo="Backend" tecnologias={backendTecs} />
            )}

            {/* Sección Bases de Datos */}
            {databaseTecs.length > 0 && (
                <CategoriaStack titulo="Bases de Datos" tecnologias={databaseTecs} />
            )}

            {/* (Si agregaste más categorías, las pones aquí) */}

        </section>
    );
}

export default Stack;