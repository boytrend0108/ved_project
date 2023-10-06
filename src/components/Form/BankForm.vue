<template>
  <form class="bank-form" @submit.prevent='onSubmit'> 
    <h2 class="form-title" v-if="$route.name !== 'provider-signup'">Банковские реквизиты</h2>
    <h2 class="form-title_signup" v-else >Банковские реквизиты</h2>
    <validation-errors
        v-if='this.VALIDATION_ERRORS'
        :validation-errors='this.VALIDATION_ERRORS'
        class="error"
    />
     <div class="inputBic">
        <p class="formElem__title">БИК/Название банка</p>
        <input 
          type="text" 
          id="ИНН"
          class="input" 
          v-model="inputBic" 
          @input="setInput"
          ref="autofocus"
        >
        <my-validation-error-msg :errorMsg="errorMsgBic"/>
        <ul class="companiesDropDown">
          <li 
            class="dropDownItem" 
            v-for="(bank,i) in BANKS_LIST" :key="i"
            @click="selectBank"
          >
           <p> {{ bank }}</p>
          </li>
        </ul>
     </div>

     <div class="inputBic">
        <p class="formElem__title">Haименование банка</p>
        <input 
          type="text" 
          class="input cursor" 
          v-model="bankName" 
          disabled
        >
     </div>

     <div class="inputBic">
        <p class="formElem__title">Расчётный счёт</p>
        <div class="input__wr">
          <input 
            id='ras_schet'
            type="text" 
            class="input" 
            v-model.trim="ras_schet" 
            ref="ras_schet"
            @input="setInput"
          >
          <div class="marker"  v-if="currency_type_error"/>
        </div>
        
        <my-validation-error-msg v-if="errorMsgBill" :errorMsg="errorMsgBill" class="error"/>
        <p 
          :errorMsg="currency_type_error" 
          class="errorMsg" v-if="currency_type_error"
        > 
          {{ currency_type_error }}
         </p>
     </div>

     <div class="inputBic">
        <p class="formElem__title">Корреспондентский счёт</p>
        <input 
          type="text" 
          class="input cursor" 
          v-model="kor_schet" 
          disabled
        >
     </div>
    <div class="btn-wr">
      <my-color-btn 
        v-if="$route.name !== 'provider-signup'"
        class="btn" 
        type="submit" 
        :disabled="isDisabled"
        :class=" {'disabled': isDisabled}"
      >Сохранить</my-color-btn>

    </div>
  </form>
</template>

