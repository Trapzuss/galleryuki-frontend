<template>
  <v-container>
    <!-- <v-row justify="end" align="center" class="tw-bg-red-100 tw-rounded-md">
      <v-chip
        label
        color="primary"
        outlined
        @click="routeTo('/newest')"
        class="tw-font-Ubuntu tw-font-bold tw-text-gray-900 hover:tw-underline tw-cursor-pointer"
        >Newest</v-chip
      >
      <v-spacer></v-spacer>
      <span
        @click="routeTo('/newest')"
        class="tw-font-Ubuntu tw-font-bold tw-text-gray-900 tw-opacity-60 hover:tw-opacity-100 tw-cursor-pointer tw-mx-2"
        >View all <v-icon small>mdi-chevron-right</v-icon></span
      ></v-row
    > -->
    <v-row justify="center">
      <v-col cols="12" class="tw-font-bold tw-font-Ubuntu tw-text-[24px]">
        My posts
      </v-col>
    </v-row>

    <v-row v-if="posts.length != 0">
      <v-col
        v-for="(post, i) in posts"
        :key="i"
        class="d-flex child-flex"
        cols="2"
      >
        <v-hover #default="{ hover }">
          <v-card hover @click="routeTo(`/posts/${post._id}`)">
            <v-fab-transition>
              <div class="tw-absolute tw-right-0 tw-m-2 tw-z-[3]" v-if="hover">
                <v-chip
                  class="tw-z-[3] tw-relative"
                  color="white"
                  small
                  depressed
                >
                  <v-icon color="red" small left>mdi-cards-heart</v-icon>
                  <span class="tw-font-Ubuntu tw-text-gray-800 tw-font-bold">{{
                    post.favoriteAmount
                  }}</span>
                </v-chip>
              </div>
            </v-fab-transition>
            <v-sheet
              v-if="hover"
              class="tw-absolute tw-z-[2] tw-opacity-20"
              color="primary"
              height="100%"
              width="100%"
            ></v-sheet>
            <v-img :src="post.imageUrl" aspect-ratio="1" class="grey lighten-2">
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
    <v-row v-else align="center" justify="center">
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-row justify="center" align="center" class="tw-relative">
          <v-col cols="12" class="tw-absolute tw-font-Ubuntu tw-z-[3]">
            <p class="tw-font-bold tw-text-[48px] tw-text-center tw-text-white">
              Empty here.
            </p>
          </v-col>
          <v-avatar size="400" class="tw-opacity-75">
            <v-img :src="emptySrc"></v-img>
          </v-avatar>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import { Post } from '~/interfaces/Post.interface'
import posts from '~/mixins/posts'
import utils from '~/mixins/utils'
export default mixins(posts, utils).extend({
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      emptySrc: 'https://i.imgflip.com/4ew87t.jpg',
    }
  },
})
</script>
<style></style>
