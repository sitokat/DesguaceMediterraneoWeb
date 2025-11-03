<template>
  <div class="bg-white text-gray-900">
    <!-- HERO -->
    <section class="relative isolate overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-green-50 to-white"></div>
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Tasación y Baja de Vehículos
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Te compramos tu coche y gestionamos la baja definitiva en la DGT. Servicio rápido,
              100% legal y con garantía. Recogida a domicilio y pago inmediato.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <a href="#formulario" class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path fill-rule="evenodd" d="M2.25 12a.75.75 0 0 1 .75-.75h15.69l-5.22-5.22a.75.75 0 1 1 1.06-1.06l6.5 6.5a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 1 1-1.06-1.06l5.22-5.22H3a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
                Solicitar tasación
              </a>
              <a href="tel:+34604463724" class="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:border-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2 3h4l2 5-3 2c1.5 3 3.5 5 6.5 6.5l2-3 5 2v4c-5 0-9.5-2-13-5.5S2 8 2 3Z" />
                </svg>
                604463724
              </a>
              <a href="https://www.sigrauto.com/pdf/solbaja.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Descarga Doc. Baja CAT
            </a>
            </div>
            <div class="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-green-700"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                Pago inmediato
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-green-700"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                Recogida incluida
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-green-700"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                Gestión DGT
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
                <img src="/img/car1.jpg" alt="Coche en tasación" class="aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-inset ring-green-200" />
                <p class="mt-3 text-sm text-gray-500">Tu vehículo, sin complicaciones.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VENTAJAS / FEATURES -->
    <section aria-labelledby="features-title" class="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 id="features-title" class="text-base font-semibold leading-7 text-green-800">¿Por qué elegirnos?</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Rapidez, transparencia y tranquilidad</p>
        <p class="mt-6 text-lg leading-8 text-gray-600">Nos encargamos de todo: tasación, recogida, pago y baja definitiva. Sin letra pequeña.</p>
      </div>

      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
        <div v-for="(f, i) in featuresList" :key="i" class="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
              <font-awesome-icon :icon="f.icon" class="text-[18px]" />
            </span>
            <h3 class="text-lg font-semibold">{{ f.title }}</h3>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- PASOS -->
    <section aria-labelledby="steps-title" class="bg-green-50">
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 id="steps-title" class="text-base font-semibold leading-7 text-green-800">¿Cómo funciona?</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">4 pasos sencillos</p>
        </div>

        <ol class="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          <li v-for="(s, i) in stepsList" :key="i" class="relative rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div class="absolute -top-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">{{ i + 1 }}</div>
            <h4 class="mt-2 text-base font-semibold">{{ s.title }}</h4>
            <p class="mt-2 text-sm leading-6 text-gray-600">{{ s.desc }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- FORMULARIO -->
    <section id="formulario" aria-labelledby="form-title" class="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
      <div class="grid items-start gap-12 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <div class="rounded-2xl border border-green-100 p-6 shadow-sm">
            <h2 id="form-title" class="text-2xl font-bold tracking-tight">Solicita tu tasación</h2>
            <p class="mt-2 text-gray-600">Rellena el formulario y te responderemos con una valoración sin compromiso.</p>

            <form @submit.prevent="onTrySubmit" class="mt-8 space-y-6" novalidate>
              <!-- Honeypot -->
              <input v-model="form.hp" type="text" class="hidden" tabindex="-1" autocomplete="off" />

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="nombre" class="mb-2 block text-sm font-medium text-gray-700">Nombre y apellidos<span class="text-green-700"> *</span></label>
                  <input id="nombre" v-model.trim="form.nombre" @blur="validate" type="text" required class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" />
                  <p v-if="errors.nombre" class="mt-1 text-sm text-red-600">{{ errors.nombre }}</p>
                </div>
                <div>
                  <label for="telefono" class="mb-2 block text-sm font-medium text-gray-700">Teléfono<span class="text-green-700"> *</span></label>
                  <input id="telefono" v-model.trim="form.telefono" @blur="validate" type="tel" inputmode="tel" required class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" placeholder="600 123 456" />
                  <p v-if="errors.telefono" class="mt-1 text-sm text-red-600">{{ errors.telefono }}</p>
                </div>
                <div>
                  <label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" v-model.trim="form.email" @blur="validate" type="email" class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" placeholder="tucorreo@email.com" />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                </div>
                <div>
                  <label for="provincia" class="mb-2 block text-sm font-medium text-gray-700">Provincia<span class="text-green-700"> *</span></label>
                  <input id="provincia" v-model.trim="form.provincia" @blur="validate" type="text" required class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" />
                  <p v-if="errors.provincia" class="mt-1 text-sm text-red-600">{{ errors.provincia }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label for="marca" class="mb-2 block text-sm font-medium text-gray-700">Marca<span class="text-green-700"> *</span></label>
                  <input id="marca" v-model.trim="form.marca" @blur="validate" type="text" required class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" />
                  <p v-if="errors.marca" class="mt-1 text-sm text-red-600">{{ errors.marca }}</p>
                </div>
                <div>
                  <label for="modelo" class="mb-2 block text-sm font-medium text-gray-700">Modelo<span class="text-green-700"> *</span></label>
                  <input id="modelo" v-model.trim="form.modelo" @blur="validate" type="text" required class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" />
                  <p v-if="errors.modelo" class="mt-1 text-sm text-red-600">{{ errors.modelo }}</p>
                </div>
                <div>
                  <label for="matricula" class="mb-2 block text-sm font-medium text-gray-700">Matrícula</label>
                  <input id="matricula" v-model.trim="form.matricula" type="text" class="block w-full rounded-xl border-gray-300 uppercase tracking-widest focus:border-green-500 focus:ring-green-500" placeholder="0000 ABC" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label for="anio" class="mb-2 block text-sm font-medium text-gray-700">Año<span class="text-green-700"> *</span></label>
                  <input id="anio" v-model.number="form.anio" @blur="validate" type="number" min="1960" :max="new Date().getFullYear()" required class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" />
                  <p v-if="errors.anio" class="mt-1 text-sm text-red-600">{{ errors.anio }}</p>
                </div>
                <div>
                  <label for="km" class="mb-2 block text-sm font-medium text-gray-700">Kilometraje</label>
                  <input id="km" v-model.trim="form.km" type="text" inputmode="numeric" class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" placeholder="145.000" />
                </div>
                <div>
                  <label for="combustible" class="mb-2 block text-sm font-medium text-gray-700">Combustible</label>
                  <select id="combustible" v-model="form.combustible" class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500">
                    <option value="">Selecciona</option>
                    <option>Gasolina</option>
                    <option>Diésel</option>
                    <option>Híbrido</option>
                    <option>Eléctrico</option>
                    <option>GLP</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="estado" class="mb-2 block text-sm font-medium text-gray-700">Estado del vehículo</label>
                <select id="estado" v-model="form.estado" class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500">
                  <option value="">Selecciona</option>
                  <option>En marcha</option>
                  <option>Averiado</option>
                  <option>Sin ITV</option>
                  <option>Siniestrado</option>
                  <option>Incompleto</option>
                </select>
              </div>

              <div>
                <label for="comentarios" class="mb-2 block text-sm font-medium text-gray-700">Comentarios</label>
                <textarea id="comentarios" v-model.trim="form.comentarios" rows="4" class="block w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500" placeholder="Añade detalles relevantes: averías, golpes, documentación..."></textarea>
              </div>

              <div class="flex items-start gap-3">
                <input id="privacidad" v-model="form.privacidad" @change="validate" type="checkbox" class="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-600" />
                <label for="privacidad" class="text-sm text-gray-600">He leído y acepto la <NuxtLink to="/politica-privacidad" class="text-green-700 underline decoration-green-300 underline-offset-4 hover:text-green-800">política de privacidad</NuxtLink>.<span class="text-green-700"> *</span></label>
              </div>
              <p v-if="errors.privacidad" class="mt-1 text-sm text-red-600">{{ errors.privacidad }}</p>

              <div class="flex items-center gap-4">
                <button type="submit" :disabled="loading" @click.prevent="onTrySubmit" :class="['inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition', (!canSubmit || loading) ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' : 'bg-green-600 text-white hover:bg-green-700']">
                    <span>{{ loading ? 'Enviando…' : 'Solicitar tasación' }}</span>
                </button>
                <p v-if="ok" class="text-sm text-green-700">¡Gracias! Te contactaremos muy pronto.</p>
                <p v-if="srvError" class="text-sm text-red-600">Lo sentimos, ha ocurrido un error. Inténtalo más tarde.</p>
              </div>
            </form>
          </div>
        </div>

        <aside class="lg:col-span-2">
          <div class="sticky top-6 rounded-2xl border border-green-100 p-6 shadow-sm">
            <h3 class="text-lg font-semibold">Documentación necesaria</h3>
            <ul class="mt-4 space-y-3 text-sm text-gray-600">
                <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'check']" class="mt-0.5 h-5 w-5 text-green-700" />
                DNI/NIE del titular.
                </li>
                <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'check']" class="mt-0.5 h-5 w-5 text-green-700" />
                Permiso de circulación.
                </li>
                <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'check']" class="mt-0.5 h-5 w-5 text-green-700" />
                Ficha técnica (ITV).
                </li>
                <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'check']" class="mt-0.5 h-5 w-5 text-green-700" />
                Llaves disponibles.
                </li>
            </ul>
            <div class="mt-6 rounded-xl bg-green-50 p-4 text-sm text-gray-700 ring-1 ring-inset ring-green-100">
              <p class="font-medium">¿No tienes todo?</p>
              <p class="mt-1">Cuéntanos tu caso. Buscamos alternativas para ayudarte con la gestión.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- FAQ -->
    <section aria-labelledby="faq-title" class="bg-green-50">
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 id="faq-title" class="text-base font-semibold leading-7 text-green-800">Preguntas frecuentes</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resolvemos tus dudas</p>
        </div>

        <div class="mx-auto mt-12 max-w-3xl divide-y divide-green-100 rounded-2xl border border-green-100 bg-white">
          <div>
            <details v-for="(item, i) in faqs" :key="i" class="group px-6 py-5 transition hover:bg-green-50/60 open:bg-green-50/60">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
                <h4 class="text-base font-semibold">{{ item.q }}</h4>
                <svg class="h-5 w-5 text-gray-500 transition group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
                </summary>
                <div class="mt-3 text-sm leading-6 text-gray-600">
                {{ item.a }}
                </div>
            </details>
            </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="relative isolate overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-green-50 to-white"></div>
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div class="grid items-center gap-8 rounded-2xl border border-green-100 bg-white p-8 shadow-sm lg:grid-cols-3">
          <div class="lg:col-span-2">
            <h3 class="text-2xl font-bold tracking-tight">¿Listo para dar de baja tu vehículo?</h3>
            <p class="mt-2 text-gray-600">Solicita una tasación sin compromiso y nos ocupamos de todo el proceso.</p>
          </div>
          <div class="flex justify-start lg:justify-end">
            <a href="#formulario" class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700">Empieza ahora</a>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-black/40" @click="showModal=false"></div>
  <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
    <div class="flex items-start gap-3">
      <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        <font-awesome-icon :icon="['fas','check']" class="h-5 w-5 text-green-700" />
      </span>
      <div>
        <h3 class="text-lg font-semibold">¡Solicitud enviada!</h3>
        <p class="mt-1 text-sm text-gray-600">Te contactaremos muy pronto para la valoración.</p>
      </div>
    </div>
    <div class="mt-6 flex justify-end gap-3">
      <button type="button" class="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700" @click="showModal=false">Aceptar</button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineComponent, computed } from 'vue'
