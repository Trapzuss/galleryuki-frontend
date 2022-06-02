export const state = () => ({
  user: {} as any,
  load: {} as any,
  image_url: '' as string,
})

export const mutations = {
  SET_USER(state: any, user: any) {
    state.user = { ...user }
  },
  SET_LOAD(state: any, load: any) {
    state.load = { ...load }
  },
  SET_IMAGE_SRC(state: any, image_url: any) {
    state.image_url = image_url
  },
}
