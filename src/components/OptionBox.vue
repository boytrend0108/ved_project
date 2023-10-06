<template>
  <article class="option-box">
    <div class="title-box">
      <img :src="require(`@/assets/images/icons/${img}`)" alt="icon" class="icon">
      <h3 class="option__title">{{ title }}</h3>
    </div>
    <p class="option__text"> {{ text }} </p>
    <button class="option_btn">Заказать
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </button>
  </article>
</template>

<script>
export default {
  name: 'option-box',
  data(){
    return{
      // img: 'user.svg',
    }
  },
  props: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    img: {
      type: String
    }
  }

}
</script>

<style lang="scss" scoped>
.option-box{
  max-width: 60rem;
  height: 30.6rem;
  border: 2px solid #D9E1E7;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5rem 6rem  4.5rem 6rem;
  background-color: white;
  
 }

 .title-box{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.7rem;
  margin: 0 0 2rem 0;
 }
.option__title {
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #244156;
  
}

.option__text {
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
  text-align: left;
}

.option_btn {
 @include btn-no-border;
 margin-top: 3rem;
}

.icon{
  width: 3.6rem;
}

.fa-chevron-right{
  font-size: 1.4rem;
}
</style>