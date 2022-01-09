// 入口函数 $()包装成jqury对象 function () 是立即执行函数
$(function() {
    // 点击去注册账号的链接 字符串格式 id 用# 类用.
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
        console.log('dadadad')
    })


    // 从layui 获取 from 对象
    var form = layui.form
        // 提示用户消息
    var layer = layui.layer
        // 通过form.verify()自定义校验规则
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        //  button 是按钮 submit类型 提交表单数据 e是event时间
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        // jquery 封装的ajax请求服务器接口api
        // 路径 参数是对象形式 字符串 和jquery 格式 val()变为字符串格式 jquery 和html格式有区别
        // 发送post请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://www.liulongbin.top:3007/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    // return console.log('注册失败')
                    return layer.msg(res.message)
                }
                layer.msg('登录成功,请登录')
                    // 模拟人的点击行为 跳转到登录
                $('#link_login').click()
            })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
            // ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            // res 返回结果
            success: function(res) {
                if (res.status !== 0) {
                    // return 终止代码执行
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                    // console.log(res.token)
                    // 将登陆成功的token字符串保存到本地locaStorage
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页 /代表根路径
                    // location.href = '/index.html'
            }
        })
    })
})