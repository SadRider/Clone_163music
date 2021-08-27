import { request } from "../network/axios";
//登录
export const Login=(phone,password)=>request.get(`/login/cellphone?phone=${phone}&password=${password}`)
//验证账号是否存在
export const isHasUser =(phone)=>request.get(`/cellphone/existence/check?phone=${phone}`)
//用户歌单
export const UserList= id=>request.get(`/user/playlist?uid=${id}`)

export const Status= cookie=>request.get(`/login/status?cookie=${cookie}`)

export const Logout= cookie=>request.get(`/logout?cookie=${cookie}`)

