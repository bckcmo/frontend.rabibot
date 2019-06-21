<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="headline">Welcome Back! Login to pick up where you left off.</v-card-title>
      <v-card-text>
        <LoginForm></LoginForm>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>


</template>

<script>
import LoginForm from '~/components/forms/LoginForm.vue';

export default {
  components: {
    LoginForm
  },
}
</script>

<style lang="css" scoped>
</style>
