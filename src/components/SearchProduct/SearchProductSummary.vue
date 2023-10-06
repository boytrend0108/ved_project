<template>
  <div class="searchProductSummary">
    <h1 class="title" v-if="$route.name !== 'customer-order'"> Проверьте детали заявки </h1>
    <h1 class="title" v-else>Заявка {{ SEARCH_PRODUCT_APPL.name }} </h1>

    <div class="applicationInfo">
      <div class="applicationNum" v-if="this.$route.name !== 'search-product'">
        <div class="applicationInfo__title">Номер заявки</div>
        <div class="applicationInfo__value">{{SEARCH_PRODUCT_APPL.rand_id }}</div>
      </div>
      <div class="applicationDate" v-if="this.$route.name !== 'search-product'">
        <div class="applicationInfo__title">Coздана</div>
        <div class="applicationInfo__value"> {{ dateCreated }}</div>
      </div>
      <!-- #region Buttons--> 
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
<!-- #endregion -->
    </div>

    <p class="successDelete" ref="deleteMsg" v-if="statement"> {{ statement }} </p>

    <div class="scroll">
      <div class="summary-box" @click="changeItem" >
        <ui-summary-item 
          title="Название товара"
          id="name" 
          :value="SEARCH_PRODUCT_APPL.name"
          :class="{invalid: !SEARCH_PRODUCT_APPL.name}" 
        />
        <ui-summary-item 
          title="Предполагаемое кол-во"  
          id="amount" 
          :value="SEARCH_PRODUCT_APPL.amount"
          :class="{invalid: !SEARCH_PRODUCT_APPL.amount}"
        />
        <ui-summary-item 
          title="Размер" 
          id="one_volume"   
          :value="SEARCH_PRODUCT_APPL.one_volume" 
          :class="{invalid: !SEARCH_PRODUCT_APPL.one_volume}"
        />
        <ui-summary-item 
          title="Материал" 
          id="material" 
          :value="SEARCH_PRODUCT_APPL.material"
          :class="{invalid: !SEARCH_PRODUCT_APPL.material}"
        />
        <ui-summary-item 
          title="Цвет"  
          id="color" 
          :value="SEARCH_PRODUCT_APPL.color"
          :class="{invalid: !SEARCH_PRODUCT_APPL.color}"
        />
        <ui-summary-item 
          title="Упаковка" 
          id="package" 
          :value="this.SEARCH_PRODUCT_APPL.package === 'Да' || this.SEARCH_PRODUCT_APPL.package === true ? 'Да' : 'Heт'"
          :class="{invalid: SEARCH_PRODUCT_APPL.package ==='Не выбрано'}"
        />
        
        <ui-summary-item 
          title="Образец для утверждения тиража" 
          id="sample_for_replication" 
          :value="this.SEARCH_PRODUCT_APPL.sample_for_replication === 'Да' || this.SEARCH_PRODUCT_APPL.sample_for_replication === true ? 'Да' : 'Heт'" 
          :class="{invalid: SEARCH_PRODUCT_APPL.sample_for_replication === 'Не выбрано'}"
        />

        <ui-summary-item 
          title="Описание функционала" 
          id="description" 
          :value="SEARCH_PRODUCT_APPL.description" 
          :class="{invalid: !SEARCH_PRODUCT_APPL.description}"
        />
        <ui-summary-item 
          title="Нанесение логотипа / принта" 
          id="is_logo" 
          :value="checkboxValue" 
        />
        <ui-summary-item  
          title="Примечание и параметры товара"  
          id="note" 
          :value="SEARCH_PRODUCT_APPL.note" 
        />
      </div>

      <p class="item__name photo" v-if="$route.name === 'customer-order'">Приложенные фото товаров</p> 

      <div class="photo-wr">
        <application-upload-foto class="uploadFoto bottom" />
        <font-awesome-icon 
          icon="pen-to-square" 
          class="icon-edit" 
          v-if="showEditBtn"
          @click="edit"
        />
      </div>
  
      <div class="btn-wr" v-if="$route.name !== 'customer-order'">
        <my-blue-btn class="btn-bottom" @click="goToCompanyPage"> Далее </my-blue-btn>
      </div>

    <!--дублирующие кнопки--> 
      <div class="btn-wr" v-if="innerWidth > 1024">
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
    </div>
  
    <div 
      class="my-dialog"
      v-if="DIALOG"
      @click.self="closeForm"
    >
      <div class="form">
        <font-awesome-icon icon="fa-solid fa-xmark " id="xmark" @click="closeForm" />
        
        <applicatication-form-search-product v-if="editForm" @close_dialog="closeDialog"/> 
        <success-publish-order v-if="showSuccessForm" @close_dialog="closeDialog"/>
        <success-update-order v-if="showUpdateForm" @close_dialog="closeDialog"/>
        <deletion-confirmation-form 
          v-if="showDeletionConfirmationForm" 
          @delete_order="cancelOrder"
          @confirm_order ="confirmOrder" 
          :buttonAction="buttonAction"
        />
      </div>

    </div>

    <my-dialog 
      v-if="showUnpublishConfirmationForm"
      @close_dialog="closeDialog">
      <unpublish-confirmation-form  @unpublish_order="unpublishOrder"/>
    </my-dialog>

    <my-big-spinner v-if="showPreloader"/>
  </div> 
