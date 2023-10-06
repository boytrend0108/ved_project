<!--текс сообщения в рамке-->
<template>
  <div class="wrapper"  :id="msg.id"  :class="{ guest, techMsg }" >
    <div 
      ref="msg"
      class="msg-box" 
      v-if="!isDate"
      @contextmenu.prevent="showContext2" 
    >
        <a :href="`#${msg.reply_to}`" v-if="showReply" @click="showMessage">
          <div class="repliedMsg"  @click="scrollToMessage">
            <p class="repliedMsg__author"> {{ setName }}</p>
            <p class="repliedMsg__text">
               {{ repliedMsgContent?.body.substring(0, 30) + "..."}}
            </p>
          </div>
        </a>
    
      <div class="answeredMsg" :id="msg.id">
        <div>
        <img 
          v-if="showLeftAvatar" 
          :src="GUEST_AVATAR" 
          alt="aватар"  
          class="avatar"
        > 
        </div> 

        <div class="chat-msg" >
          <p class="msg" :style="{textAlign: techMsg ? 'center' : 'left' }"> {{ msg.body }} </p>
          
            <div class="file-box">
              <div class="files"  v-for="(el,i) in msg.contents" :key="i" >
                <img 
                  class="chat-img"
                  @click="showBigImg(msg.contents[i].path)" 
                  v-if="msg.contents[i].is_photo"
                  :src="`https://static.delegat.online/${msg.contents[i].path}`" 
                  >  
                <a v-else 
                  :href="`https://docs.google.com/viewer?url=https://static.delegat.online/${msg.contents[i].path}`" 
                  target="_blank"
                  class="file-wr" >
                  <img src="@/assets/images/icons/file.svg" alt="file">
                  <div class="title-wr">
                    <p class="item-title"> {{ msg.contents[i].file_name }} </p>
                    <p class="item-title"> 1.0 MБ </p>
                  </div>
                </a> 
              </div>
            </div>
          
            <div class="time-wr" v-if="!msg.is_service">
              <p class="msg__time"> {{ time }} </p>
              <div class="isMsgRead" v-if="showIsMsgRead">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" >
                <path 
                :style="{'fill': checkColor}"
                d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/></svg>
              </div>
            </div>

        </div>

        <div>
          <img 
            :src="DOCS.upload_user_pic.href ? DOCS.upload_user_pic.href : require('@/assets/images/icons/user.svg') " 
            alt="aватар" 
            class="avatar"
            v-if="guest & innerWidth > 600"
          >
        </div>
      </div>

    </div>

    <div class="context" v-if="showContextMenu"   @click="contextHanler">
      <div class="context__wr" data-action="reply">
        <font-awesome-icon :icon="['fas', 'reply']" style="color: #ebeff4;" data-action="reply" />
        <div class="context__item" data-action="reply">Ответить</div>
      </div>

      <div class="context__wr" data-action="copy">
        <font-awesome-icon :icon="['far', 'copy']" style="color: #f5f7f9;"  data-action="copy"/>
        <div class="context__item"  data-action="copy">Копировать</div>
      </div>

      <font-awesome-icon icon="fa-solid fa-xmark " id="xmark" @click="showContextMenu = false" />
    </div>

  </div>
  
  <div class="date" v-if="isDate">
    <p class="date-msg"> {{ msg.body }}</p>
  </div>

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import findMessageToReply from "@/helpers/findMessageToReply"
  export default {
    name: 'my-chat-msg',
    emits: [
      "showContext", 
      "findMessage", 
      "scrollDown", 
      "showSelectedMsg", 
      "dowloadHistory", 
      "show-dialog"
    ],

    data() {
      return{
       innerWidth: window.innerWidth,
       redexp: /^(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
       isDate: false,
       showContextMenu: false,
       repliedMsgContent: null, 
       repliedMsgText: 'empty', 
      }
    }, 

    props:{
      msg:{
        type: Object
      },
      time: String,
    },  

    computed: {
      ...mapGetters([
        'CURRENT_USER', 'DOCS', 'AVATAR', 'SITE_ROLE', 'AVATAR_BY_ID', "DIALOG", "GUEST_AVATAR",
        "SPECIFIC_OFFER", "FILTERED_MESSAGES", "USER_BY_ID", "SHOW_CONTEXT"
      ]),

      setName() {
        if (this.CURRENT_USER?.uid === this.repliedMsgContent?.user_id) return this.CURRENT_USER?.full_name;
        else {
          switch (this.SITE_ROLE) {
            case "customer": return this.SPECIFIC_OFFER.owner_name;
            case "provider": return this.USER_BY_ID.full_name;
            default: return '';
          }
        }
      },

      showReply() {
        return this.msg.reply_to > 0 ? true : false;
      },

      showIsMsgRead() {
        return this.msg.user_id === this.CURRENT_USER?.uid ? true : false
      },

      showLeftAvatar() {
        if (this.techMsg) return false
        if (!this.guest && innerWidth > 600) return true
        else return false
      },

      checkColor() {
        return this.msg.is_view ? "#339DFF" : "grey"
      },

      showCheck() {
        if (!this.CURRENT_USER) return
        return this.CURRENT_USER?.uid === this.msg.user_id ? true : false
      },

      guest() {
        if (this.msg.is_service) return false
        if (!this.msg.user_id) return
        const msg_owner = this.msg.user_id.split('-')[0]
        const site_role = msg_owner === "c" ? 'customer' : 'provider'
        return localStorage.getItem("site_role") === site_role ? true : false
      },

      techMsg() {
        if (this.msg.is_service) return true
        else return false
      }
    },

    methods: {
    ...mapMutations(["SHOW_DIALOG", "SET_BIG_IMG_CHAT", "SET_SHOW_CONTEXT"]),
    ...mapActions(["READ_MSG", "GET_MESSAGE_BY_ID"]),

    contextHanler(event) {
      if (!event.target.dataset.action && !event.target.parentNode.dataset.action) return;
      const action = event.target.dataset.action || event.target.parentNode.dataset.action;
      if (action === "copy") {
        this.showContextMenu = false;
        this.copyText();
        return;
      }
      if (action === "reply") {
        this.replyTo = this.msg.id;
        this.showContextMenu = false;
        this.$emit("showSelectedMsg", this.msg);
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 300);

      }
    },

    copyText() {
      navigator.clipboard.writeText(this.msg.body)
        .then(() => {
          // Получилось!
        })
        .catch(err => {
          console.log('Something went wrong', err);
        });
    },

    showMessage(event) {
      const currentElem = event.currentTarget;
      const el = document.getElementById(`${this.msg.reply_to}`);
      if (!el) {
        this.$emit("dowloadHistory", {id:this.msg.reply_to, currentElem} );
        return;
      }
      el.classList.add("showBorder");
      setTimeout(() => el.classList.remove("showBorder"), 5000);
    },

    showContext2() {
      this.SET_SHOW_CONTEXT("hide");
      setTimeout(() => {
        this.showContextMenu = !this.showContextMenu;
        const lastMsg = this.FILTERED_MESSAGES.slice(-1)
        if (lastMsg[0].id == this.msg.id) {
          this.$emit("scrollDown")
        }
        this.SET_SHOW_CONTEXT(null);
      }, 100);
     
    },
 
    showBigImg(url) {
      this.SET_BIG_IMG_CHAT(`https://static.delegat.online/${url}`)
      this.$emit('show-dialog')
    }
  },

  watch: {
    SHOW_CONTEXT() {
      if (this.SHOW_CONTEXT === "hide") this.showContextMenu = false;
    }
  },

   async mounted() {
      if (this.msg.reply_to > 0 ) {
       this.repliedMsgContent = findMessageToReply(this.msg.reply_to);
       if (!this.repliedMsgContent) {
         this.repliedMsgContent = await this.GET_MESSAGE_BY_ID(this.msg.reply_to) ;
       }
      }
      if (this.msg.body?.match(this.redexp)) this.isDate = true;
      if (this.CURRENT_USER?.uid !== this.msg.user_id) {
        if (this.msg.is_view) return 
        this.READ_MSG({ "chat_id": this.msg.chat_id, "message_id": this.msg.id})
      }
    }

  }
