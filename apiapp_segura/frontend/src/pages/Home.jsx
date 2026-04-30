import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Creamos una petición que ignora las cookies para que PokeApi no se queje
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=50', { withCredentials: false })
            .then(res => {
                setPokemons(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error detallado:", err);
                setError("No se pudo conectar con la PokeApi. Revisa tu conexión a internet.");
                setLoading(false);
            });
    }, []);

    if (loading) return <h3 style={{ textAlign: 'center', color: 'white' }}>Cargando Pokémon...</h3>;
    if (error) return <h3 style={{ color: 'red', textAlign: 'center' }}>{error}</h3>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: 'white' }}>Pokémon List</h1>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                gap: '15px' 
            }}>
                {pokemons.map((p) => (
                    <div key={p.name} style={{ 
                        border: '1px solid #444', 
                        padding: '15px', 
                        textAlign: 'center', 
                        borderRadius: '12px',
                        backgroundColor: '#1e1e1e',
                        color: 'white'
                    }}>
                        <p style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{p.name}</p>
                        <Link to={`/detalles/${p.name}`} style={{ color: '#3498db', textDecoration: 'none' }}>
                            Ver detalles
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};