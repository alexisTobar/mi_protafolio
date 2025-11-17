// Importa React, Hooks y Axios
import { useState, useEffect } from 'react';
import axios from 'axios';

// --- 1. IMPORTA TODOS TUS COMPONENTES ---
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Proyectos from './components/Proyectos/Proyectos.jsx';
import Stack from './components/Stack/Stack.jsx';
import Footer from './components/Footer/Footer.jsx';
import Chatbot from './components/Chatbot/Chatbot.jsx'; // <-- ¡AQUÍ ESTÁ!

import './App.css'; // (Archivo CSS global, si lo necesitas)

// --- 2. TUS DIRECCIONES DE API ---
// (dentro de App.jsx)
const API_PERFIL_URL = 'https://alexis-backend.onrender.com/api/perfil/';
const API_TECNOLOGIAS_URL = 'https://alexis-backend.onrender.com/api/tecnologias/';
const API_PROYECTOS_URL = 'https://alexis-backend.onrender.com/api/proyectos/';

function App() {
  // --- 3. ESTADOS (sin cambios) ---
  const [perfil, setPerfil] = useState(null);
  const [tecnologias, setTecnologias] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 4. LLAMADA A LA API (sin cambios) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [resPerfil, resTec, resProy] = await Promise.all([
          axios.get(API_PERFIL_URL),
          axios.get(API_TECNOLOGIAS_URL),
          axios.get(API_PROYECTOS_URL)
        ]);

        setPerfil(resPerfil.data[0]);
        setTecnologias(resTec.data);
        setProyectos(resProy.data);

      } catch (error) {
        console.error("¡Error al traer los datos!", error);
        setError("No se pudieron cargar los datos. Revisa que el servidor Django esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // --- 5. EL HTML (ENSAMBLAJE FINAL) ---

  if (loading) {
    return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</h1>
  }

  if (error) {
    return <h1 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</h1>
  }

  return (
    <>
      <Navbar />
      <Hero perfil={perfil} />
      <Proyectos proyectos={proyectos} />
      <Stack tecnologias={tecnologias} />
      <Footer />

      {/* 6. ¡CHATBOT AGREGADO! */}
      {/* Lo ponemos al final de todo para que flote
          encima del Navbar, Footer y todo lo demás.
      */}
      <Chatbot />
    </>
  );
}

export default App;