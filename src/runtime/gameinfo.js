
import DataBus from "../databus";
import Player from "../player/player";

let databus = new DataBus

/**
 * 全局游戏信息管理，用于游戏信息的显示
 */
export default class GameInfo {
  initPlayer(p){
    this.player =p;
  }
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  drawTo(ctx) {
    ctx.fillStyle = "#A16D35"
    ctx.font      = "40px Arial"

    ctx.fillText(
      databus.score,
      10,
      50
    )
    ctx.fillText(
      databus.timer,
      databus.screenWidth/2,
      50
    )
    if(!this.player){
      this.player =new Player();
    }
    ctx.font      = "20px Arial"
    ctx.textAlign = 'left'
    ctx.fillText(
      'x: '+Math.floor(this.player.mx)+', y: '+Math.floor(this.player.my),
      10,
      80
    );
  }
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {*} score 
   */
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#A16D35"
    ctx.font      = "40px Arial"

    ctx.fillText(
      score,
      10,
      50
    )
    if(!this.player){
      this.player =new Player();
    }
    ctx.font      = "20px Arial"
    ctx.textAlign = 'left'
    ctx.fillText(
      'x: '+Math.floor(this.player.mx)+', y: '+Math.floor(this.player.my),
      10,
      80
    );
  }

  renderGameOver(ctx, score) {

    ctx.fillStyle = "#A16D35" // 沙棕色(较暗)
    ctx.font      = "20px Arial"

    ctx.fillText(
      '游戏结束',
      databus.screenWidth / 2 - 40,
      databus.screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      databus.screenWidth / 2 - 40,
      databus.screenHeight / 2 - 100 + 130
    )



    ctx.fillText(
      '重新开始',
      databus.screenWidth / 2 - 40,
      databus.screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: databus.screenWidth / 2 - 40,
      startY: databus.screenHeight / 2 - 100 + 180,
      endX  : databus.screenWidth / 2  + 50,
      endY  : databus.screenHeight / 2 - 100 + 255
    }
  }
}

