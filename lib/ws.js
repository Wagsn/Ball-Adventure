'use strict'

var FileUtilWX = require('./file-util-wx').default

// ws library
var ws ={
  version: {
    version: '0.1.0',
    info: 'Biuld for microProgram.',
    updateTime: '2018.10.26 12:01:33'
  }
}

// for file
/**
 * save file, Serializer, Example: obj={path: ='path string', data: object|'string', type: 'json'|'text', dst: 'store'|'file'|'temp' }
 */
ws.save = function save(obj) {
  FileUtilWX.writeAs({
    path: obj.path,
    data: obj.data
  })
}
//  ws.save({path: '/test_ws_save.txt', data: "ws.save({path: '/test_ws_save.txt', data: '...'})"})

/**
 * load text file, type= 'text'|'json'|'xml' Example: obj={path: '', type: 'json'} res={name: '', add: ''} obj={path: '', type: 'text'} res=''
 */
ws.load = function load(obj) {
  if (typeof obj == 'object' && obj.type == 'json') {
    return FileUtilWX.readAsJson(obj.path)
  } else if (typeof obj == 'object' && obj.type == 'text') {
    ws.warn('text parse is not implemented.')
    return 
  }
}

// for log, declare a logger, can be configured, needs to move to a separate file
ws.log = function log() {
  console.log.apply(this, arguments)  // console.log is native code
}
ws.info = function info() {
  console.info.apply(this, arguments)
}
ws.error = function error() {
  console.error.apply(this, arguments)
}
ws.warn = function warn() {
  console.warn.apply(this, arguments)
} 

// bind to GameGlobal
GameGlobal.ws = ws 

console.info(`WS Lib:${ws.version.version}, ${ws.version.updateTime}`)