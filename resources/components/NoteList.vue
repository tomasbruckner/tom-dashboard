<template>
  <div class="note-columns mx-3">
    <v-card v-for="(item, index) in notes" :key="index" color="brown lighten-5" class="note-card mt-3">
      <v-card-text>
        <v-layout row nowrap>
          <h2>{{ item.projectCode }}</h2>
          <v-spacer></v-spacer>
          <v-icon @click="markNoteCompleted(item.id)" color="green">done</v-icon>
        </v-layout>
        <div class="note-text">{{ item.text }}</div>
      </v-card-text>
    </v-card>
  </div>
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
.note-text {
  white-space: pre-wrap;
}
.note-columns {
  column-count: 6;
  column-gap: 20px;
  column-fill: balance;
}
.note-card {
  display: inline-block;
  width: 100%;
}
</style>
