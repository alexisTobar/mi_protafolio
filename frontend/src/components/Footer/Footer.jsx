import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    const currentYear = new Date().getFullYear(); // Obtiene el año actual
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                © {currentYear} Alexis. Todos los derechos reservados.
            </p>
            <p className={styles.footerText}>
                Desarrollado con ❤️ usando React y Django.
            </p>
        </footer>
    );
}

export default Footer;