import Vue from 'vue'
import App from './App.vue'
import { LoaderPlugin } from 'vue-google-login'

Vue.use(LoaderPlugin, {
  client_id: "722681282902-tr36pll0jrmvharg2o98uc64joqhegvs.apps.googleusercontent.com"
});

new Vue ({
  render: createElemenet => createElemenet(App)
}).$mount('#app')
