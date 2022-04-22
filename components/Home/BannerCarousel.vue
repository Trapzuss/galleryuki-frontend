<template>
  <v-container>
    <v-carousel
      class="tw-rounded-md"
      hide-delimiters
      height="30vh"
      cycle
      progress
      progress-color="primary"
    >
      <v-carousel-item
        transition="fade-transition"
        v-for="(item, i) in items"
        :key="i"
      >
        <v-img :src="item.src" class="custome-v-img"></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      items: [
        {
          src: '/images/kiffells-kiffles.gif',
        },
        {
          src: '/images/yuuki-konno-sao.gif',
        },
        {
          src: '/images/yuuki-konno.gif',
        },
        // {
        //   src: '/images/yuukiC.jpg',
        // },
      ],
    }
  },
})
</script>
<style lang="scss">
.custome-v-img .v-image__image,
.v-image__placeholder {
  z-index: -1;
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
>
