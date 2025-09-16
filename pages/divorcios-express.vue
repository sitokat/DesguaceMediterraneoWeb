<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="gap-16 items-center py-6 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:pt-6 lg:px-6">
      <!-- Sección de Presentación -->
      <div class="mb-10 mt-20 lg:mb-2">
        <div class="relative">
          <!-- Imagen con efecto fade-in más rápido -->
          <img
            :src="currentImage"
            alt="Divorcio Express"
            class="w-full opacity-0 animate-fade-in"
          />
          <!-- Texto de Presentación con animación de izquierda a derecha más rápida -->
          <div class="absolute -top-20 left-0 p-4 opacity-0 animate-text-slide-in">
            <h1 class="text-3xl lg:text-5xl font-bold text-gray-900">Divorcio Express</h1>
            <p class="mt-2 text-xl text-gray-700">Rápido, sencillo y 100% legal.</p>
          </div>
        </div>
      </div>

      <!-- Sección de Contenido Dinámico -->
      <div>
        <transition name="slide-fade" mode="out-in">
          <!-- Pantalla de Introducción - Paso 0 -->
          <div v-if="step === 0" key="step0" class="space-y-4 text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Gestiona tu divorcio de forma rápida</h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Ofrecemos un servicio profesional y ágil para tramitar tu divorcio de forma rápida y sencilla. Evita trámites complicados y enfócate en lo que realmente importa.
            </p>
            <button @click="nextStep" class="w-full px-5 py-3 mt-8 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-transform duration-200 animate-button-slide-in">
              Comenzar Proceso
              <span class="ml-2 inline-block transition-transform duration-200 transform group-hover:translate-x-1">
                ➔
              </span>
            </button>
          </div>

          <!-- Formulario - Fase 1 -->
          <div v-else-if="step === 1" key="step1" class="space-y-4">
            <form @submit.prevent="nextStep">
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                <input v-model="formData.nombre" type="text" id="nombre" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!formData.nombre" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div>
                <label for="apellidos" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Apellidos</label>
                <input v-model="formData.apellidos" type="text" id="apellidos" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!formData.apellidos" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div>
                <label for="dni" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">DNI</label>
                <input v-model="formData.dni" @input="validateDNI" type="text" id="dni" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!dniValido && formData.dni" class="text-sm text-red-600 mt-1">DNI no válido. Por favor, verifica los datos.</p>
                <p v-if="!formData.dni" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div class="flex items-center mt-4">
                <input v-model="privacyAccepted" id="privacy" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                <label for="privacy" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Acepto la <a href="/politica-privacidad" class="text-blue-600 underline">política de privacidad</a>
                </label>
              </div>
              <button type="submit" :disabled="!dniValido || !privacyAccepted || !formData.nombre || !formData.apellidos || !formData.dni" class="w-full px-5 py-3 mt-4 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-transform duration-200 disabled:bg-gray-400">
                Continuar
              </button>
            </form>
          </div>

          <!-- Formulario - Fase 2 -->
          <div v-else-if="step === 2" key="step2" class="space-y-4">
            <form @submit.prevent="handleStep2">
              <div>
                <label for="domicilio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Su actual domicilio</label>
                <input v-model="formData.domicilio" type="text" id="domicilio" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!formData.domicilio" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div>
                <label for="fechaMatrimonio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Fecha en que se contrajo el matrimonio</label>
                <input v-model="formData.fechaMatrimonio" type="date" id="fechaMatrimonio" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!formData.fechaMatrimonio" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">¿Hay hijos?</label>
                <div class="flex items-center space-x-4">
                  <button type="button" @click="formData.hijos = 'SI'" :class="{'bg-blue-600 text-white': formData.hijos === 'SI', 'bg-gray-200': formData.hijos !== 'SI'}" class="px-4 py-2 rounded-lg">Sí</button>
                  <button type="button" @click="formData.hijos = 'NO'" :class="{'bg-blue-600 text-white': formData.hijos === 'NO', 'bg-gray-200': formData.hijos !== 'NO'}" class="px-4 py-2 rounded-lg">No</button>
                </div>
                <p v-if="!formData.hijos" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div>
                <label for="telefono" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Teléfono de contacto</label>
                <input v-model="formData.telefono" type="tel" id="telefono" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!formData.telefono" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Email de contacto</label>
                <input v-model="formData.email" @input="validateEmail" type="email" id="email" class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
                <p v-if="!emailValido && formData.email" class="text-sm text-red-600">Email no válido</p>
                <p v-if="!formData.email" class="text-sm text-red-600">Campo Obligatorio</p>
              </div>
              <button type="submit" :disabled="!emailValido || !formData.domicilio || !formData.fechaMatrimonio || !formData.hijos || !formData.telefono || !formData.email" class="w-full px-5 py-3 mt-4 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-transform duration-200 disabled:bg-gray-400">
                Continuar
              </button>
            </form>
          </div>
          <!-- Paso 3: Resumen -->
