<template>
  <main class="main main-cards">
    <b-alert show>Crear Peticion de Credencial</b-alert>
    <div class="card mb-2">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="credOffer"
          label="Oferta de Credencial:"
          label-for="credOffer"
        >
          <b-form-textarea
            id="credOffer"
            v-model="form.credOffer"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          id="defJson"
          label="Definicion:"
          label-for="defJson"
        >
          <b-form-textarea
            id="defJson"
            v-model="form.defJson"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        

        <div class="mt-4">
          <b-button type="submit" class="mr-2" variant="primary"
            >Crear</b-button
          >
        </div>
      </b-form>
    </div>

    <b-alert show>Peticion de Credencial</b-alert>
    <div class="card">
      <pre class="m-0" v-if="request.credReq">{{ request.credReq }}</pre>
    </div>

    
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Wallet",
  data() {
    return {
      form: {
        defJson: "",
        credOffer: ""
      },
      show: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      schema: (state) => state.schema,
      credential: (state) => state.credential,
      request: (state) => state.request,
    }),
  },
  created(){
   
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.form.holderDID = this.user && this.user.wallet ? this.user.wallet.DID :''
      this.$store.dispatch("request/createMasterRequest", this.form);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-cards {
  column-count: 1;
  margin-left: 20px;
  margin-top: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  border: none;

  width: 100%;
}
</style>

