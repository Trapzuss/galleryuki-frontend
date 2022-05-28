<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="onConfirmPost"
      enctype="multipart/form-data"
    >
      <v-row>
        <v-col
          cols="12"
          class="tw-bg-slate-100 tw-shadow-sm tw-rounded-md hover:tw-bg-slate-200 hover:tw-cursor-pointer"
        >
          <div>
            <div
              @click="selectImage"
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"
            ></div>

            <input
              ref="fileInput"
              type="file"
              name="uploadimage"
              accept="image/*"
              @input="pickFile"
            />
          </div>
        </v-col>

        <v-col cols="12">
          <v-text-field
            id="title"
            solo
            v-model="title"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>
          <v-textarea
            clearable
            id="description"
            solo
            name="description"
            label="Description"
            v-model="description"
          ></v-textarea>
          <v-autocomplete
            allow-overflow
            id="categories"
            solo
            v-model="selectCategories"
            :items="categories"
            :rules="categoriesRules"
            label="Categories"
            required
          ></v-autocomplete>

          <v-btn
            :loading="loadingConfirm"
            color="#272727"
            type="submit"
            :disabled="!valid"
            class="tw-mr-4"
            ><span class="tw-text-white">Confirm</span>
          </v-btn>
          <v-btn color="error" class="tw-mr-4" @click="reset">
            Reset Form
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '@/mixins/firebase'
import posts from '@/mixins/posts'
import mixins from 'vue-typed-mixins'
import auth from '~/mixins/auth'
export default mixins(posts, auth).extend({
  // mixins: [firebase, post],
  data() {
    return {
      selectCategories: null,
      column: null,
      row: null,
      selectTags: null,
      description: '',
      categories: [
        { text: 'Meme', value: 'meme' },
        { text: 'Parody', value: 'parody' },
        { text: 'Manga', value: 'manga' },
        { text: 'Original', value: 'original' },
        { text: 'Drawing', value: 'drawing' },
      ],
      trendTags: ['Programming', 'Design', 'Vue', 'Vuetify'],
      files: [],
      previewImage: null,
      selectedFile: '' as any,
      valid: false,
      title: '',
      titleRules: [(v: any) => !!v || 'Title is required'],
      categoriesRules: [(v: any) => !!v || 'Categories is required'],
      loadingConfirm: false,
      tempfile: '',
    }
  },
  methods: {
    async onConfirmPost() {
      try {
        this.loadingConfirm = true
        if (this.validate()) {
          let payload = {
            userId: this.user?._id,
            title: this.title,
            description: this.description,
            categories: this.selectCategories,
            imageFile: this.selectedFile,
          }
          // console.log(this.selectedFile)

          // var formData = new FormData()

          // formData.append('uploadimage', this.selectedFile)
          // console.log(formData)
          // await this.$axios.$post(
          //   `http://localhost:3200/uploadphoto`,
          //   formData

          // )

          await this.createPost(payload)
          await this.$swal.fire({
            icon: 'success',
            title: 'Done, Check your work!',
            timer: 3000,
          })
          this.selectedFile = null
          this.previewImage = null
          let fileInput = this.$refs.fileInput as any
          fileInput.value = ''
          this.reset()
        }
        this.loadingConfirm = false
      } catch (error) {
        this.loadingConfirm = false
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
        })
      } finally {
        this.loadingConfirm = false
      }
    },
    selectImage() {
      let fileInput = this.$refs.fileInput as any
      fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput as any
      let file = input.files
      this.tempfile = file
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e: any) => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.selectedFile = file[0]
        // console.log(file[0])
        // console.log(this.previewImage)
        // this.$emit('input', file[0])
      }
    },
    validate() {
      let form = this.$refs.form as HTMLFormElement
      return form.validate()
    },
    reset() {
      let form = this.$refs.form as HTMLFormElement
      form.reset()
    },
    resetValidation() {
      let form = this.$refs.form as HTMLFormElement
      form.resetValidation()
    },
  },
})
</script>

<style lang="scss" scoped>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
