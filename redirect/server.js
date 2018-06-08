const http = require('http')

http.createServer(function(request, response) {
    console.log('request come', request.url)

    if(request.url === '/') {
        /* 设置响应头
        *  302 临时移动（跳转到某地址）
        *  301 永久重定向
        * */
        response.writeHead(302, {
            'Location': '/new'
        })
        response.end('')
    }

    if(request.url === '/new') {
        /* 设置响应头 */
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end('<div>content</div>')
    }

    /* 设置监听端口 */
}).listen(8082, function() {
    console.log('server is listen to 8082')
})