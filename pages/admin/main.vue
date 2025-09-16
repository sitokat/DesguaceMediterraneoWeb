<template>
  <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
  <div class="m-4 md:m-8 lg:m-12 xl:m-16">
    <div class="w-full p-6 bg-white rounded-lg shadow-lg">
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bienvenido a la interfaz de Administración</h1>
      <p class="mt-2 text-gray-700">Desde el menú lateral podrás gestionar todas las opciones y el contenido de la web. <br>A continuación podrás ajustar ciertos parametros generales de la web.</p>
    </div>
    <!-- Sección de SEO -->
    <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold">SEO - Configuración de la página principal</h2>
      <p class="mt-2 text-gray-700">Estos parametros determinan los valores meta title y meta description de la página principal (home) de la web, no es recomendable cambiarlos constantemente.</p>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Título de la Página</label>
        <input v-model="title" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Introduce el nuevo título, recomendado un máximo de 70 caracteres.">
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Descripción Meta</label>
        <textarea v-model="description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3" placeholder="Introduce la nueva descripción, recomendado un máximo de 150 caracteres."></textarea>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Seleccionar Fuente</label>
        <select v-model="selectedFont" @change="applyFont" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="Poppins">Poppins</option>
          <option value="Titillium Web">Titillium Web</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Roboto Regular">Roboto Regular</option>
        </select>
      </div>
      <!-- Frase de prueba para ver la fuente seleccionada -->
      <div class="mt-4">
        <p :style="{ fontFamily: selectedFont }" class="text-lg">Frase de prueba para mostrar la fuente seleccionada.</p>
      </div>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="updateSEO">Actualizar</button>
    </div>
    <!-- Sección de Configuración del Hero -->
    <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold">Configuración del Hero</h2>
      <p class="mt-2 text-gray-700">Activa o desactiva el Hero en la página principal y edita su contenido.</p>
      <div class="flex items-center mt-4">
        <label class="block text-sm font-medium text-gray-700 mr-4">Activar Hero</label>
        <input v-model="heroActive" type="checkbox" @change="guardarHeroConfig" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <!-- Mostrar Gestión de Contenido del Hero si está activo -->
      <div v-if="heroActive" class="mt-4">
        <h3 class="text-lg font-semibold">Contenido del Hero</h3>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Título del Hero</label>
          <input v-model="heroTitle" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Texto del Hero</label>
          <textarea v-model="heroText" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3"></textarea>
        </div>
        <div v-if="heroTitle || heroText" class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Imagen del Hero</label>
          <input type="file" @change="uploadHeroImage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <img v-if="heroImage" :src="heroImage" alt="Hero Image" class="mt-4 w-full h-auto rounded-md shadow-lg">
        </div>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="guardarHeroConfig">Guardar Configuración del Hero</button>
      </div>
    </div>
    <!-- Sección de Configuración del Slideshow -->
    <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold">Configuración del Slideshow</h2>
      <p class="mt-2 text-gray-700">Activa o desactiva el slideshow en la página principal.</p>
      
      <div class="flex items-center mt-4">
        <label class="block text-sm font-medium text-gray-700 mr-4">Activar Slideshow</label>
        <input v-model="slideActive" type="checkbox" @change="guardarSlideConfig" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <!-- Mostrar Gestión de Imágenes del Slideshow si está activo -->
      <div v-if="slideActive" class="mt-4">
        <h3 class="text-lg font-semibold">Imágenes del Slideshow</h3>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Añadir Imagen</label>
          <input type="file" @change="uploadSlideImage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="(slide, index) in slides" :key="index" class="relative">
            <img :src="slide.url" alt="Imagen del Slideshow" class="w-full h-auto rounded-md shadow-lg" />
            <button @click="removeSlide(index)" class="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
      <!-- Sección de Configuración de Features -->
  <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold">Configuración de Features</h2>
    <p class="mt-2 text-gray-700">Activa o desactiva las features en la página principal y configura su contenido.</p>
    <div class="flex items-center mt-4">
      <label class="block text-sm font-medium text-gray-700 mr-4">Activar Features</label>
      <input v-model="featuresActive" type="checkbox" @change="guardarFeaturesConfig" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>
    <!-- Mostrar campos de configuración de features si está activo -->
    <div v-if="featuresActive" class="mt-4">
      <h3 class="text-lg font-semibold">Contenido de Features</h3>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Título de Features</label>
        <input v-model="featuresTitle" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Primer Párrafo</label>
        <textarea v-model="featuresP1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3"></textarea>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Segundo Párrafo</label>
        <textarea v-model="featuresP2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3"></textarea>
      </div>
      <h4 class="text-lg font-semibold mt-4">Lista de Features</h4>
      <div v-for="(feature, index) in features" :key="index" class="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700">Nombre de la Feature</label>
          <input v-model="feature.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea v-model="feature.description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="2"></textarea>
        </div>
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700">Icono</label>
          <input v-model="feature.icon" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
      </div>
    </div>

    <button v-if="featuresActive" class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" @click="guardarFeaturesConfig">Guardar Configuración de Features</button>
  </div>
    <!-- Nueva Sección para Activar/Desactivar Módulos -->
    <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold">Configuración de Secciones</h2>
      <p class="mt-2 text-gray-700">Activa o desactiva secciones específicas del frontend de la web.</p>
      <!-- Renderizado Dinámico de Secciones -->
      <div v-for="(seccion, index) in secciones" :key="seccion.id" class="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700">{{ seccion.nombre }}</label>
          <input v-model="secciones[index].estado" type="checkbox" :value="1" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mt-2">
          <label class="block text-sm font-medium text-gray-700">Ruta</label>
          <input v-model="secciones[index].ruta" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" :disabled="true" placeholder="Introduce la ruta para la sección">
        </div>
      </div>
      <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" @click="guardarConfiguracion">Guardar Configuración</button>
    </div>
    <!-- Nueva Card: Datos de Identificación -->
    <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold">Datos de Identificación</h2>
      <p class="mt-2 text-gray-700">Aquí puedes actualizar los datos de identificación de la web, estos datos aparecen en la cabecera y el footer.</p>
      <!-- Título de la Página -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Título de la Página en Cabecera y Footer</label>
        <textarea v-model="tituloPagina" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="2"></textarea>
      </div>
      <!-- Información Legal del Footer -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Información Legal del Footer, si se trata de un ecommerce o gestionas cobros es obligatorio incluir la identificación fiscal.</label>
        <textarea v-model="infoLegalFooter" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3"></textarea>
      </div>
      <!-- Teléfono de contacto -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Teléfono de contacto, será visible para realizar llamadas a la acción en la web</label>
        <input v-model="telefonoContacto" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <!-- Correo de contacto -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Correo de contacto, será visible para realizar llamadas a la acción en la web</label>
        <input v-model="correoContacto" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <!-- Botón para guardar los cambios de texto -->
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" @click="guardarDatosIdentificacion">Guardar Cambios</button>
      <!-- Logo -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Logo - Cambia aquí el logo de la página web, se mostrará tanto en el header como en el footer</label>
        <div class="flex items-center">
          <img :src="logoUrl" alt="Logo" class="w-24 h-24 object-contain mr-4" />
          <input type="file" @change="handleLogoChange" ref="logoInput" class="hidden" />
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="selectLogo">Cambiar Logo</button>
        </div>
      </div>
    </div>

    <!-- Nueva Card: Administrar Redes Sociales -->
    <div class="w-full p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold">Redes Sociales</h2>
      <p class="mt-2 text-gray-700">Gestiona los enlaces a las redes sociales que aparecerán en el footer.</p>
      <!-- Formulario para agregar nueva red social -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Nombre de la Red Social</label>
        <input v-model="newSocial.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Ejemplo: Facebook, Instagram, etc.">
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Icono de la Red Social</label>
        <select v-model="newSocial.icon" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" @change="setIconSVG">
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
          <option value="youtube">YouTube</option>
          <option value="whatsapp">Whatsapp</option>
          <!-- Agregar más opciones según sea necesario -->
        </select>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">URL del Perfil</label>
        <input v-model="newSocial.url" type="url" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="https://www.ejemplo.com/perfil">
      </div>
      <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" @click="addSocial">Añadir Red Social</button>
      <!-- Lista de redes sociales existentes -->
      <div v-if="socialLinks.length" class="mt-6">
      <h3 class="text-lg font-semibold">Listado de enlaces actuales</h3>
      <div v-for="(social, index) in socialLinks" :key="index" class="flex items-center mt-4">
        <!-- Renderizar el icono en un elemento <img> -->
        <span v-html="social.icono" class="w-5 h-5 mr-4"></span>
        <!-- Mostrar el nombre de la red social junto al ícono -->
        <span class="mr-4">{{ social.nombre }}</span>
        <a :href="social.url" target="_blank" class="text-blue-500 hover:underline">{{ social.url }}</a>
        <button @click="removeSocial(index)" class="ml-auto text-red-500 hover:underline">Eliminar</button>
      </div>
    </div>
    </div>
  </div>
  <!-- Modal de Confirmación para el Cambio de Logo -->
  <transition name="fade">
    <div v-if="mostrarModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Confirmar Cambio de Logo</h3>
          <p class="mt-2 text-sm text-gray-500">¿Estás seguro de que deseas cambiar el logo? Este cambio sobrescribirá el logo actual.</p>
          <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button @click="confirmarCambioLogo" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm">
              Confirmar
            </button>
            <button @click="cerrarModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard' // Debe coincidir con el nombre del archivo dentro del directorio de middleware
});

