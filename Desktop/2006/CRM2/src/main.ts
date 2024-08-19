import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css';


const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    dark: false, // Ensure dark mode is customizable
    themes: {
      light: {
        primary: '#1976D2', // Blue accent, common in professional themes
        secondary: '#424242', // Dark gray for secondary elements
        accent: '#82B1FF', // Lighter blue for accents
        error: '#FF5252', // Red for errors
        info: '#2196F3', // Light blue for informational messages
        success: '#4CAF50', // Green for success messages
        warning: '#FFC107', // Yellow for warnings
      },
      dark: {
        primary: '#2196F3', // Blue accent, darker in dark mode
        secondary: '#616161', // Dark gray for secondary elements
        accent: '#FF4081', // Pink accent
      },
    },
  },
});

app.use(router);
app.use(vuetify);

app.mount("#app");
