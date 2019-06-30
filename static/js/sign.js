var _url = window.location.pathname;

if (_url.indexOf("login") > 0) {



    /* Sign in*/

    var _form = $('.form-sign_in');
    var _userLoginInput = $('#user_login-input');
    var _passwordInput = $('#password-input');
    var _loginButton = $("#sign_in-btn");
    var _submitting = false;
    var _submitBtn = $('button#sign_up-btn');
    var _submitBtnText = _submitBtn[['text']]();

    var _post = function _post() {

        var url = "static/json/login.json";
        var beforeSend = function beforeSend() {
            _form[['addClass']]('submitting');
            _userLoginInput[['prop']]('disabled', true);
            _passwordInput[['prop']]('disabled', true);
            _submitting = true;
        };
        var finishRequest = function finishRequest() {
            _form[['removeClass']]('submitting');
            _userLoginInput[['prop']]('disabled', false);
            _passwordInput[['prop']]('disabled', false);
            _submitting = false;
        };
        var success = function success(data, textStatus, xhr) {
            if (data[['success']] && data[['success']] === 1) {
                var redirect = _getUrlPara('redirect_to') ? _getAbsUrl(decodeURIComponent(_getUrlPara('redirect_to'))) : _getUrlPara('redirect') ? _getAbsUrl(decodeURIComponent(_getUrlPara('redirect'))) : _getSiteUrl();
                _msgbox[['popMsgbox']][['success']]({
                    title: '\u767b\u5f55\u6210\u529f',
                    text: '\u5c06\u5728 2s \u5185\u8df3\u8f6c\u81f3 ' + redirect,
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window[['location']][['href']] = redirect;
                }, 2000);
            } else {
                _msgbox[['popMsgbox']][['error']]({
                    title: '\u767b\u5f55\u9519\u8bef',
                    text: data[['message']]
                });
                finishRequest();
            }
        };
        var error = function error(xhr, textStatus, err) {
            _msgbox[['popMsgbox']][['error']]({
                title: '\u8bf7\u6c42\u767b\u5f55\u5931\u8d25, \u8bf7\u91cd\u65b0\u5c1d\u8bd5',
                text: xhr[['responseJSON']] ? xhr[['responseJSON']][['message']] : xhr[['responseText']]
            });
            finishRequest();
        };
        $[['ajax']]({
            url: url,
            type:"POST",
            data: _filterDataForRest(_form[['serialize']]()),
            dataType: 'json',
            beforeSend: beforeSend,
            success: success,
            error: error
        });
    };
    var _validate = function _validate(input) {
        if (!input) {
            var userLoginValidated = _validateUserLogin();
            var passwordValidated = _validatePassword();
            return userLoginValidated && passwordValidated;
        } else if (input[['attr']]('name') === 'user_login') {
            return _validateUserLogin();
        } else if (input[['attr']]('name') === 'password') {
            return _validatePassword();
        }
        return false;
    };
    var _validateUserLogin = function _validateUserLogin() {
        if (_userLoginInput[['val']]() === '') {
            _showError(_userLoginInput, '\u8bf7\u8f93\u5165\u8d26\u53f7');
            return false;
        } else if (!_isValidUserName(_userLoginInput.val()) && !_isEmail(_userLoginInput.val())) {
            _showError(_userLoginInput, '\u8d26\u53f7\u683c\u5f0f\u4e0d\u6b63\u786e');
            return false;
        } else if (_userLoginInput[['val']]()[['length']] < 5) {
            _showError(_userLoginInput, '\u8d26\u6237\u957f\u5ea6\u81f3\u5c11\u4e3a5');
            return false;
        }
        _removeError(_userLoginInput);
        return true;
    };
    var _validatePassword = function _validatePassword() {
        if (_passwordInput[['val']]() === '') {
            _showError(_passwordInput, '\u8bf7\u8f93\u5165\u5bc6\u7801');
            return false;
        } else if (_passwordInput[['val']]()[['length']] < 6) {
            _showError(_passwordInput, '\u5bc6\u7801\u957f\u5ea6\u81f3\u5c11\u4e3a6');
            return false;
        }
        _removeError(_passwordInput);
        return true;
    };
    var _showError = function _showError(input, msg) {
        var inputName = input[['attr']]('name');
        switch (inputName) {
            case 'user_login':
                _removeError(_userLoginInput);
                break;
            case 'password':
                _removeError(_passwordInput);
                break;
        }
        input['after']("<div class=\"error-tip\">" + msg + "</div>");
        input['animateCss']("shake")['addClass']("no");
        _loginButton['attr']('disabled', 'true');

    };
    var _removeError = function _removeError(input) {
        input[['parent']]()[['removeClass']]('error')[['children']]('.error-tip')[['remove']]();
        input['removeClass']('no');
        _loginButton['removeAttr']('disabled');

    };
    var _handleSubmitBtnStatus = function _handleSubmitBtnStatus(disable) {
        var status = !!disable;
        _submitBtn[['prop']]('disabled', status);
    };

    $(function () {
        $(document).on({
            "blur keypress keyup input propertychange": function (ev) {

                _validate($(this)) ? _removeError($(this)) : function () {
                }();
                if (ev.keyCode === 13 || ev.which === 13) {
                    return false;
                }
            },
            "click": function () {
                if (!_submitting && $(this)[['attr']]('name') === 'signBtn' && _validate()) {
                    /*Post*/
                    console.log("2333");
                    _post();
                }
            }
        }, "#js-form-sign_in input,#sign_in-btn");
    });

} else {


    var a = function a() {


        var _post = function _post() {

            var url = "static/json/login.json";
            var beforeSend = function beforeSend() {
                _handleInputStatus(true);
                _handleSubmitBtnStatus(true);
                _submitting = true;
                _handleSubmitBtnHtml(true);
            };
            var finishRequest = function finishRequest() {
                _handleInputStatus(false);
                _handleSubmitBtnStatus(false);
                _submitting = false;
                _handleSubmitBtnHtml(false);
            };
            var success = function success(data, textStatus, xhr) {
                if (data[['success']] && data[['success']] === 1) {
                    var redirect = _getUrlPara('redirect') ? _getAbsUrl(decodeURIComponent(_getUrlPara('redirect'))) : _getSiteUrl();
                    _msgbox[['popMsgbox']][['success']]({
                        title: '\u8bf7\u6c42\u6ce8\u518c\u6210\u529f',
                        text: '\u8bf7\u81f3\u60a8\u7684\u90ae\u7bb1\u67e5\u8be2\u5e76\u8bbf\u95ee\u8d26\u6237\u6fc0\u6d3b\u94fe\u63a5\u4ee5\u6700\u7ec8\u5b8c\u6210\u8d26\u6237\u7684\u6ce8\u518c.',
                        showConfirmButton: true
                    });
                    _handleSuccess();
                } else {
                    _msgbox[['popMsgbox']][['error']]({
                        title: '\u6ce8\u518c\u9519\u8bef',
                        text: data[['message']]
                    });
                    finishRequest();
                }
            };
            var error = function error(xhr, textStatus, err) {
                _msgbox[['popMsgbox']][['error']]({
                    title: '\u8bf7\u6c42\u767b\u5f55\u5931\u8d25, \u8bf7\u91cd\u65b0\u5c1d\u8bd5',
                    text: xhr[['responseJSON']] ? xhr[['responseJSON']][['message']] : xhr[['responseText']]
                });
                finishRequest();
            };

            $['ajax']({
                url: url,
                type:"POST",
                data: _form[['serialize']](),
                dataType: 'json',
                beforeSend: beforeSend,
                success: success,
                error: error
            });
        };

        var _form = $('.form-sign_up');
        var _msgSibling = $('#default-tip');
        var _userLoginInput = $('#user_login-input');
        var _emailInput = $('#email-input');
        var _passwordInput = $('#password-input');
        var _captchaInput = $('#captcha-input');
        var _captchaImg = $('img#captcha');
        var _submitBtn = $('button#sign_up-btn');
        var _submitBtnText = _submitBtn[['text']]();
        var _submitting = false;
        var _validate = function _validate(input) {
            var showMsg = arguments[['length']] > 1 && arguments[1] !== undefined ? arguments[1] : true;
            if (!input) {
                return _validateUserLogin(showMsg) && _validateEmail(showMsg) && _validatePassword(showMsg) && _validateCaptcha(showMsg);
            } else {
                var inputName = input[['attr']]('name');
                switch (inputName) {
                    case 'user_login':
                        return _validateUserLogin(showMsg);
                        break;
                    case 'email':
                        return _validateEmail(showMsg);
                        break;
                    case 'password':
                        return _validatePassword(showMsg);
                        break;
                    case 'captcha':
                        return _validateCaptcha(showMsg);
                        break;
                    default:
                        return false;
                }
            }
        };
        var _validateUserLogin = function _validateUserLogin(showMsg) {
            if (_userLoginInput[['val']]() === '') {
                if (showMsg) {
                    _msgbox [['show']]('\u8bf7\u8f93\u5165\u7528\u6237\u540d', 'danger', _msgSibling);
                }
                _userLoginInput[['parent']]()[['addClass']]('has-error');
                return false;
            } else if (!_isValidUserName(_userLoginInput[['val']]()) && !_isEmail(_userLoginInput[['val']]())) {
                if (showMsg) {
                    _msgbox [['show']]('\u7528\u6237\u540d\u5fc5\u987b\u4ee5\u5b57\u6bcd\u5f00\u5934, \u82f1\u6587/\u6570\u5b57/\u4e0b\u5212\u7ebf\u7ec4\u5408', 'danger', _msgSibling);
                }
                _userLoginInput[['parent']]()[['addClass']]('has-error');
                return false;
            } else if (_userLoginInput[['val']]()[['length']] < 5) {
                if (showMsg) {
                    _msgbox [['show']]('\u8d26\u6237\u957f\u5ea6\u81f3\u5c11\u4e3a 5', 'danger', _msgSibling);
                }
                _userLoginInput[['parent']]()[['addClass']]('has-error');
                return false;
            }
            _userLoginInput[['parent']]()[['removeClass']]('has-error');
            return true;
        };
        var _validateEmail = function _validateEmail(showMsg) {
            if (_emailInput[['val']]() === '') {
                if (showMsg) {
                    _msgbox [['show']]('\u8bf7\u586b\u5199\u90ae\u7bb1', 'danger', _msgSibling);
                }
                _emailInput[['parent']]()[['addClass']]('has-error');
                return false;
            } else if (!_isEmail(_emailInput[['val']]())) {

                if (showMsg) {
                    _msgbox [['show']]('\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e', 'danger', _msgSibling);
                }
                _emailInput[['parent']]()[['addClass']]('has-error');
                return false;
            }
            _emailInput[['parent']]()[['removeClass']]('has-error');
            return true;
        };
        var _validatePassword = function _validatePassword(showMsg) {
            if (_passwordInput[['val']]() === '') {
                if (showMsg) {
                    _msgbox [['show']]('\u8bf7\u8f93\u5165\u5bc6\u7801', 'danger', _msgSibling);
                }
                _passwordInput[['parent']]()[['addClass']]('has-error');
                return false;
            } else if (_passwordInput[['val']]()[['length']] < 6) {
                if (showMsg) {
                    _msgbox [['show']]('\u5bc6\u7801\u957f\u5ea6\u81f3\u5c11\u4e3a 6', 'danger', _msgSibling);
                }
                _passwordInput[['parent']]()[['addClass']]('has-error');
                return false;
            }
            _passwordInput[['parent']]()[['removeClass']]('has-error');
            return true;
        };
        var _validateCaptcha = function _validateCaptcha(showMsg) {
            if (_captchaInput[['val']]() === '') {
                if (showMsg) {
                    _msgbox [['show']]('\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a', 'danger', _msgSibling);
                }
                _captchaInput[['parent']]()[['addClass']]('has-error');
                return false;
            } else if (_captchaInput[['val']]()[['length']] !== 4) {
                if (showMsg) {
                    _msgbox [['show']]('\u9a8c\u8bc1\u7801\u957f\u5ea6\u5fc5\u987b\u4e3a 4 \u4f4d', 'danger', _msgSibling);
                }
                _captchaInput[['parent']]()[['addClass']]('has-error');
                return false;
            }
            _captchaInput[['parent']]()[['removeClass']]('has-error');
            return true;
        };
        var _removeMsg = function _removeMsg() {
            $('.form-sign_up>.msg')[['remove']]();
        };
        var _handleInputStatus = function _handleInputStatus(disable) {
            _userLoginInput[['prop']]('disabled', disable);
            _emailInput[['prop']]('disabled', disable);
            _passwordInput[['prop']]('disabled', disable);
            _captchaInput[['prop']]('disabled', disable);
        };
        var _handleCaptchaRefresh = function _handleCaptchaRefresh(captcha) {
            var captchaSel = captcha ? captcha : _captchaImg;
            var originCaptchaUrl = captchaSel[['attr']]('src');
            var date = new Date();
            var tQueryStr = date[['getMilliseconds']]() / 1000 + '00000_' + date[['getTime']]();
            var newCaptchaUrl = originCaptchaUrl[['replace']](/\?t=([0-9_\.]+)/, '?t=' + tQueryStr);
            captchaSel[['attr']]('src', newCaptchaUrl);
        };
        var _handleSubmitBtnStatus = function _handleSubmitBtnStatus(disable) {
            var status = !!disable;
            _submitBtn[['prop']]('disabled', status);
        };
        var _handleSubmitBtnHtml = function _handleSubmitBtnHtml(submitting) {
            if (submitting) {
                _submitBtn[['html']]('<span class="indicator fa fa-spinner spinner"></span>');
            } else {
                _submitBtn[['html']]('')[['text']](_submitBtnText);
            }
        };
        var _handleSuccess = function _handleSuccess() {
            var title = '\u6ce8\u518c\u5b8c\u6210';
            var message = '\u8fd8\u5dee\u4e00\u6b65\u60a8\u5c31\u80fd\u6b63\u5f0f\u62e5\u6709\u4e00\u4e2a\u672c\u7ad9\u8d26\u6237\uff0c\u8bf7\u7acb\u5373\u8bbf\u95ee\u4f60\u6ce8\u518c\u65f6\u63d0\u4f9b\u7684\u90ae\u7bb1\uff0c\u70b9\u51fb\u6fc0\u6d3b\u94fe\u63a5\u5b8c\u6210\u6700\u7ec8\u8d26\u6237\u6ce8\u518c.<br>\u5982\u679c\u60a8\u6ca1\u6709\u6536\u5230\u90ae\u4ef6\uff0c\u8bf7\u67e5\u770b\u5783\u573e\u7bb1\u6216\u90ae\u7bb1\u62e6\u622a\u8bb0\u5f55\uff0c\u5982\u679c\u4ecd\u672a\u83b7\u5f97\u6fc0\u6d3b\u94fe\u63a5\uff0c\u8bf7\u8054\u7cfb\u7f51\u7ad9\u7ba1\u7406\u5458.';
            _form[['html']]('<h2 class="title sign_up-title mb30">' + title + '</h2>' + '<p id="default-tip">' + message + '</p>');
        };
        var _body = $('body');
        _body[['on']]('click.tt.msgbox.close', '.msg > .btn-close', function () {
            var $this = $(this)
                , $msgbox = $this[['parent']]();
            $msgbox[['slideUp']](function () {
                $msgbox[['remove']]();
            });
        });


        _body[['on']]('blur', '.local-sign_up>.input-container input', function () {
            console.log("2333");
            _validate($(this));
        })[['on']]('keyup', '.local-sign_up>.input-container input', function () {
            var validateResult = _validate(null, false);
            _handleSubmitBtnStatus(!validateResult);
            if (validateResult) {
                _removeMsg();
            }
        });
        _body[['on']]('click', 'img.captcha', function () {
            _handleCaptchaRefresh($(this));
        });
        _body[['on']]('click', '.local-sign_up>#sign_up-btn', function () {
            if (_validate()) {
                _post();
            }
            return false;
        });
    };
    a();
}
