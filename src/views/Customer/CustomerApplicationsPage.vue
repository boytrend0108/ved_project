<template>
  <div class="customerApplicationsPage">
    <header class="customerApplicationPage__header">
      <h1 class="title">Мои заявки</h1> 
      <add-new-application class="btn-box" />
      <application-box-header /> 
      <application-box-header-mob />  
    </header>

    <main class="applicationsBoxMolule">
      <my-validation-error-msg 
        v-if="INPUT_VALIDATION_ERR" 
        :errorMsg="INPUT_VALIDATION_ERR"
        class="validationErrorMsg"
      />

      <div  v-if="FILTER_MODE_VIEW === 'broaderView'">
        <p class="note" v-if="showNote"> Заявок с выбранными фильтрами нет </p>

        <div class="list-wr transition" v-else>
         <transition-group name="orders_list"  >
            <customer-application 
              v-for="(order, i) in this.orders" :key="i" 
              :order="order"
              class="customerApplication slide-in-top"
              :chat="order.chat"
            />
         </transition-group>
        </div>
      </div>   
      
      <div v-if="FILTER_MODE_VIEW === 'compactView'">
        <p class="note" v-if="showNote"> Заявок с выбранными фильтрами нет</p>
    
        <div class="list-wr transition" v-else>
          <!-- <transition-group name="orders_list"> -->
            <customer-application-short
              @delete_order="deleteOrder"
              v-for="(order, i) in this.orders" :key="i"
              :order="order"
              :chat="order.chat"
              class="customerApplicationShort slide-in-top"
            />
         <!-- </transition-group> -->
        </div>
      </div>
    </main>
    
    <my-dialog 
      v-if="SHOW_DELETION_CONFIRMATION_FORM" 
      @close_dialog="SET_SHOW_DELETION_CONFIRMATION_FORM(false)"
    >
      <deletion-confirmation-form 
        v-if="SHOW_DELETION_CONFIRMATION_FORM"
        buttonAction="delete"
      />
    </my-dialog>
   
     <div ref="observer" class="observer"></div>
 
    <Transition name="up">
        <my-btn class="upBtn" @click="goUp" v-if="scroll > 1000">Наверх</my-btn>
    </Transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ApplicationBoxHeader from "@/components/Application/ApplicationBoxHeader.vue";
