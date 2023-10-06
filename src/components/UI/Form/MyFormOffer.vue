<template>
  <div class="form-offer">
    <img src="@/assets/images/icons/handshake.svg" alt="handshake">
    <div class="offer">
      <p class="form__question grey"> Хотите сотрудничать с нами ?</p>
      <div @click="toToRegisterPageProvider" class="form__question"> Зарегистрироваться как партнёр</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
  export default { 
    name:'my-form-offer',
    methods:{
      ...mapMutations([
        'SET_VALIDATION_ERR'
      ]),

      toToRegisterPageProvider(){
        this.SET_VALIDATION_ERR('clear')
        this.$router.push('/provider/signup')
      }
    }
  }

</script>

<style lang="scss" scoped>
.form-offer{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  @media (max-width: 600px) {
    background-color: #F5F5FC;
  }
}

.offer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.form__question{
 @include form__question;
 cursor: pointer;
}

.grey{
  color:grey;
}
</style>