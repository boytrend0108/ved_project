<!--Шаблон для загрузки контрактов на вкладке ДОГОВОРЫ-->
<template>
  <div  
    :id="id" 
    class="contractComp">
    <h3 class="title"> {{ title }} </h3>

    <my-note 
      :note="warning_note" 
      :url="'info_red.svg'"
      v-if="showWarningInfo" 
      class="warning_note" 
     />
    <my-note class="note" :note="note" v-if="showNote" />

    <div class="UploadAndDownloadBox">
      <!--Cкачивание шаблона с сервера-->
      <my-download-item-from-server  
        v-if="showTemplate" 
        :href="href_templates"   
        :id="id"
        :type="'Шаблон'"
        :fileName="title"
        :showPreloader="showPreloader"
      />
      <!--Cкачивание документа с подписью исполнителя-->
      <my-download-item-from-server  
        v-if="showProviderDocs" 
        :href="href"   
        :id="id"
        :fileName="DOCS.completed_docs[this.id].name"
        :showPreloader="showPreloader" 
      />

      <div class="uploadCompBox"> 
        <my-upload-item 
         v-if="showUploadItem" 
         :id="id" 
         :msg="upload_msg" 
         :showPreloader="showPreloader"/>
        <!-- <div > --> 
          <my-uploaded-item  
            v-if="showUploadedItem"  
            :name="name" 
            :id="id"
          />
        <!-- </div> --> 
      </div> 
      <validation-errors v-if="showError"/>
      
      <!--Подписаный обеими сторонами документ-->
      <my-download-item-from-server  
        v-if="showCompletedDocs" 
        :href="href" 
        :id="id"
        :fileName="DOCS.completed_docs[this.id].name"
        :showPreloader="showPreloader"
      />
    </div> 

    <MyWrongFileFormat :id="id"/>

  </div>
</template>