</template>

<script>
import UiSummaryItem from "./UiSummaryItem.vue"
import ApplicationUploadFoto from "../Application/ApplicationUploadFoto.vue";
import ApplicaticationFormSearchProduct from "@/components/Form/ApplicationFormSearchProduct.vue"
import { mapGetters, mapMutations, mapActions } from "vuex";
import SuccessPublishOrder from '@/components/Form/SuccessPublishOrder.vue';
import SuccessUpdateOrder from '@/components/Form/SuccessUpdateOrder.vue';
import DeletionConfirmationForm from "@/components/Form/DeletionConfirmationForm.vue"
import UnpublishConfirmationForm from '@/components/Form/UnpublishConfirmationForm.vue'
export default {
  components: {
    UiSummaryItem, 
    ApplicationUploadFoto, 
    ApplicaticationFormSearchProduct,
    SuccessPublishOrder,
    SuccessUpdateOrder,
    DeletionConfirmationForm,
    UnpublishConfirmationForm,
  },
  name: "search-product-summary",
  data() {
    return {
      showPreloader: false,
      showError: false,
      statement: "",
      isOrderUpdated: false,
      showSuccessForm: false,
      showUpdateForm: false,
      editForm: false,
      showDeletionConfirmationForm: false,
      showUnpublishConfirmationForm: false,
      buttonAction: null,
      innerWidth:  window.innerWidth,
  }
},

  computed: {
    ...mapGetters([
      "SEARCH_PRODUCT_APPL", "DIALOG", "DOCS", "SELECTED_ORDER", "SELECTED_ID"
    ]),

   // eslint-disable-next-line
   dateCreated() {
      if(this.SEARCH_PRODUCT_APPL.created_at) return this.SEARCH_PRODUCT_APPL.created_at.split("").slice(0, 10).join("")
    },

    checkboxValue() {  
      if (!this.SEARCH_PRODUCT_APPL.is_logo) return "Нет"
      return `Да , Бренд: ${this.SEARCH_PRODUCT_APPL.brand_name}, расположение: ${this.SEARCH_PRODUCT_APPL.location_logo}`
    },

      showEditBtn() { 
      return this.$route.query.status === "UNPUBLISHED" ? true : false
    },

    showUpdateBtn() {
     if (this.$route.query.step === "SearchProductSummary") return false
     else return  this.isOrderUpdated ? true : false
    },

    showPublishBtn() {
      if (this.isOrderUpdated) return false
       else return this.$route.query.status === 'UNPUBLISHED'? true : false
    },
  },

  methods: {
    ...mapMutations([
       "SET_CANCEL_APPL",
       "SHOW_DIALOG",
       "SET_SELECTED_ID",
       "SET_CLEAR_IMG", "CLEAR_SEARCH_PRODUCT_APPL", "SET_FILTER_TYPE", "SET_HREF_FILE", "SET_CLEAR_IMG", "SET_SEARCH_PRODUCT_APPL",
       "SET_ORDER_TYPE", "SET_SELECTED_ORDER", "SET_CHANGE_ORDER_STATUS", "SET_ACTIVE_MODULE"
      ]),

    ...mapActions([
      "CREATE_ORDER_SEARCH_PRODUCT", 
      "GET_IMAGE_FROM_SERVER", 
      "CANCEL_CUSTOMER_ORDER",
      "UNPUBLISH_ORDER", "PUBLISH_ORDER",
      "CONFIRM_ORDER",
      "GET_IMAGE_FROM_SERVER", "UPDATE_SEARCH_ORDER", "SAVE_IMAGE_AS_FILE"
    ]),

    closeForm() {
      debugger
      switch(this.SELECTED_ID) {
        case 'is_logo':
          this.SET_SEARCH_PRODUCT_APPL({id: this.SELECTED_ID, value: this.SEARCH_PRODUCT_APPL.draft.is_logo})
          this.SET_SEARCH_PRODUCT_APPL({id: "brand_name", value: this.SEARCH_PRODUCT_APPL.draft.brand_name})
          this.SET_SEARCH_PRODUCT_APPL({id: "location_logo", value: this.SEARCH_PRODUCT_APPL.draft.location_logo})
          this.SET_SEARCH_PRODUCT_APPL({id: 'draft', value: ''})
          break
        default:
          this.SET_SEARCH_PRODUCT_APPL({id: this.SELECTED_ID, value: this.SEARCH_PRODUCT_APPL.draft})
          this.SET_SEARCH_PRODUCT_APPL({id: 'draft', value: ''})
      }
      this.SHOW_DIALOG()
    },

    showConfirmationForm(action) {
      this.buttonAction = action;
      this.showDeletionConfirmationForm = true;
      this.SHOW_DIALOG();
    },


    closeDialog() {
      this.showUpdateForm = false
      this.showSuccessForm = false
      this.editForm = false
      this.SELECTED_ID ? this.SET_SELECTED_ID('') : this.$router.push("/customer/my_applications")
    },

    publishOrder() {
      debugger
      this.showPreloader = true
      this.PUBLISH_ORDER(this.$route.params.id) // публикуем заявку
        .then(() => {
          this.SET_CHANGE_ORDER_STATUS() // отлавливаем изменение статуса заявки(boolean)
          this.$router.push(`/customer/order/${this.$route.params.id}?status=PUBLISHED&type=search`)
          this.showPreloader = false
          this.showSuccessForm = true
          this.SHOW_DIALOG()
          this.isOrderUpdated = false
        })
    },

    cancel() {
      this.SET_CANCEL_APPL() 
      this.SET_CLEAR_IMG()
      this.$router.push("/") 
    },

    changeItem(event) {
      this.SET_SELECTED_ID(event.target.id || event.target.closest(".item-box").id)
      this.editForm = true
      this.SHOW_DIALOG()
    },
 
    goToCompanyPage() {
      this.SET_ORDER_TYPE("search")
      this.SET_ACTIVE_MODULE('application')
      localStorage.setItem("application_type", "search")
      this.$router.push(`/customer?module=select_company`)
    },

    showDeleteWarning() {
      this.showDeletionConfirmationForm = true
      this.SHOW_DIALOG()
    },
 
    cancelOrder() {
      this.showDeletionConfirmationForm = false
      this.SHOW_DIALOG()
      this.showPreloader = true
      this.CANCEL_CUSTOMER_ORDER(this.$route.params.id) // customerOrders.js
        .then(() => {
         this.statement = 'Заявка успешно удалена'
         this.showPreloader = false
          setTimeout(() => {
            this.statement = ''
            this.$router.push("/customer/my_applications")
          }, 1500);
        })
        .catch(() => this.showPreloader = false)
    },

    unpublishOrder() {
      this.showUnpublishConfirmationForm = false
      this.showPreloader = true
      this.UNPUBLISH_ORDER(this.$route.params.id)
        .then(() => {
          this.showPreloader = false
          this.$router.push({query: {status: "UNPUBLISHED", type: "search"}})})
        .catch(err => {
          this.statement = err
          this.showPreloader = false
          setTimeout(() => {this.statement = ''}, 2000);
        })
    },

    confirmOrder() {
      this.showPreloader = true
      this.CONFIRM_ORDER(this.$route.params.id) 
        .then(() => {
          this.showPreloader = false
          this.$router.push({query: {status: "completed"}})
          this.statement = "Заявка закрыта"
          setTimeout(() => {this.statement = ''}, 2000);
        })
        .catch(err => {
          this.statement = err
          this.showPreloader = false
          setTimeout(() => {this.statement = ''}, 2000);
        })
    },

    updateOrder() {
      this.showPreloader = true
      const order = {
        "name": this.SELECTED_ORDER.name,
        "amount": this.SELECTED_ORDER.amount,
        "one_volume": this.SELECTED_ORDER.one_volume,
        "material": this.SELECTED_ORDER.material,
        "color": this.SELECTED_ORDER.color,
        "package": this.SELECTED_ORDER.package === "Да" ? true : false,
        "sample_for_replication": this.SELECTED_ORDER.sample_for_replication === "Да" ? true : false,
        "description": this.SELECTED_ORDER.description,
        "is_logo": this.SELECTED_ORDER.is_logo,
        "brand_name": this.SELECTED_ORDER.brand_name,
        "location_logo": this.SELECTED_ORDER.location_logo,
        "note": this.SELECTED_ORDER.note
      }
      this.UPDATE_SEARCH_ORDER(order)
       .then(() => {
        this.isOrderUpdated = false
        this.showPreloader = false
        this.showUpdateForm = true
        this.SHOW_DIALOG()
      })
       .catch(() => this.showPreloader = false)
    },

    edit() {
      this.SET_CLEAR_IMG()
    }

  },

  watch:{
    SEARCH_PRODUCT_APPL: {
      handler() {
        this.isOrderUpdated = true
      },
      deep: true
    },

    DOCS: {
      handler() {
        this.isOrderUpdated = true
      },
      deep:true
    }
  },

  mounted() {
    this.SET_HREF_FILE({id:'clear'}) // очищаем сторе
    // загружаем image ---------------------------------------------------------
      this.GET_IMAGE_FROM_SERVER({ orderId: this.$route.params.id, size: '640' })
        .then(() => this.images = this.DOCS.images.href )
        .then(() =>  { setTimeout(() => { this.isOrderUpdated = false }, 100) })

    },

}

