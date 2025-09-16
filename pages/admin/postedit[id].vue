<template>
  <Alerta :mostrar="mostrarAlerta" :mensaje="mensajeAlerta" :color="colorAlerta" @close="handleClose" />
  <div class="m-4 md:m-8 lg:m-12 xl:m-16">
    <div class="w-full p-6 bg-white rounded-lg shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Edición de Post Blog</h1>
        <button v-if="post" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-110 transition transform duration-300" @click="cambiarEstadoPost">
          <font-awesome-icon :icon="post.publicado == 1 ? 'fa-file-alt' : 'fa-file-upload'" class="mr-2" />
          {{ post.publicado == 1 ? 'Pasar a Borrador' : 'Publicar' }}
        </button>
      </div>
    </div>
    <div v-if="post">
      <div class="w-full p-6 bg-white rounded-lg shadow-lg">
        <!-- Fila para Título, Resumen y Botón/Subida de Imagen -->
        <div class="flex flex-wrap -mx-3 mb-6">
          <!-- Columna para Título -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="titulo">Título - Obligatorio</label>
            <input id="titulo" v-model="post.titulo" type="text" placeholder="Título del post" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Columna para Resumen -->
          <div class="w-full md:w-1/2 px-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="resumen">Resumen - Obligatorio</label>
            <textarea id="resumen" v-model="post.resumen" placeholder="Resumen del post" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <!-- Columna para Meta Titulo -->
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="metatitulo">Meta Título - SEO - Obligatorio</label>
            <input id="titulo" v-model="post.title" type="text" placeholder="Introduce el nuevo meta título para SEO, recomendado un máximo de 70 caracteres." class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <!-- Columna para Resumen -->
          <div class="w-full md:w-1/2 px-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="metadescription">Meta Description - SEO - Obligatorio</label>
            <textarea id="resumen" v-model="post.description" placeholder="Introduce la nueva meta description para SEO, recomendado un máximo de 150 caracteres." class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <!-- Columna para Botón/Subida de Imagen -->
          <div class="w-full px-3">
            <input type="file" data-tipofoto="miniatura" @change="selectLocalImage">
            <!-- Contenedor para la imagen miniatura -->
            <div v-if="post.imagen_mini">
              <img :src="post.imagen_mini" alt="miniatura" class="w-32 h-32 rounded-md shadow-lg">
            </div>
          </div>
        </div>
        <!-- Contenedor de dos columnas para selectores -->
        <div class="flex space-x-4 mb-4">
          <!-- Selector de Categoría -->
          <div class="flex-1">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="categoria">Categoría</label>
            <select id="categoria" v-model="post.categoria_id" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
          </div>
          <!-- Selector de Tipo de Post -->
          <div class="flex-1">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="tipoPost">Tipo de Post</label>
            <select id="tipoPost" v-model="post.tipopost" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="1">Recomendado</option>
              <option value="2">Destacado</option>
              <!--<option value="3">Principal</option>
              <option value="3">Normal</option>-->
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="contenido">Contenido</label>
          <!-- Componente element-tiptap para el contenido del post -->
          <client-only>
            <QuillEditor :id="post.id" v-model="post.contenido" :fecha="post.fecha" @image-uploaded="handleImageUploaded" />
          </client-only>
        </div>

        <label v-if="imagenesDisponibles.length > 0" class="block text-gray-700 text-sm font-bold mb-2">Imágenes Disponibles</label>
        <p v-if="imagenesDisponibles.length > 0">Las imagenes que se muestran a continuación han sido subidas al servidor y pertenecen a este post, puedes eleminarlas si no las necesitas pulsando en el icono de la papelera. Se recomienda subir imagenes de tamaño reducido para evitar que la carga del post sea muy pesada.</p>
        <p v-if="imagenesDisponibles.length > 0">Si has borrado alguna imagen del editor de texto y quieres volver a usarla, o quieres que aparezca varias veces en el mismo post, no hay por que subirla de nuevo, copia la URL del pie de la imagen desea y pegala en el recuadro que aparece al pulsar el boton "Insertar imagen por URL". Este botón además sirve para insertar imagenes externas que no tienen por que estar subidas al servidor.</p><br />
        <div v-if="imagenesDisponibles.length > 0" class="grid grid-cols-5 gap-3">
          <div v-for="imagen in imagenesDisponibles" :key="imagen.value" class="relative">
            <img :src="imagen.value" alt="Imagen" class="w-full h-auto rounded-md shadow-lg" />
            <button class="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white" @click="eliminarImagen(imagen.value)">
              <font-awesome-icon icon="trash" />
            </button>
            <p class="mt-2 text-xs">{{ imagen.value }}</p>
          </div>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="updatePost">Actualizar</button>
      </div>
    </div>
    <div v-else>
      <p>Cargando datos del post {{ postId }} ... </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import QuillEditor from '~/components/QuillEditor.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});

