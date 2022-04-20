<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template #activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="white" size="36">
          <v-icon color="#272727" size="24">mdi-account</v-icon>
        </v-avatar>
        <!-- <v-avatar rounded="pill"><v-icon>mdi-account</v-icon></v-avatar> -->
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-start">
        <div class="tw-mx-auto text-left" v-if="isHaveUser">
          <div class="tw-mx-4">
            <v-avatar color="#f6f6f6" class="tw-my-2" rounded="pill">
              <v-icon color="#272727">mdi-account</v-icon>
            </v-avatar>
            <h3>{{ user.userDisplayName }}</h3>
            <p class="text-caption mt-1">
              {{ user.username }}
            </p>
          </div>

          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            text
            width="100%"
            class="d-flex justify-start"
            @click="$emit('onDisconnect')"
          >
            Disconnect
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
            Login!
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
import utils from '~/mixins/utils'
export default mixins(utils).extend({
  props: {
    user: Object as Vue.PropType<User>,
  },
  computed: {
    isHaveUser(): any {
      try {
        return this.user?._id
      } catch (error) {
        return {}
      }
    },
  },
  data() {
    return {
      // user: {
      //   initials: 'JD',
      //   fullName: 'John Doe',
      //   email: 'john.doe@doe.com',
      // },
    }
  },
})
</script>
<style></style>
