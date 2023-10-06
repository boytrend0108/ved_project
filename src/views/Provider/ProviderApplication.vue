<template>
  <div class="providerApplication">
    <h1 class="visually-hidden">Заявка</h1>
    <my-color-btn 
      class="btn-back" 
      @click.stop="this.$router.push('/provider/feedbacks/?status=pending')"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-left" />
      Вернуться к списку 
    </my-color-btn>
    <h2 class="title">Заявка " {{ order.name }} " </h2>

    <div class="header">
      <div class="header__item"> 
        <p class="header__title"> Заказчик </p>
        <div class="customer">
          <img  
              class="avatar"
              :src="setAvatar"
              alt="avatar"
            >
            <p class="text"> {{ customer.full_name }}</p>
        </div>         
      </div>

      <div class="header__item">
        <p class="header__title">Опубликована</p>  
        <p class="text">{{ dateCreated }}</p>  
      </div>

      <div class="header__item btn-wr">
          <my-blue-btn 
            @click.self.stop="showDialogLogic" 
            v-if="showBtn"
          >Откликнуться</my-blue-btn>
      </div>
    </div>
    
    <div class="scroll">
      <section class="summary" >
        <div class="summary__item" id="country">
          <p class="summary__question"> Страна отправления </p>
          <p class="summary__answer"> {{ order.from_country }} {{ order.from_address }}</p>
        </div>
        <div class="summary__item" id="cities">
          <p class="summary__question">{{this.TITLE.cities}}</p>
          <p class="summary__answer"> {{ order.to_city }} {{ order.to_address }}</p>
        </div>
        <div class="summary__item" id="naming">
          <p class="summary__question"> Название заявки </p>
          <p class="summary__answer"> {{order.name}}</p>
        </div>
        <div class="summary__item" id="product"> 
          <p class="summary__question"> Краткое описание товара </p>
          <p class="summary__answer"> {{ order.description }} </p>
        </div>

        <div class="summary__item" id="weight" :class="{'warning': !order.net}">
          <p class="summary__question"> Общий вес БРУТТО, кг </p>
          <p class="summary__answer">{{ order.net }}</p> 
        </div>
        <div class="summary__item" id="capacity" :class="{'warning': !order.cargo_volume}">
          <p class="summary__question"> Общий объём груза, м³ </p>
          <p class="summary__answer">{{ order.cargo_volume }}</p>
        </div>
        <div 
          class="summary__item" i
          d="dateOfReadiness2" 
          :class=" {'warning': !order.date_of_cargo_readiness}"
        >
          <p class="summary__question"> Дата готовности груза </p>
          <p class="summary__answer">{{ order.date_of_cargo_readiness }}</p>
        </div>

        <div class="summary__item" id="additional_services">
          <p class="summary__question"> Требуемые услуги </p>
          <div class="summary__answer">
            <ul class="summary__ul">
              <li 
                class="summary__li" 
                v-for="el in additional_services" :key="el.id"> {{ el }} 
              </li>
              <li 
                class="summary__li"
                v-if="order.comment_for_service"
              >
                {{ order.comment_for_service }}
              </li>
            </ul>
          </div> 
        </div>
        <div class="summary__item" id="delivery_type">
          <p class="summary__question">{{ this.TITLE.delivery_type }}</p>
          <p class="summary__answer"> {{ delivery_type }}</p>
        </div>
        
        <div class="summary__item" id="info2">
          <p class="summary__question">Контакты представителя фабрики</p>
          <p class="summary__answer"> 
            {{ order.agent_fullname}} 
            {{ order.agent_phone_number}} 
            {{ order.agent_email}}
          </p>
        </div>
  
        <!--Photo -->
          <application-download-photo />
  
        <!--Загруженные инвойс и упаковочный лист-->
        <application-download-invoice-and-p-list class="download-bottom" />

        <div class="header__item">
          <my-blue-btn 
            @click.self.stop="showDialogLogic" 
            v-if="showBtn"
            class="btn-blue"
          >Откликнуться</my-blue-btn>
        </div>

      </section>
    </div>
 
    <my-dialog v-if="DIALOG">
      <application-form v-if="SHOW_APPLICATION_FORM" />
      <dialog-with-customer-form v-if="DIALOG_WITH_CUSTOMER" />
      <proposal-sent-form v-if="SHOW_PROPOSAL_SENT_FORM" />
    </my-dialog>

    <my-big-spinner  v-if="showPreloader"/>
  </div>
