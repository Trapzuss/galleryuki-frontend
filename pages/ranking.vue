<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="tw-bg-slate-300 tw-h-[40vh]">
      <v-container>
        <p class="tw-text-center tw-font-bold tw-text-8xl tw-drop-shadow-md">
          Ranking
        </p>
        <p class="tw-text-center tw-font-bold tw-text-2xl">
          The Top amount of favorite in daily/weekly/monthly
        </p>
        <p class="tw-text-center tw-font-bold tw-text-4xl">
          Be pround of your works.
        </p>
      </v-container>
    </v-col>
    <v-col cols="12" xl="8">
      <v-row no-gutters>
        <v-chip
          outlined
          v-for="(title, i) in filterList"
          :key="i"
          class="tw-mr-4 tw-cursor-pointer"
          ><span
            class="tw-font-medium tw-text-xl tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-opacity tw-opacity-70 hover:tw-opacity-100 tw-ease-in-out"
          >
            {{ title }}
          </span></v-chip
        >
      </v-row>
    </v-col>
    <v-col cols="12" xl="8">
      <v-card elevation="0">
        <v-row>
          <v-col cols="4" v-for="(art, i) in 8" :key="i">
            <v-card height="400px" outlined rounded="lg">
              <v-img
                height="320px"
                contain
                src="https://static.zerochan.net/Konno.Yuuki.full.2189113.jpg"
              ></v-img>
              <v-card-title
                class="d-flex justify-center tw-cursor-pointer tw-opacity-75 hover:tw-opacity-100 tw-transition-opacity"
                ><v-avatar
                  rounded="pill"
                  color="primary"
                  class="tw-mr-2"
                  size="32"
                  ><v-icon color="white">mdi-account</v-icon></v-avatar
                ><span>Yuuki</span></v-card-title
              >
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'banner',
  data() {
    return {
      filterList: ['Daily', 'Weekly', 'Monthly'],
    }
  },
})
</script>
<style>
* {
  font-family: 'Ubuntu', 'san-serif';
}
</style>
