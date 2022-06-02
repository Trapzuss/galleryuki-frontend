<template>
  <v-container class="tw-h-[100vh]">
    <v-row align="center" justify="center" class="tw-h-full">
      <v-card class="tw-p-4" raised rounded="lg" elevation="1" width="30vw">
        <v-card-title class="d-flex align-center justify-center">
          <v-col cols="12" class="d-flex justify-center">
            <h1 class="tw-font-bold tw-text-2xl">Login</h1>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-avatar rounded="sm" size="128"
              ><v-img eager alt="yuuki" :src="mainAvatar"></v-img></v-avatar
          ></v-col>
          <v-col cols="12">
            <div class="d-flex justify-center tw-font-bold tw-text-2xl">
              <span
                class="tw-text-lg tw-font-bold tw-animate-pulse tw-transition-all"
                ><v-chip color="primary" label class="tw-px-10"
                  >salut <span> - galleryuuki</span></v-chip
                ></span
              >
            </div></v-col
          >
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="username"
              required
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="password"
              required
            ></v-text-field>
            <v-row align="center" justify="space-between">
              <v-btn
                text
                rounded
                depressed
                color="primary"
                class="mr-4"
                @click="routeTo('/register')"
              >
                Didn't have an account?
              </v-btn>
              <v-btn
                rounded
                depressed
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="validate"
              >
                Login
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import auth from '~/mixins/auth'
import utils from '~/mixins/utils'
export default mixins(utils, auth).extend({
  layout: 'auth',
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [(v: any) => !!v || 'username is required'],
    password: '',
    passwordRules: [(v: any) => !!v || 'password is required'],
  }),

  methods: {
    async validate() {
      try {
        let form = this.$refs.form as any
        if (form.validate()) {
          await this.login(this.username, this.password)
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    },
    reset() {
      let form = this.$refs.form as any
      form.reset()
    },
    resetValidation() {
      let form = this.$refs.form as any

      form.resetValidation()
    },
  },
})
</script>
<style></style>
