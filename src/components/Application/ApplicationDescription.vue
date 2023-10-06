<template>
  <section class="description">
  <my-text-area class="textaria-box"/>
  <div class="params">
    <my-weight-input class="input-box" name="amount" />
    <my-weight-input class="input-box" name="gross" />
    <my-weight-input class="input-box" name="cargo_volume" />
    <my-weight-input 
      class="input-box" 
      name="date_of_cargo_readiness" 
      type="date" 
      v-if="$route.name !== 'cost-calculation'"  
    />
  </div>
   <application-upload-foto class="uploadFoto" />
   <application-docs class="applicationDocsComp"/>     
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ApplicationUploadFoto from './ApplicationUploadFoto.vue';
import ApplicationDocs from './ApplicationDocs.vue';
import { numValidation } from '@/helpers/validation';

export default {
  components: { ApplicationUploadFoto, ApplicationDocs },
  name: 'application-description',
  data() {
    return {
      gross: '',
      cargo_volume: '',
      date_of_cargo_readiness: '',
      wrongWeight: false,
      wrongCapacity: false,
    }
  },

  computed: {
    ...mapGetters([
      'DOCS', 'WRONG_FILE', 'WEIGHT', 'CAPACITY', 'DATE_OF_READINESS'
    ]),
  },

  methods: {
    ...mapActions([
      'UPLOAD_DOCS'
    ]),
    ...mapMutations([
      'SET_CLEAR_INVOICE_AND_PLIST', 'SET_ADDITION_DATA'
    ]),

    saveValue(event) {
      const data = {
        nameOfInput: event.target.id,
        inputValue: this[event.target.id]
      }
      if (numValidation(event) === '') {
        this.SET_ADDITION_DATA(data)
      }
    },

    validate(event) {
      switch (event.target.id) {
        case 'gross':
          if (numValidation(event) === '') {
            this.wrongWeight = false
          } else this.wrongWeight = true
          break

        case 'cargo_volume':
          if (numValidation(event) === '') {
            this.wrongCapacity = false
          } else this.wrongCapacity = true
          break
      }
    }
  },

}
</script>

<style lang="scss" scoped>

.description{
  display: flex;
  flex-direction: column;
}

.textaria-box {
  margin-bottom: 4.5rem;

  @media (max-width:600px) {
    margin-bottom: 3rem;
  }
}

.params :last-child {
  margin-bottom: 0;
}

.input-box {
  max-width: 34rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    max-width: none;
    margin-bottom: 2rem;
  }
}

.uploadFoto{
  margin: 4.5rem 0;

  @media (max-width: 600px) {
    margin: 3rem 0;
  }
}

.applicationDocsComp {
  margin-top: 0;
}

</style>