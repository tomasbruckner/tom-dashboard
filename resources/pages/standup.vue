<template>
  <div>
    <v-layout row reverse>
      <v-btn color="error" right @click="_ => createStandup()">Přidat standup</v-btn>

      <v-dialog v-model="noteDialog.isOpen" persistent max-width="500px">
        <v-btn slot="activator" color="primary" right>Přidat poznámku</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Přidat poznámku</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <v-autocomplete
                    :items="projectNames"
                    label="Projekt"
                    multiple
                    chips
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12>
                  <v-textarea label="Poznámka" required></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeNoteDialog()">Zavřít</v-btn>
            <v-btn color="blue darken-1" flat @click.native="createNote()">Uložit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>

    <v-layout column justify-center align-center>

      <v-data-table
        :headers='headers'
        :items='rows'
        hide-actions
        fill-height
        class='elevation-1 fullscreen'
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="h in props.headers">
              <div class="text-xs-center header">{{ h.text }}</div>
            </th>
          </tr>
        </template>
        <template slot='items' slot-scope='{ item }'>
          <td class='text-xs-center element'>{{ formatDate(item.standup.date) }}</td>

          <td v-for='(i, itemIndex) in item.ratings' :key='itemIndex'>
          <project-status-picker
          :project-rating='i.rating'
          :project-id='i.projectId'
          :standup-id='i.standupId'
          />
          </td>
        </template>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';
  import ProjectStatusPicker from '../components/ProjectStatusPicker';
  import format from 'date-fns/format';
  import { mapState } from 'vuex';

  export default {
    fetch ({ store, params }) {
      const promises = []
      const date = new Date()
      const dateParams = {
        month: date.getMonth(),
        year: date.getFullYear(),
      }

      promises.push(axios.get('/api/projects',
        { params: { isActive: true } },
        ).then(res => {
          store.commit('setProjects', res.data)
        }),
      )

      promises.push(axios.get('/api/projectRatings',
        { params: dateParams },
        ).then(res => {
          store.commit('setProjectRatings', res.data)
        }),
      )

      return Promise.all(promises)
    },
    computed: {
      ...mapState([
        'projects',
        'standupRatings',
      ]),
      headers: function () {
        const projects = this.projects.map(project => ({
          text: project.code,
          align: 'center',
          sortable: false,
          value: project.code,
        }))

        return [
          {
            text: 'Datum',
            align: 'left',
            sortable: false,
            value: 'Datum',
          },
          ...projects,
        ]
      },
      rows: function () {
        return this.standupRatings.map(standup => ({
          standup: {
            id: standup.id,
            date: standup.date,
          },
          ratings: this.getRatings(standup),
        }))
      },
    },
    data () {
      return {
        noteDialog: {
          isOpen: false,
          project: '',
          note: '',
        },
        defaultNoteDialog: {
          isOpen: false,
          project: '',
          note: '',
        },
      }
    },
    methods: {
      formatDate (date) {
        const d = new Date(date)

        return format(d, 'DD/MM/YYYY')
      },
      getRatings(standup) {
        return this.projects.map(p => ({
          standupId: standup.id,
          projectId: p.id,
          rating: standup.standupProjectRating[p.id] || 0,
        }));
      },
      closeNoteDialog() {
        this.noteDialog = { ...this.defaultNoteDialog }
      },
      async createNote() {
        await this.$store.dispatch('createNote')
      },
      async createStandup(i) {
        await this.$store.dispatch('createStandup')
      },
    },
    components: {
      ProjectStatusPicker,
    },
  }
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
    font-size: 3em !important;
  }
</style>
