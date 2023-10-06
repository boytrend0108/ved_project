<template>
 
  <button class="btn">
    <slot></slot>
  </button>
 
</template>

<script>
  export default {
    name:'my-btn'
  }
</script>

<style lang="scss" scoped>

.btn{
  background-color: $btn-color;
  color: #fff;
  border-radius: 1rem;
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 1.2rem;
  font-size: 2rem;
  transition: 0.6s;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, #FFFFFF);
    line-height: 1.9rem;
    height: 4rem;
  }
}

.btn:hover{
    background-color: blue;
  }

</style>