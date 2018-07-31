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
        <i :class="className">{{ icon }}</i>
      </div>

      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          <div class="flex-container">
            {{ title }}
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
                  class="material-icons custom-font-size"
                  @click="submit('remove')"
          >
            remove
          </v-icon>
          <v-icon
                  large
                  class="material-icons red800 custom-font-size"
                  @click="submit('close', 'red800')"
          >
            close
          </v-icon>
          <v-icon
                  large
                  class="material-icons red800 custom-font-size"
                  @click="submit('radio_button_unchecked', 'red800')"
          >
            radio_button_unchecked
          </v-icon>
          <v-icon
                  large
                  class="material-icons blue500 custom-font-size"
                  @click="submit('radio_button_unchecked', 'blue500')"
          >
            radio_button_unchecked
          </v-icon>
          <v-icon
                  large
                  class="material-icons green500 custom-font-size"
                  @click="submit('radio_button_unchecked', 'green500')"
          >
            radio_button_unchecked
          </v-icon>
          <v-icon
                  large
                  class="material-icons green500 custom-font-size"
                  @click="submit('done', 'green500')"
          >
            done
          </v-icon>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { ICONS } from '../constants/';

  export default {
    props: ['submitRating', 'title'],
    data() {
      return {
        dialog: false,
        className: 'material-icons',
        icon: 'remove',
      };
    },
    methods: {
      submit: function (icon, className = '') {
        this.icon = icon;
        this.className = `material-icons ${className}`;
        this.dialog = false;
      },
    }
  };
</script>

<style scoped>
  .myicon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .material-icons.custom-font-size {
    font-size: 10000% !important;
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
