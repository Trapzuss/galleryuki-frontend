import Vue from 'vue'
import firebase from '@/mixins/firebase'
import { Post } from '@/interfaces/Post.interface'
import mixins from 'vue-typed-mixins'
export default mixins(firebase).extend({
  //   mixins: [firebase],

  methods: {
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
        title: data.title,
        description: data.description,
        categories: data.categories,
        images: imageUrl,
      }
      await this.$axios.post(`${this.databaseURL}/posts.json`, payload)
    },
    async getNewestPost() {
      return await this.$axios.$get(`${this.databaseURL}/posts.json`)
    },
  },
})
