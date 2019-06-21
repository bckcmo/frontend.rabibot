<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="headline pb-0">Run a new screen.</v-card-title>
      <v-card-text>
        <v-radio-group v-model="isGeocoded" row>
          <v-radio label="Address" value="false"></v-radio>
          <v-radio label="GPS Coordinates" value="true"></v-radio>
        </v-radio-group>
        <v-form
          v-model="valid"
          ref="addressForm"
          v-if="isGeocoded == 'false'"
        >
          <v-text-field
            v-model="street"
            :rules="[rules.required]"
            label="street address"
          ></v-text-field>

          <v-text-field
            v-model="city"
            :rules="[rules.required]"
            label="city"
          ></v-text-field>

          <v-layout row wrap>
            <v-flex
              xs12
              md8
              class="pr-2"
            >
              <v-text-field
                v-model="state"
                :rules="[rules.required]"
                label="state"
              ></v-text-field>
            </v-flex>

            <v-flex
              xs12
              md4
              class="pl-2"
            >
              <v-text-field
                v-model="zip"
                :rules="[rules.required]"
                label="zip"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-btn :disabled="!valid" @click="submit">submit</v-btn>
        </v-form>

        <v-form
          v-model="valid"
          ref="gpsForm"
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
                :rules="[rules.required]"
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
                :rules="[rules.required]"
                label="longitude"
              ></v-text-field>
            </v-flex>
          </v-layout>
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
      isGeocoded: 'false',
      lat: '',
      long: '',
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
