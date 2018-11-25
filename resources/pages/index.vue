<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 class="halfwidth">
      <v-img src='/intro.png'/>
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
  },
};
</script>

<style scoped>
.halfwidth {
  width: 50%;
}
</style>
