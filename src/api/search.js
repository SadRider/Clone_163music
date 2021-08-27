import { request } from "../network/axios";

//热搜列表
export const hotSearch=()=>request.get('/search/hot/detail')
//相关结果建议
export const Suggest=(keywords)=>request.get(`/search/suggest?keywords=${keywords}`)
//搜索结果
export function Search(keywords,type){
    return request({
        url:'/cloudsearch',
        params:{
            keywords,
            type
        }
    })
}