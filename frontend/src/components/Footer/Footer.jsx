// Importa React
import React from 'react';
// Importa los estilos
import styles from './Footer.module.css';
// Importa los iconos de GitHub y LinkedIn (que ya instalamos)
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
    // Obtiene el año actual automáticamente
    const currentYear = new Date().getFullYear();

    return (
        // --- ¡AQUÍ ESTÁ EL ANCLA! ---
        // El 'id="contacto"' coincide con el 'href="#contacto"' del Navbar
        <footer className={styles.footer} id="contacto">

            <h2 className={styles.footerTitle}>Hablemos</h2>
            <p className={styles.footerText}>
                Actualmente estoy buscando nuevas oportunidades.
                Si tienes un proyecto en mente o quieres contactarme,
                no dudes en enviarme un correo.
            </p>

            {/* ¡Personaliza esto con tu email! */}
            <a href="mailto:tobaralexis.89@gmail.com" className={styles.footerEmail}>
                tobaralexis.89@gmail.com
            </a>

            {/* Iconos de Redes Sociales */}
            <div className={styles.socialIcons}>
                <a
                    href="https://github.com/alexisTobar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIconLink}
                >
                    <FaGithub />
                </a>
                <a
                    href="https" // <-- ¡Pon tu link de LinkedIn!
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIconLink}
                >
                    <FaLinkedin />
                </a>
            </div>

            <p className={styles.copyright}>
                © {currentYear} Alexis Tobar. Desarrollado con React y Django.
            </p>
        </footer>
    );
}

export default Footer;