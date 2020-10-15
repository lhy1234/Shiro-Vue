import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'


// axios.create({
//   timeout: 1000 * 30,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   }
// })

/**
 * 请求拦截
 */
// axios.interceptors.request.use(config => {
//   config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
//   return config
// }, error => {
//   return Promise.reject(error)
// })




axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
        Message.error({message: success.data.msg})
        return;
    }
    if (success.data.msg) {
        Message.success({message: success.data.msg})
    }
    return success.data;
}, error => {
  alert("err");
    // if (error.response.status == 504 || error.response.status == 404) {
    //     Message.error({message: '服务器被吃了( ╯□╰ )'})
    // } else if (error.response.status == 403) {
    //     Message.error({message: '权限不足，请联系管理员'})
    // }  else {
    //     if (error.response.data.msg) {
    //         Message.error({message: error.response.data.msg})
    //     } else {
    //         Message.error({message: '未知错误!'})
    //     }
    // }
    return;
})

let base = '';

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}








////////////普通的post////////////////
// export const postKeyValueRequest = (url, params) => {
//     return axios({
//         method: 'post',
//         url: `${base}${url}`,
//         data: params,
//         transformRequest: [function (data) {
//             let ret = '';
//             for (let i in data) {
//                 ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
//             }
//             return ret;
//         }],
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     });
// }
