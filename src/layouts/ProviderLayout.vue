<template>
  <div class="provider-layout">
    <header-provider v-if="showHeader"  />
    <toast-comp :banners="IS_PROVIDER_SELECTED" />
    <toast-comp :banners="ORDER_CONFIRMED" />

    <div class="container">
      <aside class="side-bar" v-if="innerWidth > 600">
        <!-- <SideFilterComp v-if="this.$route.path === "/customer/my_applications""/> -->
        <ul class="side-bar__ul" >
          <div class="li_wr" > 
            <li  
              v-if="showSearchBtn" 
              class="side-bar__li "  
              :class="{'active': this.$route.path === '/provider/search/'}"
              @click="this.$router.push('/provider/search/')"
              id="application">Поиск заказов
            </li>
        
            <li 
              v-if="showFeedbacksBtn" 
              class="side-bar__li "  
              :class="{'active': $route.path === '/provider/feedbacks/'}"
              @click="$router.push('/provider/feedbacks/')"
              id="feedbacks">Мои заявки
              <img v-if="showRedDot" src="@/assets/images/icons/red_dot.svg" alt="icon">
            </li>

            <li 
              v-if="false" 
              class="side-bar__li"
              :class="{ 'active': $route.path === '/provider/chats' }"
              @click="$router.push('/provider/chats')"  
              id="chats">Чаты
            </li>

            <div v-if="showApplicationNav" class="orderNav">  
              <li 
                class="side-bar__li " 
                :class="{'active': this.$route.path === `/provider/application/${this.$route.params.id}` }"
                @click="toGo('application')"
                id="application">Заявка
              </li>

                <li 
                  class="side-bar__li "
                  :class="{'active': this.$route.path === `/provider/contracts/${this.$route.params.id}`}"
                  @click="toGo('contracts')" 
                  id="contracts"> Договоры 
                  <span> {{ sentDocs }} из 8 </span>
                </li>
            
                <li 
                  class="side-bar__li"
                  :class="{ 'active': this.$route.path === `/provider/bills/${this.$route.params.id}` }"
                  @click="toGo('bills')"  
                  id="bills">Счета
                  <!-- <img src="@/assets/images/icons/red_dot.svg" alt="icon"> -->
                </li>             
            </div>
            <li 
              v-if="showChatBtn"
              class="side-bar__li"
              :class="{ 'active': this.$route.path === `/provider/chat/${this.$route.params.id}` }"
              @click="toGo('chat')"  
              id="bills">Чат с заказчиком
              <img v-if="showRedDotForMsg" src="@/assets/images/icons/red_dot.svg" alt="icon">
            </li>
          </div>

          <li  class="profile-li">
            <router-link  
              v-if="showProfileBtn"
              to="/customer/profile" 
              class="side-bar__li"
              :class="{'active': this.$route.path === '/provider/profile'}"  
              @click="this.$router.push('/provider/profile/')" 
              id="profileSpec"
            >Профиль
            </router-link >
          </li>
          <li class="profile-li">
            <feedback-filter v-if="this.$route.path === '/provider/feedbacks/'" />
          </li>

          <li class="profile-li"> 
           <to-do-spec 
             v-if="showToDo"
             class="toDoComp" 
           />
           <order-filter-provider  v-if="this.$route.path === '/provider/search/'"/>
          </li>
          
        </ul>
      </aside>

      <main 
        class="main-box" 
        :style="{paddingTop: paddingTop}"
        @click="SET_SHOW_HEADER_DROPDOWN(false)"
      >
        <router-view />
      </main>

    </div>
    <div class="container">
      <footer class="footer"></footer>
    </div>

    <Transition name="up">
      <my-btn class="upBtn" @click="goUp" v-if="scroll > 1000">Наверх</my-btn>
   </Transition>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import HeaderProvider from "@/components/Header/HeaderProvider";
