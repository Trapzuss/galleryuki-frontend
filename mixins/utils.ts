import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      mainAvatar:
        'https://firebasestorage.googleapis.com/v0/b/inw-kanverse.appspot.com/o/artwork_images%2FE_GOzQ0XIAMwxqE.jpg?alt=media&token=756f5c02-9b8f-4b75-9f17-ca1c55c7e1c9',
    }
  },
  methods: {
    routeTo(route: string) {
      this.$router.push(route)
    },
  },
})
