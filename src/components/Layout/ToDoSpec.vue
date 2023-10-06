<template>
  <div class="toDoComp">
    <ul class="toDo__ul" v-if="showToDo">
      Осталось сделать:
      <li v-if="true" class="toDo__li">Подписать
        <span @click="goTo('contracts')">договоры</span> 
         и загрузить их в систему
      </li>
      <li v-if="!DOCS.receipt_of_payment.file" class="toDo__li"> Выставить 
        <span @click="goTo('bills')">счёт за услуги</span>
         </li>
    </ul>
  </div>
</template>  

<script>
import { mapMutations, mapGetters } from 'vuex';
  export default {
    name:'to-do-spec',
    computed:{
      ...mapGetters([
      'DOCS'
      ]),

      // showEl_1() {
      //   if (this.DOCS.factory_contract.file &&
      //       this.DOCS.factory_invoice.file &&
      //       this.DOCS.logistics_contract.file &&
      //       this.DOCS.contract_factory.file &&
      //       this.DOCS.factory_payment.file
      //   ) {
      //     return false
      //   } else return true
      // },

      showToDo(){
        if(this.showEl_1 === true || !!this.DOCS.receipt_of_payment.file){
          return true
        } else return false
      }
    },

    methods:{
      ...mapMutations([
        'SET_ACTIVE_MODULE'
      ]),

      goTo(id){
        this.$router.push(`/provider/${id}/${this.$route.params.id}?status=in_progress`)
      }

    }
  }
</script>

<style lang="scss" scoped>
.toDoComp {
  width: 28.5rem;
  left: 34.5rem;
  top: 41.7rem;
  border: 2px solid #D9E1E7;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    max-width: 18.5rem;
  }
}

.toDo__ul, .toDo__bottom,
.toDo__li {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
  text-align: left;
}

.toDo__ul{
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

.toDo__li{
  margin-left: 2rem;
}

.toDo__li::before{
    content: url(http://localhost/img/circle-solid.43652c65.svg);
    display: block;
    width: 5px;
    height: 5px;
    top: 2px;
    right: 1.3rem;
    position: relative;
}

span {
  color: #339DFF;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  text-decoration: underline;
  cursor: pointer;
}
</style>