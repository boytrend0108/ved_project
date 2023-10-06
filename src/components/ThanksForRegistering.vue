<template>
  <div class="thanksForRegisteging">
      <img src="@/assets/images/smiley.png" alt="smile">
      <h1 class="title">Благодарим за регистрацию!</h1>
      <p class="text">Пожалуйста, подождите. Ваш аккаунт находится на модерации, обычно это занимает не более 12 часов.
        После этого вы сможете зайти в систему</p>
      <my-blue-btn @click="this.$router.push('/')">Я подожду</my-blue-btn>
  </div>
</template>

<script>
  export default {
    name:'thanks-for-registering',

  }
</script>

<style lang="scss" scoped>
.wrapper{
   max-width: 495px;
   @include flex(column, center, center, 0);
}

.text{
  @include font(17xp, 500, $font-color2);
  line-height: 2.6rem;
  margin-bottom:3rem ;
  padding: 0 24px;
}

.title{
  @include title_h2;
  margin-bottom: 2rem;
  margin-top: 35px;
}

.thanksForRegisteging{
  @include flex(column, center, center, 0);
  position: relative;
  top: 100px;
  max-width: 495px;
  margin: 0 auto;
}

</style>