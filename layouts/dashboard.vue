<template>
  <div class="flex bg-gray-100">
    <!-- Sidebar se recargará cuando showSidebar cambie -->
    <Sidebar v-if="showSidebar" />
    <div class="flex-1">
      <!-- Escuchar el evento configuracionGuardada emitido por NuxtPage -->
      <NuxtPage @configuracionGuardada="recargarSidebar" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '~/components/Sidebar.vue';

const showSidebar = ref(true);

const recargarSidebar = () => {
  // Ocultar temporalmente el Sidebar para forzar la recarga
  showSidebar.value = false;

  // Volver a mostrar el Sidebar después de un pequeño retraso
  setTimeout(() => {
    showSidebar.value = true;
  }, 100); // Ajusta este tiempo si es necesario
};
</script>