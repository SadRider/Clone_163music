export default{
    namespaced:true,
    state:{
        user:null,
        uid:null,
        cookie:null
    },
    mutations:{
        saveUser(state,object){
            state.user=object
            state.uid=state.user.profile.userId
            state.cookie=object.cookie
        }
    },
    getters:{
        getCookie(state){
            if(localStorage.getItem('cookie')){
              state.cookie=localStorage.getItem('cookie');
            }
            return state.cookie;
          },
        getAvatar(state){
            let avatar=''
            if(localStorage.getItem('avatar')){
                avatar=localStorage.getItem('avatar')
                return avatar
            }
            avatar = state.user&&state.user.profile.avatarUrl
            return avatar
        },
        getNickname(state){
            let nickname=''
            if(localStorage.getItem('nickName')){
                nickname=localStorage.getItem('nickName')
                return nickname
            }
            nickname = state.user&&state.user.profile.nickname
            return nickname
        },
        getUID(state){
            let uid=''
            if(localStorage.getItem('uid')){
                uid=localStorage.getItem('uid')
                return uid
            }
            uid = state.user&&state.user.profile.userId
            return uid
        },
    },
    actions:{

    },
    modules:{
        
    }
}