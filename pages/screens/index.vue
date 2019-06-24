<template>
  <v-container class="p-md-0">
    <v-data-table
      :headers="headers"
      :items="screens"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.address }}, {{props.item.city}}, {{props.item.state}} {{props.item.zip}}</td>
        <td class="text-xs-right">{{Boolean(props.item.ej_result)}}</td>
        <td class="text-xs-right"><a :href="props.item.one_mile_report" target="_blank">View Report</a></td>
        <td class="text-xs-right"><a :href="props.item.blockgroup_report" target="_blank">View Report</a></td>
        <td class="text-xs-right">{{formatDate(props.item.created_at)}}</td>
        <td class="text-xs-center px-0">
          <NotesDialog :item="props.item"></NotesDialog>
        </td>
        <td class="text-xs-center px-0 px-0">
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import NotesDialog from '~/components/dialogs/NotesDialog.vue'

export default {
  components: {
    NotesDialog,
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
        {text: 'Notes', sortable: false,},
        {text: 'Actions', sortable: false,}
      ],
    }
  },
  methods: {
    formatDate(screenDate) {
      return new Date(screenDate).toLocaleDateString('en-US');
    },
    async deleteItem (item) {
      const location = `${item.address} ${item.city}, ${item.state} ${item.zip}`
      if(confirm(`Are you sure you want to delete the screen for ${location}?`)) {
        try {
          await this.$axios.delete(`screens/${item.id}`);
          this.screens.splice(this.screens.indexOf(item), 1);
        } catch(e) {
          alert(`There was an issue deleting the screen for ${location}. Please try agian.`)
        }

      }
    },
  },
  created: async function() {
    try {
      let response = await this.$axios.get('screens');
      if(response.data.success) {
        this.screens = response.data.data.screens;
      }
    } catch (e) {
      console.log(e.response);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
