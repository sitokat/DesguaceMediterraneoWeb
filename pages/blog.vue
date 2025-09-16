<template>
  <div class="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-28">
    <div class="relative mx-auto max-w-12xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Descubre nuestros artículos</h2>
        <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
          Descubre nuestras novedades y nuestro método de trabajo...
        </p>
      </div>
      <div class="mx-auto mt-12 grid gap-5 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        <!-- Columna Izquierda: Artículos recomendados -->
        <div class="lg:col-span-3 xl:pr-24">
          <h3 class="text-2xl font-bold text-gray-900 lg:text-left">Artículos recomendados</h3>
          <div class="grid gap-5 mt-6 md:grid-cols-3">
            <div v-for="item in paginatedItemsRecomendados" :key="item.titulo" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <!-- Contenido de la tarjeta -->
              <div class="flex-shrink-0">
                <img class="h-48 w-full object-cover" :src="item.imagen_mini" alt="">
              </div>
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">{{ item.categoria }}</a>
                  </p>
                  <a :href="`/${tituloASlug(item.titulo)}-${item.id}`" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">{{ item.titulo }}</p>
                    <p class="mt-3 text-base text-gray-500">{{ item.resumen }}</p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">{{ item.fotourl }}</span>
                      <img class="h-10 w-10 rounded-full" :src="item.fotourl" alt="">
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">{{ item.autor }}</a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time :datetime="item.fecha">{{ formatearFecha(item.fecha) }}</time>
                      <span aria-hidden="true">·</span>
                      <span>{{ item.readTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Controles de paginación -->
          <div class="mt-8 flex justify-center">
            <button
              @click="currentPage.value--"
              :disabled="currentPage.value === 1"
              class="px-4 py-2 mx-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Anterior
            </button>
            <span class="px-4 py-2 mx-1 text-sm font-medium text-gray-700">
              Página {{ currentPage.value }} de {{ totalPages }}
            </span>
            <button
              @click="currentPage.value++"
              :disabled="currentPage.value === totalPages"
              class="px-4 py-2 mx-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Siguiente
            </button>
          </div>
        </div>
        <!-- Columna Derecha: Artículos destacados -->
        <div class="lg:col-span-3 xl:col-span-1 xl:-ml-14">
          <h3 class="text-2xl font-bold text-gray-900 lg:text-left">Artículos destacados</h3>
          <div class="mt-6">
            <div v-for="item in filteredItemsDestacados.slice(0, 3)" :key="item.titulo" class="flex flex-col md:flex-row overflow-hidden rounded-lg shadow-lg texto-contenedor my-6">
              <!-- Parte de la imagen -->
              <div class="flex-shrink-0 md:w-1/2">
                <img class="h-48 w-full object-cover md:h-full" :src="item.imagen_mini" alt="">
              </div>
              <!-- Contenido de la tarjeta -->
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">{{ item.categoria }}</a>
                  </p>
                  <a :href="`/${tituloASlug(item.titulo)}-${item.id}`" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">{{ item.titulo }}</p>
                    <p class="mt-3 text-base text-gray-500">{{ item.resumen }}</p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">{{ item.fotourl }}</span>
                      <img class="h-10 w-10 rounded-full" :src="item.fotourl" alt="">
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">{{ item.autor }}</a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time :datetime="item.fecha">{{ formatearFecha(item.fecha) }}</time>
                      <span aria-hidden="true">·</span>
                      <span>{{ item.readTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const config = useRuntimeConfig();
const posts = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const paginatedItemsRecomendados = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItemsRecomendados.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredItemsRecomendados.value.length / itemsPerPage);
});

const filteredItemsRecomendados = computed(() => {
  return posts.value.filter(item => item.tipopost === '1');
});

const filteredItemsDestacados = computed(() => {
  return posts.value.filter(item => item.tipopost === '2');
});

onMounted(() => {
  obtenerPost();
});

async function obtenerPost() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getPosts', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      posts.value = data;
    } else {
      console.error('Error al obtener los posts. Recarga la página.');
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
  }
}

function formatearFecha(fecha) {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = meses[fechaObj.getMonth()];
  const año = fechaObj.getFullYear();

  return `${dia} ${mes} ${año}`;
}

function tituloASlug(titulo) {
  return titulo
    .normalize('NFD') // Descompone los caracteres acentuados en sus componentes básicos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .toLowerCase() // Convierte el título a minúsculas
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza cualquier caracter no alfanumérico con un guion
    .replace(/(^-|-$)+/g, ''); // Elimina los guiones del inicio y del final
}
</script>

<style>
.texto-contenedor {
  word-wrap: break-word;
  word-break: break-word;
}
</style>
