const http = require('http')
/* 文件读取 */
const fs = require('fs')
/* 数据压缩 */
const zlib = require('zlib')

http.createServer(function(request, response) {
    console.log('request come', request.url)
    /* 读取文件 buffer的形式 */
    const html = fs.readFileSync('test.html')
    /* 设置响应头 */
    response.writeHead(200, {
        /* 读取html文件 */
        'Content-Type': 'text/html',
        /* 禁止浏览器随意猜测我要返回的内容 :
        * 'X-Content-Type-Options': 'nosniff'
        */
        /* 数据压缩 */
        'Content-Encoding': 'gzip'
    })

    response.end(zlib.gzipSync(html))

    /* 设置监听端口 */
}).listen(8082, function() {
    console.log('server is listen to 8082')
})