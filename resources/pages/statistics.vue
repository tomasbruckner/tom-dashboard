<template>
  <div>
    <v-layout row reverse>
      <v-flex md1 class="pad">
        <v-dialog
          ref="dialogMonth"
          v-model="statisticsMonthDialog.isOpen"
          :return-value.sync="statisticsMonthDialog.month"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="statisticsMonthDialog.month"
            label="Měsíc"
            append-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="statisticsMonthDialog.month" scrollable type="month">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="statisticsMonthDialog.isOpen = false">Zrušit</v-btn>
            <v-btn flat color="primary" @click="updateMonth($refs.dialogMonth)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

    <v-layout column justify-center align-end>
      <v-data-table
        :headers='headers'
        :items='projectStatistics'
        item-key="projectId"
        hide-actions
        fill-height
        must-sort
        class='elevation-1 fullscreen'
      >
        <template slot='items' slot-scope='props'>
          <td class='text-xs-center element'>{{ props.item.projectCode }}</td>
          <td class='text-xs-center element'>{{ props.item.exps }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  async fetch ({ store }) {
    const now = new Date();
    const params = {
      month: now.getMonth(),
      year: now.getFullYear(),
    };

    await store.dispatch('getProjectStatistics', params);
  },
  computed: {
    ...mapState([
      'projectStatistics',
    ]),
    headers: function () {
      return [
        {
          text: 'Projekt',
          align: 'center',
          sortable: true,
          value: 'projectCode',
        },
        {
          text: 'Expy za měsíc',
          align: 'center',
          sortable: true,
          value: 'exps',
        },
      ];
    },
  },
  data () {
    return {
      statisticsMonthDialog: {
        isOpen: false,
        month: null,
      },
    };
  },
  methods: {
    updateMonth (monthInput) {
      if (!this.statisticsMonthDialog.month) {
        this.statisticsMonthDialog.isOpen = false;
        return;
      }

      monthInput.save(this.statisticsMonthDialog.month);

      const [year, month] = this.statisticsMonthDialog.month.split('-');
      const selectedDate = {
        year: Number(year),
        month: Number(month) - 1,
      };

      this.$store.dispatch('getProjectStatistics', selectedDate);
      this.statisticsMonthDialog.isOpen = false;
    },
  },
};
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
