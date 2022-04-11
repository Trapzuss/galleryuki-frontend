<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(post, i) in newestPost"
        :key="i"
        class="d-flex child-flex"
        cols="2"
      >
        <v-hover #default="{ hover }">
          <v-card hover>
            <v-sheet
              v-if="hover"
              class="tw-absolute tw-z-[2] tw-opacity-20"
              color="primary"
              height="100%"
              width="100%"
            ></v-sheet>
            <v-img :src="post.images" aspect-ratio="1" class="grey lighten-2">
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
import post from '~/mixins/post'
export default mixins(post).extend({
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
