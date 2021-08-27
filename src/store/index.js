import Vue from 'vue'
import Vuex from 'vuex'
import player from './modules/player'
import login from './modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules:{
        player,
        login
    }
})