// 入口函数
$(function () { 
    // 获取用户信息
  getUserInfo()

  var layer = layui.layer
  // 点击按钮实现退出功能  给退出按钮绑定点击事件
  $('#btnLogout').on('click', function () {
    
    // 弹出提示框
    layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
      //do something

      // 1 清楚本地的token值
      localStorage.removeItem('token')
      // 2.跳转到登录页面
      location.href='/login.html'
      // console.log('ok');

      // 关闭confirm询问框
      layer.close(index);
    });
  })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象 
        
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        // 请求成功的回调函数
         // 调用 renderAvatar 渲染用户的头像
        success: function (res) {
            // 打印成功的函数
            //console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
      },
        //只要发起ajax请求  不论成功还是失败 到会调用complete函数
      // complete: function (res) {
      //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //      // 1. 强制清空 token
      //     localStorage.removeItem('token')
      //      // 2. 强制跳转到登录页面
      //     location.href='/login.html'
      //   }
      // }
      
      
        // // 不论成功还是失败，最终都会调用 complete 回调函数
        //   complete: function(res) {
        //     // console.log('执行了 complete 回调：')
        //     // console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //       // 1. 强制清空 token
        //       localStorage.removeItem('token')
        //       // 2. 强制跳转到登录页面
        //       location.href = '/login.html'
        //     }
        //   }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
      // 3.1 渲染图片头像
      $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
      $('.text-avatar').hide()
    } else {
      // 3.2 渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()
      $('.text-avatar')
        .html(first)
        .show()
    }
  }