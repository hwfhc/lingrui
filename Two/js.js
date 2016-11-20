//初始化backtotop
$(document).ready(function(){
    $('#backtotop').each(function() {
            $(this).fadeOut(0);
        });
});

//滑入效果
$(window).scroll(function () {
    $('.slide').each(function() {
        var position = $(this).offset().top;//获取当前元素相对于整个文档的顶端的距离
        var windowTop = $(window).scrollTop();//获取滚动条内顶部隐藏高度,等价当前视窗位置
        var height = $(this).height();//获取元素高度
        if (position < windowTop + height )//相当于元素有部分显示出来时，条件成立
        {
            $(this).addClass('slidein');
        }
    });
});

//backtotop效果
$(window).scroll(function () {
    $('#backtotop').each(function() {
        var windowTop = $(window).scrollTop();//获取滚动条内顶部隐藏高度,等价当前视窗位置

        if (windowTop < 650 )//判断当前viewport位置
        {
            $(this).fadeOut(1000);//我觉得fadeOut和fadeIn函数会创建一个队列，依次进行
        }

        if (windowTop > 650 )//判断当前viewport位置
        {
            $(this).fadeIn(1000);
        }
    });
});



