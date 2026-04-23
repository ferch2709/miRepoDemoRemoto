// npm install express cors cookie-parser jsonwebtoken 

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import auth from "./src/cookieHttpOnly/auth.js";

const app = express();

// --- CONFIGURACIÓN DE CORS (CORREGIDA) ---
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                
}));

app.use(express.json());
app.use(cookieParser());

const SECRET = "supersupersecreto";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Validación
    if (username === "admin" && password === "12345") {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // false porque estás en localhost (sin HTTPS)
            sameSite: "lax", 
            maxAge: 3600000 // Aumenté esto a 1 hora (estaba en 5 segundos)
        });
        
        return res.json({ message: "Login exitoso" });
    }
    
    return res.status(401).json({ message: "Credenciales invalidas" });
});

app.get("/perfil", auth, (req, res) => {
    res.json({
        message: "Eres un usuario protegido",
        user: req.username
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});