<template>
  <div class="chatBox">
    <div class="chatBox__bnt" @click="clickHandler($event)">
      <my-white-btn class="btn active">Отклики
        <img src="@/assets/images/icons/red_dot.svg" alt="icon" class="dot-red">
      </my-white-btn>
      <my-white-btn class="btn">В работе
        <img src="@/assets/images/icons/red_dot.svg" alt="icon" class="dot-red">
      </my-white-btn>
      <my-white-btn class="btn">Завершенные
        <img src="@/assets/images/icons/red_dot.svg" alt="icon" class="dot-red">
      </my-white-btn>
    </div>
    <div class="messages">
      <my-chat-item /> 
      <my-chat-item />
      <my-chat-item />
      <my-chat-item />
    </div>
  </div>
</template> 

<script>
 import {setActive} from '@/helpers/setActiveClass'
  export default {
    name:'chats-box-provider',

    data(){
      return{
        isActive: true
      }
    },
    methods:{
      clickHandler(event){
         setActive(event)
      }
    }
  }
</script>

<style lang="scss" scoped>

.messages{
  @include flex(column, center, flex-start, 3rem);
  max-width: 60rem;
}
.dot-red{
  margin-left: 2.6rem;
}
.chatBox{
  @include flex(column, center, flex-start, 0);
  
}

.btn{
  border: none;
  color:$font-color2;
  background: none ;
}

.chatBox__bnt{
  @include flex(row, flex-start, center, 2rem);
  margin-bottom: 6rem;
  flex-wrap: wrap;
}

.active{
  background: #EEEEF0;
}

</style>