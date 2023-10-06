import { Centrifuge } from 'centrifuge';
import store from '../store';
import router from "@/router"

export function connectToCentrifuge() {

  const centrifuge = new Centrifuge('wss://socket.delegat.online/connection/websocket', {token:store.getters.CENTRIFUGO_TOKEN} );

  centrifuge.on('connecting', function (ctx) {
    console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
  })

  centrifuge.on('connected', function (ctx) {
    console.log(`connected over ${ctx.transport}`);
  })

  centrifuge.on('publication', function(ctx) {
      const channel = ctx.channel;
      const payload = JSON.stringify(ctx.data);
      console.log('Publication from server-side channel', channel, payload);
      if (payload.new_message.chat_id === store.getters.CHAT_ID) store.commit("SET_NEW_MSG", payload)
  })

  centrifuge.connect()
 
  const sub = centrifuge.newSubscription(`personal:#${store.getters.CURRENT_USER.uid}`);

  sub.on('publication', function (ctx) {
    console.log("publication on", ctx);

     // cтавим галочку возле прочитанного сообщения
    if (ctx.data.read_message) {
      if (router.currentRoute.value.name === "customer-chat" || router.currentRoute.value.name === "provider-chat") {
        store.commit('IS_MSG_READ', ctx.data.read_message.message_id)
        return
      } else return
    }

    if (ctx.data.new_offer) {
      store.commit("SET_NEW_OFFER_BANNERS", ctx.data.new_offer )
      return
    }

    // для обновления боковых сообщений
    if (store.getters.SITE_ROLE === "customer" && router.currentRoute.value.params.id) {
      store.dispatch('GET_PROVIDER_OFFERS', router.currentRoute.value.params.id) 
    }

    if (ctx.data.provider_selected) {
      store.commit("SET_IS_PROVIDER_SELECTED", ctx.data.provider_selected) 
      return
    }

    // показываем тоасе исполнителю при закрытии заявки
    if (ctx.data.close_order) {
      store.commit("SET_ORDER_CONFIRMED", ctx.data ) //customerOrder.js
      return
      } 

    // добавляем сервисные сообщения в чат (выбор исполнителя)
    if (ctx.data.new_message.is_service && ctx.data.new_message.user_id === store.getters.CURRENT_USER.uid) {
      if (ctx.data.new_message.chat_id === store.getters.CHAT_ID) {
        store.commit("SET_NEW_MSG", ctx.data.new_message)
        return 
      } 
    }

    if (ctx.data.new_message.chat_id === store.getters.CHAT_ID && !ctx.data.new_message.is_service) {
      store.commit("SET_NEW_MSG", ctx.data.new_message)
    }

    // cобираем напрочитанные сообщения в массив
    if (ctx.data.new_message.user_id === store.getters.CURRENT_USER.uid) return
    if (router.currentRoute.value.name === "provider-chat") return
    store.commit("SET_UNREADED_MESSAGES", {
      data: {
        chat_id: ctx.data.new_message.chat_id,
        msg_id: [ctx.data.new_message.id]
      },
        action: "add"
    })

  })
  
  sub.on('subscribing', function (ctx) {
    console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
  })
  
  sub.on('error', function (ctx) {
    console.log(`error ${ctx.code}`);
  })
  
  sub.on('subscribed', function (ctx) {
    console.log('subscribed', ctx);
  })

}



