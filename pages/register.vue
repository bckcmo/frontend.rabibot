<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="headline">Register now to use RabiBot!</v-card-title>
      <v-card-text>
        <RegistrationForm></RegistrationForm>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>


</template>

<script>
import RegistrationForm from '~/components/forms/RegistrationForm.vue';

export default {
  components: {
    RegistrationForm
  },
}
</script>