const config = useRuntimeConfig();
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');
const title = ref('');
const description = ref('');
const telefonoContacto = ref('');
const correoContacto = ref('');
const secciones = ref([]); // Arreglo dinámico de secciones
const tituloPagina = ref('');
const infoLegalFooter = ref('');
// Logo
const logoUrl = ref('');
const mostrarModal = ref(false);
const logoInput = ref(null);
const logoFile = ref(null);
const emit = defineEmits(['configuracionGuardada']);
// Redes Sociales
const socialLinks = ref([]); // Arreglo para almacenar las redes sociales
const newSocial = ref({ name: '', icon: '', url: '', iconSVG: '' });
// Mapeo de iconos en SVG
const iconSVGMap = {
  facebook: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>', // Aquí va el valor en SVG del ícono de FAcebook
  instagram: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>',
  twitter: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5.5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" clip-rule="evenodd"/></svg>',   // Aquí va el valor en SVG del ícono de Twitter
  linkedin: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-8.75h2.5v8.75zm-1.25-10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm14 10.5h-2.5v-4.75c0-1.1-.9-2-2-2s-2 .9-2 2v4.75h-2.5v-8.75h2.5v1.25c.71-.85 1.78-1.25 2.75-1.25 2.08 0 3.75 1.67 3.75 3.75v5h-.01z" clip-rule="evenodd"/></svg>',  // Aquí va el valor en SVG del ícono de LinkedIn
  youtube: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19.6 3H4.4C2.35 3 1 4.35 1 6.4v11.2C1 19.65 2.35 21 4.4 21h15.2c2.05 0 3.4-1.35 3.4-3.4V6.4C23 4.35 21.65 3 19.6 3zM10 16V8l6 4-6 4z" clip-rule="evenodd"/></svg>',    // Aquí va el valor en SVG del ícono de YouTube
  whatsapp: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.87.51 3.62 1.39 5.14L2 22l4.97-1.32C8.52 21.49 10.23 22 12 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18c-1.58 0-3.04-.46-4.26-1.26L5 20l.73-2.83C4.31 15.98 4 14.04 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm4.55-6.67c-.1-.05-.61-.3-.7-.33-.09-.03-.16-.05-.23.05-.07.1-.27.33-.33.4-.06.07-.12.08-.23.03-.1-.05-.89-.33-1.7-1.07-.63-.56-1.05-1.25-1.18-1.46-.1-.2-.01-.3.07-.34.08-.05.18-.12.27-.2.09-.08.12-.13.18-.22.06-.1.03-.18-.02-.26-.05-.08-.5-1.21-.69-1.67-.19-.46-.38-.4-.52-.41-.13 0-.28-.01-.42-.01-.14 0-.26.04-.35.11-.11.1-.42.41-.42 1.01s.44 1.17.5 1.26c.06.09.88 1.36 2.15 2.1 1.28.73 1.51.7 1.79.66.28-.04.9-.36 1.03-.72.13-.36.13-.67.09-.73-.05-.05-.12-.09-.22-.14z" clip-rule="evenodd"/></svg>'
  // Añadir más redes sociales aquí
};
// Slideshow Configuración
const slideActive = ref(false);
const slides = ref([]);
// Variables para el hero
const heroActive = ref(false);
const heroTitle = ref('');
const heroText = ref('');
const heroImage = ref('');
// Variables spara las features
const featuresActive = ref(false);  // Estado para activar/desactivar las features
const featuresTitle = ref('');      // Título de la sección de features
const featuresP1 = ref('');         // Primer párrafo
const featuresP2 = ref('');         // Segundo párrafo
const features = ref([]);           // Lista de features
// Variables para las fuentes
const selectedFont = ref(''); // Fuente por defecto

