$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
        // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {

                // 快速渲染页面可以用模板引擎 res 返回结果有很多对象
                // 渲染好了以后是个字符串 可以进行 dom 操作
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })

    }

    // 为添加按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        // 方法里面 传对象相当于传参数 对象里面有很多属性
        indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
            // content:'' 字符串型  html()拿到dom 的格式 html结构
    })

    // 页面上开始没有 添加文章分类的form 表单 添加后才拼接的
    // 通过代理形式为表form-add 表单添加表单绑定submit 元素选择器
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                    // 根据索引关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
        // 通过代理btn - edit 按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')

        // 发起请求获取对应分类的数据 data:返回的res是一个字符串
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 动态渲染的表单数据 通过代理的方式 修改表单添加submit事件 数据 name value
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')

                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })


    // 通过代理的形式 为删除按钮绑定点击事件 回调函数
    $('body').on('click', '.btn-delete', function() {
        // this 获取到当前的button按钮 attr('')获取属性
        var id = $(this).attr('data-id')
            // 提示用户是否删除 data:{} 数据对象
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })

    })

})