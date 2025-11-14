import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Tu logo o nombre */}
                <a href="/" className={styles.navLogo}>Alexis.dev</a>

                {/* Links de navegación */}
                <ul className={styles.navMenu}>
                    <li className={styles.navItem}>
                        <a href="#proyectos" className={styles.navLink}>Proyectos</a>
                    </li>
                    <li className={styles.navItem}>
                        {/* Reemplaza con tu link de LinkedIn */}
                        <a href="https://www.linkedin.com/in/alexistobarsalazar/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>LinkedIn</a>
                    </li>
                    <li className={styles.navItem}>
                        {/* Reemplaza con tu link de GitHub */}
                        <a href="https://github.com/alexisTobar" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;