
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

    this.bgmAudio = new Audio() // weapp-adapter.js 
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'res/audio/bgm.mp3'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'res/audio/bullet.mp3'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'res/audio/boom.mp3'

    this.playBgm()

    // TODO：databus.addEventListener('game_play', ()=>{ this.playBgm() })
    // 当界面显示的时候播放背景音乐
    wx.onShow(() => { this.playBgm()})
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
  
  /**
   * 将音频加载进游戏
   * @param {string} tag 音频标签
   * @param {string} url 音频路径
   */
  loadAudio(tag, url) {
    audios[tag] = new Audio()
    audios[tag].src = url
  }

  /**
   * 播放音频
   * @param {string} tag 
   */
  playAudio(tag) {
    audios[tag].play();
  }

  /**
   * 暂停音频
   * @param {string} tag 
   */
  pauseAudio(tag) {
    audios[tag].pause();
  }

  /**
   * 停止音频
   * @param {string} tag 
   */
  stopAudio(tag) {
  }
}
