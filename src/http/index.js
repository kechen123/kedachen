/**
 * Created by kechen on 2019/2/15.
 * 一直不喜欢阴天，灰蒙蒙的天空就像模糊了的眼睛，透露给我的永远是迷惘
 */
// 导入所有接口
import apiList from './interface'
import http from './http'
const areaSelect = {
  install (Vue, options) {
    //axios请求
    Vue.prototype.kcAjax=apiList;
    //公共请求
    Vue.prototype.httplist=http;
  }
}
export default areaSelect

