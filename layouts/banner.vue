<template>
  <v-app>
    <v-app-bar dark absolute app>
      <!-- <v-app-bar-nav-icon /> -->
      <v-avatar
        rounded="sm"
        max-height="50px"
        width="200px"
        @click="routeTo('/')"
        class="tw-cursor-pointer"
      >
        <v-img
          position="0px -60px"
          src="/images/Yuuki_Asuka_Empire.png"
          alt="Yuuki_Asuka_Empire"
        ></v-img>
      </v-avatar>
      <v-spacer></v-spacer>

      <v-text-field
        id="searchNav"
        prepend-inner-icon="mdi-magnify"
        rounded
        placeholder="Search artwork"
        hide-details
        autofocus
        dense
        outlined
        color="white"
      ></v-text-field>
      <v-spacer></v-spacer>
      <ProfileMenu />
    </v-app-bar>
    <v-main>
      <v-container fluid class="ma-0 pa-0">
        <v-speed-dial
          fixed
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="#272727" dark fab class="tw-relative">
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-account-circle </v-icon>
            </v-btn>
          </template>
          <!-- <v-btn fab dark small color="green">
            <v-icon>mdi-plus</v-icon>
          </v-btn> -->
          <v-btn fab dark small color="indigo" @click="routeTo('/upload')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!-- <v-btn fab dark small color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn> -->
        </v-speed-dial>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileMenu from '@/components/Layout/ProfileMenu.vue'
import utils from '~/mixins/utils'
export default Vue.extend({
  components: {
    ProfileMenu,
  },
  mixins: [utils],
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],

      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }
  },
})
</script>
