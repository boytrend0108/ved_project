<template>
  <div class="serviceDetailsSm" :id="setId"> 
    <div class="top">
      <div class="top-item">
        <div class="title" >{{ title }}</div>
        <hr class="hr" v-if="innerWidth < 600">
        <p class="subtitle">Услуга включает</p>
        <slot name="header"></slot>
      </div>
      <hr class="hr">
      <div class="top-item">
        <p class="subtitle2">Кому подходит</p>
      <slot name="footer"></slot>
      </div>
    </div>
    <div class="btn-box">
      <button 
        class="btn-blue" 
        :class="{disabled}"
        ref="btn"
        @click="clickHandler"
      >{{ btn }}</button>
      <div v-if="!disabled" class="price">{{ price }}</div>
      <p v-if="disabled" class="price">Скоро появится</p>
    </div>
    <my-warning v-if="showWarning" :warning="warning" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name: "service-ditails-sm",
  props: {
    title: {
      type: String
    }, 
    btn: {
      type: String
    },
    price: {
      type: String
    },
  },

  data() {
    return {
      innerWidth: window.innerWidth,
      showWarning: false,
      warning: "Сначала надо добавить фирму. Сейчас вы будете перенаправленны на нужную страницу"
    }
  },

  computed: {
    ...mapGetters(["CURRENT_USER", "FID", "TOKEN"]),
    disabled() {
      if (this.btn === "Записаться на вебинар") return true
      else return false
    },

    setId() {
      if (this.title === "Личный менеджер") return "manager"
      else return Date.now()
    }
  },

  methods: {
    ...mapMutations(["SHOW_DIALOG", "SET_SHOW_FIND_MANAGER_FORM", "CLEAR_SEARCH_PRODUCT_APPL"]),

    firmValidation() {
      if (this.TOKEN && !this.FID) {
        this.showWarning = true
        setTimeout(() => {
          this.showWarning = false
          this.$router.push(`/${localStorage.getItem("site_role")}/profile`)
        }, 3000);
        return false
      } return true
    },

    clickHandler() {
      switch (this.btn) {
        case "К инструкции": this.$router.push("/documentation?article=product-search")
          break

        case "Заказать поиск":
          if (!this.firmValidation()) return
          if (this.CURRENT_USER) {
            this.CLEAR_SEARCH_PRODUCT_APPL()
            this.$router.push("/search_product/?step=SearchProductComp")
          } else {
            this.SHOW_DIALOG('signin_offer')
            switch (this.$route.name) {
              case 'home-new': localStorage.setItem('selected_service', 'search')
                break
            }
          }
          break

        case "Подключить менеджера":
            this.SET_SHOW_FIND_MANAGER_FORM(true)
            this.SHOW_DIALOG()
          break
      }
    }
  },

  mounted() {
    if (this.price === "Бесплатно") {
      this.$refs.btn.classList.remove("btn-blue")
      this.$refs.btn.classList.add("btn-white")
    }
  }
}
</script>

<style lang="scss" scoped>

.warning {
  @include warningMsg;
}
  
.disabled {
  @include disabled
}

.top {
  @include flex(column, flex-start, flex-start, 0px);
  width: 100%;

  @media (max-width: 600px) {
    padding: 2rem;
  }
}

.top-item {
  @include flex(column, flex-start, flex-start, 0px);
}

.btn-box {
  @include flex(row, flex-start, center, 3rem);

  @media (max-width: 600px) {
    padding: 2rem 1rem;
    gap: 0.8rem;
    width: 100%;
    justify-content: space-between;
  }
}

.btn-white {
  @include myColorBtn($main-color, white, $main-color, 1.4rem, 600, 2.1rem);
  padding: 1.2rem 3rem !important;

  @media (max-width:600px) {
    @include font(1.4rem, 600, $main-color);
    line-height: 1.9rem;
    height: 4rem;
    padding: 1rem 1.5rem !important;
    width: 100%;
  }

}

.btn-blue {
  @include myColorBtn(white, $main-color, $main-color, 1.4rem, 600, 2.1rem);
  padding: 12px 30px !important;

  @media (max-width:600px) {
    @include font(1.4rem, 600, white);
    line-height: 1.9rem;
    padding: 1.2rem 0.5rem !important;
    height: 4rem;
    width: 100%;
  }
}

.title {
  @include font(2.8rem, 600, $font-color2);
  line-height: 3.3rem;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    @include font(1.7rem, 600, $font-color2);
    line-height: 2rem;
    margin-bottom: 0px;
    text-align: left;
  }
}

.subtitle {
  @include font(20px, 600, $font-color2);
  line-height: 30px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    @include font(14px, 600, $font-color2);
    line-height: 19px;
    margin-bottom: 10px;
    text-align: left;
  }
}

.subtitle2 {
  @include font(20px, 600, $font-color2);
  line-height: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.9rem;
    margin-bottom: 1rem;
    text-align: left;
  }
}

.price {
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;
  min-width: 7.5rem;

  @media (max-width:600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.9rem;
  }
}

.hr {
  @include hr;
}

.serviceDetailsSm {
  @include flex(column, space-between, flex-start, 0);
  width: 60rem;
  height: 60rem;
  background-color: #FFFF;
  padding: 5rem 6rem 6rem 6rem;

  @media (max-width: 600px) {
    padding: 0;
    height: fit-content;
    width: 100%;
  }
}
</style>