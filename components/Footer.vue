<template>
  <footer class="p-4 bg-slate-200 sm:p-6 dark:bg-gray-800">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="/" class="flex items-center">
            <img :src="logoUrl" class="mr-3 h-8" alt="nombre" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ nombre }}</span>
          </a>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Recursos</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="#" class="hover:underline">Tipo 1</a>
              </li>
              <li>
                <a href="#" class="hover:underline">Tipo 2</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Síguenos</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li v-for="social in socialLinks" :key="social.id" class="flex items-center mb-4">
                <!-- Renderizar el icono -->
                <span class="mr-2" v-html="social.icono"></span>
                <!-- Mostrar el nombre de la red social -->
                <a :href="social.url" target="_blank" class="hover:underline">{{ social.nombre }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-2">
                <NuxtLink to="/cookie" class="hover:underline">Cookies</NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink to="/privacy" class="hover:underline">Términos Legales</NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink to="/politica-privacidad" class="hover:underline">Política de Privacidad</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/condiciones-compra" class="hover:underline">Condiciones de Compra</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ currentYear }} <a href="/" class="hover:underline">{{ nombre }}</a>. {{ infoLegal }}</span>
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a v-for="social in socialLinks" :key="social.id" :href="social.url" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" v-html="social.icono"></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig();
const logoUrl = ref('');
const nombre = ref('');
const infoLegal = ref('');
const socialLinks = ref([]); // Arreglo para almacenar las redes sociales
const currentYear = new Date().getFullYear();

onMounted(() => {
  obtenerDatosFooter();
  obtenerRedesSociales();
});

async function obtenerDatosFooter() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getDatosIdentificacion', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      data.forEach(dato => {
        if(dato.nombre === 'logo') logoUrl.value = dato.valor;
        if(dato.nombre === 'titulo') nombre.value = dato.valor;
        if(dato.nombre === 'infolegal') infoLegal.value = dato.valor;
      });
    } else {
      console.error('Error al obtener los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de identificación:', error);
  }
}

async function obtenerRedesSociales() {
  try {
    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: new URLSearchParams({ getSocialLinks: true }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      socialLinks.value = await response.json();
    } else {
      console.error('Error al obtener las redes sociales.');
    }
  } catch (error) {
    console.error('Error al obtener las redes sociales:', error);
  }
}
</script>