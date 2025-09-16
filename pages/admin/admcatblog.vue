<template>
  <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
  <div class="m-4 md:m-8 lg:m-12 xl:m-16">
    <div class="w-full p-6 bg-white rounded-lg shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Gestión de Categorías</h1>
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:scale-110 transition transform duration-300" @click="showModal = true">
          Crear Categoría <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
    <div class="w-full p-6 bg-white rounded-lg shadow-lg">
      <div class="flex items-center mb-4">
        <input v-model="filtroBusqueda" type="text" placeholder="Buscar elementos..." class="border p-2 rounded-full mr-2" />
        <font-awesome-icon icon="search" />
      </div>
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nombre
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categoriasFiltradas" :key="categoria.id">
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ categoria.nombre }}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
              <font-awesome-icon icon="edit" class="text-blue-500 hover:text-blue-600 mr-3 cursor-pointer" @click="editarCategoria(categoria)" />
              <font-awesome-icon icon="trash-alt" class="text-red-500 hover:text-red-600 cursor-pointer" @click="solicitarConfirmacion(categoria)" />
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
            <option :value="categorias.length">Todas</option>
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
    <!-- Modal para Crear Categoría -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white rounded p-5 shadow-lg" style="width: 40%;">
          <h2 class="text-xl font-bold text-center mb-4">Nueva Categoría</h2>
          <input v-model="nombreCategoria" type="text" placeholder="Nombre de la categoría" class="border p-2 w-full rounded mb-4">
          <div class="flex justify-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2" @click="guardarCategoria">Guardar</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2" @click="showModal = false">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- Modal para Editar Categoría -->
    <transition name="fade">
      <div v-if="showModal2" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white rounded p-5 shadow-lg" style="width: 40%;">
          <h2 class="text-xl font-bold text-center mb-4">Editar Categoría</h2>
          <input v-model="editarNombreCategoria.nombre" type="text" placeholder="Nombre de la categoría" class="border p-2 w-full rounded mb-4">
          <div class="flex justify-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2" @click="actualizarCategoria">Guardar</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2" @click="showModal2 = false">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- Modal para Eliminar Categoría -->
    <transition name="fade">
      <div v-if="showModalConfirmacion" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white rounded p-5 shadow-lg">
          <h2 class="text-xl font-bold text-center mb-4">Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar la categoría "{{ categoriaAEliminar.nombre }}"?</p>
          <div class="flex justify-center mt-4">
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2" @click="confirmarEliminacion">Eliminar</button>
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

// Para las llamadas
const config = useRuntimeConfig();
// Para la tabla
const filtroBusqueda = ref('');
const paginaActual = ref(1);
const filasPorPagina = ref(10);
// Para los modales
const showModal = ref(false);
const showModal2 = ref(false);
const showModalConfirmacion = ref(false);
// Para las acciones
const nombreCategoria = ref();
const editarNombreCategoria = ref([]);
const categorias = ref([]);
const categoriaAEliminar = ref(null);
// Para las alertas
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700'); // Color por defecto

const categoriasFiltradas = computed(() => {
  // Filtro de búsqueda
  const filtrado = categorias.value.filter(categoria =>
    categoria.nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
  );
  // Cálculo de la paginación
  const inicio = (paginaActual.value - 1) * filasPorPagina.value;
  const fin = inicio + filasPorPagina.value;
  return filtrado.slice(inicio, fin === 0 ? filtrado.length : fin);
});

const totalPaginas = computed(() => {
  const totalFilas = categorias.value.filter(categoria =>
    categoria.nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
  ).length;
  return Math.ceil(totalFilas / filasPorPagina.value);
});

async function actualizarCategoria() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updatecategoria', true);
    requestBody.append('id', editarNombreCategoria.value.id);
    requestBody.append('nombre', editarNombreCategoria.value.nombre);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      //  Si la insercion funciona
      obtenerCategorias();
      showModal2.value = false;
      mensajeAlerta.value = 'Actualización realizada correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
    } else {
      // Manejar errores si la respuesta no es OK
      showModal2.value = false;
      mensajeAlerta.value = 'Ha ocurrido un error, vuelve a intentarlo. Si el problema persiste contacta con soporte.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700'; // Rojo para error
    }
  } catch (error) {
    console.error('Error al insertar las categorías:', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

function editarCategoria(categoria) {
  showModal2.value = true;
  editarNombreCategoria.value = { ...categoria };
}

function solicitarConfirmacion(categoria) {
  categoriaAEliminar.value = categoria;
  showModalConfirmacion.value = true;
}

async function confirmarEliminacion() {
  showModalConfirmacion.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('deletecategoria', true);
    requestBody.append('id', categoriaAEliminar.value.id);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      if(data == '0') {
        mensajeAlerta.value = 'No se puede eliminar la categoría, existen POST que la contienen, cambia la categoría de los POST existentes antes de continuar.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-red-100 border-red-400 text-red-700'; // Rojo para error
        categoriaAEliminar.value = null;
      } else {
        //  Si la eliminación
        mensajeAlerta.value = 'Categoría eliminada correctamente.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
        obtenerCategorias();
        categoriaAEliminar.value = null;
      }
    } else {
      // Manejar errores si la respuesta no es OK
      mensajeAlerta.value = 'Ha ocurrido un error, vuelve a intentarlo. Si el problema persiste contacta con soporte.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700'; // Rojo para error
      categoriaAEliminar.value = null;
    }
  } catch (error) {
    console.log('Error al eliminar categorias');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2500); // El alerta se ocultará después de 2.5 segundos
};

async function guardarCategoria() {
  // Lógica de guardar
  showModal.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('insertacategoria', true);
    requestBody.append('nombre', nombreCategoria.value);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      //  Si la insercion funciona
      mensajeAlerta.value = 'Categoría creada correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
      obtenerCategorias();
      nombreCategoria.value = null;
    } else {
      // Manejar errores si la respuesta no es OK
      nombreCategoria.value = null;
      mensajeAlerta.value = 'Ha ocurrido un error, vuelve a intentarlo. Si el problema persiste contacta con soporte.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700'; // Rojo para error
    }
  } catch (error) {
    console.log('Error al crear categoria');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
};

async function obtenerCategorias() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getCategorias', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      categorias.value = data;
    } else {
      // Manejar errores si la respuesta no es OK
      mensajeAlerta.value = 'Ha ocurrido un error, recarga la página. Si el problema persiste contacta con soporte.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700'; // Rojo para error
    }
  } catch (error) {
    console.log('Error al obtener categorias;')
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

function handleClose() {
  mostrarAlerta.value = false;
}

onMounted(() => {
  obtenerCategorias();
});
</script>