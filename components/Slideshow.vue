<template>
  <div
    v-if="slides.length > 0"
    class="relative w-full overflow-hidden"
    @mousedown="startDragging"
    @mousemove="onDragging"
    @mouseup="stopDragging"
    @mouseleave="stopDragging"
    @touchstart="startDragging"
    @touchmove="onDragging"
    @touchend="stopDragging"
    style="touch-action: none;" 
  >
    <!-- Slides -->
    <div
      ref="slideContainer"
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentSlideIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="min-w-full">
        <img
          :src="slide.url"
          alt="Slideshow image"
          class="w-full h-full object-cover"
          draggable="false"
        />
      </div>
    </div>

    <!-- Controles de navegación -->
    <button
      @click="handleButtonClick('prev')"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button
      @click="handleButtonClick('next')"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <!-- Indicadores -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <div
        v-for="(slide, index) in slides" :key="index"
        @click="handleIndicatorClick(index)"
        :class="[
          'cursor-pointer h-[4px] transition-all duration-300',
          currentSlideIndex === index ? 'bg-white w-8' : 'bg-gray-500 w-4'
        ]"
        class="rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = ref([]);
const currentSlideIndex = ref(0);
let startX = 0;
let currentX = 0;
let isDragging = false;
let wasDragged = false;
let slideInterval = null;

onMounted(async () => {
  await obtenerSlideConfig();
  startSlideShow();
});

onUnmounted(() => {
  stopSlideShow();
});

function startSlideShow() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopSlideShow() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

function nextSlide() {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length;
}

function prevSlide() {
  currentSlideIndex.value = (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length;
}

function goToSlide(index) {
  currentSlideIndex.value = index;
}

function startDragging(event) {
  stopSlideShow(); // Pausar el slideshow mientras se arrastra
  isDragging = true;
  wasDragged = false; // Resetear el flag al iniciar un nuevo arrastre
  startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  currentX = startX;
}

function onDragging(event) {
  if (!isDragging) return;
  const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  const deltaX = clientX - startX;

  if (Math.abs(deltaX) > 5) {
    wasDragged = true; // Marcar como arrastre si el movimiento es significativo
  }

  const slideContainer = event.target.closest('.relative').querySelector('.flex');
  slideContainer.style.transform = `translateX(calc(-${currentSlideIndex.value * 100}% + ${deltaX}px))`;

  currentX = clientX;
}

function stopDragging(event) {
  if (!isDragging) return;
  isDragging = false;

  const deltaX = currentX - startX;
  const threshold = window.innerWidth / 4; // Umbral para cambiar de slide (25% del ancho de la pantalla)

  if (wasDragged) {
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      goToSlide(currentSlideIndex.value);
    }
  }

  startSlideShow(); // Reanudar el slideshow
}

function handleButtonClick(direction) {
  if (wasDragged) return; // Evitar que el clic funcione después de un arrastre
  if (direction === 'prev') {
    prevSlide();
  } else {
    nextSlide();
  }
}

function handleIndicatorClick(index) {
  if (wasDragged) return; // Evitar que el clic funcione después de un arrastre
  goToSlide(index);
}

async function obtenerSlideConfig() {
  try {
    const response = await fetch(`${useRuntimeConfig().public.BASE_API_URL}`, {
      method: 'POST',
      body: new URLSearchParams({ getSlideConfig: true }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.ok) {
      const data = await response.json();
      slides.value = data.slides || [];
    } else {
      console.error('Error al obtener la configuración del slideshow.');
    }
  } catch (error) {
    console.error('Error al obtener la configuración del slideshow:', error);
  }
}
</script>
