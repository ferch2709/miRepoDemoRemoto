import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const Detalles = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Agregamos { withCredentials: false } para evitar problemas de CORS con PokeApi
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, { withCredentials: false })
            .then(res => setPokemon(res.data))
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }, [name]);

    if (error) return <p style={{color: 'white'}}>Error al cargar el Pokémon.</p>;
    if (!pokemon) return <p style={{color: 'white'}}>Cargando información...</p>;

    return (
        <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
            <Link to="/home" style={{ color: '#3498db' }}>← Volver al listado</Link>
            <h1 style={{ textTransform: 'capitalize', fontSize: '3rem' }}>{pokemon.name}</h1>
            
            <img 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                alt={pokemon.name} 
                style={{ width: '250px', backgroundColor: '#333', borderRadius: '50%' }} 
            />
            
            <div style={{ marginTop: '20px', display: 'inline-block', textAlign: 'left', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '15px' }}>
                <h3>Estadísticas base:</h3>
                <ul>
                    {pokemon.stats.map(s => (
                        <li key={s.stat.name} style={{ textTransform: 'capitalize' }}>
                            {s.stat.name}: <strong>{s.base_stat}</strong>
                        </li>
                    ))}
                </ul>
                <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            </div>
        </div>
    );
};