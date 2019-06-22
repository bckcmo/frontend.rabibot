<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon
          small
          class="mr-2"
          v-on="on"
        >
          notes
        </v-icon>
      </template>
      <v-card>
        <v-card-title class="pb-0">
          <span class="headline">Notes</span>
        </v-card-title>
        <v-card-text>
          <v-textarea v-model="notes" :label="fullAddress"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updateNotes">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      item: Object
    },
    data() {
      return {
        dialog: false,
        notes: this.item.notes,
        fullAddress: '',
      }
    },
    methods: {
      closeDialog() {
        this.dialog = false;
        this.notes = this.item.notes;
      },
      updateNotes() {
        this.dialog = false;
        this.item.notes = this.notes;
      }
    },
    mounted() {
      this.fullAddress = `${this.item.address} ${this.item.city}, ${this.item.state} ${this.item.zip}`;
    }
  }
</script>

<style lang="css" scoped>
</style>
