import axios from "@/api/axios.js"
export default {
  state: {
    chat_info: {
      chat_id: null
    },
    chat_history: [], 
    filteredMessages: [],
    unreadMessages: [],
    chat_page: 0,
    guest_avatar: require("@/assets/images/icons/user.svg"),
    bigImgChat: "",
    newMsg: "",
    techMsg: "Вы не можете написать в этот чат, так как Заказчик уже выбрал Исполнителя. В случае отказа от Исполнителя у Вас вновь появится возможность общаться в этом чате",
    isChatClosed: false,
    rating: {},
    isMsgRead: null,
    clipboard: '',
    showContext: null,
  }, 

  getters: {
    UNREADED_MESSAGES(state) {
      return state.unreadMessages
    },

    SHOW_CONTEXT(state) {
      return state.showContext;
    }, 

    CLIPBOARD(state) {
      return state.clipboard
    },

    IS_MSG_READ(state) {
      return state.isMsgRead
    },
 
    RATING(state) { 
      return state.rating 
    },

    TECH_MSG(state) {
      return state.techMsg
    }, 
    IS_CHAT_CLOSED(state) {
      return state.isChatClosed
    },
    CHAT_ID(state) {
      return state.chat_info.chat_id
    },

    CHAT_HISTORY(state) {
      return state.chat_history
    },

    FILTERED_MESSAGES(state) {
      return state.filteredMessages
    }, 

    CHAT_PAGE(state) {
      return state.chat_page
    },

    GUEST_AVATAR(state) {
      return state.guest_avatar
    },
    BIG_IMG_CHAT(state) {
      return state.bigImgChat
    },

    NEW_MSG(state) {
      return state.newMsg
    }

  },

  actions: {
    async CREATE_CHAT({ commit }, payload) {
      return new Promise(resolve => {
        axios({
          method: "post",
          url: "/chat/create",
          data: payload
        })
          .then(res => {
            commit("SET_CHAT_ID", res.data)
            resolve(res.data.chat_id)
          })
          .catch(err => console.log("Oшибка при создании чата", err))
      })

    },

    async GET_CHAT_HISTORY({ commit }, { order_id, offer_id, page_size }) {
      return new Promise((resolve) => {
        axios({
          method: "get",
          url: `/order/${order_id}/offer/${offer_id}/chat/history`,
          params: { page: this.getters.CHAT_PAGE, page_size }
        }).then(res => {
          commit("SET_HISTORY", res.data);
          commit("SET_CHAT_PAGE", this.getters.CHAT_PAGE + 1);
          commit("SET_UNREADED_MESSAGES", {data: res.data, action: "delete"})
          resolve(res.data)
        }).catch(err => console.log("Ошибка загрузки истории чата", err))
      })
    },

    async GET_CHAT_ID({ commit }, { order_id, offer_id }) {
      return new Promise(resolve => {
        axios({
          method: "get",
          url: `/order/${order_id}/offer/${offer_id}/chat/info`
        }).then(res => {
          commit("SET_CHAT_ID", res.data)
          resolve(res.data)
        }).catch(err => console.log("Ошибка получения ID чата", err))
      })
    },

    async GET_MESSAGE_BY_ID(_, message_id) {
      try{
        const message = await axios({
          method: "get",
          url: `/chat/${this.getters.CHAT_ID}/message/${message_id}`,
        });
        return message.data;
      } catch (err) {
        console.log(err)
      }

    },

    async SEND_MSG({ commit }, msg) {
      const data = new FormData()
      data.append("data", JSON.stringify(msg))
      console.log(this.getters.DOCS.images)
      this.getters.DOCS.images.binaryFile.forEach(el => {
        data.append("files", el)
      })
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "/chat/send/message",
          data: data
        })
          .then(() => {
            commit("SET_CLEAR_IMG")
            resolve()
          })
          .catch(err => {
            console.log("Ошибка отправки сообщения", err)
            reject("Ошибка отправки сообщения. Попробуйте еще раз")
          })
      })
    },

    async READ_MSG(_, data) {
      await axios({
        method: "post",
        url: "/chat/message/read",
        data: data
      })
        .catch((err) => { console.log(err, "Ошибка отправки отчета о прочитанном сообщении") })
    },

    async GET_PROVIDER_RATING({commit}, user_id) {
      return new Promise((resolve) => {
        axios({
          method: "get",
          url: `/review/info/user/${user_id}`
        })
        .then(res => {
          commit("SET_RATING", res.data)
          resolve(res.data)})
        .catch(err => {
          console.log("Ошибка при получении рейтинга иполнителя")
          console.log(err)})
      })
      
    },

    async GET_REQUISITES(_, orderId) {
       try {
         const response = await axios({
            method: 'get', 
            url: `/order/${orderId}/requisites`
         })
         const requisites = response.data
         return requisites
       } catch(e) {
        console.log(e)
        throw new Error("Oшибка при получении реквизитов")
      }
    }

  },

  mutations: {

    SET_SHOW_CONTEXT(state, status) { 
      state.showContext = status;
    },

    SET_FILTERED_MESSAGES(state, messages) {
      state.filteredMessages = messages;
    }, 

    SET_UNREADED_MESSAGES(state, {data, action}) {
      const index = state.unreadMessages.findIndex(el => el.chat_id === data.chat_id)
      const indexForDeleting = state.unreadMessages.findIndex(el => el.chat_id === data[0]?.chat_id )
      switch(action) {
        case "add": 
          if (index < 0 ) state.unreadMessages.push(data)
          else state.unreadMessages[index].msg_id.push(data.msg_id[0])
          localStorage.setItem("unreadMessages", JSON.stringify(state.unreadMessages))
          break
        case "set": 
          state.unreadMessages = data
          break
        case "delete":
          // console.log(indexForDeleting)
          if (indexForDeleting < 0) return 
          state.unreadMessages.splice(indexForDeleting, 1)
          localStorage.setItem("unreadMessages", JSON.stringify(state.unreadMessages))
      }
    },

    SET_CLIPBOARD(state, url) {
      state.clipboard = url
    },

    IS_MSG_READ(state, id) {
     state.isMsgRead = id
    },

    SET_CHAT_ID(state, info) {
      if (info === null) state.chat_info.chat_id = null
      else if (typeof info === "object") state.chat_info = info
      else state.chat_info.chat_id.chat_id = info
    },

    SET_CHAT_PAGE(state, page) {
      state.chat_page = page
    },

    SET_HISTORY(state, history) {
      state.chat_history = history
      if (history[0]) state.chat_info.chat_id = history[0].chat_id
    },

    SET_GUEST_AVATAR(state, avatar_url) {
      if (avatar_url === null) state.guest_avatar = require("@/assets/images/icons/user.svg")
      else state.guest_avatar = avatar_url
    },

    SET_BIG_IMG_CHAT(state, url) {
      state.bigImgChat = url
    },
 
    SET_NEW_MSG(state, msg) {
      if (state.newMsg.id === msg.id) return
      state.newMsg = msg
    },

    SET_RATING(state, rating) { 
      state.rating = rating
     }
  }
}