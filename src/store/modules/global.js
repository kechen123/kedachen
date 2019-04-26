/**
 * Created by kechen on 2019/3/7.
 */

const global = {
  state: {
    bgImgUrl:''
  },
  getters: {
    getBgImgUrl: (state) => state.bgImgUrl,
  },
  mutations: {
    setBgImgUrl (state, url) {
      state.bgImgUrl = url
    }
  },
  actions: {
    set_BgImgUrl ({commit}, url) {
      commit('setBgImgUrl', url)
    },

  }
}

export default global
