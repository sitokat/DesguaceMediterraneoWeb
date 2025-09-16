<template>
  <div>
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Ponte en contacto con nosotros</h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">¿Tienes alguna duda? ¿Deseas mas información sobre nuestros servicios? ¿Quieres detalles sobre nuestro método de trabajo? Déjanos un mensaje y expon tu caso, te asesoraremos ajustandonos a tus necesidades.</p>
        <form class="space-y-8" @submit.prevent="enviarFormulario">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tu email</label>
            <input id="email" v-model="email" type="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="hola@quieneres.com" required>
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Asunto</label>
            <input id="subject" v-model="motivo" type="text" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Indica brevemente el motivo de tu consulta" required>
          </div>
          <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teléfono</label>
            <input id="subject" v-model="telefono" type="number" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Indícanos tu número de teléfono" required>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Déjanos tu mensaje</label>
            <textarea id="message" v-model="mensaje" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Explica en detalle tu caso..."></textarea>
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-sky-600 w-full hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Enviar Mensaje</button>
        </form>
      </div>
    </section>
    <Modal :show="show" @close="handleClose" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const close = ref('');
const config = useRuntimeConfig();
const email = ref('');
const motivo = ref('');
const telefono = ref('');
const mensaje = ref('');
const show = ref(false);

function openModal() {
  show.value = true;
}

const handleClose = (text) => {
  close.value = text; // Asignamos el texto recibido a la referencia close, sep uede hacer en @close="close = $event" si lo que queremos es retornar solo el valor
  if(close.value === 'cerrar') {
    show.value = false;
  }
};

async function enviarFormulario() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('sendcontacto', true);
    requestBody.append('email', email.value);
    requestBody.append('motivo', motivo.value);
    requestBody.append('telefono', telefono.value);
    requestBody.append('mensaje', mensaje.value);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      show.value = true;
      email.value = '';
      motivo.value = '';
      telefono.value = '';
      mensaje.value = '';
      openModal();
    } else {
      // Manejar errores si la respuesta no es OK
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}
</script>