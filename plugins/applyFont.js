export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    // Este bloque solo se ejecutará en el cliente
    if(process.client) {
      // Construir el cuerpo de la solicitud
      const requestBody = new URLSearchParams();
      requestBody.append('getFont', true); // Parámetro que activa la función getFont en server.php

      // Realizar la solicitud con fetch
      const response = await fetch(`${nuxtApp.$config.public.BASE_API_URL}`, {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if(response.ok) {
        const data = await response.json();
        const font = data.fuente;

        if(font) {
          // Remover clases anteriores si existieran
          document.documentElement.classList.remove('font-poppins', 'font-titillium', 'font-open-sans', 'font-roboto');

          // Asignar la clase CSS correspondiente según la fuente seleccionada
          if(font === 'Poppins') {
            document.documentElement.classList.add('font-poppins');
          } else if(font === 'Titillium Web') {
            document.documentElement.classList.add('font-titillium');
          } else if(font === 'Open Sans') {
            document.documentElement.classList.add('font-open-sans');
          } else if(font === 'Roboto Regular') {
            document.documentElement.classList.add('font-roboto');
          }
        }
      } else {
        console.error('Error al obtener la fuente:', response.statusText);
      }
    }
  } catch (error) {
    console.error('Error al aplicar la fuente:', error);
  }
});
