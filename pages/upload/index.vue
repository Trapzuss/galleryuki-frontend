<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
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
            <!-- <v-hover>
              <template #default="{ hover }">
                <v-container class="tw-relative" @click="selectImage">
                  <v-row align="center" justify="center">
                    <div v-if="!previewImage">
                      <v-avatar color="primary" size="150">
                        <v-icon color="white" size="100">mdi-account</v-icon>
                      </v-avatar>
                    </div>
                  </v-row>
                </v-container>
              </template>
            </v-hover> -->
            <input ref="fileInput" type="file" @input="pickFile" />
            <!-- {{ previewImage }} -->
          </div>
        </v-col>

        <v-col cols="12">
          <!-- 
            tag
            categories
            visibleto
           -->
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

          <!-- <v-combobox
            solo
            v-model="selectTags"
            :items="trendTags"
            label="Tags"
            multiple
            chips
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
          <v-radio-group v-model="row" row>
            <v-radio label="All ages" value="1"></v-radio>
            <v-radio label="R-18" value="2"></v-radio>
          </v-radio-group> -->
          <v-btn
            :loading="loadingConfirm"
            color="#272727"
            @click="onConfirmPost"
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
import post from '@/mixins/post'
import mixins from 'vue-typed-mixins'
export default mixins(post).extend({
  // mixins: [firebase, post],
  data() {
    return {
      selectCategories: null,
      column: null,
      row: null,
      selectTags: null,
      description: '',
      categories: [
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
    }
  },
  methods: {
    async onConfirmPost() {
      try {
        this.loadingConfirm = true
        if (this.validate()) {
          let payload = {
            title: this.title,
            description: this.description,
            categories: this.selectCategories,
            imageFile: this.selectedFile,
          }
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
      }
    },
    selectImage() {
      let fileInput = this.$refs.fileInput as any
      fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput as any
      let file = input.files
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
