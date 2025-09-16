<template>
    <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
    <div class="m-4 md:m-8 lg:m-12 xl:m-16">
      <div class="w-full p-6 bg-white rounded-lg shadow-lg mb-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Gestión de Divorcios Express</h1>
        </div>
      </div>
      <div class="w-full p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-center mb-4">
          <input v-model="filtroBusqueda" type="text" placeholder="Buscar divorcios..." class="border p-2 rounded-full mr-2" />
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
                Apellidos
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                DNI
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="divorcio in divorciosFiltrados" :key="divorcio.id">
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ divorcio.id }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ divorcio.nombre }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ divorcio.apellidos }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ divorcio.dni }}</p>
              </td>
              <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm flex space-x-3">
                <button class="text-blue-500 hover:text-blue-600" @click="descargarPDF(divorcio)">
                  <font-awesome-icon icon="file-pdf" />
                </button>
                <button class="text-red-500 hover:text-red-600" @click="solicitarConfirmacion(divorcio)">
                  <font-awesome-icon icon="trash-alt" />
                </button>
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
              <option :value="divorcios.length">Todos</option>
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
    </div>
  
    <!-- Modal para Confirmar Eliminación -->
    <transition name="fade">
      <div v-if="showModalConfirmacion" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white rounded p-5 shadow-lg">
          <h2 class="text-xl font-bold text-center mb-4">Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar el registro de divorcio de "{{ divorcioAEliminar.nombre }} {{ divorcioAEliminar.apellidos }}"?</p>
          <div class="flex justify-center mt-4">
            <button @click="confirmarEliminacion" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2">Eliminar</button>
            <button @click="showModalConfirmacion = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mx-2">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { jsPDF } from 'jspdf';

  definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});

  const config = useRuntimeConfig();
  const filtroBusqueda = ref('');
  const paginaActual = ref(1);
  const filasPorPagina = ref(10);
  const showModalConfirmacion = ref(false);
  const divorcioAEliminar = ref(null);
  const divorcios = ref([]);
  const mostrarAlerta = ref(false);
  const mensajeAlerta = ref('');
  const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');
  
  // Filtrado y paginación
  const divorciosFiltrados = computed(() => {
    const filtrado = divorcios.value.filter(divorcio =>
      divorcio.nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase()) ||
      divorcio.apellidos.toLowerCase().includes(filtroBusqueda.value.toLowerCase()) ||
      divorcio.dni.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
    );
    const inicio = (paginaActual.value - 1) * filasPorPagina.value;
    return filtrado.slice(inicio, inicio + filasPorPagina.value);
  });
  
  const totalPaginas = computed(() => {
    const totalFilas = divorcios.value.filter(divorcio =>
      divorcio.nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase()) ||
      divorcio.apellidos.toLowerCase().includes(filtroBusqueda.value.toLowerCase()) ||
      divorcio.dni.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
    ).length;
    return Math.ceil(totalFilas / filasPorPagina.value);
  });
  
