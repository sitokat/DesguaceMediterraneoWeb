export default defineNuxtRouteMiddleware((to, from, next) => {
  const userCookie = useCookie('user');
  // Verificar si la cookie 'user' existe
  if(!userCookie.value) {
    // Si la cookie 'user' no existe, redirige a la página de inicio de sesión u otra página
    console.log('no hya cookie');
    return navigateTo('/'); // Redirigir a la raíz de la aplicación
  } else {
    const tokenParts = userCookie.value.split('.');
    if(tokenParts.length === 3) {
      const payload = tokenParts[1];
      try {
        const decodedPayload = JSON.parse(atob(payload));
        const expDate = new Date(decodedPayload.exp * 1000); // Convertir a milisegundos
        console.log('Fecha de expiración de la cookie:', expDate);

        const currentTime = Math.floor(Date.now() / 1000);
        if(decodedPayload.exp < currentTime) {
          console.log('La cookie ha expirado');
          userCookie.value = null;
          return navigateTo('/'); // Redirigir a la raíz de la aplicación
        // Aquí puedes redirigir al usuario a la página de inicio de sesión
        } else {
          console.log('Tengo cookie y es válida');
          // Aquí puedes permitir el acceso a la página
        }
      } catch (error) {
        console.log('Error al decodificar la cookie', error);
        userCookie.value = null;
        return navigateTo('/'); // Redirigir a la raíz de la aplicación
        // Manejar el error, por ejemplo, redirigir al usuario al inicio de sesión
      }
    } else {
      console.log('Token JWT inválido');
      return navigateTo('/'); // Redirigir a la raíz de la aplicación
      // Redirigir a la página de inicio de sesión
    }
  }
})