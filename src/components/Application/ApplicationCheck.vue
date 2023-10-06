<template>
  <div class="main" >
    <section class="summary" @click="changeData($event)">
      <div 
        class="summary__item"  
        id="country"
      >
        <div class="wr">
          <p 
            class="summary__question"
            :class="{'warning': !COUNTRY}"  
          >{{ TITLE.country }}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
        <p class="summary__answer">{{ COUNTRY }}</p>
      </div>

      <div class="summary__item" id="cities">
        <div class="wr">
          <p 
            class="summary__question"
            :class="{ 'warning': isInputCityValid }"
            >{{TITLE.cities}}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
        <p class="summary__answer"> {{ CITY }} {{ TO_ADDRESS }} </p>
      </div>

      <div class="summary__item" id="naming">
        <div class="wr">
          <p 
            class="summary__question"
            :class="{'warning': !APPLICATION_NAME}"
          >{{ TITLE.naming }} </p> 
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
        <p class="summary__answer"> {{ APPLICATION_NAME }} </p>
      </div>

      <div class="summary__item" id="description">
        <div class="wr">
          <p 
            class="summary__question"
            :class="{'warning': !descriptionValidation}" 
          >
            {{ TITLE.description }}
          </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
        <p class="summary__answer">Описание: {{ APPLICATION_DESCRIPTION || " добавьте описание" }}</p>
        <p class="summary__answer"> Кол-во: {{ QUANTITY || 0 }} шт </p>
        <p class="summary__answer">Общий вес: {{ WEIGHT || 0 }} кг</p>
        <p class="summary__answer">Общий объём: {{ CAPACITY || 0 }} м³</p>
        <p 
          class="summary__answer"
          v-if="$route.name !== 'cost-calculation'"
        > 
          Дата готовности: {{ DATE_OF_READINESS || " добавьте дату готовности" }} 
        </p>

      </div>
     
      <div class="summary__item" id="additional_services">
        <div class="wr">
          <p 
            class="summary__question"
            :class="{'warning': !SERVICES.length && !COMMENT_FOR_SERVICE}"  
          >
            {{ TITLE.additional_services }}
          </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
        
        <div class="summary__answer">
          <ul class="summary__ul">
            <li class="summary__li" v-for="el in SERVICES" :key="el.id" > {{ el }}</li>
            <li class="summary__li" v-if="COMMENT_FOR_SERVICE"> {{ COMMENT_FOR_SERVICE }} </li>
          </ul>
        </div>
      </div> 

      <div class="summary__item" id="delivery_type">
        <div class="wr">
          <p class="summary__question">{{ TITLE.delivery_type }}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
          <p class="summary__answer"> {{ SHIPPING }}</p>
      </div>

      <div class="summary__item" id="info1">
        <div class="wr">
          <p 
            class="summary__question"
            :class="{'warning': !ADDRESS_FROM.from_city || !ADDRESS_FROM.from_address }" 
          >
            Точный адрес забора груза
          </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" />
        </div>
        <p class="summary__answer"> {{ ADDRESS_FROM.from_city }}  {{ ADDRESS_FROM.from_address }}</p>
      </div>
      <div 
        v-if="$route.name !== 'cost-calculation'"
        class="summary__item" 
        id="info2"
      >

      <div class="wr">
        <p 
          class="summary__question"
          :class="{'warning': !FACTORY_CONTACT.agent_fullname || !FACTORY_CONTACT.agent_phone_number || !FACTORY_CONTACT.agent_email }"
          >
            Контакты представителя фабрики
          </p>
        <font-awesome-icon icon="pen-to-square" class="icon-edit" />
      </div>
      <p class="summary__answer"> {{ FACTORY_CONTACT.agent_fullname}} {{ FACTORY_CONTACT.agent_phone_number }} {{ FACTORY_CONTACT.agent_email }}</p> 
      </div>

      <!--Два нижних блока видно только на странице /customer-->
      <div 
        @click.stop
        v-if="this.$route.path === '/customer'" 
        class="summary__item disabled" 
        id="companyName" >
        <p class="summary__question">Фирма</p>
        <p class="summary__answer"> {{ companyName }} </p>
      </div>
      <div 
        @click.stop
        v-if="this.$route.path === '/customer'"  
        class="summary__item disabled" 
        id="companyDetals">
        <p class="summary__question">Рекизиты</p>
        <p class="summary__answer"> {{ bankName }}</p> 
      </div>

      <div class="photo-wr">
        <application-upload-foto class="uploadFoto bottom" />
        <font-awesome-icon 
          icon="pen-to-square" 
          class="icon-edit" 
          v-if="showEditBtn" 
          @click="edit" 
        />
      </div>  
    <application-docs />

    <div class="btn-wr">
      <my-white-btn 
        v-if="this.$route.path !== '/customer'"
        class="btn run-btn" 
        :class="{disabled: !isApplicationComplete}"
        @click="goToCustomerPage" 
        :disabled="!isApplicationComplete" 
      >Далее
        <font-awesome-icon icon="fa-solid fa-chevron-right icon" />
      </my-white-btn>
      <p class="warning" v-if="!isApplicationComplete" >Пожалуйста заполните все поля</p>
      <my-semipolar-spinner v-if="showPreloader" />
      <p v-if="showError" class="error"> Ошибка при отправке заявки </p>
    </div>

    </section> 
    <my-dialog v-if="DIALOG">
       <application-form />
    </my-dialog>
  </div>

