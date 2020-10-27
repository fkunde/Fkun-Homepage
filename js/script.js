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


document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
  if (flag == 1) {
    event.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }
}, { passive: false });//passive 参数不能省略，用来兼容ios和android

