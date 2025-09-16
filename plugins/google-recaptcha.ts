import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: '6LePUFwpAAAAAJmYp6JsILH_A91d8exr6tBn2Cmh',
    loaderOptions: {
      autoHideBadge: true,
      explicitRenderParameters: {
        badge: 'bottomleft'
      }
    }
  });
});