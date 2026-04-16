import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonGroups, setPokemonGroups] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // 1. Pedimos una lista de 20 pokemones
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data = await response.json()

        // 2. Pedimos los detalles de cada uno (para tener su imagen y tipo)
        const detailedPromises = data.results.map(p => fetch(p.url).then(res => res.json()))
        const allStats = await Promise.all(detailedPromises)

        // 3. Los agrupamos por su tipo principal
        const groups = allStats.reduce((acc, pokemon) => {
          const type = pokemon.types[0].type.name
          if (!acc[type]) acc[type] = []
          acc[type].push(pokemon)
          return acc
        }, {})

        setPokemonGroups(groups)
        setLoading(false)
      } catch (error) {
        console.error("Error cargando pokemones", error)
      }
    }

    fetchPokemons()
  }, [])

  if (loading) return <div className="loader">Cargando Pokédex...</div>

  return (
    <div className="pokedex-container">
      <h1 className="title">Mi Pokédex</h1>
      
      {Object.entries(pokemonGroups).map(([type, pokemons]) => (
        <section key={type} className="type-section">
          <h2 className={`type-title ${type}`}>{type}</h2>
          <div className="grid">
            {pokemons.map(p => (
              <div key={p.id} className="card">
                <div className="id-tag">#{p.id}</div>
                <img 
                  src={p.sprites.other['official-artwork'].front_default} 
                  alt={p.name} 
                />
                <h3 className="name">{p.name}</h3>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default App