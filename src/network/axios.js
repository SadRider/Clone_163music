import axios from 'axios'

const BASE_URL = 'http://localhost:3000/'

export const request = createBaseInstance()

function createBaseInstance() {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000
    })

    // 拦截器
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        confirm(err.message, '出错啦~')
        throw err
    }),

        //相应拦截
        instance.interceptors.response.use(res => {
            return res.data
        }, err => {
            confirm(err.message, '出错啦~')
            throw err
        })

    return instance
}