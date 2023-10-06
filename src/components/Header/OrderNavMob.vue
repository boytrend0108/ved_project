<template>
   <ul class="order-nav">
      <li class="order-nav__item" @click="$router.go(-1)">
        <img src="@/assets/images/icons/appl_mobile.png" alt="заявка">
        <p class="order-nav__page">Заявка</p>
      </li>
    </ul>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.order-nav {
  @include flex(row, flex-start, center, 15px);
  width: 100%;
  background-color: #FFFF;
  border-top:  1px solid #D9E1E7;

  &__item{
    @include flex(column, center, center, 5px);
    padding: 10px 15px;
  }

  &__page{
    @include font(13px, 500, $main-color);
    line-height: 18px;
  }
}

</style>