<template>
  <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
  <div class="m-4 md:m-8 lg:m-12 xl:m-16">
    <div class="w-full p-6 bg-white rounded-lg shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Gestión de Posts</h1>
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:scale-110 transition transform duration-300" @click="showModal = true">
          Crear Post <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
    <div class="w-full p-6 bg-white rounded-lg shadow-lg">
      <div class="flex items-center mb-4">
        <input v-model="filtroBusqueda" type="text" placeholder="Buscar posts..." class="border p-2 rounded-full mr-2" />
        <font-awesome-icon icon="search" />
      </div>
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Título
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Categoría
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tipo
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Publicado
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in postsFiltrados" :key="post.id">
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ post.titulo }}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ post.categoria }}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ post.tipopost == 1 ? 'Recomendado' : 'Destacado' }}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ post.publicado == 1 ? 'Publicado' : 'Borrador' }}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <font-awesome-icon icon="edit" class="text-blue-500 hover:text-blue-600 mr-3 cursor-pointer" @click="editarPost(post)" />
              <font-awesome-icon icon="trash-alt" class="text-red-500 hover:text-red-600 cursor-pointer" @click="solicitarConfirmacion(post)" />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Paginación -->
      <div class="flex justify-between items-center py-4">
        <div>
          Mostrar
          <select v-model="filasPorPagina" class="border p-1 rounded-full">
            <option value="10">10</option>
            <option value="25">25</option>
            <option :value="posts.length">Todas</option>
          </select>
          entradas
        </div>
        <div>
          <button class="rounded-full bg-blue-500 p-2 text-white" :disabled="paginaActual === 1" @click="paginaActual = 1">
            <font-awesome-icon icon="angle-double-left" />
          </button>
          <button class="rounded-full bg-blue-500 p-2 text-white mx-1" :disabled="paginaActual === 1" @click="paginaActual--">
            <font-awesome-icon icon="angle-left" />
          </button>
          Página {{ paginaActual }} de {{ totalPaginas }}
          <button class="rounded-full bg-blue-500 p-2 text-white mx-1" :disabled="paginaActual === totalPaginas" @click="paginaActual++">
            <font-awesome-icon icon="angle-right" />
          </button>
          <button class="rounded-full bg-blue-500 p-2 text-white" :disabled="paginaActual === totalPaginas" @click="paginaActual = totalPaginas">
            <font-awesome-icon icon="angle-double-right" />
          </button>
        </div>
      </div>
    </div>
    <!-- Modal para Crear Post -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white rounded p-5 shadow-lg" style="width: 40%;">
          <h2 class="text-xl font-bold text-center mb-4">Nuevo Post</h2>
          <input v-model="tituloPost" type="text" placeholder="Título del post" class="border p-2 w-full rounded mb-4">
          <div class="flex justify-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2" @click="guardarPost">Guardar</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2" @click="showModal = false">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- Modal para Confirmar Eliminación -->
    <transition name="fade">
      <div v-if="showModalConfirmacion" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white rounded p-5 shadow-lg">
          <h2 class="text-xl font-bold text-center mb-4">Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar el post "{{ postAEliminar.titulo }}"?</p>
          <div class="flex justify-center mt-4">
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2">Eliminar</button>
            <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mx-2" @click="showModalConfirmacion = false">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});

const router = useRouter();
const config = useRuntimeConfig();
const filtroBusqueda = ref('');
const paginaActual = ref(1);
const filasPorPagina = ref(10);
const showModal = ref(false);
const showModalConfirmacion = ref(false);
const tituloPost = ref('');
const postAEliminar = ref(null);
const posts = ref([]);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');

const postsFiltrados = computed(() => {
  const filtrado = posts.value.filter(post =>
    post.titulo.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
  );
  const inicio = (paginaActual.value - 1) * filasPorPagina.value;
  const fin = inicio + filasPorPagina.value;
  return filtrado.slice(inicio, fin === 0 ? filtrado.length : fin);
});

const totalPaginas = computed(() => {
  const totalFilas = posts.value.filter(post =>
    post.titulo.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
  ).length;
  return Math.ceil(totalFilas / filasPorPagina.value);
});

async function guardarPost() {
  showModal.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('insertapost', true);
    requestBody.append('titulo', tituloPost.value);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      mensajeAlerta.value = 'Post creado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
      obtenerPosts();
      tituloPost.value = null;
    } else {
      tituloPost.value = null;
      mensajeAlerta.value = 'Error al crear el post. Inténtalo de nuevo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al crear el post:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

function solicitarConfirmacion(post) {
  postAEliminar.value = post;
  showModalConfirmacion.value = true;
}

async function confirmarEliminacion() {
  showModalConfirmacion.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('deletepost', true);
    requestBody.append('id', postAEliminar.value.id);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      mensajeAlerta.value = 'Post eliminado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
      obtenerPosts();
      postAEliminar.value = null;
    } else {
      mensajeAlerta.value = 'Error al eliminar el post. Inténtalo de nuevo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
      postAEliminar.value = null;
    }
  } catch (error) {
    console.log('Error al eliminar el post:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

async function obtenerPosts() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getAllPosts', true);

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
      mensajeAlerta.value = 'Error al obtener los posts. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

function handleClose() {
  mostrarAlerta.value = false;
}

const editarPost = (post) => {
  router.push(`/admin/postedit${post.id}`);
};

onMounted(() => {
  obtenerPosts();
});
</script>