<template>
  <div class="chatBox" :style="{'top': positionTop + 'px'}">

    <!-- #region messaggesBox-->
      <div 
        class="messages" 
        :style="{position: showContextMenu ? 'static' : 'relative'}"
        ref="wrapper"
      >

      <button 
        class="reqisites" 
        @click.self="getRequisites"
        v-if="showGetRequisitesBtn"
      >Получить реквизиты
      </button>


        <div class="massages__box" 
          ref="messages" 
          id="scrollArea" 
        >
          
          <my-chat-msg   
            v-for="(msg, i) in filteredMesages" 
            :key="i" 
            :msg="msg"
            :time="setTime(msg.created_at)" 
            @showContext="showContext"
            @scrollDown="scrollChatDown"
            @showSelectedMsg="setSelectedMessage"
            @dowloadHistory="dowloadHistory"
            @show-dialog="showDialogFn"
          /> 
        </div> 

        <Transition name="down">
          <button 
            class="downBtn" 
            @click="scrollChatDown"
            v-if="showDownBtn"
          >
            <font-awesome-icon :icon="['fas', 'angles-down']" style="color: #f5f5f5;" />
          </button>  
        </Transition>
      
      </div>
    <!-- #endregion messaggesBox-->

    <!-- #region sendMessage-->
      <p v-if="error" class="error"> {{ error }} </p>
      
      <div class="messageReply" v-if="showSelectedMsg">
        <div class="messageReply__wr">
          <font-awesome-icon :icon="['fas', 'reply']" style="color: #ebeff4;" data-action="reply" />
            <div class="messageReply__data">
              <div class="author"> {{ messageAuthorName }}</div>
              <div class="context__item">{{ `${selectedMsg.body.substring(0, 40)}...` }}</div>
            </div>
          <font-awesome-icon icon="fa-solid fa-xmark " id="xmark" @click="hideMessageReplyBox"/>
        </div>
      </div>

      <div class="newMsgBox" v-if="showTextArea" >
        <label for="chat_file" class="download-box" >
          <img src="@/assets/images/icons/clip.svg" alt="Загрузить" class="clip" >
        </label>
        <input  
          type="file"
          id="chat_file"  
          class="input" 
          multiple="true"
          @change="uploadDocs"
        >
        
        <textarea 
          id="chat_file"
          name="new-message" 
          class="new-message" 
          v-model.trim="newMessage" 
          ref="textarea"
          @keydown="handlerKeypress"
          @drop.prevent="drop"
          @dragover="allowDrop"
          @blur="hideKeyboard"
          @paste="paste"
        />

        <div class="sendMsgBtn" >
          <img 
          :src="require('@/assets/images/icons/sendMsg.svg')" 
          alt="send message" 
          class="arrow" 
          @click="checkDate">
        </div>
      
      </div>

      <my-uploaded-foto />
    <!-- #endregion sendMessage-->
    
    <!-- #region warningMessage-->
    <p class="warningMsg" v-if="showWarningMsg">
        Заказчик уже выбрал Исполнителя. В случае отказа от Исполнителя у Вас вновь появится возможность общаться в этом чате
    </p>

    <p v-if="$route.query.status === 'COMPLETED'"  class="orderClosed">Заявка закрыта</p>
  <!-- #endregion -->
   
    <my-dialog 
      v-if="showDialog" 
      @close_dialog="closeDialog"
    >
      <img :src="BIG_IMG_CHAT" v-if="BIG_IMG_CHAT" class="big-image" >
      <RequisitesForm 
        v-if="showRequisitesForm" 
        :requisites="requisites"
      />
      <div class="error-msg" v-if = "error"> {{ error }}</div>
    </my-dialog>

    <my-big-spinner v-if="showPreloader"/>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { pastImage } from "@/helpers/keyControl"
import MyChatMsg from "../../components/UI/Chat/MyChatMsg.vue";
import RequisitesForm from "@/components/Form/RequisitesForm.vue"

