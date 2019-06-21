<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="screens"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.address }}, {{props.item.city}}, {{props.item.state}} {{props.item.zip}}</td>
        <td class="text-xs-right">{{Boolean(props.item.ej_result)}}</td>
        <td class="text-xs-right"><a :href="props.item.one_mile_report" target="_blank">One</a></td>
        <td class="text-xs-right"><a :href="props.item.blockgroup_report" target="_blank">Block</a></td>
        <td class="text-xs-right">{{formatDate(props.item.created_at)}}</td>
        <td class="text-xs-right">Actions</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

export default {
  components: {
    Screen,
  },
  data() {
    return {
      screens: [],
      headers: [
        {
          text: 'Address',
          align: 'left',
          sortable: false,
        },
        {text: 'EJ Result', value: 'ej_result'},
        {text: 'One Mile Report', sortable: false,},
        {text: 'Blockgroup Report', sortable: false,},
        {text: 'Date', value: 'created_at'},
        {text: 'Actions', sortable: false,}
      ]
    }
  },
  methods: {
    formatDate(screenDate) {
      return new Date(screenDate).toLocaleDateString('en-US');
    }
  },
  created: function() {
    let response = {
      "success": true,
      "data": {
        "screens": [
          {
            "id": 6,
            "address": "6675 W 119th St",
            "city": "Overland Park",
            "state": "Kansas",
            "zip": "66209",
            "one_mile_report": "https://ejscreen.epa.gov/mapper/EJSCREEN_report.aspx?geometry={\"x\":-94.6621744,\"y\":38.9123661,\"spatialReference\":{\"wkid\":4326}}&distance=1&unit=9035&areatype=blockgroup&areaid=&f=report",
            "blockgroup_report": "https://ejscreen.epa.gov/mapper EJSCREEN_report.aspx?geometry=&distance=&unit=9035&areatype=blockgroup&areaid=200910532011&f=report",
            "ej_result": 1,
            "user_id": 5,
            "created_at": "2019-06-10 18:44:35",
            "updated_at": "2019-06-10 18:44:35"
          },
          {
            "id": 7,
            "address": "6675 W 119th St",
            "city": "Overland Park",
            "state": "Kansas",
            "zip": "66209",
            "one_mile_report": "https://ejscreen.epa.gov/mapper/EJSCREEN_report.aspx?geometry={\"x\":-94.6621744,\"y\":38.9123661,\"spatialReference\":{\"wkid\":4326}}&distance=1&unit=9035&areatype=blockgroup&areaid=&f=report",
            "blockgroup_report": "https://ejscreen.epa.gov/mapper EJSCREEN_report.aspx?geometry=&distance=&unit=9035&areatype=blockgroup&areaid=200910532011&f=report",
            "ej_result": 0,
            "user_id": 5,
            "created_at": "2019-05-10 18:44:53",
            "updated_at": "2019-06-10 18:44:53"
          }
        ]
      },
      "message": "2 screens found"
    };

    if(response.success) {
      this.screens = response.data.screens
    }

    console.log(this.screens);

  }
}
</script>

<style lang="css" scoped>
</style>
