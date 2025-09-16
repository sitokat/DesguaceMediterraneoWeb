<template>
  <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
  <div class="m-4 md:m-8 lg:m-12 xl:m-16">
    <div class="w-full p-6 bg-white rounded-lg shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Edición de Inmueble</h1>
        <div class="flex items-center space-x-4">
          <span v-if="inmueble" class="text-sm italic text-gray-600">
            Creado el: {{ new Date(inmueble.created_at).toLocaleDateString() }}
          </span>
          <button v-if="inmueble" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-110 transition transform duration-300" @click="cambiarEstadoInmueble">
            <font-awesome-icon :icon="inmueble.publicado == 1 ? 'fa-file-alt' : 'fa-file-upload'" class="mr-2" />
            {{ inmueble.publicado == 1 ? 'Pasar a Borrador' : 'Publicar' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="inmueble">
      <div class="w-full p-6 bg-white rounded-lg shadow-lg">
        <!-- Fila para Nombre, Precio y Descripción -->
        <div class="flex flex-wrap -mx-3 mb-6">
          <!-- Nombre -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre - Obligatorio</label>
            <input id="nombre" v-model="inmueble.nombre" type="text" placeholder="Nombre del inmueble" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Precio -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="precio">Precio - Obligatorio</label>
            <input id="precio" v-model="inmueble.precio" type="number" placeholder="Precio del inmueble" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Descripción -->
          <div class="w-full px-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="descripcion">Descripción</label>
            <textarea id="descripcion" v-model="inmueble.descripcion" placeholder="Descripción del inmueble" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <!-- Precio Rebajado -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="preciorebajado">Precio Rebajado</label>
            <input id="preciorebajado" v-model="inmueble.preciorebajado" type="number" placeholder="Precio Rebajado" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Metros Cuadrados -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="m2">Metros Cuadrados</label>
            <input id="m2" v-model="inmueble.m2" type="number" placeholder="Metros Cuadrados" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Tipo -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="tipo">Tipo</label>
            <select id="tipo" v-model="inmueble.tipo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="Pisos">Pisos</option>
              <option value="Aticos y Duplex">Áticos y Dúplex</option>
              <option value="Casas y Chalets">Casas y Chalets</option>
              <option value="Oficinas">Oficinas</option>
              <option value="Locales o Naves">Locales o Naves</option>
              <option value="Trasteros">Trasteros</option>
              <option value="Garajes">Garajes</option>
              <option value="Terrenos">Terrenos</option>
            </select>
          </div>
          <!-- Operación -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="operacion">Operación</label>
            <select id="operacion" v-model="inmueble.operacion" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="Compra">Compra</option>
              <option value="Alquiler">Alquiler</option>
              <option value="Alquiler con Opción a Compra">Alquiler con Opción a Compra</option>
              <option value="Compartir">Compartir</option>
            </select>
          </div>
          <!-- Habitaciones -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="habitaciones">Habitaciones</label>
            <select id="habitaciones" v-model="inmueble.habitaciones" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="n in 20" :key="n-1" :value="n-1">{{ n-1 }}</option>
            </select>
          </div>
          <!-- País -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pais">País</label>
            <select id="pais" v-model="inmueble.pais" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="España">España</option>
            </select>
          </div>
          <!-- Provincia -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="provincia">Provincia</label>
            <select id="provincia" v-model="inmueble.provincia" @change="cargarCiudades" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="provincia in provincias" :key="provincia" :value="provincia">{{ provincia }}</option>
            </select>
          </div>
          <!-- Ciudad -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="ciudad">Ciudad</label>
            <select id="ciudad" v-model="inmueble.ciudad" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="ciudad in ciudades" :key="ciudad" :value="ciudad">{{ ciudad }}</option>
            </select>
          </div>
          <!-- Latitud -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="latitud">Latitud</label>
            <input id="latitud" v-model="inmueble.latitud" type="text" placeholder="Latitud" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Longitud -->
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="longitud">Longitud</label>
            <input id="longitud" v-model="inmueble.longitud" type="text" placeholder="Longitud" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
        </div>

        <!-- Área de drag and drop para subir imágenes -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Subir Fotos (máximo 15)</label>
          <div
            @drop.prevent="onDrop"
            @dragover.prevent
            @click="triggerFileInput" 
            class="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer"
          >
            <input type="file" multiple class="hidden" ref="fileInput" @change="onFileChange" />
            <p class="text-gray-500">Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
          </div>
          <div v-if="fotos.length > 0" class="mt-4 grid grid-cols-5 gap-3">
            <div v-for="(foto, index) in fotos" :key="index" class="relative">
              <img :src="foto.url" alt="Foto subida" class="w-full h-auto rounded-md shadow-lg" />
              <button class="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white" @click="eliminarFoto(index)">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </div>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="updateInmueble">Actualizar</button>
      </div>
    </div>
    <div v-else>
      <p>Cargando datos del inmueble {{ inmuebleId }} ... </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});