const route = useRoute();
const config = useRuntimeConfig();
const post = ref(null);
const categorias = ref(null);
const postId = route.params.id;
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const imagenesDisponibles = ref([]);
const colorAlerta = ref('bg-blue-100 border-blue-400 text-blue-700');

onMounted(() => {
  obtenerPost();
  obtenerCategorias();
  obtenerImagenes();
});

async function obtenerPost() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getPost', true);
    requestBody.append('idpost', postId);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      post.value = data;
    } else {
      mensajeAlerta.value = 'Error al obtener los posts. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
    mensajeAlerta.value = 'Error al obtener los posts. Recarga la página. Si el problema continua avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function obtenerCategorias() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getCategorias', true);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      categorias.value = data;
    } else {
      mensajeAlerta.value = 'Error al obtener las categorías. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
    mensajeAlerta.value = 'Error al obtener las categorías. Recarga la página. Si el problema continua avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function obtenerImagenes() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('getfilespost', true);
    requestBody.append('idpost', postId);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data = await response.json();
      imagenesDisponibles.value = data;
    } else {
      mensajeAlerta.value = 'Error al obtener las fotos. Recarga la página.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
    mensajeAlerta.value = 'Error al obtener las fotos. Recarga la página. Si el problema continua avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
  console.log(imagenesDisponibles);
}

function handleClose() {
  mostrarAlerta.value = false;
}

const cambiarEstadoPost = async () => {
  // Cambia el estado de publicación
  post.value.publicado = post.value.publicado == 0 ? 1 : 0;

  try {
    const requestBody = new URLSearchParams();
    requestBody.append('publicar', true);
    requestBody.append('idpost', postId);
    requestBody.append('estado', post.value.publicado);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      mensajeAlerta.value = 'Post actualizado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      mensajeAlerta.value = 'Error al actualizar el post. Recarga la página. Si el problema continua avisa a soporte.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al obtener los posts:', error);
    mensajeAlerta.value = 'Error al actualizar el post. Recarga la página. Si el problema continua avisa a soporte.';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
};

// Manejamos el evento emitido por el editor y actualizamos el contenido del post
const handleImageUploaded = async () => {
  try {
    await updatePost();
  } catch (error) {
    console.error('Error al actualizar el post: ', error);
  }
};

async function updatePost() {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('updatepost', true);
    requestBody.append('title', post.value.title);
    requestBody.append('description', post.value.description);
    requestBody.append('titulo', post.value.titulo);
    requestBody.append('contenido', post.value.contenido);
    requestBody.append('resumen', post.value.resumen);
    requestBody.append('tipopost', post.value.tipopost);
    requestBody.append('categoria_id', post.value.categoria_id);
    requestBody.append('idpost', postId);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      obtenerImagenes();
      mensajeAlerta.value = 'Post actualizado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      mensajeAlerta.value = 'Error al actualizar el post. Vuelve a intentarlo';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al actualizar el post:', error);
    mensajeAlerta.value = 'Error al actualizar el post. Vuelve a intentarlo';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

async function eliminarImagen(url) {
  console.log(url)
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('borrarfichero', true);
    requestBody.append('url', url);

    const response = await fetch(`${config.public.BASE_API_URL}`, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if(response.ok) {
      const data1 = await response.json();
      obtenerImagenes();
      obtenerPost();
      mensajeAlerta.value = 'Fichero eliminado correctamente.';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-blue-100 border-blue-400 text-blue-700';
    } else {
      obtenerImagenes();
      obtenerPost();
      mensajeAlerta.value = 'Error al borrar fichero. Vuelve a intentarlo';
      mostrarAlerta.value = true;
      colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
    }
  } catch (error) {
    console.log('Error al eliminar fichero:', error);
    mensajeAlerta.value = 'Error al borrar fichero. Vuelve a intentarlo';
    mostrarAlerta.value = true;
    colorAlerta.value = 'bg-red-100 border-red-400 text-red-700';
  }
  setTimeout(() => {
    mostrarAlerta.value = false;
  }, 2000); // El alerta se ocultará después de 2 segundos
}

const selectLocalImage = async (event) => {
  const file = event.target.files[0];
  if(!file) {
    return; // No hay archivo seleccionado
  }

  // Acceder al valor de data-tipofoto
  const tipofoto = event.target.getAttribute('data-tipofoto');

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Image = e.target.result;
    const requestBody = new URLSearchParams();
    requestBody.append('subeficherosftp', true);
    requestBody.append('nombre', file.name);
    requestBody.append('contenido', base64Image);
    requestBody.append('idpost', post.value.id);
    requestBody.append('fecha', post.value.fecha);
    requestBody.append('tipofoto', tipofoto);

    try {
      const response = await fetch(`${config.public.BASE_API_URL}`, {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if(response.ok) {
        console.log('respuesta');
        post.value.imagen_mini = null;
        imagenesDisponibles.value = [{}];
        updatePost()
        obtenerPost();
        obtenerImagenes();
      } else {
        console.error('Error al subir la imagen: Respuesta no OK');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  reader.readAsDataURL(file); // Inicia la lectura del archivo
}

</script>