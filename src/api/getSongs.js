import { request } from "../network/axios";
// 获取音乐url
export const getSongUrl = id => request.get(`/song/url?id=${id}`)

//获取歌曲歌词
export const getSongLyric = id => request.get(`/lyric?id=${id}`)

//获取热评 0: 歌曲、1: mv、2: 歌单、3: 专辑、4: 电台、5: 视频
export const getHotCommends = (id,type) => request.get(`/comment/hot?id=${id}&type=${type}`)
//获取全部评论
export const getSongCommends = (type,id,limit,offset) => request.get(`/comment/${type}?id=${id}&limit=${limit}&offset=${offset}`)
export function getMVCommends(id,limit,offset){
    return request({
        url:'/comment/mv',
        params:{
            id:id,
            limit:limit,
            offset
        }
    })
}
//提交评论
export function pushCommends(cookie,type,id,content){
    return request({
        url:'/comment',
        params:{
            cookie,
            t:1,
            type:type,
            id:id,
            content:content
        }
    })
}

//获取歌单详情
export const getSongListInfo = (id,cookie) => request.get(`/playlist/detail?id=${id}&cookie=${cookie}`)
//获取专辑
export const getAlbumsInfo = id => request.get(`/album?id=${id}`)
/**获取歌曲信息 */
export function getSongsDetail(ids){
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    })
}