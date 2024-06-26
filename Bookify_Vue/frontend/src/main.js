import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import store from "core-js/internals/shared-store";

createApp(App).use(router).use(store).mount('#app');