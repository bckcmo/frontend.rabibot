<template>
  <div>
    <v-card-text>The area surrouding {{result.address}} <strong><u> is{{!result.ej_result ? ' not' : '' }}</u></strong> an EJ area.</v-card-text>
    <v-card-text>Thank you for using RabiBot.
      <nuxt-link to="/screens">Click here to view all your saved screens and reports.</nuxt-link>
    </v-card-text>
    <v-card-text v-if="result.one_mile_report">
      <a :href="result.one_mile_report">View One Mile Report</a>
    </v-card-text>
    <v-card-text v-if="result.blockgroup_report">
      <a :href="result.blockgroup_report"> View Blockgroup Report</a>
    </v-card-text>
  </div>
</template>

<script>
import rules from '~/utils/rules.js';

export default {
  props: {
    result: Object,
  },
}
</script>

<style lang="css" scoped>
</style>
