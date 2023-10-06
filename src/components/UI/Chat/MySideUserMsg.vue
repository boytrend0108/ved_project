<!--USER MESSEDG IN SIDE-BAR LAYOUT CUSTOMER-->
<template>
  <div>
    <my-semipolar-spinner 
      class="spinner" 
      v-if="!msg"
    /> 
 
    <div 
      class="userMassageComp"
      @click="goToChat" 
      :class="{'userMassageComp-active': msg.owner_id === this.$route.query.provider}"
      v-else
    >
      <img :src="avatar_url" alt="avatar" class='avatar'>
      <div class="userMessage__right">
        <p class="userName"> {{ msg.owner_name }}</p> 
        <p class="userName price"> Стоимость доставки: <br> {{ msg.offer_price }} руб</p> 
        <p class="message">{{ msg.last_message }}</p>
      </div>
      <div v-if="msg.unread_message_count" class="counter"> {{ msg.unread_message_count }} </div>
    </div> 
  </div> 
</template> 

<script>
import { mapActions, mapMutations } from "vuex"
export default {
  name: 'my-side-user-msg',
  
  data() {
    return {
      PATH: 'https://static.delegat.online/',
    }
  },

  props: {
    msg: {
      type: Object
    }
  },

  computed: {
    avatar_url() {
      if (this.msg.owner_avatar_path === 'default/user.png' || !this.msg.owner_avatar_path) {
        return require('@/assets/images/icons/user.svg');
      } 
      return  this.PATH + this.msg.owner_avatar_path;
    }
  },

  methods: {
    ...mapMutations(["SET_SPECIFIC_OFFER", "SET_GUEST_AVATAR", "SET_CLEAR_IMG"]),
    ...mapActions(["GET_CHAT_ID"]),

    createRouterPath() {
     return `/customer/chat/${this.msg.order_id}/?provider=${this.msg.owner_id}&offer_id=${this.msg.id}&status=${this.$route.query.status}&type=${this.$route.query.type}`
    }, 

    goToChat() {
      this.SET_CLEAR_IMG()
      const changeUrl = new Promise(resolve => {
        resolve(this.$router.push(this.createRouterPath()))
      })

      changeUrl
        .then(() => {
          this.SET_SPECIFIC_OFFER(this.msg)
          this.GET_CHAT_ID({ order_id: this.$route.params.id, offer_id: this.$route.query.offer_id })
        })
        .then(() => {
          if (this.msg.owner_avatar_path !== null) {
            this.SET_GUEST_AVATAR(this.PATH + this.msg.owner_avatar_path)
          } else (
            this.SET_GUEST_AVATAR(null)
          )
        })
    },
  },

}

</script>

<style lang="scss" scoped>
.spinner {
  margin-left: 100px;
}

.userMassageComp {
  @include flex(row, flex-start, center, 1rem);
  border-radius: 1rem;
  cursor: pointer;
  background-color: white;
  padding: .5rem 0;

  &:hover {
    background: #EEEEF0;
  }

  @media (max-width: 600px) {
    border-bottom: 1px solid #D9E1E7;
    border-top: 1px solid #D9E1E7;
    padding: .5rem;
    width: 100%;
    justify-content: flex-start;
  }

  .userMassageComp-active {
    background: #EEEEF0;
  }
}

.avatar {
  height: 4rem;
  width: 4rem;
}

.userMessage__right {
  @include flex(column, center, flex-start, 0);

  .userName {
    @include font(1.4rem, 600, #244156);
    line-height: 1.6rem;
    width: 150px;
    text-align: left;
  }

  .price {
    padding: .5rem 0;
  }

  .message {
    @include font(1.4rem, 500, #416782);
    text-align: left;
    line-height: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 18rem;
  }
}

.counter {
  border: 2px solid $main-color;
  background-color: $main-color;
  padding: 0px 4px;
  border-radius: 15px;
  min-width: 23px;
  @include font(10px, 600, #FFFFFF);
}
</style>