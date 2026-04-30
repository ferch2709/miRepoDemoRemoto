import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Importación de todas las páginas
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Detalles } from './pages/Detalles';
import { Filtrar } from './pages/Filtrar';

// Componente de Barra de Navegación
const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav style={{ 
            padding: '1rem', 
            backgroundColor: '#1a1a1a', 
            color: 'white', 
            display: 'flex', 
            gap: '20px',
            alignItems: 'center',
            borderBottom: '1px solid #333'
        }}>
            <strong style={{ fontSize: '1.2rem', color: '#ffcb05' }}>PokeApp Segura</strong>
            
            {isAuthenticated && (
                <>
                    <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
                    <Link to="/filtrar" style={{ color: 'white', textDecoration: 'none' }}>Buscar/Filtrar</Link>
                    <button 
                        onClick={logout} 
                        style={{ 
                            marginLeft: 'auto', 
                            backgroundColor: '#ff4444', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 15px', 
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </>
            )}
            {!isAuthenticated && (
                <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>Iniciar Sesión</Link>
            )}
        </nav>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white' }}>
                    <Routes>
                        {/* 1. RUTA PÚBLICA */}
                        <Route path="/login" element={<Login />} />

                        {/* 2. RUTAS PROTEGIDAS (Requieren autenticación) */}
                        <Route 
                            path="/home" 
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } 
                        />
                        
                        <Route 
                            path="/detalles/:name" 
                            element={
                                <ProtectedRoute>
                                    <Detalles />
                                </ProtectedRoute>
                            } 
                        />

                        <Route 
                            path="/filtrar" 
                            element={
                                <ProtectedRoute>
                                    <Filtrar />
                                </ProtectedRoute>
                            } 
                        />

                        {/* 3. REDIRECCIÓN POR DEFECTO */}
                        <Route path="*" element={<Navigate to="/home" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;