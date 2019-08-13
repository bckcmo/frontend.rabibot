<template>
  <v-form
    v-model="valid"
    ref="form"
  >
    <v-alert
      v-for="error in errors"
      :value="error.message"
      :key="error.key"
      type="error"
    >
      {{error.message}}
    </v-alert>
    <v-text-field
      v-model="street"
      :rules="[rules.required(street, 'street address')]"
      label="street address"
    ></v-text-field>

    <v-text-field
      v-model="city"
      :rules="[rules.required(city, 'city')]"
      label="city"
    ></v-text-field>

    <v-layout row wrap>
      <v-flex
        xs12
        md8
        class="pr-2"
      >
        <v-select
          v-model="state"
          :items="states"
          :rules="[rules.required(state, 'state')]"
          label="state"
        ></v-select>
      </v-flex>

      <v-flex
        xs12
        md4
        class="pl-2"
      >
        <v-text-field
          v-model="zip"
          :rules="[
            rules.required(zip, 'zip'),
            rules.number,
            rules.equal(zip, 'zip', 5)
          ]"
          label="zip"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-btn :disabled="!valid" @click="submit">submit</v-btn>
  </v-form>
</template>

<script>
import rules from '~/utils/rules.js';
import data from '~/utils/data.js';

export default {
  data() {
    return {
      valid: false,
      street: '',
      city: '',
      state: '',
      zip: '',
      rules: rules,
      states: data.states,
      errors: []
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate();
      this.errors = [];
      this.$nuxt.$loading.start();

      try {
        let res = await this.$axios.post('screens', {
          address: this.street,
          city: this.city,
          state: this.state,
          zip: this.zip,
          isGeocoded: false,
        });

        this.$emit('update:result', {
          ej_result: res.data.data.ej_result,
          address: `${this.street}, ${this.city}, ${this.state}, ${this.zip}`
        });
      } catch (e) {
        let errors = e.response.data.data;
        for(let error in errors) {
          this.errors.push({key: error, message: errors[error][0]});
        }
      }

      this.$nuxt.$loading.finish();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
