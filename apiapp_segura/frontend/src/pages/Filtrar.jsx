import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Filtrar = () => {
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    const buscar = (e) => {
        e.preventDefault();
        if (busqueda) navigate(`/detalles/${busqueda.toLowerCase()}`);
    };

    return (
        <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
            <h2>Buscar Pokémon por nombre</h2>
            <form onSubmit={buscar}>
                <input 
                    type="text" 
                    placeholder="Ej: pikachu, charizard..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: 'none', width: '250px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
                    Buscar
                </button>
            </form>
        </div>
    );
};