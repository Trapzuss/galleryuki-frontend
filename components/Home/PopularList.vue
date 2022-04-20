<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 6" :key="n" class="d-flex child-flex" cols="2">
        <v-hover #default="{ hover }">
          <v-card hover height="400px">
            <v-fab-transition>
              <div class="tw-absolute tw-right-0 tw-m-2 tw-z-[3]" v-if="hover">
                <v-btn class="tw-z-[3]" color="white" fab small depressed>
                  <!-- <v-icon color="red">mdi-cards-heart</v-icon> -->
                  <v-icon color="red">mdi-cards-heart-outline</v-icon>
                </v-btn>
              </div>
            </v-fab-transition>
            <v-sheet
              v-if="hover"
              class="tw-absolute tw-z-[2] tw-opacity-20"
              color="primary"
              height="100%"
              width="100%"
            ></v-sheet>
            <v-img
              width="100%"
              height="100%"
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style></style>