<div v-else-if="step === 3" key="step3" class="p-6 bg-white rounded-lg shadow-md border border-gray-300">
  <h2 class="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Resumen de Compra</h2>

  <!-- Concepto -->
  <div class="flex justify-between mb-2">
    <span class="text-gray-700 font-medium">Concepto:</span>
    <span class="text-gray-900">{{ resumenConcepto }}</span>
  </div>

  <!-- Importe -->
  <div class="flex justify-between mb-2">
    <span class="text-gray-700 font-medium">Importe:</span>
    <span class="text-gray-900">{{ resumenImporte }} €</span>
  </div>

  <!-- IVA -->
  <div class="flex justify-between mb-2">
    <span class="text-gray-700 font-medium">IVA (21%):</span>
    <span class="text-gray-900">{{ iva }} €</span>
  </div>

  <!-- Total -->
  <div class="flex justify-between mb-4 border-t pt-2">
    <span class="text-gray-700 font-bold">Total:</span>
    <span class="text-gray-900 font-bold">{{ total }} €</span>
  </div>

  <!-- Aceptar condiciones -->
  <div class="flex items-center mb-4">
    <input 
      id="aceptar" 
      v-model="aceptoCondiciones" 
      type="checkbox" 
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
    <label for="aceptar" class="ml-2 text-sm text-gray-700">
      Acepto las <a href="/condiciones-compra" target="_blank" class="text-blue-600 underline">condiciones de compra</a>
    </label>
  </div>

  <!-- Botón de Pagar -->
  <button
    @click="iniciarPago"
    :disabled="!aceptoCondiciones"
    class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Pagar {{ total }} €
  </button>
</div>

        </transition>
      </div>
    </div>
    <!-- Modal de Confirmación -->
    <Modal :show="showModal" @close="closeModal" :message="modalMessage"></Modal>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const step = ref(0); // Empieza en 0 para mostrar el paso de introducción
const formData = ref({
  nombre: '',
  apellidos: '',
  dni: '',
  domicilio: '',
  fechaMatrimonio: '',
  hijos: '',
  telefono: '',
  email: ''
});
const dniValido = ref(true); // Estado del DNI
const emailValido = ref(true); // Estado del email
const privacyAccepted = ref(false);
const showModal = ref(false);
const modalMessage = ref('');
const aceptoCondiciones = ref(false);

const iniciarPago = async () => {
  try {
    // Crear los parámetros a enviar al backend
    const requestBody = new URLSearchParams();
    requestBody.append('realizarPago', true); // Indica que se trata de una solicitud de pago
    requestBody.append('importe', total.value); // Monto total del pago (ya calculado en el front)

    // Enviar la solicitud al backend
    const response = await fetch(`${useRuntimeConfig().public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP: ${response.status}, ${errorText}`);
    }

    // Obtener el formulario HTML generado por el backend
    const html = await response.text();

    // Inyectar el formulario en el DOM y enviarlo automáticamente
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    const form = container.querySelector('#redsysForm');
    if (form) {
      form.submit(); // Enviar el formulario automáticamente
    } else {
      throw new Error('No se encontró el formulario de Redsys en la respuesta del backend.');
    }
  } catch (error) {
    // Manejar errores
    console.error('Error al procesar el pago:', error);
    alert('Hubo un error al iniciar el proceso de pago. Por favor, inténtalo de nuevo.');
  }
};

const resumenConcepto = computed(() =>
  formData.value.hijos === 'SI' ? 'Demanda Divorcio Express (con hijos)' : 'Demanda Divorcio Express (sin hijos)'
);

