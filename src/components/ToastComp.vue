<template>
  <div class="transition" v-if="banners.length">
    <transition-group name="list" tag="ul" appear>
      <li class="toast" v-for="(el, i) in banners" :key="i"> 

        <!-- #region Тоаст для при закрытии заявки-->
        <div v-if="el.close_order" class="toast__content">
          <div  class="toast__top" >
            <div class="toast__msg"> 
              Заказчик закрыл заявку #: <span v-if="showOrderName" class="toast__msg">{{ el.close_order.order_id }}</span> 
            </div>
            <font-awesome-icon icon="fa-solid fa-xmark " id="xmark" @click="hideToastCloseOrder" />
          </div>

          <my-white-btn 
            v-if="showOrderName"
            class="toast__btn" 
            @click="goToClosedOrder(el.close_order.order_id)"
          > Перейти к заявке 
          </my-white-btn>

        </div>
        
      <!-- #endregion -->

        <!-- #region Тоаст для при выборе исполнителя-->
        <div v-else class="toast__content">
          <div  class="toast__top">
            <div class="toast__msg"> 
              {{ message }} <span v-if="showOrderName" class="toast__msg">{{ el.order_name }}</span> 
            </div>
            <font-awesome-icon icon="fa-solid fa-xmark " id="xmark" @click="hideToast(i)" />
          </div>

          <my-white-btn 
            v-if="showOrderName"
            class="toast__btn" 
            @click="goToOrder(i)"
          > Перейти к заявке 
          </my-white-btn>
        </div>
        
        <!-- #endregion -->

      </li>
    </transition-group>
  </div>
</template>
 
<script setup>
import {defineProps, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

defineProps({
  banners: {
    type: Object
  }
})

const message = computed(() => {
  if (store.getters.SITE_ROLE === "provider") {
    return router.currentRoute.value.name === "provider-application"
     ? "Вас выбрали исполнителем по этой заявке"
     : "Вас выбрали исполнителем по заявке"
  }
  else {
    return router.currentRoute.value.name === "customer-order"
      ? "У вас новый отклик на эту заявку"
      : "У вас новый отклик на заявку"
  }
})

const showOrderName = computed(() => {
  // if (router.currentRoute.value.name === "customer-order"
  //   || router.currentRoute.value.name === "provider-application") return false
  return true
})

const hideToast = (index) => {
  if (store.getters.SITE_ROLE === "provider")  store.commit("REMOVE_EL_FROM_IS_PROVIDER_SELECTED", index)
    else store.commit("REMOVE_EL_FROM_NEW_OFFER_BANNERS", index)
}

const hideToastCloseOrder = () => {
  store.commit("REMOVE_ORDER_CONFIRMED");
}

const goToOrder = (index) => {
  if (store.getters.SITE_ROLE === "provider") {
    const order_id = store.getters.IS_PROVIDER_SELECTED[index].order_id
    const offer_id = store.getters.IS_PROVIDER_SELECTED[index].offer_id
    router.push(`/provider/application/${order_id}?status=IN_PROGRESS&feedback=true&offer_id=${offer_id}`)
  }
  if (store.getters.SITE_ROLE === "customer") {
    const order_id = store.getters.NEW_OFFER_BANNERS[index].order_id
    router.push(`/customer/order/${order_id}?status=PUBLISHED&type=delivery`)
  }
  hideToast(index)
}

const goToClosedOrder = (id) => {
  router.push(`/provider/application/${id}?status=COMPLETED&feedback=true`);
  hideToastCloseOrder();
};

</script>

<style scoped lang="scss">

#xmark {
  color: white;
  height: 3rem;
  cursor: pointer;
}
.transition {
  position: absolute;
  left: 60%;
  width: 40%;

  @media (max-width:600px) {
    left:4% !important;
    width: 50%;
  }
}
.toast {
  background: #339DFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  @include flex (column, center, flex-start, 1rem);
  padding: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    width: 90vw;
    opacity: 1;
  }
}

.toast__content {
  @include flex (column, flex-start, center, 2rem);
  width: 100%
}


  .toast__top {
  @include flex(row, space-between, center, 2rem);
  width: 100%;
}
  .toast__msg {
    @include font (2rem, 600, white);
    text-align: left;
  }

  .toast__btn {
    align-self: flex-end;
  }

  .list-enter-from {
    opacity: 0;
    transform: scale(0.6);
  }
  .list-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .list-enter-active {
    transition: all 0.5s ease;
  }

  .list-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(0);
  }
  .list-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    /* позишен добавляем чтобы елементы которые остаются сдвигались медленнее. position:relative выше */
  }

  .list-move {
    transition: all 1s ease;
  }


</style>