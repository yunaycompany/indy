<template>
  <main class="main main-cards">

     <b-alert show>Crear Wallet</b-alert>
   <div class="card">
      <b-form @submit="onSubmit"   @reset="onReset" v-if="show">
        <b-form-group id="walletName" label="Nombre de Wallet:" label-for="walletName">
          <b-form-input
            id="walletName"
            v-model="form.name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="walletPassword" label="Contraseña de Wallet:" label-for="walletPassword">
          <b-form-input
            id="walletPassword"
            type="password"
            v-model="form.password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="walletType" label="Tipo de Wallet:" label-for="walletType">
        <b-form-select
          id="walletType"
          v-model="form.type"
          :options="types"
          required
        ></b-form-select>
      </b-form-group>
      <div class="mt-4">
      <b-button type="submit" class="mr-2"  variant="primary">Crear</b-button>
      </div>
      </b-form>
   </div>
    
     <b-alert show>Default Alert</b-alert>
<div class="card">
      <pre class="m-0">{{ form }}</pre>
</div>
  </main>
</template>

<script>
export default {
  name: "Wallet",
  data() {
    return {
      form: {
        name: "yoswallet",
        password: "123",
        type: "ISSUER"
      },
      types: [
        { text: "Seleccione...", value: null },
        "ISSUER",
        "HOLDER",
        "VERIFIER"
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch('user/createWalletDid', this.form)
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.password = "";
      this.form.name = "";
      this.form.type = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-cards {
  column-count: 2;
  margin-left: 20px;
  margin-top: 20px;

}

.card {
  display: flex;
  flex-direction: column;
  border: none;

  min-height: 250px;
  width: 100%;
}
</style>

