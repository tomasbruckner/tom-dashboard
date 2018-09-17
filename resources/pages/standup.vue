<template>
  <v-layout column justify-center align-center>
    <v-data-table
      :headers='headers'
      :items='items'
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
      <template slot='items' slot-scope='props'>
        <td class='text-xs-center element'>{{ formatDate(props.item.standupDate) }}</td>
        <td v-for='(im, itemIndex) in props.item.ratings' :key='itemIndex'>
          <project-status-picker
            :title='`${im.projectCode? im.projectCode: ""} - select rating`'
            :project-rating-id='im.projectRatingId'
            :project-index='props.index'
            :rating-index='itemIndex'
          />
        </td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
  import axios from '~/plugins/axios'
  import ProjectStatusPicker from '../components/ProjectStatusPicker'
  import format from 'date-fns/format'
  import { mapState } from 'vuex'

  export default {
    fetch({ store, params }) {
      const promises = []
      const date = new Date()
      promises.push(axios.get('/api/projectsInstances',
        {
          params: {
            month: date.getMonth(),
            year: date.getFullYear(),
          },
        })
        .then(res => {
          store.commit('setProjectsInstances', res.data)
          store.commit('setProjects', res.data)
        }),
      )

      promises.push(axios.get('/api/projectRatings',
        {
          params: {
            month: date.getMonth(),
            year: date.getFullYear(),
          },
        })
        .then(res => {
          store.commit('setProjectRatings', res.data)
        }),
      )

      return Promise.all(promises)
    },
    computed: {
      ...mapState([
        'items',
        'projects',
        'projectInstances',
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
    },
    data() {
      return {}
    },
    methods: {
      formatDate(date) {
        const d = new Date(date)

        return format(d, 'DD/MM/YYYY')
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
