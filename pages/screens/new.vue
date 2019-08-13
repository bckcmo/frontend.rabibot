<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="headline pb-0">{{result ? 'Results' : 'Run a New Screen'}} </v-card-title>
        <v-card-text v-if="!result">
          <v-radio-group v-model="isGeocoded" row>
            <v-radio label="Address" value="false" />
            <v-radio label="GPS Coordinates" value="true" />
          </v-radio-group>
          <AddressForm
            v-if="isGeocoded == 'false'"
            v-on:update:result="result = $event"
          />
          <GpsForm
            v-else
            :isGeocoded="isGeocoded == 'true'"
            v-on:update:result="result = $event"
          />
        </v-card-text>
        <v-flex v-else>
          <ScreenResults :result="result" />
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ScreenResults from '~/components/messages/ScreenResults.vue';
import AddressForm from '~/components/forms/AddressForm.vue';
import GpsForm from '~/components/forms/GpsForm.vue';

export default {
  middleware: 'authenticated',
  components: {
    ScreenResults,
    AddressForm,
    GpsForm,
  },
  data() {
    return {
      isGeocoded: 'false',
      isLoading: false,
      result: null,
    }
  },
  methods: {
    handleResults(result) {
      this.result = result;
      console.log(result);
    }
  }
}
</script>
