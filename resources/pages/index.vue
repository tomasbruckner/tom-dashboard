<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class='text-xs-center'>
        <img src='/intro.png' alt='intro' class='mb-5'/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      headers: function () {
        const projects = this.projects.map(p => ({
          text: p,
          align: 'center',
          sortable: false,
          value: p,
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
  }
</script>