const applyFont = () => {
  
};

onMounted(() => {
  obtenerSEO();
  obtenerConfiguracionSecciones();
  obtenerDatosIdentificacion();
  fetchSocialLinks();
  obtenerSlideConfig();
  obtenerHeroConfig();
  obtenerFeaturesConfig();
});

async function obtenerFeaturesConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getFeatures', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      featuresActive.value = data.featuresActive === 1;
      featuresTitle.value = data.featurestitle || '';
      featuresP1.value = data.featuresp1 || '';
      featuresP2.value = data.featuresp2 || '';
      features.value = data.features || [];
    } else {
      console.error('Error al obtener la configuración de features.');
      mostrarError('Error al obtener configuración de las features.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración de features:', error);
    mostrarError('Error al obtener configuración de las features.');
  }
}

async function guardarFeaturesConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updateFeaturesConfig', true);
    requestBody.append('featuresActive', featuresActive.value ? 1 : 0);
    requestBody.append('featurestitle', featuresTitle.value);
    requestBody.append('featuresp1', featuresP1.value);
    requestBody.append('featuresp2', featuresP2.value);
    requestBody.append('features', JSON.stringify(features.value)); // Convertir la lista de features a JSON

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      console.log('Configuración de features guardada correctamente.');
      mensajeAlerta.value = 'Actualización realizada correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
    } else {
      console.error('Error al guardar la configuración de features.');
      mostrarError('Error al guardar la configuración de features.');
    }
  } catch (error) {
    console.error('Error al guardar la configuración de features:', error);
    mostrarError('Error al guardar la configuración de features.');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function obtenerSEO() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getSEO', true);
    requestBody.append('pagina', 'home');

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      title.value = data.title;
      description.value = data.description;

      // Si la fuente existe en la respuesta, asignarla
      if (data.fuente) {
        selectedFont.value = data.fuente;
      }
    } else {
      mensajeAlerta.value = 'Error al obtener parámetros. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener parámetros. Recarga la página', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function updateSEO() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updateSEO', true);
    requestBody.append('title', title.value);
    requestBody.append('description', description.value);
    requestBody.append('pagina', 'home');
    requestBody.append('fuente', selectedFont.value); // Enviar la fuente seleccionada

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      obtenerSEO(); // Vuelve a obtener los valores actualizados
      mensajeAlerta.value = 'Actualización realizada correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
    } else {
      mensajeAlerta.value = 'Error al actualizar parámetros. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al actualizar parámetros. Recarga la página', error);
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function obtenerConfiguracionSecciones() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getSecciones', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      secciones.value = data.map(seccion => ({
        id: seccion.id,
        nombre: seccion.nombre,
        ruta: seccion.ruta,
        estado: seccion.estado == 1 ? true : false // Convertimos a booleano
      }));
    } else {
      mostrarError('Error al obtener configuración de secciones.');
    }
  } catch (error) {
    console.error('Error al obtener configuración de secciones:', error);
    mostrarError('Error al obtener configuración de secciones.');
  }
}

