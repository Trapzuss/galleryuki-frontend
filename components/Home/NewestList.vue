<template>
  <v-container>
    <v-row
      justify="end"
      align="center"
      class="tw-text-gray-400 hover:tw-text-gray-600 hover:tw-underline tw-cursor-pointer"
      @click="routeTo('/newest')"
      >See all</v-row
    >
    <v-row>
      <v-col
        v-for="(post, i) in newestPost"
        :key="i"
        class="d-flex child-flex"
        cols="2"
      >
        <v-hover #default="{ hover }">
          <v-card hover @click="routeTo(`/posts/${post._id}`)">
            <v-fab-transition>
              <div class="tw-absolute tw-right-0 tw-m-2 tw-z-[3]" v-if="hover">
                <v-btn
                  class="tw-z-[3]"
                  color="white"
                  fab
                  small
                  depressed
                  @click.stop="favoritePost('test')"
                >
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import { Post } from '~/interfaces/Post.interface'
import posts from '~/mixins/posts'
import utils from '~/mixins/utils'
export default mixins(posts, utils).extend({
  async mounted() {
    this.newestPost = await this.getNewestPost()
  },
  data() {
    return {
      newestPost: [] as Array<Post>,
    }
  },
})
</script>
<style></style>
