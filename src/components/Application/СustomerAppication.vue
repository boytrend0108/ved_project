<template>
  <div class="customerApplication" @click="goToApplication" v-if="showElement"> 
    <div class="header">

      <div class="header__top"> 

        <div class="wrapper">
          <div 
            class="header__top-notPublished" 
            v-if="order.status === 'UNPUBLISHED'"
          > Неопубликована </div>
          <div class="header__top-published" v-if="order.status === 'PUBLISHED'">Опубликована</div>
          <div class="header__top-finished" v-if="order.status === 'COMPLETED'">Завершена</div>
          <div class="header__top-published" v-if="order.status === 'IN_PROGRESS'"> В процессе</div>
          <my-type-of-service :type="order.type" />
        </div>

        <div class="wrapper">
          <div class="order-data">
            <p class="header__top-right">№ {{ order.rand_id }}</p>
            <div class="header__top-right">Создана <span>{{dateCreated}}</span></div>
          </div>
          <img 
            src="@/assets/images/icons/trash_box.png" 
            alt="Удалить" 
            @click.stop="SET_SHOW_DELETION_CONFIRMATION_FORM(true)"  
            class="deleteIcon"
            v-if="showDeleteBtn2"
            >
        </div>

      </div>

      <div class="title-box">
        <h3 class="title">{{ order.name }}</h3>
        <p 
          class="subtitle"  
          v-if="order.type === 'delivery' && order.status !== 'IN_PROGRESS'"
        >Специалист ещё не выбран</p>
        <p 
          class="stats"
          v-if="order.type === 'delivery' && order.status === 'PUBLISHED'"  
        >
          Отклики: <span> {{ order.offers_count }}</span> &nbsp; 
          Новые сообщения: <span>{{ order.  unread_messages }}</span>
        </p>
      </div> 
    </div>
      

    <hr class="hr">
    <div class="address" v-if="order.type === 'delivery'" >
      <div class="address__el"> 
        <p class="address__el-up">Страна-эспортёр</p>
        <p class="address__el_down">{{ order.from_country }}</p>
      </div>
      <div class="address__el">
        <p class="address__el-up">Город доставки</p>
        <p class="address__el_down">{{ order.to_city }}</p>
      </div>
    </div>

    <hr class="hr" v-if="order.type === 'delivery'">
    <div class="description">
      <ul class="services__ul" v-if="order.type === 'delivery'" > Услуги
        <li 
          class="services__li" 
          v-for="(service,i) in additional_services " :key="i" > {{ service }} </li>
      </ul>

      <div class="direction" v-if="order.type === 'search'">
        <p class="address__el_down"> Предполагаемое кол-во: </p>
        <p class="address__el_down">{{ order.amount }}</p>
      </div>

        <div class="services__ul">
          <p class="title-description" v-if="order.type === 'delivery'"> Описание товаров </p>
          <p class="title-description" v-if="order.type === 'search'"> Описание функционала </p>
          <p class="item-desciption "> {{ description }}</p>
        </div>
       
    </div>

    <div class="btn-wr">
      <my-btn class="btn" @click="publishOrder" v-if="order.status === 'UNPUBLISHED'"> Опубликовать </my-btn>
      <my-btn class="btn" @click.stop="goToApplication" v-if="order.status === 'UNPUBLISHED'">Редактировать</my-btn>
    </div>

    <my-big-spinner v-if="showPreloader" />
  </div>
</template> 

