const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request come', request.url)

    if(request.url === '/') {
        /* 读取文件 */
        const html = fs.readFileSync('test.html', 'utf-8')
        /* 设置响应头 */
        response.writeHead(200, {
            'Content-Type': 'text/html',
            /* 设置cookie,设置过期时间 可以设置多个cookie 设置HttpOnly后不能通过JS获取 */
            /* 不能跨域设置cookie */
            'Set-Cookie': ['id=123;max-age=20', 'abc=456;HttpOnly']
        })

        response.end(html)
    }

    /* 设置监听端口 */
}).listen(8082, function() {
    console.log('server is listen to 8082')
})