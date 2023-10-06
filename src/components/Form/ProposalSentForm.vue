<template>
  <div class="proposalSent">
    <h2 class="form__title">Предложение отправлено</h2>
    <div class="form__btnbox">
      <my-white-btn class="bnt-white" @click="goToSearch">
         Продолжить поиск заказов
      </my-white-btn >
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'proposal-sent-form',
  methods:{
    ...mapMutations([
      'SWITCH_SHOW_PROPOSAL_SENT_FORM',
      'SHOW_DIALOG'
    ]),

    goToChat(){
      this.SHOW_DIALOG()
      this.SWITCH_SHOW_PROPOSAL_SENT_FORM(false)
      this.$router.push('/provider/chats')
    },
    
    goToSearch(){
      this.SHOW_DIALOG()
      this.SWITCH_SHOW_PROPOSAL_SENT_FORM(false)
      this.$router.push('/provider/search/')
    },

    closeDialog(){
      this.SWITCH_SHOW_PROPOSAL_SENT_FORM(false)
      this.SHOW_DIALOG()
    }
  }
}
</script>

<style lang="scss" scoped>

.fa-xmark{
  @include fa-xmark;
}

.btn-blue{
  width: 177px;
}

.bnt-white{
  border: none;
  background-color: #EEEEF0;
  @include font(17px, 600, $font-color2);
  line-height: 26px;

  @media (max-width: 600px) {
    height: 40px;
    width: 100%;
  }
}

.btn-white{
  border: none;
  color:#244156;
  padding: 12px 18px;
  width: 288px;

}

.form__btnbox{
  @include flex(row, space-between, center, 0);
  width: 100%;
  margin-top: 45px;
}

.form__note{
  @include font(17px, 500,#416782);
  line-height: 26px;
  text-align: left;
}
.proposalSent{
  @include formBox;
  @media (max-width: 600px) {
    width: 100%;
    @include flex(column, center, center, 0);
  }
}

.form__title{
  @include title_h2;
  margin-bottom: 20px;
}

</style>