import ApplicationBoxHeaderMob from "@/components/Application/ApplicationBoxHeaderMob.vue";
import AddNewApplication from "@/components/Application/AddNewApplication.vue";
import CustomerApplication from "@/components/Application/СustomerAppication.vue"
import CustomerApplicationShort from "@/components/Application/СustomerApplicationcShort.vue";
import DeletionConfirmationForm from "@/components/Form/DeletionConfirmationForm.vue"
  export default {
    components:{
      ApplicationBoxHeader,
      AddNewApplication,
      CustomerApplication,
      CustomerApplicationShort,
      ApplicationBoxHeaderMob,
      DeletionConfirmationForm,
    },

    data() { 
    return{
      orders: [],
      showNote: false,
      innerWidth: window.innerWidth,
      showDeletionConfirmationForm: false,
      scroll: null,
      networkError: false,
    }
  },

  computed: {
    ...mapGetters([
      "CUSTOMER_ORDERS", "SHOW_DELETION_CONFIRMATION_FORM", "INPUT_VALIDATION_ERR",
      "FILTER_STATUS",
      "FILTER_TYPE",
      "FILTER_MODE_TIME",  
      "FILTER_MODE_VIEW",
      "CHANGE_ORDER_STATUS",
      "PAGE", 
      "CURRENT_USER",
    ]),
  },

  methods: {
    ...mapActions([
      "GET_CUSTOMER_ORDERS"
    ]),
    ...mapMutations([
      "SET_PAGE", "SET_ACTIVE_MODULE", "SET_SHOW_DELETION_CONFIRMATION_FORM", 'SET_SHOW_PRELOADER'
    ]),

    goUp() {
      window.scrollTo(0, 0)
    },

    goBack() {
      document.querySelector(".active").classList.remove("active")
      this.SET_ACTIVE_MODULE("application")
      this.$router.push("/customer?module=select_company")
    },

    async getOrders() {
      this.SET_PAGE(true)
      this.showNote =  false
      this.SET_SHOW_PRELOADER(true)
     await this.GET_CUSTOMER_ORDERS({ status:this.FILTER_STATUS, order_type: this.FILTER_TYPE, user_id: this.CURRENT_USER.uid })
        .then(() => {
          this.orders = this.CUSTOMER_ORDERS 
          this.SET_SHOW_PRELOADER(false) 
          this.showNote = this.CUSTOMER_ORDERS.length ? false : true
        })
        .catch(err => {
          console.log("compo ====>", err);
          this.SET_SHOW_PRELOADER(false);
        }
       )
    },

    deleteOrder(order_id) {
      this.orders.filter(el => el.id !== order_id)
    }

  },

  watch:{
    FILTER_STATUS(){ // фильтрация старые/новые и вид заявки
      this.getOrders()
    },

    FILTER_TYPE() {
      this.getOrders()
    },

    FILTER_MODE_TIME(){ // фильтрация  и вид заявки
      this.orders = this.orders.reverse() 
    },

    orders() {
      if (!this.orders.length) this.showNote = true
      else this.showNote = false
    }
 
  }, 
 

  mounted() {
    this.SET_PAGE(true) // обнуляем счетчик 
    this.getOrders()
      .then(() => {
        const options = {
          rootMargin: "0px",
          threshold: 0.2
        }
       
          const callback = (entries) => {      
            if (entries[0].isIntersecting) { // вызываем только при входе в observer  
            this.SET_PAGE() // ПРИБАВЛЯЕМ К СТРАНИЦЕ 1

            if (this.FILTER_MODE_TIME === "newFirst") {
              this.GET_CUSTOMER_ORDERS({ status: this.FILTER_STATUS, order_type: this.FILTER_TYPE, page: this.PAGE, user_id: this.CURRENT_USER.uid  })
                .then(() => {
                   this.orders = [...this.orders, ...this.CUSTOMER_ORDERS]
                })
            } else return
          }
         
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
      })
    
    if (document.querySelector("#myApplicationsNav")) {
      document.querySelector("#myApplicationsNav").classList.add("active")
    } else return

    window.scrollTo(0, 0) // скролл в вверx cтраницы

    window.addEventListener("scroll",() => {
      this.scroll = window.scrollY;
    });

  }
}
</script>

<style lang="scss" scoped>

.customerApplicationsPage {
  width: 100%;
  @include flex(column, flex-start, flex-start, 0);
  min-height: 83vh;
}

.customerApplicationPage__header {
  width: 100%;
}

.applicationsBoxMolule {
  flex-grow: 1;
  width: 100%;
}
.validationErrorMsg{
  margin-bottom: 4.5rem;
  margin-top: 4.5rem;
}

.upBtn {
  position: fixed;
  bottom: 10rem;
  left: 80%;
  width: 15rem ;

  @media (max-width: 600px) {
    bottom: 5rem;
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
.note{
  @include font (1.7rem, 600, #339DFF);  
  margin: 12rem auto; 

  @media (max-width: 600px) {
    margin: 5.5rem auto;
  }
}
.transition{
  overflow: hidden;
}

.slide-in-top {
	-webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

}

.orders_list-enter-from {
  opacity: 0;
  transform:scale(0.5)
}

.orders_list-enter-to {
  opacity: 1;
  transform:scale(1)
}

.orders_list-leave-from {
  opacity: 1;
  transform:scale(1)
}

.orders_list-leave-to {
  opacity: 0;
  transform:scale(0)
}

.orders_list-enter-active, 
.orders_list-leave-active {
  transition: all 1s ease;
}

.orders_list-move {
  transition: transform 1s;
}

.spinner{
  margin: 12rem auto;
  width: fit-content;
}
.observer{
  height: 50px;
  color: gray;
  width: 100%;
}

.backBtn{
  @include myColorBtn(#416782,#EEEEF0, #EEEEF0);
  margin-top: 4.5rem;
}
.footer{
  border-top: 2px solid #D9E1E7;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 0 3rem 0 ;
  margin-top: 3rem;
}

.btn-box {
  margin-bottom: 3rem;
}

.title {
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width:600px) {
    margin: 0 0 3rem 0;
  }
}
</style>