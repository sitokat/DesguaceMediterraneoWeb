<template>
  <aside class="w-64 min-h-screen rounded-r-lg bg-gray-800 relative" aria-label="Sidebar">
    <div class="overflow-y-auto py-4 px-3">
      <div class="text-center py-2 border-b border-gray-700">
        <h3 class="text-white text-lg font-light">Admin Panel <font-awesome-icon icon="tachometer-alt" class="w-4 h-4 inline" /></h3>
      </div>
      <ul class="mt-4 space-y-2">
        <li v-for="option in menuOptions" :key="option.id" class="pt-2">
          <!-- Condición para opciones principales -->
          <nuxt-link v-if="!option.subOptions" :to="option.route" class="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 cursor-pointer uppercase">
            <font-awesome-icon :icon="option.icon" class="w-6 h-6 mr-3" />{{ option.nombre }}
          </nuxt-link>
          <!-- Condición para opciones con subopciones -->
          <a v-else class="flex justify-between items-center p-2 text-white rounded-lg hover:bg-gray-700 cursor-pointer uppercase" @click="toggleDropdown(option.id)">
            <span class="flex items-center">
              <font-awesome-icon :icon="option.icon" class="w-6 h-6 mr-3" />{{ option.nombre }}
            </span>
            <font-awesome-icon icon="chevron-down" class="w-4 h-4 transition-transform duration-500" :class="{'rotate-180': dropdownStatus[option.id]}" />
          </a>
          <!-- Subopciones -->
          <transition v-if="option.subOptions" name="fade" mode="out-in">
            <ul v-show="dropdownStatus[option.id]" class="pl-6 pt-2 space-y-1">
              <li v-for="subOption in option.subOptions" :key="subOption.nombre" class="hover:bg-gray-600 hover:rounded-md cursor-pointer">
                <nuxt-link :to="subOption.route" class="block py-1 px-2 text-white">
                  {{ subOption.nombre }}
                </nuxt-link>
              </li>
            </ul>
          </transition>
        </li>
        <!-- Nueva opción: Contenido Estático -->
        <li>
          <nuxt-link to="/admin/contenido-estatico" class="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 cursor-pointer uppercase">
            <font-awesome-icon icon="file-alt" class="w-6 h-6 mr-3" />
            Contenido Estático
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="absolute bottom-5 w-full px-3">
      <button class="w-full flex items-center justify-center p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300 hover:scale-105" @click="logout">
        <font-awesome-icon icon="sign-out-alt" class="w-6 h-6 mr-2" />
        Salir
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();
const menuOptions = ref([]);
const dropdownStatus = reactive({});

const logout = () => {
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  navigateTo('/');
};

const toggleDropdown = (optionId) => {
  dropdownStatus[optionId] = !dropdownStatus[optionId];
};

const fetchMenuOptions = async () => {
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

      // Filtrar solo las opciones principales con estado = 1 y agregar subopciones manualmente
      const dynamicOptions = data
        .filter(section => section.estado == 1)
        .map(section => {
          if (section.nombre.toLowerCase() === 'blog') {
            return {
              id: `option${section.id}`,
              nombre: section.nombre,
              icon: 'blog',
              subOptions: [
                { nombre: 'Administrar Categorías', route: '/admin/admcatblog' },
                { nombre: 'Administrar Posts', route: '/admin/admpostblog' }
              ]
            };
          } else if (section.nombre.toLowerCase() === 'módulo inmobiliario') {
            return {
              id: `option${section.id}`,
              nombre: section.nombre,
              icon: 'building',
              subOptions: [
                { nombre: 'Administrar Inmuebles', route: '/admin/admmoduloinmobiliario' }
              ]
            };
          } else if (section.nombre.toLowerCase() === 'servicios express') {
            return {
              id: `option${section.id}`,
              nombre: section.nombre,
              icon: 'building',
              subOptions: [
                { nombre: 'Ver divorcios', route: '/admin/admdivorciosexpress' }
              ]
            };
          } else {
            return {
              id: `option${section.id}`,
              nombre: section.nombre,
              icon: 'home',
              route: `/admin/${section.nombre.toLowerCase()}`
            };
          }
        });

      // Agregar la opción de Inicio manualmente
      menuOptions.value = [
        {
          id: 'option0',
          nombre: 'Inicio',
          icon: 'home',
          route: '/admin/main'
        },
        ...dynamicOptions
      ];
    } else {
      console.error('Error al obtener las opciones del menú');
    }
  } catch (error) {
    console.error('Error al obtener las opciones del menú:', error);
  }
};

onMounted(fetchMenuOptions);
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>