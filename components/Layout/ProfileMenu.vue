<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template #activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="white" size="36">
          <v-img :src="avatarPath" contain v-if="isHaveUser"></v-img>

          <v-icon color="#272727" size="24" v-else>mdi-account</v-icon>
        </v-avatar>
        <!-- <v-avatar rounded="pill"><v-icon>mdi-account</v-icon></v-avatar> -->
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-start">
        <div class="tw-mx-auto text-left" v-if="isHaveUser">
          <v-row
            align="center"
            no-gutters
            justify="center"
            class="tw-transition-all hover:tw-bg-[#d2d2d2] tw-cursor-pointer"
            @click="routeTo('/profile')"
          >
            <v-col cols="4" class="tw-pl-2">
              <v-avatar color="#f6f6f6" class="tw-my-2" rounded="pill">
                <v-img :src="avatarPath" contain></v-img>
                <!-- <v-icon color="#272727">mdi-account</v-icon> -->
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <p class="mb-0">{{ user.userDisplayName }}</p>
              <span class="text-caption mt-1">
                {{ user.username }}
              </span>
            </v-col>
          </v-row>

          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            text
            width="100%"
            class="d-flex justify-start"
            @click="logout"
          >
            <v-icon left color="error">mdi-logout</v-icon>
            Log out
          </v-btn>
        </div>
        <div class="tw-mx-auto text-left" v-else>
          <v-avatar color="#f6f6f6" class="tw-my-2" rounded="pill">
            <v-icon color="#272727">mdi-account-alert</v-icon>
          </v-avatar>
          <span>You haven't logging in yet</span>

          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            text
            width="100%"
            class="d-flex justify-start"
            @click="routeTo('login')"
          >
            <v-icon left>mdi-login</v-icon> Sign In
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import { User } from '~/interfaces/User.interface'
import auth from '~/mixins/auth'
import utils from '~/mixins/utils'

export default mixins(utils, auth).extend({
  props: {
    // user: Object as Vue.PropType<User>,
  },
  async mounted() {
    // await this.randomAvatar()
  },
  computed: {
    avatarPath(): any {
      return this.image_url
    },
    isHaveUser(): any {
      try {
        // console.log(this.user)
        return this.user?._id
      } catch (error) {
        return {}
      }
    },
  },
  data() {
    return {
      // avatarPath: '',
      // user: {
      //   initials: 'JD',
      //   fullName: 'John Doe',
      //   email: 'john.doe@doe.com',
      // },
    }
  },
  methods: {},
})
</script>
<style></style>
