<template>
  <div>
    <ul class="radio_ul">  
      <li  class="radio_li">
        <div class="radio-item">
          <input type="radio" class="input-radio" id="Сбербанк" :name="name" checked >
          <label for="Сбербанк" class="label"> {{ labelText }} </label>
        </div>
      
        <button 
          class="radio-btn" 
          @click="changeEl"
          v-if="id === 'addCompanyDetails'"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          Изменить
        </button>

        <button  
          ref="deleteBtn"
          class="radio-btn deleteBtn" 
          :class="{'disabled': isDisabled}"
          :disabled="isDisabled"
          @click="deleteEl"
          v-if="id === 'addCompanyDetails'"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
          Удалить
        </button>
        <div v-if="showWarning2"  class="warning warning2">Cначала надо удалить банковский счет</div>
      </li>
    </ul>
    <p v-if="showWarning"  class="warning">Вы не сохранили эту фирму</p>
    
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
export default {
  name: 'my-radio-list',
  data() {
    return {
      innerWidth: window.innerWidth,
    }
  },

  props: {
    id: {
      type: String
    },
    index: {
      type: Number
    },
    name: {
      type: String,
      require: true
    }
  },

  computed: {
    ...mapGetters([
      'FIRMS', 'BANK', 'IS_BANK', 'FID', 'NEW_INN'
    ]),

    showWarning() {
      if (this.id !== 'addNewCompany') return
      return this.NEW_INN ? true : false
    },

    showWarning2() {
      if (this.id !== 'addNewCompany' || this.innerWidth < 600) return
      return this.IS_BANK ? true : false
    },


    labelText() { // если фирма есть в базе- отрисовываем в кабинете пользователя
      switch (this.id) {
        case 'addCompanyDetails':
          return `${this.BANK[0].name}, RUB`
        case 'addNewCompany':
          return `${this.FIRMS[this.index].long_name}, ИНН ${this.FIRMS[this.index].inn}`
      }

      if (!this.IS_BANK) {
        return null
      } else {
        return `${this.BANK[0].name}, ${this.BANK[0].currency_type}`
      }
    },

    isDisabled() {
      if (this.id !== 'addNewCompany') return
      if (this.IS_BANK) {
        // this.$refs.deleteBtn.dataset.msg = 'Сначала надо удалить банковский счёт'
        return true
      } else {
        // delete this.$refs.deleteBtn.dataset.msg
        return false
      }

    }
  },

  watch: {
    IS_BANK: {
      handler() {
        if (this.id === 'addCompanyDetails') return
        if (!this.$refs.deleteBtn) return
        if (this.IS_BANK) {
          this.$refs.deleteBtn.dataset.msg = 'Сначала надо удалить банковский счёт'
        } else {
          delete this.$refs.deleteBtn.dataset.msg
        }
      },
      immediate: true
    },
  },

  methods: {
    ...mapMutations([
      'SHOW_DIALOG', 'SET_SELECTED_FIRM', 'SET_ADD_OR_CHANGE_FIRM', 'SET_ADD_OR_CHANGE_BANK'
    ]),

    ...mapActions([
      'DELETE_BANK', 'DELETE_COMPANY'
    ]),

    changeEl() {
      switch (this.id) {
        case 'addNewCompany': this.SET_ADD_OR_CHANGE_FIRM('changeFirm')
          break
        case 'addCompanyDetails': this.SET_ADD_OR_CHANGE_BANK('changeBank')
          break
      }
      this.SET_SELECTED_FIRM(this.index)
      this.SHOW_DIALOG(this.id) // передаем ключ по которому будет открываться нужное окно
    },

    deleteEl() {
      let bank = {
        firm_id: this.FID,
        bank_id: this.BANK[0].id
      }
      const company = {
        email: this.FIRMS[this.index].email,
        phone_number: this.FIRMS[this.index].phone_number,
        address_fact: this.FIRMS[this.index].address_fact
      }
      switch (this.id) {
        case 'addCompanyDetails':
          this.DELETE_BANK(bank)
          break
        case 'addNewCompany':
          this.DELETE_COMPANY(company)
          break
      }
    },
  },

}
</script>

<style lang="scss" scoped>

.warning2{
  opacity: 0;
  transition: 1s;
  position: absolute;
  top: 2.3rem;
  right: -4px;
}

.warning{
  @include font(1.7rem, 600, red);
  line-height: 2.6rem;
  text-align: left;
  padding-bottom: 2rem;
}
.deleteBtn{
  position: relative;
}
// .deleteBtn::after{
//     content: attr(data-msg);
//     opacity: 0;
//     color: red;
//     transition: 1s;
//     top: 25px;
//     position: absolute;
//     width: 314px;
//     right: -39px;
// }
.deleteBtn:hover + .warning2{
  opacity: 1;
}

.deleteBtn:hover::after{
  opacity: 1;
}

.disabled{
  @include disabled;
}
.radio_li{
  @include flex(row, flex-start, center, 3rem);
  margin-bottom: 2.6rem;
  flex-wrap: wrap;
  position: relative;

  @media (max-width: 600px) {
    gap: 1rem;
    margin-bottom: 0;
  }
}

.label {
  @include font(1.7rem, 600, #416782 );
  line-height: 2.6rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
  text-align: left;
}
.radio-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.input-radio{
  width: 2rem;
  height: 2rem;
}

.radio-btn {
  @include radio-btn;
}

.fa-pen-to-square, .fa-xmark{
  font-size: 2rem;
}
</style>