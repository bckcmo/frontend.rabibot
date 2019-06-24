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
        <AddressForm v-if="isGeocoded == 'false'"></AddressForm>
        <GpsForm :isGeocoded="isGeocoded == 'true'" v-else></GpsForm>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>


</template>

<script>
import AddressForm from '~/components/forms/AddressForm.vue';
import GpsForm from '~/components/forms/GpsForm.vue';

export default {
  middleware: 'authenticated',
  components: {
    AddressForm,
    GpsForm,
  },
  data() {
    return {
      isGeocoded: 'false',
    }
  }
}
</script>
