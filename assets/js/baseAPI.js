// 注意每次调用$.get $.post $.ajax()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})