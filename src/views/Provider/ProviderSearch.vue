<template>
  <div>
    <h1 class="title">Поиск заказов</h1>
    <div class="fiters" @click="SHOW_DIALOG">Фильтры</div>

    <my-validation-error-msg :errorMsg="INPUT_VALIDATION_ERR" v-if ="INPUT_VALIDATION_ERR" />
    <div v-else>
      <p v-if="!orders.length && !showPreloader" class="msg"> Новых заказов пока нет</p>
      <div v-else>
        <p v-if="!orderList.length && !showPreloader" class="msg"> Заявок с такими фильтрами нет</p>
      </div>
    </div>
   
    <my-big-spinner v-if="showPreloader"/>
    
    <cust-appl-for-spec 
      v-else
      v-for="(order, i) in orderList" :key="i"  
      :order="order"
    />
    <div ref="observer" class="observer"></div>
   
    <my-dialog v-if="DIALOG">
      <order-filter-provider></order-filter-provider>
    </my-dialog>

   <!-- <Transition name="up">
      <my-btn class="upBtn" @click="goUp" v-if="scroll > 1000">Наверх</my-btn>
   </Transition> -->

  </div>
</template> 

<script>
import OrderFilterProvider from "@/components/Filter/OrderFilterProvider.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import CustApplForSpec from "@/components/Application/СustomerAppicationForSpec.vue"
export default {
  components: {
    CustApplForSpec,
    OrderFilterProvider,
  },

  data() {
    return {
      orders: [],
      my_offers: [], // id заявок на которые откликнулся исполнитель
      filteredOrders: [],
      filteredByCoutry: [],
      filteredByServicies: [],
      showPreloader: false,
      scroll: null,
    }
  },

  computed: {
    ...mapGetters([
      "PAGE", "FILTER_SERVICES", "FILTER_COUNTRY", "DIALOG", "CUSTOMER_ORDERS", "INPUT_VALIDATION_ERR"
    ]),

    orderList() {
      if (this.FILTER_COUNTRY.length) {
        return this.orders.filter(el =>  this.FILTER_COUNTRY.includes(el.from_country) )
      } else return this.orders
    }
  },

  methods: {
    ...mapActions([
      "GET_CUSTOMER_ORDERS",
      "GET_MY_OFFERS", "GET_ORDERS_FOR_PROVIDER"

    ]),
    ...mapMutations([
      "SET_PAGE", "SHOW_DIALOG", "SET_NEW_OFFER_IN_PROGRESS"
    ]),

    // goUp() {
    //   window.scrollTo(0, 0);
    // },

    collectOrders() {
      const collection = new Set([...this.filteredByServicies, ...this.filteredByCoutry])
      return Array.from(collection)
    }

  },

  watch: {

    CUSTOMER_ORDERS: {
      handler() {
        this.showPreloader = true
        if (this.FILTER_SERVICES.length) {
          if (this.PAGE === 0) {
            this.orders = []
            this.orders = this.CUSTOMER_ORDERS
          }
          else this.orders = [...this.orders, ...this.CUSTOMER_ORDERS]
        }
        else this.orders = [...this.orders, ...this.CUSTOMER_ORDERS]
        this.showPreloader = false
      },
      deep: true,
      flush: 'post',
      immediate: false
    },

  },

  mounted() {
    this.SET_PAGE(true) // обнуляем счетчик
    this.showPreloader = true
    debugger
    this.GET_CUSTOMER_ORDERS({ status: "published", order_type: "delivery", page: this.PAGE, page_size: 10 }) // получаем все опубликованные заявки заказчиков
      .then(() => {
        const options = {
          rootMargin: "0px",
          threshold: 0.1
        }
        const callback = (entries) => {
          if (entries[0].isIntersecting) { // вызываем только при входе в observer 
            this.SET_PAGE() // ПРИБАВЛЯЕМ К СТРАНИЦЕ 1

            const options = {
              status: "published",
              order_type: "delivery",
              page: this.PAGE,
              page_size: 10
            }
            if (this.FILTER_SERVICES.length) this.FILTER_SERVICES.forEach(el => options[el] = true)

            this.GET_CUSTOMER_ORDERS(options)
              .then(res => {
                this.orders = [...this.orders, ...res.data]
              }
              )
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
      })
      .catch(err => {
        this.showPreloader = false
        console.log(err)}
        )


    // отслеживаем новые отклики от заказчика
    this.GET_ORDERS_FOR_PROVIDER({ status: "in_progress", page: 0 })
      .then(res => {
        if (res[0]?.offer_id > localStorage.getItem('lastOffer')) this.SET_NEW_OFFER_IN_PROGRESS(true)
        else this.SET_NEW_OFFER_IN_PROGRESS(false);
      })

  }
}
</script>

<style lang="scss" scoped>

.upBtn {
  position: fixed;
  bottom: 10rem;
  left: 80%;
  width: 15rem ;

  @media (max-width: 600px) {
    bottom: 5rem;
    left: 60%;
  }
}

.up-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.up-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.up-enter-active,
.up-leave-active {
  transition: all 0.5s ease;
}
.msg {
  @include font(1.4rem, 600, $main-color);
  margin-top: 4.5rem;
}

.fiters {
  @include font(1.4rem, 600, $main-color);
  line-height: 1.9rem;
  text-align: left;
  display: flex;
  gap: 5px;

  &::before {
    content: url("@/assets/images/icons/filers_mob.png");
  }

  @media (min-width: 600px) {
    display: none;
  }

}

.spinner {
  margin-left: 50%;
  margin-top: 40%;
}

.observer {
  height: 50px;
}

.title {
  @include title_h2;
  margin-bottom: 45px;

  @media (max-width: 600px) {
    margin: 0 0 3rem;
  }
}
</style>