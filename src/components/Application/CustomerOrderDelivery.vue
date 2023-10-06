<template>
  <div class="applicatioinSummary" @click.stop="clickHandler"> 

    <h2 class="title" > Заявка {{ order.name }} </h2>

    <div class="applicationInfo">
      <div class="applicationInfo__left">
        <div class="applicationNum">
          <div class="applicationInfo__title"> Номер заявки </div>
          <div class="applicationInfo__value"> {{ order.rand_id }} </div>
        </div>

        <div class="applicationDate">
            <div class="applicationInfo__title"> Coздана </div>
            <div class="applicationInfo__value"> {{ dateCreated }} </div>
        </div>
      </div>
          
      <p 
        class="applicationInfo__value" 
        v-if="$route.query.status === 'COMPLETED'"
      >Заявка закрыта</p>
        
       <!-- #region Buttons-->

        <div class="button-box">
          <my-color-btn  
          class="cancelBtn" 
          @click="showConfirmationForm('delete')"
          v-if="$route.query.status === 'UNPUBLISHED'"
        > Удалить заявку </my-color-btn>

        <my-color-btn  
          class="cancelBtn" 
          @click="publishOrder"
          v-if="showPublishBtn"
        > Опубликовать </my-color-btn>

        <my-color-btn  
          class="cancelBtn" 
          @click="showUnpublishConfirmationForm = true"
          v-if="$route.query.status === 'PUBLISHED'"
        > Cнять с публикации </my-color-btn>

        <my-color-btn 
          class="cancelBtn"  
          @click="showConfirmationForm('confirm')"
          v-if="$route.query.status === 'IN_PROGRESS'"
        > Завершить </my-color-btn>

       <my-color-btn 
          class="cancelBtn" 
          @click="updateOrder"
          v-if="showUpdateBtn"
        > Обновить заявку </my-color-btn>
      </div>

