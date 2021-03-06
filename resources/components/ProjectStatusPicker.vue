<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="1080"
    >
      <div
        slot="activator"
        color="red lighten-2"
      >
        <i :class="getClassName()">{{ icon }}</i>
      </div>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <div class="flex-container">
            {{ `${date} - Vyberte hodnocení: ${projectName}` }}
            <v-icon
              @click="dialog = false"
              x-large
              class="material-icons"
            >
              remove
            </v-icon>
          </div>
        </v-card-title>

        <v-card-text class="myicon">
          <v-icon
            large
            class="material-icons custom-picker-font-size"
            @click="submit('HIATUS')"
          >
            remove
          </v-icon>
          <v-icon
            large
            class="material-icons red800 custom-picker-font-size"
            @click="submit('FAIL')"
          >
            close
          </v-icon>
          <v-icon
            large
            class="material-icons red800 custom-picker-font-size"
            @click="submit('BAD')"
          >
            radio_button_unchecked
          </v-icon>
          <v-icon
            large
            class="material-icons blue500 custom-picker-font-size"
            @click="submit('STANDARD')"
          >
            radio_button_unchecked
          </v-icon>
          <v-icon
            large
            class="material-icons green500 custom-picker-font-size"
            @click="submit('GOOD')"
          >
            radio_button_unchecked
          </v-icon>
          <v-icon
            large
            class="material-icons green500 custom-picker-font-size"
            @click="submit('AMAZING')"
          >
            done
          </v-icon>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import { mapState } from 'vuex';

export default {
  props: ['date', 'projectId', 'standupId', 'projectRating'],
  data () {
    return {
      dialog: false,
      className: 'material-icons',
    };
  },
  computed: {
    ...mapState([
      'projects',
    ]),
    icon () {
      return this.getRatingIconFromId(this.projectRating);
    },
    projectName () {
      return this.projects.find(p => p.id === this.projectId).code;
    },
  },
  methods: {
    getClassName () {
      let className = 'material-icons custom-font-size';
      switch (this.projectRating) {
        case 0:
          return className;
        case 1:
          return `${className} red800`;
        case 2:
          return `${className} red800`;
        case 3:
          return `${className} blue500`;
        case 4:
          return `${className} green500`;
        case 5:
          return `${className} green500`;
        default:
          return '';
      }
    },
    async submit (icon) {
      this.dialog = false;

      try {
        const ratingValue = this.getRatingId(icon);
        const ratingData = {
          projectId: this.projectId,
          ratingValueId: ratingValue,
          standupId: this.standupId,
        };

        this.$store.commit('updateRating', ratingData);
        await axios.post('/api/projectRatings', ratingData);
      } catch (e) {
        // TODO handle error
        console.error(e);
      }
    },
    getRatingId (icon) {
      switch (icon) {
        case 'HIATUS':
          return 0;
        case 'FAIL':
          return 1;
        case 'BAD':
          return 2;
        case 'STANDARD':
          return 3;
        case 'GOOD':
          return 4;
        case 'AMAZING':
          return 5;
      }
    },
    getRatingIcon (icon) {
      switch (icon) {
        case 'HIATUS':
          return 'remove';
        case 'FAIL':
          return 'close';
        case 'BAD':
          return 'radio_button_unchecked';
        case 'STANDARD':
          return 'radio_button_unchecked';
        case 'GOOD':
          return 'radio_button_unchecked';
        case 'AMAZING':
          return 'done';
      }
    },
    getRatingIconFromId (icon) {
      switch (icon) {
        case 0:
          return 'remove';
        case 1:
          return 'close';
        case 2:
          return 'radio_button_unchecked';
        case 3:
          return 'radio_button_unchecked';
        case 4:
          return 'radio_button_unchecked';
        case 5:
          return 'done';
      }
    },
  },
};
</script>

<style scoped>
.myicon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.material-icons.custom-picker-font-size {
  font-size: 1200% !important;
}

.material-icons.custom-font-size {
  font-size: 500% !important;
}

.material-icons.red800 {
  color: #c62828;
}

.material-icons.green500 {
  color: #4caf50;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.material-icons.blue500 {
  color: #3f51b5;
}
</style>
