// 注意每次调用$.get $.post $.ajax()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的的接口 设置 headers请求接口
    // 对象挂载属性
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete 回调函数
    options.complete = function(res) {
        // console.log('执行了回调函数complete')
        // console.log(res) 判断代码是否执行
        // 在complete 回调函数中1可以使用responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token 键 字符串
            localStorage.removeItem('token')

            // 强制跳转
            location.href = '/login.html'
        }
    }

})