<!-- #endregion Buttons-->

    </div>

    <p class="successDelete" ref="deleteMsg" v-if="true"> {{ statement }} </p>
   
    <div class="scroll">
      <section class="summary"  @click="edit" >
        <div class="summary__item" id="country">
          <p class="summary__question"> {{ TITLE.country }} </p> 
          <div class="answer-wr">
            <p class="summary__answer"> {{ SELECTED_ORDER.from_country }} </p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="country" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item" id="cities">
          <p class="summary__question">{{ TITLE.cities }}</p>
          <div class="answer-wr">
          <p class="summary__answer"> {{ SELECTED_ORDER.to_city }} </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="cities" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item" id="naming">
          <p class="summary__question">{{ TITLE.naming }}</p>
          <div class="answer-wr">
          <p class="summary__answer"> {{ SELECTED_ORDER.name }} </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="naming" v-if="showEditBtn" />
          </div>
        </div>
        <div class="summary__item" id="product"> 
          <p class="summary__question">{{ TITLE.description }}</p>
          <div class="answer-wr">
          <p class="summary__answer">{{ SELECTED_ORDER.description }}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="description" v-if="showEditBtn"/>
          </div>
        </div>

                    <!--ПОДСТВИТЬ ПРАВИЛЬНЫЕ ДАННЫЕ-->
        <div class="summary__item" id="weight" :class="{'warning': !SELECTED_ORDER.amount}">
          <p class="summary__question"> Количество, шт </p>
          <div class="answer-wr">
          <p class="summary__answer">{{ SELECTED_ORDER.amount }}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="description" v-if="showEditBtn" />
          </div>
        </div>
        <div class="summary__item" id="weight" :class="{'warning': !SELECTED_ORDER.gross}">
          <p class="summary__question"> Общий вес БРУТТО, кг </p>
          <div class="answer-wr">
          <p class="summary__answer">{{ SELECTED_ORDER.gross }}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="description" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item" id="capacity" :class="{'warning': !SELECTED_ORDER.cargo_volume}">
          <p class="summary__question"> Общий объём груза, м³ </p>
          <div class="answer-wr">
          <p class="summary__answer">{{ SELECTED_ORDER.cargo_volume }}</p> 
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="description" v-if="showEditBtn" />
          </div>
        </div>
        <div class="summary__item" id="dateOfReadiness2" :class=" {'warning': !SELECTED_ORDER.date_of_cargo_readiness}">
          <p class="summary__question"> Дата готовности груза </p>
          <div class="answer-wr">
          <p class="summary__answer"> {{ SELECTED_ORDER.date_of_cargo_readiness }} </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="description" v-if="showEditBtn"/>
          </div>
        </div>

        <div class="summary__item" id="additional_services">
          <p class="summary__question">{{ this.TITLE.additional_services }}</p>
          <div class="answer-wr">
          <div class="summary__answer">
            <ul class="summary__ul">
              <li class="summary__li" 
                v-for="el in SELECTED_ORDER.additional_services" :key="el.id"> {{ el }} </li>
                <li class="summary__li" v-if="SELECTED_ORDER.comment_for_service"> {{ SELECTED_ORDER.comment_for_service }} </li>
            </ul>
          </div>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" v-if="showEditBtn" id="additional_services" />
          </div>
        </div>   

        <div class="summary__item" id="delivery_type">
          <p class="summary__question">{{ this.TITLE.delivery_type }}</p>
          <div class="answer-wr">
          <p class="summary__answer"> {{ SELECTED_ORDER.delivery_type }} </p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" v-if="showEditBtn" id="delivery_type" />
          </div>
        </div>
        <div class="summary__item" id="info1">
          <p class="summary__question">Точный адрес забора груза</p>
          <div class="answer-wr">
          <p class="summary__answer"> {{ SELECTED_ORDER.from_city }}, {{ SELECTED_ORDER.from_address }}</p>
          <font-awesome-icon icon="pen-to-square" class="icon-edit" v-if="showEditBtn" id="info1"/>
          </div>
        </div>
        <div class="summary__item" id="info2">
            <p class="summary__question">Контакты представителя фабрики</p>
            <div class="answer-wr">
            <div class="info2-wr">
              <p class="summary__answer">ФИО: {{ SELECTED_ORDER.agent_fullname }}</p>
              <p class="summary__answer">телефон: {{ SELECTED_ORDER.agent_phone_number }}</p>
              <p class="summary__answer">email: {{ SELECTED_ORDER.agent_email }}</p>
            </div>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" v-if="showEditBtn" id="info2"/>
            </div>
          </div> 


      <p class="item__name " v-if="$route.name === 'search-product' || $route.name === 'customer-order'">Приложенные фото товаров</p> 
      <div class="photo-wr">
        <application-upload-foto class="uploadFoto__box bottom" />
        <font-awesome-icon 
          icon="pen-to-square" 
          class="icon-edit" 
          v-if="showEditBtn"
          @click="SET_CLEAR_IMG()" 
        />
        </div>
        <p class="errorMsg " v-if="DOCS.images.binaryFile.length > 5"> Не больше 5 фото </p> 

        <application-docs />
    
      </section> 
  <!-- #region дублирующие кнопки-->
  <div class="btn-wr">
    <my-color-btn  
      class="cancelBtn" 
      @click="showConfirmationForm('delete')"
      v-if="$route.query.status === 'UNPUBLISHED'"
    > Удалить заявку </my-color-btn>

      <my-color-btn  
        class="cancelBtn" 
        @click="publishOrder"
        v-if="showPublishBtn"
      > Опубликовать </my-color-btn>

      <my-color-btn  
        class="cancelBtn" 
        @click="this.showUnpublishConfirmationForm = true"
        v-if="$route.query.status === 'PUBLISHED'"
      > Cнять с публикации </my-color-btn>

      <my-color-btn 
        class="cancelBtn" 
        @click="showConfirmationForm('confirm')"
        v-if="$route.query.status === 'IN_PROGRESS'"
      > Завершить </my-color-btn>
      
      <my-color-btn 
        class="cancelBtn" 
        @click="updateOrder"
        v-if="showUpdateBtn"
      > Обновить заявку </my-color-btn>
  </div>
  <!-- #endregion -->
  <p class="successDelete" ref="deleteMsg" v-if="statement"> {{ statement }} </p>
  
    </div>

    <my-dialog v-if="DIALOG">
      <customer-feedback-form 
        v-if="showCustomerFeedbackForm && $route.query.status === 'COMPLETED'" 
        :user_id="CURRENT_USER.uid" 
        @feedback="showCustomerFeedbackForm = false"
        />
      <success-feedback  v-if="!showCustomerFeedbackForm && $route.query.status === 'COMPLETED'" />
      <application-form v-if="showApplicationForm"/>
    </my-dialog>

    <my-dialog 
      v-if="showDialog"
      @close_dialog="closeDialog">
      <success-publish-order v-if="showSuccessForm" @close_dialog="closeDialog"/>
      <success-update-order v-if="showUpdateForm" @close_dialog="closeDialog"/>
      <deletion-confirmation-form 
        v-if="showDeletionConfirmationForm" 
        @delete_order="cancelOrder"
        @confirm_order ="confirmOrder"
        :buttonAction="buttonAction"
        />
      <unpublish-confirmation-form v-if="showUnpublishConfirmationForm" @unpublish_order="unpublishOrder"/>
    </my-dialog>
    
    <my-big-spinner v-if="showPreloader"/>  
       
  </div> 
