<template>
  <div class="max-w-7xl mx-auto p-4 px-10 space-y-4 mb-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Columna Principal (2/3) -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Imagen y detalles del inmueble -->
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 w-full">
            <h1 class="text-2xl font-bold">{{ inmueble.nombre }}</h1>
            <p class="text-sm text-gray-500 mt-2">
              {{ inmueble.provincia || 'N/A' }} / {{ inmueble.ciudad || 'N/A' }} 
              <a v-if="inmueble.latitud && inmueble.longitud"
                 :href="`https://www.google.com/maps?q=${inmueble.latitud},${inmueble.longitud}`"
                 target="_blank"
                 class="text-blue-600 hover:underline">
                Ver mapa
              </a>
            </p>
            <div class="text-3xl font-bold mt-4">
  <span v-if="inmueble.preciorebajado" class="text-red-500">
    {{ formatoPrecio(inmueble.preciorebajado) }}
  </span>
  <span v-if="inmueble.preciorebajado" class="text-gray-500 line-through text-xl ml-2 block md:inline">
    {{ formatoPrecio(inmueble.precio) }}
  </span>
  <span v-else class="text-gray-800">
    {{ formatoPrecio(inmueble.precio) }}
  </span>
</div>
            <div class="mt-4 grid grid-cols-2 gap-4 text-gray-600">
              <div>{{ inmueble.m2 }} m²</div>
              <div>{{ inmueble.habitaciones }} hab.</div>
              <div class="flex space-x-2">
                <a :href="`tel:${telefono}`" class="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition flex items-center justify-center w-10 h-10">
                  <font-awesome-icon icon="phone" />
                </a>
                <a :href="`https://wa.me/${telefono}?text=${encodeURIComponent('Estoy interesado en el inmueble: ' + inmueble.nombre + ' Referencia: ' + inmueble.id)}`" target="_blank" class="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition flex items-center justify-center w-10 h-10">
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </a>
                <a :href="`mailto:${correo}?subject=${encodeURIComponent(inmueble.nombre + ' Referencia: ' + inmueble.id)}`" class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center w-10 h-10">
                  <font-awesome-icon icon="envelope" />
                </a>
                <a v-if="inmueble.latitud && inmueble.longitud" 
                   :href="`https://www.google.com/maps?q=${inmueble.latitud},${inmueble.longitud}`" 
                   target="_blank" 
                   class="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center w-10 h-10">
                  <font-awesome-icon icon="map-marker-alt" />
                </a>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 w-full mt-4 md:mt-0">
            <img :src="inmueble.foto1" alt="Imagen de inmueble" class="w-full h-auto object-contain rounded-lg shadow-lg max-h-80" />
          </div>
        </div>
      </div>

      <!-- Descripción del Inmueble -->
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4">Descripción del Inmueble</h2>
        <p>{{ inmueble.descripcion }}</p>
      </div>

      <!-- Galería de Imágenes -->
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4">Fotos del Inmueble</h2>
        <p class="text-sm text-gray-600 mb-4">Galería de imágenes del inmueble, pulsa la imagen para ampliar.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="foto in fotos" :key="foto.url" @click="abrirImagen(foto.url)" class="relative cursor-pointer transform transition-transform duration-200 hover:scale-110">
            <img :src="foto.url" alt="Foto del inmueble" class="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>

    <!-- Columna Derecha (1/3): Contacto e información del agente -->
    <div class="space-y-4">
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h2 class="text-lg font-bold mb-4">Pregunta al anunciante</h2>
        <textarea v-model="mensaje" placeholder="Hola, me interesa este piso y me gustaría hacer una visita. Un saludo" rows="4" class="w-full p-3 border rounded-lg"></textarea>
        <p v-if="!mensajeValid && mostrarCampos" class="text-orange-600 mt-1">⚠️ Este campo es obligatorio</p>
        <button v-if="!mostrarCampos" class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold w-full" @click="mostrarCampos = true">
          Enviar mensaje
        </button>
      </div>

      <!-- Campos adicionales -->
      <div v-if="mostrarCampos" class="bg-white p-4 rounded-lg shadow-lg space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Tu email</label>
          <input v-model="email" type="email" id="email" class="w-full border-2 rounded-md p-2 mt-1 focus:outline-none focus:border-orange-500" required />
          <p v-if="!emailValid" class="text-orange-600 mt-1">⚠️ Indica un email o teléfono para que te puedan contestar ;-)</p>
        </div>

        <div class="flex space-x-4">
          <div class="w-1/2">
            <label for="telefono" class="block text-sm font-medium text-gray-700">Tu teléfono</label>
            <div class="flex">
              <input v-model="telefonovisitante" type="tel" id="telefono" class="w-full border-2 rounded-md p-2 mt-1 focus:outline-none focus:border-orange-500" required />
            </div>
            <p v-if="!telefonoValid" class="text-orange-600 mt-1">⚠️ Indica un email o teléfono para que te puedan contestar ;-)</p>
          </div>
          <div class="w-1/2">
            <label for="nombre" class="block text-sm font-medium text-gray-700">Tu nombre</label>
            <input v-model="nombre" type="text" id="nombre" class="w-full border-2 rounded-md p-2 mt-1 focus:outline-none focus:border-orange-500" required />
            <p v-if="!nombreValid" class="text-orange-600 mt-1">⚠️ Esto no parece un nombre</p>
          </div>
        </div>

        <div>
          <p v-if="!politicaPrivacidad" class="text-orange-600 mt-1">⚠️ Para contactar debes aceptar la política de privacidad</p>
          <label class="flex items-center mt-2">
            <input type="checkbox" class="form-checkbox" v-model="politicaPrivacidad" />
            <span class="ml-2">Aceptar <a href="/privacy" target="_blank" class="text-blue-600 hover:underline">política de privacidad</a></span>
          </label>
        </div>

        <!-- Mover el botón Enviar mensaje debajo de los campos adicionales -->
        <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold w-full" @click="enviarMensaje">
          Enviar mensaje
        </button>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h2 class="text-lg font-bold mb-4">Información del contacto</h2>
        <p class="text-sm text-gray-700"><strong>Teléfono:</strong> {{ telefono }}</p>
        <p class="text-sm text-gray-700"><strong>Referencia del anuncio:</strong> {{ inmueble.id }}</p>
        <p class="text-sm text-gray-700"><strong>Profesional:</strong> {{ tituloPagina }}</p>
        <div class="mt-4">
          <img :src="logoUrl" alt="Logo de la inmobiliaria" class="w-1/2 h-auto rounded-lg shadow-lg mx-auto" />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para imagen grande -->
  <div v-if="imagenGrande" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="cerrarImagen">
    <div class="relative">
      <img :src="imagenGrande" alt="Imagen grande" class="max-w-full max-h-full rounded-lg" />
      <button @click="cerrarImagen" class="absolute top-2 right-2 text-white text-3xl font-bold">&times;</button>
    </div>
  </div>

  <!-- Modal de confirmación -->
  <Modal :show="modalVisible" @close="modalVisible = false" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const inmueble = ref({});
