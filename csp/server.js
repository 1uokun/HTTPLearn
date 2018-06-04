const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request come', request.url)

    /* 2.加入if判断测试外链js */
    if(request.url === '/') {
        const html = fs.readFileSync('test.html', 'utf-8')
        response.writeHead(200, {
            'Content-Type': 'text/html',
            /* 1.安全策略：default-src对全局进行限制
            *  script-src对script进行限制
            *  只能以http和https的方式加载，不能直接写在html里面
            * 'Content-Security-Policy': 'default-src http: https:'
            */

            /* 限制只能通过本域名的js加载
             * 'Content-Security-Policy': 'default-src \'self\''
            */
            /* 向服务器汇报 report-uri+空格+服务器地址
             * 当出现了限制加载资源时，不强制不能加载，只进行report
             * 'Content-Security-policy-Report-Only': 'default-src \'self\'; form-action \'self\'; report-uri /test'
            */

            /* 限制表单提交范围 */
            'Content-Security-Policy': 'default-src \'self\'; form-action \'self\''
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            'Content-Type': 'application/javascript'
        })
        response.end('console.log("script loading")')
    }

    /* 设置监听端口 */
}).listen(8082, function() {
    console.log('server is listen to 8082')
})