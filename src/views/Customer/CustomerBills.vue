<template>
  <div>
    <h1 class="title">Счета</h1>  
    <my-note v-if="!DOCS.provider_invoice_check.length" :note="note_1" url="info_red.svg" /> 

    <transition-group name="list" appear>
      <div class="uploadCompBox" v-for="(el, i) in sortedBills" :key="i" >
      <my-note v-if="true" :note="note_2" class="note2"/> 

      <div class="invoice-wr">
        <!-- Загрузка счета исполнителя -->
        <my-download-item-from-server 
          v-if="true" 
          id="receipt_of_payment"
          :href="'https://docs.google.com/viewer?url=https://static.delegat.online/' + DOCS.provider_invoice_check[i].invoice_path"
          :fileName="DOCS.provider_invoice_check[i].invoice_name"
        />
          <!--Форма для загрузки пратежки--> 
        <div class="uploadArea">
          <my-wrong-file-format :id="`invoice` + DOCS.provider_invoice_check[i].id"/>
          <my-upload-item 
            v-if="!DOCS.provider_invoice_check[i].check_path"
            id="invoice"
            :msg="'Загрузить платёжное поручение'"
            class="uploadFirst"
            :invoice_id="DOCS.provider_invoice_check[i].id"
          /> 
            <!--Загруженная платежка-->
            <my-uploaded-item 
              v-else
              :name="'Платежка по счету: '+DOCS.provider_invoice_check[i].invoice_name"  
              id="provider_invoice"
              :number="i"
            />
        </div>
      </div>
    </div>
    </transition-group>
   
    <validation-errors v-if="showError"/> 
  </div>
</template>

<script>
import ValidationErrors from "@/components/Form/ValidationErrors.vue";
import MyWrongFileFormat from "@/components/UI/Error/MyWrongFileFormat.vue"
import { mapGetters, mapActions, mapMutations } from "vuex"
  export default {
    name:"customer-bills",
    components: { ValidationErrors, MyWrongFileFormat },
    data(){
      return{
        note_1: "Специалист ещё не выставил счётa за свои услуги",
        note_2: "Скачайте счёт, оплатите услуги специалиста по счёту и загрузите платёжку",
      }
    },

    computed:{
      ...mapGetters([
         "DOCS", "VALIDATION_ERRORS"
      ]),

      sortedBills() {
        debugger
        const arr = [...this.DOCS.provider_invoice_check].sort((a, b) =>{ return a.id - b.id} )
         return arr
      },

      showError() {
        if (!this.VALIDATION_ERRORS) return;
        if (this.VALIDATION_ERRORS.includes("invoice")) return true
        
        return false
      },
    }, 

    methods:{
      ...mapActions([
        "GET_BILLS_FROM_SERVER", "GET_PROVIDER_OFFERS"
      ]),
      ...mapMutations(["SET_CLEAR_DOCS"])
    },

    mounted(){
      this.GET_BILLS_FROM_SERVER(this.$route.params.id)
      //---Получаем все отклики по заявке
      this.GET_PROVIDER_OFFERS(this.$route.params.id)
    },

    unmounted() {
      this.SET_CLEAR_DOCS();
    }
  }
</script>

<style lang="scss" scoped>

.invoice-wr {

  .uploadArea {
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  @include flex(row, flex-start, flex-start, 2rem);

  @media (max-width: 600px) {
    flex-direction: column;
  }
}
.title{
  @include title_h2;
  margin-bottom: 2rem;
}

.note-box {
  @include note-box;
  justify-content: flex-start;
}

.note {
 @include note
}

.note2{
  margin-bottom: 1.2rem;
}

.img{
  margin-top: .3rem;
}

.UploadAndDownloadBox{
 @include UploadAndDownloadBox;
 margin-top: 4.6rem;
}

.uploadCompBox{
  @include uploadCompBox;
  margin-bottom: 4rem;
}

.list-enter-from{
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active,
.list-leave-active{
  transition: all 0.5s ease; 
}
.list-leave-to{
  opacity: 0;
  transform: scale(0.5);
}

</style>
