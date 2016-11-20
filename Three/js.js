/***淡入效果***/
function FadeIn(element0, time0, opacity0)
{
    /*
     * 参数说明
     * element0==>需要淡入的元素
     * time0==>淡入时间
     * opacity0==>淡入到指定的透明度,0~100
     */
    var opacity = opacity0 / 100;
    var element = element0;
    var internal = time0 / opacity0;
    //显示元素,并将元素值为0透明度(不可见)
    var opacity_now = 0;
//循环淡入
    var timer = setInterval(frame, internal * 1000);
    element0.style.display="block";
    function frame()
    {
        if (opacity_now == opacity * 100)
        {
            clearInterval(timer);
        }
        else
        {
            opacity_now += 1;
            element.style.opacity = opacity_now / 100;
        }
    }
}

/***淡出效果(默认透明度100)***/
function FadeOut(element0, time0)
{
    /*
     * 参数说明
     * element0==>需要淡出的元素
     * time0==>淡出时间
     */
    var element = element0;
    var internal = time0 / 100;
    //显示元素,并将元素值为0透明度(不可见)
    var opacity_now = 100;
//循环淡出
    var timer = setInterval(frame, internal * 1000);
    function frame()
    {
        if (opacity_now == 0)
        {
            element0.style.display="none";
            clearInterval(timer);
        }
        else
        {
            opacity_now -= 1;
            element.style.opacity = opacity_now / 100;
        }
    }
}