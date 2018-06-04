const http = require('http')
const fs = require('fs')

/* 测试长连接 降低开销 */
http.createServer(function(request, response) {
    console.log('request come', request.url)

    /* 读取文件 */
    const html = fs.readFileSync('test.html', 'utf-8')
    const img = fs.readFileSync('test1.jpg')
    if(request.url === '/') {
        /* 设置响应头 */
        response.writeHead(200, {
            /* 读取HTML文件 */
            'Content-Type': 'text/html',
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            /* 读取图片 */
            'Content-Type': 'image/jpg',
        })
        response.end(img)
    }

    /* 设置监听端口 */
}).listen(8083, function() {
    console.log('server is listen to 8083')
})