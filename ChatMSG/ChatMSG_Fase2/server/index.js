const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { RedisStore } = require('connect-redis'); 

const app = express();

// URL de Upstash (Mantenemos tu URL actual)
const REDIS_URL = "rediss://default:gQAAAAAAAcL1AAIgcDIyOWZiMzUwZTg5OWQ0NzJlODU2YWIxYTUwMGI4MjE4ZQ@able-bug-115445.upstash.io:6379";

const pubClient = createClient({ url: REDIS_URL });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    console.log("✅ Conectado a Redis Remoto");
    io.adapter(createAdapter(pubClient, subClient));
}).catch(err => {
    console.error("❌ Error Redis:", err);
});

// --- CAMBIO IMPORTANTE: Permitir cualquier origen para red local ---
app.use(cors({ 
    origin: true, 
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
    store: new RedisStore({ 
        client: pubClient,
        prefix: "sess:" 
    }),
    secret: 'secreto-muy-seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true, 
        secure: false, // Mantener en false porque en red local no suelen usar HTTPS
        sameSite: 'lax', // Ayuda a que la cookie se comparta en red local
        maxAge: 3600000 
    }
}));

const server = http.createServer(app);

// --- CAMBIO IMPORTANTE: CORS en Socket.io ---
const io = new Server(server, { 
    cors: { 
        origin: true, 
        credentials: true,
        methods: ["GET", "POST"]
    } 
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (username) {
        req.session.username = username;
        return res.status(200).send({ message: "OK" });
    }
    res.status(400).send("Usuario requerido");
});

io.on('connection', async (socket) => {
    console.log('Cliente conectado:', socket.id);

    try {
        const history = await pubClient.lRange('chat_shared', 0, -1);
        socket.emit('server_history', history.map(m => JSON.parse(m)));
    } catch (e) { console.error(e); }

    socket.on('client_message', async (data) => {
        const newMessage = { 
            user: data.user, 
            text: data.text, 
            time: new Date().toLocaleTimeString(),
            id: Date.now() 
        };
        await pubClient.rPush('chat_shared', JSON.stringify(newMessage));
        io.emit('server_message', newMessage);
    });
});

// Escuchar en el puerto 4001 y en todas las interfaces de red (0.0.0.0)
server.listen(4001, '0.0.0.0', () => {
    console.log('🚀 Servidor de Chat corriendo en puerto 4001');
    console.log('Si estás en WiFi, usa tu IP local para que tu amigo se conecte.');
});