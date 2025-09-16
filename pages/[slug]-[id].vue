<template>
  <div class="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-28">
    <div v-if="post">
      <!--Title-->
      <div class="text-center">
        <p class="text-sm md:text-base text-blue-500 font-bold">{{ formatearFecha(post.fecha) }}<span class="text-gray-900">/</span>{{ post.nombre }}</p>
        <h1 class="font-bold break-normal text-3xl md:text-5xl">{{ post.titulo }}</h1>
      </div>
      <!--Container-->
      <div class="container mx-auto -mt-2">
        <div class="mx-0 sm:mx-6">
          <div class="w-full p-6 md:p-14 text-xl md:text-2xl text-gray-800 leading-normal">
            <!--Post Content-->
            <p class="text-2xl md:text-3xl mb-5">{{ post.resumen }}</p>
            <p class="py-6" v-html="post.contenido"></p>
            <!--/ Post Content-->
          </div>
        </div>
      </div>
      <h2 class="text-center font-bold break-normal text-2xl md:text-4xl">Otros artículos relacionados</h2>
      <div class="container w-full max-w-6xl mx-auto px-2 py-8">
        <div class="flex flex-wrap -mx-2">
          <!-- Bucle v-for para renderizar los posts relacionados -->
          <div v-for="postRelacionado in postsrelacionados" :key="postRelacionado.id" class="w-full md:w-1/3 px-2 pb-12">
            <div class="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
              <a :href="`/${tituloASlug(postRelacionado.titulo)}-${postRelacionado.id}`" class="no-underline hover:no-underline">
                <img :src="postRelacionado.imagen_mini" class="h-48 w-full rounded-t shadow-lg">
                <div class="p-6 h-auto md:h-48">
                  <p class="text-gray-600 text-xs md:text-sm">{{ postRelacionado.categoria }}</p>
                  <div class="font-bold text-xl text-gray-900">{{ postRelacionado.titulo }}</div>
                  <p class="text-gray-800 font-serif text-base mb-5">{{ truncarTexto(postRelacionado.resumen, 150) }}</p>
                </div>
                <div class="flex items-center justify-between inset-x-0 bottom-0 p-6">
                  <img class="w-8 h-8 rounded-full mr-4" :src="postRelacionado.fotourl" alt="Avatar of Author">
                  <p class="text-gray-600 text-xs md:text-sm">{{ postRelacionado.autor }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount, watch } from 'vue';

const route = useRoute();

// Obtiene el parámetro combinado slug-id de la ruta
const slugId = route.params.slug + route.params.id;

// Separa el slug del id
const separatorIndex = slugId.lastIndexOf('-');
const slug = slugId.substring(0, separatorIndex);
const postId = slugId.substring(separatorIndex + 1);

// Resto de datos
const config = useRuntimeConfig();
const post = ref(null);
const postsrelacionados = ref(null);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');

onBeforeMount(() => {
  obtenerPost();
});

watch(post, (newValue, oldValue) => {
  if(newValue) {
    obtenerPostRelacionados();
  }
});

async function obtenerPost() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getPost', true);
    requestBody.append('idpost', postId);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      post.value = data;
      useHead({
        title: post.value.title,
        meta: [
          { name: 'description', content: post.value.description }
        ]
      });
    } else {
      mensajeAlerta.value = 'Error al obtener los posts. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
    mensajeAlerta.value = 'Error al obtener los posts. Recarga la página. Si el problema continua avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function obtenerPostRelacionados() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getPostsRelacionados', true);
    requestBody.append('categoria_id', post.value.categoria_id);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      postsrelacionados.value = data;
    } else {
      mensajeAlerta.value = 'Error al obtener los posts. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
    mensajeAlerta.value = 'Error al obtener los posts. Recarga la página. Si el problema continua avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

function formatearFecha(fecha) {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = meses[fechaObj.getMonth()];
  const año = fechaObj.getFullYear();

  return `${dia} ${mes} ${año}`;
}

const truncarTexto = (texto, longitud) => {
  if(texto.length <= longitud) {
    return texto;
  }
  return texto.substring(0, longitud) + '...';
};

function tituloASlug(titulo) {
  return titulo
    .normalize('NFD') // Descompone los caracteres acentuados en sus componentes básicos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .toLowerCase() // Convierte el título a minúsculas
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza cualquier caracter no alfanumérico con un guion
    .replace(/(^-|-$)+/g, ''); // Elimina los guiones del inicio y del final
}
</script>