<template>
  <div class="applicatioinSummary" @click.stop="clickHandler">  

    <h2 class="title" > Заявка {{ order.name }} </h2>

    <div class="applicationInfo">

      <div class="applicationInfo__left">
        <div class="applicationNum">
          <div class="applicationInfo__title">Номер заявки</div>
          <div class="applicationInfo__value">{{ order.rand_id }}</div>
        </div>
        <div class="applicationDate">
          <div class="applicationInfo__title">Coздана</div>
          <div class="applicationInfo__value"> {{ dateCreated }}</div>
        </div>
      </div>
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
<!-- #endregion -->
    </div>
      
    <p class="successDelete" ref="deleteMsg" v-if="statement"> {{ statement }} </p>
  
    <div class="scroll">
      <section class="summary"  @click.stop="edit" >
        <div class="summary__item" id="country">
          <p class="summary__question">{{ this.TITLE.country }}</p>
          <div class="answer-wr">
            <p class="summary__answer"> {{ SELECTED_ORDER.from_country }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="country" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item" id="cities"> 
          <p class="summary__question">{{ this.TITLE.cities }}</p>
          <div class="answer-wr">
            <p class="summary__answer"> {{ SELECTED_ORDER.to_city }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="cities" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item" id="naming">
          <p class="summary__question">{{ this.TITLE.naming }}</p>
          <div class="answer-wr">
            <p class="summary__answer"> {{ SELECTED_ORDER.name }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="naming" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item" id="product">
          <p class="summary__question">{{ this.TITLE.description }}</p>
          <div class="answer-wr">
            <p class="summary__answer">{{ SELECTED_ORDER.description }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="description" v-if="showEditBtn"/>
          </div>
        </div>

                    <!--ПОДСТВИТЬ ПРАВИЛЬНЫЕ ДАННЫЕ-->
        <div class="summary__item" :class="{'warning': !SELECTED_ORDER.amount}">
          <p class="summary__question"> Количество, шт </p>
          <div class="answer-wr">
            <p class="summary__answer">{{ SELECTED_ORDER.amount }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="amount" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item"  :class="{'warning': !SELECTED_ORDER.gross}">
          <p class="summary__question"> Общий вес БРУТТО, кг </p> 
          <div class="answer-wr">
            <p class="summary__answer">{{ SELECTED_ORDER.gross }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="gross" v-if="showEditBtn"/>
          </div>
        </div>
        <div class="summary__item"  :class="{'warning': !SELECTED_ORDER.cargo_volume}">
          <p class="summary__question"> Общий объём груза, м³ </p>  
          <div class="answer-wr">
            <p class="summary__answer">{{ SELECTED_ORDER.cargo_volume }}</p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="cargo_volume" v-if="showEditBtn"/>
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
          <font-awesome-icon icon="pen-to-square" class="icon-edit" id="additional_services" v-if="showEditBtn"/>
          </div> 
        </div> 

        <div class="summary__item" id="delivery_type">
          <p class="summary__question">{{ this.TITLE.delivery_type }}</p>
          <div class="answer-wr">
            <p class="summary__answer"> {{ SELECTED_ORDER.delivery_type }} </p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="delivery_type" v-if="showEditBtn"/>
          </div>
        </div> 

        <div class="summary__item" id="info1">
          <p class="summary__question">Точный адрес забора груза</p>
          <div class="answer-wr">
            <p class="summary__answer"> {{ SELECTED_ORDER.from_city }} </p>
            <font-awesome-icon icon="pen-to-square" class="icon-edit" id="info1" v-if="showEditBtn"/>
          </div>
        </div>
        

        <!--Загрузка фото-->
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
      
      </section> 
    </div>

      <!--дублирующие кнопки-->
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

    <my-dialog v-if="DIALOG" @close_dialog="closeDialog">
      <application-form v-if="editForm" @close_dialog="closeDialog"/>
      <success-publish-order v-if="showSuccessForm" @close_dialog="closeDialog"/>
      <success-update-order v-if="showUpdateForm" @close_dialog="closeDialog"/>
      <deletion-confirmation-form 
        v-if="showDeletionConfirmationForm" 
        @delete_order="cancelOrder"
        @confirm_order ="confirmOrder"
        :buttonAction="buttonAction"
        />
    </my-dialog>

    <my-dialog 
      v-if="showUnpublishConfirmationForm"
      @close_dialog="closeDialog">
      <unpublish-confirmation-form v-if="showUnpublishConfirmationForm" @unpublish_order="unpublishOrder"/>
    </my-dialog>

    <my-big-spinner v-if="showPreloader"/>
  </div>
</template>

<script>
import { enumServices, enumDeliveryType } from "@/helpers/enumTransformation";
import ApplicationForm from "@/components/Form/ApplicationForm.vue";
import ApplicationUploadFoto from "./ApplicationUploadFoto.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import SuccessPublishOrder from '@/components/Form/SuccessPublishOrder.vue';
import SuccessUpdateOrder from '@/components/Form/SuccessUpdateOrder.vue';
import DeletionConfirmationForm from "@/components/Form/DeletionConfirmationForm.vue"
import UnpublishConfirmationForm from '@/components/Form/UnpublishConfirmationForm.vue'
export default {
  name:"customer-order-cost",
  components:{
    ApplicationForm,
    ApplicationUploadFoto,
    SuccessPublishOrder,
    SuccessUpdateOrder,
    DeletionConfirmationForm,
    UnpublishConfirmationForm,
  },

  props:{
    order: {
      type: Object,
    }
  },

  data() {
    return {
      statement: '',
      additional_services: [],
      delivery_type: '',
      isOrderUpdated: false,
      showPreloader: false,
      showSuccessForm: false,
      showUpdateForm: false,
      editForm: false,
      showDeletionConfirmationForm: false,
      showUnpublishConfirmationForm: false,
      buttonAction: null,
    }
  },

  computed: {
    ...mapGetters([
      "TITLE", "WEIGHT", "CAPACITY", "DATE_OF_READINESS", "SHOW_PDF_VIEWER", "DIALOG", "BTN_ID",
      "DOCS", "DIALOG", "SELECTED_ORDER", "SELECTED_ID"
    ]),

    showUpdateBtn() {
     return  this.isOrderUpdated ? true : false
    },

    showPublishBtn() {
      if (this.isOrderUpdated) return false
       else return this.$route.query.status === 'UNPUBLISHED'? true : false
    },

     // eslint-disable-next-line
    src() { 
      switch(this.BTN_ID) {
        case "invoice" : return this.DOCS.invoice.customer.url
        case "packing_list" : return this.DOCS.packing_list.url
      }
    },

 // eslint-disable-next-line
    dateCreated() {
      if(this.order) return this.order.created_at.split("").slice(0, 10).join("")
    },

    showEditBtn() {
      return this.$route.query.status === "UNPUBLISHED" ? true : false
    },

  },

  methods: {
    ...mapActions([
      "CANCEL_CUSTOMER_ORDER",  
      "GET_PROVIDER_OFFERS",
      "GET_CUSTOMER_ORDER_BY_ID",
      "UNPUBLISH_ORDER", "PUBLISH_ORDER",
      "CONFIRM_ORDER", "GET_IMAGE_FROM_SERVER", "UPDATE_COST_ORDER", 
    ]),

    ...mapMutations([
      "SET_SHOW_HEADER_DROPDOWN", "SET_SELECTED_ID", "SHOW_DIALOG", "SET_HREF_FILE",
      "SET_CLEAR_IMG", "SET_CHANGE_ORDER_STATUS"
    ]),

    showConfirmationForm(action) {
      this.buttonAction = action;
      this.showDeletionConfirmationForm = true;
      this.SHOW_DIALOG();
    },

    closeDialog() {
      this.showUpdateForm = false
      this.showSuccessForm = false
      this.showUnpublishConfirmationForm = false
      this.editForm = false
    },

    edit({target}) {
      this.editForm = true
      const closest = target.closest("svg")
      if (!closest || !closest.id) return
      this.SET_SELECTED_ID(closest.id)
      console.log(this.SELECTED_ID)
      this.SHOW_DIALOG()
    },

    clickHandler(){
     this.SET_SHOW_HEADER_DROPDOWN(false)
    },

    showDeleteWarning() {
      this.showDeletionConfirmationForm = true;
      this.SHOW_DIALOG()
    }, 
 
    cancelOrder() {
      this.SHOW_DIALOG()
      this.showDeletionConfirmationForm = false
      this.showPreloader = true
      this.CANCEL_CUSTOMER_ORDER(this.order.id) // customerOrders.js
        .then(() => {
         this.statement = 'Заявка успешно удалена'
         this.showPreloader = false
          setTimeout(() => {
            this.statement = ''
            this.$router.push("/customer/my_applications")
          }, 1500);
        })
    },

    publishOrder() {
      this.showPreloader = true
      this.PUBLISH_ORDER(this.$route.params.id) // публикуем заявку
        .then(() => {
          this.SET_CHANGE_ORDER_STATUS() // отлавливаем изменение статуса заявки(boolean)
          this.$router.push(`/customer/order/${this.$route.params.id}?status=PUBLISHED&type=cost`)
          this.showPreloader = false
          this.isOrderUpdated = false
          this.showSuccessForm = true
          this.SHOW_DIALOG()
        })
    },

    unpublishOrder() {
      this.showUnpublishConfirmationForm = false
      this.showPreloader = true
      this.UNPUBLISH_ORDER(this.order.id)
        .then(() => {
          this.showPreloader = false
          this.$router.push({query: {status: "UNPUBLISHED", type: "cost"}})})
        .catch(err => {
          this.statement = err
          setTimeout(() => {this.statement = ''}, 2000);
        })
    },

    confirmOrder() {
      this.showDeletionConfirmationForm = false;
      this.showPreloader = true;
      this.CONFIRM_ORDER(this.order.id) 
        .then(() => {
          this.$router.push({query: {status: "COMPLETED"}})
          this.statement = "Заявка закрыта"
          setTimeout(() => {this.statement = ''}, 2000);
        })
        .catch(err => {
          this.statement = err
          setTimeout(() => {this.statement = ''}, 2000);
        })
    },

    updateOrder() {
      this.showPreloader = true
      const order = {
        "name": this.SELECTED_ORDER.name,
        "from_country": this.SELECTED_ORDER.from_country,
        "from_city": this.SELECTED_ORDER.from_city,
        "to_country": "Россия",
        "to_city": this.SELECTED_ORDER.to_city,
        "description": this.SELECTED_ORDER.description,
        "gross": this.SELECTED_ORDER.gross,
        "amount": this.SELECTED_ORDER.amount,
        "cargo_volume": this.SELECTED_ORDER.cargo_volume,
        "additional_services": enumServices(this.SELECTED_ORDER.additional_services),
        "comment_for_service": this.SELECTED_ORDER.comment_for_service,
        "delivery_type": enumDeliveryType(this.SELECTED_ORDER.delivery_type)
  }
      this.UPDATE_COST_ORDER(order)
       .then(() => {
        debugger
        this.isOrderUpdated = false
        this.showPreloader = false
        // this.closeDialog()
        this.showUpdateForm = true
        this.SHOW_DIALOG()
      })
       .catch(() => this.showPreloader = false)
    },
  },

  watch: {
    
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
    this.SET_HREF_FILE({id:'clear'}) // очищаем сторе
    // загружаем image ---------------------------------------------------------
      this.GET_IMAGE_FROM_SERVER({ orderId: this.$route.params.id, size: '640' })
        .then(() => this.images = this.DOCS.images.href )
        .then(() =>  {
          setTimeout(() => {
            this.isOrderUpdated = false
          }, 100);
          } )

  },
  
        
}
</script>

<style lang="scss" scoped>

.applicatioinSummary{
  margin-bottom: 4rem;

  @media (max-width: 600px) {
    margin-bottom: 2rem;
  }
}

// #region header

.title{
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 2rem;
  }
 }

.applicationInfo{
  display: flex;
  gap: 3rem;

  @media (max-width: 600px) {
    @include flex(column, center, flex-start, .5rem);
  }
}

.applicationInfo__left {
  // width: 100%;
  @include flex (row, flex-start, center, 2rem);
}


.applicationInfo__title {
  @include font(1.4rem, 500, #416782 );
  line-height: 2.1rem;
}

.applicationInfo__value {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
}

// #endregion

// #region buttons

.button-box {
  @include flex (row, center, flex-start, 1rem);
  @media (max-width: 600px) {    
    margin-top: 2rem;
    width: 100%;
    display: flex;
    gap: 1rem;
  }
}

.btn-wr {
  @include flex(row, flex-start, center, 2rem);
  margin-top: 4rem;

  @media (max-width:600px) {
    gap: 1rem;
  }
}

.cancelBtn {
  @include myColorBtn(#416782, #EEEEF0, #EEEEF0);
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  margin-top: 0 ;

  &:hover{
    @include myColorBtn(#EEEEF0, $main-color, #EEEEF0);
  }

  @media (max-width: 600px) {
    width: 100%;
  }

}

// #endregion

.successDelete{
  @include font(1.4rem, 500, red );
  line-height: 2.1rem;
  margin-top: 1rem;
  display: none;
}

.scroll {
  border-top: .4rem solid #EEEEF0;
  margin-top: 1.2rem;
  position: relative;

  @media (max-width: 600px) {
    border-top: none;
  }
}

// #region summury
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
  padding: 3rem 0 3rem 0;
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

  @media (max-width: 600px) {
    @include font(1.4rem, 600, #244156);
    line-height: 1.9rem;
  }
}
// #endregion 

.errorMsg {
  @include errorMsg;
}

.item__name{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  text-align: left;
}

.photo-wr {
  @include flex(row, space-between, center, 0);
  width: 98%;
}

.answer-wr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-edit {
 @include icon-edit;
}

.applicationNum, .applicationDate{
  @media (max-width: 600px) {
    @include flex(row, flex-start, center, 1rem);
  }
}

</style>