</template>

<script>
import { enumServices, enumDeliveryType } from "@/helpers/enumTransformation";
import ApplicationUploadFoto from "./ApplicationUploadFoto.vue";
import ApplicationDocs from "@/components/Application/ApplicationDocs.vue"
import ApplicationForm from "@/components/Form/ApplicationForm.vue";
import CustomerFeedbackForm from "@/components/Form/CustomerFeedbackForm.vue"
import { mapGetters, mapActions, mapMutations } from "vuex";
import SuccessFeedback from '@/components/Form/SuccessFeedback.vue';
import SuccessPublishOrder from '@/components/Form/SuccessPublishOrder.vue';
import SuccessUpdateOrder from '@/components/Form/SuccessUpdateOrder.vue';
import DeletionConfirmationForm from "@/components/Form/DeletionConfirmationForm.vue"
import UnpublishConfirmationForm from '@/components/Form/UnpublishConfirmationForm.vue'
export default {
  name: "customer-order-delivery",
  components: {
    ApplicationForm,
    ApplicationDocs,
    ApplicationUploadFoto,
    CustomerFeedbackForm,
    SuccessFeedback,
    SuccessPublishOrder,
    SuccessUpdateOrder,
    DeletionConfirmationForm,
    UnpublishConfirmationForm,
  },

  props: {
    order: {
      type: Object,
    }
  },

  data() {
    return {
      statement: "",
      additional_services: [],
      delivery_type: "",
      updatedOrder: this.order,
      isOrderUpdated: false,
      showPreloader: false,
      showCustomerFeedbackForm: false,
      showSuccessForm: false,
      showUpdateForm: false,
      showDeletionConfirmationForm: false,
      showUnpublishConfirmationForm: false,
      buttonAction: null,
    }
  },

  computed: {
    ...mapGetters([
      "TITLE", "WEIGHT", "CAPACITY", "DATE_OF_READINESS", "SHOW_PDF_VIEWER", "DIALOG", "BTN_ID", "DOCS",
      "COMMENT_FOR_SERVICE", "SELECTED_ORDER", "COUNTRY", "CITY", "APPLICATION_NAME", "APPLICATION_DESCRIPTION",
      "QUANTITY", "ADDRESS_FROM", "CURRENT_USER", "COMMENT_FOR_SERVICE"
    ]),

    showDialog() {
      if (this.showSuccessForm || this.showUpdateForm || this.showDeletionConfirmationForm || this.showUnpublishConfirmationForm) return true
      return false
    },

    // eslint-disable-next-line
    src() {
      switch (this.BTN_ID) {
        case "invoice": return this.DOCS.invoice.customer.url
        case "packing_list": return this.DOCS.packing_list.url
      }
    },

    showUpdateBtn() {
      return this.isOrderUpdated ? true : false
    },

    showPublishBtn() {
      if (this.isOrderUpdated) return false
      else return this.$route.query.status === 'UNPUBLISHED' ? true : false
    },

    showEditBtn() {
      return this.$route.query.status === "UNPUBLISHED" ? true : false
    },

    // eslint-disable-next-line
    dateCreated() {
      if (this.order) return this.order.created_at.split("").slice(0, 10).join("")
    },

    showApplicationForm() {
      if (this.$route.query.status === 'IN_PROGRESS' || this.$route.query.status === 'COMPLETED') return false
      else return true
    }
  },

  methods: {
    ...mapActions([
      "CANCEL_CUSTOMER_ORDER",
      "GET_PROVIDER_OFFERS",
      "GET_CUSTOMER_ORDER_BY_ID",
      "UNPUBLISH_ORDER",
      "CONFIRM_ORDER",
      "GET_IMAGE_FROM_SERVER", "UPDATE_DELIVERY_ORDER", "PUBLISH_ORDER"
    ]),
    ...mapMutations([
      "SET_SHOW_HEADER_DROPDOWN", "SHOW_DIALOG", "SET_SELECTED_ID", "SET_HREF_FILE", "SET_CLEAR_IMG",
      "SET_SELECTED_ORDER", "SET_CHANGE_ORDER_STATUS"
    ]),

    showConfirmationForm(action) {
      this.buttonAction = action
      this.showDeletionConfirmationForm = true
    },

    closeDialog() {
      this.showUpdateForm = false
      this.showSuccessForm = false
      this.showDeletionConfirmationForm = false
      this.SELECTED_ID ? this.SET_SELECTED_ID('') : this.$router.push("/customer/my_applications")
    },

    publishOrder() {
      console.log("publish")
      this.showPreloader = true
      this.PUBLISH_ORDER(this.order.id) // публикуем заявку
        .then(() => {
          this.SET_CHANGE_ORDER_STATUS() // отлавливаем изменение статуса заявки(boolean)
          this.$router.push(`/customer/order/${this.order.id}?status=PUBLISHED&type=delivery`)
          this.isOrderUpdated = false
          this.showPreloader = false
          this.showSuccessForm = true
        })
    },

    edit({ target }) {
      const closest = target.closest("svg")
      if (!closest || !closest.id) return
      this.SET_SELECTED_ID(closest.id)
      this.SHOW_DIALOG()
    },

    updateOrder() {
      this.showPreloader = true
      const order = {
        "from_country": this.order.from_country,
        "from_city": this.order.from_city,
        "from_address": this.order.from_address,
        "agent_fullname": this.order.agent_fullname,
        "agent_phone_number": this.order.agent_phone_number,
        "agent_email": this.order.agent_email,
        "to_country": "Россия",
        "to_city": this.order.to_city,
        "name": this.order.name,
        "description": this.order.description,
        "additional_services": enumServices(this.order.additional_services),
        "comment_for_service": this.order.comment_for_service,
        "gross": this.order.gross,
        "amount": this.order.amount,
        "cargo_volume": this.order.cargo_volume,
        "date_of_cargo_readiness": this.order.date_of_cargo_readiness,
        "delivery_type": enumDeliveryType(this.order.delivery_type)
      }
      this.UPDATE_DELIVERY_ORDER(order)
        .then(() => {
          this.isOrderUpdated = false
          this.showPreloader = false
          this.showUpdateForm = true
        })
        .catch(() => this.showPreloader = false)
    },

    clickHandler() {
      this.SET_SHOW_HEADER_DROPDOWN(false)
    },

    cancelOrder() {
      console.log("emit from customer order delivery")
      this.showDeletionConfirmationForm = false
      this.showPreloader = true
      this.CANCEL_CUSTOMER_ORDER(this.order.id) // customerOrders.js
        .then(() => {
          this.showPreloader = false
          this.statement = "Заявка успешно удалена"
          setTimeout(() => {
            this.statement = ""
            this.$router.push("/customer/my_applications")
          }, 1500);
        })
        .catch(() => this.showPreloader = false)
    },

    unpublishOrder() {
      this.showUnpublishConfirmationForm = false
      this.showPreloader = true
      this.UNPUBLISH_ORDER(this.order.id)
        .then(() => {
          this.$router.push({ query: { status: "UNPUBLISHED", type: "delivery" } })
          this.showPreloader = false
        })
        .catch(err => {
          this.statement = err
          setTimeout(() => { this.statement = "" }, 2000)
          this.showPreloader = false
        })
    },

    confirmOrder() {
      this.showDeletionConfirmationForm = false
      this.showPreloader = true
      this.CONFIRM_ORDER(this.order.id)
        .then(() => {
          this.$router.push({ query: { status: "COMPLETED", type: "delivery" } })
          this.GET_PROVIDER_OFFERS(this.$route.params.id)
          this.showCustomerFeedbackForm = true
          this.statement = "Заявка закрыта"
          this.showPreloader = false
          setTimeout(() => {
            this.statement = ""
            this.SHOW_DIALOG()
          }, 1000);
        })
        .catch(err => {
          this.showPreloader = false
          this.statement = err
          setTimeout(() => { this.statement = "" }, 2000);
        })
    }
  },

  watch: {
    COUNTRY() {
      this.updatedOrder.from_country = this.COUNTRY
    },
    CITY() { this.updatedOrder.to_city = this.CITY },
    APPLICATION_NAME() { this.updatedOrder.name = this.APPLICATION_NAME },
    APPLICATION_DESCRIPTION() { this.updatedOrder.description = this.APPLICATION_DESCRIPTION },
    QUANTITY() { this.updatedOrder.amount = this.QUANTITY },
    WEIGHT() { this.updatedOrder.gross = this.WEIGHT },
    CAPACITY() { this.updatedOrder.cargo_volume = this.CAPACITY },
    DATE_OF_READINESS() { this.updatedOrder.date_of_cargo_readiness = this.DATE_OF_READINESS },
    updatedOrder: {
      handler() { this.isOrderUpdated = true },
      deep: true
    },
    SELECTED_ORDER: {
      handler() {
        this.isOrderUpdated = true
      },
      deep: true
    },
    DOCS: {
      handler() {
        this.isOrderUpdated = true
      },
      deep: true
    }
  },

  mounted() {
    this.SET_HREF_FILE({ id: 'clear' }) // очищаем сторе
    // загружаем image ---------------------------------------------------------
    this.GET_IMAGE_FROM_SERVER({ orderId: this.$route.params.id, size: '640' })
      .then(() => this.images = this.DOCS.images.href)
      .then(() => {
        setTimeout(() => {
          this.isOrderUpdated = false
        }, 100);
      })

  }
}

