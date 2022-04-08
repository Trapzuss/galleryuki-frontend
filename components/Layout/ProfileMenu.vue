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
        <div class="tw-mx-auto text-left">
          <div class="tw-mx-4">
            <v-avatar color="#f6f6f6" class="tw-my-2" rounded="pill">
              <v-icon color="#272727">mdi-account</v-icon>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
          </div>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed text width="100%" class="d-flex justify-start">
            Edit Account
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed text width="100%" class="d-flex justify-start">
            Disconnect
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }
  },
})
</script>
<style></style>
