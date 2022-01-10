$(function() {
    // 密码的校验规则
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 监听提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // 点击了提交按钮发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')

                }

                layui.layer.msg('更新密码成功！')
                    // $('.layui-form') 是 jquery 元素
                    // dom 元素 reset() 方法清空 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })

})