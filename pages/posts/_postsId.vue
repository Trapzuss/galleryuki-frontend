<template>
  <v-container fluid class="tw-font-Ubuntu">
    <v-row
      ><v-col cols="8">
        <v-card elevation="0" color="#ECECEC" rounded="md">
          <v-img eager :src="post.imageUrl" contain></v-img></v-card></v-col
      ><v-col cols="4"
        ><v-card elevation="0">
          <v-row no-gutters class="tw-p-4"
            ><v-col cols="12"
              ><v-avatar color="secondary" size="36" class="tw-mr-2"
                ><v-icon color="accent">mdi-account</v-icon></v-avatar
              ><span class="tw-font-bold tw-text-lg">{{
                userDisplayName
              }}</span>
            </v-col>
          </v-row>
          <v-row no-gutters class="tw-p-4">
            <v-col cols="12" class="tw-mb-3">
              <span class="tw-italic tw-text-sm tw-opacity-60">Title</span>
              <h4>{{ post.title }}</h4>
            </v-col>
            <v-col cols="12" class="tw-mb-3">
              <span class="tw-italic tw-text-sm tw-opacity-60"
                >Description</span
              >
              <p>{{ post.description }}</p>
            </v-col>
            <v-col cols="8" class="tw-mb-3">
              <span class="tw-italic tw-text-sm tw-opacity-60">Category</span>
              <p>{{ post.category }}</p>
            </v-col>

            <v-col cols="12" class="tw-rounded-md tw-bg-[#f2f2f2] tw-p-4">
              <v-btn
                fab
                :ripple="false"
                color="white"
                small
                depressed
                class="tw-opacity-90 active:tw-bg-red-500 focus:tw-outline-none focus:tw-ring focus:tw-ring-red-500 active:tw-scale-110 tw-transition-all"
                @click="favoritePost(post._id)"
              >
                <v-icon color="error">mdi-heart</v-icon>
              </v-btn>
              <span class="tw-font-medium"> {{ post.favoriteAmount }}</span>
            </v-col>
          </v-row></v-card
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import { Post } from '~/interfaces/Post.interface'
import auth from '~/mixins/auth'
import posts from '~/mixins/posts'
export default mixins(posts, auth).extend({
  async mounted() {
    this.post = await this.getPostById(this.$route.params.postsId)
  },
  data() {
    return {
      post: {} as Post,
    }
  },
  computed: {
    userDisplayName(): any {
      return this.post?.user?.userDisplayName
    },
  },
  methods: {
    async favoritePost(id: string) {
      await this.increaseFavorite(id)
      this.post.favoriteAmount++
    },
  },
})
</script>
<style></style>
