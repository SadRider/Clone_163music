import { request } from "../network/axios";
//获取歌手详情
export const getArtistDesc = (id) =>request.get(`/artist/desc?id=${id}`)

//获取歌手50首热门歌曲
export const getHotSong_50 = (id)=>request.get(`/artist/top/song?id=${id}`)

//获取歌手专辑
export function getArtistAlbums(id,limit,offset){
    return request({
        url:'/artist/album',
        params:{
            id,
            limit,
            offset
        }
    })
}

//获取歌手简述
export const artistDetail = (id)=>request.get(`/artist/detail?id=${id}`)

//获取相似歌手
export const getSimiArtist = (id)=>request.get(`/simi/artist?id=${id}`)

//获取歌手MV
export const getArtistMV = (id)=>request.get(`/artist/mv?id=${id}`)
