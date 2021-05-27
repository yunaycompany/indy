<template>
  <main class="main main-cards">
    <b-alert show>Crear Esquema</b-alert>
    <div class="card mb-2">
      <b-form @submit="onSubmit" v-if="show" class="form-schema">
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
          <b-form-tags placeholder="Agregar atributo" input-id="tags-basic" v-model="form.attributes"></b-form-tags>
        </b-form-group>

        <div class="mt-4">
          <b-button type="submit" class="mr-2" variant="primary"
          >Crear
          </b-button
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
import {mapState} from "vuex";

export default {
  name: "Schema",
  data() {
    return {
      form: {
        name: "Job-Certificate",
        version: "",
        attributes: [
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
  created() {
    this.randomVersion()
  },
  methods: {
    randomVersion() {
      this.form.version = "1." + (new Date().getTime() % 100000).toString()
    },
    onSubmit(event) {
      event.preventDefault();
      this.form.walletHandle = this.user.user.walletHandle
      this.form.did = this.user && this.user.wallet ? this.user.wallet.DID : ''
      this.$store.dispatch("schema/createSchema", this.form);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.form-schema {
  min-height: 500px;
}

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

