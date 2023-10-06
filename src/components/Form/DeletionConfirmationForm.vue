<template>
  <div class="deletionConfirmationForm">
    <h2 class="title">
      Вы точно хотите {{buttonAction === "delete" ?  "удалить" : "завершить"}} заявку!
    </h2>
    <br>
    <p class="title" >
      {{buttonAction === "delete" ? "Придется долго создавать заново!": "У вас не будет возможности общаться с исполнителем в чате!"}}
    </p>
    <my-blue-btn 
      class="btn" 
      @click="handler" 
      > {{buttonAction === 'delete' ? "Удалить заявку" : "Закрыть заявку"}}
    </my-blue-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: 'deletion-confirmation-form',
    props:{
      buttonAction: {
        type: String,
        requared: true,
      }
    },
    computed: {
      ...mapGetters(["DIALOG"])
    },
    
    methods:{
      ...mapMutations([
        "SHOW_DIALOG", 'SET_SHOW_SUCCESS_FORM', "SET_DELETE_ORDER_STATUS"
      ]),

      handler() {
        this.$emit(this.buttonAction === "delete" ? "delete_order" : "confirm_order")
        this.SET_DELETE_ORDER_STATUS(true)
        if (this.DIALOG) this.SHOW_DIALOG() 
      }
    } 
  }

</script>
 
<style lang="scss" scoped>
.title {
  @include title_h3;
  text-align: center;
}

img{
  @media (max-width: 600px) {
    width: 45px;
  }
}
.fa-xmark{
  width: 20px;
  height: 20px;
}
.deletionConfirmationForm {
  @include flex(column, center, flex-start, 0);
  background: #FFFFFF;
  box-shadow: 0px 5px 20px rgba(6, 21, 43, 0.15);
  border-radius: 10px;
  padding: 45px;

  @media (max-width: 600px) {
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding: 15px;
  }
}

.msg{
  @include font(17px, 500, $font-color2);
  line-height: 26px;
  margin: 45px auto;
  text-align: left;
  position: relative;

  @media (max-width: 600px) {
    @include font(20px, 600, $font-color2);
    line-height: 27px;
    margin: 30px 0 20px 30px;
  }
}

.submsg {
  @include font(14px, 500, $font-color3);
  margin-left: 50px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
}

.btn{
  margin-top: 45px;
  min-width: 150px;
  
  @media (max-width: 600px) {
    width: 100%;
  }
  
}
</style>