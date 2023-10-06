<template>
 
  <button class="btn-blue" :id="id">
    <slot></slot>
  </button>
 
</template>

<script>


  export default {
    name:'my-blue-btn',
    props: {
      id: String
    }
  }
</script>

<style lang="scss" scoped>

.btn-blue{
  color:#FFFF ;
  background-color: $main-color;
  border-radius: 1rem;
  border: 2px solid $main-color;
  width: fit-content;
  height: 5rem;
  cursor: pointer;
  padding: 1.2rem;
  font-size: 2rem;
  transition: 0.6s;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    @include font (14px, 600, #FFFF );
    height: 40px;
    width: 100%;
  }
}

.btn:hover{
    background-color: $bg-color;
    color: $main-color ;
    border: none;
  }

</style>