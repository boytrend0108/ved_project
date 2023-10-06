<template>
  <div class="thanksForRegisteging">
      <img src="@/assets/images/sorry_smile.png" alt="sorry">
      <h1 class="title">К сожалению, <br> вам отказано в доступе</h1>
      <p class="text">Причину отказа вы можете узнать, написав на почту  <br>
        <a 
         href="mailto:support@delegat.com"
         class="link"
        >support@delegat.com</a> 
      </p>
  </div>
</template>

<script>
  export default {
    name:'sorry-comp',

  }
</script>

<style lang="scss" scoped>

.link{
  color:$main-color;
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
  text-align: center;
}

.thanksForRegisteging{
  @include flex(column, center, center, 0);
  position: relative;
  top: 100px;
}

</style>