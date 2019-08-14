

import axios from "axios"
import qs from 'qs'
import { message } from 'antd'

axios.interceptors.request.use(config => {
  // 1). 将post请求的data对象数据转换为urlencode格式的字符串数据
  if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  }
  return config
})

/* 使用响应拦截器 */
axios.interceptors.response.use(
    response=>{//请求成功了
        // . 请求成功得到的不是response, 而是response.data
        return response.data
},
  // 3). 统一处理请求异常, 外部调用者不用再处理请求异常
  error => { // ajax请求异常
    message.error('请求失败: ' + error.message)
    // 返回一个pending状态的promise ==> 中断promise链
    return new Promise(() => {})
  }

)

export default axios