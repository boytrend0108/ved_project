<template>
  
  <div class="customer-chat">
    <header class="chat__header">
      <div class="provider_wr">
        <div class="user">
          <my-color-btn
            class="btn-back"
            v-if="innerWidth < 600"
            @click="$router.go('-1')"
          />
          <img 
            :src="GUEST_AVATAR"   
            alt="aватар" 
            class="avatar"
          > 
        <div class="provider">
          <div class="provider__name">{{ SPECIFIC_OFFER.owner_name }} </div>
        </div>
        </div>
       <Suspense>
        <rating-stars :rating="RATING"/>
       </Suspense>
         
      </div>
     
      <hr class="hr" v-if="innerWidth < 600">
      <my-blue-btn 
        id="select_provider" 
        @click="selectProvider"
        v-if="showBtn"
      >Выбрать специалиста</my-blue-btn>

      <my-color-btn 
        class="cancelBtn" 
        @click="confirmOrder"
        v-if="$route.query.status === 'IN_PROGRESS' && innerWidth < 600"
      > Завершить поставку </my-color-btn>
        <p class="successDelete" ref="deleteMsg" v-if="statement"> {{ statement }}</p>
    </header>

    <p class="successMsg" v-if="successMsg"> Вы выбрали этого специалиста </p>
    <p class="errorMsg" v-if="errorMsg"> Упс, что-то пошло не так... </p>
    
    <chat-box2 class="chatBox" />
    <my-big-spinner v-if="showPreloader"/>

    <my-dialog v-if="DIALOG"> 
      <div class="msg-wr" v-if="addCompany">
        <p class="warningMsg">Чтобы выбрать специалиста надо добавить фирму и реквизиты счета.</p>
        <p class="warningMsg">Сейчас вы будете перенаправленны на нужную страницу</p>
      </div>
      <success-provider-selected v-if="success"/>
    </my-dialog>
     
  </div> 
</template>
 
<script>

import { mapActions, mapGetters, mapMutations } from "vuex";
import ChatBox2 from "@/components/Chat/ChatBox2.vue";
import SuccessProviderSelected from "@/components/Form/SuccesProviderSelected.vue";
import RatingStars from "@/components/Chat/RatingStars.vue";
  export default {
    name: "customer-chat",
    components: { ChatBox2, SuccessProviderSelected, RatingStars },
    data(){
      return{
        messages:[],
        newMessage:null, 
        connection: null,
        innerWidth: window.innerWidth,
        showPreloader: false,
        statement: '',
        successMsg: false,
        errorMsg: false,
        addCompany: false,
        selectNextStep: false,
        success: false
      }
    },

    computed:{
      ...mapGetters([
       "AVATAR_BY_ID", "SPECIFIC_OFFER", "GUEST_AVATAR", "IS_ORDER_SELECTED", "FID", "DIALOG", "BANK", "RATING"
      ]),
      
      showBtn(){
          if(this.SPECIFIC_OFFER.status === "PENDING" && !this.IS_ORDER_SELECTED) return true
          return false
      },
    },

    methods:{
      ...mapActions([
        "SELECT_PROVIDER", "GET_SPECIFIC_OFFER", "GET_PROVIDER_OFFERS", "CONFIRM_ORDER", "GET_PROVIDER_RATING"
      ]),
      ...mapMutations([
        "SET_SPECIFIC_OFFER", "SET_GUEST_AVATAR", "SET_IS_ORDER_SELECTED", "SHOW_DIALOG", 
        "SET_LEAVE_SELECTED_OFFER",
      ]),

     firmValidation() {
       if (!this.FID || !this.BANK[0].bic) return false
        else return true 
     }, 

     
     changeQuery() {
        this.$router.push({query: {
        provider: this.$route.query.provider,  
        offer_id: this.$route.query.offer_id,
        status: "IN_PROGRESS",
        type: this.$route.query.type,
      }})
      },
 
     async selectProvider() {
        if (!this.firmValidation()) {
          this.addCompany = true
          this.SHOW_DIALOG()
          setTimeout(() => {
            this.$router.push("/customer/profile/#company")
            if (this.DIALOG) this.SHOW_DIALOG()
            this.addCompany = false
          }, 7000);
          return
          }
        this.showPreloader = true
        this.errorMsg = false
        const payload = {
          order_id: this.SPECIFIC_OFFER.order_id,
          offer_id: this.SPECIFIC_OFFER.id 
        }
        try {
          await this.SELECT_PROVIDER(payload)
          this.success = true
          this.showPreloader = false
          this.successMsg = true
          this.SHOW_DIALOG()
          this.SET_LEAVE_SELECTED_OFFER(this.$route.query.offer_id)
          this.changeQuery()
        } catch (e) {
          console.log(e)
          this.errorMsg = true
          this.showPreloader = false }
      },

        confirmOrder() {
          debugger
          this.showPreloader = true
          this.CONFIRM_ORDER(this.order.id) 
            .then(() => {
              this.$router.push({query: {status: "COMPLETED"}})
              this.statement = "Заявка закрыта"
              this.showPreloader = false
              setTimeout(() => {
                this.statement = ""
                this.SHOW_DIALOG()
              }, 2000);
            })
            .catch(err => {
              this.showPreloader = false
              this.statement = err
              setTimeout(() => {this.statement = ""}, 2000);
            })
    }

    },

  
    mounted() {
    const id = this.$route.params.id
    this.GET_SPECIFIC_OFFER({ user_id: this.$route.query.provider, order_id: id })
      .then(res => {
        if (res.owner_avatar_path !== null) {
          this.SET_GUEST_AVATAR(`https://static.delegat.online/${res.owner_avatar_path}`)
        }
      })
    this.GET_PROVIDER_OFFERS(id)
    this.GET_PROVIDER_RATING(id)
    },

    unmounted() {
      console.log("ChatPage unmounted")
      this.SET_IS_ORDER_SELECTED(false)
    } 
     
  }
