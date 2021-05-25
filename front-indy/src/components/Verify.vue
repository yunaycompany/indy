<template>
  <main class="main main-cards">
    <b-alert show>Solicitar Prueba</b-alert>
    <div class="card mb-2">
      <b-form @submit="onSubmitProof" v-if="show">
        <b-form-group id="name" label="Nombre de la prueba:" label-for="name">
          <b-form-input
            id="name"
            type="text"
            v-model="form.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="credDefId"
          label="ID Definicion de Credencial:"
          label-for="credDefId"
        >
          <b-form-input
            id="credDefId"
            type="text"
            v-model="form.credDefId"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="masterSecretId"
          label="ID Definicion de Credencial:"
          label-for="masterSecretId"
        >
          <b-form-input
            id="masterSecretId"
            type="text"
            v-model="form.masterSecretId"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="attributes" label="Atributos:" label-for="attributes">
          <b-form-textarea
            id="attributes"
            v-model="form.attributes"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <div class="mt-4">
          <b-button type="submit" class="mr-2" variant="primary"
            >Guardar</b-button
          >
        </div>
      </b-form>
    </div>
    <b-alert show>Id de la Credencial Guardada</b-alert>
    <div class="card">
      <pre class="m-0" v-if="verify.proofData">{{ verify.proofData }}</pre>
    </div>

    <div class="mt-4">
      <b-button
        type="button"
        @click="verifyProof"
        class="mr-2"
        variant="primary"
        >Verificar</b-button
      >
    </div>

    <b-alert show>ES VALIDA?</b-alert>
    <div class="card">
      <pre class="m-0" v-if="verify.verifyResponse">{{ verify.verifyResponse }}</pre>
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
        name: "Proof-Request",
        masterSecretId: "",
        credDefId: "",
        proofData: "",
        attributes: {
          attr1_referent: {
            name: "first_name",
            restrictions: [{ cred_def_id: this.credDefId }],
          },
          attr2_referent: {
            name: "last_name",
            restrictions: [{ cred_def_id: this.credDefId }],
          },
          attr3_referent: {
            name: "employee_status",
            restrictions: [{ cred_def_id: this.credDefId }],
          },
        },
      },

      show: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      schema: (state) => state.schema,
      credential: (state) => state.credential,
      verify: (state) => state.verify,
    }),
  },
  created() {},
  methods: {
    onSubmitProof(event) {
      event.preventDefault();
      this.form.holderDid =
        this.user && this.user.wallet ? this.user.wallet.DID : "";
      this.$store.dispatch("verify/proofOfRequest", this.form);
    },
    verifyProof(event) {
      event.preventDefault();
      this.form.verifierDid =
        this.user && this.user.wallet ? this.user.wallet.DID : "";
      this.$store.dispatch("verify/verify", this.form);
    },
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

