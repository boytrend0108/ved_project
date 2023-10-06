<template>
    <div class="headerDropdown">
      <p 
        @click.self="this.$router.push('/provider/profile')"
        class="link" 
      >Профиль</p>
      <p 
        to="#" 
        class="link"  
        @click.self="logOut" 
        id="logout"
      >Выйти</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    name: 'my-header-dropdown-provider',
    methods:{
      ...mapActions([
      'LOGOUT'
    ]),

      async logOut() {
      await this.LOGOUT()
      this.$router.push('/')
      const userNav = document.querySelector('#userNav')
      userNav.classList.remove('active')
    },
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
}

.link{
  @include font(14px, 500, #416782);
  cursor: pointer;
}

</style>