// Función para descargar PDF (de momento no realiza ninguna acción)
async function descargarPDF(divorcio) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4' // Formato A4
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 15;
    const marginY = 20;
    const lineHeight = 8;
    let currentY = marginY;

    // Título centrado y en negrita
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("AL JUZGADO DE PRIMERA INSTANCIA DE XXXXX QUE POR TURNO CORRESPONDA", pageWidth / 2, currentY, { align: 'center' });

    currentY += lineHeight + 5;

    // Párrafo introductorio
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    const textContent = [
      "Doña/don XXXXXXXXXXXXX, Procurador de los Tribunales y de don XXXXXXXXXXXXXX, mayores de edad, con DNI XXXXXXXX y XXXXXXXXX respectivamente, representación que se acreditará por medio de poder apud acta, que será otorgado en el momento procesal oportuno, y bajo la dirección letrada de doña Marina Ferreiro Aira, abogada del Ilustre Colegio de la Abogacía de Alicante, nº colegiada 8844, ante este Juzgado comparezco y, como mejor proceda en Derecho, DIGO:",
      `Que en la representación que ostento de don/doña ${divorcio.nombre} ${divorcio.apellidos} formulo la presente XXXXXXXXXXXXXX con el consentimiento de su todavía cónyuge doña/don XXXXXXXXXX con DNI de conformidad con lo establecido en los artículos 81 y siguientes del Código Civil a tenor del cauce y procedimiento establecido en el artículo 777 de la Ley de Enjuiciamiento Civil con base en los siguientes:`,
      "HECHOS",
      `PRIMERO. - Que doña/don ${divorcio.nombre} ${divorcio.apellidos} y don/doña xxxxxxxxxxx contrajeron legítimo matrimonio en fecha xx de xxxx de xxxx en la ciudad de xxxxx. Este matrimonio se encuentra inscrito en el Registro Civil de xxxx en el tomo xxxx página xxxx.`,
      "SEGUNDO. - Fruto de dicha unión ha nacido y vive/n un/unos hijo/s menor/es de edad cuyo/s nombre/s fecha/s de nacimiento y datos de inscripción en el Registro Civil son los que a continuación se indican: xxxxxxxxxxxxxxx nacido/s en fecha xx de xxxx de xxxx e inscrito su nacimiento en el Registro Civil de xxxx al tomo xxxx página xxxx.",
      "TERCERO. - El régimen económico matrimonial establecido es el de separación de bienes/gananciales ostentando ambos cónyuges en el momento de contraer nupcias la vecindad civil propia de xxxx.",
      "CUARTO. - Que por motivos y razones que no es necesario especificar en este acto ambas partes han decidido poner fin a su unión matrimonial. Por este motivo en fecha xxx de xxxx de xxxx las partes han pactado el correspondiente Convenio Regulador de Divorcio en atención con lo expuesto en el artículo 90 del Código Civil recogiéndose los efectos que derivan del presente divorcio.",
      "QUINTO. - Por todo lo hasta aquí expuesto los cónyuges arriba referenciados solicitan el auxilio judicial para poner fin al vínculo matrimonial que les une cumplimentando todos los formalismos requeridos para hacer de este divorcio un acto conforme Derecho."
    ];

    // Dibujar cada línea, respetando el espaciado
    textContent.forEach(paragraph => {
      const splitText = doc.splitTextToSize(paragraph, pageWidth - 2 * marginX); // Ajusta el texto al ancho de la página
      splitText.forEach(line => {
        if (currentY + lineHeight > doc.internal.pageSize.height - marginY) {
          doc.addPage(); // Nueva página si se supera el límite
          currentY = marginY; // Reiniciar Y
        }
        doc.text(line, marginX, currentY);
        currentY += lineHeight;
      });
      currentY += 5; // Espacio extra entre párrafos
    });

    // Información dinámica añadida al final
    currentY += 10; // Espacio antes de la información adicional
    doc.setFont("times", "bold");
    doc.text(`Nombre: ${divorcio.nombre}`, marginX, currentY);
    currentY += lineHeight;
    doc.text(`Apellidos: ${divorcio.apellidos}`, marginX, currentY);
    currentY += lineHeight;
    doc.text(`DNI: ${divorcio.dni}`, marginX, currentY);
    currentY += lineHeight;
    doc.text(`Ciudad: ${divorcio.ciudad}`, marginX, currentY);
    currentY += lineHeight;
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, marginX, currentY);

    // Guardar el PDF
    doc.save(`demanda_divorcio_${divorcio.id}.pdf`);

  } catch (error) {
    console.log('Error al generar el PDF:', error);
  }
}

  
  // Función para eliminar un divorcio
  async function confirmarEliminacion() {
    showModalConfirmacion.value = false;
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('eliminarDivorcio', true);
    requestBody.append('id', divorcioAEliminar.value.id); // Pasar el ID del divorcio a eliminar

    const response = await fetch(`${config.public.BASE_API_URL}/server.php`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const result = await response.json();

      if (result.success) {
        mensajeAlerta.value = 'Divorcio eliminado correctamente.';
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
        
        // Vuelve a cargar los divorcios
        await obtenerDivorcios();
      } else {
        mensajeAlerta.value = result.message;
        mostrarAlerta.value = true;
        colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
      }
    } else {
      mensajeAlerta.value = 'Error al eliminar el divorcio. Inténtalo de nuevo.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al eliminar el divorcio:', error);
    mensajeAlerta.value = 'Error de conexión. Inténtalo más tarde.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }

  // Ocultar la alerta después de unos segundos
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}
  
  // Simulación de la carga de datos (sería reemplazado por un fetch a la API)
  onMounted(() => {
    obtenerDivorcios();
  });
  
  // Mostrar el modal de confirmación de eliminación
  function solicitarConfirmacion(divorcio) {
    divorcioAEliminar.value = divorcio;
    showModalConfirmacion.value = true;
  }
  
  async function obtenerDivorcios() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getAllDivorcios', true); // Cambia el parámetro para obtener los divorcios

    const response = await fetch(`${config.public.BASE_API_URL}`, { // Cambia la URL a la que corresponda
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      divorcios.value = data; // Asigna los datos recibidos a la variable de divorcios
    } else {
      mensajeAlerta.value = 'Error al obtener los divorcios. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los divorcios:', error);
    mensajeAlerta.value = 'Error de conexión. Inténtalo más tarde.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000);
}

  function handleClose() {
    mostrarAlerta.value = false;
  }
  </script>
  