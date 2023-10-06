<template>
  <div class="customerSupportComp">
    <div class="header">
      <img src="@/assets/images/icons/question.svg" alt="icon">
      <div class="titleBox">
        <h1 class="title">Поддержка</h1>
        <p class="text">Отвечаем в течение 15 минут</p>
      </div>
    </div>
    <!-- <chat-box /> -->
    <faq-comp />
    <ask-question />
  </div>
</template>

<script>
import FaqComp from '@/components/FaqComp.vue';
// import ChatBox from '@/components/Chat/ChatBox.vue'
import AskQuestion from '@/components/AskQuestion.vue'
  export default {
    name:'customer-support',
    components:{
      FaqComp,
      // ChatBox, 
      AskQuestion
    },
  }
</script>

<style lang="scss" scoped>

.customerSupportComp{
  display: flex;
  flex-direction: column;
}

.header{
  display: flex;
  align-items: center;
  gap: 20px;
}
.titleBox{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title {
  @include title_h2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.text {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
}
</style>