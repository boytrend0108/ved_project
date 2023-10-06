<template> 
  <div id="main-layout" class="main-layout">
    <header-main v-if="CURRENT_USER === null || CURRENT_USER.site_role === 'customer'" />
    <header-provider v-else/>
    <OrderNavMob v-if="showMobileNav" />
    
    <div class="container">
      <aside v-if="innerWidth > 600" class="side-bar">
        <ul class="side-bar__ul">
          <li 
          v-if="this.$route.path !== '/search_product/'"
            class="side-bar__li active"  
          >Заявка
          </li> 
          <li 
            v-if="this.$route.path === '/search_product/'"
            :class="{active: this.$route.path === '/search_product/' }"
            class="side-bar__li "  
          >Поиск товара
          </li>
        </ul>
      </aside>
      <main 
        class="main-box"
        :style="{minHeight: minHeight}"
        @click="clickHandler"
      >
        <router-view />
      </main>
    </div>

    <div class="container">
      <footer class="footer"></footer>
    </div>
  </div>

</template> 

<script>
import { mapGetters, mapMutations } from "vuex";
import HeaderMain from "@/components/Header/HeaderMain.vue"
import HeaderProvider from "@/components/Header/HeaderProvider.vue";
import OrderNavMob from "@/components/Header/OrderNavMob.vue";

export default {
  components: { HeaderMain, HeaderProvider, OrderNavMob },
  name:'main-layout',

  data() {
    return {
      innerWidth: window.innerWidth,
    }
  },

  computed:{
    ...mapGetters([
      'CURRENT_USER'
    ]),

    minHeight() {
      switch(this.$route.name) {
        case "cost-calculation":
          return window.innerHeight - 60 + 'px'
        case "search-product":
          return window.innerHeight - 60 + 'px'
        case 'customer-new-application':
        return window.innerHeight - 120 + 'px'
        
        default:
          return ''
      }
 
    },

    showMobileNav() {
      if (innerWidth > 600) return false
      else {
        if (this.$route.name === "cost-calculation") return false
        if (this.$route.name === "search-product") return false
        else return true
      }
    }
  },

  methods: {
    ...mapMutations([
      'SET_SHOW_HEADER_DROPDOWN'
    ]),

    clickHandler(){
     this.SET_SHOW_HEADER_DROPDOWN(false)
    }
  },

}
</script>

<style lang="scss" scoped>
.main-layout {
  background-color: #F5F5F7;
  min-height: 100vh;
}

.container{
  @include flex(row, flex-start, flex-start, 0);
   padding: 0 2rem;
   margin: 0 auto;

   @media (max-width:600px) {
    padding: 0 15px;
   }
}

.side-bar{
  margin-top: 6rem;
  min-width: 28.5rem;
  // height: 100vh;
  .side-bar__ul{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style-type: none;
  }

  .side-bar__li {
      font-weight: 600;
      font-size: 17px;
      line-height: 26px;
      font-feature-settings: 'pnum' on, 'lnum' on;
      color: #244156;
      padding: 1.2rem 3rem;
      cursor: pointer;
      width: 100%;
      text-align: left;
      border-radius: 1rem;
    }
  .active{
    background-color: #EEEEF0;
  }
}
  
.main-box{
  padding: 6rem 0 0 8.2rem;
  flex-grow: 1;

  @media (max-width: 600px) {
    display: flex; 
    padding: 3rem 0 2rem; 
    // min-height: calc(100vh - 12.4rem);
  }
 
}

</style>