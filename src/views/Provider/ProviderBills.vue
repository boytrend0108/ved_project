<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div class="providerBills">
     <h1 class="title">Счета</h1> 

     <transition-group name="list" appear class="transition" tag="div">
      <div class="uploadCompBox" v-for="(el, i) in sortedBills" :key="i" > 
        <div class="notes">
          <my-note :note="note2" :url="'info_red.svg'" v-if="!DOCS.provider_invoice_check[i].check_path"/>
        </div>
        <div class="invoice-wr"> 
          <!-- Загрузка платежки заказчика -->
          <my-download-item-from-server 
            v-if="DOCS.provider_invoice_check[i].check_path"  
            id="receipt_of_payment"
            :href="'https://docs.google.com/viewer?url=https://static.delegat.online/'+ DOCS.provider_invoice_check[i].check_path"
            :fileName="'Платежное поручение'"
          />
        
          <!--Загруженный счёт исполнителя-->
          <my-uploaded-item 
            v-if="DOCS.provider_invoice_check[i].invoice_path"
            :name="DOCS.provider_invoice_check[i].invoice_name"  
            id="provider_invoice"
            :number="i"
          />
        </div>  
      </div>
     </transition-group>

      <!--Загрузка счета исполнителя-->
      <div class="uploadArea">
        <my-note :note="note" :url="'info.svg'"  />
        <my-wrong-file-format id="invoice"/>
        <validation-errors v-if="showError"/> 
        <my-upload-item   
          id="invoice"
          :msg="'Загрузить счёт'"
          class="uploadFirst"
        />  
      </div>
  </div>
</template>

<script>
import ValidationErrors from "@/components/Form/ValidationErrors.vue";
import MyWrongFileFormat from "@/components/UI/Error/MyWrongFileFormat.vue"
import { mapGetters, mapActions, mapMutations } from "vuex";
  export default {
    name:"provider-bills",
    components: { ValidationErrors, MyWrongFileFormat },
    data(){
      return{
        note:"Выставьте счёт за свои услуги. После оплаты заказчик загрузит сюда платёжку",
        note2:"Заказчик еще не загрузил платежное поручение по этому счёту",
        is_provider_invoice: false,
        is_customer_invoice: false,
        number: null,
      }
    },

    computed:{
      ...mapGetters([
        "DOCS", "VALIDATION_ERRORS",
      ]),
      
      showUploadForm() {    
        return this.DOCS.provider_invoice[this.number].binaryFile ? false : true
      },

      name() {
        return this.DOCS.provider_invoice[this.number].name
      },

      showItem(){
        if(this.DOCS.invoice.file){
          return true
        } return false
      },

      showError() {
        if (!this.VALIDATION_ERRORS) return;
        if (this.VALIDATION_ERRORS.includes("invoice")) return true
        else return false
      },

      sortedBills() {
         return [...this.DOCS.provider_invoice_check].sort((a, b) => a.id - b.id)
      }
    }, 

    methods: {
      ...mapActions([ 
        "GET_FILE_FROM_SERVER", "GET_BILLS_FROM_SERVER", "GET_CHAT_ID"
      ]),
      ...mapMutations(["SET_CLEAR_DOCS"])
    },

    watch:{
      DOCS: {
        handler() {
          setTimeout(() =>  window.scrollTo(0, document.body.scrollHeight), 500 )
        },
        deep: true
      }
    },

    mounted() {
      this.GET_BILLS_FROM_SERVER(this.$route.params.id)
      this.GET_CHAT_ID({ order_id: this.$route.params.id, offer_id: this.$route.query.offer_id })
    },

    unmounted() {
      this.SET_CLEAR_DOCS();
    }
  }
</script>

<style lang="scss" scoped>
  .transition {
    position: relative;
  }
.uploadFirst {
  margin-top: 2rem;
}

.invoice-wr {
  @include flex(row, flex-start, flex-start, 2rem);
  
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
}

.uploadArea {
  margin-top: 4.5rem;
}

.uploadCompBox{
  margin-top: 4.5rem;
  @include flex(column, flex-start, flex-start, 1.5rem);
  
  @media (max-width: 600px) {
    width: 100%;
  }
}

.title{
  @include title_h2;
}

.list-enter-from {
    opacity: 0;
    transform: scale(0.6);
  }
  .list-enter-active {
    transition: all 0.5s ease;
  }
  .list-leave-to {
    opacity: 0;
    transform: translateX(40rem);
  }
  .list-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    /* позишен добавляем чтобы елементы которые остаются сдвигались медленнее. position:relative выше */
  }

  .list-move {
    transition: all 1s ease;
  }

</style>