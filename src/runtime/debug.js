
import FileUtilWX from '../../lib/file-util-wx'
import Path from '../util/path'

var fu = new FileUtilWX()

// console.log(fu.readAsJson('/res/map/20002.json'))


// FileUtilWX.writeAsJson({path: '/res/map/map_18-10-24.json', data: fu.readAsJson('/res/map/map_18-10-24.json')})


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

// console.log(Path.modext('/sss/ss/test.txt', '.json'));


// 函数自动消去
// console.log(JSON.stringify( {
//     ni: 'sss',
//     xx:  (params) =>{
//         return 'ssss'
//     }
// }));  

// console.log(JSON.stringify(true))

// JSON.parse('console.log(JSON.stringify(true))')

// var ws = require('../../lib/ws')
// require('../../lib/ws')  // 导入的js拥有其作用域不是全局作用域
// ws.log('ws.log')


// var url = 'http://www.baidu.com?a=1&b=2&c=3';
// var reg = /([^?&=]+)=([^?&=])*/g;
// var result = url.match(reg);  // 返回匹配字符串数组
// console.log(result); //["a=1", "b=2", "c=3"]

var url = 'http://www.baidu.com?a=1&b=2&c=3#ssss-ss'
var reg = /(\w+:\/\/)([^/:]+)(:\d*)?([/s/S]*)/g
var result = url.match(reg)  // 返回匹配字符串数组
ws.log(result)

function IsURL (str_url) { 
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
    + '|' // 允许IP和DOMAIN（域名） 
    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
    + '[a-z]{2,6})' // first level domain- .com or .museum 
    + '(:[0-9]{1,4})?' // 端口- :80 
    + '((/?)|' // a slash isn't required if there is no file name 
    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
    var re=new RegExp(strRegex); 
    //re.test() 
    if (re.test(str_url)) { 
    return (true); 
    } else { 
    return (false); 
    } 
    }
let urls =[
    'http://www.baidu.com?a=1&b=2&c=3#ssss-ss',
    'ftp://username:password@www.sss.tp:4545/ss/ss/ss.html?hiah=sss#sdss'
]
urls.forEach(url => {
    ws.log(IsURL(url))
});
