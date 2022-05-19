import Vue from 'vue'
import firebase from '@/mixins/firebase'
import { Post } from '@/interfaces/Post.interface'
import mixins from 'vue-typed-mixins'
import { User } from '~/interfaces/User.interface'
import { mapState } from 'vuex'
export default mixins(firebase).extend({
  computed: {
    ...mapState({
      load: (state: any) => state.load as any,
    }),
  },
  methods: {
    async increaseFavorite(id: string) {
      let res = await this.$axios.$post(`/posts/${id}`)
      return res
    },
    async createPost(data: any) {
      const fire = this.$fireModule as any
      let storageRef = await fire
        .storage()
        .ref(`artwork_images/${data.imageFile.name}`)
      let uploadedImage = await storageRef.put(data.imageFile)

      let imagesStorage = this.$fireModule
        .storage()
        .ref()
        .child('artwork_images')
      let image = imagesStorage.child(uploadedImage.ref.name)
      let imageUrl = await image.getDownloadURL()
      let payload = {
        userId: data.userId,
        title: data.title,
        description: data.description,
        category: data.categories,
        imageUrl: imageUrl,
      }
      await this.$axios.$post(`/posts`, payload)
    },
    async getPostById(postId: string) {
      return await this.$axios.$get(`/posts/${postId}`)
    },
    async getNewestPost() {
      // firebase
      // return await this.$axios.$get(`${this.databaseURL}/posts.json`)
      // apiService
      return await this.$axios.$get(`/posts/newest`)
    },
    async getAllPost() {
      try {
        let res = await this.$axios.$get(`/posts`)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