</template>

<script>

import ProposalSentForm from "@/components/Form/ProposalSentForm.vue";
import DialogWithCustomerForm from "@/components/Form/DialogWithCustomerForm"
import ApplicationForm from "@/components/Form/ApplicationForm.vue";
import ApplicationDownloadPhoto from "@/components/Application/ApplicationDownloadPhoto.vue";
import ApplicationDownloadInvoiceAndPList from "@/components/Application/ApplicationDownloadInvoiceAndPList.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {getDocsFromServer} from "@/helpers/countSentDocs";

export default {
  name: "provider-application",
  components: {
    DialogWithCustomerForm, 
    ApplicationForm,
    ProposalSentForm,
    ApplicationDownloadPhoto,
    ApplicationDownloadInvoiceAndPList,
  },

  data() {
    return {
      files: [],
      value: "",
      inputTitle_1: "инвойс",
      inputTitle_2: "упаковочный лист",
      id_1: "input",
      id_2: "order_invoice",
      id_3: "order_packing_list",
      dialogWithCustomer: false,
      order: "",
      showPreloader: false,
      order_packing_list: "",
      order_invoice: "",
      image: [],
      customer: {}, // customer data
      additional_services: [],
      delivery_type: '',
    }
  },

  computed: {
    ...mapGetters([
      "DIALOG", "TITLE", "CURRENT_USER", "DIALOG_WITH_CUSTOMER",
      "SHOW_PROPOSAL_SENT_FORM", "SHOW_APPLICATION_FORM",
      "ALL_PUBLISHED_ORDERS", "PUBLISHED_ORDERS_CUSTOMER", "DOCS",
      "CUSTOMER_FIRM", "SELECTED_ORDER", "IS_OFFER_SENDED", "BTN_ID",
      "SHOW_PDF_VIEWER", "WEIGHT", "CAPACITY", "DATE_OF_READINESS", "AVATAR_BY_ID", 
      "NEW_OFFER_IN_PROGRESS",
    ]),

    paramsOrderId() {
      return this.$route.params.id;
    },

    dateCreated() {
      if (!this.order) return
      return this.order.created_at.split("").slice(0, 10).join("")
    },
    // eslint-disable-next-line
    src() {
      switch (this.BTN_ID) {
        case "order_invoice": return this.DOCS.order_invoice.customer.url
        case "order_packing_list": return this.DOCS.order_packing_list.url
      }
    },

    showBtn() {
      if (
        this.order.status === "IN_PROGRESS"
        || this.order.status === "COMPLETED"
        || this.$route.query.feedback === "true"
        || this.IS_OFFER_SENDED
      ) return false
      return true
    },

    setAvatar() {
      if (this.AVATAR_BY_ID === "https://static.delegat.online/default/user.png") {
        return require("@/assets/images/icons/user.svg")
      } 
      
      return this.AVATAR_BY_ID
    }
  },

  methods: {
    ...mapMutations([
      "SHOW_DIALOG", 
      "SWITCH_DIALOG_WITH_CUSTOMER", 
      "SET_OFFER_PRICE", 
      "SET_OFFER_MSG", 
      "SET_IS_OFFER_SENDED", 
      "SET_CHAT_ID", 
      "SET_NEW_OFFER_IN_PROGRESS", 
      "SET_SHOW_PRELOADER",
      "SET_CLEAR_NEW_APPLICATION",
      "SET_CLEAR_DOCS",
    ]),
    ...mapActions([
      "DOWNLOAD_DOCS", 
      "GET_AVATAR_BY_ID", 
      "GET_CUSTOMER_ORDER_BY_ID", 
      "GET_USER_BY_ID", 
      "GET_CHAT_ID",
    ]),

    getOrderById() {
      this.SET_SHOW_PRELOADER(true)
      this.GET_CUSTOMER_ORDER_BY_ID(this.$route.params.id)
      .then(res => {
        debugger
        this.order = res
        this.additional_services = this.order.additional_services
        this.delivery_type = this.order.delivery_type
        this.GET_USER_BY_ID(this.order.user_id)
          .then(res => this.customer = res)
        this.GET_AVATAR_BY_ID(res.user_id)

        if (!this.$route.query.offer_id) {
          this.SET_CHAT_ID(null)
        } else {
          this.GET_CHAT_ID({ order_id: this.$route.params.id, offer_id: this.$route.query.offer_id })
        }

        this.SET_SHOW_PRELOADER(false)
      })
      .catch(() => this.SET_SHOW_PRELOADER(false))
    },

    showDialogLogic() {
      this.$router.push({ query: { "form": "dialog" } })
      this.SWITCH_DIALOG_WITH_CUSTOMER(true)
      this.SHOW_DIALOG()
    },

    downloadFile() {
      this.DOWNLOAD_DOCS()
        .then(() => {
          document.querySelector("#downloadPackageList").click()
        })
    },

    goToCustomerPage() {
      if (this.CURRENT_USER) {
        this.$router.push(`/customer?module=select_company`)
      } else {
        this.$router.push(`/login`)
      }
    },

  },

  watch: {
    paramsOrderId() {
      this.getOrderById();
    }
  },

  mounted() { 
    this.SET_IS_OFFER_SENDED(false)
    this.getOrderById();

    // для удаления красной точки в компронете ProviderFeedback
    if (this.NEW_OFFER_IN_PROGRESS.includes(+this.$route.query.offer_id)) {
      this.SET_NEW_OFFER_IN_PROGRESS({data: this.$route.query.offer_id, action:"delete"})
    }

     //--- получаем все договора
     getDocsFromServer();

  },

  unmounted() {
   this.SET_CLEAR_NEW_APPLICATION();
   this.SET_CLEAR_DOCS();
   this.SET_OFFER_MSG("");
   this.SET_OFFER_PRICE("")
  }

}

