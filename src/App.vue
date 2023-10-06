<template>
  <component :is="layout" >
    <router-view />
  </component> 

<my-big-spinner v-if="SHOW_PRELOADER"/> 
</template>

<script>
import HomeLayout from "./layouts/HomeLayout.vue"
import MainLayout from './layouts/MainLayout.vue'
import StartLayout from './layouts/StartLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import ProviderLayout from '@/layouts/ProviderLayout.vue'
import DocumentationLayout from "@/layouts/DocumentationLayout.vue"
import { mapGetters } from "vuex"
import { setMetaTags } from "@/helpers/setMetaTags"

export default {
  components: {
    MainLayout, 
    StartLayout,
    CustomerLayout,
    ProviderLayout,
    DocumentationLayout,
    HomeLayout,
  },

  computed:{
    ...mapGetters([
      'SHOW_PRELOADER'
    ]), 

    layout(){
      return(this.$route.meta.layout || 'start-layout')
    }
  },

  mounted() {
    setMetaTags();
  }
}

</script>


<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #F5F5F7; */
  height: fit-content;
  min-height: 100vh;
}


nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 1s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 1s ease-in
}
</style>