export default {
  name: "chat-box2",
  emits:["close_dialog"],
  components: {
    MyChatMsg, RequisitesForm,
  },

  data() {
    return {
      innerWidth: window.innerWidth,
      messages: [],
      files: [],
      newMessage: ``,
      chat_id: "",
      boxHeight: "",
      error: "",
      page: 1,
      page_size: 300,
      allow: true,
      lastDate: '',
      dateNow: '',
      clipboard: '',
      offer_id: this.$route.query.offer_id,
      msgClientY: 0,
      messageHeight: null,
      isGuest: null,
      selectedMsg: null,
      showSelectedMsg: false,
      showDownBtn: false,
      replyTo: 0,
      messageAuthorName: '',
      requisites: null,
      showDialog: false,
      showPreloader: false,
      showContextMenu: false,
      showRequisitesForm: false, 
    }
  },

  computed: {
    ...mapGetters([
      "SPECIFIC_OFFER", "CURRENT_USER", "CHAT_HISTORY", "SELECTED_ORDER", "DOCS", "CHAT_ID", "INNER_WIDTH",
      "SITE_ROLE", "DIALOG", "BIG_IMG_CHAT", "CHAT_PAGE", "NEW_MSG", "TECH_MSG", "IS_CHAT_CLOSED", "IS_MSG_READ", "USER_BY_ID",
      "USER_NAME"
    ]),

    showGetRequisitesBtn() {
      if (this.showWarningMsg) return false;
      
      if (this.SITE_ROLE === "provider" && this.$route.query.status === "IN_PROGRESS") return true
      return false
    },
 
    top() {
      return this.msgClientY + this.messageHeight;
    },

    positionTop() {
      if (window.innerWidth > 600) return
      if (this.$route.name === "customer-chat" && this.$route.query.status === "PUBLISHED") return 194
      else return 100
    },

    showTextArea() {
      if (this.$route.query.status === "COMPLETED") return false
      if (this.SITE_ROLE === 'customer') return true
      else {
        if (this.$route.query.status === "IN_PROGRESS" && this.CURRENT_USER?.uid !== this.SELECTED_ORDER.provider_id) return false
        else return true
      }
    },

    showWarningMsg() {
      if (this.$route.query.status === "COMPLETED") return false
      if (this.SITE_ROLE === 'customer') return false
      else {
        if (this.$route.query.status === "IN_PROGRESS" && this.CURRENT_USER?.uid !== this.SELECTED_ORDER.provider_id) return true
        else return false
      }
    },

    filteredMesages() {
      let messages;
      switch (this.SITE_ROLE) {
        case "customer":
          messages = this.messages.filter(msg => !msg.body?.includes('Вас выбрали исполнителем'));
          this.SET_FILTERED_MESSAGES(messages);
          return messages;
        case "provider":
          messages = this.messages.filter(msg => !msg.body?.includes('Вы выбрали исполнителя'));
          this.SET_FILTERED_MESSAGES(messages);
          return messages;
        default: return this.messages;
      }
    },
  },

  methods: {
    ...mapActions([
      "SELECT_PROVIDER", "CREATE_SOCKET", "GET_CHAT_HISTORY", "UPLOAD_DOCS", "GET_CHAT_ID", "SEND_MSG",
      "UPLOAD_DOCS_DRAG", "READ_MSG", "GET_REQUISITES"
    ]),
    ...mapMutations(["SET_CHAT_PAGE", "SET_CHAT_ID", 'SET_FILTERED_MESSAGES', ]),

    // #region chatHistory

    async dowloadHistory(data) {
      this.SET_CHAT_PAGE(0);
      this.messages = [];
      this.page_size = data.id + 30;
      await this.getChatHistory();
      this.page_size = 300;
      setTimeout(() => data.currentElem.click(), 1000);

    },

    async getChatHistory() {
      this.showPreloader = true
      await this.GET_CHAT_HISTORY({
        order_id: this.$route.params.id,
        offer_id: this.$route.query.offer_id,
        page_size: this.page_size,
      })
        .then(() => {
          this.$refs.messages.style.overflowY = "hidden";
          this.showPreloader = false;
          this.messages = this.CHAT_HISTORY.reverse();
          this.chat_id = this.messages[0].chat_id
        })
        .then(() => {
          this.setLastDate();
          this.$refs.messages.scrollTop = this.$refs.messages?.scrollHeight;
          this.SET_CHAT_PAGE(this.CHAT_PAGE + 1);
          this.$refs.messages.style.overflowY = "scroll";
        })

    },

    changeChat() {
      this.watcher = false
      this.SET_CHAT_PAGE(0)
      this.page = 1
      this.messages = []
      this.getChatHistory()
    },

    intersection() {

      // показываем кнопку прокрутки чата вниз
      if (this.$refs.messages?.scrollTop < this.$refs.messages?.scrollHeight / 1.3) {
        this.showDownBtn = true;
      } else this.showDownBtn = false;

      const options = {
        order_id: this.$route.params.id,
        offer_id: this.$route.query.offer_id,
        page: this.CHAT_PAGE,
        page_size: this.page_size
      }

      if (!this.$refs.messages?.scrollTop) return

      if (this.$refs.messages.scrollTop > 700 && this.$refs.messages.scrollTop < 1200) {
        if (this.CHAT_PAGE !== this.page) return
        this.page++
        this.$refs.messages.removeEventListener("scroll", this.intersection);
        this.GET_CHAT_HISTORY(options)
          .then(() => {
            if (!this.CHAT_HISTORY.length) return
            this.messages = [...this.CHAT_HISTORY.reverse(), ...this.messages]
            this.$refs.messages.scrollTop = 1600;
            setTimeout(() => {
              this.$refs.messages.addEventListener("scroll", this.intersection);
            }, 600);
          })
      }

    },

    // #endregion

    // #region sendMessage
    checkDate() {
      if (!this.newMessage.length && !this.DOCS.images.binaryFile.length) return;

      const newMsg = {
        "chat_id": this.CHAT_ID,
        "body": this.newMessage,
        "reply_to": Number(this.replyTo) || 0,
      }

      const newDateMsg = {
        "chat_id": this.CHAT_ID,
        "body": this.dateNow,
        "id_date": true
      }

      const sendSpecificMsg = () => {
        if (this.dateNow === this.lastDate) {
          this.sendMsg(newMsg)
        } else {
          this.sendMsg(newDateMsg)
            .then(() => this.sendMsg(newMsg))
        }
      }

      sendSpecificMsg()
      this.showSelectedMsg = false;
      this.selectedMsg = null;
    },

    async sendMsg(newMsg) {
      this.showPreloader = true
      return this.SEND_MSG(newMsg)
        .then(() => {
          this.newMessage = ""
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
          this.$refs.textarea.style.height = "5rem"
          this.showPreloader = false
          this.setLastDate()
          this.replyTo = 0;
        }).catch(err => {
          this.error = err
          this.showPreloader = false
        })
    },

    setLastDate() {
      const lastMsg = this.messages[this.messages.length - 1].created_at;
      this.lastDate = lastMsg.split("T")[0].slice(5, 10);
    },

    setTime(date) {
      const newDate = new Date(date)
      let minutes = newDate.getMinutes()
      if (minutes.toString().length === 1) { minutes = "0" + minutes }
      return `${newDate.getHours()}:${minutes}`
    },

    playSound(msg) {
      const msg_owner = msg.split("-")[0] === "c" ? "customer" : "provider"
      if (localStorage.getItem("site_role") === msg_owner) return
      const sound = new Audio()
      sound.src = require("@/assets/sound/iphone.wav")
      sound.play()
    },

    // #endregion

    closeDialog() {
      setTimeout(() => {
        this.showRequisitesForm = false
        this.showDialog = false
        this.error = ''
      }, 500);
    },

   showDialogFn() {
      this.showDialog = true;
    },

    setSelectedMessage(msg) {
      this.showSelectedMsg = true;
      this.selectedMsg = msg;
      this.replyTo = msg.id;

      if (this.CURRENT_USER.uid === this.selectedMsg.user_id) {
        this.messageAuthorName = this.CURRENT_USER.full_name;
      } else {
        switch (this.SITE_ROLE) {
          case "provider": this.messageAuthorName = this.USER_BY_ID.full_name;
            break;
          case "customer": this.messageAuthorName = this.SPECIFIC_OFFER.owner_name;
        }
      }
    },

    scrollChatDown() {
      const el = this.$refs.messages;
      setTimeout(() => {
        el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        this.showDownBtn = false;
      })
    },

    showContext(data) {
      this.showDownBtn = false;
      this.msgClientY = data.clientY;
      this.messageHeight = data.height;
      this.isGuest = data.isGuest
      this.showContextMenu = !this.showContextMenu;
      this.selectedMsg = data.msg;
    },

    hideMessageReplyBox() {
      this.selectedMsg = null;
      this.showSelectedMsg = false;
    },

    paste(event) {
      this.clipboard = pastImage(event)
    },

    async uploadDocs(event) {
      this.UPLOAD_DOCS(event).then(() => {
        window.scrollTo(0, window.innerHeight)
      })
    },

    handlerKeypress(event) {

      if (!event.shiftKey && event.code === "Enter") {
        this.checkDate()
      }
      if (event.key === "Backspace") {
        window.scrollTo(0, document.body.scrollHeight + 100)
        this.$refs.textarea.style.height = "auto";
      }
      if (event.shiftKey && event.code === "Enter") {
        this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight}px`;
        window.scrollTo(0, document.body.scrollHeight + 100)
      }

    },

    adjustHeight2() {
      const chatBox_height = document.querySelector(".chatBox").clientHeight
      if (window.innerWidth > 600) {
        this.boxHeight = chatBox_height * 0.8
      } else this.boxHeight = chatBox_height * 0.9

    },

    allowDrop(event) {
      event.preventDefault();
    },

    drop(event) {
      event.preventDefault();
      this.UPLOAD_DOCS_DRAG(event)
    },

    hideKeyboard() {
      if (window.innerWidth < 600) window.scrollTo(0, 0)
    },

    async getRequisites() {
      try {
        this.requisites = await this.GET_REQUISITES(this.$route.params.id)
        this.showRequisitesForm = true
        this.showDialog = true
        console.log(this.requisites)
      } catch(e) {
        this.error = e
        this.showDialog = true
        console.log(this.requisites)
      }
     
    }
  },

  watch: {
    DOCS: {
      handler(newValue) {
        if (newValue.chat_file.name) {
          this.files.push(newValue.chat_file.name)
        }
      },
      deep: true
    },

    CHAT_ID() {
      if (this.CHAT_PAGE < 1) return;
      console.log("watcher")
      this.changeChat();
    },

    NEW_MSG() {
      this.messages.push(this.NEW_MSG)
      setTimeout(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
        this.playSound(this.NEW_MSG.user_id)
      }, 500);
    },

    IS_MSG_READ() {
      const i = this.messages.findIndex((el) => {
        return el.id == this.IS_MSG_READ
      })
      this.messages[i].is_view = true
    },
  },

  async mounted() {
    const routeParams = { order_id: this.$route.params.id, offer_id: this.$route.query.offer_id }
    this.SET_CHAT_PAGE(0);
    this.GET_CHAT_ID(routeParams);
    const dateNow = new Date();
    this.dateNow = dateNow.toISOString().split("T")[0].slice(5, 10)
    this.showPreloader = true;
    this.adjustHeight2();

    await this.GET_CHAT_HISTORY({ ...routeParams, page_size: this.page_size });
    this.messages = this.CHAT_HISTORY.reverse();
    this.setLastDate();
    setTimeout(() => {
      const messagesBox = this.$refs.messages;
      messagesBox?.addEventListener("scroll", this.intersection);
    }, 4000);

    this.showPreloader = false; 
    this.chatScrollTop = this.$refs.messages?.scrollTop - 1000;
    setTimeout(() => this.scrollChatDown(), 1000);
  },

  unmounted() {
    this.SET_CHAT_ID(null)
  }
} 
</script>

<style lang="scss" scoped>
.chatBox {
  @include flex(column, space-between, flex-start, 0);
  width: 100%;
  flex-grow: 1;
  margin-bottom: 2.6rem;

  @media (max-width: 600px) {
    gap: 1rem;
    justify-content: flex-start;
    margin-bottom: 0;
  }
}

// #region messaggesBox
.messages {
  @include flex(column, flex-start, flex-start, 3rem);
  width: 100%;
  background: white;
  padding-bottom: 1.4rem;
  flex-grow: 1;
  height: 50vh;
}

.reqisites {
  width: 100%;
  @include font (1.7rem, 600, #fff);
  line-height: 1.7rem;
  background-color: $main-color;
  border: none;
  padding: 1rem 0;
  cursor:pointer;
}

.massages__box {
  @include flex (column, flex-start, flex-start, 5px);
  width: 100%;
  overflow-y: scroll;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.preloader {
  position: absolute;
  top: 42%;
  left: 45%;
}

.downBtn {
  position: absolute;
  bottom: 3.5rem;
  right: 2rem;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: none;
  background-color: $main-color;
  color: white;
  cursor: pointer;
}

// #endregion ========

// #region sendMessage
.newMsgBox {
  width: 100%;
  background-color: #FFFF;
  height: 100%;
  max-height: 10rem;
  @include flex (row, center, center, 2rem);
  border-top: 4px solid #EEEEF0;

  @media (max-width: 600px) {
    gap: 0;
    max-height: 10rem;
  }
}

.new-message {
  @include text-area;
  height: 5rem;
  width: 80%;
  overflow-y: scroll;
  margin: 2rem 0;
  max-height: 25rem;

  @media (max-width:600px) {
    width: 86%;
    margin: 1rem 0 1rem;
  }
}

.input {
  @include download__input;
}

.download-box {
  margin-left: 1.5rem;
}

.sendMsgBtn {
  @include flex(row, center, flex-end, 0);
  padding: 1rem;
}

.clip {
  margin-bottom: 1.5rem;
  cursor: pointer;
  padding-top: 2rem;

  @media (max-width:600px) {
    margin-bottom: .9rem;
    padding-right: 1rem;
  }
}

.arrow {
  cursor: pointer;
}

.messageReply {
  min-height: 5rem;
  background-color: #809FB8;
  width: 100%;
  padding: 1rem;

  .messageReply__wr {
    @include flex(row, flex-start, center, 2rem);
  }

  .fa-xmark {
    height: 2rem;
    color: white;
    cursor: pointer;
  }

  .messageReply__data {
    @include flex (column, center, flex-start, .3rem);
    flex-grow: 1;
  }

  .context__item {
    @include font (1.4rem, 500, white);
    text-align: left;
  }

  .author {
    @include font (1.4rem, 600, white);
  }
}

.error {
  @include font (1.2rem, 500, red);
  line-height: 1.4rem;
}

// #endregion

// #region warningMessage
.warningMsg {
  @include warningMsg;
}

.orderClosed {
  @include warningMsg;
  width: 100%;
  text-align: center;
  padding: 2rem;
}

.error-msg {
  @include title_h3;
  color: red;
  height: 8rem;
  line-height: 8rem;
  margin: 0 auto;

  @media (max-width: 600px) {
    min-height: 100vh;
    @include flex (row, center, center, 0);
  }
}

// #endregion

.big-image {
  width: 100%
}
</style>

