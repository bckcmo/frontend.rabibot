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
        <v-card-title class="headline">
          <span>
            Welcome
            <span v-if="isAuthenticated">Back</span>
            To RabiBot
          </span>
        </v-card-title>
        <v-card-text>
          <p>RabiBot simplifies the EJ screen process. Simply enter the address or the GPS coordinates of the location you need to screen. No more messing with an overly complicated interface. One form and you're done!</p>
          <p>Once the results are ready, an email with links to EJSCREEN reports will be sent to you.</p>
          <p>Screens are saved to your account, you can add notes to screens, and you can come back anytime to view them again.</p>
          <p v-if="!isAuthenticated">Register today to get started!</p>
          <hr class="mt-4 mb-2">
          <v-card-actions v-if="!isAuthenticated">
            <v-spacer/>
            <v-btn
              color="primary"
              flat
              left
              to="/register"
            >Register</v-btn>
            <v-btn
              color="primary"
              flat
              left
              to="/login"
            >Login</v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-spacer/>
            <v-btn
              color="primary"
              flat
              left
              to="/screens"
            >My Screens</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  mounted() {
    console.log(process.env.BASE_URL)
    console.log(process.env.NODE_ENV)
  },
}
</script>
