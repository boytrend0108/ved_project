<template>
    <div class="home-page" >
      <header class="header">
        <h1 id="main_title" class="title">Delegat — помощник в мире ВЭД</h1>
        <h2 class="subtitle">Какая услуга вас интересует?</h2>
      </header>
    
      <section class="servicesList">
        <div class="services" v-if="isDesktop">
          <service-item v-for="(service, i) in services" :key="i" :img="service.img" :title="service.title"
            :subtitle="service.subtitle" :article="service.article" />
        </div>
        <div class="services services-mob" v-else>
          <service-item-mob v-for="(service, i) in services" :key="i" :img="service.img_mobile" :title="service.title"
            :subtitle="service.subtitle" :article="service.article" />
        </div>
      </section>
      <p class="subtitle" v-if="!isDesktop">Услуги</p>
      <section class="servicesDetails">
        <detail-block-1 />
        <detail-block-2 />
        <detail-block-3 />
        <detail-block-4 id="delivery" />
        <detail-block-5 />
        <subscribe-box-home />
        <my-dialog v-if="DIALOG">
          <success-subscribe v-if="SHOW_SUCCESS_FORM" /> 
          <burger-menu v-if="SHOW_BURGER_MENU" />
          <find-manager-form v-if="SHOW_FIND_MANAGER_FORM" /> 
          <success-find-manager-form v-if="SHOW_SUCCESS_FIND_MANAGER_FORM" /> 
          <signin-offer-form v-if="BTN_ID === 'signin_offer'" />
        </my-dialog>
      </section>
    <particles-comp />
    </div>

</template>

<script>
import BurgerMenu from "@/components/Header/BurgerMenu.vue";
import SuccessSubscribe from "@/components/Form/SuccessSubscribe.vue";
import ServiceItem from "@/components/HomePage/ServiceItem.vue";
import ServiceItemMob from "@/components/HomePage/ServiceItemMob.vue";
import SubscribeBoxHome from "@/components/HomePage/SubscribeBoxHome.vue"
import DetailBlock1 from "../components/HomePage/DetailBlock1.vue";
import DetailBlock2 from "../components/HomePage/DetailBlock2.vue";
import DetailBlock3 from "../components/HomePage/DetailBlock3.vue";
import DetailBlock4 from "../components/HomePage/DetailBlock4.vue";
import DetailBlock5 from "../components/HomePage/DetailBlock5.vue";
import { mapGetters, mapActions } from "vuex";
import FindManagerForm from "../components/Form/FindManagerForm.vue";
import SuccessFindManagerForm from "../components/Form/SuccessFindManagerForm.vue";
import ParticlesComp from "@/components/ParticlesComp.vue"
import SigninOfferForm from "@/components/Form/SigninOfferForm"


export default {
  name: "home-page-new",
  components: {
    ServiceItem,
    ServiceItemMob,
    SubscribeBoxHome,
    DetailBlock1,
    DetailBlock2,
    DetailBlock3,
    DetailBlock4,
    DetailBlock5,
    SuccessSubscribe,
    BurgerMenu,
    FindManagerForm,
    SuccessFindManagerForm,
    ParticlesComp,
    SigninOfferForm,
  },
  data() {
    return {
      isDesktop: true,
      services: [
        {
          title: "Поиск товара",
          subtitle: "В любой стране по вашему запросу",
          img: "boxblue.png",
          img_mobile: "boxblue_mobile.png",
          article: "product-search"
        },
        {
          title: "Заключение контракта",
          subtitle: "По международным правилам INCOTERMS",
          img: "docblue.png",
          img_mobile: "docblue_mobile.png",
          article: ""
        },
        {
          title: "Платная консультация и расчет стоимости логистики и ТО",
          subtitle: "По международным правилам INCOTERMS",
          img: "calculatorblue.png",
          img_mobile: "calculatorblue_mobile.png",
          article: ""
        },
        {
          title: "Организация доставки и ТО",
          subtitle: "Из любой страны по заданным параметрам",
          img: "plane.png",
          img_mobile: "plane_mobile.png",
          article: ""
        },
        {
          title: "Личный менеджер",
          subtitle: "Полное сопровождение сделки от А до Я",
          img: "cap.png",
          img_mobile: "cap_mobile.png",
          article: ""
        },
      ]
    }
  },

  computed: {
    ...mapGetters([
      "DIALOG", "SHOW_SUCCESS_FORM", "SHOW_BURGER_MENU", "SHOW_FIND_MANAGER_FORM", "BTN_ID", "SHOW_SUCCESS_FIND_MANAGER_FORM"
    ])
  },

  methods: {
    ...mapActions(["GET_USER_IP"]),

    isDesktopFn() {
      if (window.innerWidth < 600) {
        this.isDesktop = false
      } else {
        this.isDesktop = true
      }
    }
 
  },

  mounted() {
    this.GET_USER_IP()
    this.isDesktopFn()
    window.addEventListener("resize", () => {
      this.isDesktopFn()
    })
    
    if (!this.$route.hash) return
    if (this.$route.hash === "#Организация доставки") this.$route.hash = "#delivery"

    const el = document.querySelector(this.$route.hash)
    if (!el) return
    el.scrollIntoView() // если есть hash прокручиваем 

  }


}
</script>

<style lang="scss" scoped>

.home-page {
   background-color: none;
}

.services-mob{
  margin-bottom: 4.5rem;
}

.whichCountry{
  width: 100%;
}

.offerBox{
  margin: 4.5rem 0 6rem;
}

.box-item{
  @include flex(row, flex-start, center, 4.5rem);
}
.slot-row{
  @include flex(row, flex-start, center, 2rem);
}

.text{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  // text-align: left;
}


.servicesDetails{
  margin-top: 12rem;

  @media (max-width:600px) {
    margin-top: 4.5rem;
  }
}

.servicesDetail__block-1{
  @include flex(row, center, center, 3rem);
  flex-wrap: wrap;
  margin-bottom: 3rem;
}
.servicesDetail__block-2{
  margin-bottom: 3rem;
}
.subtitle{
  @include font(2.8rem, 600, $font-color2);
  line-height: 3.3rem;

  @media (max-width:600px) {
   @include font (2rem, 600, #244156);
   line-height: 2.7rem;
   text-align: left;
  }
}
.services{
  @include flex(row, center, center, 3rem);
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 1rem;
  }
}
.servicesList{
  margin-top: 4.5rem;

  @media (max-width:600px) {
    margin-top: 2rem;
  }
}
.title {
  @include font(6.4rem, 600, #244156);
  line-height: 7.5rem;
  font-feature-settings: "pnum" on, "lnum" on;

  @media (max-width:600px) {
   @include font (2.8rem, 600, #244156);
   line-height: 3.8rem;
   margin: 4.5rem 0;
  }
}
.hr{
  @include hr
}

</style>