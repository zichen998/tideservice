import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCHZ7lzOZlky2d6axSq35xiu_9keUkF-54",
    libraries: "places" // necessary for places input
  }
});
Vue.use(Mint)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false
var config = {
  apiKey: 'AIzaSyBq_LMYUt8QSz8O2_DzsRFNNXJ9TFz9hN4',
  authDomain: 'trendapp-1370d.firebaseapp.com',
  databaseURL: 'https://trendapp-1370d.firebaseio.com',
  projectId: 'trendapp-1370d',
  storageBucket: 'trendapp-1370d.appspot.com',
  messagingSenderId: '439342506900'
}
firebase.initializeApp(config)
let app = ''

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
