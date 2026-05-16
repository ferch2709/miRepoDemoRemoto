<script setup>
// Definimos las "props" (propiedades) que el componente recibirá desde afuera
defineProps({
  nombre: String,
  tipo: String,
  imagen: String,
  hp: Number
})
</script>

<template>
  <div class="card">
    <img :src="imagen" :alt="nombre" class="pokemon-img" />
    <div class="info">
      <span class="tipo-etiqueta">{{ tipo }}</span>
      <h2>{{ nombre }}</h2>
      <div class="stats">
        <span><strong>HP:</strong> {{ hp }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
  border: 1px solid #eee;
  margin: 10px;
  display: inline-block;
}

.card:hover {
  transform: translateY(-10px);
}

.pokemon-img {
  width: 100%;
  background-color: #f2f2f2;
  padding: 10px;
  box-sizing: border-box;
}

.info {
  padding: 15px;
}

.tipo-etiqueta {
  background: #42b883;
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  text-transform: uppercase;
}

h2 {
  margin: 10px 0;
  text-transform: capitalize;
  font-size: 1.4rem;
}

.stats {
  color: #666;
  font-size: 0.9rem;
}
</style>