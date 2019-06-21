<template>
  <v-form
    v-model="valid"
    ref="form"
    v-else
  >
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
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
