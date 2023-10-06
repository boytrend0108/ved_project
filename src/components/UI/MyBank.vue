<template>
  <div class="bank">
    <a :href="`${bankLink}`" target="_blank" class="bank">
      <img v-if="innerWidth > 600" class="bank__img" :src="require( `@/assets/images/banks/${bankLogo}`)" alt="bank">
      <p class="bank__link">{{ bankName }}</p>
    </a>
  </div>
</template>

<script>
  export default {
    name:'my-bank',
    props:{
      bankName:{
        type: String
      },
      bankLogo:{
        type: String
      },
      bankLink:{
        type: String
      }
    },
    data() {
      return {
        innerWidth: window.innerWidth
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.banks{
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}

.bank {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.bank__img{
  width: 34px;
  height: 3rem;
}
.bank__link {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #339DFF;
  cursor: pointer;
}

</style>