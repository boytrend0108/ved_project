<template>
  <div class="chatItem"> 
    <div class="avatar">
      <img v-if="showAvatar" :src="`https://static.delegat.online/${msg.avatar}`" alt="avatar" class="avatar">
      <font-awesome-icon v-else icon="fa-regular fa-user" />
    </div>
    <div class="chatInfo">
       <p class="chatInfo__user"> {{ fullname  }}  </p>
    <div class="chatInfo__msg"> {{ message }} </div>
    </div>
    <div class="chatItem__time">
      <p class="chatInfo__time"> {{ time }} </p>
      <img v-if="isUnreaded" src="@/assets/images/icons/red_dot.svg" alt="icon" class="dot-red">
    </div>
  </div>
</template>  

<script>
import { mapGetters } from 'vuex'

  export default {
    name:'my-chat-item',
    props:{ msg: Object },

    data(){
      return{
        cuttedMsg:''
      }
    },

    computed:{
      ...mapGetters(["UNREADED_MESSAGES", "CHAT_ID"]),

      time() { 
        if (!this.msg) return "null"
        return this.msg.date.split("T")[1].slice(0,5)
      },

      showAvatar() {
       if (!this.msg) return false
       return  this.msg.avatar === null ? false : true
      },

      fullname() {
        if (!this.msg) return "null"
        return this.msg.fullname
      },

      message() {
        if (!this.msg) return "null"
        return this.msg.message
      },

      isUnreaded() {

        if (this.msg)  {
          const index = this.UNREADED_MESSAGES.findIndex(el => el.chat_id == this.msg.chat_id)
          if(index < 0 ) return false
          return true
        }
        
         return false

      }
    },
     
    
  }
</script>

<style lang="scss" scoped>

.avatar{
  border-radius: 50%;
  width: 50px;
}

.chatItem__time{
  @include flex(column, center, flex-end, 4px);
  margin-bottom: 15px;
}

.fa-user{
  font-size: 25px;
}

.chatInfo__time{
  @include font(12px, 500, #809FB8); 
  line-height:14px;
}

.chatInfo__msg{
  @include font(14px, 500, #416782 );
  line-height: 16px;
  text-align: left;
  display: block;
  max-width: 280px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chatInfo__user{
  @include font(14px, 600, #244156 );
  line-height: 16px;
}

.chatItem{
  @include flex(row, flex-start, center, 10px);
  width: 100%;
  cursor: pointer;
}

.chatInfo{
  @include flex(column, center, flex-start, 3px);
  flex-grow: 1;
}

.chatInfo__title{
  @include flex(row, space-between, center, 0px);
  width: 100%;
}

</style>