async function guardarConfiguracion() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('guardarSecciones', true);

    secciones.value.forEach(seccion => {
      requestBody.append(`id_${seccion.id}`, seccion.id);
      requestBody.append(`nombre_${seccion.id}`, seccion.nombre);
      requestBody.append(`ruta_${seccion.id}`, seccion.ruta); // Añadir la ruta al request
      requestBody.append(`estado_${seccion.id}`, seccion.estado ? 1 : 0); // Enviar estado como 1 o 0
    });

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        mensajeAlerta.value = data.message || 'Configuración guardada correctamente.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
        obtenerConfiguracionSecciones();
        emit('configuracionGuardada');
      } else {
        mostrarError(data.message || 'Error al guardar configuración.');
      }
    } else {
      mostrarError('Error al guardar configuración.');
    }
  } catch (error) {
    console.error('Error al guardar configuración:', error);
    mostrarError('Error al guardar configuración.');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function obtenerDatosIdentificacion() {
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
        if (dato.nombre === 'titulo') tituloPagina.value = dato.valor;
        if (dato.nombre === 'infolegal') infoLegalFooter.value = dato.valor;
        if (dato.nombre === 'telefono') telefonoContacto.value = dato.valor;
        if (dato.nombre === 'correo') correoContacto.value = dato.valor;
        if (dato.nombre === 'logo') logoUrl.value = dato.valor;
      });
    } else {
      mostrarError('Error al obtener los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de identificación:', error);
    mostrarError('Error al obtener los datos de identificación.');
  }
}

