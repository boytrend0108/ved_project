<template>
  <div 
    class="main-header" 
    id="header-provider" 
  >
    <div class="container header-container">
      <header class="header">
        <my-logo @click="$router.push('/') " /> 
        <nav class="nav" v-if="innerWidth > 600">
          <ul class="nav__ul" v-if="showNav">
            <li 
              class="nav__li nav__li-after"
              @click="this.$router.push('/provider/search/')"
              :class="{'active': this.$route.path === '/provider/search/' }"
            >Поиск заказов
            </li>
         
            <div 
              class="profile" 
              :class="{'active': this.$route.path === '/provider/profile'}"
              @click="showProfileFn" id="userNav">
              <li 
              class="nav__li nav__li-after profile" 
              v-if="showUserBtn"
              > 
                <img 
                  v-if="!DOCS.upload_user_pic.href"
                  :src="require(`@/assets/images/icons/user.svg`)" 
                  alt="avatar"
                  class="avatar" 
                > 
                <img 
                  v-if="DOCS.upload_user_pic.href"
                  :src="DOCS.upload_user_pic.href"
                  alt="avatar"
                  class="avatar"
                > {{ USER_NAME }}
              </li>
               <div class="overflow">
                <my-header-dropdown-provider
                  class="headerDropdown" 
                  :class="animation"
                  v-if="SHOW_HEADER_DROPDOWN" 
                />
               </div>
            </div>
          </ul>
        </nav> 
        <nav class="nav_mob" v-else>
          <p id='orders' class="nav__li dd_parent" @click="showDropdownFn">
            Заказы
            <ul class="dropdown" v-if="showDropdown">
              <li 
                class="nav_mob-li nav__li" 
                v-if="navValue === 'orders'"
                @click="$router.push('/provider/search/')"
                >Поиск заказов</li>
              <li 
                class="nav_mob-li nav__li" 
                v-if="navValue === 'orders'"
                @click="$router.push('/provider/feedbacks/?status=all')"
                >Мои заявки</li>
              <li 
                class="nav_mob-li nav__li" 
                v-if="navValue === 'profile'"
                @click="$router.push('/provider/profile')"
                >Профиль</li>
              <li 
                class="nav_mob-li nav__li" 
                v-if="navValue === 'profile'"
                @click="logOut" 
                >Выход</li>
            </ul>
          </p>

          <div  id="profile" class="img-wr" @click="showDropdownFn" >
            <img 
            v-if="!DOCS.upload_user_pic.href"
            :src="require(`@/assets/images/icons/user.svg`)" 
            alt="avatar" 
            class="avatar"
            id="profile"
            > 
            <img 
              v-if="DOCS.upload_user_pic.href"
              :src="DOCS.upload_user_pic.href" 
              alt="avatar"
              class="avatar"
              id="profile"
            >
            <img src="@/assets/images/icons/mobile_burger.png" alt="meню" id="profile">
          </div>
         
        </nav>
        
      </header>  
      
      <header-docs-mob />
      
    </div>
  </div>  
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import HeaderDocsMob from './HeaderDocsMob.vue';

