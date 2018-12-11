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
      @input="datePicked"
    >
    </v-text-field>
    <v-date-picker
      :first-day-of-week="1"
      v-model="modelDate"
      @input="datePicked"
      no-title
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
import { parse, format, setHours, getHours } from 'date-fns';

export default {
  name: 'DatePickerField',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Date,
      default: '',
    },
  },
  data() {
    return {
      modelDate: null,
      menuDate: false,
    };
  },
  created() {
    this.modelDate = this.value ? format(this.value, 'YYYY-MM-DD') : null;
  },
  computed: {
    dateFormatted() {
      return this.modelDate ? format(this.modelDate, 'D. M. YYYY') : '';
    },
  },
  methods: {
    datePicked(date) {
      this.menuDate = false;
      this.modelDate = date;

      if (!date) {
        this.$emit('input', null);
        return;
      }

      const currentDate = new Date();
      const parsedDate = parse(date);
      const resultDate = setHours(parsedDate, getHours(currentDate));

      this.$emit('input', resultDate);
    },
  },
  watch: {
    value(v) {
      this.modelDate = v ? format(v, 'YYYY-MM-DD') : null;
    },
  },
};
</script>
