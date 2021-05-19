<template>
  <main class="main main-cards">
    <b-alert show>Crear Esquema</b-alert>
    <div class="card mb-2">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="schemaName"
          label="Nombre del Esquema:"
          label-for="schemaName"
        >
          <b-form-input
            id="schemaName"
            v-model="form.name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="schemaVersion"
          label="Version del Esquema:"
          label-for="schemaVersion"
        >
          <b-form-input
            id="schemaVersion"
            type="text"
            v-model="form.version"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="schemaAttributes"
          label="Atributos del Esquema:"
          label-for="schemaAttributes"
        >
          <b-form-textarea
            id="schemaAttributes"
            v-model="form.attributes"
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

    <b-alert show>Esquema</b-alert>
    <div class="card">
      <pre class="m-0" v-if="schema.schema">{{ schema.schema }}</pre>
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
        name: "Job-Certificate",
        version: "1",
        attributes:  [
          "first_name",
          "last_name",
          "salary",
          "employee_status",
          "experience",
        ],
      },
      show: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      schema: (state) => state.schema,
    }),
  },
  created(){
   
  },
  methods: {
    
    onSubmit(event) {
      event.preventDefault();
      this.form.walletHandle =this.user.user.walletHandle
      this.form.did = this.user && this.user.wallet ? this.user.wallet.DID :''
      this.$store.dispatch("schema/createSchema", this.form);
    }
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

  min-height: 300px;
  width: 100%;
}
</style>