const fotos = ref([]);
const imagenGrande = ref(null);
const config = useRuntimeConfig();
const telefono = ref('');
const telefonovisitante = ref('');
const correo = ref('');
const tituloPagina = ref('');  // Título de la página en cabecera y footer
const logoUrl = ref('');       // URL del logo de la inmobiliaria

const mostrarCampos = ref(false);
const email = ref('');
const nombre = ref('');
const mensaje = ref('');
const politicaPrivacidad = ref(false);
const modalVisible = ref(false);  // Control de la visibilidad del modal

const emailValid = computed(() => email.value.includes('@'));
const telefonoValid = computed(() => telefonovisitante.value.length > 0);
const nombreValid = computed(() => nombre.value.length > 1 && isNaN(nombre.value));
const mensajeValid = computed(() => mensaje.value.length > 0);
const formularioValido = computed(() => emailValid.value && telefonoValid.value && nombreValid.value && politicaPrivacidad.value);

// Función para obtener los datos del inmueble
async function obtenerInmueble() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getInmueble', true);
    requestBody.append('idinmueble', route.params.id);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      inmueble.value = data.inmueble;
      fotos.value = data.fotos;
    } else {
      console.error('Error al obtener el inmueble.');
    }
  } catch (error) {
    console.error('Error al obtener el inmueble:', error);
  }
}

// Función para obtener los datos de contacto
async function obtenerTelefonoYDatos() {
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

    if (response.ok) {
      const data = await response.json();
      data.forEach(dato => {
        if (dato.nombre === 'telefono') telefono.value = dato.valor;
        if (dato.nombre === 'correo') correo.value = dato.valor;
        if (dato.nombre === 'titulo') tituloPagina.value = dato.valor;
        if (dato.nombre === 'logo') logoUrl.value = dato.valor;
      });
    } else {
      console.error('Error al obtener los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de identificación:', error);
  }
}

const formatoPrecio = (precio) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);
};

// Función para manejar el envío del mensaje
async function enviarMensaje() {
  if (formularioValido.value) {
    console.log("Formulario válido. Procesando el envío del mensaje...");

    // Crear un único mensaje concatenando todos los campos del formulario
    const mensajeFinal = `
      Nombre: ${nombre.value}\n
      Teléfono: ${telefonovisitante.value}\n
      Mensaje: ${mensaje.value}
    `;

    try {
      // Enviar los datos al backend
      const requestBody = new URLSearchParams();
      requestBody.append('enviarmensaje', true);
      requestBody.append('email', email.value);
      requestBody.append('mensaje', mensajeFinal);
      requestBody.append('telefono', telefonovisitante.value);

      const response = await fetch(`${config.public.BASE_API_URL}`, {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.ok) {
        console.log("Mensaje enviado correctamente.");

        // Limpiar los campos del formulario
        email.value = '';
        telefonovisitante.value = '';
        nombre.value = '';
        mensaje.value = '';
        politicaPrivacidad.value = false;

        // Mostrar el modal de confirmación
        modalVisible.value = true;
        mostrarCampos.value = false;
      } else {
        console.log("Error al enviar el mensaje.");
      }
    } catch (error) {
      console.log("Error al enviar el mensaje:", error);
    }
  } else {
    console.log("El formulario no es válido. Verifique los campos.");
  }
}

// Funciones para abrir y cerrar la imagen grande
const abrirImagen = (url) => {
  imagenGrande.value = url;
};

const cerrarImagen = () => {
  imagenGrande.value = null;
};

onMounted(() => {
  obtenerInmueble();
  obtenerTelefonoYDatos();
});
</script>
