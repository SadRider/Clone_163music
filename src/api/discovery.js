import { request } from "../network/axios";

export const getBanner = ()=>request.get('/banner')
export const getRecommendList = ()=>request.get('/personalized')
export const getNewSongs = () => request.get('/personalized/newsong')
export const getPersonalizedMv = () => request.get('/personalized/mv')