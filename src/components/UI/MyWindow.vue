<!--Для форм confirm и ..-->
<template>
  <div class="my-window"> 
    <button 
      class="btn-back" 
      @click="clickHandler"
      v-if="showBackBtn"
    >
      <font-awesome-icon  icon="fa-solid fa-chevron-left" /> Назад
    </button>
    <h2 class="title">{{ title }}</h2>
    <slot></slot>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

  export default {
    name: 'my-window',
    props:{
      title:{
        type: String
      }
    },

    computed:{
      showBackBtn(){
        if(this.$route.path === '/customer/profile' || this.$route.path === '/provider/profile') return false
        return true
      }
    },

    methods:{
      ...mapMutations([
        'SET_SHOW_LOGIN_FORM', 
        'SET_SHOW_CONFIRM_EMAIL', 
        'SET_SHOW_CHANGE_PASSWORD',
        'SET_SHOW_CHECK_EMAIL',
        'SET_SEND_SECOND_EMAIL',
      ]),

      clickHandler(){
        this.$router.push('/')
        this.SET_SHOW_LOGIN_FORM(true)
        this.SET_SHOW_CONFIRM_EMAIL(false)
        this.SET_SHOW_CHANGE_PASSWORD(false) 
        this.SET_SHOW_CHECK_EMAIL(false)
        this.SET_SEND_SECOND_EMAIL(false)
    }
    },

   
    
   
  }
</script>

<style lang="scss" scoped>
.my-window{
  // max-width: 49.5rem;
  background: hsl(0, 0%, 100%);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 5rem 4.6rem 5rem;

  @media (max-width: 600px) {
    padding: 2rem 1rem 4.6rem 1rem;
    width: 100%;
  }
}

.btn-back{
  @include btn-no-border
}

.title{
  @include form-title;
  margin: 14px 0 1rem 0 ;

  @media (max-width: 600px) {
    @include font(2rem, 600, #244156);
    line-height:3rem;
  }
}


</style>