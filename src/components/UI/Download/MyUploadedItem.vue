
<!--Show when document was downloaded-->
<template>
  <div class="wrapper" >
    <!-- :download="name" --> 
    <a 
      ref="link"  
      @click.stop 
      :href="href" 
      :download="name"
      class="downloadAria-done" 
      :class="{disabled: this.$route.path === '/customer', cursor: this.$route.path !== '/customer' }"
      target="_blank" 
    >
      <div>
        <img src="@/assets/images/icons/file.svg" alt="file">
        <p 
          class="item-title" 
          :data-tooltip="name"> {{ cuttedName }}
        </p>
      </div>
    </a> 
    <font-awesome-icon 
      icon="fa-solid fa-xmark"    
      @click="deleteItem"  
      v-if="showDeleteBtn"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'my-uploaded-item',
  
  data() {
    return {
      PATH: 'https://docs.google.com/viewer?url=https://static.delegat.online/',
    }
  },

  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    number: {
      type: [String, Number]
    }
  },

  computed: {
    ...mapGetters([
      'DOCS', 'SITE_ROLE'
    ]),
    // eslint-disable-next-line 
    href() {
      if (this.id === "provider_invoice") {
        switch (this.SITE_ROLE) {
          case "customer":
            return this.PATH + this.DOCS.provider_invoice_check[this.number].check_path;
          case "provider": 
            return this.PATH + this.DOCS.provider_invoice_check[this.number].invoice_path;
        }
      } else {
        return this.DOCS[this.id].href;
      }
    },
    // eslint-disable-next-line
    showDeleteBtn() {
      switch (this.SITE_ROLE) {
        case 'provider':
          if (this.id === "factory_contract" || this.id === "factory_invoice") return false;
          return true;
        case 'customer':
          if (this.$route.name === "customer-bills" || this.$route.name === "customer-contracts") return true;
          if (this.$route.query.status === "PUBLISHED" || this.$route.query.status === "IN_PROGRESS") return false;
          else return true;
      }
    },

    cuttedName() {
      return this.name.length > 30 ? this.name.substring(0, 10) + "..." : this.name;
    }
  },

  methods: {
    ...mapMutations([
      'SET_UPLOAD_DATA', "DELETE_BILL"
    ]),
    ...mapActions([
      'CHECK_FILE_EXIST',
      'GET_FILE_FROM_SERVER', "DELETE_BILL_FROM_SERVER"
    ]),

    deleteItem() {
      if (this.id === "provider_invoice") {
        switch (this.SITE_ROLE) {
          case "provider": this.DELETE_BILL_FROM_SERVER({ order_id: this.$route.params.id, invoice_id: this.DOCS.provider_invoice_check[this.number].id })
            break
          case "customer": this.DELETE_BILL(this.number)
        }
      } else {
        this.SET_UPLOAD_DATA({ name: '', file: '', href: '', id: `${this.id}`, url: '' })
      }
    },
  },

}

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 33.5rem;
  height: 15.5rem;
  background-color: #EEEEF0;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
    height: 10rem;
  }
}

.item-title {
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  text-align: center;
  width: 100%;
}

// #region tool-tip
[data-tooltip]::after {
  content: attr(data-tooltip);
  /* Выводим текст */
  position: absolute;
  /* Абсолютное позиционирование */
  width: 32rem;
  /* Ширина подсказки */
  left: 0;
  bottom: 0;
  /* Положение подсказки */
  background: $main-color;
  /* Синий цвет фона */
  color: #fff;
  /* Цвет текста */
  padding: 0.5em;
  /* Поля вокруг текста */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  /* Параметры тени */
  pointer-events: none;
  /* Подсказка */
  opacity: 0;
  /* Подсказка невидима */
  transition: 1s;
  /* Время появления подсказки */

  @media (max-width: 600px) {
    width: 85vw;
    bottom: 0rem;
  }

}

[data-tooltip]:hover::after {
  opacity: 1;
  /* Показываем подсказку */
  bottom: 3rem;
  /* Положение подсказки */
}

// #endregion

.disabled {
  cursor: not-allowed !important;
}

.cursor {
  cursor: pointer;
}

.fa-xmark {
  font-size: 2rem;
  color: $main-color;
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}</style>