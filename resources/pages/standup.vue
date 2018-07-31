<template>
  <v-layout column justify-center align-center>
    <v-data-table
      :headers='headers'
      :items='items'
      hide-actions
      class='elevation-1 fullscreen'
    >
      <template slot='items' slot-scope='props'>
        <td class='text-xs-center'>{{ new Date(props.item.standupDate).toLocaleDateString() }}</td>
        <td v-for='(im, itemIndex) in props.item.ratings' :key='itemIndex'>
          <project-status-picker
            :title='`${projects[itemIndex]} - select rating for ${props.item.date}`'
            :submit-rating='$store.commit.bind(this, props.index, itemIndex)'
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
      const promises = [];

      promises.push(axios.get('http://localhost:3333/api/projects')
        .then(res => {
          store.commit('setProjects', res.data)
        })
      );

      promises.push(axios.get('http://localhost:3333/api/projectRatings')
        .then(res => {
          store.commit('setProjectRatings', res.data)
        })
      );

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
    font-size: 20em;
  }
</style>
