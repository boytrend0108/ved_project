<template>
  <div class="chat_spec"> 
    <h1 class="visually-hidden">Чат с заказчиком</h1>
    <div class="header"> 
      <div class="wr">
        <my-color-btn  
         class="btn-back"
         v-if="innerWidth < 600"
         @click="$router.go('-1')"
        />
        <img :src="AVATAR_BY_ID" alt="icon" class="guestIcon">
        <div class="titleBox">
          <h2 class="title"> {{ USER_BY_ID.full_name }}</h2>
        </div>
      </div> 
      <hr class="hr" v-if="innerWidth < 600">
    </div>

    <my-big-spinner v-if="showPreloader"/>

    <p v-if="error" class="error">{{ error }}</p>
    <chat-box2 />
  </div>
</template>

<script>
import ChatBox2 from "@/components/Chat/ChatBox2.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    name:"provider-chat",
    data() {
      return {
        innerWidth: window.innerWidth,
        showPreloader: false,
        error: '',
      }
    },

    components:{ 
      ChatBox2 
    },
    computed:{
      ...mapGetters([
        "USER_BY_ID", "AVATAR_BY_ID", "CHAT_ID"
      ]),
    },

    methods: {
      ...mapActions([
        "GET_AVATAR_BY_ID", 
        "GET_USER_BY_ID", 
        "GET_CUSTOMER_ORDER_BY_ID", 
        "GET_CHAT_ID"
      ]),
      ...mapMutations(["SET_CLEAR_DOCS"])
    },

    mounted() {
      this.GET_USER_BY_ID(this.$route.query.guest_id)
      this.GET_AVATAR_BY_ID(this.$route.query.guest_id) 
      this.GET_CUSTOMER_ORDER_BY_ID(this.$route.params.id)
      if (!this.CHAT_ID) this.GET_CHAT_ID({order_id:this.$route.params.id, offer_id:this.$route.query.offer_id})
    },

    unmounted() {
      this.SET_CLEAR_DOCS();
    }
  }
</script>

<style lang="scss" scoped>

.visually-hidden {
  @include visually-hidden;
}

.error {
  @include errorMsg;
  margin: 0 auto;
}

.preloader {
  margin: 0 auto;
}

.btn-back{
  @include myColorBtn($main-color, #EEEEF0, #EEEEF0);
  width: 34px;
  &::before{
    content: url("@/assets/images/icons/shevron-left.svg");
    position: relative;
    left: -1px;
  }
}

.hr{
  @include hr;
}

.wr{
  @include flex(row, flex-start, center, 16px);
  width: 100%;
}
.guestIcon{
  height: 50px;
  border-radius: 50%;

  @media (max-width: 600px) {
    height: 2.6rem;
  }
}

.chat_spec{
  @include flex(column, center, flex-start, 0);
  // margin-bottom: 4.5rem;
  height: 100%;

  @media (max-width:600px) {
    margin-bottom: 0;
    height: 100vh;
  }
}
.header{
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 0;
    margin-top: 1rem;
  }
}
.titleBox{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
} 
.title {
  @include title_h2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 600px) {
    margin-bottom: 0;
    margin-top: 0;
  }
}
.text {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 16px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
}

</style>