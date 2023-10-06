<template>
 <div class="chats">
  <p class="warningMsg" v-if="!PROVIDER_OFFERS.length">Откликов пока нет</p>     
      <my-side-user-msg 
        class="msg"  
        v-for="(msg,i) in PROVIDER_OFFERS" 
        :key="i"
        :msg="msg" 
      />
    </div> 
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'customer-chats',
    computed:{
      ...mapGetters([
         'PROVIDER_OFFERS'
      ])
    },

    methods:{
      ...mapActions([
       'GET_PROVIDER_OFFERS'
      ])
    },

    mounted() {
      this.GET_PROVIDER_OFFERS(this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>

.warningMsg {
  @include errorMsg;
}

.chats{
  height: 100%;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 600px) {
    margin-top: 0;
    
  }
}

</style>