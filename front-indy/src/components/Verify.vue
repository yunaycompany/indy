<template>
  <main class="main main-cards">
    <b-row>
      <b-col>
        <b-alert show>Verificar Prueba</b-alert>
        <div class="card mb-2">
          <b-form @submit="verifyProof" v-if="show">
            <b-form-group id="name" label="Nombre de la prueba:" label-for="name">
              <b-form-input
                  id="name"
                  type="text"
                  v-model="form.name"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="nonce" label="Nonce:" label-for="nonce">
              <b-form-input
                  id="nonce"
                  type="text"
                  v-model="form.nonce"
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
                label="Master ID de la Peticion de Credencial:"
                label-for="masterSecretId"
            >
              <b-form-input
                  id="masterSecretId"
                  type="text"
                  v-model="form.masterSecretId"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group
                id="proofData"
                label="Prueba de Datos:"
                label-for="proofData"
            >
              <b-form-textarea
                  id="credReq"
                  v-model="form.proofData"
                  rows="3"
                  required
                  max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="attributes" label="Atributos:" label-for="attributes">
              <v-jsoneditor v-model="form.attributes" :plus="false" height="200px"></v-jsoneditor>
            </b-form-group>

            <b-form-group id="attributes" label="Reglas:" label-for="attributes">
              <v-jsoneditor v-model="form.predicates" :plus="false" height="200px"></v-jsoneditor>
            </b-form-group>

            <div class="mt-4">
              <b-button type="submit" class="mr-2" variant="primary"
              >Guardar
              </b-button
              >
            </div>
          </b-form>
        </div>
      </b-col>
      <b-col>
        <b-alert show>Respuesta Solicitud de Prueba</b-alert>
        <div class="card">
          <pre class="m-0" v-if="verify.proofData">{{ verify.proofData }}</pre>
        </div>
      </b-col>
    </b-row>


    <b-alert show>ES VALIDA?</b-alert>
    <div class="card">
      <pre class="m-0" v-if="verify.verifyResponse">{{ verify.verifyResponse }}</pre>
    </div>
  </main>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Verify",

  data() {
    return {
      form: {
        name: "Proof-Request",
        masterSecretId: "",
        credDefId: "",
        proofData: "",
        nonce: "",
        attributes: {
          attr1_referent: {
            name: "first_name",
            restrictions: [{cred_def_id: 'ID DEFINICION CREDENCIAl'}],
          },
          attr2_referent: {
            name: "last_name",
            restrictions: [{cred_def_id: 'ID DEFINICION CREDENCIAl'}],
          },
          attr3_referent: {
            name: "employee_status",
            restrictions: [{cred_def_id: 'ID DEFINICION CREDENCIAl'}],
          },
        },
        predicates: {}
        /*{
      'name': 'salary',
      'p_type': '>=',
      'p_value': 5000,
      'restrictions': [{ 'cred_def_id': 'ID DEFINICION CREDENCIAl' }]
    }*/
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
  created() {
  },
  methods: {
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
  border: none;
  width: 100%;
}
</style>

