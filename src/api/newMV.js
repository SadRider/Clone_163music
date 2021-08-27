import { request } from "../network/axios";
//获取MV数据
export const getMV=(mvid)=>request.get(`/mv/detail?mvid=${mvid}`)
//获取MV播放地址
export const getMVUrl=(id)=>request.get(`/mv/url?id=${id}`)
//获取相似MV
export const getSimiMv = id => request.get(`/simi/mv?mvid=${id}`)
//获取全部MV
export function getAllMV(area,type,order,limit,offset){
    return request({
        url:'/mv/all',
        params:{
            area,
            type,
            order,
            limit,
            offset
        }
    })
}