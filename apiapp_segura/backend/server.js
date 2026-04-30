const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu React (Vite)
    credentials: true
}));

// Login: Setea la cookie HttpOnly
app.post('/api/login', (req, res) => {
    const { user, password } = req.body;

    if (user === 'admin' && password === '1234') {
        res.cookie('session_token', 'token_seguro_xyz', {
            httpOnly: true,    // No accesible por JS
            secure: false,      // En producción debe ser true (HTTPS)
            sameSite: 'lax',
            maxAge: 3600000    // 1 hora
        });
        return res.json({ message: 'Login exitoso' });
    }
    res.status(401).json({ message: 'Credenciales inválidas' });
});

// Verificar sesión
app.get('/api/check-auth', (req, res) => {
    if (req.cookies.session_token) {
        return res.json({ authenticated: true });
    }
    res.status(401).json({ authenticated: false });
});

// Logout
app.post('/api/logout', (req, res) => {
    res.clearCookie('session_token');
    res.json({ message: 'Sesión cerrada' });
});

app.listen(4000, () => console.log('Servidor corriendo en puerto 4000'));