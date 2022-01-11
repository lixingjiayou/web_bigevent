$(function() {

    var layer = layui.layer
    var form = layui.form

    var laypage = layui.laypage

    // 定义美化时间过滤器  不懂不懂

    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date)
                // 获取年月日
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

        }
        // 定义时间补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n

        // if (n > 9) {
        //     return n = n
        // } else {
        //     return n = '0' + n
        // }
    }



    // 定义一个查询参数对象 将参数对象提交到服务器 ajax 传到服务器的参数
    var q = {
        pagenum: 1, //第一页
        pagesize: 2, //多少条
        cate_id: '', //分类
        state: '' //状态
    }

    // 调用初始化列表方法
    initTable()
        // 调用初始化分类的方法
    initCate()

    // 获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    // 调用分页的方法
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类的方法 方法调用纪要用 xxx() 代码执行从上到下 没执行代码 肯定前面的错误了没执行
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }

                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)

                $('[name= cate_id]').html(htmlStr)
                    // layui 执行的时候没有类别项   form.render() 重新渲染
                form.render()
            }
        })
    }


    // 为筛选表单绑定submit 事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 属性选择器拿到表单中的值
            // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        console.log(123)
        console.log(cate_id)
            // 为查询参数对象 q中对应的属性赋值

        // res返回值里面的Id大写草   $value.Id  
        q.cate_id = cate_id
        q.state = state
            // 根据最新的筛选条件重新渲染表格数据
        initTable()

    })

    // 定义渲染分页的方法 
    function renderPage(total) {
        // 调用分页方法渲染分页 配置对象
        laypage.render({
            elem: 'pageBox', //分页容器id
            count: total, //条数
            limit: q.pagesize, //每页显示几条
            curr: q.pagenum, //默认被选中分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换触发jump
            jump: function(obj, first) {

                // 死循环可以通过判断满足什么条件来跳出循环
                // 获取最新的页码值赋值
                q.pagenum = obj.curr

                // 把最新的条目数 赋值到q
                q.pagesize = obj.limit
                    // 根据最新的q获取对应的数据列表
                    // initTable()
                if (!first) {
                    initTable()
                }
            }




        })
    }
    // 通过代理的方式 ，为删除按钮绑定点击事件

    $('tbody').on('click', '.btn-delete', function() {
        // 获取删除个数

        var len = $('.btn-delete').length
            // 点了在判断按钮个数 还没执行删除操作 判断现存删除按钮 然后执行代码命令
        console.log(len)
            // 获取属性attr()
        var id = $(this).attr('data-id')

        // 询问是否删除数据
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                        // 数据删除完成后判断是否当前页是否还有数据
                        // 如果没有页码值减一 载调用 initTable()
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                    layer.close(index)
                }
            })

        })
    })

})