export default {
  name:'header-provider',
  components: {
    HeaderDocsMob
  },

  data(){
    return{
      showProfile: false,
      animation: 'slide-in-top',
      avatarIcon: `@/assets/images/icons/user.svg`,
      innerWidth: window.innerWidth,
      showDropdown: false,
      navValue:''
    }
  },

  computed: {
    ...mapGetters([
      'CURRENT_USER','USER_NAME', 'AVATAR', 'SHOW_HEADER_DROPDOWN', 'DOCS'
    ]),

    showSinginBtn() {
      if (!this.CURRENT_USER && (this.$route.path === '/' || this.$route.path === '/application')) {
        return true
      } else {
        return false
      }
    },

    showLogoutBtn() {
      if (this.CURRENT_USER) {
        if (this.$route.path !== "/reset-password") {
          if (this.$route.path !== "customer/singin") {
            if (this.$route.path !== "/customer/register") {
              return true
            }
          }
        }
      } else {
        return false
      } return ''
    },

    showUserBtn() {
      if (this.CURRENT_USER) {
        return true
      } else return true // когда будет регистрация- исправть на фолс
    },

    avatar(){
      if(this.AVATAR){
        return this.AVATAR
      } else return this.avatarIcon
    },

    showNav() {
      if (this.$route.name === "provider-signin") return false 
        else return true
    }
  },

  methods: {
    ...mapActions([
      'GET_USER_NAME', 'LOGOUT'
    ]),
    ...mapMutations([
     'SET_FORGET_PASSWORD', 
     'SHOW_SELECT_COMPANY_MODULE', 
     'SET_SHOW_HEADER_DROPDOWN',
     'SET_CLEAR_INVOICE_AND_PLIST',
    ]),
  

    showProfileFn(){
    if(this.SHOW_HEADER_DROPDOWN === true){
      this.animation = 'slide-out-top'
      setTimeout(() => {
        this.SET_SHOW_HEADER_DROPDOWN(false)
      }, 500);
    } else {
      this.animation = 'slide-in-top'
      this.SET_SHOW_HEADER_DROPDOWN(true)
      }
    },

    showDropdownFn(event) {
        this.navValue = event.target.id
        this.showDropdown = !this.showDropdown
    },
 
    goToHome() {
      this.$router.push('/provider/search/') 
    },

    goToMyApplications(){
      this.$router.push('/support_spec')
    },

    async logOut() {
        this.SET_CLEAR_INVOICE_AND_PLIST() // oчишаем упаковочный лист и инвойс у исполнителя.
        await this.LOGOUT().then(() =>  this.$router.push('/') )
    },
  }, 

  
}
</script>

<style lang="scss" scoped>

.img-wr{
  display: flex;
  align-items: center;
}

.dropdown{
  position: absolute;
  top: 40px;
  left: -21px;
  background-color: #FFFF;
  box-shadow: 0px .5rem 2rem rgba(6, 21, 43, 0.15);
  border-radius: .5rem;
  // padding: 1rem 0px;
  @include flex (column, center, flex-start, 0);
  width: 16rem;
  z-index: 2;
}

.nav_mob-li:last-child{
 border-bottom: none;
}

.dd_parent{
  position: relative;
}

.nav_mob{
  @include flex(row, center, center, .5rem);
  padding: 0;
}

.active{
  background-color: #F5F5F7;
}

.overflow{
  position: absolute;
  overflow: hidden;
  height: 15rem;
  width: 15rem;
  top: 3rem;
}
.profile{
  min-width: 14.4rem;
}

.headerDropdown{
  position: absolute;

}

.profile{
  @include flex(column, center, center, 0);
  position: relative;
}

.main-header{
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
}

.container{
 padding: 0 2rem;
 margin: 0 auto;
 display: flex;
 flex-direction: column;
 width: 127rem; // 1230 + 20 + 20

 @media (max-width: 600px) {
  padding: 0 1.5rem;
 }
}

.header{
display: flex;
justify-content: space-between;
align-items: center;
// margin-bottom: 3rem;

@media (max-width:600px) {
  padding: 1rem 0;
}
}

.nav{
padding: 2rem;
display: flex;
align-items: center;
justify-content: space-between;
}
.nav__ul{
display: flex;
gap:2rem;
}
.nav__li {
  @include font (1.4rem, 500, #416782);
  cursor: pointer;
  @include flex (row, flex-start, center, 0);
  border-radius: 1rem;
  padding: 0 1.5rem;
}

.nav_mob-li{
  padding: 1rem 1rem;
  border-bottom: 1px solid;
  border-radius: 0;
  width: 100%;
}

.li_mob{
  @include font(14px, 500, $font-color2);
  line-height: 2.1rem;
}

.nav__li-after::after{
 content: url(@/assets/images/icons/shevron.svg);
 margin:0px 0px 0px 6px;
}



.avatar{
  height: 2.7rem;
  width: 2.7rem;
  border-radius: 50%;
  margin-right: 1rem;

  @media (max-width:600px) {
    margin-right: 0;
  }
}

.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

  @-webkit-keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-30rem);
      transform: translateY(-30rem);
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
      -webkit-transform: translateY(-30rem);
      transform: translateY(-30rem);
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