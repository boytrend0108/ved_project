<template>
  <div class="sideFilterComp mob" >
    <fieldset class="fildset">
        <legend class="fildset__legend"> Tип </legend>
        <div 
          class="radio-box" 
          v-for="el in type" 
          :key="el.id"
          @click="selectType(el.value)"
        >
          <input 
            class="input type"
            type="radio" 
            name="type" 
            :id="el.id"/>

          <label :for="el.id"  class="fildset_lable" > {{ el.value }} </label>
        </div>
      </fieldset>

    <fieldset class="fildset">
      <legend class="fildset__legend" > Статус </legend>
      <div 
        class="radio-box" 
        v-for="el in status" 
        :key="el.id"
        @click="selectStatus(el.value)"
      >
        <input 
          class="input mob"
          type="radio" 
          name="status" 
          :id="el.id"
        />
        <label :for="el.id" class="fildset_lable" > {{ el.value }} </label>

      </div>
    </fieldset>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
  export default {
    name:"side-filter-mob",
    data(){
      return{
        status: [
          { id: "all", value: "Все" },
          { id: "unpublished", value: "Неопубликованные" },
          { id: "published", value: "Опубликованные" },
          { id: "in_progress", value: "В процессе" },
          { id: "completed", value: "Завершённые" }
        ],
        type: [
        { id: "all_type", value: "Все" },
        { id: "delivery_type", value: "Доставка" },
        { id: "cost", value: "Расчет стоимости" },
        { id: "search", value: "Поиск товара" }
      ],
        companies: [{id: "all_comp", label: "Все"}],
        checked: false,
        innerWidth: window.innerWidth,
      }
    },

    computed:{
      ...mapGetters([
       "FIRMS", "FID", "FILTER_STATUS", "FILTER_TYPE"
      ])
    },
    
    methods: {
      ...mapMutations([
        "SET_FILTER_STATUS", "SET_PAGE", "SET_FILTER_TYPE"
      ]),
      
     
    isChecked() { // по ставим сhecked на Неопубликованные
      let status = this.FILTER_STATUS
      if (typeof (status) === "object") status = "all"
      document.querySelector(`#${status}`).checked = true

      let type = this.FILTER_TYPE
      if (typeof(type) === "object") type = "all_type"
      if (type === "delivery") type = "delivery_type"
      document.querySelector(`#${type}`).checked = true
    },

      selectStatus(status){
        this.SET_PAGE(true) // обновляем каунтер страниц
        this.SET_FILTER_STATUS(status) 
      },

      selectType(el) {
        if (el === "delivery_type") el = "delivery"
        this.SET_FILTER_TYPE(el)
    }
      
    },

    watch: {
      FID() {
         new Promise(resolve => {
          this.companies.push({id: this.companies.length - 1 , label: this.FIRM[0].long_name})
          resolve()
        }).then(() => {
          const inputs = document.querySelectorAll(".firms")
          inputs.forEach(el => {
            if (el.label === this.FIRM[0].long_name) {
              el.checked = "true"
            }
         })
        })
      },
    },

    mounted(){
      if (!this.$route.query.type) this.isChecked()
    else {
      document.querySelector(`#${this.$route.query.type}`).checked = true
      document.querySelector(`#all`).checked = true
    }

    }
}
</script>

<style lang="scss" scoped>

.circle{
  width: 1.4rem;
  height: 1.4rem;
  background-color: $main-color;
  border-radius: 50%;
  position: absolute;
  // left: 1px;
  top: 4px;
  display: none;
}

.input{
  cursor: pointer;
}
.fildset_lable {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  cursor: pointer;
}

.radio-box{
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.fildset__legend{
  @include title_h3;
  text-align: left;
  margin-bottom: 1.5rem;
}

.fildset{
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
}
.sideFilterComp {
  background: #FFFFFF;
  border-radius: 1rem;
  padding: 2rem;
}
</style>