async function guardarDatosIdentificacion() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updateDatosIdentificacion', true);
    requestBody.append('titulo', tituloPagina.value);
    requestBody.append('infolegal', infoLegalFooter.value);
    requestBody.append('telefono', telefonoContacto.value);
    requestBody.append('correo', correoContacto.value);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        mensajeAlerta.value = data.message || 'Datos de identificación actualizados correctamente.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700'; // Azul para éxito
        obtenerDatosIdentificacion();
      } else {
        mostrarError(data.message || 'Error al actualizar los datos de identificación.');
      }
    } else {
      mostrarError('Error al actualizar los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al actualizar los datos de identificación:', error);
    mostrarError('Error al actualizar los datos de identificación.');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // Ocultar alerta después de 2 segundos
}

function selectLogo() {
  logoInput.value.click();  // Abre el diálogo para seleccionar el archivo
}

function handleLogoChange(event) {
  logoFile.value = event.target.files[0];
  mostrarModal.value = true;  // Muestra el modal de confirmación
}

async function confirmarCambioLogo() {
  cerrarModal();

  if (!logoFile.value) return; // No hacer nada si no se ha seleccionado un archivo

  const reader = new FileReader();
  reader.onload = async (e) => {
    const SVGImage = e.target.result;
    const requestBody = new URLSearchParams();
    requestBody.append('subeLogo', true);
    requestBody.append('nombre', logoFile.value.name);
    requestBody.append('contenido', SVGImage);

    try {
      const response = await fetch(`${config.public.BASE_API_URL}`, {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        logoUrl.value = responseData.url;
        mensajeAlerta.value = 'Logo actualizado correctamente.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-green-100 border-green-400 text-green-700';
      } else {
        console.error('Error al subir el logo:', responseData.message);
        mensajeAlerta.value = 'Error al subir el logo.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
      }
    } catch (error) {
      console.error('Error al subir el logo:', error);
      mostrarError('Error al subir el logo.');
    }
  };
  reader.readAsDataURL(logoFile.value);
}

// Función para obtener las redes sociales desde el backend
async function fetchSocialLinks() {
  try {
    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: new URLSearchParams({ getSocialLinks: true }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      socialLinks.value = await response.json();
    } else {
      console.error('Error al obtener las redes sociales.');
    }
  } catch (error) {
    console.error('Error al obtener las redes sociales:', error);
  }
}

// Función para establecer el valor en SVG del ícono seleccionado
function setIconSVG() {
  const iconKey = newSocial.value.icon;
  newSocial.value.iconSVG = iconSVGMap[iconKey];
}

// Función para agregar una nueva red social
async function addSocial() {
  if (!newSocial.value.name || !newSocial.value.icon || !newSocial.value.url || !newSocial.value.iconSVG) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  try {
    const requestBody = new URLSearchParams(newSocial.value);
    requestBody.append('addSocialLink', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      const newLink = await response.json();
      socialLinks.value.push(newLink);
      newSocial.value = { name: '', icon: '', url: '', iconSVG: '' }; // Resetear formulario
    } else {
      console.error('Error al añadir la red social.');
    }
  } catch (error) {
    console.error('Error al añadir la red social:', error);
  }
}

// Función para eliminar una red social
async function removeSocial(index) {
  try {
    const social = socialLinks.value[index];
    const requestBody = new URLSearchParams();
    requestBody.append('deleteSocialLink', true);
    requestBody.append('name', social.nombre);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      socialLinks.value.splice(index, 1);
    } else {
      console.error('Error al eliminar la red social.');
    }
  } catch (error) {
    console.error('Error al eliminar la red social:', error);
  }
}

