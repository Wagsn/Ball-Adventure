
import Point from '../base/point'

export default class Util {
  static randomPointIn(startX, startY, endX, endY){
    return new Point(startX + Math.random() * (endX - startX), startY + Math.random() * (endY - startY))
  }
  
  /**
   * 求两个矩形相交的面积
   * @param {number} A: start.x
   * @param {number} B: start.y
   * @param {number} C: end.x
   * @param {number} D: end.y
   * @param {number} E: start.x
   * @param {number} F: start.y
   * @param {number} G: end.x
   * @param {number} H: end.y
   * @return {number}
   */
  static computeArea(A, B, C, D, E, F, G, H) {
    // use Vanilla JS if want to be faster
    // http://vanilla-js.com/
    var width = (C - A) + (G - E) - Math.abs(Math.max(G, C) - Math.min(E, A));
    width < 0 && (width = 0);

    var height = (D - B) + (H - F) - Math.abs(Math.max(H, D) - Math.min(F, B));
    height < 0 && (width = 0);

    return (C - A) * (D - B) + (G - E) * (H - F) - width * height;
  }
  static computeAreaNormalii(A, B, C, D, E, F, G, H) {
    var width, height;

    if (C <= E || G <= A || D <= F || H <= B)
      width = height = 0;
    else {
      if (E > A) {
        width = G < C ? G - E : C - E;
      } else {
        width = C < G ? C - A : G - A;
      }

      if (F > B) {
        height = H < D ? H - F : D - F;
      } else {
        height = D < H ? D - B : H - B;
      }
    }

    return (C - A) * (D - B) + (G - E) * (H - F) - width * height;
  }
}

/**
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} D
 * @param {number} E
 * @param {number} F
 * @param {number} G
 * @param {number} H
 * @return {number}
 */
var computeArea = function (A, B, C, D, E, F, G, H) {
  var width, height;

  if (C <= E || G <= A || D <= F || H <= B)
    width = height = 0;
  else {
    var tmp = [A, C, E, G].sort(function (a, b) {
      return a - b;
    });

    width = tmp[2] - tmp[1];

    tmp = [B, D, F, H].sort(function (a, b) {
      return a - b;
    });

    height = tmp[2] - tmp[1];
  }

  return (C - A) * (D - B) + (G - E) * (H - F) - width * height;
};

// 矩形一 top-left 坐标 (A, B), C 为 width, D 为 height
// 矩形二 同上
// 如果没有相交，返回 [0, 0, 0, 0]
// 如果相交，假设相交矩形对角坐标 (x0, y0) (x1, y1) -- x1 > x0 & y1 > y0
// return [x0, y0, x1, y1]
function check(A, B, C, D, E, F, G, H) {
  // 转为对角线坐标
  C += A, D += B, G += E, H += F;

  // 没有相交
  if (C <= E || G <= A || D <= F || H <= B)
    return [0, 0, 0, 0];

  var tmpX, tmpY;

  if (E > A) {
    tmpX = G < C ? [E, G] : [E, C];
  } else {
    tmpX = C < G ? [A, C] : [A, G];
  }

  if (F > B) {
    tmpY = H < D ? [F, H] : [F, D];
  } else {
    tmpY = D < H ? [B, D] : [B, H];
  }

  return [tmpX[0], tmpY[0], tmpX[1], tmpY[1]];
}

// a, b 为精灵对象
// a, b 分别拥有键值 img(精灵图像 DOM元素), pos(精灵瞬间位置 top-left 坐标), size(wdith, height 数据)
// rect 参数为 check() 函数返回值
function checkInDetail(a, b, rect) {
  // 离屏 canvas
  var canvas = document.createElement('canvas');
  _ctx = canvas.getContext('2d');

  _ctx.drawImage(a.img, 0, 0, a.size.x, a.size.y);
  // 相对位置
  var data1 = _ctx.getImageData(rect[0] - a.pos.x, rect[1] - a.pos.y, rect[2] - rect[0], rect[3] - rect[1]).data;

  _ctx.clearRect(0, 0, b.size.x, b.size.y);
  _ctx.drawImage(b.img, 0, 0, b.size.x, b.size.y);
  var data2 = _ctx.getImageData(rect[0] - b.pos.x, rect[1] - b.pos.y, rect[2] - rect[0], rect[3] - rect[1]).data;

  canvas = null;

  for (var i = 3; i < data1.length; i += 4) {
    if (data1[i] > 0 && data2[i] > 0)
      return true; // 碰撞
  }

  return false;
}

// a, b 为精灵对象
// a, b 分别拥有键值 img(精灵图像 DOM元素), pos(精灵瞬间位置 top-left 坐标), size(wdith, height 数据)
// rect 参数为 check() 函数返回值
function _checkInDetail(a, b, rect) {
  // 离屏 canvas
  var canvas = document.createElement('canvas');
  _ctx = canvas.getContext('2d');

  // 将 (0, 0) 作为基准点，将 a 放入 (0, 0) 位置
  _ctx.drawImage(a.img, 0, 0, a.size.x, a.size.y);
  _ctx.globalCompositeOperation = 'source-in';
  _ctx.drawImage(b.img, b.pos.x - a.pos.x, b.pos.y - a.pos.y, b.size.x, b.size.y);

  var data = _ctx.getImageData(rect[0] - a.pos.x, rect[1] - a.pos.y, rect[2] - rect[0], rect[3] - rect[1]).data;

  canvas = null;

  // 改回来（虽然并没有什么卵用）
  _ctx.globalCompositeOperation = 'source-over';

  for (var i = 3; i < data.length; i += 4) {
    if (data[i])
      return true;  // 碰撞
  }

  return false;
}
/*
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
*/