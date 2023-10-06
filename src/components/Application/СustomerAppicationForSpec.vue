<template>
  <div class="customerApplication"> 
    <div class="header"> 
      <div class="title-box">
        <h3 class="title"> {{ order.name }} </h3>
        <div class="header__top-right"> № {{ order.rand_id }} &nbsp; Создан {{ dateCreated }}</div>
      </div>
    </div> 
    <hr class="hr" v-if="innerWidth > 600">

    <div class="address" v-if="innerWidth > 600">
      <div class="address__el">
        <p class="address__el-up">Страна-эспортёр</p>
        <p class="address__el_down">{{ order.from_country }}</p>
      </div>
      <div class="address__el">
        <p class="address__el-up">Город доставки</p>
        <p class="address__el_down">{{ order.to_city }}</p> 
      </div>
    </div>

    <div class="address" v-if="innerWidth < 600">   
      <p class="address__el_down">{{ order.from_country }}</p>
       <img src="@/assets/images/icons/arrow_right.png" alt="маршрут доставки">
      <p class="address__el_down">{{ order.to_city }}</p> 
    </div>

    <hr class="hr">
    <div class="description">
      <ul class="services__ul"> Заказчику требуются услуги
        <li 
          class="services__li" 
          v-for="(service,i) in additional_services" :key="i" 
        > {{ service }} </li>
        <li class="services__li" v-if="order.comment_for_service"> {{ order.comment_for_service }}</li>
      </ul>
        <div class="services__ul">
          <p class="title-description">Описание товаров</p>
          <p class="item-desciption "> {{ description }}</p>
        </div>
       
    </div>
    <my-white-btn class="btn" @click="goToOrder" >Подробнее</my-white-btn>
  </div>
</template>

<script>
import { enumServices2 } from "@/helpers/enumTransformation"
import { mapMutations } from 'vuex'; 
  export default {
    name: "customer-application-for-spec",
    props:{
      order:{
        type: Object
      }
    },

  data() {
    return {
      description: this.order.description,
    };
  },

  computed:{
    dateCreated(){
      return this.order.created_at.split('').slice(0, 10).join('')
    },

    innerWidth() {
      return window.innerWidth
    },

    additional_services() {
      return enumServices2(this.order.additional_services)
    }
  }, 

    methods: {
        ...mapMutations([
          'SWITCH_SHOW_DETAILED_APPL', 'SET_CUSTOMER_ORDER'
        ]), 

        goToOrder(){
          this.SET_CUSTOMER_ORDER(this.order)
          this.$router.push(`/provider/application/${this.order.id}?status=${this.order.status}`) 
        },
    }, 

}
</script>

<style lang="scss" scoped>


.title-description{
  @include font(1.4rem,500,#416782);
}

.cuttedText {
  display: block;
  height: 6.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header{
  width: 100%;
}

.btn{
  width: 15.7rem;
  margin-top: 3.8rem;
  @include font(1.4rem,600,#FFFF);
  background: none;
  border: 2px solid #D9E1E7;
  color: $main-color;

  @media (max-width:600px) {
    height: 4rem;
    width: 100%;
  }
}

.item-desciption{
  overflow-wrap: anywhere;
  max-width: 44.3rem;
  text-align: left;
  @include font(1.4rem,500,#244156);
}
.services__li {
  @include font(1.4rem,500,#244156);
  margin-left: 2.5em;
  text-align: left;
}

.services__ul {
  @include font(1.4rem,500,#416782);
  @include flex(column, center,flex-start,3px);
  margin-bottom: 3px;
  text-align: left;
}

.description{
  @include flex(row,flex-start, flex-start, 7em);
  width: 100%;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
.address__el_down {
  @include font(1.4rem,500,#244156);
}

.address__el-up{
  @include font(1.4rem,500,#416782);
}
.address{
  @include flex(row, center, flex-start, 2.8em);
 
  @media (max-width: 600px) {
    margin-bottom: 1.5em;
  }

}

.address__el {
  @include flex(column, center, flex-start, 3px);
}

.title-box{
  @include flex(row, space-between, center, 0);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
.subtitle {
  @include font(1.4rem,500,#416782);

}

.title{
  @include title_h3;
}
.header__top-notPublished {
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid #D9E1E7;
  border-radius: .5rem;
 @include font(1.4rem,500,#416782);
 @include flex(row, center, center, 0);
}

.header__top-published{
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid $main-color;
  border-radius: .5rem;
 @include font(1.4rem,500,$main-color);
 @include flex(row, center, center, 0);
}

.header__top-finished{
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid #416782;
  background-color: #416782 ;
  border-radius: .5rem;
 @include font(1.4rem, 500, #FFFF);
 @include flex(row, center, center, 0);
}

.header__top-right {
  @include font(1.4rem,500,#416782);;
  text-align: right;

  @media (max-width:600px) {
    @include font(13px, 500, #416782 );
    line-height: 1.8rem;
    margin-bottom: 1.5em;
  }
}

.header__top{
  @include flex(row, space-between, center, 1rem);
  margin-bottom: 1rem;
}

.hr{
  @include hr;
}

.customerApplication{
  @include flex(column,space-between, flex-start, 0);
  background: #FFFFFF;
  border-radius: 1rem;
  padding: 2rem 5.2rem 3rem 5.2rem;
  margin-top: 2.8em;

  @media (max-width:768px) {
    padding: 2rem;
  }

  @media (max-width: 600px) {
    padding: 1.5em;
  }
}
</style>