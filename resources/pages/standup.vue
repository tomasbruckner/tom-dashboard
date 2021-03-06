<template>
  <div>
    <v-layout row reverse>

      <v-dialog v-model="noteDialog.isOpen" max-width="500px">
        <v-btn slot="activator" color="primary" right @click="resetNote">
          Přidat cíl
        </v-btn>
        <v-form @submit.prevent="createNote">
          <v-card>
            <v-card-title>
              <span class="headline">{{ noteDialogTitle }}</span>
            </v-card-title>
            <div class="mx-3">
              <v-layout column>
                <v-flex>
                  <v-combobox
                    v-model="noteDialog.selectedProject"
                    :items="projectNames"
                    required
                    label="Projekt"
                  ></v-combobox>
                </v-flex>
                <v-flex>
                  <date-picker-field v-model="noteDialog.deadlineDate" label="Deadline">
                  </date-picker-field>
                </v-flex>
                <v-flex>
                  <v-textarea v-model="noteDialog.note" label="Poznámka" required></v-textarea>
                </v-flex>
              </v-layout>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="resetNote">Zavřít</v-btn>
              <v-btn color="blue darken-1" flat type="submit">Uložit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-btn color="info" right @click="_ => createStandup()">Přidat standup</v-btn>

      <v-flex md1 class="pad">
        <v-dialog
          ref="dialogMonth"
          v-model="monthPickerIsOpen"
          :return-value.sync="modalItem.standupMonth"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="modalItem.standupMonth"
            label="Měsíc"
            append-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="modalItem.standupMonth" scrollable type="month">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="monthPickerIsOpen = false">Zrušit</v-btn>
            <v-btn flat color="primary" @click="updateStandup($refs.dialogMonth)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>

    </v-layout>

    <v-layout column justify-center align-center>

      <v-data-table
        :headers='headers'
        :items='rows'
        hide-actions
        fill-height
        no-data-text="Žádná data"
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
              :date="formatDate(item.standup.date)"
            />
          </td>
        </template>
      </v-data-table>
    </v-layout>
    <note-list @edit="editNote"></note-list>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import NoteList from '../components/NoteList';
import ProjectStatusPicker from '../components/ProjectStatusPicker';
import { parse, format, addWeeks, setDay } from 'date-fns';
import { mapState } from 'vuex';
import DatePickerField from '../components/DatePickerField'

export default {
  fetch ({ store, params }) {
    const promises = [];
    const date = new Date();
    const dateParams = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    promises.push(axios.get('/api/projects',
      { params: { isActive: true } },
      ).then(res => {
        store.commit('setProjects', res.data);
      }),
    );

    promises.push(axios.get('/api/projectRatings',
      { params: dateParams },
      ).then(res => {
        store.commit('setProjectRatings', res.data);
      }),
    );

    promises.push(axios.get('/api/notes')
      .then(res => {
        store.commit('setNotes', res.data);
      }),
    );

    return Promise.all(promises);
  },
  computed: {
    ...mapState([
      'notes',
      'projects',
      'standupRatings',
    ]),
    headers () {
      const projects = this.projects.map(project => ({
        text: project.code,
        align: 'center',
        sortable: false,
        value: project.code,
      }));

      return [
        {
          text: 'Datum',
          align: 'left',
          sortable: false,
          value: 'Datum',
        },
        ...projects,
      ];
    },
    rows () {
      return this.standupRatings.map(standup => ({
        standup: {
          id: standup.id,
          date: standup.date,
        },
        ratings: this.getRatings(standup),
      }));
    },
    projectNames () {
      return this.projects.map(p => ({
        text: p.code,
        value: p.id,
      }));
    },
    noteDialogTitle() {
      return this.noteDialog.id ? 'Upravení cíle' : 'Vytvoření cíle';
    },
  },
  data () {
    return {
      modalItem: {
        standupMonth: null,
      },
      monthPickerIsOpen: false,
      noteDialog: {
        isOpen: false,
        id: null,
        selectedProject: null,
        deadlineDate: null,
        note: '',
      },
      defaultNoteDialog: {
        isOpen: false,
        id: null,
        project: '',
        note: '',
        deadlineDate: null,
      },
    };
  },
  methods: {
    formatDate (date) {
      const d = new Date(date);

      return format(d, 'DD/MM/YYYY');
    },
    formatMonth (date) {
      const d = new Date(date);

      return format(d, 'MM-YYYY');
    },
    updateStandup (monthInput) {
      if (!this.modalItem.standupMonth) {
        this.monthPickerIsOpen = false;
        return;
      }

      monthInput.save(this.modalItem.standupMonth);

      const actualDate = new Date();

      const selectedDate = new Date();
      const [year, month] = this.modalItem.standupMonth.split('-');
      selectedDate.setFullYear(Number(year), Number(month) - 1);

      const isSameMonth = (selectedDate.getMonth() === actualDate.getMonth());
      const isSameYear = (selectedDate.getFullYear() === actualDate.getFullYear());

      if (isSameMonth && isSameYear) {
        this.$store.dispatch('getStandupData');
      } else {
        this.$store.dispatch('getProjectsForMonth', selectedDate);
      }

      this.monthPickerIsOpen = false;
    },
    getRatings (standup) {
      return this.projects.map(p => ({
        standupId: standup.id,
        projectId: p.id,
        rating: standup.standupProjectRating[p.id] || 0,
      }));
    },
    resetNote () {
      // set deadline to next monday
      let date = new Date();
      date = addWeeks(date, 1);
      date = setDay(date, 1);

      this.noteDialog = {
        ...this.defaultNoteDialog,
        deadlineDate: date,
      };
    },
    async createNote () {
      if (
        !this.noteDialog.note ||
        !this.noteDialog.deadlineDate ||
        !this.noteDialog.selectedProject ||
        !this.noteDialog.selectedProject.value) {
        return;
      }

      const { deadlineDate } = this.noteDialog;
      const note = {
        id: this.noteDialog.id,
        projectId: this.noteDialog.selectedProject.value,
        deadlineDate: deadlineDate.toISOString(),
        note: this.noteDialog.note,
      };

      if (note.id) {
        await this.$store.dispatch('editNote', note);
      } else {
        await this.$store.dispatch('createNote', note);
      }

      this.noteDialog.isOpen = false;
    },
    async editNote (note) {
      this.noteDialog = {
        isOpen: true,
        id: note.id,
        selectedProject: this.projectNames.find(v => v.value === note.projectId),
        deadlineDate: parse(note.deadlineDate),
        note: note.text,
      }
    },
    async createStandup (i) {
      await this.$store.dispatch('createStandup');
    },
  },
  components: {
    DatePickerField,
    ProjectStatusPicker,
    NoteList,
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

.pad {
  padding-right: 2%;
}

.header {
  font-size: 3em !important;
}
</style>