<script>
import { numValidation } from '@/helpers/validation.js'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
export default {
  name: 'bank-form',
  components: { ValidationErrors },

  props: {
    isCurrencyValid: {
      type: Boolean
    }
  },

  data() {
    return {
      inputBic: '',
      bankName: '',
      kor_schet: '',
      ras_schet: '',
      errorMsgBic: '',
      errorMsgBill: '',
      currency_type_error: '',
    }
  },

  computed: {
    ...mapGetters([
      'INPUT',
      'INPUT_ID',
      'FID',
      'VALIDATION_ERRORS',
      'FIRM',
      'BANKS_LIST',
      'BANK',
      'ADD_OR_CHANGE_BANK',
    ]),

    isDisabled() {
      if ((this.BANK[0].bic && this.BANK[0].ras_schet) && this.BANK[0].ras_schet.length === 20) {
        return false
      } 

      return true
    }
  },

  methods: {
    ...mapMutations([
      'SHOW_DIALOG', 'SET_NEW_BANK_FORM', 'SET_BANKS_LIST',
      'SET_BANK_FORM', 'SET_VALIDATION_ERR', 'SET_SHOW_PRELOADER'
    ]),
    ...mapActions([
      'SEND_BANK_TO_SERVER', 'GET_BANKS_FROM_DADATA', 'UPDATE_BANK'
    ]),

    showSuggestions() {
      this.SET_VALIDATION_ERR('clear')
      if (this.inputBic.length > 2) {
        this.GET_BANKS_FROM_DADATA(this.inputBic)
      }
    },

    selectBank(event) {
      this.inputBic = event.target.textContent.split(' ')[0]
      this.SET_NEW_BANK_FORM(this.inputBic) // заполняем поля формы
      this.updateForm() // заполняем поля формы
      this.SET_BANKS_LIST() // закрываем выпадающий список  
      this.$refs.ras_schet.focus()  // устанавливаем фокус 
    },

    onSubmit() {
      debugger
      this.SET_SHOW_PRELOADER(true)

      const form = {
        "name": this.BANK[0].name,
        "bic": this.BANK[0].bic,
        "ras_schet": this.BANK[0].ras_schet,
        "kor_schet": this.BANK[0].kor_schet,
      }
      const currency_type = this.BANK[0].ras_schet.slice(5, 8)

      if (currency_type !== "810") {
        this.currency_type_error = "Не верно указан номер рублёвого счета"
        setTimeout(() => { this.currency_type_error = "" }, 3000);
        this.SET_SHOW_PRELOADER(false)
        return
      }

      switch (this.ADD_OR_CHANGE_BANK) {
        case 'addNewBank':
          this.SEND_BANK_TO_SERVER(form)
            .then(() => {
              this.SET_SHOW_PRELOADER(false)
              this.SHOW_DIALOG('addCompanyDetails')
            }).catch(err => {
              this.SET_SHOW_PRELOADER(false)
              console.log(err)
            })
          break

        case 'changeBank':
          this.UPDATE_BANK(form)
            .then(() => {
              this.SET_SHOW_PRELOADER(false)
              this.SHOW_DIALOG('addCompanyDetails')
            }).catch(err => {
              this.SET_SHOW_PRELOADER(false)
              console.log(err)
            })
          break
      }

    },

    updateForm() { // обновляем данные при перезагрузке формы
      this.inputBic = this.BANK[0].bic
      this.bankName = this.BANK[0].name
      this.kor_schet = this.BANK[0].kor_schet
      this.ras_schet = this.BANK[0].ras_schet
    },

    setInput(event) {
      if (event.target.id === 'ИНН') {
        document.querySelector('.companiesDropDown').style.display = 'none'
        if (this.errorMsgBic) {
          return
        } else {
          document.querySelector('.companiesDropDown').style.display = 'flex'
          this.showSuggestions()
        }

      } else {
        this.errorMsgBill = numValidation(event)
        if (this.errorMsgBill) return
        if (this.ras_schet.length !== 20) {
          this.errorMsgBill = `Введите 20 цифр. Ceйчас ${this.ras_schet.length}`
          event.target.classList.add('invalid')
          this.SET_BANK_FORM(this.ras_schet)
        } else {
          this.errorMsgBill = ''
          event.target.classList.remove('invalid')
          this.SET_BANK_FORM(this.ras_schet)
        }
      }
    },
  },

  watch: {
    isCurrencyValid() {
      this.isCurrencyValid
        ? this.currency_type_error = ""
        : this.currency_type_error = 'Не верно указан номер рублёвого счета'
    },
  },

  mounted() {
    this.updateForm();
    if (this.$route.name !== "provider-signup") this.$refs.autofocus.focus()
    this.ras_schet = this.BANK[0].ras_schet ? this.BANK[0].ras_schet : ''
  }

}
</script>

<style lang="scss" scoped>
.input__wr {
  position: relative;
  width: 100%;

.marker {
  width: 4rem;
  height: 2rem;
  background-color: yellow;
  opacity: 0.3;
  position: absolute;
  top: 28%;
  left: 13%;

  @media (max-width: 600px) {
    left: 15%;
  }
}
}


.preloader {
  margin: 0 auto;
}

.btn-wr {
  @include flex(row, flex-start, center, 0px);
  margin-top: 45px;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
  }
}

.invalid {
  @include invalid;
}

.cursor {
  cursor: not-allowed;
}

.disabled {
  @include disabled;
}

.dropDownItem {
  @include dropDownItem;
}

.companiesDropDown {
  @include dropDown;
  position: absolute;
  top: 6rem;
  width: 82.5%;
  z-index: 1;

  @media (max-width: 600px) {
    top: 115px;
  }
}

.formElem__title {
  @include font(14px, 600, $font-color3);
  line-height: 3rem;
}

.input {
  @include input;
}

.inputBic {
  @include flex(column, center, flex-start, 0px);
  position: relative;
}

.bank-form {
  // width: 60rem;
  padding: 4.5rem 5.3rem;
  position: relative;

  @media (max-width: 600px) {
    padding: 1.5rem;
    width: 100%;
  }
}

.form-title {
  @include title_h2;
  margin-bottom: 4.5rem;
}

.form-title_signup {
  @include form-title;
}

.btn {
  @include myColorBtn(#FFFFFF, #339DFF, #339DFF);

  @media (max-width: 600px) {
    width: 100%;
  }
}

.error {
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.errorMsg {
  @include errorMsg
}</style>