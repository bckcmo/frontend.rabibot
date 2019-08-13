<template>
  <v-container class="p-md-0">
    <v-data-table
      :headers="headers"
      :items="screens"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{formatAddress(props.item)}}</td>
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
            @click="emailItem(props.item)"
            class="mr-2"
          >
            email
          </v-icon>
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
import { mapGetters } from 'vuex';
import NotesDialog from '~/components/dialogs/NotesDialog.vue';

export default {
  middleware: 'authenticated',
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
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    formatDate(screenDate) {
      return new Date(screenDate).toLocaleDateString('en-US');
    },
    formatAddress(data) {
      return data.city ? `${data.address}, ${data.city}, ${data.state} ${data.zip}` : `${data.lat}, ${data.lng}`;
    },
    async deleteItem(item) {
      const location = this.formatLocation(item);
      if(confirm(`Are you sure you want to delete the screen for ${location}?`)) {
        this.$nuxt.$loading.start();
        event.target.parentElement.parentElement.classList = 'disable-row';
        try {
          await this.$axios.delete(`screens/${item.id}`);
          this.screens.splice(this.screens.indexOf(item), 1);
        } catch(e) {
          alert(`There was an issue deleting the screen for ${location}. Please try agian.`);
          event.target.parentElement.parentElement.classList = '';
        }
        this.$nuxt.$loading.finish();
      }
    },
    async emailItem(item) {
      const location = this.formatLocation(item);
      // TODO: Instead of alert, this should be done in a dialog
      if(confirm(`Are you sure you want to email the screen for ${location} to ${this.loggedInUser.email}?`)) {
        this.$nuxt.$loading.start();
        try {
          await this.$axios.post(`screens/email/${item.id}`);
          this.screens.splice(this.screens.indexOf(item), 1);
          alert(`An email was sent to ${this.loggedInUser.email}!`)
        } catch(e) {
          alert(`There was an issue emailing the screen for ${location}. Please try agian.`);
        }
        this.$nuxt.$loading.finish();
      }
    },
    formatLocation(item) {
      return `${item.address} ${item.city}, ${item.state} ${item.zip}`;
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start();
      try {
        let response = await this.$axios.get('screens');
        if(response.data.success) {
          this.screens = response.data.data.screens;
        }
      } catch (e) {
        // TODO: display an error to the user rather than just logging to console
        console.log(e.response);
      }
      this.$nuxt.$loading.start();
    })
  },
}
</script>

<style lang="css">
.disable-row {
  pointer-events: none;
  color: grey;
}
</style>
