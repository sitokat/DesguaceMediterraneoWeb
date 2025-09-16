<template>
  <section class="bg-white dark:bg-gray-900 flex items-center justify-center pb-20">
    <div class="text-center pb-20">
      <div class="flex justify-center mb-4">
        <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 class="text-2xl font-bold text-green-700">¡Pago recibido correctamente!</h1>
      <p class="mt-4 text-gray-600">
        Nos pondremos en contacto contigo para concretar los detalles del proceso.
      </p>
      <button @click="goToHome" class="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition">
        Volver al inicio
      </button>
    </div>
  </section>
</template>

<script setup>
const goToHome = () => {
  window.location.href = "/"; // Ruta al inicio
};
</script>