const route = useRoute();
const config = useRuntimeConfig();
const inmueble = ref(null);
const fotos = ref([]);
const inmuebleId = route.params.id;
const fechaCreacion = ref('');
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');
const fileInput = ref(null);

// Datos para los selectores de provincias y ciudades
const provincias = ref(['A Coruña', 'Albacete', 'Alicante', 'Almería', 'Álava', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']);
const ciudades = ref([]);

onMounted(() => {
  obtenerInmueble();
});

async function obtenerInmueble() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getInmueble', true);
    requestBody.append('idinmueble', inmuebleId);

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
      fotos.value = data.fotos || [];
      // Guardar la fecha de creación
      fechaCreacion.value = data.inmueble.created_at;

      // Cargar ciudades correspondientes a la provincia seleccionada
      if (inmueble.value.provincia) {
        cargarCiudades();
      }
    } else {
      mensajeAlerta.value = 'Error al obtener el inmueble. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener el inmueble:', error);
    mensajeAlerta.value = 'Error al obtener el inmueble. Recarga la página. Si el problema continúa, avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

function cargarCiudades() {
  const provinciaSeleccionada = inmueble.value.provincia;
  
  const ciudadesDisponibles = {
    'A Coruña': ['A Coruña', 'Ferrol', 'Santiago de Compostela', 'Narón', 'Oleiros', 'Arteixo', 'Culleredo', 'Carballo', 'Betanzos', 'Ribeira'],
    'Álava': ['Vitoria-Gasteiz', 'Llodio', 'Amurrio', 'Salvatierra', 'Ayala', 'Zuia', 'Agurain', 'Araia'],
    'Albacete': ['Albacete', 'Hellín', 'Villarrobledo', 'Almansa', 'La Roda', 'Caudete', 'Tobarra'],
    'Alicante': ['Adsubia', 'Agost', 'Aguas de Busot', 'Albatera', 'Alcalalí', 'Alcocer de Planes', 'Alcoleja', 'Alfafara', 'Algorfa', 'Algueña', 'Alicante', 'Almoradí', 'Almudaina', 'Alquería de Aznar', 'Altea', 'Aspe', 'Balones', 'Bañeres', 'Beneixama', 'Benejúzar', 'Benidoleig', 'Benidorm', 'Benifallim', 'Benifato', 'Benijófar', 'Benilloba', 'Benillup', 'Benimantell', 'Benimarfull', 'Benimasot', 'Benimeli', 'Benissa', 'Benitachell', 'Biar', 'Bigastro', 'Bolulla', 'Busot', 'Callosa de Segura', 'Calpe', 'Campello', 'Campo de Mirra', 'Cañada', 'Castalla', 'Castell de Castells', 'Cocentaina', 'Confrides', 'Cox', 'Crevillente', 'Daya Nueva', 'Daya Vieja', 'Denia', 'Dolores', 'Elche', 'Elda', 'Els Poblets', 'Facheca', 'Famorca', 'Finestrat', 'Formentera del Segura', 'Gata de Gorgos', 'Gorga', 'Granja de Rocamora', 'Guardamar del Segura', 'Hondón de las Nieves', 'Hondón de los Frailes', 'Ibi', 'Jacarilla', 'Jalón', 'Jávea', 'Jijona', 'La Nucía', 'Lorcha', 'Millena', 'Monforte del Cid', 'Monóvar', 'Muchamiel', 'Muro de Alcoy', 'Novelda', 'Ondara', 'Onil', 'Orba', 'Orcheta', 'Orihuela', 'Parcent', 'Pedreguer', 'Pego', 'Penáguila', 'Petrer', 'Pilar de la Horadada', 'Pinoso', 'Planes', 'Polop', 'Rafal', 'Redován', 'Relleu', 'Rojales', 'Salinas', 'San Fulgencio', 'San Juan de Alicante', 'San Miguel de Salinas', 'San Vicente del Raspeig', 'Santa Pola', 'Sax', 'Sella', 'Senija', 'Tárbena', 'Teulada', 'Tibi', 'Tollos', 'Torrevieja', 'Vall de Alcalá', 'Vall de Ebo', 'Vall de Gallinera', 'Villajoyosa', 'Villena', 'Xaló', 'Agres', 'Alcoy', 'Alfaz del Pi', 'Almoradí', 'Altea', 'Aspe', 'Balones', 'Bañeres', 'Benejama', 'Benidorm', 'Benisa', 'Biar', 'Bigastro', 'Bolulla', 'Callosa de Segura', 'Calpe', 'Campello', 'Campo de Mirra', 'Castalla', 'Cocentaina', 'Cox', 'Crevillente', 'Daya Nueva', 'Denia', 'Dolores', 'Elche', 'Elda', 'Els Poblets', 'Gata de Gorgos', 'Gayanes', 'Guadalest', 'Guardamar del Segura', 'Ibi', 'Jalón', 'Jávea', 'Jijona', 'La Nucía', 'Millena', 'Monforte del Cid', 'Monóvar', 'Muchamiel', 'Muro de Alcoy', 'Novelda', 'Onil', 'Orba', 'Orcheta', 'Orihuela', 'Pedreguer', 'Pego', 'Penáguila', 'Petrel', 'Pilar de la Horadada', 'Pinoso', 'Polop', 'Rafal', 'Redován', 'Relleu', 'Rojales', 'Sagra', 'Salinas', 'San Fulgencio', 'San Juan de Alicante', 'San Vicente del Raspeig', 'Santa Pola', 'Sax', 'Tárbena', 'Teulada', 'Tibi', 'Torrevieja', 'Vall de Laguart', 'Valle de Alcalá', 'Vergel', 'Villajoyosa', 'Villena'],
    'Almería': ['Almería', 'Roquetas de Mar', 'El Ejido', 'Níjar', 'Adra', 'Vícar', 'Berja', 'Huércal de Almería'],
    'Asturias': ['Oviedo', 'Gijón', 'Avilés', 'Mieres', 'Langreo', 'Siero', 'Cangas del Narcea', 'Llanes'],
    'Ávila': ['Ávila', 'Arévalo', 'El Tiemblo', 'Candeleda', 'Las Navas del Marqués'],
    'Badajoz': ['Badajoz', 'Mérida', 'Don Benito', 'Almendralejo', 'Zafra', 'Villanueva de la Serena', 'Olivenza', 'Montijo'],
    'Baleares': ['Palma de Mallorca', 'Ibiza', 'Manacor', 'Inca', 'Ciutadella', 'Mahón', 'Santa Eulalia del Río'],
    'Barcelona': ['Barcelona', 'Badalona', 'LHospitalet de Llobregat', 'Terrassa', 'Sabadell', 'Mataró', 'Santa Coloma de Gramenet', 'Cornellà de Llobregat', 'Sant Boi de Llobregat'],
    'Burgos': ['Burgos', 'Miranda de Ebro', 'Aranda de Duero', 'Briviesca', 'Villarcayo', 'Medina de Pomar'],
    'Cáceres': ['Cáceres', 'Plasencia', 'Navalmoral de la Mata', 'Trujillo', 'Coria', 'Miajadas'],
    'Cádiz': ['Cádiz', 'Jerez de la Frontera', 'Algeciras', 'San Fernando', 'El Puerto de Santa María', 'Chiclana de la Frontera', 'La Línea de la Concepción'],
    'Cantabria': ['Santander', 'Torrelavega', 'Camargo', 'Castro Urdiales', 'El Astillero', 'Laredo', 'Potes'],
    'Castellón': ['Castellón de la Plana', 'Villarreal', 'La Vall d’Uixó', 'Benicarló', 'Onda', 'Burriana', 'Vinaròs'],
    'Ciudad Real': ['Ciudad Real', 'Puertollano', 'Alcázar de San Juan', 'Tomelloso', 'Valdepeñas', 'Manzanares'],
    'Córdoba': ['Córdoba', 'Lucena', 'Puente Genil', 'Montilla', 'Priego de Córdoba', 'Palma del Río', 'Cabra'],
    'Cuenca': ['Cuenca', 'Tarancón', 'San Clemente', 'Mota del Cuervo', 'Quintanar del Rey'],
    'Girona': ['Girona', 'Figueres', 'Blanes', 'Lloret de Mar', 'Olot', 'Sant Feliu de Guíxols'],
    'Granada': ['Granada', 'Motril', 'Almuñécar', 'Loja', 'Baza', 'Guadix'],
    'Guadalajara': ['Guadalajara', 'Azuqueca de Henares', 'El Casar', 'Cabanillas del Campo'],
    'Guipúzcoa': ['San Sebastián', 'Irun', 'Eibar', 'Errenteria', 'Zarautz', 'Hernani'],
    'Huelva': ['Huelva', 'Lepe', 'Almonte', 'Isla Cristina', 'Ayamonte', 'Punta Umbría'],
    'Huesca': ['Huesca', 'Monzón', 'Barbastro', 'Fraga', 'Jaca', 'Sabiñánigo'],
    'Jaén': ['Jaén', 'Linares', 'Andújar', 'Úbeda', 'Martos', 'Bailén'],
    'La Rioja': ['Logroño', 'Calahorra', 'Arnedo', 'Haro', 'Alfaro'],
    'Las Palmas': ['Las Palmas de Gran Canaria', 'Telde', 'Santa Lucía de Tirajana', 'Arrecife', 'San Bartolomé de Tirajana', 'Ingenio'],
    'León': ['León', 'Ponferrada', 'San Andrés del Rabanedo', 'Astorga', 'Bembibre', 'La Bañeza'],
    'Lleida': ['Lleida', 'Balaguer', 'Tàrrega', 'Mollerussa', 'Cervera', 'Solsona'],
    'Lugo': ['Lugo', 'Monforte de Lemos', 'Viveiro', 'Vilalba', 'Sarria'],
    'Madrid': ['Madrid', 'Alcalá de Henares', 'Fuenlabrada', 'Getafe', 'Leganés', 'Móstoles', 'Alcorcón', 'Torrejón de Ardoz', 'Parla', 'Pozuelo de Alarcón'],
    'Málaga': ['Málaga', 'Marbella', 'Mijas', 'Fuengirola', 'Torremolinos', 'Benalmádena', 'Vélez-Málaga', 'Rincón de la Victoria'],
    'Murcia': ['Murcia', 'Cartagena', 'Lorca', 'Molina de Segura', 'Cieza', 'Yecla', 'Mazarrón'],
    'Navarra': ['Pamplona', 'Tudela', 'Barañáin', 'Estella', 'Alsasua'],
    'Ourense': ['Ourense', 'Verín', 'O Barco de Valdeorras', 'Carballiño'],
    'Palencia': ['Palencia', 'Aguilar de Campoo', 'Guardo', 'Venta de Baños'],
    'Pontevedra': ['Vigo', 'Pontevedra', 'Vilagarcía de Arousa', 'Redondela', 'Marín'],
    'Salamanca': ['Salamanca', 'Béjar', 'Ciudad Rodrigo', 'Santa Marta de Tormes'],
    'Santa Cruz de Tenerife': ['Santa Cruz de Tenerife', 'San Cristóbal de La Laguna', 'Arona', 'Adeje', 'Los Realejos'],
    'Segovia': ['Segovia', 'Cuéllar', 'El Espinar', 'San Ildefonso'],
    'Sevilla': ['Sevilla', 'Dos Hermanas', 'Alcalá de Guadaíra', 'Utrera', 'Mairena del Aljarafe'],
    'Soria': ['Soria', 'Almazán', 'Ólvega', 'El Burgo de Osma'],
    'Tarragona': ['Tarragona', 'Reus', 'Salou', 'Cambrils', 'Vila-seca'],
    'Teruel': ['Teruel', 'Alcañiz', 'Andorra', 'Calamocha'],
    'Toledo': ['Toledo', 'Talavera de la Reina', 'Illescas', 'Seseña', 'Quintanar de la Orden'],
    'Valencia': ['Valencia', 'Gandía', 'Torrent', 'Paterna', 'Sagunto', 'Alzira', 'Mislata'],
    'Valladolid': ['Valladolid', 'Medina del Campo', 'Laguna de Duero', 'Tordesillas'],
    'Vizcaya': ['Bilbao', 'Barakaldo', 'Getxo', 'Portugalete', 'Santurtzi'],
    'Zamora': ['Zamora', 'Benavente', 'Toro', 'Puebla de Sanabria'],
    'Zaragoza': ['Zaragoza', 'Calatayud', 'Ejea de los Caballeros', 'Tarazona', 'Utebo'],
  };

  ciudades.value = ciudadesDisponibles[provinciaSeleccionada] || [];
}

async function updateInmueble() {
  try {
    const inmuebleData = {
      updateInmueble: true,
      idinmueble: inmuebleId,
      nombre: inmueble.value.nombre,
      precio: inmueble.value.precio !== null ? inmueble.value.precio : '',
      preciorebajado: inmueble.value.preciorebajado !== null ? inmueble.value.preciorebajado : '',
      descripcion: inmueble.value.descripcion !== null ? inmueble.value.descripcion : '',
      m2: inmueble.value.m2 !== null ? inmueble.value.m2 : '',
      tipo: inmueble.value.tipo !== null ? inmueble.value.tipo : '',
      operacion: inmueble.value.operacion !== null ? inmueble.value.operacion : '',
      habitaciones: inmueble.value.habitaciones !== null ? inmueble.value.habitaciones : '',
      pais: inmueble.value.pais !== null ? inmueble.value.pais : '',
      provincia: inmueble.value.provincia !== null ? inmueble.value.provincia : '',
      ciudad: inmueble.value.ciudad !== null ? inmueble.value.ciudad : '',
      latitud: inmueble.value.latitud !== null ? inmueble.value.latitud : '',
      longitud: inmueble.value.longitud !== null ? inmueble.value.longitud : ''
    };

    const requestBody = new URLSearchParams(inmuebleData);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      mensajeAlerta.value = 'Inmueble actualizado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      mensajeAlerta.value = 'Error al actualizar el inmueble. Vuelve a intentarlo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al actualizar el inmueble:', error);
    mensajeAlerta.value = 'Error al actualizar el inmueble. Vuelve a intentarlo.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

function onFileChange(event) {
  const files = Array.from(event.target.files);
  if (fotos.value.length + files.length > 15) {
    mensajeAlerta.value = 'No puedes subir más de 15 fotos.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    return;
  }
  uploadFiles(files);
}

function onDrop(event) {
  const files = Array.from(event.dataTransfer.files);
  if (fotos.value.length + files.length > 15) {
    mensajeAlerta.value = 'No puedes subir más de 15 fotos.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    return;
  }
  uploadFiles(files);
}

async function uploadFiles(files) {
  const initialLength = fotos.value.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const base64Image = e.target.result;
      const requestBody = new URLSearchParams();
      
      // Calcular el índice de la foto, sumando la longitud inicial más el índice actual
      const index = initialLength + i + 1;

      requestBody.append('subeFotoInmueble', true);
      requestBody.append('idinmueble', inmuebleId);
      requestBody.append('foto', base64Image);
      requestBody.append('index', index); // Enviar el índice correcto
      requestBody.append('fecha', fechaCreacion.value);

      try {
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
            fotos.value.push({ url: data.url });
          } else {
            console.error('Error al subir la foto:', data.message);
          }
        } else {
          console.error('Error al subir la foto: Respuesta no OK');
        }
      } catch (error) {
        console.error('Error al subir la foto:', error);
      }
    };

    reader.readAsDataURL(file);
  }
}

