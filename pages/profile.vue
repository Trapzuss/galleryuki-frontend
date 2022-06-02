<template>
  <v-container fluid>
    <v-row justify="center" no-gutters class="tw-relative tw-rounded-lg">
      <v-col
        cols="12"
        class="tw-absolute tw-bg-red-100 tw-h-[150px] tw-rounded-lg"
      ></v-col>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-avatar size="192" color="primary" class="tw-shadow-md">
          <v-img :src="avatarPath" contain></v-img>
          <!-- <v-icon size="128" color="#F8F8F8">mdi-account</v-icon> -->
        </v-avatar>
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center tw-mb-2">
        <span class="tw-font-bold tw-font-Ubuntu tw-text-[32px]">{{
          user.userDisplayName
        }}</span>
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center tw-mb-2">
        <v-chip class="tw-font-Ubuntu tw-text-lg tw-mb-2" color="primary"
          >Posts {{ postsCount }}
        </v-chip></v-col
      >
    </v-row>
    <v-row
      justify="center"
      no-gutters
      class="tw-my-2 tw-bg-slate-100 tw-min-h-screen"
    >
      <ProfilePostsList :posts="posts" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import auth from '~/mixins/auth'
import NewestList from '@/components/Home/NewestList.vue'
import ProfilePostsList from '@/components/Profile/ProfilePostsList.vue'
import posts from '~/mixins/posts'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/big-ears'
export default mixins(auth, posts).extend({
  components: {
    NewestList,
    ProfilePostsList,
  },
  async mounted() {
    // await this.randomAvatar()
    this.posts = await this.getUserPosts(this.user._id)
  },
  data() {
    return {
      posts: [] as any,
      // avatarPath: '',
    }
  },
  methods: {
    // randomAvatar() {
    //   // random String
    //   const randomString = Math.random().toString(36).substring(2, 15)
    //   let svg = createAvatar(style, {
    //     dataUri: true,
    //     seed: randomString,
    //     backgroundColor: '#f8f8f8',
    //     // ... and other options
    //   })
    //   // console.log(svg)
    //   this.avatarPath = svg
    //   // console.log(svg)
    // },
  },
  computed: {
    avatarPath() {
      return this.image_url
    },
    postsCount(): any {
      try {
        return this.posts.length
      } catch (error) {
        return 0
      }
    },
  },
})
</script>
<style></style>
