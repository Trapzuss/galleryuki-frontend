<template>
  <v-container class="tw-relative">
    <v-row justify="center" align="center" class="tw-relative">
      <v-overlay color="primary">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
      <!-- <v-col cols="12" xl="10"> <BannerCarousel /> </v-col>

      <v-col cols="12" xl="10">
        <NewestList />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ReccommedList from '@/components/Home/RecommendList.vue'
import DailyRanking from '~/components/Home/DailyRanking.vue'
import PopularList from '~/components/Home/PopularList.vue'
import NewestList from '~/components/Home/NewestList.vue'
import BannerCarousel from '@/components/Home/BannerCarousel.vue'
import mixins from 'vue-typed-mixins'
import posts from '~/mixins/posts'
import auth from '~/mixins/auth'
export default mixins(posts, auth).extend({
  mounted() {
    this.$router.push('/newest')
  },
  components: {
    ReccommedList,
    PopularList,
    NewestList,
    DailyRanking,
    BannerCarousel,
  },
  data() {
    return {}
  },
})
</script>

DailyRanking
