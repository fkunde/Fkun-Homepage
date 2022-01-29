$(document).ready(function() {

  $('a.blog-button').click(function() {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed');
    } else {
      $('.panel-cover').css('max-width',currentWidth);
      $('.panel-cover').animate({'max-width': '700px', 'width': '30%'}, 400, swing = 'swing', function() {} );
    }
  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });
      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

    } else {
      $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    }
    $('.btn-mobile-menu__icon').toggleClass('fa fa-bars fa fa-chevron-circle-up animated fadeIn');
  });

  $('.navigation-wrapper .blog-button').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });

      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');
    }
    
    $('.btn-mobile-menu__icon').toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
  });
});

//language
var dict = {};
var systemLang = navigator.language.toLowerCase().slice(0, 4);
$(function () {
  registerWords();
  switch (getCookieVal("lang")) {
    case "en":
      setLanguage("en");
      break
    case "zh":
      setLanguage("zh");
      break
    case "hk":
        setLanguage("zh");
      break
    case "jp":
      setLanguage("jp");
      break
    case "de":
      setLanguage("de");
      break
    default:
      setLanguage(systemLang);
  }

  // 切换语言事件
  $("#enBtn").bind("click", function () {
    setLanguage("en");
  });
  $("#zhBtn").bind("click", function () {
    setLanguage("zh");
  });
  $("#hkBtn").bind("click", function () {
    setLanguage("hk");
  });
  $("#jpBtn").bind("click", function () {
    setLanguage("jp");
  });
  $("#deBtn").bind("click", function () {
    setLanguage("de");
  });
});

function setLanguage(lang) {
  setCookie("lang=" + lang + "; path=/;");
  translate(lang);
}

function getCookieVal(name) {
  var items = document.cookie.split(";");
  for (var i in items) {
    var cookie = $.trim(items[i]);
    var eqIdx = cookie.indexOf("=");
    var key = cookie.substring(0, eqIdx);
    if (name == $.trim(key)) {
      return $.trim(cookie.substring(eqIdx + 1));
    }
  }
  return null;
}

function setCookie(cookie) {
  var Days = 30; //此 cookie 将被保存 30 天
  var exp = new Date(); //new Date("December 31, 9998");
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = cookie + ";expires=" + exp.toGMTString();
}

function translate(lang) {
  if (sessionStorage.getItem(lang + "Data") != null) {
    dict = JSON.parse(sessionStorage.getItem(lang + "Data"));
  } else {
    loadDict();
  }

  $("[lang]").each(function () {
    switch (this.tagName.toLowerCase()) {
      case "input":
        $(this).val(__tr($(this).attr("lang")));
        break;
      default:
        $(this).text(__tr($(this).attr("lang")));
    }
  });
  $("[lang-input]").each(function () {
    $(this).attr("placeholder", __tr($(this).attr("lang-input")));
  });
}

function __tr(src) {
  return (dict[src] || src);
}

function loadDict() {
  var lang = (getCookieVal("lang") || "zh");
  $.ajax({
    async: false,
    type: "GET",
    url: "/lang/" + lang + ".json",
    success: function (msg) {
      dict = msg;
      sessionStorage.setItem(lang + 'Data', JSON.stringify(dict));
    }
  });

}
// 遍历所有lang属性的标签赋值
function registerWords() {
  $("[lang]").each(function () {
    switch (this.tagName.toLowerCase()) {
      case "input":
        $(this).attr("lang", $(this).val());
        break;
      default:
        $(this).attr("lang", $(this).text());
    }
  });
  $("[lang-input]").each(function () {
    if ($(this).attr("lang-input") === "") {
      $(this).attr("lang-input", $(this).attr("placeholder"));
    }
  });
}

//fixed position
document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
  if (flag == 1) {
    event.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }
}, { passive: false });//passive 参数不能省略，用来兼容ios和android

//background image
$(function () { 
  var index = 0;
  var changeImage = function(){
  var url = 'https://api.fkun.tech/img/index.php/'+ '&r=' + index;
  backgroundImage.src = url;
  setTimeout(3000);
  }
  var onImageLoad = function(){
      var oldindex = index -1 < 0 ? 5 : index-1;
      var oldspan = $('.cb-slideshow li span').get(oldindex);
      var newspan = $('.cb-slideshow li span').get(index);
      //设置新背景
      $(newspan).css('background-image', 'url(' + backgroundImage.src + ')');
      $(oldspan).removeClass('active');
      $(newspan).addClass('active');
      //索引变更
      index++;
      if(index >5){
          index = 0;
      }
      setTimeout(changeImage,6000);
  }
  
  var backgroundImage = new Image();
  backgroundImage.onload = onImageLoad;
  var wait = 0;
  
  changeImage();
  })