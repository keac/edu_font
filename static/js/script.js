var _getUrlPara = function _getUrlPara(name, url) {
    if (!url)
        url = window[['location']][['href']];
    name = name[['replace']](/[\[]/, '\\[')[['replace']](/[\]]/, '\\]');
    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex[['exec']](url);
    return results === null ? null : results[1];
};

var _isPhoneNum = function _isPhoneNum(str) {
    var reg = /^((13[0-9])|(147)|(15[^4,\D])|(17[0-9])|(18[0,0-9]))\d{8}$/;
    if (typeof str === 'string')
        return reg[['test']](str);
    return reg[['test']](str[['toString']]());
};
var _isEmail = function _isEmail(str) {
    var reg = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;
    if (typeof str === 'string')
        return reg[['test']](str);
    return reg[['test']](str[['toString']]());
};
var _isUrl = function _isUrl(str) {
    var reg = /^((http)|(https))+:[^\s]+\.[^\s]*$/;
    if (typeof str === 'string')
        return reg[['test']](str);
    return reg[['test']](str[['toString']]());
};
var _isValidUserName = function _isValidUserName(str) {
    var reg = /^[A-Za-z][A-Za-z0-9_]{4,}$/;
    return reg[['test']](str);
};
var _getAbsUrl = function _getAbsUrl(endpoint, base) {
    if (!base) {
        base = _getSiteUrl();
    }
    if (/^http([s]?)/[['test']](endpoint)) {
        return endpoint;
    }
    if (/^\/\//[['test']](endpoint)) {
        return window[['location']][['protocol']] + endpoint;
    }
    if (/^\//[['test']](endpoint)) {
        return base + endpoint;
    }
    return base + '/' + endpoint;
};
var _getSiteUrl = function _getSiteUrl() {
    return window[['location']][['protocol']] + '//' + window[['location']][['host']];
};
var _filterDataForRest = function _filterDataForRest(data) {
    // if (typeof data === 'string') {
    //     data += '&_wpnonce=' + TT[['_wpnonce']];
    // } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    //     data[['_wpnonce']] = TT[['_wpnonce']];
    // }
    return data;
};

var _msgbox = {};
_msgbox[['show']] = function (str, type, beforeSel) {
    console.log("error");
    var $msg = $('.msg')
        , tpl = '<button type="button" class="btn-close">\xD7</button><ul><li></li></ul>';
    var $txt = $(tpl);
    if ($msg[['length']] === 0) {
        $msg = $('<div class="msg"></div>');
        beforeSel[['before']]($msg);
    } else {
        $msg[['find']]('li')[['remove']]();
    }
    $txt[['find']]('li')[['text']](str);
    $msg[['append']]($txt)[['addClass']](type)[['show']]();
};
_msgbox[['init']] = function () {
    $('body')[['on']]('click.tt.msgbox.close', '.msg > .btn-close', function () {
        var $this = $(this)
            , $msgbox = $this[['parent']]();
        $msgbox[['slideUp']](function () {
            $msgbox[['remove']]();
        });
    });
};


var popMsgbox = {};
popMsgbox[['basic']] = function (options) {
    options[['customClass']] = 'swal-basic';
    options[['type']] = '';
    options[['confirmButtonColor']] = '#1abc9c';
    options[['confirmButtonClass']] = 'btn-primary';
    swal(options);
}
;
popMsgbox[['alert']] = popMsgbox[['warning']] = function (options, callback) {
    options[['customClass']] = 'swal-alert';
    options[['type']] = 'warning';
    options[['confirmButtonColor']] = '#3498db';
    options[['confirmButtonClass']] = 'btn-info';
    swal(options, callback);
}
;
popMsgbox[['error']] = function (options, callback) {
    options[['customClass']] = 'swal-error';
    options[['type']] = 'error';
    options[['confirmButtonColor']] = '#e74c3c';
    options[['confirmButtonClass']] = 'btn-danger';
    swal(options, callback);
}
;
popMsgbox[['success']] = function (options, callback) {
    options[['customClass']] = 'swal-success';
    options[['type']] = 'success';
    options[['confirmButtonColor']] = '#2ecc71';
    options[['confirmButtonClass']] = 'btn-success';
    swal(options, callback);
}
;
popMsgbox[['info']] = function (options, callback) {
    options[['customClass']] = 'swal-info';
    options[['type']] = 'info';
    options[['confirmButtonColor']] = '#3498db';
    options[['confirmButtonClass']] = 'btn-info';
    swal(options, callback);
}
;
popMsgbox[['input']] = function (options, callback) {
    options[['customClass']] = 'swal-input';
    options[['type']] = 'input';
    options[['confirmButtonColor']] = '#34495e';
    options[['confirmButtonClass']] = 'btn-inverse';
    options[['animation']] = options[['animation']] ? options[['animation']] : 'slide-from-top';
    swal(options, callback);
}
;
popMsgbox[['init']] = function () {
    jQuery(document)[['on']]('click.tt.popMsgbox.show', '[data-toggle="msgbox"]', function (e) {
        var $this = $(this);
        var title = $this[['attr']]('title');
        var text = $this[['data']]('content');
        var type = $this[['data']]('msgtype') ? $this[['data']]('msgtype') : 'info';
        var animation = $this[['data']]('animation') ? $this[['data']]('animation') : 'pop';
        popMsgbox[type]({
            title: title,
            text: text,
            type: type,
            animation: animation,
            confirmButtonText: 'OK',
            showCancelButton: true
        });
    });
};

