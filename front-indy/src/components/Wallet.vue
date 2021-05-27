<template>
  <main class="main main-cards">
    <b-row>
      <b-col>
        <b-alert show>Crear Wallet</b-alert>
        <div class="card">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="walletName"
                label="Nombre de Wallet:"
                label-for="walletName"
            >
              <b-form-input
                  id="walletName"
                  v-model="form.name"
                  type="text"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group
                id="walletPassword"
                label="Contraseña de Wallet:"
                label-for="walletPassword"
            >
              <b-form-input
                  id="walletPassword"
                  type="password"
                  v-model="form.password"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group
                id="walletType"
                label="Tipo de Wallet:"
                label-for="walletType"
            >
              <b-form-select
                  id="walletType"
                  v-model="form.type"
                  :options="types"
                  required
              ></b-form-select>
            </b-form-group>
            <div class="mt-4">
              <b-button type="submit" class="mr-2" variant="primary"
              >Crear
              </b-button
              >
            </div>
          </b-form>
        </div>
      </b-col>
      <b-col>
        <b-alert show>DID</b-alert>
        <div class="card">
          <pre class="m-0" v-if="user.wallet">{{ user.wallet }}</pre>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-alert show>Login Wallet</b-alert>
        <div class="card">
          <b-form @submit="onSubmitLogin">
            <b-form-group
                id="walletNameLogin"
                label="Nombre de Wallet:"
                label-for="walletNameLogin"
            >
              <b-form-input
                  id="walletNameLogin"
                  v-model="formLogin.name"
                  type="text"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group
                id="walletPasswordLogin"
                label="Contraseña de Wallet:"
                label-for="walletPasswordLogin"
            >
              <b-form-input
                  id="walletPasswordLogin"
                  type="password"
                  v-model="formLogin.password"
                  required
              ></b-form-input>
            </b-form-group>
            <div class="mt-4">
              <b-button type="submit" class="mr-2 pr-2 " variant="primary"
              >Entrar
              </b-button>
              <b-button @click="logout" block type="button" variant="danger">
                Cerrar Wallet
              </b-button>
            </div>
          </b-form>
        </div>
      </b-col>
      <b-col>
        <b-alert show>Respuesta Login</b-alert>
        <div class="card">
          <pre class="m-0" v-if="user.user">{{ user.user }}</pre>
        </div>
      </b-col>
    </b-row>
  </main>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Wallet",
  data() {
    return {
      form: {
        name: "yoswallet",
        password: "123",
        type: "ISSUER",
      },
      formLogin: {
        name: "yoswallet",
        password: "123"
      },
      types: [
        {text: "Seleccione...", value: null},
        "ISSUER",
        "HOLDER",
        "VERIFIER",
      ],
      show: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("user/createWalletDid", this.form);
    },
    onSubmitLogin(event) {
      event.preventDefault();
      this.$store.dispatch("user/login", this.formLogin);
    },
    logout() {
      this.$store.dispatch("user/logout");
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
  column-count: 1;
  margin-left: 20px;
  margin-top: 20px;
}

.card {
  border: none;
  width: 100%;
}
</style>