</script>

<style lang="scss" scoped>

// #region header

.applicatioinSummary {
  margin-bottom: 4rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
    //  height: calc(100vh - 2rem);
  }
}

.title {
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 2rem;
  }
}

.applicationInfo {
  display: flex;
  gap: 3rem;

  @media (max-width: 600px) {
    @include flex(column, center, flex-start, 2rem);
  }
}

.applicationInfo__left {
  @include flex (row, flex-start, center, 2rem);
}

.applicationInfo__title {
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
}

.applicationInfo__value {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
}

.button-box {
  @include flex (row, center, flex-start, 1rem);
}

.btn-wr {
  @include flex(row, flex-start, center, 1rem);
  margin-top: 4rem;
}

.cancelBtn {
  @include myColorBtn(#416782, #EEEEF0, #EEEEF0);
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  margin-top: 0;

  &:hover {
    @include myColorBtn(#EEEEF0, $main-color, #EEEEF0);
  }

  @media (max-width: 600px) {
    width: 100%;
  }

}

// #endregion

.scroll {
  // border-top: .4rem solid #EEEEF0;
  margin-top: 1.2rem;
  position: relative;
}

// #region summary

.summary {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #ECF0F3;
  margin-top: 4.5rem;
}

.summary__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 2px solid #ECF0F3;
  padding: 3rem 0;
  margin-right: 1rem;
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

  @media (max-width: 600px) {
    @include font(1.4rem, 600, #244156);
    line-height: 1.9rem;
  }
}

.summary__ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3rem;
}

.summary__li {
  list-style-type: disc;
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, #244156);
    line-height: 1.9rem;
  }
}


.answer-wr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info2-wr {
  @include flex(column, center, flex-start, 0px);
}

.icon-edit {
  @include icon-edit;
}


// #endregion


.item__name {
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  text-align: left;
}

.errorMsg {
  @include errorMsg;
}

.photo-wr {
  @include flex(row, space-between, center, 0);
  width: 98%;
}

.applicationNum,
.applicationDate {
  @media (max-width: 600px) {
    @include flex(row, flex-start, center, 1rem);
  }
}

.successDelete {
  @include font(1.4rem, 500, red);
  line-height: 2.1rem;
  margin-top: 1rem;
}</style>