import { useHead, useRuntimeConfig } from '#imports'

// SEO meta
useHead({
  title: 'Tasación y Baja de Vehículos | Pago Inmediato y Baja DGT',
  meta: [
    { name: 'description', content: 'Tasamos tu coche y gestionamos la baja definitiva en la DGT. Recogida a domicilio y pago inmediato. Servicio rápido, legal y sin complicaciones.' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Tasación y Baja de Vehículos',
        areaServed: 'España',
        provider: {
          '@type': 'LocalBusiness',
          name: 'Tu Empresa',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Tasación gratuita y gestión de baja en DGT',
        },
      }),
    },
  ],
})

const config = useRuntimeConfig()

const loading = ref(false)
const ok = ref(false)
const srvError = ref(false)
const showModal = ref(false)

const form = reactive({
  hp: '', // honeypot
  nombre: '',
  telefono: '',
  email: '',
  provincia: '',
  marca: '',
  modelo: '',
  matricula: '',
  anio: '',
  km: '',
  combustible: '',
  estado: '',
  comentarios: '',
  privacidad: false,
})

const errors = reactive({})

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.nombre) errors.nombre = 'El nombre es obligatorio.'
  if (!/^\+?\d[\d\s-]{6,}$/.test(form.telefono)) errors.telefono = 'Introduce un teléfono válido.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email no válido.'
  if (!form.provincia) errors.provincia = 'Indica la provincia.'
  if (!form.marca) errors.marca = 'La marca es obligatoria.'
  if (!form.modelo) errors.modelo = 'El modelo es obligatorio.'
  const currentYear = new Date().getFullYear()
  if (!form.anio || Number(form.anio) < 1960 || Number(form.anio) > currentYear) errors.anio = 'Año no válido.'
  if (!form.privacidad) errors.privacidad = 'Debes aceptar la política de privacidad.'
  return Object.keys(errors).length === 0
}

