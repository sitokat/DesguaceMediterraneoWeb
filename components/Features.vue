<template>
  <div class="bg-white py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ featuresTitle }}</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ featuresP1 }}</p>
        <p class="mt-6 text-lg leading-8 text-gray-600">{{ featuresP2 }}</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div v-for="feature in features" :key="feature.name" class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                <component :is="feature.iconComponent" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ArrowPathIcon, UserGroupIcon, LockClosedIcon, DocumentCheckIcon } from '@heroicons/vue/24/outline';

const features = ref([]);
const featuresTitle = ref(''); // Nuevo ref para featurestitle
const featuresP1 = ref(''); // Nuevo ref para featuresp1
const featuresP2 = ref(''); // Nuevo ref para featuresp2
const config = useRuntimeConfig();

// Mapa para convertir los nombres de iconos en componentes
const iconMap = {
  'ArrowPathIcon': ArrowPathIcon,
  'UserGroupIcon': UserGroupIcon,
  'LockClosedIcon': LockClosedIcon,
  'DocumentCheckIcon': DocumentCheckIcon
};

onMounted(async () => {
  await obtenerFeatures();
});

// Función para obtener las features y ajustes desde la base de datos
async function obtenerFeatures() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getFeatures', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    if(response.ok) {
      const data = await response.json();
      // Asignar los valores obtenidos a las variables correspondientes
      features.value = data.features.map(feature => ({
        ...feature,
        iconComponent: iconMap[feature.icon] || UserGroupIcon
      }));
      // Asignar los valores de los textos a las variables
      featuresTitle.value = data.featurestitle;
      featuresP1.value = data.featuresp1;
      featuresP2.value = data.featuresp2;
    } else {
      console.error('Error al obtener las features.');
    }
  } catch (error) {
    console.error('Error al obtener las features:', error);
  }
}
</script>