function abrirModalCambioLogo() {
  mostrarModal.value = true;
}

function cerrarModal() {
  mostrarModal.value = false;
}

function handleClose() {
  mostrarAlerta.value = false;
}

// Función para obtener la configuración del slideshow y las imágenes
async function obtenerSlideConfig() {
  try {
    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: new URLSearchParams({ getSlideConfig: true }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      const data = await response.json();
      slideActive.value = data.slideActive;
      slides.value = data.slides || [];
    } else {
      mostrarError('Error al obtener la configuración del slideshow.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración del slideshow:', error);
    mostrarError('Error al obtener la configuración del slideshow.');
  }
}

// Función para guardar la configuración del slideshow
async function guardarSlideConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updateSlideConfig', true);
    requestBody.append('slideActive', slideActive.value ? 1 : 0);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      mensajeAlerta.value = 'Configuración del slideshow guardada correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      mostrarError('Error al guardar la configuración del slideshow.');
    }
  } catch (error) {
    console.error('Error al guardar la configuración del slideshow:', error);
    mostrarError('Error al guardar la configuración del slideshow.');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

// Función para subir una nueva imagen al slideshow
async function uploadSlideImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Image = e.target.result;

    try {
      const requestBody = new URLSearchParams();
      requestBody.append('uploadSlideImage', true);
      requestBody.append('image', base64Image);

      const response = await fetch(`${config.public.BASE_API_URL}`, {
        method: 'POST',
        body: requestBody,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          slides.value.push({ url: data.url });
        } else {
          mostrarError('Error al subir la imagen del slideshow.');
        }
      } else {
        mostrarError('Error al subir la imagen del slideshow.');
      }
    } catch (error) {
      console.error('Error al subir la imagen del slideshow:', error);
      mostrarError('Error al subir la imagen del slideshow.');
    }
  };
  reader.readAsDataURL(file);
}

// Función para eliminar una imagen del slideshow
async function removeSlide(index) {
  const slide = slides.value[index];
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('deleteSlideImage', true);
    requestBody.append('url', slide.url);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      slides.value.splice(index, 1);
    } else {
      mostrarError('Error al eliminar la imagen del slideshow.');
    }
  } catch (error) {
    console.error('Error al eliminar la imagen del slideshow:', error);
    mostrarError('Error al eliminar la imagen del slideshow.');
  }
}

async function obtenerHeroConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getHeroConfig', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      heroActive.value = data.heroActive === 1;
      heroTitle.value = data.titulo || '';
      heroText.value = data.texto || '';
      heroImage.value = data.foto || '';
    } else {
      console.error('Error al obtener la configuración del Hero.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración del Hero:', error);
  }
}

async function guardarHeroConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updateHeroConfig', true);
    requestBody.append('heroActive', heroActive.value ? 1 : 0);
    requestBody.append('titulo', heroTitle.value);
    requestBody.append('texto', heroText.value);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      mensajeAlerta.value = 'Configuración del Hero guardada correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      mostrarError('Error al guardar la configuración del Hero.');
    }
  } catch (error) {
    console.error('Error al guardar la configuración del Hero:', error);
    mostrarError('Error al guardar la configuración del Hero.');
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

// Función para subir la imagen del Hero
async function uploadHeroImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Image = e.target.result;

    try {
      const requestBody = new URLSearchParams();
      requestBody.append('uploadHeroImage', true);
      requestBody.append('image', base64Image);

      const response = await fetch(`${config.public.BASE_API_URL}`, {
        method: 'POST',
        body: requestBody,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          heroImage.value = data.url;
        } else {
          mostrarError('Error al subir la imagen del Hero.');
        }
      } else {
        mostrarError('Error al subir la imagen del Hero.');
      }
    } catch (error) {
      console.error('Error al subir la imagen del Hero:', error);
      mostrarError('Error al subir la imagen del Hero.');
    }
  };
  reader.readAsDataURL(file);
}

function mostrarError(mensaje) {
  mensajeAlerta.value = mensaje;
  mostrarAlerta.value = true;
  colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';

  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}
</script>
