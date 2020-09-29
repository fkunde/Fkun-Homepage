$(function () { 
var index = 0;
var changeImage = function(){
var sacle = $(window).width() / $(window).height();
var action = 'pc';
    if(sacle < 1){
        action = 'mobile';
    }
var url = 'https://api.fkun.tech/img/index.php/'+ '&r=' + index;
backgroundImage.src = url;
setTimeout(5000);
}
var onImageLoad = function(){
    var oldindex = index -1 < 0 ? 10 : index-1;
    var oldspan = $('.cb-slideshow li span').get(oldindex);
    var newspan = $('.cb-slideshow li span').get(index);
    //设置新背景
    $(newspan).css('background-image', 'url(' + backgroundImage.src + ')');
    //背景自适应
    var width = parseInt($(newspan).css('width'));
    var height = parseInt($(newspan).css('height'));
    var rate = width / height;//屏幕宽高比
    var th = backgroundImage.width / rate;//图片对应本屏幕应有高度
    if(backgroundImage.height < th)//图片实际高度小于所需高度，高度100%自适应舍弃部分多余宽度
    {
        $(newspan).css('background-size', 'auto 100%');
    }else//图片实际高度大于所需高度，宽度100%自适应舍弃部分多余高度
    {
        $(newspan).css('background-size', '100% auto');
    }
    //淡入淡出
    $(oldspan).removeClass('active');
    $(newspan).addClass('active');
    //索引变更
    index++;
    if(index >10){
        index = 0;
    }
    setTimeout(changeImage,3000);
}

var backgroundImage = new Image();
backgroundImage.onload = onImageLoad;
var wait = 500;

changeImage();
})