</script>

<style lang="scss" scoped> 

.scroll {
  border-top: .4rem solid #EEEEF0;
  margin-top: 1.2rem;
  width: 100%;
  position: relative;
}

.top {
  @include flex (row, flex-start, center, 5rem);
}

.icon-edit {
  min-width: 2rem;
  min-height: 2rem;
  color: $main-color;
  cursor: pointer;
}
.photo-wr {
  @include flex(row, space-between, center, 0);
  width: 100%;
 
  @media (max-width: 600px) {
    margin-bottom: 3rem;
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
.applicationNum, .applicationDate{
  @media (max-width: 600px) {
    @include flex(row, flex-start, center, 1rem);
  }
}
.applicationInfo{
  display: flex;
  gap: 3rem;
  padding-left: 2rem;

  @media (max-width: 600px) {
    @include flex(column, center, flex-start, .5rem);
    width: 100%;
    padding-left: 0px;
  }
}

.error {
  @include errorMsg;
}

.btn-wr {
  @include flex (row, flex-start, center, 5rem);
  margin-top: 9rem;

  @media (max-width:600px) {
   width: 100%; 
   margin-top: 0;
  }
}
.invalid {
  color: rgb(217 30 30);
}

.summary-box {
  width: 100%;
}

.btn-bottom {
  padding: 0 3rem;
}

.uploadFoto {
  margin-top: 0;
}

.searchProductSummary{
  @include flex (column, center, flex-start, 0px);
  width: 100%;
}
.title{
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
}
.item__name{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  text-align: left;
  margin-bottom: 2rem;
}

.my-dialog {
  @include my-dialog;
}

.form {
  position: relative;
  background-color: #fff;
  width: 60%;
  max-width: 60rem;
  border-radius: 2rem;
  
  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
  }
}

.fa-xmark{ 
  @include fa-xmark;
}

</style>