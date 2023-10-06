import axios from "@/api/axios"
export default {
  state:{
    user: {
      uid: "string",
      full_name: null,
      email: "user@example.com",  
      phone_number: null,
      avatar: "string",
      email_verified_at: true,
      phone_verified_at: true,
      site_role: "string",
      is_verified: true,
      created_at: "2023-02-09T09:14:24.966Z",
      updated_at: "2023-02-09T09:14:24.966Z"
    },
    avatar_by_id: require('@/assets/images/icons/user.svg'),
    user_by_id: '',
  },
  
  getters: {

    USER_CREATED_DATE(state){
      return state.user.created_at
    },
    AVATAR(state){
      return state.user.avatar
    },
    AVATAR_BY_ID(state){
      return state.avatar_by_id
    },
    USER_BY_ID(state){
      return state.user_by_id
    }
  },

  actions: {
    async GET_USER_BY_ID({commit}, user_id) {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          url: `/user/${user_id}` 
        }) 
          .then(res => {
          commit('SET_USER_BY_ID', res.data)
          resolve(res.data)
         })
          .catch(err => console.log('Oшибка получения пользователя по id', err))
      })
      
    },

    async UPDATE_USER({ commit}, data) {
      await axios({
        method: 'put',
        url: '/user/update',
        data: data,
      }).then(response => {
        commit("SET_USER", response.data)
      }).catch(err => {
        console.log("Ошибка обновления пользователя", err)
        throw new Error("Ошибка обновления пользователя")
      })
    },
    
    async UPLOAD_AVATAR_TO_SERVER(){ 
      const sendedFile = this.getters.DOCS.upload_user_pic.binaryFile
      const file = new FormData()
      file.append("file", sendedFile)
        await axios({
          method: 'post',
          url: '/user/upload-user-pic',
          data: file
        })
          .catch(err => console.log('Ошибка при загрузке аватара на сервер',err))
    },
    
    async GET_AVATAR_FROM_SERVER({commit}){ // для получения своего аватара
      await axios({
        method: 'get',
        url: '/me/picture',
      }).then(res => {
         const href = `https://static.delegat.online/${res.data}`
         commit('SET_HREF_FILE', {href:href, id: 'avatar'})
         })
        .catch(err => console.log('Ошибка загрузки аватара на сайт', err))
    },

    async GET_AVATAR_BY_ID({commit}, user_id){ // для получения aватара контр-агента
      return new Promise((resolve) => {
        axios({
          method: 'get',
          url: `/user/${user_id}/picture`,
          params: {size: '160'}
        }).then((res)=> {
           const href = res.data
           resolve(href)
           commit('SET_AVATAR_BY_ID', href)
          })
         .catch((err)=> console.log('Ошибка загрузки аватара контр-агента', err))
      })
      
    },

    async CHANGE_PASSWORD(_, email) { 
      await axios({
        method: 'get',
        url: `/${this.getters.SITE_ROLE}/reset-password/send-code/${email}`
      }).then(() => {
          this.commit('SET_SHOW_CONFIRM_EMAIL', true)
          this.commit('SET_SHOW_CHANGE_PASSWORD', false)
          this.commit('SET_SHOW_CHECK_EMAIL', true)
      })
        .catch(err => {
          console.log('Ошибка запроса на смену пароля', err)
          this.commit('SET_VALIDATION_ERR', err.response.data.detail) 
        })
    }
    
   },

  mutations: {
    SET_FULL_USER_DATA(state, userData){
      state.user = userData
    },


    SET_AVATAR_BY_ID(state, href) {
      if (href === 'default/user.png' || !href) return 
        return `https://static.delegat.online/${href}`
    },
    

    SET_USER_BY_ID(state, user) {
      state.user_by_id = user
    },
   
  }
}