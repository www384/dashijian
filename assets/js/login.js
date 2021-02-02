$(function () {
    // 点击link_reg的a链接 显示去登录 隐藏去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击link_login a链接 显示注册 隐藏去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则 导入layui.all.js文件 
    // 从layui中获取form对象
    var form = layui.form //声明全局变量
    var layer = layui.layer
    // 通过 form.verify（）自定义验证规则
    form.verify({

        // 自定义一个叫做pwb 校验规则
        pwb: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 验证输入密码和确认密码是否一致的规则
        repwd: function (value) {
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
    // 调口 发起请求
    // // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止表单的默认行为
        e.preventDefault()
        // 发起ajax请求
        var data = {
                   username: $('#form_reg [name=username]').val(),
                 password: $('#form_reg [name=password]').val()
                }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            // 模拟人的点击行为直接跳转到登录界面
            $('#link_login').click()
           
        }
        )
    })
    //     // 监听注册表单的提交事件
    // $('#form_reg').on('submit', function(e) {
    //     // 1. 阻止默认的提交行为
    //     e.preventDefault()
    //     // 2. 发起Ajax的POST请求
    //     var data = {
    //       username: $('#form_reg [name=username]').val(),
    //       password: $('#form_reg [name=password]').val()
    //     }
    //     $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
    //       if (res.status !== 0) {
    //         return layer.msg(res.message)
    //       }
    //    layer.msg('注册成功，请登录！')
    //       // 模拟人的点击行为
    //       $('#link_login').click()
    //     })
    // })
     // // 监听登录表单的提交事件
     $('#form_login').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发送ajax请求、
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 请求携带的数据 data 
            // 快速获取表单的数据
            data:$(this).serialize(),
            // 请求成功的回调函数
            success:function(res){
                if(res.status !==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登录成功得到的 token 字符串 保存到localstorage本地存储里面
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
        })
     })


})