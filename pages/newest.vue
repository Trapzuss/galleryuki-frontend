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
                Simple Gallery application</v-chip
              >
            </p>
            <!-- <p
              class="tw-text-center tw-font-bold tw-text-4xl tw-text-[#ededed]"
            >
              <v-chip outlined color="#ebebeb">
                Be pround of your works.🎇</v-chip
              >
            </p> -->
          </v-container>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" xl="8">
      <v-container
        ><v-row no-gutters>
          <v-chip filter class="tw-mr-2"
            ><v-icon>mdi-filter-variant</v-icon></v-chip
          >
          <v-btn
            rounded
            color="primary"
            @click="changeActiveTab(i)"
            :outlined="activeTab != i"
            v-for="(title, i) in filterList"
            :key="i"
            class="tw-mr-2 tw-cursor-pointer"
            ><span
              class="tw-font-medium tw-text-xl tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-opacity tw-opacity-70 hover:tw-opacity-100 tw-ease-in-out"
            >
              {{ title }}
            </span>
          </v-btn>
        </v-row></v-container
      >
    </v-col>
    <v-col cols="12" xl="8">
      <v-container>
        <v-card elevation="0">
          <v-row>
            <!-- {{ postsComputed.length }} -->
            <v-col cols="12" v-if="postsComputed.length == 0">
              <v-row justify="center" align="center" class="tw-relative">
                <v-col cols="12" class="tw-absolute tw-font-Ubuntu tw-z-[3]">
                  <p
                    class="tw-font-bold tw-text-[48px] tw-text-center tw-text-white"
                  >
                    Empty here.
                  </p>
                </v-col>
                <v-avatar size="400" class="tw-opacity-75">
                  <v-img
                    :src="emptySrc"
                    v-if="postsComputed.length == 0"
                  ></v-img>
                </v-avatar>
              </v-row>
            </v-col>

            <v-col cols="3" v-for="(post, i) in postsComputed" :key="i" v-else>
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
    this.postsComputed = this.NewestPosts
  },
  computed: {},

  data() {
    return {
      emptySrc: 'https://i.imgflip.com/4ew87t.jpg',
      activeTab: 0,
      filterList: ['All', 'Meme', 'Parody', 'Manga', 'Original', 'Drawing'],
      NewestPosts: [] as any,
      postsComputed: [],
    }
  },
  methods: {
    changeActiveTab(value: any) {
      try {
        this.activeTab = value
        let temp = this.NewestPosts
        let posts
        if (value == 0) {
          posts = temp
        } else {
          posts = temp.filter(
            (post: any) => post.category == this.filterList[value].toLowerCase()
          )
        }
        this.postsComputed = posts
      } catch (error) {
        console.log(error)
        return 0
      }
    },
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