<script>
import ValidationErrors from "./Form/ValidationErrors.vue";
import MyWrongFileFormat from "@/components/UI/Error/MyWrongFileFormat.vue"
import { mapGetters, mapMutations, mapActions } from "vuex";
import { onBeforeRouteLeave } from "vue-router"
import store from "@/store";
  export default {
    name:"contract-comp",
    components: { ValidationErrors, MyWrongFileFormat },
    props:{
      id:{ // parent id
        type: String
      },
    },

    data(){
        return{
          href_templates: "", // ccылка для шаблонов
          href2: "", // ccылка для подписанных документов
          showPreloader: false,
        }
      },
  
    computed:{
      ...mapGetters([
        "DOCS", "SITE_ROLE", "VALIDATION_ERRORS", "WRONG_FILE"
      ]),

      note() { // depending on the parent id, substitutes the required fields
      const note = {
        provider: "Скачайте договор, подпишите и загрузите в соответствующее поле",
        factory_contract: "Загрузите договор в соответствующее поле",
        factory_invoice: "Загрузите платёжку на фабрику в соответствующее поле",
       
        logistics_contract: "Скачайте договор, подпишите и загрузите в соответствующее поле",
        logistics_transportation_request: "Скачайте д/с, подпишите и загрузите в соответствующее поле",
        logistics_completion_certificate: "Скачайте, подпишите и загрузите в соответствующее поле",

        customs_customs_clearance: "Скачайте договор, подпишите и загрузите в соответствующее поле",
        customs_additional_agreement: "Скачайте договор, подпишите и загрузите в соответствующее поле",
        customs_completion_certificate: "Скачайте, подпишите и загрузите в соответствующее поле",

      }
      for (let el in note) {
        if (this.id === el) return note[el]
      }
        return ""
      },

      // eslint-disable-next-line
      warning_note(){ // depending on the parent id, substitutes the required fields
        if (this.SITE_ROLE === "provider") {
          switch (this.id) {
            case "factory_contract": return "Заказчик ещё не загрузил договор в систему"
            case "factory_invoice": return "Заказчик ещё не загрузил договор в систему"
            case "logistics_contract": return "Заказчик ещё не загрузил договор в систему"
            case "logistics_transportation_request": return "Заказчик ещё не загрузил заявку в систему"
            case "logistics_completion_certificate": return "Заказчик ещё не загрузил акт в систему"
            case "customs_customs_clearance": return "Заказчик ещё не загрузил договор в систему"
            case "customs_additional_agreement": return "Заказчик ещё не загрузил дополнительное соглашение в систему"
            case "customs_completion_certificate": return "Заказчик ещё не загрузил акт в систему"
           
          }
        }

        if (this.SITE_ROLE === "customer") {
          switch (this.id) {
            case "logistics_contract": return "Исполнитель ещё не загрузил договор в систему"
            case "logistics_transportation_request": return "Исполнитель ещё не загрузил заявку в систему"
            case "logistics_completion_certificate": return "Исполнитель ещё не загрузил акт в систему"
            case "customs_customs_clearance": return "Исполнитель ещё не загрузил договор в систему"
            case "customs_additional_agreement": return "Исполнитель ещё не загрузил дополнительное соглашение в систему"
            case "customs_completion_certificate": return "Исполнитель ещё не загрузил акт в систему"
          }
        }
       
      },

      title(){
        if(this.$route.path === `/provider/contracts/${this.$route.params.id}` 
         && this.id === "customs_additional_agreement"){
          return "Дополнительное соглашение"
        } else if (this.id === "customs_additional_agreement") {
          return "Дополнительное соглашение"
        } else if (this.id === "customs_completion_certificate") {
          return "Акт выполненных работ"
        } else if (this.id === "customs_customs_clearance") {
          return "Договор на таможенное оформление"
        } else if (this.id === "factory_contract") {
          return "Договор с фабрикой-поставщиком"
        } else if (this.id === "factory_invoice") {
          return "Платёжка на фабрику"
        } else if (this.id === "logistics_contract") {
          return "Договор на логистические услуги"
        } else if (this.id === "logistics_transportation_request") {
          return "Дополнительное соглашение/заявка на перевозку"
        } else if (this.id === "logistics_completion_certificate") {
          return "Акт выполненных работ"
        } 
        else return ""
      },

      upload_msg(){
        if(this.$route.path === `/provider/contracts/${this.$route.params.id}` 
           && this.id === "customs_additional_agreement"){
            return "Загрузить подписанный договор"
          } else if (this.id === "customs_additional_agreement") {
           return "Договор со специалистом"
          } else if (this.id === "logistics_transportation_request") {
            return "Загрузить заявку на перевозку"
          } else if (this.id === "customs_customs_clearance" || this.id === "logistics_contract") {
            return "Загрузить подписанный договор"
          } else if (this.id === "factory_contract") {
            return "Загрузить подписанный договор"
          } else if (this.id === "factory_invoice") {
            return "Загрузить платёжку на фабрику"
          } else if (this.id === "provider") {
            return "Загрузить подписанный договор"
          } else if (this.id === "logistics_completion_certificate" || this.id === "customs_completion_certificate") {
            return "Загрузить акт выполненных работ"
          }
          else return "" 
      },
// eslint-disable-next-line
      name(){
        switch(this.SITE_ROLE){
          case "customer":
            if(this.id === "customs_additional_agreement"  || this.id === "customs_customs_clearance" ){
              return this.DOCS[this.id].name
            } else {
              return this.DOCS[this.id].name
            } 

          case "provider":
            if(this.id === "customs_additional_agreement"  || this.id === "customs_customs_clearance" ){
            return this.DOCS[this.id].name
            } else {
              return this.DOCS[this.id].name
            }
        }
       
      }, 

      // eslint-disable-next-line
      name2(){
        switch(this.SITE_ROLE){
          case "customer":
           return this.DOCS.completed_docs[this.id].name

          case "provider":
           return this.DOCS.completed_docs[this.id].name
            
        }
       
      },
// eslint-disable-next-line
      showCompletedDocs(){
        if (this.SITE_ROLE === "customer") return false
        if (this.id === "factory_contract" || this.id === "factory_invoice") return false
        return this.DOCS.completed_docs[this.id].href ? true : false
      }, 
// eslint-disable-next-line
     showTemplate(){  // шаблон
        switch(this.SITE_ROLE){
          case "provider":
            if(this.id === "factory_invoice" || this.id === "factory_contract"){
              return false 
            } else {
              return this.DOCS.templates[this.id].href ? true : false
            }

          case "customer": return false
        }
      },
// eslint-disable-next-line    
      showUploadItem() {
        switch (this.SITE_ROLE) {
          case "customer":
            if (this.id === "factory_contract" || this.id === "factory_invoice") {
              return  this.DOCS[this.id].href || this.DOCS[this.id].name ? false : true 
            }

            if (!this.DOCS.completed_docs[this.id].href) return false
            else  return  this.DOCS[this.id].href || this.DOCS[this.id].name ? false : true 
           
          
          case "provider":
           if (this.id === "factory_contract" || this.id === "factory_invoice") return false
           return  this.DOCS[this.id].href ? false : true 
        }

      },
// eslint-disable-next-line
      showUploadedItem() {
          switch(this.SITE_ROLE){
            case "customer":
              if(this.id === "customs_additional_agreement"){
                return this.DOCS.customs_additional_agreement.name ? true : false
              } else if (this.id === "customs_completion_certificate"){
                return this.DOCS.customs_completion_certificate.name ? true : false
              } else if(this.id === "customs_customs_clearance"){
                return this.DOCS.customs_customs_clearance.name ? true : false
              } else {
                return this.DOCS[this.id].name ? true : false
              }
            
            case "provider":
            return  this.DOCS[this.id].href ? true : false
             
          }

         
      },

      showProviderDocs() {
        if (this.SITE_ROLE === "provider") return false
        if (this.id === "factory_contract" || this.id === "factory_invoice") return false
        return this.DOCS.completed_docs[this.id].href ? true : false
      },

      // eslint-disable-next-line
      showWarningInfo(){
        switch(this.SITE_ROLE){
          case "customer":
          if(this.id === "factory_contract" || this.id === "factory_invoice" ) return  false
          if (!this.DOCS.completed_docs[this.id].href) return true
              else return false
            
    
          case "provider":
            if(this.id === "factory_contract" || this.id === "factory_invoice" ){
              return  !this.DOCS[this.id].href ?  true : false
            } else { 
              if (!this.DOCS[this.id].href) return false
                 else return this.DOCS.completed_docs[this.id].href ? false : true
            }
         
        }
      },

 // eslint-disable-next-line
      showNote(){
        const site_role = this.SITE_ROLE
        switch(site_role){
          case "customer": 
            if (this.id === "factory_contract" || this.id === "factory_invoice" ){ 
              return this.DOCS[this.id].href ? false : true}
              if (!this.DOCS.completed_docs[this.id].href) return false
                else return this.DOCS[this.id].href ? false : true
           
        
          case "provider": 
            if (this.id === "factory_contract" || this.id === "factory_invoice" ) return false
            return this.DOCS[this.id].href ? false : true 
        }
      },

      href() {
        return this.DOCS.completed_docs[this.id].href
      },

      showError() {
        if (!this.VALIDATION_ERRORS) return;
        const id = this.id.replaceAll("_", "-" )
        if (this.VALIDATION_ERRORS.includes(id)) return true
        else return false
      }

    },


     methods:{
      ...mapActions([
        "CHECK_FILE_EXIST","GET_FILE_FROM_SERVER", "GET_DOCS_TEMPLATES"
      ]),
      ...mapMutations([ 
        "SET_UPLOAD_DATA"
      ])
     },


     mounted(){
      const orderId = this.$route.params.id
      this.showPreloader = true;

      switch (this.id) {
        case "factory_contract": 
          this.GET_FILE_FROM_SERVER({ orderId, inputId: this.id }).then(() => this.showPreloader = false)
          break
        case "factory_invoice": 
          this.GET_FILE_FROM_SERVER({ orderId, inputId: this.id }).then(() => this.showPreloader = false)
          break
        default:
        this.GET_FILE_FROM_SERVER({ orderId, inputId: this.id, site_role: "provider" }).then(() => this.showPreloader = false)
        this.GET_FILE_FROM_SERVER({ orderId, inputId: this.id, site_role: "customer" }).then(() => this.showPreloader = false)
      }


      // подгружаем шаблоны документов 
      const getTemplates = () => {
      this.showPreloader = true;
      this.GET_FILE_FROM_SERVER({orderId: this.$route.params.id, inputId: this.id, site_role: "template"})
        .then(() => {
          this.showPreloader = false;
          this.href_templates = this.DOCS.templates[this.id].href
        })
    }

      if (this.SITE_ROLE === "provider") {
        if(this.id === "factory_contract" || this.id === "factory_invoice") return
        getTemplates()   
      } 
     

    },

    // oчищаем данные перед выходом
    setup(props){ // 
      onBeforeRouteLeave((to, from)=>{
        if(to.params.id !== from.params.id){
          store.commit("SET_UPLOAD_DATA",{ file: "", name:"", id:props.id})
        } 
      })
    }
}
</script>

<style lang="scss" scoped>

.warning_note{
  margin-bottom: 2rem;
  
  @media (max-width: 600px) {
    @include font(1.4rem, 500, $font-color2);
    line-height: 19px;
  }
}
.title{
  @include title_h3;
  margin-bottom: 2rem;
  text-align: left;

}
.note{
  align-items: left;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    @include font(1.4rem, 500, $font-color2);
    line-height: 19px;
  }
}
.contractComp{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.UploadAndDownloadBox{
 @include UploadAndDownloadBox
}

.uploadCompBox{
  @include uploadCompBox;
}

// .wrong_format{
//   color: red !important;
//   @include note;
//   margin-top: 2rem;
//   top: 164px;
//   background: antiquewhite;
//   padding: 10px 2rem;
//   border-radius: 10px;
//   z-index: 3;
// }

// .slide-enter-from {
//   opacity: 0;
//   transform: translateX(1000px) ;
// }

// .slide-leave-to {
//   opacity: 0;
//   transform: translateY(1000px);
// }
// .slide-leave-active,
// .slide-enter-active {
//   transition: all 0.5s ease;
// }
</style>