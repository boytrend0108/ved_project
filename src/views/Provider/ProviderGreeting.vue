<template>
  <div class="c-greetings" >
     <img src="@/assets/images/icons/grieeting.svg" alt="icon">
     <h1 class="title">Поздравляем, вы прошли модерацию!</h1>
     <p class="note">Теперь вам доступны все функции сервиса, желаем удачной работы</p>
     <my-blue-btn @click="this.$router.push('/search_spec')">Начать работу</my-blue-btn>
  </div>
</template>

<script>
  export default {
    name:'provider-greeting',    
  }
</script>

<style lang="scss" scoped>

.note{
  @include font(1.7rem, 500, #416782);
  line-height: 2.6rem;
  margin: 20px 0 3rem 0;
}
.c-greetings{
  @include flex(column, center, flex-start, 0)
}
.title{
  @include title_h3;
  text-align: left;
}

</style>