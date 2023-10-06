<template>
  <div class="customer-layout">
    <header-main v-if="showHeader"/> 
    <toast-comp :banners="NEW_OFFER_BANNERS" />
    <OrderNavMob v-if="showMobileNav" />

    <div class="container" >
      <aside class="side-bar">
        <side-filter v-if="showSideFilter" /> 
        <ul  
          class="side-bar__ul" 
          v-if="this.$route.path !== '/customer/my_applications'">

          <div class="li_wr" v-if="this.$route.path !== '/customer/profile'">
            <li 
              class="side-bar__li " 
              @click="$router.push('/customer/my_applications')" 
              id="order">Мои заявки</li>
              
            <li 
              class="side-bar__li " 
              :class="{'active': this.$route.path === `/customer/order/${this.$route.params.id}` || 
              this.$route.query.module === 'select_company' || this.$route.path === `/start-application`}"
              @click="goTo" 
              id="order">Заявка</li>

            <li 
              v-if="this.$route.params.id && this.$route.query.type === 'delivery'"
              class="side-bar__li"
              :class="{'active': this.$route.path === `/customer/contracts/${this.$route.params.id}`,
                       'disabled': this.$route.params.id === `0`}" 
              @click="goTo" 
              id="contracts">Договоры <span> {{ sentDocs }} из 8 </span></li>
            <li 
              v-if="this.$route.params.id && this.$route.query.type === 'delivery'"
              class="side-bar__li "
              :class="{'active': this.$route.path === `/customer/bills/${this.$route.params.id}`,
                       'disabled': this.$route.params.id === `0`}" 
              @click="goTo" 
              id="bills">Счета</li>
          </div>
          
          <li v-else class="profile-li">
            <router-link 
              to="/customer/profile" 
              class="side-bar__li"
              :class="{'active': this.$route.path === '/customer/profile'}"  
              @click="activeBtn($event)" 
              id="profile">Профиль</router-link >
            <router-link 
              v-if="showMyOrders"
              to="/customer/my_applications" 
              class="side-bar__li"
              :class="{'active': this.$route.path === '/customer/my_applications'}"  
              @click="activeBtn($event)" 
              id="my_applications">Мои заявки</router-link>
          </li>

          <li v-if="showUserMessageComp" class="messages" > 
            <p class="side-bar__li  side-bar__li-border ">Cooбщения</p>        
            <p class="warningMsg" v-if="!PROVIDER_OFFERS.length">Откликов пока нет</p>        
            <my-side-user-msg 
              class="msg slide-in-left"  
              v-for="(msg,i) in filteredProviderOffers" 
              :key="i"
              :msg="msg"  
            />
          </li>

          <li > 
           <to-do-customer class="toDoComp" v-if="showToDoComp"/>
         </li>

        </ul>
      </aside> 
      <main 
        class="main-box" 
        :style="{paddingTop: paddingTop, minHeight: minHeight}"
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
import HeaderMain from "@/components/Header/HeaderMain.vue";
import ToDoCustomer from "@/components/Layout/ToDoCustomer.vue";
import SideFilter from "@/components/Filter/SideFilter.vue";
import ToastComp from "@/components/ToastComp.vue";
import OrderNavMob from "@/components/Header/OrderNavMob.vue";

import { mapActions, mapGetters, mapMutations } from "vuex";
import { countSentDocs } from "@/helpers/countSentDocs";