</template>

<script>
import ApplicationDocs from "./ApplicationDocs.vue";
import ApplicationForm from "@/components/Form/ApplicationForm.vue";
import ApplicationUploadFoto from "./ApplicationUploadFoto.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "application-check",
  components: {
    ApplicationForm, ApplicationUploadFoto, ApplicationDocs
  },
  data() {
    return {
      files: [],
      value: "",
      inputTitle_1: "инвойс",
      inputTitle_2: "упаковочный лист",
      isApplicationComplete: true,
      showPreloader: false,
      showError: false
    }
  },

  computed: {
    ...mapGetters([
      "COUNTRY", "CITY", "APPLICATION_NAME", "APPLICATION_DESCRIPTION", "SERVICES", "SHIPPING",
      "UPLOAD_IMG_INPUT", "DIALOG", "TITLE", "ADDRESS_FROM", "FACTORY_CONTACT", "CURRENT_USER", "INVOICE", "PACKING_LIST", "COMPANY_NAME", "INN", "BANK_NAME", "CURRENCY_TYPE",
      "DOCS", "FIRMS", "WEIGHT", "CAPACITY", "DATE_OF_READINESS", "TO_ADDRESS", "QUANTITY", "WRONG_FILE", "COMMENT_FOR_SERVICE"
    ]),

    companyName() {
      if (this.FIRMS[0].long_name) {
        return `${this.FIRMS[0].long_name}, ИНН ${this.FIRMS[0].inn}`
      } else {
        return ""
      }
    },
    bankName() {
      if (this.BANK_NAME) {
        return `${this.BANK_NAME} ${this.CURRENCY_TYPE}`
      } else {
        return ""
      }
    },

    descriptionValidation() {
      if (this.$route.name === "cost-calculation") {
        if (this.APPLICATION_DESCRIPTION && this.QUANTITY && this.WEIGHT && this.CAPACITY ) return true
      else return false
      } else {
        if (this.APPLICATION_DESCRIPTION && this.QUANTITY && this.WEIGHT && this.CAPACITY && this.DATE_OF_READINESS) return true
      else return false
      }
    },

    isInputCityValid() {
      if (this.$route.name === "cost-calculation") {
        return !this.CITY ? true : false
      } else {
        return !this.CITY || !this.TO_ADDRESS ? true : false
      }
    },

    showEditBtn() {
      return this.$route.query.status === "UNPUBLISHED" ? true : false
    },

  },

  methods: {
    ...mapMutations([
      "SET_UPLOAD_IMG_INPUT",
      "SHOW_DIALOG",
      "SET_SELECTED_ID",
      "SET_ACTIVE_MODULE",
      "SET_IS_APPLICATION_COMPLETE",
      "SET_FILTER_TYPE", "SET_ORDER_TYPE"
    ]),
    ...mapActions([ 
      "UPLOAD_DOCS", "COST_CALCULATION_ORDER_CREATE"
    ]),

    isApplicationCompleteFn() {
      switch (this.$route.name) {
        case "cost-calculation":
          if (this.COUNTRY &&
            this.CITY &&
            this.APPLICATION_NAME &&
            this.APPLICATION_DESCRIPTION &&
            this.WEIGHT && this.CAPACITY &&
           ( this.SERVICES.length || this.COMMENT_FOR_SERVICE) &&
            this.SHIPPING &&
            this.ADDRESS_FROM.from_city && this.ADDRESS_FROM.from_address) {
            this.isApplicationComplete = true;
            return true;
          } else {
            this.isApplicationComplete = false;
            return false;
          }

        default: 
          if (this.COUNTRY &&
            this.CITY &&
            this.TO_ADDRESS && 
            this.APPLICATION_NAME &&
            this.APPLICATION_DESCRIPTION &&
            this.WEIGHT && this.CAPACITY && this.DATE_OF_READINESS &&
            ( this.SERVICES.length || this.COMMENT_FOR_SERVICE) &&
            this.SHIPPING && 
            this.ADDRESS_FROM.from_city && this.ADDRESS_FROM.from_address &&
            this.FACTORY_CONTACT.agent_fullname && this.FACTORY_CONTACT.agent_phone_number && this.FACTORY_CONTACT.agent_email &&
            this.DOCS.order_invoice.name && this.DOCS.order_packing_list.name) {
            this.isApplicationComplete = true;
            return true;
          } else {
            this.isApplicationComplete = false;
            return false;
          } 
      }

    },

    /**
     * Оpen dialog window
     * Set id of the selected elem
     * @param {*} event   
     */
    changeData(event) {
      if (this.$route.path === ("/customer")) { // oтправленную на сервер заявку нельзя редактировать
        return
      }
      if (event.target.closest(".summary__item")) {
        this.SHOW_DIALOG()
        this.SET_SELECTED_ID(event.target.closest(".summary__item").getAttribute("id"))
      } else return
    },

    saveApplicationToLocalStorage() {
    // будем использовать когда надо будет сохранять заявку перед регистрацией
      const newApplication = {
        "firm_id": this.FIRMS[0].fid,
        "from_country": this.COUNTRY,
        "from_city": this.ADDRESS_FROM.city,
        "from_address": this.ADDRESS_FROM.street,
        "agent_fullname": this.FACTORY_CONTACT.fio,
        "agent_phone_number": this.FACTORY_CONTACT.phone,
        "agent_email": this.FACTORY_CONTACT.email,
        "to_country": "Россия",
        "to_city": this.CITY,
        "to_address": this.TO_ADDRESS,
        "name": this.APPLICATION_NAME,
        "description": this.APPLICATION_DESCRIPTION,
        "additional_services": this.SERVICES,
        "delivery_type": this.SHIPPING,
        "quantity": this.QUANTITY,
        "gross": "string",
        "net": this.WEIGHT,
        "cargo_volume": this.CAPACITY,
        "date_of_cargo_readiness": this.DATE_OF_READINESS,
        "created_at": Date.now()
      }
      localStorage.setItem("newApplicationDelivery", JSON.stringify(newApplication))

      const customerInvoice = this.DOCS.order_invoice.file
      localStorage.setItem("customerInvoice", JSON.stringify(customerInvoice))

      const packingList = this.DOCS.order_packing_list.file
      localStorage.setItem("packingList", JSON.stringify(packingList))

      const applicationFoto = this.DOCS.images.files
      localStorage.setItem("numberOfPhoto", applicationFoto.length)
      applicationFoto.forEach((el,i) => {
        localStorage.setItem(`applicationFoto_${i+1}`, JSON.stringify(el))
      });
     
    },

    goToCustomerPage() {
      if (!this.isApplicationCompleteFn()) {
        setTimeout(() => {
          this.isApplicationComplete = true
        }, 3000)
        return 
      }

      switch (this.$route.name) {
        case "customer-new-application": 
          if (this.CURRENT_USER) {
            this.SET_ORDER_TYPE("delivery")
            localStorage.setItem("application_type", "delivery")
            this.SET_ACTIVE_MODULE("application") // обнуляем состояние до начального
            this.$router.push(`/customer?module=select_company`)
          } else {
            this.saveApplicationToLocalStorage()
            this.SET_IS_APPLICATION_COMPLETE(this.isApplicationComplete)
            this.$router.push(`/customer/signin`)
          }
          break

        case "cost-calculation": 
          this.showPreloader = true
          this.SET_ORDER_TYPE("cost")
          localStorage.setItem("application_type", "cost")
          this.SET_ACTIVE_MODULE('application')
          this.$router.push("/customer?module=select_company")
          break
      }
    }


  }
}


