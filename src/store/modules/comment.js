export default{
    namespaced:true,
    state:{
        cookie:null
    },
    getters:{
        getCookie(state){
            if(localStorage.getItem('cookie')){
                state.cookie = localStorage.getItem('cookie')
            }
            return state.cookie
        }
    },
    mutations:{
 
    },
    actions:{

    },
    modules:{
        
    }
}