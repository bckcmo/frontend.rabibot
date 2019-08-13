<template>
  <v-form
    v-model="valid"
    ref="form"
    v-else
  >
    <v-alert
      v-for="error in errors"
      :value="error.message"
      :key="error.key"
      type="error"
    >
      {{error.message}}
    </v-alert>
    <v-layout row wrap>
      <v-flex
        xs12
        md6
        class="pr-2"
      >
        <v-text-field
          v-model="lat"
          :rules="[
            rules.required(lat, 'lattitude'),
            rules.number,
            rules.range(lat, 'lattitude', -90, 90)
          ]"
          label="lattitude"
        ></v-text-field>
      </v-flex>

      <v-flex
        xs12
        md6
        class="pl-2"
      >
        <v-text-field
          v-model="long"
          :rules="[
            rules.required(long, 'longitude'),
            rules.number,
            rules.range(long, 'longitude', -180, 180)
          ]"
          label="longitude"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-btn :disabled="!valid" @click="submit">submit</v-btn>
  </v-form>
</template>

<script>
import rules from '~/utils/rules.js';

export default {
  props: {
    isGeocoded: Boolean,
  },
  data() {
    return {
      valid: false,
      lat: '',
      long: '',
      rules: rules,
      errors: []
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate();
      this.errors = [];
      this.valid = false;
      this.$nuxt.$loading.start();

      try {
        let res = await this.$axios.post('screens', {
          lat: this.lat,
          lng: this.long,
          isGeocoded: true,
        });
        this.$emit('update:result', {ej_result: res.data.data.ej_result, address: `${this.lat}, ${this.long}`});
      } catch (e) {
        this.valid = true;
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
