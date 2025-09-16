<template>
  <div class="quill-editor-container">
    <div id="toolbar" class="flex justify-between items-center">
      <!-- Otros elementos de la barra de herramientas -->
      <button id="insert-image-url-button" type="button" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Insertar imagen por URL</button>
    </div>
    <div ref="editor"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Quill from 'quill';
import ImageResize from 'quill-image-resize';

Quill.register('modules/imageResize', ImageResize);

const config = useRuntimeConfig();
const editor = ref(null);
const props = defineProps({
  modelValue: String,
  fecha: String,
  id: String
});
const emit = defineEmits(['update:modelValue']);

let quillInstance = null;

onMounted(() => {
  quillInstance = new Quill(editor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
        ['link', 'image', 'video', 'insertImageByUrl'] // link and image, video
      ],
      imageResize: {}
    }
  });

  if(props.modelValue) {
    quillInstance.root.innerHTML = props.modelValue;
  }

  quillInstance.on('text-change', () => {
    emit('update:modelValue', quillInstance.root.innerHTML);
  });

  quillInstance.getModule('toolbar').addHandler('image', () => {
    selectLocalImage();
  });

  quillInstance.getModule('toolbar').addHandler('insertImageByUrl', () => {
    insertImageByUrl();
  });

  // Agregar un manejador para el botón personalizado de imagen por URL
  const insertImageButton = document.querySelector('#insert-image-url-button');
  insertImageButton.addEventListener('click', () => {
    insertImageByUrl();
  });
});

function selectLocalImage() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    if(file) {
      // Codificar la imagen a Base64 y enviar al servidor
      const fileName = file.name;
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        const requestBody = new URLSearchParams();
        requestBody.append('subeficherosftp', true);
        requestBody.append('nombre', fileName);
        requestBody.append('contenido', base64Image);
        requestBody.append('idpost', props.id);
        requestBody.append('fecha', props.fecha);
        requestBody.append('tipofoto', '');
        try {
          const response = await fetch(`${config.public.BASE_API_URL}`, {
            method: 'POST',
            body: requestBody,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          const responseData = await response.json();
          if(response.ok) {
            // Insertar la URL de la imagen devuelta por el servidor
            const range = quillInstance.getSelection();
            quillInstance.insertEmbed(range.index, 'image', responseData.url);
            emit('image-uploaded');
          } else {
            console.error('Error al subir la imagen');
          }
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };
}

function insertImageByUrl() {
  const imageUrl = prompt('Por favor, introduce la URL de la imagen:');
  if(imageUrl) {
    const range = quillInstance.getSelection(true);
    quillInstance.insertEmbed(range.index, 'image', imageUrl);
  }
}

watch(() => props.modelValue, (newValue) => {
  if(quillInstance && newValue !== quillInstance.root.innerHTML) {
    quillInstance.root.innerHTML = newValue;
  }
});
</script>

<style>
@import 'quill/dist/quill.snow.css';
</style>