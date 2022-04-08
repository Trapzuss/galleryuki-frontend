import Vue from 'vue'
export default Vue.extend({
  methods: {
    routeTo(route: string) {
      this.$router.push(route)
    },
  },
})