async function eliminarFoto(index) {
  // Suponiendo que fotos.value[index] es un objeto, accedemos a la propiedad que contiene la URL.
  const fotoObj = fotos.value[index]; 
  const fotoUrl = typeof fotoObj === 'string' ? fotoObj : fotoObj.url; // Ajusta 'url' al nombre correcto de la propiedad

  try {
    const requestBody = new URLSearchParams();
    requestBody.append('borrarFotoInmueble', true);
    requestBody.append('idinmueble', inmuebleId);
    requestBody.append('fotoUrl', fotoUrl); // Ahora fotoUrl debería ser una cadena con la URL correcta

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
        fotos.value.splice(index, 1);
        mensajeAlerta.value = 'Foto eliminada correctamente.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
      } else {
        mensajeAlerta.value = `Error al eliminar la foto: ${data.message}`;
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
      }
    } else {
      mensajeAlerta.value = 'Error al eliminar la foto. Vuelve a intentarlo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al eliminar la foto:', error);
    mensajeAlerta.value = 'Error al eliminar la foto. Vuelve a intentarlo.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

async function cambiarEstadoInmueble() {
  inmueble.value.publicado = inmueble.value.publicado == 0 ? 1 : 0;

  try {
    const requestBody = new URLSearchParams();
    requestBody.append('publicarInmueble', true);
    requestBody.append('idinmueble', inmuebleId);
    requestBody.append('estado', inmueble.value.publicado);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      mensajeAlerta.value = 'Estado del inmueble actualizado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      mensajeAlerta.value = 'Error al actualizar el estado del inmueble. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al cambiar el estado del inmueble:', error);
    mensajeAlerta.value = 'Error al cambiar el estado del inmueble. Recarga la página. Si el problema continúa, avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click(); // Usa el ref directamente para acceder al input
  }
}
</script>
