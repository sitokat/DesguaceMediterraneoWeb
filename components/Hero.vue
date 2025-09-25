<template>
  <section class="bg-white dark:bg-gray-900 pt-4">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          {{ heroTitle }}
        </h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {{ heroText }}
        </p>
        <NuxtLink to="contacto" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          Ponte en Contacto
        </NuxtLink>
      </div>
      <div v-if="heroImage" class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img :src="heroImage" alt="Hero Image" class="rounded-lg shadow-xl dark:shadow-gray-800">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const heroTitle = ref('');
const heroText = ref('');
const heroImage = ref('');

onMounted(async () => {
  await obtenerHeroConfig();
});

async function obtenerHeroConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getHeroConfig', true);

    const response = await fetch(`${useRuntimeConfig().public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      heroTitle.value = data.titulo || '';
      heroText.value = data.texto || '';
      heroImage.value = data.foto || '';
    } else {
      console.error('Error al obtener la configuración del Hero.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración del Hero:', error);
  }
}
</script>