</script>

<style lang="scss" scoped>

.main {
  width: 100%;
}

.wr {
  @include flex(row, space-between, center, 0);
  width: 100%;
}
 
.icon-edit {
  min-width: 2rem;
  min-height: 2rem;
  color: $main-color;
  cursor: pointer;
  margin-right: 2rem;
}
.photo-wr {
  @include flex(row, space-between, center, 0);
  width: 98%;
}

.error {
  @include errorMsg;
}
.btn-wr{
  @include flex(row, flex-start, center, 3rem);
  margin-top: 10rem;
  margin-bottom: 9rem;

  @media (max-width:600px) {
    margin-top: 3rem;
    margin-bottom: 0;
  }
}

.disabled{
  @include disabled;
}
.summary{
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #ECF0F3;
  margin-top: 4.5rem;
  
  @media (max-width: 600px) {
    margin-top: 3rem;
  }
}

.summary__item{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top:2px solid #ECF0F3;
  padding: 3rem 0;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 2rem 0;
  }
}

.summary__question {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  text-align: left;
  flex-grow: 1;
}
.warning {
  color: crimson;
}

.summary__answer {
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
  text-align: left;
  width: 90%;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
}

.summary__ul{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3rem;
}
.summary__li{
  list-style-type: disc;
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
}


.btn{
  background-color: $bg-color;
  color:#416782;
  border: none;
  padding: 0 2rem;

  @media (max-width:600px) {
    width: 100%;
    background-color: $main-color;
    color: #FFFF;
    height: 4rem;
  }
}


</style>