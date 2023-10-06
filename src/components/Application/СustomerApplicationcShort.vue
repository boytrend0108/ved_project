<template>
  <div class="customerApplicationShort" @click="goToApplication" v-if="showElement">
    <div class="header">
      <div class="header__top">
        <div class="wrapper">
          <div class="status">
            <div class="header__top-notPublished" v-if="order.status === 'UNPUBLISHED'"> Неопубликована </div>
            <div class="header__top-published" v-if="order.status === 'PUBLISHED'">Опубликована</div>
            <div class="header__top-finished" v-if="order.status === 'COMPLETED'">Завершена</div>
            <div class="header__top-published" v-if="order.status === 'IN_PROGRESS'"> В процессе</div>
          </div> 
          <my-type-of-service :type="order.type" />
        </div> 

        <div class="wrapper" @click.stop>
          <div class="order-data">
            <p class="header__top-right">№ {{ order.rand_id }}</p>
            <div class="header__top-right">Создана <span>{{dateCreated}}</span></div>
          </div>
          <img 
            v-if="showDeleteBtn2"
            src="@/assets/images/icons/trash_box.png" 
            alt="Удалить" 
            @click="showDeleteConfirmForm(order.id)" 
            class="deleteIcon"
          >
        </div>
      </div> 

      <div class="title-box">
        <div class="name-box">
          <h3 class="title">{{ order.name }}</h3>
        </div>   
        <p class="subtitle" 
          v-if="order.type === 'delivery' && order.status !== 'IN_PROGRESS'"> Специалист ещё не выбран </p>
        <div class="wr">
          <div class="bottom">
          <div class="direction" v-if="order.type === 'delivery' || order.type === 'cost'">
            <p class="address__el_down">{{ order.from_country }}</p>
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
            <p class="address__el_down">{{ order.to_city }}</p>
          </div> 
          <div class="direction" v-if="order.type === 'search'">
            <p class="address__el_down"> Предполагаемое кол-во: </p>
            <p class="address__el_down">{{ order.amount }}</p>
          </div>    
        </div>
        <p class="stats" v-if="order.type === 'delivery'"> 
          <span  v-if="order.status === 'PUBLISHED' && order.offers_count" >  Отклики: {{ order.offers_count }}</span> &nbsp; 
          <span  
          v-if="order.status !== 'UNPUBLISHED' && order.unread_messages " >  
          Новые сообщения: {{ order.unread_messages }}</span>
        </p>
        </div>
      </div>

      <div class="btn-wr">
        <my-btn 
          class="btn" @click.stop="goToApplication" 
          v-if="order.status === 'UNPUBLISHED'"
        >Редактировать</my-btn>
        <my-btn 
          class="btn" 
          @click.stop="publishOrder" 
          v-if="order.status === 'UNPUBLISHED'"
        >Опубликовать</my-btn>
        <my-color-btn 
          v-if="showDeleteBtn" 
          class="btn-delete" 
          @click.stop="SET_SHOW_DELETION_CONFIRMATION_FORM(true)" 
        >
          <img src="@/assets/images/icons/trash_box.png" alt="удалить">
        </my-color-btn>
      </div>
    </div>

    <my-big-spinner v-if="showPreloader" />
  </div> 
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "customer-application-short",
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
      innerWidth: window.innerWidth,
      showElement: true,
      showPreloader: false,
      orderId: null
    }
  },

  computed: {
    ...mapGetters(["DELETE_ORDER_STATUS", "DELETED_ORDER_ID"]),
    // eslint-disable-next-line
    dateCreated() {
      if (this.order.created_at) {
        return this.order.created_at.split("").slice(0, 10).join("")
      }
    },

    // eslint-disable-next-line
    showDeleteBtn() {
      if (this.innerWidth < 600 && this.order.status === "UNPUBLISHED") return true
      else return false
    },
    // eslint-disable-next-line
    showDeleteBtn2() {
      if (this.innerWidth > 600 && this.order.status === "UNPUBLISHED") return true
      else return false
    }
  },

  methods: {
    ...mapActions([
      "PUBLISH_ORDER",
      "CANCEL_CUSTOMER_ORDER",
    ]),
    ...mapMutations([
      "SET_CHANGE_ORDER_STATUS", "SET_ACTIVE_MODULE", "SET_SHOW_DELETION_CONFIRMATION_FORM",
      "SET_SELECTED_ORDER", "SET_DELETE_ORDER", "SET_DELETE_ORDER_STATUS", "SET_DELETED_ORDER_ID"
    ]),

    goToApplication() {
      this.SET_ACTIVE_MODULE("checkApplication")
      this.$router.push(`/customer/order/${this.order.id}?status=${this.order.status}&type=${this.order.type}`)
    },

    publishOrder() {
      this.PUBLISH_ORDER(this.order.id) // публикуем заявку
        .then(() => {
          this.SET_SELECTED_ORDER({ order: this.order, chat: this.chat })
          this.SET_CHANGE_ORDER_STATUS() // отлавливаем изменение статуса заявки(boolean)
          this.$router.push(`/customer/order/${this.order.id}?status=PUBLISHED&type=${this.order.type}`)
        })
    },

    showDeleteConfirmForm(id) {
      this.SET_DELETED_ORDER_ID(id)
      this.SET_SHOW_DELETION_CONFIRMATION_FORM(true)
    },

    async deleteOrder() {
      debugger
      this.SET_SHOW_DELETION_CONFIRMATION_FORM(false)
      this.SET_DELETE_ORDER_STATUS(false)
      this.showPreloader = true
      this.CANCEL_CUSTOMER_ORDER()
        .then(() => {
          this.$emit("delete_order", this.DELETED_ORDER_ID)
          this.SET_DELETE_ORDER()
          this.showElement = false
          this.showPreloader = false
        })
        .catch(() => {
          this.showPreloader = false
        })
    },
  },

  watch: {
    DELETE_ORDER_STATUS() {
      if (this.DELETE_ORDER_STATUS) {
        this.deleteOrder()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.customerApplicationShort {
  @include flex(column, space-between, flex-start, 0);
  background: #FFFFFF;
  border-radius: 1rem;
  padding: 2rem 5.2rem 3rem 5.2rem;
  margin-top: 2.8rem;
  cursor: pointer;
  position: relative;

  @media (max-width:600px) {
    padding: 1.5rem;
  }
}

// #region header__top

.header {
  width: 100%;
}

.header__top-notPublished {
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid #D9E1E7;
  border-radius: .5rem;
  @include font(1.4rem, 500, #416782);
  @include flex(row, center, center, 0);

  @media (max-width:600px) {
    @include font(1.3rem, 500, #416782);
    line-height: 1.8rem;
  }
}

.header__top-published {
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid $main-color;
  border-radius: .5rem;
  @include font(1.4rem, 500, $main-color);
  @include flex(row, center, center, 0);
}

.header__top-finished {
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid #416782;
  background-color: #416782;
  border-radius: .5rem;
  @include font(1.4rem, 500, #FFFF);
  @include flex(row, center, center, 0);
}

.header__top-left {
  width: 13.8rem;
  height: 2.1rem;
  border: 1px solid #D9E1E7;
  border-radius: .5rem;
  @include font(1.4rem, 500, #FFFF);
  @include flex(row, center, center, 0);

  @media (max-width:600px) {
    @include font(1.7rem, 600, $font-color2 );
    line-height: 2.3rem;
  }
}

.header__top-right {
  @include font(1.4rem, 500, #416782);
  text-align: right;

  @media (max-width:600px) {
    @include font(1.3rem, 500, #416782);
    line-height: 1.8rem;
  }
}

.header__top {
  @include header__top;
}

.wrapper {
  @include application__wrapper;
}

.order-data {
  @include flex(row, flex-end, center, 1rem);
  flex-wrap: wrap;
}

// #endregion

// #region title-box
.title-box {
  @include flex(column, start, flex-start, 0);
}

.wr {
  @include flex (row, space-between, center, 0);
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.name-box {
  @include flex (row, flex-start, center, 2rem);
}

.subtitle {
  @include font(1.4rem, 500, #416782);

  @media (max-width:600px) {
    @include font(1.3rem, 500, #416782);
    line-height: 1.8rem;
  }
}

.title {
  @include title_h3;
}

.bottom {
  @include flex(row, space-between, center, 0);
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.direction {
  @include flex(row, center, center, 1.3rem);

  @media (max-width:600px) {
    margin: 1rem 0 1.5rem 0;
  }
}

.address__el_down {
  @include font(1.4rem, 500, #244156);

  @media (max-width:600px) {
    @include font(1.3rem, 500, #416782);
    line-height: 1.8rem;
  }
}

.stats {
  @include font (1.4rem, 500, $font-color2);
  min-width: 22rem;
  text-align: right;

  @media (max-width: 600px) {
    @include font (1.3rem, 500, $font-color2);
    min-width: 0;
  }
}

.stats span {
  @include font (1.4rem, 600, $main-color);
}

.fa-arrow-right {
  font-size: 1.4rem;
  color: $main-color;
}

// #endregion

// #region btn-wr

.btn-wr {
  @include flex(row, flex-start, center, 1rem);
  margin-top: 2rem;
}

.btn {
  @include flex(row, center, center, 0px);
  width: 15.7rem;
  @include font(1.4rem, 500, #FFFF);

  @media (max-width:600px) {
    width: 100%;
    @include font(1rem, 500, #FFFF);
    padding: .5rem;
    height: 32px;
  }
}

.btn-delete {
  @include myColorBtn(#EEEEF0, #EEEEF0, #EEEEF0);
  max-width: 5rem;

  @media (max-width: 600px) {
    height: 3.2rem;
    padding: 1rem;
  }
}

// #endregion
</style>