<template>
  <v-menu
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    v-model="menuDate"
  >
    <v-text-field
      slot="activator"
      type="text"
      :label="label"
      append-icon="event"
      readonly
      clearable
      :value="dateFormatted"
      @input="date = $event"
    >
    </v-text-field>
    <v-date-picker
      :first-day-of-week="1"
      v-model="date"
      @input="menuDate = false"
      no-title
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'DatePickerField',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      date: null,
      menuDate: false,
    };
  },
  computed: {
    dateFormatted() {
      return this.date ? format(this.date, 'D. M. YYYY') : '';
    },
  },
  watch: {
    date(v) {
      this.$emit('input', v);
    },
  },
};
</script>
