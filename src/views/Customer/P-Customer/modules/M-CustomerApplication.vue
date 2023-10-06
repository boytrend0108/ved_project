<!--Отправленная на сервер заявка. ИСПРАВИТЬ НЕЛЬЗЯ-->
<template>
  <div class="applicatioinSummary">
    <h2 class="title">Заявка {{ this.orderName }} </h2>
    <div class="applicationInfo">
      <div class="applicationNum">
        <div class="applicationInfo__title">Номер заявки</div>
        <div class="applicationInfo__value">{{this.orderId}}</div>
      </div>
      <div class="applicationDate">
        <div class="applicationInfo__title">Coздана</div>
        <div class="applicationInfo__value"> {{this.dateCreated}}</div>
      </div>
      <my-color-btn 
        class="cancelBtn"
        @click="cancelOrder"
      > Отменить заявку </my-color-btn>
    </div>
    <p class="successDelete" ref="deleteMsg"> Заявка успешно отменена</p>
    <application-check 
      :companyName="companyName"
      :companyDetals="companyDetals"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ApplicationCheck from '@/components/Application/ApplicationCheck';

export default {
  name:'m-customer-application',
  components: {
    ApplicationCheck,
  },

  data() {
    return {
      companyName: ` ${this.COMPANY_NAME}, ${this.INN}`,// добавить в разметку
      companyDetals: this.BANK_NAME,
      dateCreated:null,
      orderId: null,
      orderName: null,
    }
  },

  computed: {
    ...mapGetters([
      'CREATED_ORDERS_CUSTOMER',
      'COMPANY_NAME', 
      'INN', 
      'BANK_NAME'
    ]),
  },

  methods:{
    ...mapActions([
      'GET_CUSTOMER_ORDERS', 'CANCEL_CUSTOMER_ORDER'
    ]),

    cancelOrder() {
      this.CANCEL_CUSTOMER_ORDER(this.orderId) // customerOrders.js
        .then(() => {
          this.$refs.deleteMsg.style.display = 'inline'
          setTimeout(() => {
            this.$router.push('/customer/my_applications')
          }, 1500);
        })
    }
  }, 

  created(){
      this.GET_CUSTOMER_ORDERS('unpublished') // не опубликованные заявки.
         .then(()=>{
            const customerOrder = this.CREATED_ORDERS_CUSTOMER[0].order
            this.orderName = customerOrder.name
            this.orderId = customerOrder.id
            this.dateCreated = customerOrder.created_at.split('').slice(0, 10).join('')
         })
         
  },
  
  mounted() {
    this.$router.push({ query: { 'module': 'check_application' } })
  }
}
</script>

<style lang="scss" scoped>

.successDelete{
  @include font(14px, 500, red );
  line-height: 21px;
  margin-top: 10px;
  display: none;
}
.title{
  @include title_h2;
  margin-bottom: 45px;
}

.applicationInfo{
  display: flex;
  gap: 30px;
}
.applicationInfo__title {
  @include font(14px, 500, #416782 );
  line-height: 21px;
}

.applicationInfo__value {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #244156;
}

.cancelBtn {
  @include myColorBtn(#416782, #EEEEF0, #EEEEF0);
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
}
</style>