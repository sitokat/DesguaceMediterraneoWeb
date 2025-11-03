<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xxl flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="logoUrl" class="mr-3 h-8" alt="Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ nombre }}</span>
      </NuxtLink>
      <div class="flex md:order-0 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          id="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
          @click="toggle"
        >
          <span class="sr-only">Abrir menu principal</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div id="navbar-sticky" :class="{'hidden': !isMenuOpen}" class="items-center justify-between w-full md:flex md:w-auto md:order-1">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <!-- Sección Home fija -->
          <li>
            <NuxtLink to="/" #="{ isActive }" @click="toggle">
              <div :class="['transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg w-full', isActive ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-700 dark:text-gray-300',]">
                Home
              </div>
            </NuxtLink>
          </li>

          <!-- Secciones dinámicas desde la base de datos -->
          <li v-for="seccion in updatedSecciones" :key="seccion.id">
            <NuxtLink :to="`/${seccion.ruta}`" #="{ isActive }" @click="toggle">
              <div :class="['transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg w-full', isActive ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-700 dark:text-gray-300',]">
                {{ capitalizeFirstLetter(seccion.nombre) }}
              </div>
            </NuxtLink>
          </li>
          
          <!-- Sección  Tasación y Bajas fija-->
          <li>
            <NuxtLink to="/tasacion-y-bajas" #="{ isActive }" @click="toggle">
              <div :class="['transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg w-full', isActive ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-700 dark:text-gray-300',]">
                Tasación y Bajas
              </div>
            </NuxtLink>
          </li>

          <!-- Sección Contacto fija -->
          <li>
            <NuxtLink to="/contacto" #="{ isActive }" @click="toggle">
              <div :class="['transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg w-full', isActive ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-700 dark:text-gray-300',]">
                Contacto
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue';

// Variables reactivas para controlar el estado del menú y almacenar los datos
const config = useRuntimeConfig();
const isMenuOpen = ref(false);
const secciones = ref([]);
const logoUrl = ref('');
const nombre = ref('');
const infoLegal = ref('');

// Computed para modificar la ruta de 'servicios-express' a 'divorcios-express'
const updatedSecciones = computed(() =>
  secciones.value.map((seccion) => ({
    ...seccion,
    ruta: seccion.ruta === 'servicios-express' ? 'divorcios-express' : seccion.ruta,
  }))
);

// Función para alternar el estado del menú
const toggle = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Cargar datos en el montaje
onBeforeMount(() => {
  obtenerConfiguracionSecciones();
  obtenerDatosFooter();
});

// Obtener configuración de secciones desde la base de datos
async function obtenerConfiguracionSecciones() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getSecciones', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      secciones.value = data
        .filter((seccion) => seccion.estado == 1)
        .map((seccion) => ({
          id: seccion.id,
          nombre: seccion.ruta,
          ruta: seccion.ruta,
        }));
    } else {
      console.error('Error al obtener configuración de secciones.');
    }
  } catch (error) {
    console.error('Error al obtener configuración de secciones:', error);
  }
}

// Obtener datos del footer como logo y título
async function obtenerDatosFooter() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getDatosIdentificacion', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      data.forEach((dato) => {
        if (dato.nombre === 'logo') logoUrl.value = dato.valor;
        if (dato.nombre === 'titulo') nombre.value = dato.valor;
        if (dato.nombre === 'infolegal') infoLegal.value = dato.valor;
      });
    } else {
      console.error('Error al obtener los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de identificación:', error);
  }
}

// Función para capitalizar el primer carácter de un string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<style>
/* Añade los estilos que sean necesarios aquí */
</style>
