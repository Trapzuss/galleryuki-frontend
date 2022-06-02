<template>
  <v-container fluid class="tw-font-Ubuntu">
    <v-row
      ><v-col cols="8">
        <v-card elevation="0" color="#ECECEC" rounded="md">
          <v-img eager :src="post.imageUrl" contain></v-img></v-card></v-col
      ><v-col cols="4"
        ><v-card elevation="0">
          <v-row no-gutters class="tw-p-4 tw-shadow-md tw-my-2 tw-rounded-md"
            ><v-col cols="12"
              ><v-avatar color="secondary" size="36" class="tw-mr-2">
                <v-img contain :src="avatarPath"></v-img>
                <!-- <v-icon color="accent">mdi-account</v-icon> -->
              </v-avatar>
              <span class="tw-font-bold tw-text-lg">{{ userDisplayName }}</span>
            </v-col>
          </v-row>
          <v-row no-gutters class="tw-p-4 tw-shadow-md tw-my-2 tw-rounded-md">
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

            <v-col cols="12" class="tw-rounded-md tw-p-4">
              <v-row justify="space-between">
                <div>
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
                </div>
                <div v-if="isOwner">
                  <v-btn icon color="warning" @click="routeToEdit">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-row>
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
import utils from '~/mixins/utils'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/big-ears'
export default mixins(posts, auth, utils).extend({
  async mounted() {
    this.post = await this.getPostById(this.$route.params.postsId)
  },
  data() {
    return {
      post: {} as Post,
    }
  },
  computed: {
    avatarPath(): any {
      const randomString = Math.random().toString(36).substring(2, 15)
      let svg = createAvatar(style, {
        dataUri: true,
        seed: randomString,
        backgroundColor: '#f8f8f8',
        // ... and other options
      })
      return this.isOwner ? this.image_url : svg
    },
    isOwner(): boolean {
      try {
        return this.post?.user?._id === this.user?._id
      } catch (error) {
        return false
      }
    },
    userDisplayName(): any {
      return this.post?.user?.userDisplayName
    },
  },
  methods: {
    routeToEdit() {
      this.$router.push(`/edit/post/${this.post?._id}`)
    },
    async favoritePost(id: string) {
      await this.increaseFavorite(id)
      this.post.favoriteAmount++
    },
  },
})
</script>
<style></style>
