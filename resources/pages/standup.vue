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
        <td class='text-xs-center element'>{{ new Date(props.item.standupDate).toLocaleDateString() }}</td>
        <td v-for='(im, itemIndex) in props.item.ratings' :key='itemIndex'>
          <project-status-picker
            :title='`${projects[itemIndex]? projects[itemIndex].code: ""} - select rating`'
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

  export default {
    fetch ({store, params}) {
      const promises = []
      const date = new Date()
      promises.push(axios.get('/api/projects',
        {
          params: {
            month: date.getMonth(),
            year: date.getFullYear(),
          }
        })
        .then(res => {
          store.commit('setProjects', res.data)
        })
      )

      promises.push(axios.get('/api/projectRatings',
        {
          params: {
            month: date.getMonth(),
            year: date.getFullYear(),
          }
        })
        .then(res => {
          store.commit('setProjectRatings', res.data)
        })
      )

      return Promise.all(promises)
    },
    computed: {
      headers: function () {
        const projects = this.projects.map(project => ({
          text: project.code,
          align: 'center',
          sortable: false,
          value: project.id,
        }))

        return [
          {
            text: 'Datum',
            align: 'left',
            sortable: false,
            value: 'Datum',
          },
          ...projects
        ]
      }
    },
    data () {
      return {
        ...this.$store.state,
      }
    },
    methods: {
      submitRating (project, rating) {
        console.log(project, rating)
      },
    },
    components: {
      ProjectStatusPicker,
    }
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
    font-size: 2em !important;
  }
</style>