</script>

<style lang="scss" scoped>

.fa-xmark {
  height: 2.5rem;
  top: 1rem;
  color: white;
  position: absolute;
  right: 2rem;
  cursor: pointer;

  @media (max-width: 600px) {
    height: 2rem;
    right: 1rem;
  }
}

.context {
  position: absolute;
  right: 0px;
  padding: 1rem 2rem;
  width: 20rem;
  background-color: #809FB8;
  z-index: 1;
  border-radius: 1rem;
  @include flex(column, center, flex-start, 1rem);
  width: 100%;

  @media (max-width:600px) {
    width: fit-content;
  }

  .context__item {
  @include font (1.4rem, 500, white);
  text-align: left;
}

  .context__wr {
  @include flex(row, flex-start, center, 2rem);
  cursor: pointer;
}

.fa-reply,
.fa-copy {
  height: 2rem;
}
}

.wrapper {
  max-width: 60%;
  min-width: 44%; 
  margin: 0 1rem;
  border-radius: 1rem;
  position: relative;
  background-color: #EEEEF0;
}

.repliedMsg {
  width: 100%;
  padding: 0 1rem; 
  margin: 1rem;
  border-left: 0.4rem solid;
  cursor: pointer;

  .repliedMsg__text {
    @include font(1.4rem, 500, $font-color2);
    text-align: left;
  }

  .repliedMsg__author {
    @include font(1.4rem, 600, $font-color2);
    text-align: left;
  }
}

