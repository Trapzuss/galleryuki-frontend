<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="tw-relative">
      <v-row no-gutters>
        <v-col
          cols="12"
          class="tw-h-[40vh] tw-bg-[center_top] tw-bg-cover tw-brightness-75 tw-blur-sm"
          :style="bannerImg('/images/yuukiC.jpg')"
        ></v-col>
        <v-col
          cols="12"
          class="tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%]"
        >
          <v-container class="tw-z-[10] tw-blur-none">
            <p
              class="tw-text-center tw-font-bold tw-text-8xl tw-drop-shadow-md tw-text-[#ebebeb]"
            >
              galleryuuki
            </p>
            <p
              class="tw-text-center tw-font-bold tw-text-2xl tw-text-[#ededed]"
            >
              <v-chip outlined color="#ebebeb">
                The Top amount of favorite in daily/weekly/monthly</v-chip
              >
            </p>
            <p
              class="tw-text-center tw-font-bold tw-text-4xl tw-text-[#ededed]"
            >
              <v-chip outlined color="#ebebeb">
                Be pround of your works.🎇</v-chip
              >
            </p>
          </v-container>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" xl="8">
      <v-container
        ><v-row no-gutters>
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
        </v-row></v-container
      >
    </v-col>
    <v-col cols="12" xl="8">
      <v-container>
        <v-card elevation="0">
          <v-row>
            <v-col cols="3" v-for="(post, i) in NewestPosts" :key="i">
              <v-card
                @click="routeTo(`/posts/${post._id}`)"
                outlined
                rounded="lg"
                class="hover:tw-bg-slate-100 tw-transition-all hover:tw-scale-[1.02]"
              >
                <v-img height="200px" contain :src="post.imageUrl"></v-img>
                <v-card-title
                  class="d-flex justify-start tw-cursor-pointer tw-opacity-75 hover:tw-opacity-100 tw-transition-opacity"
                >
                  {{ post.title }} -
                  <span class="tw-opacity-80 tw-text-[0.8em]">{{
                    post.description
                  }}</span>
                </v-card-title>
                <v-card-actions class="d-flex justify-end">
                  <v-chip
                    outlined
                    class="tw-relative tw-opacity-70"
                    color="secondary"
                    small
                    depressed
                  >
                    <v-icon color="red" left small>mdi-cards-heart</v-icon>
                    <span class="tw-font-Ubuntu tw-font-bold">{{
                      post.favoriteAmount
                    }}</span>
                  </v-chip>
                  <v-chip
                    outlined
                    class="tw-relative tw-opacity-70 tw-mx-2"
                    color="secondary"
                    small
                    depressed
                  >
                    <span class="tw-font-Ubuntu tw-font-bold">{{
                      post.category
                    }}</span>
                  </v-chip>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import auth from '~/mixins/auth'
import posts from '~/mixins/posts'
import utils from '~/mixins/utils'
export default mixins(posts, auth, utils).extend({
  layout: 'banner',
  async mounted() {
    this.NewestPosts = await this.getNewestPost()
  },
  computed: {},
  data() {
    return {
      filterList: ['no', 'ice', '🎇'],
      NewestPosts: [] as any,
    }
  },
  methods: {
    bannerImg(src: string) {
      try {
        return `background-image: url(${src}); `
      } catch (error) {
        return ''
      }
    },
  },
})
</script>
<style>
* {
  font-family: 'Ubuntu', 'san-serif';
}
</style>
