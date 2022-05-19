import Vue from 'vue'
import firebase from '@/mixins/firebase'
import { Post } from '@/interfaces/Post.interface'
import mixins from 'vue-typed-mixins'
import { mapState } from 'vuex'
export default mixins(firebase).extend({
  computed: {
    ...mapState({
      user: (state: any) => state.user as any,
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

        store.commit('SET_USER', profile)
      }
    } catch (error) {
      console.log(error)
      // return redirect('/login')
    }
  },
  async created() {
    try {
      let Restrictpath = ['/upload']
      if (Restrictpath.includes(this.$route.path)) {
        console.log('เข้า')

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
        this.$swal.fire({
          icon: 'info',
          title: 'No dissconnect, ;)',
          text: `you cantttttttt!!`,
        })
      } catch (error) {}
    },
  },
})
