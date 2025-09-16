<template>
    <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
    <div class="m-4 md:m-8 lg:m-12 xl:m-16">
      <div class="w-full p-6 bg-white rounded-lg shadow-lg mb-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Gestión de Inmuebles</h1>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:scale-110 transition transform duration-300" @click="showModal = true">
            Crear Inmueble <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>
      <div class="w-full p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-center mb-4">
          <input v-model="filtroBusqueda" type="text" placeholder="Buscar inmuebles..." class="border p-2 rounded-full mr-2" />
          <font-awesome-icon icon="search" />
        </div>
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Precio
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inmueble in inmueblesFiltrados" :key="inmueble.id">
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ inmueble.id }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ inmueble.nombre }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ formatCurrency(inmueble.precio) }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ inmueble.publicado == 1 ? 'Publicado' : 'No Publicado' }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <font-awesome-icon icon="edit" class="text-blue-500 hover:text-blue-600 mr-3 cursor-pointer" @click="editarInmueble(inmueble)" />
                <font-awesome-icon icon="trash-alt" class="text-red-500 hover:text-red-600 cursor-pointer" @click="solicitarConfirmacion(inmueble)" />
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
              <option :value="inmuebles.length">Todas</option>
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
      <!-- Modal para Crear Inmueble -->
      <transition name="fade">
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div class="bg-white rounded p-5 shadow-lg" style="width: 40%;">
            <h2 class="text-xl font-bold text-center mb-4">Nuevo Inmueble</h2>
            <!-- Campo para el nombre del inmueble -->
            <label for="nombreInmueble" class="block text-sm font-medium text-gray-700 mb-1">Nombre del Inmueble</label>
            <input v-model="nombreInmueble" id="nombreInmueble" type="text" class="border p-2 w-full rounded mb-4" />
            <!-- Campo para el precio del inmueble -->
            <label for="precioInmueble" class="block text-sm font-medium text-gray-700 mb-1">Precio del Inmueble</label>
            <input v-model="precioInmueble" id="precioInmueble" type="number" class="border p-2 w-full rounded mb-4" />
            <div class="flex justify-center">
              <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2" @click="guardarInmueble">Guardar</button>
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
            <p>¿Estás seguro de que deseas eliminar el inmueble "{{ inmuebleAEliminar.nombre }}"?</p>
            <div class="flex justify-center mt-4">
              <button @click="confirmarEliminacion" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2">Eliminar</button>
              <button @click="showModalConfirmacion = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mx-2">Cancelar</button>
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
const nombreInmueble = ref('');
const precioInmueble = ref(0);
const inmuebleAEliminar = ref(null);
const inmuebles = ref([]);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');

const inmueblesFiltrados = computed(() => {
  const filtrado = inmuebles.value.filter(inmueble =>
    inmueble.nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
  );
  const inicio = (paginaActual.value - 1) * filasPorPagina.value;
  const fin = inicio + filasPorPagina.value;
  return filtrado.slice(inicio, fin === 0 ? filtrado.length : fin);
});

const totalPaginas = computed(() => {
  const totalFilas = inmuebles.value.filter(inmueble =>
    inmueble.nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
  ).length;
  return Math.ceil(totalFilas / filasPorPagina.value);
});

async function guardarInmueble() {
  showModal.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('insertarInmueble', true);
    requestBody.append('nombre', nombreInmueble.value);
    requestBody.append('precio', precioInmueble.value);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      mensajeAlerta.value = 'Inmueble creado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
      obtenerInmuebles();
      nombreInmueble.value = '';
      precioInmueble.value = 0;
    } else {
      mensajeAlerta.value = 'Error al crear el inmueble. Inténtalo de nuevo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al crear el inmueble:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

function solicitarConfirmacion(inmueble) {
  inmuebleAEliminar.value = inmueble;
  showModalConfirmacion.value = true;
}

async function confirmarEliminacion() {
  showModalConfirmacion.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('eliminarInmueble', true);
    requestBody.append('id', inmuebleAEliminar.value.id);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      mensajeAlerta.value = 'Inmueble eliminado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
      obtenerInmuebles();
      inmuebleAEliminar.value = null;
    } else {
      mensajeAlerta.value = 'Error al eliminar el inmueble. Inténtalo de nuevo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al eliminar el inmueble:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

async function obtenerInmuebles() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getAllInmuebles', true);
    requestBody.append('sinpublicar', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      inmuebles.value = data;
    } else {
      mensajeAlerta.value = 'Error al obtener los inmuebles. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los inmuebles:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

function handleClose() {
  mostrarAlerta.value = false;
}

const editarInmueble = (inmueble) => {
  router.push(`/admin/editarinmueble${inmueble.id}`);
};

function formatCurrency(value) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}

onMounted(() => {
  obtenerInmuebles();
});
</script>