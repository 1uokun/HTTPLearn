const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request come', request.url)

    /* 读取文件 */
    const html = fs.readFileSync('test.html', 'utf-8')
    /* 设置响应头 */
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    response.end(html)
    /* 设置监听端口 */
}).listen(8082, function() {
    console.log('server is listen to 8082')
})