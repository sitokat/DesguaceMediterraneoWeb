<template>
  <transition name="slide-up">
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-50 bg-blue-700 text-white shadow-lg"
    >
      <div
        class="mx-auto max-w-6xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <!-- Texto + icono -->
        <div class="flex items-center gap-3 text-center sm:text-left">
          <span class="text-3xl" aria-hidden="true">🔑</span>
          <div>
            <p class="font-semibold text-sm sm:text-base">
              Estamos mejorando nuestros servicios
            </p>
            <p class="text-xs sm:text-sm text-blue-100">
              Esta web está en construcción. Seguimos trabajando para ofrecerte una mejor experiencia. 
              Algunas secciones pueden cambiar o no estar disponibles temporalmente.
            </p>
          </div>
        </div>

        <!-- Botón cerrar + contador -->
        <button
          type="button"
          @click="close"
          class="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-xs sm:text-sm font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          <span>Cerrar</span>
          <span
            class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-700 text-xs font-bold"
          >
            {{ remaining }}
          </span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
const remaining = ref(8)
let timer = null

const startCountdown = () => {
  visible.value = true
  timer = setInterval(() => {
    if (remaining.value <= 1) {
      close()
    } else {
      remaining.value -= 1
    }
  }, 1000)
}

const close = () => {
  visible.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  // Se lanza cuando la página ya está montada en el cliente
  startCountdown()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