export default {
  components: { 
    HeaderMain, 
    ToDoCustomer, 
    SideFilter, 
    ToastComp,
    OrderNavMob,
  },
  name:'customer-layout',
  data(){
    return{  
      orderId: '',
      innerWidth: window.innerWidth,
      sentDocs: 0,
      watchCounter: 0,
    }
  },

  computed:{
    ...mapGetters([
      'PROVIDER_OFFERS', "NEW_OFFER_BANNERS", "DOCS"
     ]),

     minHeight() {
      if (window.innerWidth > 600) return

      switch(this.$route.name) {
        case 'customer-chat':
          return "100vh"
        default: 
          return "100vh - 6rem"
      }
     },

     paddingTop() {
      if (window.innerWidth > 600) return

      switch(this.$route.name) {
        case 'customer-chat':
          return 0 + "px"
        default:
          return 3 + "rem"
      }
    },

    showToDoComp(){ 
      switch(this.$route.query.module){
        case "contracts":
          return true
        case "bills":
          return true
        default:
          return false
      }
    },

    showSideFilter() {
      if ( this.$route.path === '/customer/my_applications' && this.innerWidth > 600) return true
      else return false
    }, 

    showUserMessageComp() {
      if (this.$route.query.type !== "delivery") return false;
      if (this.$route.query.status === "UNPUBLISHED") return false;
      if (this.$route.name === `customer-order`
        || this.$route.name === `customer-contracts`
        || this.$route.name === `customer-bills`
        || this.$route.name === `customer-chat`
      ) return true;
      
      return false;
    },

    showHeader(){
      if(this.$route.name === 'customer-chat') {
        return this.innerWidth < 600 ? false : true 
      } 
      
      return true
    },

    showMyOrders(){
      if (this.$route.name === "customer-signin") return false
      return true
    },

    filteredProviderOffers() {
      if (this.$route.query.status === "IN_PROGRESS") {
        return this.PROVIDER_OFFERS.filter(offer => offer.status === "IN_PROGRESS")
      }

      if (this.$route.query.status === "COMPLETED") {
        return this.PROVIDER_OFFERS.filter(offer => offer.status === "COMPLETED")
      }

      return this.PROVIDER_OFFERS
    },

    showMobileNav() {
      if (innerWidth > 600) return false
      if (this.$route.name === "cost-calculation") return false
      if (this.$route.name === "search-product") return false

      return true
    }
  }, 

  methods:{ 
   ...mapMutations([
     "SET_ACTIVE_MODULE",  
     'SET_SHOW_HEADER_DROPDOWN', 
     'SET_CLEAR_INVOICE_AND_PLIST', 
     'SET_CLEAR_IMG',
     'SET_CLEAR_DOCS',
   ]),
   ...mapActions([
    'GET_PROVIDER_OFFERS',
   ]),
   
    activeBtn(event){
     this.SET_ACTIVE_MODULE(event.target.id)
    }, 

    goTo(event){
      if (this.$route.query.module === 'select_company') {
         // clear previous data
        this.SET_CLEAR_INVOICE_AND_PLIST();
        this.SET_CLEAR_IMG();
        this.SET_CLEAR_DOCS();
        if (event.target.id !== 'customer_order'){
          this.$router.push(`/customer/support/0`)
        }else return
      } else if(this.$route.params.id !== '0'){
        this
         .$router.push(`/customer/${event.target.id}/${this.$route.params.id}?status=${this.$route.query.status}&type=${this.$route.query.type}`)
      } else {
        this.$router.go('-1')
      }
    },  
 
    clickHandler(){
     this.SET_SHOW_HEADER_DROPDOWN(false)
    } 
  },

  watch: {
    DOCS: {
      handler() { 
        this.sentDocs = countSentDocs();
      }, 
      deep: true
    }
  },

  mounted() {
    if (this.$route.name === 'customer-order')  this.GET_PROVIDER_OFFERS(this.$route.params.id);
  }
  
}
 
</script>

<style lang="scss" scoped>

.customer-layout {
  background-color: #F5F5F7;
  min-height: 100vh;
}
.msg{
  margin-bottom: 1rem;
}

.warningMsg {
  @include warningMsg;
  margin-top: 1rem;
}


.messages{
  margin-top: 3.5rem;
  background-color: #fff;
  width: 100%;
}

.li_wr{
  @include flex(column, flex-start, flex-start, 1rem);
  width: 100%;
}

.profile-li{
  @include flex(column, flex-start, flex-start, 0px);
  width: 100%;
}

.toDoComp{
  margin-top: 2rem;
}

.container {
  display: flex;
  margin: 0 auto;
  padding: 0 2rem;
  margin: 0 auto;

  @media (max-width:600px) {
    padding: 0 1.5rem;
   }
}

.main-box{ 
  padding: 6rem 0 0  8.2rem;
  flex-grow: 1;
  display: flex;

  @media (max-width: 768px) {
    padding: 3rem 0 0 3rem;
  }

  @media (max-width: 600px) {
    padding: 0;
    padding: 3rem 0 2rem;
    // min-height: calc(100vh - $main-haader-mob-height)
  }
}
.side-bar{
  margin-top: 6rem;
  min-width: 28.5rem;

  @media (max-width:768px) {
    margin-top: 3rem;
    min-width: 24.5rem;
  }

  @media (max-width:600px) {
    display: none;
  }

  .side-bar__ul{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style-type:none;
    min-width: 160px;
  }

  .side-bar__li {
    background-color: white;
    @include font (1.7rem, 600, #244156);
    @include flex(row, space-between, center, 0);
    line-height: 26px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    padding: 1.2rem 3rem;
    cursor: pointer;
    width: 100%;
    border-radius: 1rem;

      & span {
        @include font(1.4rem, 600, $main-color);
      }
    }

    .side-bar__li-border {
      border-bottom: 2px solid #EEEEF0;
    }
  .active{
    background-color: #EEEEF0;
  }

  .disabled{
    @include disabled;
  }
}

.slide-in-left {
	-webkit-animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-500px);
              transform: translateX(-500px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0); 
              transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-500px);
              transform: translateX(-500px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
}
}
</style>