<template>
  <div>
    <!-- Mostrar el banner de cookies -->
    <CookieBanner />
    <!-- Mostrar slideshow si está activado -->
    <Slideshow v-if="slideActive" />
    <!-- Mostrar hero si está activado -->
    <Hero v-if="heroActive" />
    <!-- Mostrar cabecera inmobiliaria si está activado -->
    <UltimosInmuebles v-if="inmueblesActive"/>
    <!-- Mostrar las características si están activadas -->
    <Features v-if="featuresActive" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import CookieBanner from '~/components/CookieBanner.vue';
import Slideshow from '~/components/Slideshow.vue';
import Hero from '~/components/Hero.vue';
import UltimosInmuebles from '~/components/UltimosInmuebles.vue';
import Features from '~/components/Features.vue';

const config = useRuntimeConfig();
const title = ref('');
const description = ref('');
const heroActive = ref(false);
const slideActive = ref(false); // Estado para mostrar/ocultar el slideshow
const inmueblesActive = ref(false); // Estado para mostrar/ocultar el modulo inmuebles
const featuresActive = ref(false); // Estado para mostrar/ocultar las características

onBeforeMount(() => {
  obtenerSEO();
  obtenerHeroConfig();
  obtenerSlideConfig();
  obtenerConfiguracionSecciones();
  obtenerFeaturesConfig();
});

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
      useHead({
        title: title.value,
        meta: [{ name: 'description', content: description.value }],
      });
    } else {
      console.error('Error al obtener parámetros SEO.');
    }
  } catch (error) {
    console.error('Error al obtener parámetros SEO:', error);
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
    } else {
      console.error('Error al obtener la configuración del Hero.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración del Hero:', error);
  }
}

async function obtenerSlideConfig() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getSlideConfig', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      const data = await response.json();
      slideActive.value = data.slideActive === 1 || data.slideActive === '1' || data.slideActive === true;

    } else {
      console.error('Error al obtener la configuración del slideshow.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración del slideshow.', error);
  }
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
      const seccionInmuebles = data.find(seccion => seccion.nombre.toLowerCase() === 'módulo inmobiliario');
      if (seccionInmuebles) {
        inmueblesActive.value = seccionInmuebles.estado == 1 ? true : false;
      }
    } else {
      console.error('Error al obtener configuración de secciones.', error);
    }
  } catch (error) {
    console.error('Error al obtener configuración de secciones.', error);
  }
}

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
    } else {
      console.error('Error al obtener la configuración de features.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración de features.', error);
  }
}
</script>
