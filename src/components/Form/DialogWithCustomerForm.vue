<template>
  <div class="form dialogWithCustomer">
     <!-- <font-awesome-icon icon="fa-solid fa-xmark" @click="closeDialog"/> -->
     <h2 class="form__title">Начните диалог с заказчиком</h2>
     <p class="form__note">Укажите примерную стоимость работы и задайте интересующие вас вопросы</p>
     <validation-errors
        class="err"
        v-if="VALIDATION_ERRORS"
        :validation-errors="VALIDATION_ERRORS"
      />

     <label for="priceOfWork" class="form__lable">Примерная стоимость работы</label>
    
     <my-input 
       class="form__input-price" 
       id="priceOfWork"
       @error="isPriceValid"
     >
      <p class="symbol">₽</p>
     </my-input>  
     <textarea 
       v-model="offer_message"
       class="form__textaria"
       name="dialogWithCustomer" 
       id="dialogWithCustomerTextAria" 
       placeholder="Написать сообщение..."
       @input="SET_OFFER_MSG(offer_message)"
      />
      <div class="btn-wr">
        <my-blue-btn 
          @click="sendProposal"
          :disabled="isBtnDisabled"
          :class="{disabled: isBtnDisabled}"
        >Отправить
        </my-blue-btn>
        <my-semipolar-spinner v-if="showPreloader" class="preloader"/>
      </div>
  </div>
</template>

<script>

import ValidationErrors from "./ValidationErrors.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "dialog-with-customer",
  components: { ValidationErrors },
  data() {
    return {
      offer_message: "",
      showPreloader: false,
      priceValidation: true,
    }
  },

  computed: {
    ...mapGetters([
      "INPUT", "VALIDATION_ERRORS", "OFFER_MSG", "USER_BY_ID", "CURRENT_USER", "CHAT_ID", "FID"
    ]),
    
    isBtnDisabled() {
      if (this.offer_message && this.INPUT && this.priceValidation ) return false
      else return true
    }

  },

  methods: {
    ...mapActions([
      "SEND_OFFER", "CREATE_CHAT", "SEND_MSG"
    ]),

    ...mapMutations([
      "SHOW_DIALOG",
      "SWITCH_DIALOG_WITH_CUSTOMER",
      "SWITCH_SHOW_PROPOSAL_SENT_FORM",
      "SET_OFFER_MSG",
      "SET_OFFER_PRICE",
      "SET_IS_OFFER_SENDED",
    ]),

    isPriceValid(status) {
      this.priceValidation  = status
    },

    sendProposal() {
      this.showPreloader = true
      const formData = {
        "offer_price": this.INPUT.replace(/ /g, ""),
        "offer_message": this.offer_message,
        "firm_id": this.FID
      }
      const payload = {
        orderId: this.$route.params.id,
        formData: formData,
      }
      this.SEND_OFFER(payload)
        .then(res => {
          this.$router.push({query: { offer_id: res.data.id }})
          return this.CREATE_CHAT({
            order_id: this.$route.params.id,
            offer_id: res.data.id,
            customer_id: this.USER_BY_ID.uid,
            provider_id: this.CURRENT_USER.uid
          })
        })
        .then(() => {
          const newMsg = {
            "chat_id": this.CHAT_ID,
            "body": this.offer_message,
            "type": "text",
            "content": "string"
          }
          return this.SEND_MSG(newMsg)
        })
        .then(() => {
          this.SWITCH_SHOW_PROPOSAL_SENT_FORM(true)
          this.SWITCH_DIALOG_WITH_CUSTOMER(false)
          this.SET_IS_OFFER_SENDED(true)
          // this.$router.push({query: {'feedback': true}})
        })
        .catch(err => { 
          console.log(err)
          this.showPreloader = false })
    },

    closeDialog() {
      this.$router.replace({ query: {} }) // чтобы удалить плейсхолдер 100 000
      this.SWITCH_DIALOG_WITH_CUSTOMER(false)
      this.SWITCH_SHOW_PROPOSAL_SENT_FORM(false)
      this.SHOW_DIALOG();
    }
  },

  mounted() {
    this.offer_message = this.OFFER_MSG ? this.OFFER_MSG : ""
  },

}
</script>

<style lang="scss" scoped>

.disabled {
  @include disabled;
}
.err{
  width: 100%;
  margin-bottom: 2rem;
}

 .btn-wr{
  @include flex(row, flex-statr, center, 24%);
  width: 100%;
}
.preloader{
  margin: 0;
}

.form__textaria{
  margin: 3rem 0 4.5rem 0;
  width: 100%;
  height: 11rem;
  background-color: $bg-color;
  @include font(1.7rem, 500, $font-color2);
  line-height:2.6rem;
  padding: 1.2rem 2rem;
  outline: none;
}

.symbol{
  @include font(1.7rem, 500, $font-color2 );
  line-height: 2.6rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  @media (max-width:600px) {
    top: .6rem;
  }
}

.form__lable{
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  text-align: left;
  display: block;
}

.form__input-price{
  width: 23.2rem;
  height: 5rem;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.form__note{
  @include font(1.7rem, 500, #416782);
  line-height: 2.6rem;
  text-align: left;
  margin: 2rem 0 4.5rem 0;

  @media (max-width: 600px) {
    @include font(1.4rem, 500, #416782);
    line-height: 2.1rem;
    margin-bottom: 1rem;
  }
}

.fa-xmark{
  @include fa-xmark;
}
.dialogWithCustomer{
 @include formBox;
}
.form__title{
  @include title_h2;
}

::placeholder{
 color: #809FB8;
}

</style>