_msgbox[['popMsgbox']] = popMsgbox;


/* animateCss  */
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

/* Top nav*/
$(".header-nav")['find']("a")['addClass']("hvr-wobble-vertical");

/* Search */

var fnSearch = function fnSearch() {
    var $this = $(this);
    if ($this[['is']]('.disabled, :disabled'))
        return;
    if(headerSearchInput.val()==="")
        return;
    headerSearchForm.submit();
};

var headerSearchForm=$(".header-search-form");
var headerSearch = $(".header-search");
var headerSearchInput = headerSearch.find("input");
var headerSearchIcp = headerSearch.find(".header-search-ico");
headerSearchIcp.click(function () {
    fnSearch()
});
headerSearchInput.keydown(function (e) {
    if (!/(13|38|40)/[['test']](e['keyCode']))
        return;
    fnSearch();
});


/* Shop */
var _userInfoY = 0;
var _userInfoShopCart = $("#user-info-shop-cart");
var _userInfo = $(".user-info");

$(document).on({
    "mouseover": function () {
        clearTimeout(_userInfoY);
        _userInfo['addClass']("shop-hover");
    },
    "mouseleave": function () {
        _userInfoY = setTimeout(function () {
            _userInfo['removeClass']("shop-hover");
        }, 300)
    }
}, "#shop-cart-link,#shop-cart");

var fnShopCart = function () {
    var nshopCart = _userInfoShopCart['find']("ul")['children']("li")['length'];
    var _shopCart = $("#shop-cart")['find'](".cart-title-box")['find']("h5");
    var _shopCartIcon = $("#shop-cart-icon");
    var _clearCart = $("#clear-cart");
    _shopCart['html']("已加入 " + nshopCart + " 门课程");
    _shopCartIcon['find']("span.shopping_icon")['html'](nshopCart);
    if (nshopCart > 0) {
        _shopCartIcon['html']("<span class=\"shopping_icon\">1</span>");
        _userInfoShopCart['css']("display", "block");
        _clearCart['css']("display", "none");
    } else {
        _shopCartIcon['html']("");
        _userInfoShopCart['css']("display", "none");
        _clearCart['css']("display", "block");
    }
};
var _postShopCart = function _postShopCart(_this) {
    var url = "static/json/shopcart.json";
    var data = _this.data("goods-id");
    console.log(data);
    var beforeSend = function beforeSend() {
        console.log("before");
    };
    var finishRequest = function finishRequest() {
        console.log("finishRequest");
    };
    var success = function success(data, textStatus, xhr) {
        console.log(data.success);
        if (data[['success']] && data[['success']] === 1) {
            _this.fadeOut(function () {
                this.remove();
                fnShopCart();
            });
        } else {
            _msgbox[['popMsgbox']][['error']]({
                title: '\u5220\u9664\u5931\u8d25',
                text: data[['message']]
            });
            finishRequest();
        }
    };
    var error = function error(xhr, textStatus, err) {
        _msgbox[['popMsgbox']][['error']]({
            title: '\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u5c1d\u8bd5',
            text: xhr[['responseJSON']] ? xhr[['responseJSON']][['message']] : xhr[['responseText']]
        });
        finishRequest();
    };

    $['ajax']({
        url: url,
        type: "POST",
        data: data,
        dataType: 'json',
        beforeSend: beforeSend,
        success: success,
        error: error
    });
};
var _userCardBoxY=0;
var _userCardBox=$(".g-user-card");
$(document).on({
    " mouseenter": function () {
        clearTimeout(_userCardBoxY);
        _userCardBox['addClass']("hover");
    },
    "mouseleave": function () {
        _userCardBoxY = setTimeout(function () {
            _userCardBox['removeClass']("hover");
        }, 300)
    }
}, ".user-card-box,.g-user-card");
$(function () {

    fnShopCart();
    _userInfoShopCart.find(".del").click(function () {
        _postShopCart($(this)['closest']("li"));
    });
});
