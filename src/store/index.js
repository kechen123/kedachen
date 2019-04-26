/**
 * Created by kechen on 2019/3/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Audio from './modules/audio.js'
import global from './modules/global.js'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    audio: Audio,
    global:global
  }
})

export default store