import ToDoSpec from "@/components/Layout/ToDoSpec.vue";
import OrderFilterProvider from "../components/Filter/OrderFilterProvider.vue";
import FeedbackFilter from "../components/Filter/FeedbackFilter";
import ToastComp from "@/components/ToastComp.vue";
import { countSentDocs } from "@/helpers/countSentDocs";

export default {
  components: {
    HeaderProvider,
    ToDoSpec,
    OrderFilterProvider,
    FeedbackFilter,
    ToastComp
},
  name:"provider-layout",

  data() {
    return {
      innerWidth: window.innerWidth,
      scroll: null,
      sentDocs: 0
    }
  },

  computed:{
    ...mapGetters([
      "USER_BY_ID", "CHAT_ID", "CURRENT_USER", "SELECTED_ORDER", "NEW_OFFER_IN_PROGRESS", "IS_PROVIDER_SELECTED", "DOCS", "UNREADED_MESSAGES", "ORDER_CONFIRMED"
    ]),

    paddingTop() {
      if (window.innerWidth > 600) return

      switch(this.$route.name) {
        case 'provider-chat':
          return 0 + "px"
        default:
          return 3 + "rem"
      }
    },

    showRedDot() {
      if (this.NEW_OFFER_IN_PROGRESS?.length) return true
      return false
    },

    showRedDotForMsg() {
      const index = this.UNREADED_MESSAGES.findIndex(el => el.chat_id === this.CHAT_ID)
      if (index < 0 ) return false
      return true
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

    showUserMessageComp(){
      switch(this.$route.query.module){
        case "contracts":
          return true
        case "bills":
          return true
        default:
          return false
      }
    },

    showSearchBtn(){
      switch(this.$route.path){
        case "/provider/search/": return true
        case "/provider/chats": return true
        case `/provider/chat/${this.$route.params.id}`: return true
        case `/provider/feedbacks/`: return true
        case `/provider/application/${this.$route.params.id}`: return true
        default: return false
      }
    }, 
    
    showApplicationNav(){
      const status = this.$route.query.status
      const id = this.$route.params.id
      switch(this.$route.path){
        case `/provider/contracts/${id}`: 
          return status === "IN_PROGRESS" || status === "COMPLETED" && this.CURRENT_USER.uid === this.SELECTED_ORDER.provider_id ?  true :  false
        case `/provider/bills/${id}`: 
          return status === "IN_PROGRESS" || status === "COMPLETED" && this.CURRENT_USER.uid === this.SELECTED_ORDER.provider_id ?  true :  false
        case `/provider/application/${id}`:  
        return status === "IN_PROGRESS" || status === "COMPLETED" && this.CURRENT_USER.uid === this.SELECTED_ORDER.provider_id ?  true :  false
        case `/provider/chat/${id}`: 
          return status === "IN_PROGRESS" || status === "COMPLETED" && this.CURRENT_USER.uid === this.SELECTED_ORDER.provider_id ?  true :  false
        default: return false
      }
    },

    showChatBtn() { 
      if (!this.CHAT_ID) return false
      const id = this.$route.params.id
      switch (this.$route.path) {
        case `/provider/contracts/${id}`: return this.CHAT_ID ? true : false
        case `/provider/bills/${id}`: return this.CHAT_ID ? true : false
        case `/provider/application/${id}`: return this.CHAT_ID ? true : false
        case `/provider/chat/${id}`: return this.CHAT_ID ? true : false
        default: return false
      } 
    },

    showChatsBtn(){
      switch(this.$route.path){
        case `/provider/search/`: return true
        case `/provider/application/${this.$route.params.id}`: return false
        case `/provider/chats`: return true
        case `/provider/feedbacks/`: return true
        default: return false
      }
    },
  
    showFeedbacksBtn(){
      switch(this.$route.path){
        case `/provider/search/`: return true
        case `/provider/feedbacks/`: return true
        case `/provider/application/${this.$route.params.id}`: return true
        case `/provider/chat/${this.$route.params.id}`: return true
        case `/provider/contracts/${this.$route.params.id}`: return true
        case `/provider/bills/${this.$route.params.id}`: return true
        case `/provider/chats`: return true
        case `/provider/profile`: return true
        default: return false
      }
    },

    showProfileBtn(){
      switch(this.$route.path){
        case `/provider/profile`: return true
        default: return false
      }
    },

    showUserMassage(){
      switch(this.$route.path){
        case `/provider/contracts/${this.$route.params.id}`: return true
        case `/provider/bills/${this.$route.params.id}`: return true
        default: return false
      }
    },

    showToDo(){
      switch(this.$route.path){
        case `/provider/contracts/${this.$route.params.id}`: return true
        case `/provider/bills/${this.$route.params.id}`: return true
        default: return false
      }
    },

    showHeader() {
      if(this.$route.name === "provider-chat" && this.innerWidth < 600) return false
      return true
    }

  }, 

  methods: {
    ...mapMutations([
      "SET_ACTIVE_MODULE", "SET_SHOW_HEADER_DROPDOWN", "SET_IS_PROVIDER_SELECTED", 'REMOVE_EL_FROM_IS_PROVIDER_SELECTED', "SET_NEW_OFFER_IN_PROGRESS", "SET_UNREADED_MESSAGES"
    ]),

    toGo(page) {
      this.$router
        .push(`/provider/${page}/${this.$route.params.id}?status=${this.$route.query.status}&offer_id=${this.$route.query.offer_id}&guest_id=${this.USER_BY_ID.uid}`)
    },

    goUp() {
      window.scrollTo(0, 0);
    },
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
    // проверяем непросмотренные откики
    const unwatchedOffers = JSON.parse(localStorage.getItem("unwatched_offers"))
    if(unwatchedOffers) {
      this.SET_NEW_OFFER_IN_PROGRESS({ data: unwatchedOffers, action: "set" })
    }

    // проверяем непрочитанные сообщения
    const unreadMessages = JSON.parse(localStorage.getItem("unreadMessages"))
    if(unreadMessages) {
      this.SET_UNREADED_MESSAGES({ data: unreadMessages, action: "set" })
    }

    window.addEventListener("scroll",() => {
        this.scroll = window.scrollY;
      });
  }

}

</script>

<style lang="scss" scoped>

.provider-layout {
  background-color: #F5F5F7;
  min-height: 100vh;
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
  min-height: 89vh;

  @media (max-width: 768px) {
    padding: 3rem 0 0 4.2rem;
  }

  @media (max-width: 600px) {
    padding-left: 0;
  }
}
 .side-bar{
  margin-top: 6rem;
  min-width: 28.5rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
    min-width: 0;
    max-width: 23.1rem;
  }
  .side-bar__ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style-type:none;
  }

  .side-bar__li {
    @include font(1.7rem, 600, #244156 );
    @include flex(row, space-between, center, 0);
    line-height: 2,6rem;
    font-feature-settings: "pnum" on, "lnum" on;
    padding: 1.2rem 3rem;
    cursor: pointer;
    width: 100%;
    text-align: left;
    border-radius: 1rem;
    background: white;

    & span {
        @include font(1.4rem, 600, $main-color);
      }
    }
  .active{
    background-color: #EEEEF0;
  }
}
 

.upBtn {
  position: fixed;
  bottom: 10rem;
  left: 80%;
  width: 15rem !important;
  @include flex(row, center, center, 0);

  @media (max-width: 600px) {
    bottom: 10rem;
    left: 50%;
  }
}

.up-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.up-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.up-enter-active,
.up-leave-active {
  transition: all 0.5s ease;
}

.orderNav {
  @include flex (column, flex-start, flex-start, 1rem);
  width: 100%;
}


.li_wr{
  width: 100%;
  @include flex (column, flex-start, flex-start, 1rem);
}

.profile-li{
  @include flex(column, flex-start, flex-start, 0);
  width: 100%;
}

.toDoComp{
  margin-top: 2rem;
}

ul {
  position: relative;
}


</style>