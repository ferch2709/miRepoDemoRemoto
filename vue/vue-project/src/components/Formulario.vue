<script setup>
import { ref } from 'vue'

// Creamos variables reactivas para capturar los datos
const nombre = ref('')
const correo = ref('')
</script>

<template>
  <div class="contenedor-formulario">
    <h2>Captura de Datos</h2>
    
    <!-- El v-model conecta el input con la variable de arriba -->
    <div class="grupo">
      <label>Nombre:</label>
      <input v-model="nombre" type="text" placeholder="Escribe tu nombre" />
    </div>

    <div class="grupo">
      <label>Correo electrónico:</label>
      <input v-model="correo" type="email" placeholder="ejemplo@correo.com" />
    </div>

    <hr />

    <!-- Mostramos los valores en tiempo real -->
    <div class="resultado" v-if="nombre || correo">
      <h3>Datos capturados:</h3>
      <p><strong>Nombre:</strong> {{ nombre }}</p>
      <p><strong>Correo:</strong> {{ correo }}</p>
    </div>
  </div>
</template>

<style scoped>
.contenedor-formulario {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
}
.grupo {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.resultado {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
hr {
  margin: 20px 0;
}
</style>