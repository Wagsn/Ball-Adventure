# Ball-Adventure

Ball-Adventure 是一款微信小游戏，玩家控制球进行世界冒险，途中会遭遇道具，怪物及npc，各种地形等。

## 源码目录介绍
```
./libs
├── action_queue.js                        // 行为队列
├── console.js                             // 控制台交互
├── event_manager.sj                       // 事件管理器：事件的注册和注销，设置和取消事件监听
├── extension.js                           // 原生JS的扩展
├── mat.js                                 // 矩阵
├── message.js                             // 消息
├── pool.js                                // 简易的对象池：对象的重用
├── symbol.js                              // ES6 Symbol简易兼容
└── weapp-adapter.js                       // 小游戏适配器
./res
├── audio                                  // 音频
│   ├── bgm.mp3
│   ├── boom.mp3
│   └── bullet,mp3
├── image                                  // 图像
└── video                                  // 视频
./src
├── base                                  
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs                                    
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 敌机类
├── player
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```

## TODO
* 屏幕地图显示缩放功能》》已完成
* 球球的尾焰特效，根据球球的尺寸和运动方向
* 摇杆的动态显示，当按下时在按下位置显示摇杆，抬起时隐藏摇杆》》已完成
## LOG
[2018/5/25-14:25]{description: 完成界面显示的缩放功能}在main.js中添加初始化事件登记（initRegister）函数，在构造器中调用，在初始化事件登记函数中注册手势缩放事件gesture_zoom，在camera.js中完成地图显示的缩放功能：创建事件监听初始化函数（initEvent）在其中添加gesture_zoom事件监听，并根据事件携带的scaling_ratio属性刷新自己的scale属性，并且添加缩放限制。（存在BUG当同时按摇杆和其它按钮时会引发缩放事件）

## 代码片段

蓝边空心云朵效果
```
// begin custom shape
context.beginPath();
context.moveTo(170, 80);
context.bezierCurveTo(130, 100, 130, 150, 230, 150);
context.bezierCurveTo(250, 180, 320, 180, 340, 150);
context.bezierCurveTo(420, 150, 420, 120, 390, 100);
context.bezierCurveTo(430, 40, 370, 30, 340, 50);
context.bezierCurveTo(320, 5, 250, 20, 250, 50);
context.bezierCurveTo(200, 5, 150, 20, 170, 80);

// complete custom shape
context.closePath();
context.lineWidth = 5;
context.strokeStyle = 'blue';
context.stroke();

```


