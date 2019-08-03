import Vue from 'vue'
import Vuex from 'vuex'

import keepass from './modules/keepass'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        keepass
    }
})