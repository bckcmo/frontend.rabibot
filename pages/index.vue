<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">Welcome RabiBot</v-card-title>
        <v-card-text>
          <p>RabiBot simplifies the EJ screen process. Simply enter the address or the GPS coordinates of the location you need to screen. No more messing with an overly complicated interface. One form and you're done!</p>
          <p>Once the results are ready, you'll be given the option to send the screen reports to your email.</p>
          <p>You can also save screens, add notes, and come back anytime to view them again.</p>
          <p>Register today to get started!</p>
          <hr class="mt-4 mb-2">
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              flat
              left
              to="/register"
            >Register</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    // Logo,
    // VuetifyLogo
  }
}
</script>
