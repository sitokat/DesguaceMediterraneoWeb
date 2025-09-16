<template>
  <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
  <div class="m-4 md:m-8 lg:m-12 xl:m-16">
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});

// Para las llamadas
const config = useRuntimeConfig();
// Para las alertas
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700'); // Color por defecto

</script>