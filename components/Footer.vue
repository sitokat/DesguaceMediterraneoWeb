<template>
  <footer class="p-4 bg-slate-200 sm:p-6 dark:bg-gray-800">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <!-- Columna izquierda: logo + info de contacto -->
        <div class="mb-6 md:mb-0">
          <a href="/" class="flex items-center">
            <img :src="logoUrl" class="mr-3 h-8" alt="nombre" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ nombre }}</span>
          </a>

          <!-- === NUEVO: bloque con la info del banner === -->
          <div class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <!-- Teléfono -->
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-none text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M3 5a2 2 0 012-2h1.28a2 2 0 011.94 1.5l.47 1.88a2 2 0 01-.5 1.86L7.2 9.73a15.05 15.05 0 006.99 6.99l1.49-1.49a2 2 0 011.86-.5l1.88.47A2 2 0 0021 17.72V19a2 2 0 01-2 2h-.5C10.04 21 3 13.96 3 5.5V5z"/>
              </svg>
              <a href="tel:+34966710443" class="hover:underline">Tlf. 966 710 443</a>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-none text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:info@desguacemediterraneo.es" class="hover:underline">info@desguacemediterraneo.es</a>
            </div>

            <!-- Web -->
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-none text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.5 2.1 4 5.17 4 9s-1.5 6.9-4 9m0-18c-2.5 2.1-4 5.17-4 9s1.5 6.9 4 9M3 12h18"/>
              </svg>
              <a href="https://www.desguacemediterraneo.es" target="_blank" rel="noopener" class="hover:underline">
                www.desguacemediterraneo.es
              </a>
            </div>

            <!-- Dirección -->
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-none text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M12 11a4 4 0 100-8 4 4 0 000 8zm0 0c-5 0-9 3-9 8v2h18v-2c0-5-4-8-9-8z"/>
              </svg>
              <span>Pol. Ind. de los Azarbes, Avda. de la Coruña, 7 · 03150 Dolores (Alicante)</span>
            </div>

            <!-- WhatsApp: tres bloques -->
            <div class="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="https://wa.me/34607348680" target="_blank" rel="noopener"
                 class="flex items-center gap-2 rounded-lg border border-lime-300/70 p-2 hover:bg-lime-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 w-5 text-lime-600" aria-hidden="true">
                  <path fill="currentColor"
                    d="M380.9 97.1C339-...-38.8 96.4z"/>
                </svg>
                <div>
                  <div class="text-xs uppercase tracking-wide">Repuestos nave</div>
                  <div class="font-semibold">607 348 680</div>
                </div>
              </a>

              <a href="https://wa.me/34684087079" target="_blank" rel="noopener"
                 class="flex items-center gap-2 rounded-lg border border-lime-300/70 p-2 hover:bg-lime-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 w-5 text-lime-600" aria-hidden="true">
                  <path fill="currentColor"
                    d="M380.9 97.1C339-...-38.8 96.4z"/>
                </svg>
                <div>
                  <div class="text-xs uppercase tracking-wide">Repuestos campa</div>
                  <div class="font-semibold">684 087 079</div>
                </div>
              </a>

              <a href="https://wa.me/34604463724" target="_blank" rel="noopener"
                 class="flex items-center gap-2 rounded-lg border border-lime-300/70 p-2 hover:bg-lime-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 w-5 text-lime-600" aria-hidden="true">
                  <path fill="currentColor"
                    d="M380.9 97.1C339-...-38.8 96.4z"/>
                </svg>
                <div>
                  <div class="text-xs uppercase tracking-wide">Tasación y recogidas</div>
                  <div class="font-semibold">604 463 724</div>
                </div>
              </a>
            </div>
          </div>
          <!-- === FIN NUEVO === -->
        </div>

        <!-- Columna derecha: enlaces -->
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Recursos</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="#" class="hover:underline">Tipo 1</a>
              </li>
              <li>
                <a href="#" class="hover:underline">Tipo 2</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Síguenos</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li v-for="social in socialLinks" :key="social.id" class="flex items-center mb-4">
                <span class="mr-2" v-html="social.icono"></span>
                <a :href="social.url" target="_blank" class="hover:underline">{{ social.nombre }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-2">
                <NuxtLink to="/cookie" class="hover:underline">Cookies</NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink to="/privacy" class="hover:underline">Términos Legales</NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink to="/politica-privacidad" class="hover:underline">Política de Privacidad</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/condiciones-compra" class="hover:underline">Condiciones de Compra</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {{ currentYear }} <a href="/" class="hover:underline">{{ nombre }}</a>. {{ infoLegal }}
        </span>
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a v-for="social in socialLinks" :key="social.id" :href="social.url" target="_blank"
             class="text-gray-500 hover:text-gray-900 dark:hover:text-white" v-html="social.icono"></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig();
const logoUrl = ref('');
const nombre = ref('');
const infoLegal = ref('');
const socialLinks = ref([]);
const currentYear = new Date().getFullYear();

onMounted(() => {
  obtenerDatosFooter();
  obtenerRedesSociales();
});

async function obtenerDatosFooter() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getDatosIdentificacion', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      const data = await response.json();
      data.forEach(dato => {
        if (dato.nombre === 'logo') logoUrl.value = dato.valor;
        if (dato.nombre === 'titulo') nombre.value = dato.valor;
        if (dato.nombre === 'infolegal') infoLegal.value = dato.valor;
      });
    } else {
      console.error('Error al obtener los datos de identificación.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de identificación:', error);
  }
}

async function obtenerRedesSociales() {
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
</script>
