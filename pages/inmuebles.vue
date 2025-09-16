<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-2 md:mb-4 p-2 md:p-4">
      <h1 class="md:hidden text-2xl font-bold">
        Inmuebles en <span v-if="filtro.provincia === ''">todas las provincias</span>
        <span v-else>{{ filtro.provincia }} provincia</span>
      </h1>
      <!-- Botón de filtro en móvil -->
      <button class="md:hidden bg-blue-500 text-white px-4 py-2 rounded flex items-center" @click="toggleFiltros">
        <span v-if="!mostrarFiltros">
          <font-awesome-icon icon="search" class="w-4 h-4 mr-2" />
          Filtrar
        </span>
        <span v-else>
          <font-awesome-icon icon="times" class="w-4 h-4 mr-2" />
          Cerrar
        </span>
      </button>
    </div>

    <div class="flex flex-col md:flex-row flex-grow sm:-mt-6 md:-mt-12">
      <!-- Filtro lateral -->
      <aside :class="{'hidden': !mostrarFiltros && !isDesktop, 'block': mostrarFiltros || isDesktop}" class="w-full md:w-1/4 p-4 bg-gray-100 md:relative z-10">
        <h2 class="text-xl font-bold mb-4">Filtrar</h2>
        <!-- Slider de Rango de Precios -->
        <div class="mt-4">
          <label class="block mb-2 font-medium">
            Rango de precios: {{ formatoPrecio(filtro.precio) }}
          </label>
          <input v-model="filtro.precio" type="range" :min="rangoPrecios.min" :max="rangoPrecios.max" class="w-full" />
        </div>

        <!-- Nuevo filtro de Operación -->
        <div class="mt-4">
          <label class="block mb-2 font-medium">Operación</label>
          <select v-model="filtro.operacion" class="w-full p-2 border rounded" @change="filtrarInmuebles">
            <option value="">Todas</option>
            <option v-for="operacion in operaciones" :key="operacion" :value="operacion">{{ operacion }}</option>
          </select>
        </div>

        <!-- Filtro de Provincia -->
        <div class="mt-4">
          <label class="block mb-2 font-medium">Provincia</label>
          <select v-model="filtro.provincia" class="w-full p-2 border rounded" @change="filtrarInmuebles">
            <option value="">Todas</option>
            <option v-for="provincia in provincias" :key="provincia" :value="provincia">{{ provincia }}</option>
          </select>
        </div>

        <!-- Filtro de Tipo de inmueble -->
        <div class="mt-4">
          <label class="block mb-2 font-medium">Tipo de inmueble</label>
          <select class="w-full p-2 border rounded" v-model="filtro.tipo" @change="filtrarInmuebles">
            <option value="">Todos</option>
            <option v-for="tipo in tiposInmuebles" :key="tipo" :value="tipo">{{ tipo }}</option>
          </select>
        </div>

        <!-- Filtro de Tamaño (m²) -->
        <div class="mt-4">
          <label class="block mb-2 font-medium">Tamaño (m²)</label>
          <div class="flex space-x-2">
            <input v-model="filtro.m2Min" type="number" placeholder="Mín m²" class="w-1/2 p-2 border rounded">
            <input v-model="filtro.m2Max" type="number" placeholder="Máx m²" class="w-1/2 p-2 border rounded">
          </div>
        </div>

        <!-- Filtro de Habitaciones -->
        <div class="mt-4">
          <label class="block mb-2 font-medium">Habitaciones</label>
          <div class="space-y-2">
            <div v-for="habitacion in habitaciones" :key="habitacion" class="flex items-center">
              <input type="checkbox" v-model="filtro.habitaciones" :value="habitacion" class="mr-2">
              <label>{{ habitacion }} hab.</label>
            </div>
          </div>
        </div>

        <button class="mt-6 w-full bg-red-500 text-white p-2 rounded" @click="resetFiltros">Resetear filtros</button>
        <button class="mt-2 w-full md:hidden bg-blue-500 text-white p-2 rounded" @click="toggleFiltros"><span v-if="!mostrarFiltros"><font-awesome-icon icon="search" class="w-4 h-4 mr-2" />Filtrar</span><span v-else><font-awesome-icon icon="times" class="w-4 h-4 mr-2" />Cerrar Filtros</span></button>
      </aside>

      <!-- Lista de inmuebles -->
      <div :class="{'block': mostrarFiltros, 'md:block': true}" class="w-full md:w-3/4 p-4 flex flex-col flex-grow">
        <h1 class="text-2xl font-bold mb-4 hidden md:block">Inmuebles en
          <span v-if="filtro.provincia === ''">todas las provincias</span>
          <span v-else>{{ filtro.provincia }} provincia</span>
        </h1>
        <!-- Selector de ordenación por precio -->
        <div class="flex justify-end mb-4">
          <label class="mr-2 font-medium mt-2">Ordenar por precio:</label>
          <select v-model="filtro.ordenPrecio" class="p-2 border rounded" @change="filtrarInmuebles">
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <!-- Lista de inmuebles -->
        <div v-if="inmueblesPaginados.length === 0" class="flex-grow flex items-center justify-center">
          No hay inmuebles que coincidan con los filtros seleccionados.
        </div>
        <div v-else class="space-y-4 flex-grow">
          <div v-for="inmueble in inmueblesPaginados" :key="inmueble.id" class="flex border rounded-lg overflow-hidden shadow-lg h-72 md:h-60">
            <div class="w-1/3 cursor-pointer relative overflow-hidden" @click="verFichaInmueble(inmueble.id)" @mouseover="iniciarCambioImagen(inmueble.id)" @mouseleave="detenerCambioImagen(inmueble.id)">
              <img v-if="inmueble.imagenActual" :src="inmueble.imagenActual" alt="Imagen de inmueble" class="w-full h-full object-cover transition-opacity duration-500 ease-in-out">
            </div>
            <div class="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 @click="verFichaInmueble(inmueble.id)" class="text-lg font-bold text-blue-800 hover:underline cursor-pointer">
                  {{ inmueble.nombre }}
                  <span class="pl-2 text-sm font-normal text-gray-600">ref. {{ inmueble.id }}</span>
                </h2>
                <div class="text-lg font-bold text-gray-800 mt-1">
                  <span v-if="inmueble.preciorebajado">
                    <span class="line-through text-gray-500">{{ formatoPrecio(inmueble.precio) }}</span>
                    <span class="ml-2 text-red-500">{{ formatoPrecio(inmueble.preciorebajado) }}</span>
                  </span>
                  <span v-else>
                    {{ formatoPrecio(inmueble.precio) }}
                  </span>
                </div>
                <div class="text-gray-700 mt-1 text-sm">
                  {{ inmueble.habitaciones }} hab. | {{ inmueble.m2 }} m²
                </div>
                <div class="text-gray-600 mt-2 text-sm truncate">{{ inmueble.descripcion }}</div>
              </div>
              <div class="flex flex-col items-start mt-2 md:flex-row md:justify-between md:items-end">
  <div class="flex flex-col md:flex-row space-x-2">
    <button @click="verFichaInmueble(inmueble.id)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Ver Inmueble</button>
    <div class="flex space-x-2 mt-2 md:mt-0">
      <a :href="`tel:${telefono}`" class="flex items-center justify-center bg-green-500 text-white w-10 h-10 rounded-full hover:bg-green-700 transition">
        <font-awesome-icon icon="phone" />
      </a>
      <a :href="`https://wa.me/${telefono}?text=${encodeURIComponent('Estoy interesado en el inmueble: ' + inmueble.nombre + ' Referencia: ' + inmueble.id)}`" target="_blank" class="flex items-center justify-center bg-green-500 text-white w-10 h-10 rounded-full hover:bg-green-700 transition">
        <font-awesome-icon :icon="['fab', 'whatsapp']" />
      </a>
      <a :href="`mailto:${correo}?subject=${encodeURIComponent(inmueble.nombre + ' Referencia: ' + inmueble.id)}`" class="flex items-center justify-center bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-700 transition">
        <font-awesome-icon icon="envelope" />
      </a>
    </div>
  </div>
              <div class="text-xs text-gray-500 mt-2 md:mt-0 md:ml-4">
                  Creado: {{ formatoFecha(inmueble.created_at) }} | Modificado: {{ formatoFecha(inmueble.updated_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Controles de Paginación -->
        <div v-if="totalPaginas > 1" class="flex justify-center mt-4">
          <button :disabled="paginaActual === 1" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-l hover:bg-gray-400 hover:text-white" @click="cambiarPagina(paginaActual - 1)">Anterior</button>
          <span class="bg-gray-100 text-gray-700 py-2 px-4">
            Página {{ paginaActual }} de {{ totalPaginas }}
          </span>
          <button :disabled="paginaActual === totalPaginas" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-r hover:bg-gray-400 hover:text-white" @click="cambiarPagina(paginaActual + 1)">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const mostrarFiltros = ref(false);
const isDesktop = ref(false);
const intervalosCambioImagen = ref({});
const telefono = ref('');
const correo = ref('');

// Paginación
const inmueblesPorPagina = ref(6); // Cantidad de inmuebles por página
const paginaActual = ref(1); // Página actual

function updateIsDesktop() {
  isDesktop.value = window.innerWidth >= 768;
}

onBeforeUnmount(() => {
  Object.keys(intervalosCambioImagen.value).forEach(id => {
    clearInterval(intervalosCambioImagen.value[id]);
  });
  window.removeEventListener('resize', updateIsDesktop);
});

onMounted(() => {
  updateIsDesktop();
  window.addEventListener('resize', updateIsDesktop);
  obtenerTelefonoYCorreo();
  if(route.query) {
    filtro.value.tipo = route.query.tipo || '';
    filtro.value.precio = route.query.precio ? Number(route.query.precio) : rangoPrecios.value.max;
    filtro.value.provincia = route.query.provincia || '';
    filtro.value.m2Min = route.query.m2Min || '';
    filtro.value.m2Max = route.query.m2Max || '';
    filtro.value.habitaciones = route.query.habitaciones ? route.query.habitaciones.split(',') : [];
    filtro.value.operacion = route.query.operacion || '';
    filtro.value.ordenPrecio = route.query.ordenPrecio || 'asc';
    paginaActual.value = parseInt(route.query.pagina) || 1;
  }
  inicializarImagenes();
  obtenerInmuebles();
});

const config = useRuntimeConfig();
const inmuebles = ref([]);
const filtro = ref({
  tipo: '',
  precio: 1000000,
  provincia: '',
  m2Min: '',
  m2Max: '',
  habitaciones: [],
  operacion: '',
  ordenPrecio: 'asc'
});
const rangoPrecios = ref({
  min: 0,
  max: 1000000
});
const tiposInmuebles = ref([]);
const provincias = ref([]);
const habitaciones = ref([]);
const operaciones = ref([]);

const formatoPrecio = (precio) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);
};

async function obtenerInmuebles() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getAllInmuebles', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      inmuebles.value = data.map(inmueble => {
        inmueble.fotos = [
          inmueble.foto1,
          inmueble.foto2,
          inmueble.foto3
          // Añadir más fotos si están disponibles
        ].filter(foto => foto);

        inmueble.imagenActual = inmueble.fotos.length > 0 ? inmueble.fotos[0] : '';
        return inmueble;
      });

      tiposInmuebles.value = [...new Set(inmuebles.value.map(inmueble => inmueble.tipo))];
      provincias.value = [...new Set(inmuebles.value.map(inmueble => inmueble.provincia))];
      habitaciones.value = [...new Set(inmuebles.value.map(inmueble => inmueble.habitaciones))].sort((a, b) => a - b);
      operaciones.value = [...new Set(inmuebles.value.map(inmueble => inmueble.operacion))];

      const precios = inmuebles.value.map(inmueble => inmueble.precio);
      rangoPrecios.value.min = Math.min(...precios);
      rangoPrecios.value.max = Math.max(...precios);

      if(!route.query.precio) {
        filtro.value.precio = rangoPrecios.value.max;
      }
    } else {
      console.error('Error al obtener los inmuebles.');
    }
  } catch (error) {
    console.error('Error al obtener los inmuebles:', error);
  }
}

