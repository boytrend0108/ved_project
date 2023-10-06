<template>
  <div class="burger_menu" @click="clickHandler">
    <my-logo @click="goToHome" class="logo" />
    <ul class="ul">
      <li class="li" id="home">Главная</li>
      <li class="li" id="/customer/signin" >Вход / регистрация</li>
      <li>
        <ul class="ul"  id="customer"> Документация импортёру
          <div class="dropdown_customer" v-if="showDropdownCustomer">
            <li  id="/documentation?article=product-search">Обучение ВЭД</li>
            <li  id="/search_product/?step=SearchProductComp">Поиск товара</li>
            <li  id="/#delivery">Заключение контракта и оплата</li>
          </div>
        </ul>
      </li>
      <li>
        <ul class="ul"  id="provider"> Специалистам
          <div class="dropdown_customer" v-if="showDropdownProvider">
            <li  id="/provider/signin">Вход для специалистов</li>
            <li  id="/provider/signup">Регистрация для специалистов</li>
          </div>
        </ul>
      </li>
    </ul>
    


  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'burger-menu',
    data(){
      return {
        showDropdownCustomer: false,
        showDropdownProvider: false,
      }
    },

    methods: {
      ...mapMutations([
        'SHOW_DIALOG'
      ]),

      clickHandler(event) {
        switch(event.target.id) {
          case 'customer' : this.showDropdownCustomer = !this.showDropdownCustomer
          break
          case 'provider' : this.showDropdownProvider = !this.showDropdownProvider
          break
          case 'home' : 
          if(this.$route.path === "/") {
            this.SHOW_DIALOG()
          } else {
            this.$router.push('/')
            this.SHOW_DIALOG()
          }
          break
          case `${event.target.id}` : 
          this.$router.push(event.target.id)
          this.SHOW_DIALOG()
          break
        }
      },
    

      goToHome() {
      this.$router.push('/')
    },
    }


  }
</script>

<style lang="scss" scoped>



.burger_menu{
  width: 100%;
  @include flex(column, center, flex-start, 2rem);
  padding: 1rem 1.5rem;

}
.ul{
  @include flex(column, flex-start, flex-start, 0);
  list-style-type: none;
  padding: 0 5px;
  @include font(1.7rem, 600, $font-color2);
  line-height: 2.3rem;
  width: 100%;
}

li{
  @include font(14px, 500, #416782);
  line-height: 1.9rem;
  padding: 1rem 0;
  border-bottom: 1px solid #D9E1E7;
  width: 100%;
  text-align: left;
}

.li{
  @include font(1.7rem, 600, $font-color2);
  line-height: 2.3rem;
}

</style>