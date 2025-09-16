<template>
  <div v-if="!cookiesAccepted" class="cookie-banner">
    <p>Usamos cookies para mejorar tu experiencia en nuestro sitio. Puedes configurar las cookies que deseas aceptar.</p>
    <!-- Botones de acción -->
    <div class="cookie-buttons">
      <button v-if="!configurando" @click="acceptAllCookies">Aceptar</button>
      <button v-if="!configurando" @click="configurarCookies">Configurar</button>
      <div v-if="configurando">
        <!-- Botones de configuración -->
        <div class="cookie-options">
          <label>
            <input v-model="cookies.tracking" type="checkbox" />
            <span>Seguimiento</span>
          </label>
          <label>
            <input v-model="cookies.marketing" type="checkbox" />
            <span>Marketing</span>
          </label>
        </div>
        <button @click="acceptSelectedCookies">Aceptar</button>
        <button @click="rejectCookies">Rechazar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCookie } from '#app'

const cookiesAccepted = useCookie('cookiesAccepted')
const cookiePreferences = useCookie('cookiePreferences', { default: () => ({ essential: true, tracking: false, marketing: false }) })
const cookies = cookiePreferences.value
const configurando = ref(false)

const acceptAllCookies = () => {
  cookiesAccepted.value = 'true'
  cookies.tracking = true
  cookies.marketing = true
  savePreferences()
}

const configurarCookies = () => {
  configurando.value = true
}

const acceptSelectedCookies = () => {
  cookiesAccepted.value = 'true'
  savePreferences()
}

const savePreferences = () => {
  cookiePreferences.value = cookies
  configurando.value = false
}

const rejectCookies = () => {
  cookiesAccepted.value = 'false'
  cookiePreferences.value = { essential: true, tracking: false, marketing: false }
  configurando.value = false
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 20px;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.cookie-options {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cookie-options label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.cookie-options input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.cookie-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.cookie-buttons button {
  background-color: #6c757d;
  border: none;
  border-radius: 50px;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cookie-buttons button:hover {
  background-color: #5a6268;
}
</style>