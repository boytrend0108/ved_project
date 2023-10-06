<template>
  <div class="startChat">
    <p class="note">У вас ещё нет заказов</p>
    <my-blue-btn @click="this.$router.push('/provider/search')">Найти заказ</my-blue-btn>
  </div>
</template>

<script>
  export default {
    name: 'start-chat'
    
  }
</script>

<style lang="scss" scoped>

.note{
  @include font(1.7rem, 500, note);
  line-height: 2.6rem;
  text-align: left;
  margin: 2rem 0 3rem 0;
}

</style>