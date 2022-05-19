export const state = () => ({
  user: {} as any,
  load: {} as any,
})

export const mutations = {
  SET_USER(state: any, user: any) {
    state.user = { ...user }
  },
  SET_LOAD(state: any, load: any) {
    state.load = { ...load }
  },
}
