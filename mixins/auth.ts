import Vue from 'vue'
import firebase from '@/mixins/firebase'
import { Post } from '@/interfaces/Post.interface'
import mixins from 'vue-typed-mixins'
import { mapState } from 'vuex'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/big-ears'
export default mixins(firebase).extend({
  computed: {
    ...mapState({
      user: (state: any) => state.user as any,
      image_url: (state: any) => state.image_url as string,
    }),
  },
  async asyncData({ $axios, route, redirect, req, store }) {
    try {
      // console.log('auth')
      // console.log(req.headers.cookie)
      if (process.browser) {
        let path = route.fullPath
        let profile = await $axios.$get('/auth/profile', {
          withCredentials: true,
        })
        const randomString = Math.random().toString(36).substring(2, 15)
        let svg = createAvatar(style, {
          dataUri: true,
          seed: randomString,
          backgroundColor: '#f8f8f8',
          // ... and other options
        })
        store.commit('SET_USER', { ...profile })
        store.commit('SET_IMAGE_SRC', svg)
      }
    } catch (error) {
      console.log(error)
      // return redirect('/login')
    }
  },
  async created() {
    try {
      let Restrictpath = ['/upload', 'profile']
      if (Restrictpath.includes(this.$route.path)) {
        // console.log('เข้า')

        if (!this.user?._id) throw Error()
      }
      return
    } catch (error) {
      // console.log('error')
      console.log(error)
      await this.$swal.fire({
        icon: 'warning',
        title: 'Please, Logging in before post',
      })
      this.$router.push('/')
    }
  },
  methods: {
    async login(username: string, password: string) {
      try {
        await this.$axios.$post('/auth/login', {
          username: username,
          password: password,
        })
        await this.$swal.fire({
          icon: 'success',
          title: 'Login Successfully',
          text: 'Hope your enjoy our gallery ;)',
        })
      } catch (error: any) {
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: error.response.data.message,
        })
      }
    },
    async register(
      username: string,
      password: string,
      userDisplayName: string
    ) {
      try {
        await this.$axios.$post('/auth/register', {
          userDisplayName: userDisplayName,
          username: username,
          password: password,
        })
        await this.$swal.fire({
          icon: 'success',
          title: 'Register Successfully',
        })
      } catch (error: any) {
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          title: 'Something Wrong!',
          text: error.response.data.message,
        })
      }
    },
    async logout() {
      try {
        await this.$axios.$post('/auth/logout')
        await this.$swal.fire({
          icon: 'success',
          title: 'Logout Successfully',
          text: `Thank you for using our gallery`,
        })
        window.open('/', '_self')
      } catch (error) {}
    },
  },
})
