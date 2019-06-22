<template>
  <v-form
    v-model="valid"
    ref="form"
  >
    <v-alert
      v-for="error in errors"
      :value="error"
      type="error"
    >
      {{error}}
    </v-alert>
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

    <v-btn :disabled="!valid" @click="login">submit</v-btn>
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
      rules: rules,
      errors: [],
    }
  },
  methods: {
    async login() {
      this.$refs.form.validate();
      this.errors = [];

      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        });

        this.$router.push('/screens')
      } catch (e) {
        console.log(e.response);
        let errors = e.response.data.data;
        for(let error in errors) {
          this.errors.push(errors[error][0]);
        }
      }
    }
  }
}
</script>
