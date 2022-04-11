<template>
  <v-container class="tw-relative">
    <v-row justify="center" align="center" class="tw-relative">
      <v-col cols="12" xl="10"> <BannerCarousel /> </v-col>
      <v-col cols="12" xl="10">
        <h3 class="tw-text-4xl">Recommend</h3>
      </v-col>
      <v-col cols="12" xl="10">
        <ReccommedList />
      </v-col>
      <v-col cols="12" xl="10">
        <h3 class="tw-text-4xl">Daily</h3>
      </v-col>
      <v-col cols="12" xl="10">
        <DailyRanking />
      </v-col>
      <v-col cols="12" xl="10">
        <h3 class="tw-text-4xl">Popular</h3>
      </v-col>
      <v-col cols="12" xl="10">
        <PopularList />
      </v-col>
      <v-col cols="12" xl="10">
        <h3 class="tw-text-4xl">Newest</h3>
      </v-col>
      <v-col cols="12" xl="10">
        <NewestList />
      </v-col>
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
export default Vue.extend({
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
