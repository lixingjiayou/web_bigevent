$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1 / 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
        // 给上传绑定一个点击事件
    $('#btnChooseImage').on('click', function() {
            $('#file').click()
        })
        // 为文件选择框绑定change事件
    $('#file').on('change', function(e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择图片')
        }

        // 拿到用户选择的文件
        var file = e.target.files[0]
            // 将文件转化为路径 返回值就是文件路径了
        var imgURL = URL.createObjectURL(file)
            // 重新初始化裁剪区域
        console.log(imgURL)
        $image
            .cropper('destroy') //销毁
            .attr('src', imgURL) //重新设置图片路径
            .cropper(options) //重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function() {
        // 拿到裁剪过后的头像
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 调用接口发送到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            // 数据请求体 对象
            data: {
                avatar: dataURL
            },
            // 成功回调函数
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')

                window.parent.getUserInfo()
            }
        })
    })
})