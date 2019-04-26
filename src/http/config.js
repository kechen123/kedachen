/**
 * Created by kechen on 2019/2/15.
 * 一直不喜欢阴天，灰蒙蒙的天空就像模糊了的眼睛，透露给我的永远是迷惘
 */
export default {
  method: 'get',
  // 基础url前缀
  baseURL: 'http://kedachen.com:3000',
  //baseURL: 'http://localhost:3000',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json',
}
