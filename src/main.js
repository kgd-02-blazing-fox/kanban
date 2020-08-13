import Vue from 'vue'
import App from './App.vue'

new Vue ({
  render: createElemenet => createElemenet(App)
}).$mount('#app')