</script>

<style lang="scss" scoped>

.visually-hidden {
  @include visually-hidden;
}

.iframe{
  width: 90vw;
  height: 90vh; 
}

.providerApplication{
  padding-bottom: 2rem;
}
.item-title{
  font-size: 1rem;
}

.downloadButton{
  width: 33.5rem;
  height: 15.5rem;
  background: #EEEEF0;
  border-radius: 1rem;
  @include flex(column, center, center, 0);
  cursor: pointer;
}

.avatar{
  width: 2.4rem ;
  border-radius: 50%;
}

.text{
  @include font (1.4rem, 600, #244156);
  line-height:21xp;
}

.customer{
  @include flex(row, center, center, .7rem)
}

.header__title{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
}

.header__item{
 @include flex(column, center, flex-start, 1rem);

 @media (max-width:600px) {
  flex-direction: row;
 }
}

.btn-wr {
  @media (max-width:600px) {
    width: 100%;
  }
}
.header{
  @include flex(row, flex-start, center, 3rem );
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    @include flex(column, center, flex-start, 1rem);
    margin-bottom: 2rem;
  }
}

.btn-back{
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  padding: .8rem 3rem;
  display: flex;
  margin-bottom: 2.8rem;
  @include flex(row, center, center, 0);
  cursor: pointer;
  margin-top: 0 !important;
  border: none;

  @media (max-width:600px) {
    display: none;
  }
}

.btn-blue{
  @media (max-width:600px) {
    width: 100%;
  }
}

.title{
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
}
.summary{
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #ECF0F3;
}

.summary__item{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top:2px solid #ECF0F3;
  padding: 3rem 0;
  cursor: pointer;
}
.summary__question {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  text-align: left;
}

.summary__answer {
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
  text-align: left;
  overflow-wrap: anywhere;
  max-width: 80rem;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.9rem;
    max-width: 90vw;
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

  @media (max-width: 60px) {
    @include font(1.4rem, 600, $font-color2 );
    line-height: 1.9rem;
  }
}

.last {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  margin: 3rem 0 1rem 0;
}

.download__box{
 @include download__box
}
.download__box-bottom{
  @include download__box-bottom
}
.download__input{
 @include download__input
}

.download__btn{
  @include download__btn
}

.download__img{ 
  @include download__img;
}

.download__box{
 @include download__box
}

.btn{
  background-color: $bg-color;
  color:#416782;
  border: none;
  margin-top: 10rem;
}

.svg-inline--fa{
  margin:0 .8rem;
  font-size: 1.4rem;
}

.download-bottom{
 margin-bottom: 4.5rem;
}
</style>