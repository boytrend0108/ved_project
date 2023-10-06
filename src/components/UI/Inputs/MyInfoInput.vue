<template>
    <div class="form__inputbox">
      <p class="label"> {{ inputName }} </p> 
      <input 
        :id="name"
        type="text"
        class="input"
        v-model.trim="value"
        @input="validation" 
        @blur="safeInput" 
      >
        <p class="error" v-show="errorMsg"> {{ errorMsg }} </p>
    </div>
   
</template>

<script>
import { phoneValidation, emailValidation } from "@/helpers/validation";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "my-info-input",
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      value: "",
      errorMsg: ""
    }
  },

  computed: {
    ...mapGetters([
      "ADDRESS_FROM", "FACTORY_CONTACT", "WEIGHT", "TO_ADDRESS", "SELECTED_ORDER"
    ]),

    inputName() {
      switch (this.name) {
        case "from_city": return "Город";
        case "from_address": return "Aдрес";
        case "agent_fullname": return "ФИО";
        case "agent_phone_number": return "Телефон";
        case "agent_email": return "Еmail";
        case "weight": return "Общий вес БРУТТО, кг";
        default: return "";
      }
    }

  },

  methods: {
    ...mapMutations([
      "SET_ADDITION_DATA", "SET_ADDITION_DATA_FOR_SELECTED_ORDER"
    ]),

    safeInput(event) {
      switch (this.name) {
        case "agent_phone_number":
          if (phoneValidation(event).length) {
            this.errorMsg = "Неверный формат телефоннного номера. Используйте цифры и знаки +, -, ()";
          } else this.errorMsg = '';
          break
        case "agent_email":
          this.errorMsg = emailValidation(event)
          break
      }

      if (this.errorMsg) return
      const data = {
        nameOfInput: this.name,
        inputValue: this.value
      }

      if (this.$route.name === "customer-order") this.SET_ADDITION_DATA_FOR_SELECTED_ORDER(data)
      else this.SET_ADDITION_DATA(data);

    },

    validation(event) {
      switch (this.name) {
        case "agent_phone_number":
          if (phoneValidation(event).length) {
            this.errorMsg = "Неверный формат телефоннного номера. Используйте цифры и знаки +, -, ()";
          } else this.errorMsg = '';
          break;
        case "agent_email":
          this.errorMsg = emailValidation(event);
          break;
      }

      if (!this.errorMsg) this.safeInput(event);
    }
  },

  mounted() {
    if (this.name === "from_city" || this.name === "from_address") {
      if (this.$route.name === "customer-order") {
        this.value = this.SELECTED_ORDER[this.name]
      } else this.value = this.ADDRESS_FROM[this.name]
    } else if (this.name === "weight") {
      this.value = this.WEIGHT
    } else if (this.name === "toAddress") {
      this.value = this.TO_ADDRESS;
    }
    else {
      if (this.$route.name === "customer-order") {
        this.value = this.SELECTED_ORDER[this.name]
      } else this.value = this.FACTORY_CONTACT[this.name];
    }
  }

}
</script>

<style lang="scss" scoped>

.error {
  @include font ( 2rem, bold, red);
  line-height: 2.1rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 1.9rem;
  }
}

.form__inputbox {
  margin-top: 2rem;
  position: relative;
}

.label {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #416782;
  text-align: left;
}

.form__input {
  height: 5rem;
}

.placeholder {
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #809FB8;
  position: absolute;
  top: 3.2rem;
  left: 2rem;
}

.input {
  @include input;
}

.invalid {
  @include invalid;
}

</style>