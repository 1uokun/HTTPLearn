const http = require('http')
const fs = require('fs')

/* CacheTest、EtagTest */
http.createServer(function(request, response) {
    console.log('request come', request.url)

    if(request.url === '/') {
        /* 读取文件 */
        const html = fs.readFileSync('test.html', 'utf-8')
        /* 设置响应头 */
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })

        response.end(html)
    }

    if(request.url === '/script.js') {
        /* 获取数据签名 */
        const etag = request.headers['if-non-match']
        if(etag === '777') {
            /* 304请求允许，资源未修改 */
            response.writeHead(304, {
                'Content-Type': 'text/javascript',
                /* 设置缓存时间 */
                'Cache-Control': 'max-age=20000, no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('')
        } else {
            /* 设置响应头 */
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                /* 设置缓存时间 */
                'Cache-Control': 'max-age=20000, no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('console.log("script loaded")')
        }
    }

    /* 设置监听端口 */
}).listen(8082, function() {
    console.log('server is listen to 8082')
})