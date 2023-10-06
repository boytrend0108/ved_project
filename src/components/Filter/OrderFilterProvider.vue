<template>
  <div class="orderFilterProvider">
    <div class="checkBox">
      <p class="filter__title">Услуги</p>
      <div class="checkBox__item" v-for="(el, id) in checkBox" :key="id">
        <input 
          type="checkbox" 
          :id="el"   
          class="input"
          v-model="selectedServices"
          :value="checkBoxValue(el)"
        >
        <label :for="el" class="label"> {{ el }} </label>
      </div>
    </div>
    <div class="coutryFilter"> 
      <p class="filter__title">Страна-экспортёр</p> 
      <input 
        type="text" 
        class="countryInput" 
        placeholder="Поиск по стране"
        v-model="input"
        @click="showCountryfn"
      >
       <ul v-if="showCountry" class="input__ul">
        <li 
          @click="selectCountry($event)"
          v-for="(country, id) in filtered" 
          :key="id" 
          class="input__li"> {{ country }}
        </li>
      </ul>

      <ul class="selectedCountry__ul" >
        <li 
          v-for="(country, id) in selectedCountries" 
          :key="id"
          :id="id"
          class="selectedCountry__li"> {{ country }}
          <img 
            src="@/assets/images/icons/xmark-solid.svg" 
            alt="icon"
            :id="id"
            @click="deleteCountry"
            class="xmark"
          >
        </li>
      </ul>
    </div>

    <my-blue-btn @click="handler" class="btn">Показать</my-blue-btn>
  </div>
</template>

<script>
import countries from "@/api/countries"
import { mapActions, mapGetters, mapMutations } from "vuex"
export default {
  name: "order-filter-provider",
  data() {
    return {
      checkBox: ["Логистика", "Таможенное оформление", "Сертификация", "Инспекция товара на фабрике", "Страхование груза", "Оплата товара поставщику силами исполнителя", "Другое"],
      countries: countries,
      showCountry: false,
      selectedCountries: [],
      input: "",
      selectedServices: []
    }
  },
  computed: {
    ...mapGetters(["FILTER_SERVICES"]),
    filtered() {
      return this.countries.filter(el => el.toLowerCase().includes(this.input.toLowerCase()))
    }
  },
  methods: {
    ...mapMutations([
      "SET_FILTER_SERVICES", "SET_FILTER_COUNTRY", "SHOW_DIALOG", "SET_PAGE"
    ]),
    ...mapActions(["GET_CUSTOMER_ORDERS"]),

    checkBoxValue(service) {
      switch (service) {
        case "Логистика": return "logistics"
        case "Таможенное оформление": return "customs_clearance"
        case "Сертификация": return "certification"
        case "Страхование груза": return "insurance"
        case "Инспекция товара на фабрике": return "product_check"
        case "Оплата товара поставщику силами исполнителя": return "payment_from_the_contractor"
        case "Другое": return "other"
      }
    },

    selectCountry(event) {
      const selectedCountry = event.target.textContent
      if (!this.selectedCountries.includes(selectedCountry)) {
        this.selectedCountries.push(selectedCountry)
        this.SET_FILTER_COUNTRY(this.selectedCountries)
        this.showCountryfn()
      } return

    },

    deleteCountry(event) {
      const index = event.target.id
      this.selectedCountries.splice(index, 1)
      this.SET_FILTER_COUNTRY(this.selectedCountries)
    },

    showCountryfn() {
      this.showCountry = !this.showCountry;
    },

    handler() {
      const options = {
        status: "published",
        order_type: "delivery",
      }

      this.FILTER_SERVICES.forEach(el => {
        options[el] = true
      })

      if (window.innerWidth < 600) {
        this.SHOW_DIALOG()
      } else {
        this.SET_PAGE(true)
        this.GET_CUSTOMER_ORDERS(options)
      }
    }
  },

  watch: {
    selectedServices() {
      this.SET_FILTER_SERVICES(this.selectedServices) // coхраняем выбранные фильтры в сторе
    }
  }

}
</script>

<style lang="scss" scoped>

.btn{
  width: 100% !important;
  margin-top: 3rem;
}

.xmark{
  width: 1.2rem;
  cursor: pointer;
}

.selectedCountry__li{
  @include font(1.4rem, 500, $font-color2);
  line-height: 2.1rem;
  @include flex(row, center, center, .8rem)
}
.selectedCountry__ul{
  list-style-type: none;
  @include flex(row, flex-start, center, 1.5rem);
  margin-top:1.5rem;
  flex-wrap: wrap;
}

.input__li {
  text-align: left;
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
  cursor: pointer;
  text-transform: capitalize;
  padding: 1.2rem 3rem;
  height: 5rem;
  }

.input__ul{
  transition: 1s;
  max-height: 20rem;
  max-width: 30rem;
  background: #FFFFFF;
  box-shadow: 0px .5rem 2rem rgba(6, 21, 43, 0.15);
  border-radius: 1rem;
  overflow-y:scroll;
}

::placeholder{
  @include font(1.4rem, 500, $font-color);
  line-height: 2.1rem;
}
::-webkit-scrollbar{
  width: 1rem;
  background-color: #F1F4FA;
}

::-webkit-scrollbar-thumb{
  background:$main-color;
  border-radius: .5rem;
  height: 5rem;
}

.countryInput{
  border-radius: 1rem;
  background-color: $bg-color;
  height: 37px;
  padding: .8rem 2rem;
  width: 100%;
  border: none;
  outline: none;
  @include font(1.4rem, 500, $font-color2);
}

.checkBox{
  margin-bottom: 3rem;
}

.filter__title{
  @include font(1.7rem, 600, $font-color2);
  line-height: 2.6rem;
  text-align: left;
  margin-bottom: 1.5rem;
}
.input{
  cursor: pointer;
  min-height: 2.4rem;
  min-width: 2.4rem;
}

.label{
  @include font(1.4rem, 500, $font-color2);
  line-height: 2.1rem;
  margin-left: 1rem;
  cursor: pointer;
  text-align: left;
}

.checkBox__item{
  @include flex(row, flex-start, center, .5rem);
  margin-bottom: 1rem;
}
.orderFilterProvider{
  width: 100%;
  padding: 2rem;
  background-color: #FFFF;
  margin-top: 3.2rem;

  @media (max-width:600px) {
    padding: 1.5rem;
  }
}

</style>