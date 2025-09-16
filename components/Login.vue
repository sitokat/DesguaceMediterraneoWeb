<template>
  <section class="h-screen">
    <div class="h-full">
      <div class="flex flex-col md:flex-row items-center justify-center h-screen">
        <!-- Columna izquierda con la imagen -->
        <div class="md:w-1/2 mb-4 md:mb-0 md:mr-4 mx-10 sm:px-12">
          <img src="../img/draw.webp" alt="Imagen de fondo" class="w-full h-auto md:h-full">
        </div>
        <!-- Columna derecha con el formulario -->
        <div class="w-full px-10 md:w-1/2 flex flex-col items-center justify-center md:pr-10">
          <h2 class="text-gray-700 text-2xl font-bold mb-4">Accede a tu cuenta</h2>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:max-w-lg" @submit.prevent="login">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
              <input id="email" v-model="email" :class="{ 'border-red-500': emailError }" :aria-invalid="emailError" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" @input="validateEmail" />
              <p v-if="emailError" class="text-red-500 text-xs italic">Por favor, introduce un email válido.</p>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
              <input id="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Contraseña" />
            </div>
            <div class="flex items-center justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full shadow-md transition duration-300" type="submit">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';

const email = ref('');
const password = ref('');
const emailError = ref(false);
const config = useRuntimeConfig();
const user = useCookie('user');
const recaptchaInstance = useReCaptcha();

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailRegex.test(email.value);
}

async function login() {
  await recaptchaInstance?.recaptchaLoaded();
  const recaptchaToken = await recaptchaInstance?.executeRecaptcha('login');

  if (!recaptchaToken) {
    console.error('Error al obtener el token de reCAPTCHA');
    return;
  }

  const requestBody = new URLSearchParams();
  requestBody.append('loginuser', true);
  requestBody.append('username', email.value);
  requestBody.append('password', password.value);
  requestBody.append('recaptcha_token', recaptchaToken);

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
      user.value = data.token;
      navigateTo('/admin/main');
    } else {
      console.error('Error al iniciar sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}
</script>