<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$auth.$state.loggedIn">
        Přihlášen jako {{ $auth.user }}
        <v-btn @click="logout">Odhlásit</v-btn>
      </div>
      <v-dialog v-else v-model="loginDialog.isOpen" @keydown.enter="login" @keydown.esc="closeLoginDialog"
                max-width="600px">
        <v-btn slot="activator">Přihlásit</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Přihlásit</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field autofocus v-model="loginDialog.username" label="Přihlašovací jméno"
                                required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="loginDialog.password" label="Heslo" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeLoginDialog">Zavřít</v-btn>
            <v-btn color="blue darken-1" flat @click="login">Přihlásit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Dashboard', to: '/' },
        { icon: 'radio_button_unchecked', title: 'Standup', to: '/standup' },
        { icon: 'laptop_windows', title: 'Projekty', to: '/projects' },
        { icon: 'face', title: 'Uživatelé', to: '/users' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'From zero to hero!',
      loginDialog: {
        isOpen: false,
        password: '',
        username: '',
      },
    };
  },
  methods: {
    openLoginDialog () {
      this.loginDialog = {
        isOpen: true,
        password: '',
        username: '',
      };
    },
    closeLoginDialog () {
      this.loginDialog = {
        isOpen: false,
        password: '',
        username: '',
      };
    },
    login () {
      this.$auth.loginWith('local', {
        data: {
          username: this.loginDialog.username,
          password: this.loginDialog.password,
        },
      });
    },
    logout () {
      this.$auth.logout();
    },
  },
};
</script>
