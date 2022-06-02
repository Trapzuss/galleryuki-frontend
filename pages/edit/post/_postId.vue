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
              <v-text-field
                v-model="post.title"
                solo
                dense
                placeholder="Title..."
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="tw-mb-3">
              <span class="tw-italic tw-text-sm tw-opacity-60"
                >Description</span
              >
              <v-text-field
                v-model="post.description"
                solo
                dense
                placeholder="Description..."
              >
              </v-text-field>
            </v-col>
            <v-col cols="8" class="tw-mb-3">
              <span class="tw-italic tw-text-sm tw-opacity-60">Category</span>
              <!-- <p>{{ post.category }}</p> -->
              <v-select
                full-width
                dense
                allow-overflow
                id="categories"
                solo
                v-model="post.category"
                :items="categories"
                :rules="categoriesRules"
                label="Categories"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" class="tw-rounded-md tw-p-4">
              <v-row justify="space-between" align="center">
                <div>
                  <v-btn icon @click="onDelete" color="error">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
                <v-row justify="end">
                  <div class="tw-mx-2">
                    <v-btn
                      @click="onCancel"
                      color="error"
                      :ripple="false"
                      class="tw-opacity-90 active:tw-bg-red-500 focus:tw-outline-none focus:tw-ring focus:tw-ring-red-500 active:tw-scale-110 tw-transition-all"
                    >
                      <v-icon left>mdi-close</v-icon>

                      <span class="tw-font-medium"> CANCEL</span>
                    </v-btn>
                  </div>
                  <div class="tw-ml-2">
                    <v-btn color="success" @click="onSubmit">
                      <v-icon left>mdi-content-save-edit</v-icon>
                      <span class="tw-font-medium"> SUBMIT</span>
                    </v-btn>
                  </div>
                </v-row>
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

export default mixins(posts, auth, utils).extend({
  async mounted() {
    await this.getPost()
  },
  data() {
    return {
      post: {} as Post,
      categories: [
        { text: 'Meme', value: 'meme' },
        { text: 'Parody', value: 'parody' },
        { text: 'Manga', value: 'manga' },
        { text: 'Original', value: 'original' },
        { text: 'Drawing', value: 'drawing' },
      ],
      categoriesRules: [(v: any) => !!v || 'Categories is required'],
    }
  },
  computed: {
    avatarPath() {
      return this.image_url
    },
    postId(): string {
      return this.$route.params.postId
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
    async onDelete() {
      let res = this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })

      if ((await res).isConfirmed) {
        await this.deletePost(this.post._id)
        this.$swal.fire({
          title: 'Deleted!',
          icon: 'success',
          timer: 1500,
          toast: true,
          position: 'top-right',
        })
        this.$router.push('/')
      }
    },
    async onSubmit() {
      await this.updatePost(
        this.post.title,
        this.post.description,
        this.post.category,
        this.post._id,
        this.post.user._id,
        this.user._id
      )
    },
    onCancel() {
      this.$router.push(`/posts/${this.postId}`)
    },
    async getPost() {
      this.post = await this.getPostById(this.postId)
    },
    routeToEdit() {
      this.routeTo(`/edit/post/${this.post?._id}`)
    },
    async favoritePost(id: string) {
      await this.increaseFavorite(id)
      this.post.favoriteAmount++
    },
  },
})
</script>
<style></style>
