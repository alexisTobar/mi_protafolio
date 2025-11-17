// 'import React, { useState } from 'react';'
// Importamos React y el Hook 'useState' para manejar el estado.
import React, { useState } from 'react';

// 'import styles from ...'
// Importa los estilos CSS que acabamos de crear.
import styles from './Navbar.module.css';

// Importamos los iconos
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
// (¡Agregué FaGithub y FaLinkedin, que son más profesionales que FB/Instagram!)

function Navbar() {

    // 'isOpen' es la "memoria" que nos dice si el menú móvil está abierto.
    const [isOpen, setIsOpen] = useState(false);

    // Esta función cambia el estado (abierto/cerrado)
    const toggleMenu = () => setIsOpen(!isOpen);

    // Esta función CIERRA el menú (útil al hacer clic en un link).
    const closeMobileMenu = () => setIsOpen(false);

    // Componente interno para los links de redes sociales (para no repetir código)
    const SocialLinks = ({ className }) => (
        <div className={className}>
            <a
                href="https://github.com/alexisTobar" // <-- ¡TU GITHUB!
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLink}
            >
                <FaGithub />
            </a>
            <a
                href="https://linkedin.com/in/tu-usuario" // <-- ¡TU LINKEDIN!
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLink}
            >
                <FaLinkedin />
            </a>
            {/* (Puedes agregar más si quieres) */}
        </div>
    );


    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>

                {/* Tu logo o nombre */}
                <a href="#" className={styles.navLogo} onClick={closeMobileMenu}>
                    Alexis.dev
                </a>

                {/* --- Icono de Menú (Hamburguesa/Cerrar) --- */}
                <div className={styles.menuIcon} onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* --- Menú de Links (Móvil y Desktop) --- */}
                <ul className={isOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>

                    {/* 'onClick={closeMobileMenu}' -> Cierra el menú al hacer clic en un link */}
                    <li className={styles.navItem}>
                        {/* 'href="#proyectos"' -> Esto es un "ancla"
                Hará scroll hacia la sección "Mis Proyectos"
            */}
                        <a href="#proyectos" className={styles.navLink} onClick={closeMobileMenu}>
                            Proyectos
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        {/* 'href="#stack"' -> Ancla para tu Stack */}
                        <a href="#stack" className={styles.navLink} onClick={closeMobileMenu}>
                            Stack
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        {/* 'href="#contacto"' -> Ancla para el futuro Footer */}
                        <a href="#contacto" className={styles.navLink} onClick={closeMobileMenu}>
                            Contacto
                        </a>
                    </li>

                    {/* Links sociales (solo para el menú móvil) */}
                    <li className={styles.navItem}>
                        <SocialLinks className={styles.socialIconsMenu} />
                    </li>
                </ul>

                {/* Links sociales (solo para Desktop) */}
                <SocialLinks className={styles.socialIconsDesktop} />

            </div>
        </nav>
    );
}

export default Navbar;