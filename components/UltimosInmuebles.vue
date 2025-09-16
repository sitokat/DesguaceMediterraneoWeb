<template>
  <div class="max-w-7xl mx-auto p-4 space-y-4">
    <!-- Título y Botón de búsqueda -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Últimos inmuebles añadidos</h2>
      <button @click="buscarInmuebles" class="bg-blue-500 text-white px-4 py-2 flex items-center hover:bg-blue-600">
        <font-awesome-icon icon="search" class="mr-2" />
        Buscar inmuebles
      </button>
    </div>

    <!-- Carrusel de inmuebles -->
    <div class="relative sm:mb-2">
      <button @click="prevInmueble" class="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 z-10 hover:bg-gray-600 hover:text-white">
        <font-awesome-icon icon="chevron-left" />
      </button>

      <div class="overflow-hidden" :style="{ height: '440px' }">
        <!-- Ajusta la altura aquí -->
        <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(grupo, index) in groupedInmuebles" :key="index" class="min-w-full flex space-x-4">
            <div v-for="inmueble in grupo" :key="inmueble.id" class="w-full md:w-1/3 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div class="cursor-pointer overflow-hidden" @click="verInmueble(inmueble.id)">
                <div class="relative">
                  <img :src="inmueble.foto1" alt="Imagen del inmueble" class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
                  <span v-if="inmueble.operacion === 'Compra'" class="absolute top-4 left-4 text-sm text-orange-600 uppercase font-semibold bg-white p-2">En Venta</span>
                  <span v-else class="absolute top-4 left-4 text-sm text-red-600 uppercase font-semibold bg-white p-2">Oportunidad</span>
                </div>
                <div class="p-4">
                  <h3 class="text-xl font-semibold truncate">{{ inmueble.nombre }}</h3>
                  <p class="text-gray-600 mt-1"><font-awesome-icon icon="map-marker-alt" /> {{ inmueble.provincia }} / {{ inmueble.ciudad }}</p>
                  <!-- Iconos e botones en la misma línea -->
                  <div class="flex items-center space-x-4 text-gray-600 mt-2">
                    <span><font-awesome-icon icon="bed" /> {{ inmueble.habitaciones }} Hab.</span>
                    <span><font-awesome-icon icon="expand" /> {{ inmueble.m2 }} m2</span>
                    <!-- Botones justo después de los iconos -->
                    <button @click.stop="verInmueble(inmueble.id)" class="ml-auto bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
                      Detalles
                    </button>
                    <button @click.stop="buscarInmuebles" class="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600">
                      Todos
                    </button>
                  </div>
                </div>
              </div>
              <!-- Precio centrado en la parte inferior -->
              <div class="border-t p-4 flex justify-center">
                <span class="text-orange-600 text-2xl font-semibold">{{ formatoPrecio(inmueble.precio) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="nextInmueble" class="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 z-10 hover:bg-gray-600 hover:text-white">
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>

    <!-- Texto SEO -->
    <div class="p-4 bg-white rounded-lg shadow-lg mt-8 sm:-mt-12">
      <p class="text-gray-700">
        Bienvenido a nuestra inmobiliaria, su puerta de entrada a las mejores propiedades en la región. Con una vasta experiencia en el sector inmobiliario,
        ofrecemos una amplia gama de inmuebles que se adaptan a todas sus necesidades, ya sea que esté buscando un apartamento moderno en el corazón de la ciudad
        o una casa familiar en un entorno tranquilo y natural. Nos enorgullece brindar un servicio personalizado y profesional para ayudarle a encontrar la propiedad
        de sus sueños. Explore nuestras últimas incorporaciones y descubra por qué somos la elección número uno para encontrar su próximo hogar.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const ultimosInmuebles = ref([]);
const currentIndex = ref(0);
const config = useRuntimeConfig();
const router = useRouter();
const isMobile = ref(false); // Estado para detectar si es móvil

// Detectar el tamaño de la pantalla
onMounted(() => {
  // Este código se ejecutará solo en el cliente
  isMobile.value = window.innerWidth < 768;

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });

  cargarUltimosInmuebles();
});

// Computed para agrupar los inmuebles
const groupedInmuebles = computed(() => {
  const grupos = [];
  const itemsPerGroup = isMobile.value ? 1 : 3; // 1 para móvil, 3 para escritorio
  for (let i = 0; i < ultimosInmuebles.value.length; i += itemsPerGroup) {
    grupos.push(ultimosInmuebles.value.slice(i, i + itemsPerGroup));
  }
  return grupos;
});

// Cargar los últimos inmuebles
async function cargarUltimosInmuebles() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('ultimosInmuebles', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      ultimosInmuebles.value = await response.json();
    } else {
      console.error('Error al obtener los últimos inmuebles.');
    }
  } catch (error) {
    console.error('Error al cargar los últimos inmuebles:', error);
  }
}

// Formatear el precio
const formatoPrecio = (precio) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);
};

// Función para pasar al siguiente grupo de inmuebles
function nextInmueble() {
  if (currentIndex.value < groupedInmuebles.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
}

// Función para regresar al grupo anterior de inmuebles
function prevInmueble() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = groupedInmuebles.value.length - 1;
  }
}

// Función para ver un inmueble específico
function verInmueble(id) {
  router.push(`/inmueble/${id}`);
}

// Función para buscar inmuebles
function buscarInmuebles() {
  router.push('/inmuebles');
}

onMounted(() => {
  cargarUltimosInmuebles();
});
</script>
