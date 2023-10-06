<template>
 
  <button class="btn">
    <slot></slot>
  </button>
 
</template>

<script>
  export default {
    name:'my-white-btn'
  }
</script>

<style lang="scss" scoped>

.btn{
  color:$main-color ;
  background-color: $bg-color;
  border-radius: 1rem;
  border: 2px solid $main-color;
  width: fit-content;
  height: 5rem;
  cursor: pointer;
  padding: 1.2rem;
  font-size: 2rem;
  transition: 0.6s;
  @include flex (row,center, center, 1rem);
  
  @media (max-width: 600px) {
    @include font(1.4rem, 600, $main-color);
    line-height: 1.9rem;
  }
}

.btn:hover{
    background-color: $main-color;
    color: $bg-color;
  }

</style>