const resumenImporte = computed(() => (formData.value.hijos === 'SI' ? 235 : 200));
const iva = computed(() => (resumenImporte.value * 0.21).toFixed(2));
const total = computed(() => (resumenImporte.value + parseFloat(iva.value)).toFixed(2));

const handleStep2 = async () => {
  await submitForm(); // Llama a la función de envío
  nextStep(); // Avanza al siguiente paso
};

const nextStep = () => {
  step.value++;
};

const prevStep = () => {
  step.value--;
};

// Computed property to change the image based on the step
const currentImage = computed(() => {
  if (step.value === 0) {
    return "/img/divorcio1.png";  // Image for step 0
  } else if (step.value === 1) {
    return "/img/divorcio1.png";  // Image for step 1
  }
  return "/img/divorcio1.png";  // Default image for all steps
});

// Función para validar el DNI
const validateDNI = () => {
  const dni = formData.value.dni.toUpperCase();
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const regex = /^\d{8}[A-Z]$/;

  if (!regex.test(dni)) {
    dniValido.value = false;
  } else {
    const numero = dni.slice(0, 8);
    const letra = dni.slice(8, 9);
    dniValido.value = letras[numero % 23] === letra;
  }
};

// Función para validar el formato de email
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValido.value = emailRegex.test(formData.value.email);
};

// Función para enviar el formulario
const submitForm = async () => {
  try {
    // Crear los parámetros a enviar con los datos del formulario
    const requestBody = new URLSearchParams();
    requestBody.append('insertaDivorcio', true);
    requestBody.append('nombre', formData.value.nombre);
    requestBody.append('apellidos', formData.value.apellidos);
    requestBody.append('dni', formData.value.dni);
    requestBody.append('domicilio', formData.value.domicilio);
    requestBody.append('fecha_matrimonio', formData.value.fechaMatrimonio);
    requestBody.append('hijos', formData.value.hijos);
    requestBody.append('telefono', formData.value.telefono);
    requestBody.append('email', formData.value.email);

    // Enviar los datos al backend
    const response = await fetch(`${useRuntimeConfig().public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // Verificar si la respuesta es exitosa (status 200-299)
    if (!response.ok) {
      // Aquí puedes manejar los códigos de estado HTTP no exitosos
      const errorText = await response.text(); // Obtener el cuerpo en texto para inspección
      throw new Error(`Error HTTP: ${response.status}, ${errorText}`);
    }

    // Verificar si la respuesta es JSON
    const data = await response.json();

    // Revisar si el backend envió status 'ok'
    if (data.status === 'ok') {
      //modalMessage.value = 'Proceso completado correctamente, demanda en redacción, nos pondremos en contacto contigo al teléfono indicado en el proceso.';
      //showModal.value = true;  // Mostrar el modal de confirmación
    } else {
      alert(`Error en el servidor: ${data.message}`);  // Mostrar el mensaje de error del servidor
    }

  } catch (error) {
    // Manejar errores de conexión o respuesta
    console.error('Error en la conexión o en el servidor:', error);
    alert('Error en la conexión con el servidor. Detalles: ' + error.message);
  }
};

// Cerrar el modal
const closeModal = () => {
  showModal.value = false;
   // Limpiar los datos del formulario
   formData.value = {
    nombre: '',
    apellidos: '',
    dni: '',
    domicilio: '',
    fechaMatrimonio: '',
    hijos: '',
    telefono: '',
    email: ''
  };

  // Volver al paso inicial (paso 0)
  step.value = 0;

  // Resetear los estados de validación
  dniValido.value = true;
  emailValido.value = true;
  privacyAccepted.value = false;
};
</script>

<style>
/* Animación para fade-in más rápida */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in forwards;
}

/* Animación para el texto que aparece de izquierda a derecha más rápida */
@keyframes textSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  80% {
    opacity: 1;
    transform: translateX(5%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-text-slide-in {
  animation: textSlideIn 0.5s ease-out forwards 1.1s;
}

/* Animación para el botón Comenzar Proceso */
@keyframes buttonSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-button-slide-in {
  animation: buttonSlideIn 1.5s ease-out forwards 1.5s;
  opacity: 0;
  animation-fill-mode: forwards;
}

/* Transición entre steps */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Hover sobre el botón */
button:hover {
  transform: scale(1.05);
}

.transition-transform {
  transition-property: transform;
  transition-duration: 200ms;
}
</style>
