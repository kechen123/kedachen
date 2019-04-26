/**
 * Created by kechen on 2019/2/15.
 * 一直不喜欢阴天，灰蒙蒙的天空就像模糊了的眼睛，透露给我的永远是迷惘
 */
import apiList from './interface'

//export default class http{
//  getSongList (params){
//    return apiList.Query('/163/playlist/detail',params)
//  }
//  getSongDetail (params){
//    return apiList.Query('/163/song/url',params)
//  }
//  getdaysongs(){
//    return apiList.Query('/163/recommend/songs').then(result=>{
//      let data=result.recommend;
//      let ritui=[];
//      for(let i=0;i<data.length;i++){
//        let reason=data[i].reason.replace("根据你可能喜欢的单曲 ","");
//        let o={
//          id:data[i].id,//id
//          index:i+1,//索引
//          name:data[i].name,//歌名
//          singer:data[i].artists[0].name,//歌手名
//          album:data[i].album.name,//专辑
//          reason:data[i].reason//来自
//        }
//        ritui.push(o);
//      }
//      return ritui;
//    })
//  }
//}




//歌单详情
export const getSongList = (params) => {
  return apiList.Query('/163/playlist/detail',params)
}
//歌曲详情
async function getSongDetail(params){
  return apiList.Query('/163/song/url',params).then(result=>{
    if(result.code==200){
      return result.data[0].url
    }else{
      console.log('查询歌曲出错')
    }
  })
}
//歌词解析
function parseLrc (lrc) {
  if (!lrc) return ''
  const lyrics = lrc.split('\n')
  let lrcObj = {}
  for (let i = 0; i < lyrics.length; i++) {
    // 解码
    const lyric = decodeURIComponent(lyrics[i])
    const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
    const timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    const clause = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      const t = timeRegExpArr[k]
      let min = Number(String(t.match(/\[\d*/i)).slice(1))
      let sec = Number(String(t.match(/\:\d*/i)).slice(1))
      const time = min * 60 + sec
      lrcObj[time] = clause
    }
  }
  return lrcObj
}
//歌词
async function getSongLyric(params){
  return apiList.Query('/163/lyric',params).then(result=>{
    if(result.code==200){
      let Lrc = {}
      //return result
      if (result.lrc === undefined) {
        Lrc = {'0': '纯音乐,请欣赏'}
      } else {
        Lrc = parseLrc(result.lrc.lyric)
      }
      return Lrc;
    }else{
      console.log('查询歌曲出错')
    }
  })
}
function formatDuring(mss) {
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((mss % (1000 * 60)) / 1000);
  return minutes + " 分 " + seconds + " 秒 ";
}
//日推
async function getdaysongs(){
  return apiList.Query('/163/recommend/songs').then(result=>{
    let data=result.recommend;
    let ritui=[];
    for(let i=0;i<data.length;i++){
      let reason=data[i].reason.replace("根据你可能喜欢的单曲 ","");
      var playtime=data[i].bMusic==null?data[i].hMusic.playTime:data[i].bMusic.playTime;
      let o={
        id:data[i].id,//id
        index:i+1,//索引
        name:data[i].name,//歌名
        singer:data[i].artists[0].name,//歌手名
        album:data[i].album.name,//专辑
        reason:data[i].reason, //来自
        picUrl:data[i].album.picUrl, //封面
        playTime:formatDuring(playtime)  //时长
      }
      ritui.push(o);
    }
    return ritui;
  })
}
//播放记录/听歌排行
async function getUserRecord(uid,type){
  return apiList.Query('/163/user/record',{uid:uid,type:type}).then(result=>{
    let data=[];
    if(type==1){
      data=result.weekData;
    }else{
      data=result.allData;
    }
    let r=[]
    for(let i =0;i<data.length;i++){
      let o={
        index:i+1,
        playCount:data[i].playCount+'次',
        name:data[i].song.name,
        id:data[i].song.id,
        singer:data[i].song.ar[0].name,
        picUrl:data[i].song.al.picUrl, //封面
        album:data[i].song.al.name,//专辑
        playTime:formatDuring(data[i].song.song.playTime)
      }
      r.push(o)
    }
    return r;
  })
}
export default {
  getSongList,
  getSongDetail,
  getSongLyric,
  getdaysongs,
  getUserRecord
}