// Computed para obtener los inmuebles de la página actual
const inmueblesPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * inmueblesPorPagina.value;
  const fin = inicio + inmueblesPorPagina.value;
  return inmueblesFiltrados.value.slice(inicio, fin);
});

// Computed para calcular el total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(inmueblesFiltrados.value.length / inmueblesPorPagina.value);
});

// Computed para obtener los inmuebles filtrados y ordenados
const inmueblesFiltrados = computed(() => {
  return inmuebles.value
    .filter(inmueble => {
      const cumpleProvincia = filtro.value.provincia ? inmueble.provincia === filtro.value.provincia : true;
      const cumpleTipo = filtro.value.tipo ? inmueble.tipo === filtro.value.tipo : true;
      const cumplePrecio = inmueble.precio >= rangoPrecios.value.min && inmueble.precio <= (filtro.value.precio + 0.01);
      const cumpleM2Min = filtro.value.m2Min ? inmueble.m2 >= filtro.value.m2Min : true;
      const cumpleM2Max = filtro.value.m2Max ? inmueble.m2 <= filtro.value.m2Max : true;
      const cumpleHabitaciones = filtro.value.habitaciones.length ? filtro.value.habitaciones.includes(inmueble.habitaciones.toString()) : true;
      const cumpleOperacion = filtro.value.operacion ? inmueble.operacion === filtro.value.operacion : true;
      return cumpleProvincia && cumpleTipo && cumplePrecio && cumpleM2Min && cumpleM2Max && cumpleHabitaciones && cumpleOperacion;
    })
    .map(inmueble => {
      if(!inmueble.imagenActual) {
        inmueble.imagenActual = inmueble.fotos.length > 0 ? inmueble.fotos[0] : '';
      }
      return inmueble;
    })
    .sort((a, b) => {
      return filtro.value.ordenPrecio === 'asc' ? a.precio - b.precio : b.precio - a.precio;
    });
});

