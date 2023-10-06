<template>
  <div class="main-header" id="header-customer">
    <div class="container header-container">
      <header class="header">
        <my-logo @click="goToHome" />

        <nav class="nav" v-if="showNav">
          <div class="nav__ul">
            <div class="nav__li-wr" v-if="isDesktop">
              <div 
                v-if="showBtnForSpec"
                class="nav__li nav__li-after"
                @click="goToProvider"
              >Специалистам
              </div>
              <div 
                class="nav__li"  
                @click="this.$router.push('/customer/signin')"
                v-if="showSinginBtn"
              >
                Вход клиента
              </div>
            </div>
            <div 
              id="myApplicationsNav"
              class="nav__li " 
              :class="{'active': this.$router.path === '/customer/my_applications' }"
              v-if="showMyOrders"
              @click="goToMyApplications"
              > Mои заявки
            </div>

            <mobile-nav v-if="!CURRENT_USER" />  

            <div v-if="showUserNav" class="profile" @click="showProfileFn" id="userNav">
              <div 
                ref="profile"
                class="nav__li nav__li-after profile username" 
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
                >

                <p class="profile__username" v-if="isDesktop"> {{ USER_NAME }} </p>              
              </div>

              <img 
                v-if="!isDesktop"
                src="@/assets/images/icons/mobile_burger.png" 
                alt="meню"
              >
              
               <div class="overflow" v-show="SHOW_HEADER_DROPDOWN">
                 <my-header-dropdown 
                    class="headerDropdown" 
                    :class="animation"
                    v-show="SHOW_HEADER_DROPDOWN" />
               </div> 
            </div>
          </div>
        </nav>
      </header>
      
      <!--Хедер для заявки(договоры, cчета)-->
      <header-docs-mob />

      <my-dialog v-if="DIALOG && innerWidth < 600" > 
        <burger-menu v-if="SHOW_BURGER_MENU" />
      </my-dialog>
    </div>
  </div>  
</template>

<script>
import BurgerMenu from "./BurgerMenu.vue";
import HeaderDocsMob from "./HeaderDocsMob.vue";
import { orderDocumentsNav } from "@/helpers/navigation";
import MobileNav from "./MobileNav.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "header-main",
  components: { MobileNav, HeaderDocsMob, BurgerMenu },
  data() {
    return {
      showProfile: false,
      animation: "slide-in-top",
      avatarIcon: `@/assets/images/icons/user.svg`,
      isDesktop: true,
      innerWidth: window.innerWidth,
    }
  },

  computed: {
    ...mapGetters([
      "CURRENT_USER",
      "USER_NAME",
      "AVATAR",
      "TOKEN",
      "DOCS",
      "SHOW_HEADER_DROPDOWN",
      "DIALOG",
      "SHOW_BURGER_MENU",
    ]),

    showBtnForSpec() {
      if (!this.TOKEN & this.$route.path === "/" || this.$route.path === "/documentation") return true

      return false
    },

    showSinginBtn() {
      if (!this.CURRENT_USER && (this.$route.path === "/" ||
        this.$route.path === "/application" ||
        this.$route.path === "/documentation")) {
        return true
      }

      return false
    },

    showUserBtn() {
      if (this.CURRENT_USER) return true
      return false
    },

    showMyOrders() {
      if (this.$route.name === "customer-signin") return false
      return this.TOKEN ? true : false
    },

    avatar() {
      if (this.AVATAR) return this.AVATAR
      return this.avatarIcon
    },
    // eslint-disable-next-line
    showNav() {
      // if (this.$route.name === "customer-signin" ) return false 
      return true
    },

    showUserNav() {
      if (this.$route.name === "customer-signin") return false
      return this.CURRENT_USER ? true : false
    }
  },

  methods: {
    ...mapActions([
      "GET_USER_NAME"
    ]),
    ...mapMutations([
      "SET_SHOW_CHANGE_PASSWORD",
      "SET_SHOW_LOGIN_FORM",
      "SET_SHOW_HEADER_DROPDOWN",
      "SHOW_DIALOG",
      "SET_SHOW_BURGER_MENU",
      "SET_FORGET_PASSWORD",
      "SHOW_SELECT_COMPANY_MODULE", "SET_CLEAR_INVOICE_AND_PLIST", "SET_CLEAR_IMG", "SET_CLEAR_DOCS"
    ]),

    goToProvider() {
      this.SET_SHOW_CHANGE_PASSWORD(false)
      this.SET_SHOW_LOGIN_FORM(true)
      this.$router.push("/provider/signin")
    },

    showProfileFn() {
      if (this.SHOW_HEADER_DROPDOWN === true) {
        this.animation = "slide-out-top"
        setTimeout(() => {
          this.SET_SHOW_HEADER_DROPDOWN(false)
        }, 500);
      } else {
        this.animation = "slide-in-top"
        this.SET_SHOW_HEADER_DROPDOWN(true)
      }
    },


    goToHome() {
      this.$router.push("/")
    },

    goToMyApplications() {
      this.SET_CLEAR_INVOICE_AND_PLIST();
      this.SET_CLEAR_IMG();
      this.SET_CLEAR_DOCS();
      this.$router.push("/customer/my_applications")
    },

    goTo(event) {
      orderDocumentsNav(event)
    },

    isDesktopFn() {
      if (window.innerWidth < 600) {
        this.isDesktop = false
      } else this.isDesktop = true
    },
  },

  mounted() {
    this.isDesktopFn()
    window.addEventListener("resize", () => {
      this.isDesktopFn()
    })
  }
}
</script>

<style lang="scss" scoped>
.main-header{
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  width: 100%;
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
}

// #region nav =======
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav__ul{
    display: flex;
    gap: 3rem;

    @media (max-width: 600px) {
      gap: 0;
    }
  }

  .nav__li{
    @include font(1.4rem, 500, #416782 );
    @include flex(row, flex-start, center, 0);
    cursor: pointer;
    border-radius: 1rem;
    padding: 1.6rem 0 ;

    @media (max-width: 600px) {
      padding: 0 0 0 .5rem;
    }
  }

  .profile__username {
    @include font(1.4rem, 500, #416782 );
    @include flex(row, flex-start, center, 0);
    cursor: pointer;
    border-radius: 1rem;

    @media (max-width: 600px) {
      padding: 0 0 0 .5rem;
    }
  }

  .nav__li-after::after {
    content: url(@/assets/images/icons/shevron.svg);
    margin:0px 0px 0px 6px;

    @media (max-width:600px) {
      display: none;
    }
  }
}

.nav__li-wr{
  display: flex;
  gap: 2rem;
}

.nav_li{
  @include flex(column, center, center, .5rem);
  @include font(1.3rem, 500, $font-color2);
  line-height: 1.8rem;
}
//  #endregion====

.profile{
  @include flex(row, center, center, 0);
  position: relative;
  min-width: 14.4rem;

  @media (max-width: 600px) {
    min-width: 0;
  }
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

.active{
  color: $main-color;
  stroke: $main-color;
}
.overflow{
  position: absolute;
  overflow: hidden;
  height: 30rem;
  width: 15rem;
  top: 3rem;
  z-index: 1;

  @media (max-width:600px) {
    left: -13.4rem;
    width: 27rem;
    height: 16.1rem;
    top: 5rem;
    
  }
}

.headerDropdown{
  position: absolute;
}

// #region animation
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

// #endregion
</style>