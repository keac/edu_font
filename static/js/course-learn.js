$(function () {

    var _modChapter = $("#mod-chapters");
    /* video button */
    var _chapterTitle = _modChapter['find'](".chapter")['find']("h3.title");
    _chapterTitle.on({
        "click": function () {
            var _ulVideo = $(this)['next']("ul.video");
            var _videoI = $(this)['children']("i:last-child");
            var videoShow = _ulVideo['is'](":visible") ?
                {ulVideo: "none", videoIo: "fa-sort-desc", videoIt: "fa-caret-left"} :
                {ulVideo: "block", videoIo: "fa-caret-left", videoIt: "fa-sort-desc"};
            _ulVideo['css']("display", videoShow.ulVideo);
            _videoI['removeClass'](videoShow.videoIo)['addClass'](videoShow.videoIt);
        }
    });

    /* start */
    var isStart = true;
    var _courseBefore = $("#course-before");
    var _courseStart = $("#course-start");
    var _modChaptersLi = _modChapter['find'](".chapter")['find']("li")['find']("a");
    _modChaptersLi.addClass("hvr-sweep-to-right");

    /* If start */
    if (!isStart) {
        _courseBefore.css("display", "block");
        _courseStart.css("display", "none");
    } else {
        _courseStart.css("display", "block");
        _courseBefore.css("display", "none");

        /* Get study */
        var url = "static/json/courser-learn-status.json";
        var data = "2333";

        $['ajax']({
            url: url,
            type: "POST",
            data: data,
            dataType: 'json',
            success: function success(data) {
                var $mediasId = [],
                    _html;
                if (data[['result']] && data[['result']] === 1) {
                    var _data = data.data;
                    var $medias = $('.mod-chapters').find('li');
                    $($medias).each(function (k) {
                        $mediasId.push($($medias[k]).attr('data-media-id'));
                    });
                    $($mediasId).each(function (k) {
                        if (_data === '') {
                            var $item = $medias.eq(k);
                            _html = '<i class="video-now"><em class="fa fa-circle-o "></em></i>';
                            $($item).find('a').prepend(_html);

                            return true;

                        }
                        if (_data[$mediasId[k]]) {
                            var $itemId = $medias.eq(k);
                            if (_data[$mediasId[k]].finished === "1") {
                                _html = '<i class="video-now"><em class="fa fa-check-circle"></em></i>';
                            } else {
                                _html = '<i class="video-now">\u6700\u8fd1\u5b66\u4e60<em class="fa fa-free-code-camp"></em></i>';
                            }

                            $($itemId).find('a').prepend(_html);
                        } else {
                            $itemId = $('.mod-chapters').find('li').eq(k);
                            _html = '<i class="video-now"><em class="fa fa-circle-o "></em></i>';
                            $($itemId).find('a').prepend(_html);
                        }

                    })
                } else {
                    _msgbox[['popMsgbox']][['error']]({
                        title: '\u83b7\u53d6\u5b66\u4e60\u8fdb\u5ea6\u5931\u8d25',
                        text: data[['message']]
                    });
                }
            }


        });

    }

    /* Change list */
    $(document)['on']({
        "click": function () {
            var thisId = $(this).attr("id").replace("-nav", "");
            console.log(thisId);
            var disAreaDiv = $("#disArea").find("div");
            var courseMenuLi = $(".course-menu").find("li");
            disAreaDiv.each(function () {
                $(this).removeClass("active")
            });
            courseMenuLi.each(function () {
                $(this).removeClass("active")
            });
            $(this).addClass("active");

            $(("#" + thisId)).addClass("active");
            return false;
        }
    }, "#mod-chapters-nav,#note-content-nav,#comment-content-nav,#ask-content-nav");

    /* Comment */
    var _textCommentMsg = function _textCommentMsg(_isShow, text) {
        var errorTip = $(".errortip");
        var isShow = _isShow ? "fadeIn" : "fadeOut";
        errorTip[isShow]("fast")['html'](text);
    };
    var _textComment = function _textComment(text) {
        console.log(text.html());
        var textCommentLength = text.val().length;
        var errorTipMsg = "\u5c0f\u4f19\u5b50\u592a\u76ae\u4e86\uff0c\u674e\u65f6\u73cd\u7684\u76ae";
        var jsLimitTip = textCommentLength > 300 ? {c: "#f00000", d: true, r: false} : {
            c: "#d0d6d9",
            d: false,
            r: true
        };
        _textCommentMsg(jsLimitTip.d, errorTipMsg);
        jsLimit.css("color", jsLimitTip.c).html(textCommentLength);
        return jsLimitTip.r;
    };
    var _validateCaptcha = function _validateCaptcha(showMsg) {
        if (_captchaInput[['val']]() === '') {
            if (showMsg) {
                _textCommentMsg(true, '\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a');
            }
            _captchaInput[['parent']]()[['addClass']]('has-error');
            return false;
        } else if (_captchaInput[['val']]()[['length']] !== 4) {
            if (showMsg) {
                _textCommentMsg(true, '\u9a8c\u8bc1\u7801\u957f\u5ea6\u5fc5\u987b\u4e3a 4 \u4f4d');
            }
            _captchaInput[['parent']]()[['addClass']]('has-error');
            return false;
        }
        _captchaInput[['parent']]()[['removeClass']]('has-error');
        return true;
    };
    var jsLimit = $("#js-pl-limit");
    var textCommentsubmit = $("#js-pl-submit");
    var textComment = $("#textComment");
    var _captchaInput = $(".js-verify-box").find("input");
    $(document)['on']({
        "keypress keyup input propertychange": function () {

            if (_textComment(textComment)) {
                console.log("true");
                textCommentsubmit.removeAttr("disabled");
            } else {
                textCommentsubmit.attr("disabled", "disabled")
            }

        }
    }, "#textComment,.js-verify-box input");
    $(document)['on']({
        "click": function () {
            if (_validateCaptcha(true)) {

            } else {
                textCommentsubmit.attr("disabled", "disabled")
            }
        }
    }, "#js-pl-submit");

    /* Start and like */
    var shPostUrl = {
            praise: "",
            cancelPraise: "",
            collect: ""
        },
        shPostFn = {};
    shPostFn.praise = function (a, h, v) {
        $.ajax({
            url: shPostUrl.praise,
            data: {
                id: a,
                mid: h.data("mid")
            },
            type: "GET",
            dataType: "json",
            success: function (a) {
                if (0 === a.result) {
                    var c = parseInt(v.text());
                    v.text(c + 1);
                    h.addClass("on");
                    h.find("span").addClass("on");
                    h.attr("title", "取消赞")
                }
            }
        })
    };
    shPostFn.cancel = function (a, h, v) {
        $.ajax({
            url: shPostUrl.cancelPraise,
            data: {
                id: a,
                mid: h.data("mid")
            },
            type: "POST",
            dataType: "json",
            success: function (a) {
                if (0 === a.result) {
                    var c = parseInt(v.text());
                    v.text(c - 1);
                    h.removeClass("on");
                    h.find("span").attr("class", "icon-thumb-revert");
                    h.attr("title", "点赞");
                }
            }
        })
    };
    shPostFn.collect = function (a, h, v) {
        var g = h.data("mid").split("|");
        return void $.ajax({
            url: shPostUrl.collect,
            data: {
                id: a,
                mid: g[0]
            },
            type: "GET",
            dataType: "json",
            success: function (a) {
                if (0 === a.result) {
                    var c = parseInt(v.text());
                    v.text(c + 1);
                    h.addClass("on");
                    h.find("span").addClass("on icon-star-revert praise-anim");
                    h.find("i").text("已收藏");
                    h.attr("title", "已收藏");
                }
            }
        })
    };
    $(document)['on']({
        "click": function () {
            var _this = $(this);
                var a = _this.closest("li").data("id")
                    , c = _this.find("em")
                    , v = _this;
                v.hasClass("on") ? shPostFn.cancel(a, v, c) : shPostFn.praise(a, v, c)

        }
    }, ".jsStart,jsHeart");

});