import Vue from "vue";
import App from "./App.vue"
import { LoaderPlugin } from 'vue-google-login';

Vue.use(LoaderPlugin, {
    client_id: "124739969343-r3avc3i2o4poa4ttkh439jhcedgjik59.apps.googleusercontent.com"
});

new Vue ({
    render:h=>h(App)
}).$mount('#app')