<template>
  <v-layout column justify-center align-end>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Nový projekt</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ modalTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap column>
              <v-flex xs12 sm6 md4>
                <v-text-field :rules="[rules.required]" v-model="modalItem.code" label="Projekt"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="modalItem.description" label="Popis"></v-text-field>
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
      </v-card>
    </v-dialog>

    <v-data-table
      :headers='headers'
      :items='allProjects'
      item-key="code"
      hide-actions
      fill-height
      class='elevation-1 fullscreen'
    >
      <template slot='items' slot-scope='props'>
        <td class='text-xs-center element'>{{ props.item.code }}</td>
        <td class='text-xs-center element'>{{ props.item.description }}</td>
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
  import ProjectStatusPicker from '../components/ProjectStatusPicker';
  import format from 'date-fns/format';

  export default {
    async fetch ({ store, params }) {
      await store.dispatch('getAllProjects');
    },
    computed: {
      ...mapState([
        'allProjects',
      ]),
      headers: function () {
        return [
          {
            text: 'Projekt',
            align: 'center',
            sortable: true,
            value: 'code',
          },
          {
            text: 'Popis',
            align: 'center',
            sortable: true,
            value: 'description',
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
        pagination: { sortBy: 'code' },
        dialog: false,
        modalTitle: 'Nový projekt',
        rules: {
          required: value => !!value || 'Povinné.',
        },
        modalItem: {
          id: null,
          code: '',
          description: '',
          isActive: true,
        },
        defaultModalItem: {
          id: null,
          code: '',
          description: '',
          isActive: true,
        },
      };
    },
    methods: {
      editItem (item) {
        this.modalItem = {
          id: item.id,
          code: item.code,
          description: item.description,
          isActive: item.isActive,
        };
        this.dialog = true;
      },
      async deleteItem (item) {
        const confirmed = confirm(`Opravdu chcete smazat projekt ${item.code}?`);

        if (confirmed) {
          await axios.delete(`/api/projects/${item.id}`);
          await this.$store.dispatch('getAllProjects');
        }
      },
      close () {
        this.dialog = false;
        this.modalItem = Object.assign(this.defaultModalItem);
      },
      async save () {
        if (this.modalItem.id) {
          await axios.put(`/api/projects/${this.modalItem.id}`,
            {
              ...this.modalItem,
            });
        } else {
          await axios.post('/api/projects',
            {
              ...this.modalItem,
            });
        }

        this.$store.dispatch('getProjects');
        await this.$store.dispatch('getAllProjects');
        this.modalItem = Object.assign(this.defaultModalItem);
        this.dialog = false;
      },
      formatDate (date) {
        if (!date) {
          return '';
        }

        const d = new Date(date);

        return format(d, 'DD/MM/YYYY');
      },
    },
    components: {
      ProjectStatusPicker,
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
