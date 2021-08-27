//音乐播放器相关状态
let mode = 0
const playMode = {
    //播放模式：顺序、单曲、随机
    sequence:0,
    loop:1,
    random:2
}

const getList = function(mode,sequencePlayList){
    //修改播放列表，修改的播放列表的歌曲列表，
    //如果是顺序播放：播放列表是原始的歌曲列表
    if(mode === playMode.sequence){
       return [...sequencePlayList]
    }
    //如果是单曲循环：播放列表是原始的歌曲列表
    else if(mode === playMode.loop){
        return [...sequencePlayList]
    }
    //如果是随机播放：播放列表是打乱的歌曲列表
    else if(mode === playMode.random){
        //打乱歌曲列表
        const newArr = [...sequencePlayList]
        for(let i = 0;i<newArr.length;i++){
            let j = Math.floor(Math.random()*(i+1))
            let temp = newArr[i]
            newArr[i] = newArr[j]
            newArr[j] = temp
        }
        return newArr
    }
}

const getIndex = function(musicList,currentSongID){
    let id = -1
    musicList.map((item,index)=>{
        if(currentSongID === item.id){
            id = index
        }
    })
    return id
}

export default{
    namespaced:true,
    state:{
        //是否详情播放
        fullScreen:false,
        //当前音乐是否在播放
        playing:false,
        //播放歌曲列表，真正的播放列表
        musicList:[],
        //顺序歌曲列表，原始的歌曲列表
        sequencePlayList:[],
        //播放模式
        mode:playMode.sequence,
        //当前播放歌曲在歌曲列表中的下标
        currentIndex:-1,

    },
    getters:{
        //当前歌曲信息
        currentSong(state){
            if(state.currentIndex>=0 && state.currentIndex<state.musicList.length){
                return state.musicList[state.currentIndex]
            }else{
                return {}
            }
        }
    },
    mutations:{
        //歌单中点击歌曲后的处理事件
        selectSongByIndex(state,payload){
            state.playing = true
            //歌单列表的原始数据需要一直保留，不能被其他事件影响到歌单顺序
            state.sequencePlayList = [...payload.list]
            state.musicList = getList(state.mode,state.sequencePlayList)
            state.currentIndex = getIndex(state.musicList,payload.id)
        },
        selectSongOnSuggest(state,payload){
            state.playing = true
            state.sequencePlayList.push(payload.song)
            state.musicList = getList(state.mode,state.sequencePlayList)
            state.currentIndex = getIndex(state.musicList,payload.id)
        },
        setPlaying(state,payload){
            state.playing = payload.value
        },
        changePlayMode(state,payload){
            //修改播放模式
            mode+=1
            state.mode = mode%3
            state.musicList = getList(state.mode,state.sequencePlayList)
            state.currentIndex = getIndex(state.musicList,payload.value)
        },

        PrevNext(state){
                console.log(state.currentIndex)
                state.currentIndex -= 1
                if(state.currentIndex<0){
                    state.currentIndex = state.musicList.length-1
                }
                state.playing = true
        },

        PlayNext(state){
                state.currentIndex += 1
                if(state.currentIndex>state.musicList.length-1){
                    state.currentIndex = 0
                }
                state.playing = true
        }
    },
    actions:{

    },
    modules:{
        
    }
}