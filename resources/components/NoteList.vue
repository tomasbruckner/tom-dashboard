<template>
  <div class="note-columns mx-3">
    <v-card v-for="(item, index) in notes" :key="index" color="brown lighten-5" class="note-card mt-3">
      <div class="pa-2">
        <v-layout row nowrap>
          <h2>{{ item.projectCode }}</h2>
          <v-spacer></v-spacer>
          <v-icon class="mr-1" size="20" @click="$emit('edit', item)">edit</v-icon>
          <v-icon size="20" @click="markNoteCompleted(item)" color="green">done</v-icon>
        </v-layout>
        <div class="note-text mb-2">{{ item.text }}</div>
        <v-divider></v-divider>
        <v-layout class="mt-1" row nowrap>
          <v-flex>
            {{ formatDate(item.created) }}
          </v-flex>
          <v-flex :class="getNoteDeadlineClass(item)">
            <v-icon :color="getNoteDeadlineIconColor(item)" size="16">schedule</v-icon>
            {{ formatDate(item.deadlineDate) }}
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </div>
</template>

<script>
import { format, parse, isPast, isToday } from 'date-fns';
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
    getNoteDeadlineClass (item) {
      const deadline = parse(item.deadlineDate);
      const today = isToday(deadline);

      return {
        'text-xs-right': true,
        'orange--text': today,
        'red--text': !today && isPast(deadline),
      };
    },
    getNoteDeadlineIconColor (item) {
      const deadline = parse(item.deadlineDate);

      if (isToday(deadline)) {
        return 'orange';
      } else if (isPast(deadline)) {
        return 'red';
      }

      return undefined;
    },
    formatDate (date) {
      return format(parse(date), 'D. M. YYYY');
    },
    markNoteCompleted (note) {
      if (confirm('Opravdu chcete označit poznámku za dokončenou?')) {
        this.$store.dispatch('markNoteCompleted', note.id);
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
  column-count: 5;
  column-gap: 20px;
  column-fill: balance;
}
.note-card {
  display: inline-block;
  width: 100%;
}
</style>
