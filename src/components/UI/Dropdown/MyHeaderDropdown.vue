<template>
    <div class="headerDropdown">
      <p 
        @click.self="goToProfile" 
        class="link" 
      >Профиль</p> 

      <!-- <p 
        @click.self="goToServices"
        class="link" 
      >Мои услуги</p> -->

      <p 
        @click.self="$router.push('/customer/my_applications')"
        class="link" 
      >Мои заявки</p>

      <p 
        class="link"  
        @click.self="logOut" 
        id="logout"
      >Выйти</p>

    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
  export default {
    name: 'my-header-dropdown',
    methods:{
      ...mapActions([
      'LOGOUT'
    ]),
      ...mapMutations([
        'SET_CLEAR_INVOICE_AND_PLIST'
      ]),

      async logOut() {
        const userNav = document.querySelector('#userNav')
        userNav.classList.remove('active')
        this.SET_CLEAR_INVOICE_AND_PLIST() // oчишаем упаковочный лист и инвойс у исполнителя.
        await this.LOGOUT().then(() =>  this.$router.push('/') )
       
    },

      goToProfile() {
        this.$router.push('/customer/profile')
        const userNav = document.querySelector('#userNav')
        const activeLink = document.querySelector('.nav__ul .active')
        if (activeLink) {
          activeLink.classList.remove('active')
          userNav.classList.add('active')
        } else {
          userNav.classList.add('active')
        }
      },

      goToServices(){
        this.$router.push('/customer/services/')
      }
    }
  }
</script>

<style lang="scss" scoped>

.headerDropdown{
  @include flex(column, flex-start, flex-start, 15px);
  padding: 17px 15px;
  min-width: 144px;
  background: #FFFFFF;
  box-shadow: 0px 5px 20px rgba(36, 65, 86, 0.15);
  border-radius: 10px;

  @media (max-width:600px) {
    @include flex(column, flex-start, flex-start, 0);
    list-style-type: none;
    padding: 0 5px;
    width: 100%;
  }
}

.link{
  @include font(14px, 500, #416782);
  cursor: pointer;

  @media (max-width:600px) {
    @include font(14px, 500, #416782);
    line-height: 19px;
    padding: 10px 0;
    border-bottom: 1px solid #D9E1E7;
    width: 100%;
    text-align: left;
    padding: 10px 15px;
  }
}

</style>