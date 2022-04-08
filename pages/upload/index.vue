<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <div>
            <div
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage"
            ></div>

            <input ref="fileInput" type="file" @input="pickFile" />
            <!-- {{ previewImage }} -->
          </div>
        </v-col>
        <!-- <v-col cols="12">
        <v-file-input
          v-model="files"
          color="deep-purple accent-4"
          counter
          label="File input"
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="text-overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
      </v-col> -->
        <v-col cols="12">
          <v-btn color="#272727" @click="onConfirmPost"
            ><span class="tw-text-white">Confirm</span></v-btn
          ></v-col
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return { files: [], previewImage: null, selectedFile: '' as any }
  },
  methods: {
    async onConfirmPost() {
      try {
        const fire = this.$fireModule as any
        let storageRef = await fire
          .storage()
          .ref(`artwork_images/${this.selectedFile.name}`)

        storageRef.put(this.selectedFile)
        this.selectedFile = null
        this.previewImage = null
        let fileInput = this.$refs.fileInput as any
        fileInput.value = ''
        this.$swal.fire({
          icon: 'success',
          title: 'Done, Check your work!',
          timer: 3000,
        })
      } catch (error) {
        console.log(error)
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
