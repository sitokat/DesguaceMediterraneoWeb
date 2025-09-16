<template>
  <section class="bg-white dark:bg-gray-900 flex items-center justify-center pb-20">
    <div class="text-center pb-20">
      <div class="flex justify-center mb-4">
        <div class="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <h1 class="text-2xl font-bold text-red-700">¡Error al procesar el pago!</h1>
      <p class="mt-4 text-gray-600">
        Hemos tenido un problema al procesar el pago. Vuelve a intentarlo o ponte en contacto con nosotros para resolver el problema.
      </p>
      <button @click="retryPayment" class="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition">
        Reintentar pago
      </button>
    </div>
  </section>
</template>

<script setup>
const retryPayment = () => {
  window.location.href = "/divorcios-express"; // Ruta para reintentar el pago
};
</script>  