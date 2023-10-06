<template>
  <section class="addition-info">
    <div class="description__notebox">
      <img src="@/assets/images/icons/info.svg" alt="info" class="info">
      <p class="description__note">Эти данные будут видны только тому специалисту, которого вы выберите</p>
    </div>
    
    <form class="form">
      <h3 class="form__title">Точный адрес забора груза</h3> 
      <my-info-input :name="'from_city'"/>
      <my-info-input :name="'from_address'"/> 
    
      <div v-if="this.$route.name !== 'cost-calculation'">
        <h3 class="form__title">Контакты представителя фабрики</h3>
        <my-info-input :name="'agent_fullname'"/>
        <my-info-input :name="'agent_phone_number'"/> 
        <my-info-input :name="'agent_email'"/>
      </div>
    </form>
  </section >  
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    data(){
      return{
        name:'application-addition-info'
      }
    },
    computed:{
      ...mapGetters([
        'INPUT_NAME'
      ])
    }
    
  }
</script>

<style lang="scss" scoped>
.form__inputbox {
  margin-top: 2rem;
  position: relative;
}

.form {
  max-width: 49.5rem;
}

.label {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #416782;
  text-align: left;
}

.description__notebox {
  @include description__notebox;
  margin-top: 2rem;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.description__note {
  @include note;
  margin-top: 0;
  // font-weight: 500;
  // font-size: 17px;
  // line-height: 26px;
  // font-feature-settings: 'pnum' on, 'lnum' on;
  // color: #416782;
}
.info {
  @include info
}

.form__input {
  height: 5rem;
 
}

.placeholder {
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #809FB8;
  position: absolute;
  top: 32px;
  left: 2rem;
}

.form__title {
  font-weight: 600;
  font-size: 2rem;
  line-height: 30px;
  color: #244156;
  margin-bottom: 2rem;
  margin-top: 4.5rem;
  text-align: left;

  @media (max-width: 600px) {
    @include font(17px, 600, #244156);
    line-height: 23px;
    margin-top: 2rem;
  }
}
</style>