<script>
import { mapActions, mapMutations, mapGetters } from "vuex"
import { enumServices2 } from "@/helpers/enumTransformation"
export default {
  name: "customer-application",
  props: {
    order: {
      type: Object
    },
    chat: {
      type: Object
    }
  },

  data() {
    return {
      description: this.order.description,
      showElement: true,
      showPreloader: false,
      additional_services: [],
      innerWidth: window.innerWidth,
    }
  },

  computed: {
    ...mapGetters(["DELETE_ORDER_STATUS"]),
    // eslint-disable-next-line
    dateCreated() {
      if (this.order.created_at) {
        return this.order.created_at.split("").slice(0, 10).join("")
      }
    },

    showDeleteBtn2() {
      if (this.innerWidth > 600 && this.order.status === "UNPUBLISHED") return  true
      else return false
    }
  },

  methods: {
    ...mapActions([
      "PUBLISH_ORDER", "CANCEL_CUSTOMER_ORDER"
    ]),
    ...mapMutations([
      "SET_CHANGE_ORDER_STATUS", "SET_ACTIVE_MODULE", "SET_SELECTED_ORDER", "SET_DELETE_ORDER",
      "SET_SHOW_DELETION_CONFIRMATION_FORM", "SET_DELETE_ORDER_STATUS"
    ]),

    cuttedText() {
      const cuttetText = document.querySelector(".item-desciption").innerText.slice(0, 170) + "..."
      this.description = cuttetText
    },

    goToApplication() {
      this.SET_ACTIVE_MODULE("checkApplication")
      this.SET_SELECTED_ORDER({ order: this.order, chat: this.chat })
      this.$router.push(`/customer/order/${this.order.id}?status=${this.order.status}`)
    },

    publishOrder() {
      this.showPreloader = true
      this.PUBLISH_ORDER(this.order.id) // публикуем заявку
        .then(() => {
          this.showPreloader = false
          this.SET_SELECTED_ORDER({ order: this.order, chat: this.chat })
          this.SET_CHANGE_ORDER_STATUS() // отлавливаем изменение статуса заявки(boolean)
          this.$router.push(`/customer/order/${this.order.id}?status=PUBLISHED&type=${this.order.type}`)
        })
    }, 

    deleteOrder() {
      this.SET_SHOW_DELETION_CONFIRMATION_FORM(false)
      this.SET_DELETE_ORDER_STATUS(false)
      this.showPreloader = true
      this.CANCEL_CUSTOMER_ORDER(this.order.id)
        .then(() => {
          this.SET_DELETE_ORDER(this.order)
          this.showElement = false
          this.showPreloader = false
        })
        .catch(() => {
          this.showPreloader = false
          alert("Ошибка при удалении заявки")
        })
    }
  },

  watch: {
    DELETE_ORDER_STATUS() {
      if (this.DELETE_ORDER_STATUS) this.deleteOrder()
    }
  },

  mounted() {
    this.additional_services = enumServices2(this.order.additional_services)
  }

}
</script>

<style lang="scss" scoped>

.customerApplication {
  @include flex(column,space-between, flex-start, 0);
  background: #FFFFFF;
  border-radius: 1rem;
  padding: 2rem 5.2rem 3rem 5.2rem;
  margin-top: 2.8em;
  cursor: pointer;
  position: relative
}
.header{
  width: 100%;
}

// #region header__top

.wrapper {
  @include application__wrapper;
}

.order-data {
  @include flex(row, flex-start, center, .5rem);
  flex-wrap: wrap;
}

.header__top {
  @include header__top;
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
 @include font(1.4rem,500,#FFFF);
 @include flex(row, center, center, 0);
}

.header__top-right {
  @include font(1.4rem,500,#416782);;
  text-align: right;
}

.deleteIcon {
  transition: 1s;

  &:hover {
    transform: scale(1.1)
  }
}

// #endregion

// #region title-box
.title-box{
  @include flex(column, start, flex-start, 0);
}

.subtitle {
  @include font(1.4rem,500,#416782);
}

.title{
  @include title_h3;
}
// #endregion

.stats {
  @include font (1.4rem, 500, $font-color2);
  min-width: 220px;

  @media (max-width: 600px) {
    @include font (13px, 500, $font-color2);
    min-width: 0;
  }
}

.stats span {
  @include font (1.4rem, 600, $main-color);
}

.btn-wr {
  @include flex(row, flex-end, center, 1rem);
}

.direction {
  @include flex(row, flex-start, center, 13px);
  width: 50%;

  @media (max-width:600px) {
    margin: 1rem 0 1.5em 0;
  }
}

.title-description{
  @include font(1.4rem,500,#416782);
}

.btn{
  width: 15.7rem;
  margin-top: 3.8rem;
  @include font(1.4rem,600,#FFFF);
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
}

.services__ul {
  @include font(1.4rem,500,#416782);
  @include flex(column, center,flex-start,3px);
  margin-bottom: 3px;
  width: 50%;
  text-align: left;
}

.description{
  @include flex(row,flex-start, flex-start, 3rem);
  width: 100%;
}
.address__el_down {
  @include font(1.4rem,500,#244156);
}

.address__el-up{
  @include font(1.4rem,500,#416782);
}
.address{
  @include flex(row, center, flex-start, 2.8em);
}

.address__el {
  @include flex(column, center, flex-start, 3px);
}



.hr{
  border: 1px solid #D9E1E7;
  margin: 2rem 0;
  width: 100%;
}


</style>