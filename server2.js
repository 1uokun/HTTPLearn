const http = require('http')

http.createServer(function(request, response) {
    console.log('request come', request.url)

    /* test1、2：设置响应头允许跨域请求
    *  有无设置响应头，浏览器都会发送请求，服务器也会返回内容
    *  但浏览器解析后发现这个是不允许的，浏览器就会拦截这些内容
    */
    response.writeHead(200, {
        /* 跨域允许的请求源、地址 */
        'Access-Control-Allow-Origin': '*',
        /* 跨域允许的请求头 */
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        /* 跨域允许的方式 */
        'Access-Control-Allow-Method': 'POST,PUT,DELETE',
        /* 允许用上面方式进行跨域请求的最长时间： s（不需要发送预请求，可以直接发送正式请求） */
        'Access-Control-Max-Age': '1000',
    })

    response.end('123')
}).listen(8083, function() {
    console.log('server is listen to 8083')
})