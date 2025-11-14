import { useState, useEffect } from 'react';
import axios from 'axios';

// --- 1. IMPORTAMOS TODO ---
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx'; // <-- El Héroe
import ProyectoCard from './components/ProyectoCard/ProyectoCard.jsx';
import Chatbot from './components/Chatbot/Chatbot.jsx';
import Footer from './components/Footer/Footer.jsx';

import styles from './App.module.css';

const API_URL = 'http://127.0.0.1:8000/api/v1/proyectos/';

function App() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setProyectos(response.data);
      })
      .catch(error => {
        console.error('¡Error al traer los datos!', error);
      });
  }, []);

  return (
    <>
      <Navbar />

      {/* 2. PONEMOS EL HERO ANTES DE LOS PROYECTOS */}
      <Hero />

      <main className={styles.container} id="proyectos">
        <h1 className={styles.title}>Mis Proyectos</h1>

        <div className={styles.grid}>
          {proyectos.map(proyecto => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
            />
          ))}
        </div>
      </main>

      <Chatbot />
      <Footer />
    </>
  );
}

export default App;