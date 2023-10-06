<template>
  <div>
    <h1 class="visually-hidden">Смена пароля</h1>
   <create-password-form class="createPassword" /> 
  </div> 
</template>
 
<script>

import CreatePasswordForm from '@/components/Form/CreatePasswordForm.vue';
  export default {
    name: 'reset-password',
    components:{
      CreatePasswordForm 
    }
  }
</script>

<style lang="scss" scoped>

.visually-hidden {
  @include visually-hidden;
}

.createPassword{
  margin: 6rem auto;

  @media (max-width: 600px) {
    margin: 2rem auto;
  }

}

</style>