function onTrySubmit() {
   // Dispara validación para rellenar el objeto `errors` y pintar mensajes
   const isValid = validate();
   if (!isValid) return;     // hay errores -> se muestran en los <FieldError>
   enviar();                 // válido -> hacemos el POST
}

 const canSubmit = computed(() => {
  const currentYear = new Date().getFullYear()
  const telOk = /^\+?\d[\d\s-]{6,}$/.test(form.telefono)
  const emailOk = !form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  return (
    form.nombre &&
    form.telefono && telOk &&
    form.provincia &&
    form.marca &&
    form.modelo &&
    form.anio && Number(form.anio) >= 1960 && Number(form.anio) <= currentYear &&
    emailOk &&
    form.privacidad === true
  )
})

async function enviar() {
  srvError.value = false
  ok.value = false
  if (form.hp) return // bot
  if (!validate()) return

  loading.value = true
  try {
    const body = new URLSearchParams()
    body.append('tasacionSubmit', '1')
    Object.entries(form).forEach(([k, v]) => {
      if (k !== 'hp') body.append(k, String(v ?? ''))
    })

    const res = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    if (!res.ok) throw new Error('HTTP ' + res.status)

    const data = await res.json().catch(() => ({}))
    ok.value = Boolean(data.ok ?? true)
    if (!ok.value) throw new Error('Respuesta no válida')
    showModal.value = true

    Object.assign(form, {
      hp: '', nombre: '', telefono: '', email: '', provincia: '', marca: '', modelo: '', matricula: '', anio: '', km: '', combustible: '', estado: '', comentarios: '', privacidad: false,
    })
  } catch (e) {
    srvError.value = true
  } finally {
    loading.value = false
  }
}

