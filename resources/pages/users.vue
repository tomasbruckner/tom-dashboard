<template>
  <v-layout column justify-center align-end>
    <v-btn @click="createNewUser()" color="primary" dark class="mb-2">Nový uživatel</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ modalTitle }}</span>
        </v-card-title>

        <v-form ref="form">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap column>
                <v-flex xs12 sm6 md4>
                  <v-text-field :rules="[rules.required]" v-model="modalItem.username"
                                label="Přihlašovací jméno"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :rules="[rules.required]" type="password" v-model="modalItem.password"
                                label="Heslo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :rules="[rules.required]" v-model="modalItem.firstName" label="Jméno"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :rules="[rules.required]" v-model="modalItem.lastName" label="Příjmení"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field :rules="[rules.required]" type="number" v-model="modalItem.totalExp"
                                label="Expy"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-checkbox
                    label="Aktivní"
                    v-model="modalItem.isActive"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Zrušit</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Uložit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers='headers'
      :items='users'
      item-key="id"
      hide-actions
      fill-height
      class='elevation-1 fullscreen'
    >
      <template slot='items' slot-scope='props'>
        <td class='text-xs-center element'>{{ `${props.item.firstName} ${props.item.lastName}` }}</td>
        <td class='text-xs-center element'>{{ props.item.username }}</td>
        <td class='text-xs-center element'>{{ props.item.totalExp }}</td>
        <td class='text-xs-center element'>{{ calculateLevel(props.item.totalExp) }}</td>
        <td class='text-xs-center element'>{{ props.item.isActive? 'ano' : 'ne' }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
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
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios';
import { mapState } from 'vuex';

export default {
  async fetch ({ store, params }) {
    await store.dispatch('getUsers');
  },
  computed: {
    ...mapState([
      'users',
    ]),
    headers: function () {
      return [
        {
          text: 'Jméno',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Přihlašovací jméno',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Expy',
          align: 'center',
          sortable: true,
          value: 'exp',
        },
        {
          text: 'Level',
          align: 'center',
          sortable: false,
          value: 'level',
        },
        {
          text: 'Aktivní',
          align: 'center',
          sortable: true,
          value: 'isActive',
        },
        {
          text: 'Akce',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ];
    },
  },
  data () {
    return {
      dialog: false,
      modalTitle: '',
      rules: {
        required: value => !!value || 'Povinné.',
      },
      modalItem: {
        id: null,
        firstName: '',
        lastName: '',
        password: '',
        totalExp: 0,
        isActive: true,
        username: '',
      },
      defaultModalItem: {
        id: null,
        firstName: '',
        lastName: '',
        password: '',
        totalExp: 0,
        isActive: true,
        username: '',
      },
    };
  },
  methods: {
    createNewUser () {
      this.modalItem = { ...this.defaultModalItem };
      this.modalTitle = 'Nový uživatel';
      this.dialog = true;
    },
    editItem (item) {
      this.modalItem = {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        totalExp: item.totalExp,
        isActive: item.isActive === 1,
        username: item.username,
      };

      this.modalTitle = 'Upravit uživatele';
      this.dialog = true;
    },
    async deleteItem (item) {
      const confirmed = confirm(`Opravdu chcete smazat uživatele ${item.firstName} ${item.lastName}?`);

      if (confirmed) {
        await axios.delete(`/api/users/${item.id}`);
        await this.$store.dispatch('getUsers');
      }
    },
    close () {
      this.dialog = false;
      this.modalItem = { ...this.defaultModalItem };
    },
    async save () {
      if (this.modalItem.id) {
        await axios.put(`/api/users/${this.modalItem.id}`,
          {
            ...this.modalItem,
          });
      } else {
        await axios.post('/api/users',
          {
            ...this.modalItem,
          });
      }

      await this.$store.dispatch('getUsers');
      this.dialog = false;
    },
    calculateLevel (totalExp) {
      const d = -500 + Math.sqrt(500 * 500 + 4 * 5 * totalExp);
      const result = d / (2 * 5);

      return Math.floor(result);
    },
  },
};
</script>

<style>
.fullscreen {
  width: 100%;
  height: 100%;
}

.element {
  font-size: 1.5em !important;
}

.header {
  font-size: 2em !important;
}
</style>
