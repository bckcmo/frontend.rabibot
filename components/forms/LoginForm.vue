<template>
  <v-form
    v-model="valid"
    ref="form"
  >
    <v-text-field
      v-model="email"
      :rules="[rules.required(email, 'email'), rules.format(email, 'email', /.+@.+/)]"
      label="email"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="[rules.required(password, 'password')]"
      label="password"
      :append-icon="showPw ? 'visibility' : 'visibility_off'"
      :type="showPw ? 'text' : 'password'"
      @click:append="showPw = !showPw"
    ></v-text-field>

    <v-btn :disabled="!valid" @click="submit">submit</v-btn>
  </v-form>
</template>

<script>
import rules from '~/utils/rules.js';

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      showPw: false,
      rules: rules
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate();
    }
  }
}
</script>
