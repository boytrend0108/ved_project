import Particles from "vue3-particles";
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import store from './store' 
import "./assets/styles/styles.scss";
import components from './components/UI';


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


/* add icons to the library */
library.add(fas, far, fab)

require('@/store/subscriber') 
// require('@/UserInfo') // подключаем скрипт 


export default function startApp() {
  let app = createApp(App)
  components.forEach(component => {
    app.component(component.name, component)
  });
  app
    .use(Particles)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
}

// Authorization check 
if (window.location.href.includes("verification_code") || window.location.href.includes("reset_token") ) {
  localStorage.clear()
} 

if (localStorage.getItem('accessToken')) {
  store.dispatch("ATTEMPT", JSON.parse(localStorage.getItem('accessToken')))
    .then(() => startApp())
    .catch(() => {
      startApp()
      if (store.getters.WRONG_REFRESH_TOKEN) router.push(`/`)
    })
} else startApp()
 

 

