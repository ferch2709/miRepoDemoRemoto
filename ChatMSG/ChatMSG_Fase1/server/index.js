// ChatMSG_Fase1/server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Permitir que React se conecte

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // URL por defecto de Vite
        methods: ["GET", "POST"]
    }
});

// MEMORIA VOLÁTIL: Se borra si el servidor se reinicia
let messages = [];

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Enviar el historial de mensajes al usuario que se acaba de conectar
    socket.emit('server_history', messages);

    // Escuchar cuando alguien envía un mensaje
    socket.on('client_message', (data) => {
        const newMessage = {
            id: Date.now(),
            user: data.user,
            text: data.text,
            time: new Date().toLocaleTimeString()
        };
        messages.push(newMessage); // Guardar en el array
        io.emit('server_message', newMessage); // Reenviar a TODOS
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(4000, () => {
    console.log('🚀 Fase 1: Servidor corriendo en http://localhost:4000');
});