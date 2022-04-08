import Vue from 'vue'
import Uploader from 'v-uploader'

/**
 * v-uploader plugin global config
 */
const uploaderConfig = {
  uploadFileUrl: 'https://some-site/upload',
  deleteFileUrl: 'https://some-site/delete',
  // showMessage: (vue, message) => {
  //   // using v-dialogs to show message
  //   vue.$dlg.alert(message, null, { messageType: 'error' })
  // },
}

// install plugin with options
Vue.use(Uploader, uploaderConfig)