const resetFiltros = () => {
  filtro.value.tipo = '';
  filtro.value.precio = rangoPrecios.value.max;
  filtro.value.provincia = '';
  filtro.value.m2Min = '';
  filtro.value.m2Max = '';
  filtro.value.habitaciones = [];
  filtro.value.operacion = '';
  filtro.value.ordenPrecio = 'asc';
};

watch([filtro, paginaActual], ([newFiltro, newPagina]) => {
  const query = {
    ...newFiltro,
    habitaciones: newFiltro.habitaciones.join(','),
    pagina: newPagina
  };
  router.replace({ query });
}, { deep: true });

function verFichaInmueble(id) {
  router.push({ name: 'inmueble-id', params: { id }, query: { ...filtro.value, pagina: paginaActual.value, habitaciones: filtro.value.habitaciones.join(',') } });
}

function toggleFiltros() {
  mostrarFiltros.value = !mostrarFiltros.value;
}

const formatoFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

function iniciarCambioImagen(id) {
  const inmueble = inmueblesFiltrados.value.find(i => i.id === id);

  if(!inmueble || !inmueble.fotos || inmueble.fotos.length <= 1) {
    return;
  }

  let indiceImagen = 0;

  indiceImagen = (indiceImagen + 1) % inmueble.fotos.length;
  inmueble.imagenActual = inmueble.fotos[indiceImagen];

  intervalosCambioImagen.value[id] = setInterval(() => {
    indiceImagen = (indiceImagen + 1) % inmueble.fotos.length;
    inmueble.imagenActual = inmueble.fotos[indiceImagen];
  }, 1500);
}

