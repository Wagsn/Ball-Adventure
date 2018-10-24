
let instance
let audios = {};

/**
 * 全局唯一的的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.init()
  }

  init(){
    this.loadAudio('bgm', 'res/audio/bgm.mp3')
    this.loopAudio('bgm')
    this.loadAudio('shoot', 'res/audio/bullet.mp3')
    this.loadAudio('boom', 'res/audio/boom.mp3')

    this.playBgm()

    // TODO：databus.addEventListener('game_play', ()=>{ this.playBgm() })
    // 当界面显示的时候播放背景音乐
    wx.onShow(() => { this.playBgm()})
  }

  /**
   * 播放背景音乐
   */
  playBgm() {
    this.playAudio('bgm')
  }

  playShoot() {
    this.replayAudio('shoot')
  }

  playExplosion() {
    this.replayAudio('boom')
  }
  
  /**
   * 加载音频资源
   * @param {string} tag 音频标签
   * @param {string} url 音频路径
   */
  loadAudio(tag, url) {
    audios[tag] = new Audio()  // weapp-adapter.js 
    audios[tag].src = url
  }

  /**
   * 开启循环播放
   * @param {string} tag 
   */
  loopAudio(tag){
    audios[tag].loop = true
  }

  /**
   * 关闭循环播放
   * @param {string} tag 
   */
  unloopAudio(tag){
    audios[tag].loop = false
  }

  /**
   * 播放音频
   * @param {string} tag 
   */
  playAudio(tag) {
    audios[tag].play();
  }

  /**
   * 重新播放音频
   * @param {string} tag 
   */
  replayAudio(tag) {
    audios[tag].currentTime = 0
    audios[tag].play()
  }

  /**
   * 暂停音频
   * @param {string} tag 
   */
  pauseAudio(tag) {
    audios[tag].pause();
  }

  /**
   * 对音频执行某个操作
   * @param {string} tag 音频标签
   * @param {string} fun 执行函数
   */
  // run(tag, fun){
  //   audios[tag][fun]()
  // }
}
