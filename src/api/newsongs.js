import { request } from "../network/axios";

//获取精品歌单
export const getNewSongList=(type)=>request.get(`/top/song?type=${type}`)