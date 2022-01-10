$(function() {
    var form = layui.form
    var layer = layui.layer
        // 表单验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
        // 初始化用户表单的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                    // 调用form .val()快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单数据 submit 提交
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件 捕获 冒泡
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            // 参数
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功！')
                    // 成功后执行 后面的程序
                    // 调用父页面里面的方法
                    // window.parent 当前页面的父亲
                window.parent.getUserInfo()
            }
        })
    })

})