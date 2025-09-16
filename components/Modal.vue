<template>
  <transition enter-active-class="ease-out duration-300" leave-active-class="ease-in duration-200">
    <div v-if="show" class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-black opacity-50"></div>

        <div class="bg-white rounded-lg overflow-hidden max-w-md mx-auto p-6 z-50">
          <!-- Contenido del modal -->
          <div class="text-center">
            <h2 class="text-xl font-bold mb-4">Confirmación</h2>
            <p class="mb-4">{{ message }}</p> <!-- Mostrar el mensaje dinámico -->
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" @click="$emit('close', 'cerrar')">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  message: {
    type: String,
    default: 'El mensaje se ha enviado correctamente' // Mensaje por defecto
  }
});

// Declaración de eventos emitidos
const emits = defineEmits(['close']);
</script>
