import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// --- CONFIGURACIÓN PARA REDIS ADAPTER ---
// Al usar localhost, tú te conectas a TU servidor y ella al SUYO.
// Redis (Upstash) se encarga de unir ambos servidores por internet.
const SOCKET_URL = `http://localhost:4001`;

// Inicializar socket
const socket = io(SOCKET_URL, { withCredentials: true });

function App() {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Escuchar historial al entrar
    socket.on('server_history', (h) => setChat(h));
    
    // Escuchar nuevos mensajes
    socket.on('server_message', (m) => {
        setChat(prev => [...prev, m]);
    });

    return () => {
        socket.off('server_history');
        socket.off('server_message');
    };
  }, []);

  const handleLogin = async () => {
    if (username) {
      try {
        // Login local para crear la sesión
        await axios.post(`${SOCKET_URL}/login`, 
            { username }, 
            { withCredentials: true }
        );
        setIsLogged(true);
      } catch (err) {
        console.error(err);
        alert("Error: Asegúrate de que tu servidor (node index.js) esté encendido.");
      }
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Enviamos el mensaje a NUESTRO servidor local
      // Nuestro servidor lo subirá a Redis y Redis se lo mandará al servidor del amigo
      socket.emit('client_message', { user: username, text: message });
      setMessage("");
    }
  };

  if (!isLogged) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>Chat Sincronizado por Redis</h1>
        <p style={{ color: 'green' }}>● Conectando a servidor local</p>
        <input 
          placeholder="Tu nombre de usuario..." 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>Entrar al Chat</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Bienvenido, <span style={{ color: 'blue' }}>{username}</span></h2>
      <div style={{ 
        border: '2px solid #ccc', 
        height: '400px', 
        overflowY: 'auto', 
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        {chat.map((m) => (
          <p key={m.id} style={{ margin: '8px 0', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>
            <small style={{ color: '#888' }}>[{m.time}]</small> <b>{m.user}:</b> {m.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: '10px', display: 'flex' }}>
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          style={{ flex: 1, padding: '10px', borderRadius: '5px 0 0 5px', border: '1px solid #ccc' }}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '0 5px 5px 0', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;