// FEATURES & STEPS & FAQ DATA
const featuresList = [
  { icon: ['fas','money-bill-wave'], title: 'Pago inmediato',   desc: 'Transferencia o bizum al retirar el vehículo, sin esperas.' },
  { icon: ['fas','truck'],           title: 'Recogida gratuita', desc: 'Vamos a tu domicilio o taller. Coordinamos fecha y franja horaria.' },
  { icon: ['fas','shield-halved'],   title: 'Baja en DGT',       desc: 'Tramitamos la baja definitiva y te entregamos el justificante oficial.' },
]

const stepsList = [
  { title: 'Rellena el formulario', desc: 'Datos básicos del coche y tus datos de contacto.' },
  { title: 'Tasación rápida', desc: 'Te damos precio en el mismo día laboral.' },
  { title: 'Recogida y pago', desc: 'Agendamos la retirada y realizamos el pago al instante.' },
  { title: 'Baja definitiva', desc: 'Gestionamos la baja en la DGT y te enviamos el justificante.' },
]

const faqs = [
  { q: '¿Cuánto tardáis en tasar mi vehículo?', a: 'En horario laboral, respondemos normalmente en 24/48h. En ocasiones, en el mismo día.' },
  { q: '¿Cómo se realiza el pago?', a: 'Pago inmediato por transferencia o bizum en el momento de la retirada. También podemos adaptarnos a tus necesidades.' },
  { q: '¿La recogida está incluida?', a: 'Sí. Coordinamos la recogida en tu domicilio, taller o donde se encuentre el vehículo, sin coste adicional en la mayoría de zonas.' },
  { q: '¿Gestionáis la baja en la DGT?', a: 'Sí. Nos ocupamos de todo el trámite y te enviamos el justificante oficial de baja definitiva.' },
  { q: '¿Aceptáis vehículos sin ITV o averiados?', a: 'Sí. Valoramos vehículos en cualquier estado: siniestrados, averiados, sin ITV o incompletos.' },
]
</script>

<style scoped>
details[open] summary { outline: none; }
</style>