<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          v-if="!item.checkAuth || isAuthenticated"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        to="/register"
        v-if="!isAuthenticated"
      >
        <v-icon title="register">person_add</v-icon>
      </v-btn>
      <v-btn
        icon
        to="/login"
        v-if="!isAuthenticated"
      >
        <v-icon title="login">exit_to_app</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="logout"
        v-if="isAuthenticated"
      >
        <v-icon title="logout">power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-parallax
      src="/ejscreen_shot.jpg"
      height=300
      class="hero-img"
      >
        <v-layout
          align-center
          column
          justify-center
          class="hero-text"
        >
          <h1 class="display-3 font-weight-thin mb-3">RabiBot</h1>
          <h4 class="title text-xs-center">The easy way to generate and manage EJSCREEN reports.</h4>
        </v-layout>
      </v-parallax>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      absolute
      app
      light
      height="auto"
      inset
    >
      <v-card width="100%">
        <v-card-text class="text-xs-center">
          <a href="https://www.epa.gov/environmentaljustice" target="_blank">
            To learn more about environmental justice, visit EPA's site.
          </a>
        </v-card-text>

        <v-divider />

        <v-card-text class="subheading text-xs-center">
          &copy; 2019 - <strong v-text="title"></strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: null,
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/',
          checkAuth: false
        },
        {
          icon: 'list_alt',
          title: 'My Screens',
          to: '/screens',
          checkAuth: true
        },
        {
          icon: 'add_circle_outline',
          title: 'New Screen',
          to: '/screens/new',
          checkAuth: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'RabiBot'
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
}
</script>

<style lang="css" scoped>
.hero-text {
  text-shadow: black 0.13em 0.13em 0.3em;
}
</style>
