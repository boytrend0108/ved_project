<template >
  <div   
     class="dialog" 
     :class="animation" 
     id="dialog-main" 
     v-if="showDialog"
     @click.self="clearForm" 
    >
    <section class="dialog__content" :style="{'max-height': maxHeight}">
     <font-awesome-icon icon="fa-solid fa-xmark " id="xmark" @click="clearForm" />
      <slot>
       
      </slot> 
    </section>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "my-dialog",
  emits:["close_dialog"],
  props: {
    showDialog: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isChanged: false, 
      from_country: "",
      from_address:'',
      to_city: "",
      to_address:"",
      addressFrom: {},
      factoryContact: {},
      additional_services: [],
      delivery_type: "",
      animation: "scale-in-ver-center",
      ras_schet: "",
      gross: "",
      cargo_volume: "",
      date_of_cargo_readiness: "",
      name: "",
      color: "",
      description: "",
      material: "",
      package:"",
      amount: "", 
      sample_for_replication: "",
      one_volume: "",
      brand_name: "",
      note: "",
      location_logo:"",
      is_logo:"",
      cities:"",
    }
  }, 

  computed:{
    ...mapGetters([
      "DIALOG",
      "COUNTRY",
      "CITY",
      "SELECTED_ID",
      "ADDRESS_FROM",
      "FACTORY_CONTACT",
      "SHIPPING",
      "SERVICES",
      "BTN_ID",
      "BANK",
      "WEIGHT",
      "CAPACITY",
      "QUANTITY",
      "DATE_OF_READINESS",
      "SEARCH_PRODUCT_APPL",
      "TO_ADDRESS",
      "SELECTED_ORDER", "FIRMS"
    ]),

    maxHeight() {
      if(window.innerWidth > 600) { 
        // return "600px"
        return "90%"
      } else {
        return document.documentElement.clientHeight + "px"
      }
    }
  }, 

  methods: {
    ...mapMutations([
      "SET_BIG_IMG_CHAT",
      "CLEAR_FORM", 
      "SHOW_DIALOG", 
      "SWITCH_DIALOG_WITH_CUSTOMER", 
      "SWITCH_SHOW_PROPOSAL_SENT_FORM",
      "SWITCH_SHOW_APPLICATION_FORM", 
      "SET_RESET_FORM_STATUS",
      "SET_SEND_SECOND_EMAIL",
      "SET_CLEAR_ADDITION_DATA",
      "SET_ADDRESS_FROM",
      "SET_FACTORY_CONTRACT",
      "SET_SHIPPING",
      "SET_SERVICE",
      "SET_CLEAR_SERVICES",
      "SET_SHOW_PDF_VIEWER",
      "SET_BANK_FORM",
      "SET_CLEAR_DATA",
      "SET_ADDITION_DATA",
      "SET_SEARCH_PRODUCT_APPL",
      "SET_SHOW_BURGER_MENU",
      "SET_SHOW_SIDE_FILTER",
      "SET_SHOW_FIND_MANAGER_FORM", 
      "CLEAR_SELECTED_ORDERS",
      "SET_CLEAR_SELECTED_ORDER_SERVICES",
      "SET_SERVICES_FOR_SELECTED_ORDER",
      "SET_SHIPPING_FOR_SELECTED_ORDER",
      "SET_ADDRESS_FROM_FOR_SELECTED_ORDER",
      "SET_FACTORY_CONTRACT_FOR_SELECTED_ORDER",
      "SET_VALUE_FOR_SELECTED_ORDER",
      "SET_COMPANY_DATA", 
      "SET_SHOW_SUCCESS_FORM",
      "SET_VALUE_FROM_APPLICATION_FORM",
      "SET_SELECTED_ID"
    ]),

    resetData() {
      console.log(this.SELECTED_ID)
      this.SET_BIG_IMG_CHAT('')
      this.SET_SHOW_SUCCESS_FORM(false)
      this.SET_SHOW_FIND_MANAGER_FORM(false)
      this.SET_SHOW_SIDE_FILTER(false)
      this.SET_SHOW_BURGER_MENU(false)
      this.SET_RESET_FORM_STATUS()
      this.SET_SEND_SECOND_EMAIL(false)
      this.SWITCH_DIALOG_WITH_CUSTOMER(false) // чтобы не отображалась форма диалога с заказчиком на странице /application_spec (надо как-то истравить)
      this.SWITCH_SHOW_PROPOSAL_SENT_FORM(false)
      this.SWITCH_SHOW_APPLICATION_FORM(false)
      this.animation = "scale-out-vertical"
    },

    clearForm() {
      debugger
      this.resetData();
      
      setTimeout(() => {
        if (this.DIALOG) this.SHOW_DIALOG()}, 1000);
        
        setTimeout(() => {
          this.SET_SHOW_PDF_VIEWER(false) 
        }, 1000);
        
        if(this.$route.query.form === "dialog") {
          this.$router.replace({ query: {} }) // чтобы удалить плейсхолдер 100 000 
        }
        
      if(this.SELECTED_ID === "country") {
        if(!this.isChanged) return;

        if (this.$route.name === "customer-order") {
          this.SET_VALUE_FOR_SELECTED_ORDER({key: "from_country", value: this.from_country})
        }

        if (this.$route.name === "customer-new-application") {
          this.SET_VALUE_FROM_APPLICATION_FORM({key: "country", value: this.from_country});
        }
      } 
    
      if(this.SELECTED_ID === "cities") {
        if(!this.isChanged) return

        if (this.$route.name === "customer-order") {
          this.SET_VALUE_FOR_SELECTED_ORDER({key: "to_city", value: this.to_city})
        }

        if (this.$route.name === "customer-new-application") {
          this.SET_VALUE_FROM_APPLICATION_FORM({key: "city", value: this.from_city});
          this.SET_ADDITION_DATA({nameOfInput: "toAddress", inputValue: this.to_address})
        }
      } 
    
      if(this.SELECTED_ID === "info1") {
        if(!this.isChanged) return
        if (this.$route.name === "customer-order") this.SET_ADDRESS_FROM_FOR_SELECTED_ORDER(this.addressFrom)
        else  this.SET_ADDRESS_FROM(JSON.parse(this.addressFrom))
      } 
    
      if(this.SELECTED_ID === "info2") {
        if(!this.isChanged) return
        if(this.$route.name === "customer-order") this.SET_FACTORY_CONTRACT_FOR_SELECTED_ORDER(this.factoryContact)
        else this.SET_FACTORY_CONTRACT(JSON.parse(this.factoryContact))
      } 
    
      if (this.SELECTED_ID === "delivery_type") {
        if(!this.isChanged) return
        this.SET_SHIPPING(this.delivery_type)
        this.SET_SHIPPING_FOR_SELECTED_ORDER(this.delivery_type)
      } 
    
      if (this.SELECTED_ID === "additional_services" ) {
        if(!this.isChanged) return
        const services = JSON.parse(this.additional_services)
        this.SET_CLEAR_SERVICES()
        this.SET_CLEAR_SELECTED_ORDER_SERVICES()
        services.forEach(element => {
          this.SET_SERVICE({checked: true, service: element})
          this.SET_SERVICES_FOR_SELECTED_ORDER({checked: true, service: element})
        });
      } 
    
      if (
        this.SELECTED_ID === "gross" 
        || this.SELECTED_ID === "cargo_volume" 
        || this.SELECTED_ID === "dateOfReadiness2" 
        || this.SELECTED_ID === "cities" 
      ) {  
        // из-за id календаря подменяем 
        if(this.SELECTED_ID === "dateOfReadiness2") {
          this.SELECTED_ID = "date_of_cargo_readiness"
        } 
  
        const data = {
          nameOfInput: this.SELECTED_ID === "dateOfReadiness2" ? "date_of_cargo_readiness" : this.SELECTED_ID ,
          inputValue: this.SELECTED_ID === "dateOfReadiness2" ? this.date_of_cargo_readiness : this[this.SELECTED_ID]
        }

        if(!this.isChanged) return 

        this.SET_ADDITION_DATA(data)
      } 
    
      if (
        this.SELECTED_ID === "description"
        || this.SELECTED_ID === "amount"
        || this.SELECTED_ID === "gross"
        || this.SELECTED_ID === "cargo_volume"
         ) {
        if(!this.isChanged) return
        this.SET_ADDITION_DATA({nameOfInput: "amount", inputValue: this.amount })
        this.SET_ADDITION_DATA({nameOfInput: "gross", inputValue: this.gross })
        this.SET_ADDITION_DATA({nameOfInput: "cargo_volume", inputValue: this.cargo_volume })
        this.SET_ADDITION_DATA({nameOfInput: "date_of_cargo_readiness", inputValue: this.date_of_cargo_readiness })
        this.SET_VALUE_FOR_SELECTED_ORDER({key: "description", value: this.description})
      }
    
      if (this.SELECTED_ID === "name") {
        if(!this.isChanged) return
        this.SET_VALUE_FOR_SELECTED_ORDER({key: "name", value: this.name})
      }
    
      if (this.SELECTED_ID === "is_logo") {
        if(!this.isChanged) return
        this.SET_VALUE_FOR_SELECTED_ORDER({key: "brand_name", value: this.brand_name})
        this.SET_VALUE_FOR_SELECTED_ORDER({key: "location_logo", value: this.location_logo})
      }
    
      if (this.BTN_ID === "addCompanyDetails") {
        if(!this.isChanged) return
         this.SET_BANK_FORM(this.ras_schet)
      } 
    
      if (this.BTN_ID === "addNewCompany") {
        if(!this.isChanged) return
         this.SET_COMPANY_DATA({key: "address_fact", value: this.address_fact})
         this.SET_COMPANY_DATA({key: "email", value: this.email})
         this.SET_COMPANY_DATA({key: "phone_number", value: this.phone_number})
      } 
      else {
        // search product service
        if(!this.isChanged) return 
        const payload = {
          id: this.SELECTED_ID,
          value: this[this.SELECTED_ID]
        }
        this.SET_SEARCH_PRODUCT_APPL(payload)
      }

      this.SET_SELECTED_ID(null)
      this.$emit("close_dialog")
    }
    
  },

  // чтобы следить изменялись ли данные на странице проверки заявки (надо переделать формы)
  watch: {
    FACTORY_CONTACT: {
      handler() {
        this.isChanged = true
      },
      deep: true
    },
  
    ADDRESS_FROM: {
      handler() {
          this.isChanged = true
      },
      deep: true
    },

    SHIPPING(){
      this.isChanged = true
    }, 

    SERVICES : {
      handler(){
       this.isChanged = true
      },
      deep: true
    },

    BANK: {
      handler() {
        this.isChanged = true
      },
      deep: true 
    },

    FIRMS: {
      handler() {
        this.isChanged = true
      },
      deep: true 
    },
   
    WEIGHT(){
      this.isChanged = true
    },

    CAPACITY(){
      this.isChanged = true
    },

    QUANTITY() {
      this.isChanged = true
    },
    
    DATE_OF_READINESS(){
     this.isChanged = true
    },
  
    TO_ADDRESS() {
      this.isChanged = true;
    },

    SEARCH_PRODUCT_APPL: {
      handler() {
        this.isChanged = true
      },
      deep: true 
    },

    SELECTED_ORDER: {
      handler() {
        this.isChanged = true
      },
      deep: true 
    }

  },

  mounted() {
    debugger
    if (this.$route.name === "customer-order") {
      this.to_city = this.SELECTED_ORDER.to_city
      this.addressFrom = {
        from_city: this.SELECTED_ORDER.from_city,
        from_address: this.SELECTED_ORDER.from_address,
      }
      this.additional_services = JSON.stringify(this.SELECTED_ORDER.additional_services)
      this.delivery_type = this.SELECTED_ORDER.delivery_type
      this.factoryContact = {
        agent_email: this.SELECTED_ORDER.agent_email,
        agent_fullname: this.SELECTED_ORDER.agent_fullname,
        agent_phone_number: this.SELECTED_ORDER.agent_phone_number
      }
      this.description = this.SELECTED_ORDER.description
      this.amount = this.SELECTED_ORDER.amount
      this.gross = this.SELECTED_ORDER.gross
      this.cargo_volume = this.SELECTED_ORDER.cargo_volume
      return
    } 

    this.addressFrom = JSON.stringify(this.ADDRESS_FROM)
    this.additional_services = JSON.stringify(this.SERVICES)
    this.delivery_type = this.SHIPPING
    this.factoryContact = JSON.stringify(this.FACTORY_CONTACT)

    this.from_country = this.SELECTED_ORDER.from_country || this.COUNTRY
    this.from_city = this.SELECTED_ORDER.from_city || this.CITY

    this.to_city = this.CITY
    this.to_address = this.TO_ADDRESS;
    
    this.delivery_type = this.SHIPPING  
    this.ras_schet = this.BANK[0].ras_schet
    this.gross = this.WEIGHT
    this.cargo_volume = this.CAPACITY 
    this.date_of_cargo_readiness = this.DATE_OF_READINESS
    this.name = this.SEARCH_PRODUCT_APPL.name
    this.color = this.SEARCH_PRODUCT_APPL.color
    this.description = this.SEARCH_PRODUCT_APPL.description
    this.material = this.SEARCH_PRODUCT_APPL.material
    this.package = this.SEARCH_PRODUCT_APPL.package
    this.amount = this.SEARCH_PRODUCT_APPL.amount || this.QUANTITY
    this.sample_for_replication = this.SEARCH_PRODUCT_APPL.sample_for_replication
    this.one_volume = this.SEARCH_PRODUCT_APPL.one_volume
    this.brand_name = this.SEARCH_PRODUCT_APPL.brand_name
    this.note = this.SEARCH_PRODUCT_APPL.note
    this.location_logo = this.SEARCH_PRODUCT_APPL.location_logo
    this.is_logo = this.SEARCH_PRODUCT_APPL.is_logo
    this.address_fact = this.FIRMS[0] ? this.FIRMS[0].address_fact : ""
    this.email = this.FIRMS[0] ? this.FIRMS[0].email : ""
    this.phone_number = this.FIRMS[0] ? this.FIRMS[0].phone_number : ""
  
  }

}
</script>

<style lang="scss" scoped>

.fa-xmark{ 
  @include fa-xmark;
}
.dialog{
  @include my-dialog;
}

.dialog__content{
  margin: auto;
  background-color: #fff;
  border-radius: 1.2rem;
  min-width: 35rem;
  overflow-y: auto; 
  position: relative;
  width: 60%;
  max-width: 600px;

  @media (max-width:600px) {
    min-width: 0;
    width: 100vw;
    border-radius: 0rem;
    margin: 0;
    max-height: 100vh !important;
    overflow: none;
    display: flex;
  }
}

::-webkit-scrollbar{
  width: 1rem;
  background-color: #F1F4FA;
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb{
  background:$main-color;
  border-radius: 5px;
  height: 5rem;
}

.scale-in-ver-center {
	-webkit-animation: scale-in-ver-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-ver-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

@-webkit-keyframes scale-in-ver-center {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
}
@keyframes scale-in-ver-center {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
}

}

.scale-out-vertical {
	-webkit-animation: scale-out-vertical 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	animation: scale-out-vertical 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;

@-webkit-keyframes scale-out-vertical {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
}
@keyframes scale-out-vertical {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
}

}

</style>