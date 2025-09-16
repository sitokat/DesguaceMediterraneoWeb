<template>
  <div v-if="mostrar" :class="`fixed ml-4 md:ml-8 lg:ml-12 xl:ml-16 py-3 pr-12 pl-4 mt-2 z-50 rounded ${color}`" role="alert">
    <span class="block sm:inline">{{ mensaje }}</span>
    <span class="absolute top-2 bottom-0 right-2 px-4 py-1" @click="$emit('close')">
      <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Cerrar</title><path d="M14.348 14.859l-4.179-4.179 4.179-4.179c0.527-0.527 0.527-1.381 0-1.908s-1.381-0.527-1.908 0l-4.179 4.179-4.179-4.179c-0.527-0.527-1.381-0.527-1.908 0s-0.527 1.381 0 1.908l4.179 4.179-4.179 4.179c-0.527 0.527-0.527 1.381 0 1.908 0.527 0.527 1.381 0.527 1.908 0l4.179-4.179 4.179 4.179c0.527 0.527 1.381 0.527 1.908 0s0.527-1.381 0-1.908z" /></svg>
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  mensaje: {
    type: String,
    default: ''
  },
  mostrar: Boolean,
  color: {
    type: String,
    default: 'bg-blue-100 border-blue-400 text-blue-700' // Color por defecto
  }
});

const emits = defineEmits(['close']);
</script>