<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="headline">Register now to use RabiBot!</v-card-title>
      <v-card-text>
        <v-form
          v-model="valid"
          ref="form"
        >
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.validEmail]"
            label="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            label="password"
            :append-icon="showPw ? 'visibility' : 'visibility_off'"
            :type="showPw ? 'text' : 'password'"
            @click:append="showPw = !showPw"
          ></v-text-field>

          <v-text-field
            v-model="cPassword"
            :rules="[rules.required, rules.passwordMatch]"
            label="password confirmation"
            :append-icon="showCpw? 'visibility' : 'visibility_off'"
            :type="showCpw ? 'text' : 'password'"
            @click:append="showCpw = !showCpw"
          ></v-text-field>

          <v-btn :disabled="!valid" @click="submit">submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>


</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      cPassword: '',
      showPw: false,
      showCpw: false,
      rules: {
        required: value => !!value || 'This field is required',
        validEmail: email => /.+@.+/.test(email) || 'Email must be valid',
        passwordMatch: value => value && this.cPassword === this.password
          || 'Password and password confirmation must match',
      },
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
