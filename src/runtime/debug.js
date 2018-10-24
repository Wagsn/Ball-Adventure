
import FileUtilWX from '../util/file-util-wx'
import Path from '../util/path'

var fu = new FileUtilWX()

// console.log(fu.readAsJson('/res/map/20002.json'))


FileUtilWX.writeAsJson('/res/map/map_18-10-24.json', fu.readAsJson('/res/map/map_18-10-24.json'))


// console.log('directory: '+Path.dirname('http://usr/res/map/20003.json'))

// FileUtil.mkdir({
//     path: FileUtil.fullPath('/res/map'),
//     recursive: true
// })


// 在本地用户文件目录下创建一个文件 hello.txt，写入内容 "hello, world"
// const fs = wx.getFileSystemManager()
// fs.mkdir({
//     dirPath: '/test1/test2/test3',
//     recursive: false,
//     success: ()=>{
//         console.log('success');
        
//     },
//     fail: ()=>{
//         console.log('fail');
        
//     }
// })
// fs.writeFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'hello, world', 'utf8')