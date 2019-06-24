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
      :rules="[
        rules.required(password, 'password'),
        rules.match(cPassword, 'password', 'password confirmation', password)
        ]"
      label="password"
      :append-icon="showPw ? 'visibility' : 'visibility_off'"
      :type="showPw ? 'text' : 'password'"
      @click:append="showPw = !showPw"
    ></v-text-field>

    <v-text-field
      v-model="cPassword"
      :rules="[
        rules.required(cPassword, 'password confirmation'),
        rules.match(cPassword, 'password', 'password confirmation', password)
      ]"
      label="password confirmation"
      :append-icon="showCpw? 'visibility' : 'visibility_off'"
      :type="showCpw ? 'text' : 'password'"
      @click:append="showCpw = !showCpw"
    ></v-text-field>

    <v-btn :disabled="!valid" @click="register">submit</v-btn>
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
      cPassword: '',
      showPw: false,
      showCpw: false,
      rules: rules,
      errors: [],
    }
  },
  methods: {
    async register() {
      this.$refs.form.validate();
      this.errors = [];

      try {
        await this.$axios.post('register', {
          email: this.email,
          password: this.password,
          password_confirmation: this.cPassword,
        });

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        this.$router.push('/screens')
      } catch (e) {
        let errors = e.response.data.data;
        for(let error in errors) {
          this.errors.push(errors[error][0]);
        }
      }
    }
  }
}
</script>