function detenerCambioImagen(id) {
  if(intervalosCambioImagen.value[id]) {
    clearInterval(intervalosCambioImagen.value[id]);
    intervalosCambioImagen.value[id] = null;
    const inmueble = inmueblesFiltrados.value.find(i => i.id === id);
    if(inmueble) {
      inmueble.imagenActual = inmueble.fotos[0];
    }
  }
}

function inicializarImagenes() {
  inmuebles.value.forEach(inmueble => {
    inmueble.fotos = [
      inmueble.foto1,
      inmueble.foto2,
      inmueble.foto3
    ].filter(foto => foto);
    inmueble.imagenActual = inmueble.fotos.length > 0 ? inmueble.fotos[0] : '';
  });
}

async function obtenerTelefonoYCorreo() {
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
        if(dato.nombre === 'telefono') {
          telefono.value = dato.valor;
        }
        if(dato.nombre === 'correo') {
          correo.value = dato.valor;
        }
      });
    } else {
      console.error('Error al obtener los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de identificación:', error);
  }
}

// Función para cambiar de página
function cambiarPagina(nuevaPagina) {
  if(nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.15s ease-in-out;
}

input[type="range"]:hover {
  opacity: 1;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #3f51b5;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #3f51b5;
  cursor: pointer;
  border-radius: 50%;
}

.fade-enter-active, .fade-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0;
}
</style>