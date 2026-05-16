import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('server_history', (history) => setChat(history));
    socket.on('server_message', (msg) => setChat((prev) => [...prev, msg]));
    return () => socket.off();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('client_message', { user: username, text: message });
      setMessage("");
    }
  };

  if (!isLogged) {
    return (
      <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>Chat Fase 1: Memoria</h2>
        <input placeholder="Tu nombre..." onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => username && setIsLogged(true)}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Chat de {username}</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'auto', padding: '10px', background: '#f0f0f0' }}>
        {chat.map((m) => (
          <p key={m.id}><strong>{m.user}:</strong> {m.text} <small>({m.time})</small></p>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: '10px' }}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje..." />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;