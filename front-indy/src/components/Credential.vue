<template>
  <main class="main main-cards">
    <b-tabs content-class="mt-3">
      <b-tab title="ISSUER" active>
        <b-row>
          <b-col>
            <b-alert show>Crear Definicion de Credencial</b-alert>
            <div class="card mb-2">
              <b-form @submit="onSubmit" v-if="show">
                <b-form-group
                  id="schemaId"
                  label="Esquema:"
                  label-for="schemaId"
                >
                  <b-form-input
                    id="schemaId"
                    v-model="form.schemaId"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="tag" label="Tag:" label-for="tag">
                  <b-form-input
                    id="tag"
                    type="text"
                    v-model="form.tag"
                    required
                  ></b-form-input>
                </b-form-group>

                <div class="mt-4">
                  <b-button type="submit" variant="primary">Crear</b-button>
                </div>
              </b-form>
            </div>
          </b-col>
          <b-col>
            <b-alert show>Definicion de Credencial</b-alert>
            <div class="card">
              <pre class="m-0" v-if="credential.credDef">{{
                credential.credDef
              }}</pre>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-alert show>Enviar Oferta de Credencial</b-alert>
            <div class="card">
              <b-form @submit="onSubmitOffer" v-if="show">
                <b-form-group
                  id="credDefId"
                  label="Definicion de Credencial:"
                  label-for="credDefId"
                >
                  <b-form-input
                    id="credDefId"
                    type="text"
                    v-model="formOffer.credDefId"
                    required
                  ></b-form-input>
                </b-form-group>

                <div class="mt-4">
                  <b-button type="submit" class="mr-2" variant="primary"
                    >Enviar</b-button
                  >
                </div>
              </b-form>
            </div>
          </b-col>

          <b-col>
            <b-alert show>Datos de las Credencial</b-alert>
            <div class="card">
              <pre class="m-0" v-if="credential.credentialData">{{
                credential.credentialData
              }}</pre>
            </div>
          </b-col>
        </b-row>


        <b-row>
          <b-col>
            <b-alert show>Procesar y Emitir Credencial</b-alert>
            <div class="card">
              <b-form @submit="onSubmitCredential" v-if="show">
                <b-form-group
                  id="credReq"
                  label="Peticion de Credencial:"
                  label-for="credReq"
                >
                 <b-form-textarea
                    id="credReq"
                    v-model="formRequest.credReq"
                    rows="3"
                    required
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>


                <b-form-group
                  id="credOffer"
                  label="Oferta de Credencial:"
                  label-for="credOffer"
                >
                 <b-form-textarea
                    id="credOffer"
                    v-model="formRequest.credOffer"
                    rows="3"
                    required
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>

                <div class="mt-4">
                  <b-button type="submit" class="mr-2" variant="primary"
                    >Enviar</b-button
                  >
                </div>
              </b-form>
            </div>
          </b-col>

          <b-col>
            <b-alert show>Datos de las Credencial</b-alert>
            <div class="card">
              <pre class="m-0" v-if="credential.credentialData">{{
                credential.credentialData
              }}</pre>
            </div>
          </b-col>
        </b-row>
      </b-tab>

      <b-tab title="HOLDER">
        <b-row>
          <b-col>
            <b-alert show>Aceptar Peticion de Credencial</b-alert>
            <div class="card mb-2">
              <b-form @submit="onSubmitRequest" v-if="show">
                <b-form-group
                  id="credOffer"
                  label="Oferta de Credencial:"
                  label-for="credOffer"
                >
                  <b-form-textarea
                    id="credOffer"
                    v-model="formRequest.credOffer"
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
                    v-model="formRequest.defJson"
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
          </b-col>

          <b-col>
            <b-alert show>Respuesta de Aceptacion de Credencial</b-alert>
            <div class="card">
              <pre class="m-0" v-if="request.credReq">{{
                request.credReq
              }}</pre>
            </div>
          </b-col>
        </b-row>

      </b-tab>

      <b-row>
        <b-col>
          <b-alert show>Almacenar Credencial del Holder</b-alert>
          <div class="card mb-2">
            <b-form @submit="onSubmitStoreCredential" v-if="show">
              <b-form-group
                id="credReqMetadata"
                label="Metada de Credenciales:"
                label-for="credReqMetadata"
              >
                <b-form-textarea
                  id="credReqMetadata"
                  v-model="formStore.credReqMetadata"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group
                id="defJson"
                label="Definicion Credencial:"
                label-for="defJson"
              >
                <b-form-textarea
                  id="defJson"
                  v-model="formStore.defJson"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group
                id="credentialData"
                label="Datos de la Credencial:"
                label-for="credentialData"
              >
                <b-form-textarea
                  id="credentialData"
                  v-model="formStore.credentialData"
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
        </b-col>
        <b-col>
          <b-alert show>Id de la Credencial Guardada</b-alert>
          <div class="card">
            <pre class="m-0" v-if="credential.credentialStoreId">{{
              credential.credentialStoreId
            }}</pre>
          </div>
        </b-col>
      </b-row>
    </b-tabs>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Wallet",
  data() {
    return {
      form: {
        schemaId: "",
        tag: "Tag",
      },
      formOffer: {
        credDefId: "",
      },
      formRequest: {
        defJson: "",
        credOffer: "",
        masterSecretId: "",
      },
      formCredential: {
        credReq: "",
        credOffer: ""
      },
      formStore: {
        credReqMetadata: "",
        defJson: "",
        credentialData: "",
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
  created() {
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.form.did = this.user && this.user.wallet ? this.user.wallet.DID : "";
      this.form.walletHandle =
        this.user && this.user.user ? this.user.user.walletHandle : "";
      this.$store.dispatch("credential/createCredentialDefinition", this.form);
    },
    onSubmitOffer(event) {
      event.preventDefault();
      this.formOffer.walletHandle =
        this.user && this.user.user ? this.user.user.walletHandle : "";
      this.$store.dispatch("credential/createCredentialOffer", this.formOffer);
    },
    onSubmitRequest(event){
      event.preventDefault();
      this.formRequest.walletHandle =
        this.user && this.user.user ? this.user.user.walletHandle : "";
      this.formRequest.holderDID = this.user && this.user.wallet ? this.user.wallet.DID :''
      this.$store.dispatch("request/createMasterRequest", this.formRequest);
    },
    onSubmitCredential(event) {
      event.preventDefault();
      this.formOffer.walletHandle =
        this.user && this.user.user ? this.user.user.walletHandle : "";
      this.$store.dispatch("credential/sendCredential", this.formCredential);
    },
    onSubmitStoreCredential(event) {
      event.preventDefault();
      this.formStore.walletHandle =
        this.user && this.user.user ? this.user.user.walletHandle : "";
      this.$store.dispatch("credential/storeCredential", this.formStore);
    },
  },
  watch: {
   

    
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

