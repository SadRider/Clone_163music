import { request } from "../network/axios";

//获取精品歌单
export function getHighQuality(tag,limit){
    return request({
        url:`/top/playlist/highquality`,
        params:{
            cat:tag,
            limit
        }
    })
}

////获取歌单
export function getPlayList(tag,limit,offset){
    return request({
        url:`/top/playlist`,
        params:{
            cat:tag,
            limit,
            offset
        }
    })
}