<script setup>
import { ref } from 'vue'
// 1. Importamos el componente
import PokemonCard from './components/PokemonCard.vue'

// 2. Creamos una lista de datos de ejemplo
const listaPokemon = ref([
  { 
    id: 1, 
    nombre: 'Pikachu', 
    tipo: 'Eléctrico', 
    hp: 35, 
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' 
  },
  { 
    id: 2, 
    nombre: 'Charmander', 
    tipo: 'Fuego', 
    hp: 39, 
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' 
  },
  { 
    id: 3, 
    nombre: 'Bulbasaur', 
    tipo: 'Planta', 
    hp: 45, 
    imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' 
  }
])
</script>

<template>
  <div class="contenedor-principal">
    <h1>Pokédex Simple</h1>
    
    <div class="galeria">
      <!-- 3. Usamos v-for para crear una Card por cada pokemon en la lista -->
      <PokemonCard 
        v-for="poki in listaPokemon" 
        :key="poki.id"
        :nombre="poki.nombre"
        :tipo="poki.tipo"
        :hp="poki.hp"
        :imagen="poki.imagen"
      />
    </div>
  </div>
</template>

<style>
body {
  background-color: #f0f0f0;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.contenedor-principal {
  text-align: center;
  padding: 20px;
}

.galeria {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>