</script> 

<style lang="scss" scoped>

.msg-wr {
   padding: 2.2rem;
}

.warningMsg {
  @include successMsg;
  text-align: left;
}

.successMsg {
  margin-bottom: 1.2rem;
  @include successMsg;
}

.errorMsg {
  margin-bottom: 1.2rem;
  @include errorMsg;
}
.cancelBtn {
  @include myColorBtn(#EEEEF0, $main-color, $main-color);
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  margin-top: 0 ;

  &:hover{
    @include myColorBtn($main-color, #EEEEF0, #EEEEF0);
  }

  @media (max-width: 600px) {
    width: 100%;
  }

}

.successDelete{
  @include font(1.4rem, 500, red );
  line-height: 2.1rem;
  margin-top: 1rem;
}
.customer-chat{
  @include flex(column, center, center, 0);
  height: 100%;
  width: 100%;

  @media (max-width:600px) {
    justify-content: flex-start;
  }
}
.hr{
  @include hr;
}

.btn-back{
  @include myColorBtn($main-color, #EEEEF0, #EEEEF0);
  width: 3.4rem;

  &::before{
    content: url("@/assets/images/icons/shevron-left.svg");
    position: relative;
    left: -1px;
  }
}

.avatar{
  height: 5rem;

  @media (max-width: 600px) {
    height: 2.6rem;
  }
}

.chat__header{
  @include flex(row, space-between, flex-start, 2rem);
  border-bottom: 2px solid #ECF0F3;
  padding-bottom: 2rem;
  width: 100%;
  @media (max-width:600px) {
    flex-direction: column;
    padding-bottom: 1.7rem;
    gap: 0;
  }
}

.provider_wr{
  @include flex(column, flex-start, flex-start, 1rem);

  @media (max-width:600px) {
    padding-top: 1.5rem ;
    width: 100%;
  }
}

.user {
  @include flex(row, flex-start, flex-start, 2rem);

  @media (max-width: 600px) {
    align-items: center;
  }
}
.provider{
  @include flex(column, flex-start, flex-start, .3rem);
}

.provider__name{
  @include font(3.2rem, 600, $font-color2);
  line-height: 3.8rem;
  text-align: left;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.6rem;
  }
}


</style>