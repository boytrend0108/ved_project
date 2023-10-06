<template>
  <div class="mobileNav">
    <div class="btn">
      <p 
        v-if="!CURRENT_USER"
        class="mobileNav_btn" 
        @click="dropDown = !dropDown"
      >Войти</p>
      <div class="arrow-box">
        <img v-if="!dropDown" src="@/assets/images/icons/arrow_down.png" alt="open">
        <img v-else src="@/assets/images/icons/arrow_up.png" alt="close">
      </div>
    </div>

    <img 
      id="burger" 
      src="@/assets/images/icons/mobile_burger.png" 
      alt="menu"
      @click="showMenu">
    <div class="dropDown-wr">
      <div 
        v-if="dropDown" 
        class="dropdown slide-in-top" 
        ref="dropdown"
      >
        <ul class="ul" @click="handler">
          <li class="li" id="/customer/signin">Войти</li>
          <li class="li" id="/customer/signup">Зарегистрироваться</li>
          <li class="li" id="/provider/signin">Вход для специалистов</li>
          <li class="li" id="/provider/signup">Регистрация для специалистов</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  export default {
    name: 'mobile-nav',
    data() {
      return {
        dropDown: false,
      }
    },

    computed: { 
      ...mapGetters([
        'SHOW_BURGER_MENU', 'DIALOG', 'CURRENT_USER'
      ]), 

      dropdown() {
        return this.showDropDown ? 'slide-out-top' : 'slide-in-top';
      }
    },

    methods: {
      ...mapMutations([
        'SHOW_DIALOG', 'SET_SHOW_BURGER_MENU'
      ]),

      showDropDown() { 
        if(this.dropDown === true) {
          this.$refs.dropdown.classList.remove('slide-in-top')
          this.$refs.dropdown.classList.add('slide-out-top')
          setTimeout(() => {
            this.dropDown = false 
          }, 200)
        } else { 
          this.dropDown = true}
      },

      showMenu() {
        this.dropDown = false
        this.SET_SHOW_BURGER_MENU(true)
        this.SHOW_DIALOG()
      },

      handler(event) {
        this.$router.push(event.target.id)
        this.dropDown = false
      }          
    }
  }


</script>

<style lang="scss" scoped>

.ul{
  @include flex(column, flex-start, flex-start, 0);
  list-style-type: none;
  padding: 0 .5rem;
}

li{
  @include font(1.4rem, 500, #416782);
  line-height: 19px;
  padding: 1rem 0;
  border-bottom: 1px solid #D9E1E7;
  width: 100%;
  text-align: left;
  padding: 1rem 1.5rem;
}
.dropDown-wr{
  width: 280px;
  overflow: hidden;
  position: absolute;
  top: 40px;
  right: -8px;
  z-index: 3;
}

.dropdown{
  width: 27rem;
  background: #FFFFFF;
  box-shadow: 0px .5rem 20px rgba(6, 21, 43, 0.15);
  border-radius: .5rem;

}
.mobileNav{
  @include flex(row, center, center, 1rem);
  cursor: pointer;
  display: none;
  position: relative;

  @media (max-width: 600px) {
    display: flex;
  }
}

.mobileNav_btn{
  @include font(1.4rem, 500, $font-color2);
  line-height: 2.1rem;
}

.btn{
  @include font (1.7px, 500, $font-color2);
  @include flex(row, center, center, 1rem);
  border: none;
  background-color: transparent;

  @media (max-width:600px) {
    @include font (1.4px, 500, $font-color2);
  }
}

.slide-in-top {
	-webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

}

.slide-out-top {
	-webkit-animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
@-webkit-keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
}
@keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
}

}

</style>