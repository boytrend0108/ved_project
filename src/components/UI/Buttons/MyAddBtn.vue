<template>
  <button class="addBtn">
    <img class="addBtnIcon" src="@/assets/images/icons/plus.svg" alt="plus">
    <div class="addBtn__title" > {{ title }}</div>
  </button>
</template>

<script>
  export default {
    name: 'my-add-btn',
    props:{
      title:{
        type: String
      }
    } 
  }
</script>

<style lang="scss" scoped>
.addBtn {
  width: 230px;
  height: 42px;
  border: 2px solid #D9E1E7;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    height: 40px;
    @include font(14px, 600, $main-color);
    line-height: 19px;
  }
}
.addBtn__title{
  font-weight: 600;
  font-size: 17px;
  line-height: 26px;
  color: #339DFF;

  @media (max-width: 600px) {
    @include font(14px, 600, #339DFF );
    line-height: 21;
    // max-height: 40px;
   }
  }

.addBtnIcon{
   height: 30px;
}
</style>