.answeredMsg {
  @include flex (row, flex-start, center, 1rem);
}

.msg-box {
  position: relative;
  padding: 1px 1rem;
  border-radius: 1rem;

  @media (max-width: 600px) {
    border-radius: .5rem;
    padding: 1rem 0;
    // max-width: 80%;
    min-width: 45%;
  }
}

.showBorder {
  background-color: rgba(238, 94, 231, 0.26);
  animation: glowing 1300ms infinite;
}

@keyframes glowing {
  0% { background-color: rgba(238, 94, 231, 0.26); box-shadow: 0 0 5px rgba(238, 94, 231, 0.26); }
  50% { background-color: #EEEEF0; box-shadow: 0 0 20px #EEEEF0; }
  100% { background-color: rgba(238, 94, 231, 0.26); box-shadow: 0 0 5px rgba(238, 94, 231, 0.26); }
}
.time-wr {
  @include flex(row, flex-end, center, .5rem);
}

.date {
    padding: 1rem;
    border-radius: 1rem;
    margin: 4px auto;
}

.date-msg {
  @include font(1.4rem, 600, $font-color3);
}

.file-wr {
  @include flex (row, center, center, 1rem);
}

.chat-img {
  width: 5rem;
  height: 5rem;
}

.file-box {
  margin-top: 1rem;
  @include flex (row, flex-start, center, .5rem);
  flex-wrap: wrap;

  @media (max-width:600px) {
    margin-top: 0;
  }
}

.files {
  @include flex (row, flex-start, center, .5rem);
  flex-wrap: wrap;
  border: 2px dashed $font-color3;
  border-radius: 1rem;
  padding: .5rem;
  cursor: pointer;

  @media (max-width: 600px) {
    border: none;
    padding: 0;
  }
}

.title-wr {
  @include flex (column, center, center, 0);
}

.item-title{
  font-size: 1.5rem;
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.guest{
  align-self: flex-end;
  background-color: #DBEBFA;
}

.techMsg {
  align-self: center;
  border: 2px solid #D9E1E7 !important;
  background: none !important;
  width: 100% !important;
  max-width: 90% !important;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}
.chat-msg{
  max-width: 50rem;
  width: 100%;
  min-height: 4.5rem;
  text-align: left;
  overflow: auto;
  
  @media (max-width: 600px) {
    min-height: 0;
  }
}


.msg{
  @include font(1.4rem, 500, $font-color2);
  line-height: 1.4rem;
  margin-top: 1.5rem;
  word-break: break-word;
  white-space: pre-line;

  @media (max-width: 600px) {
    margin-top: 0;
  }
}

.msg__time{
  @include font(1.2rem, 500, #809FB8);
  line-height: 1.4rem;
  text-align: right;
}

.avatar{
 
  height: 2.6rem;
  border-radius: 50%;
}

</style>