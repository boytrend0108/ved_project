<template>
  <div>
     <h1 class="title">Чаты</h1>
     <start-chat />
     <chats-box-provider class="chatBox" />
  </div>
</template>

<script>
import StartChat from '@/components/Chat/StartChat.vue';
import ChatsBoxProvider from '@/components/Chat/ChatsBoxProvider.vue';
  export default {
    components:{
      StartChat,
      ChatsBoxProvider,
    }
  }
</script> 
 
<style lang="scss" scoped>
.title{
  @include title_h2;
}

.chatBox{
  margin-top: 2rem;
}

</style>