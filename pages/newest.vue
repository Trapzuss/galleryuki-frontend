<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="tw-bg-slate-300 tw-h-[40vh]">
      <v-container>
        <p class="tw-text-center tw-font-bold tw-text-8xl tw-drop-shadow-md">
          galleryuuki
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
          <v-col cols="4" v-for="(art, i) in NewestPosts" :key="i">
            <v-card
              @click="routeTo(`/posts/${art._id}`)"
              height="400px"
              outlined
              rounded="lg"
              class="hover:tw-bg-slate-100 tw-transition-all hover:tw-scale-105"
            >
              <v-img height="320px" contain :src="art.imageUrl"></v-img>
              <v-card-title
                class="d-flex justify-center tw-cursor-pointer tw-opacity-75 hover:tw-opacity-100 tw-transition-opacity"
                ><v-avatar
                  rounded="pill"
                  color="primary"
                  class="tw-mr-2"
                  size="32"
                  ><v-icon color="white">mdi-account</v-icon></v-avatar
                ><span>userDisplayName</span></v-card-title
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
import mixins from 'vue-typed-mixins'
import posts from '~/mixins/posts'
export default mixins(posts).extend({
  layout: 'banner',
  async mounted() {
    this.NewestPosts = await this.getNewestPost()
  },
  data() {
    return {
      filterList: ['no', 'ice', '🎇'],
      NewestPosts: [] as any,
    }
  },
})
</script>
<style>
* {
  font-family: 'Ubuntu', 'san-serif';
}
</style>
