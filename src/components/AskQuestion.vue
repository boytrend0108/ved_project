<template>
  <div class="askQuestionComp">
    <label for="askQuestion">
       <!--если один tag- не видно картинки-->
      <!-- <img src="@/assets/images/clip.png" alt="icon" class="askQuestionComp__img"> -->
      <img src="@/assets/images/clip.png" alt="icon" class="askQuestionComp__img">
    </label>

    <input 
       type="file" 
       id="askQuestion" 
       class="download__input"
       @change="UPLOAD_DOCS"
    >

    <input 
      type="text" 
      class="askQuestionComp__input" 
      placeholder="Задать вопрос"
      v-model="askQuestionInput"
      @keyup.enter="sendInput"
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'ask-question',
    data(){
      return{
        askQuestionInput:''
      }
    },
    computed:{
      ...mapGetters([
      'ASK_QUESTION_INPUT'
      ])
      
    },

  methods: {
    ...mapActions([
      'SEND_QUESTION_TO_SUPPORT', 'UPLOAD_DOCS', "SET_USER_QUESTION",
    ]),

    sendInput() {
      const userQuestion = {
        text: this.askQuestionInput,
        file: this.ASK_QUESTION_INPUT.file
      }
      this.SEND_QUESTION_TO_SUPPORT(userQuestion) //customerPage.js
      this.askQuestionInput = ''
    }
  },
  }
</script>

<style lang="scss" scoped>

.download__input{
 @include download__input;
}

.askQuestionComp__img{
   cursor: pointer;
}
.askQuestionComp {
  height: 91px;
  background: #F8F8F9;
  border-top: 2px solid #ECF0F3;
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
}

.askQuestionComp__input{
 @include input-login;
 background-color: #EEEEF0;
}

::placeholder{
  @include placeholder;
}
</style>