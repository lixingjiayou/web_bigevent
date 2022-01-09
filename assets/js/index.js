$(function() {
    getUserInfo()
        // 退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            // 点击确定后执行程序
            // 清空本地token
            localStorage.removeItem('token')
                // 跳转到登录业
            location.href = '/login.html'
                // 关闭confirm询问框
            layer.close(index)
        })
    })

})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''

        // },

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户头像函数
            console.log(res.data)
            renderAvatar(res.data)

        },
        // 无论成功失败都会调用complete回调函数
        // complete: function(res) {
        //     // console.log('执行了回调函数complete')
        //     // console.log(res) 判断代码是否执行
        //     // 在complete 回调函数中1可以使用responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token 键 字符串
        //         localStorage.removeItem('token')

        //         // 强制跳转
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像 sttr 赋值属性
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
            // 转换大写
        var first = name[0].toUpperCase()
            // html('') 节点 里面要字符串哦
        $('.text-avatar').html(first).show()
    }
}