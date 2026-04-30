import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(user, password);
            // Si el login es exitoso, redirigimos al home
            navigate('/home');
        } catch (err) {
            setError('Credenciales incorrectas. Intenta con admin / 1234');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px' }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Usuario:</label>
                    <input 
                        type="text" 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)} 
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
};