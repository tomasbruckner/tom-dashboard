<template>
  <v-layout row wrap>
    <v-flex v-for="(item, index) in notes" :key="index" md2 class="ma-3">
      <v-card color="brown lighten-5">
        <v-card-text>
          <div>
            <v-layout reverse row justify-space-between>
              <v-icon @click="() => markNoteCompleted(item.id)" color="green">done</v-icon>
              <h2>{{ item.projectCode }}</h2>
            </v-layout>
            <div>{{ item.text }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'note-list',
  props: [],
  data () {
    return {};
  },
  computed: {
    ...mapState([
      'notes',
    ]),
  },
  methods: {
    markNoteCompleted (noteId) {
      if (confirm('Opravdu chcete označit poznámku za dokončenou?')) {
        this.$store.dispatch('markNoteCompleted', noteId);
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 20%;
}
</style>
