function tcviewScroll(id) {

    //构造滚动条:
    var nano = null;
    if ((typeof id) == 'string') {
        nano = $('#tcview-' + id + '  > .nano');
    } else {
        nano = id;
    }
    // nano.nanoScroller({preventPageScrolling: true});//启用滚动
    nano.nanoScroller({
        scroll: 'top'
    }); //重置滚动到顶部
}

!function($) {
    "use strict";

    var pageHolder;
    var floatContainer = {};
    var notyContainer;
    var addNew = false;
    $.tcWaitAlert = function(options) {
        var defaults = {
            type: 'info',
            // DESC     : 颜色类型
            // VALUE    : primary || info || success || warning || danger || mint || purple || pink ||  dark
            // TYPE     : String


            icon: 'fa fa-refresh fa-spin fa-lg',
            // DESC     : 图标
            // VALUE    : (Icon Class Name)
            // TYPE     : String


            title: (options.title ? options.title : ''),
            // VALUE    : 标题
            // TYPE     : String

            message: (options.message ? options.message : ''),
            // VALUE    : 消息
            // TYPE     : String


            closeBtn: true,
            // VALUE    : 现实关闭按钮
            // TYPE     : Boolean



            container: 'floating',
            // DESC     : 容器
            // VALUE    : page || floating ||  "specified target name"
            // TYPE     : STRING


            floating: {
                position: 'top-right',
                // Floating position.
                // Currently only supports "top-right". We will make further development for the next version.


                animationIn: 'jellyIn',
                // Please use the animated class name from animate.css

                animationOut: 'fadeOut'
                // Please use the animated class name from animate.css

            },

            html: null,
            // html内容


            focus: true,
            //是否滚动焦点


            timer: 0
            // DESC     : 关闭倒计时
            // VALUE    : Value is in milliseconds. (0 to disable the autoclose.)
            // TYPE     : Number



        };

        var opt = defaults;
        var el = $('<div class="alert-wrap" animated="' + opt.floating.animationIn + '"></div>');
        el.css('top', '50px');
        var iconTemplate = function() {
            var icon = '';
            if (opt && opt.icon) {
                icon = '<div class="media-left"><span class="icon-wrap icon-wrap-xs icon-circle alert-icon"><i data-type="tcAlert-icon" class="' + opt.icon + '"></i></span></div>';
            }
            return icon;
        };
        var alertTimer;
        var template = function() {
            var clsBtn = opt.closeBtn ? '<button style="display:none;" class="close" type="button"><i class="fa fa-times-circle"></i></button>' : '';
            var defTemplate = '<div data-type="alert-' + opt.type + '" class="alert alert-' + opt.type + '" role="alert">' + clsBtn + '<div class="media">';
            if (!opt.html) {
                return defTemplate + iconTemplate() + '<div class="media-body"><h4 class="alert-title">' + opt.title + '</h4><p class="alert-message">' + opt.message + '</p></div></div>';
            }
            return defTemplate + opt.html + '</div></div>';
        }();
        var closeAlert = function(e) {
            if (opt.container === 'floating' && opt.floating.animationOut) {
                el.removeClass(opt.floating.animationIn).addClass(opt.floating.animationOut);
                if (!nifty.transition) {
                    el.remove();
                }
            }

            el.removeClass('in').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                if (e.originalEvent.propertyName == "max-height") {
                    el.remove();
                }
            });
            clearInterval(alertTimer);
            return null;
        };
        var focusElement = function(pos) {
            nifty.bodyHtml.animate({
                scrollTop: pos
            }, 300, function() {
                el.addClass('in');
            });
        };
        var init = function() {
            if (opt.container === 'page') {
                if (!pageHolder) {
                    pageHolder = $('<div id="page-alert"></div>');
                    nifty.contentContainer.prepend(pageHolder);
                }
                ;

                notyContainer = pageHolder;
                if (opt.focus) {
                    focusElement(0);
                }

            } else if (opt.container === 'floating') {
                if (!floatContainer[opt.floating.position]) {
                    floatContainer[opt.floating.position] = $('<div id="floating-' + opt.floating.position + '" class="floating-container"></div>');
                    nifty.container.append(floatContainer[opt.floating.position]);
                }

                notyContainer = floatContainer[opt.floating.position];

                if (opt.floating.animationIn) {
                    el.addClass('in animated ' + opt.floating.animationIn);
                }
                opt.focus = false;
            } else {
                var $ct = $(opt.container);
                var $panelct = $ct.children('.panel-alert');
                var $panelhd = $ct.children('.panel-heading');

                if (!$ct.length) {
                    addNew = false;
                    return false;
                }


                if (!$panelct.length) {
                    notyContainer = $('<div class="panel-alert"></div>');
                    if ($panelhd.length) {
                        $panelhd.after(notyContainer);
                    } else {
                        $ct.prepend(notyContainer)
                    }
                } else {
                    notyContainer = $panelct;
                }

                if (opt.focus) {
                    focusElement($ct.offset().top - 30);
                }

            }
            addNew = true;
            return false;
        }();

        if (addNew) {
            var alert = $(template);

            el.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
                el.removeClass(el.attr('animated'));
            });

            notyContainer.append(el.append(alert));
            var _close = null;
            _close = el.find('[data-dismiss="noty"]').one('click', closeAlert);
            if (opt.closeBtn) {
                _close = el.find('.close').one('click', closeAlert);
            }
            if (!opt.focus) var addIn = setInterval(function() {
                    el.addClass('in');
                    clearInterval(addIn);
                }, 200);

            var setAlert = function(type, animated, icon) {
                alert.removeClass(alert.attr('data-type'));
                alert.addClass('alert-' + type);
                alert.attr('data-type', 'alert-' + type);
                alert.find('[data-type=tcAlert-icon]').attr('class', icon);
                alert.find('.close').show();
                el.removeClass(el.attr('animated'));
                el.attr('animated', animated);
                el.addClass(animated);
            };

            return {
                func: {
                    title: function(value) {
                        el.find('.alert-title').text(value);
                    },
                    message: function(value) {
                        el.find('.alert-message').empty().append(value);
                    },
                    icon: function(value) {
                        alert.find('[data-type=tcAlert-icon]').attr('class', value);
                    },
                    closeBtn: function(value) {
                        if (value) {
                            alert.find('.close').show();
                        } else {
                            alert.find('.close').hide();
                        }
                    }
                },
                load: function($opt, result_type) {

                    var a = this;

                    if (!$opt) {
                        $opt = options;
                    }

                    if ($opt.url == undefined) {
                        return a;
                    }

                    var success = $opt.success;

                    var info = $opt.info;

                    var error = $opt.error;

                    function __exec(opt, r) {

                        if (opt == undefined) {
                            return true;
                        }

                        if ((typeof opt) == 'function') {
                            return opt(a, r);
                        } else if ((typeof opt) == 'string') {
                            a.func.message(opt);
                        } else {
                            if (opt.title != undefined) {
                                a.func.title(opt.title);
                            }
                            if (opt.message != undefined) {
                                a.func.message(opt.message);
                            }
                            if (opt.icon != undefined) {
                                a.func.icon(opt.icon);
                            }
                            if (opt.closeBtn != undefined) {
                                a.func.closeBtn(opt.closeBtn);
                            }
                        }

                        return true;
                    }

                    $opt.success = function(r) {
                        if (result_type == 'obj') {
                            if (r.result == 'error') {
                                a.error(function() {
                                    return __exec(error, r);
                                });
                            } else if (r.result == 'info') {
                                a.info(function() {
                                    return __exec(info ? info : r.msg, r);
                                });
                            } else if (r.result == 'succeed') {
                                a.done(function() {
                                    return __exec(success, r);
                                });
                            }
                        } else {
                            if (r == 'error') {
                                a.error(function() {
                                    return __exec(error);
                                });
                            } else if (r == 'succeed') {
                                a.done(function() {
                                    return __exec(success);
                                });
                            } else {
                                a.info(function() {
                                    return __exec(info ? info : r);
                                });
                            }
                        }
                    };

                    $opt.error = function(r) {
                        a.error(function() {
                            return __exec(error ? error : '请求时发生错误，请稍后重试');
                        });
                    };


                    $.ajax($opt);

                    return a;
                },
                done: function(callback) {
                    if (callback && callback(this) === false) {
                        return false;
                    }
                    setAlert('success', 'bounce', 'fa fa-check fa-lg');
                    this.close(5000);

                },
                info: function(callback) {
                    if (callback && callback(this) === false) {
                        return false;
                    }
                    setAlert('primary', 'bounce', 'fa fa-info fa-lg');
                    this.close(5000);
                },
                error: function(callback) {
                    if (callback && callback(this) === false) {
                        return false;
                    }
                    setAlert('danger', 'shake', 'fa fa-times fa-lg');
                    this.close(5000);
                },
                close: function(timer, callback) {
                    if (!callback) {
                        callback = options.close;
                    }

                    if (callback && callback(this) === false) {
                        return;
                    }
                    if (opt.timer > 0 || timer > 0) {
                        if (!timer) {
                            timer = opt.timer;
                        }
                        alertTimer = setInterval(closeAlert, timer);
                    } else {
                        closeAlert();
                    }
                }
            }.load();
        }
    };

}(jQuery);

$(function() {

window.tcAlert = {
    //msg提示文本，time延时关闭（默认3秒）
    success: function(msg, time) {
        if ((typeof time) != 'number') {
            time = 3000;
        }

        $.niftyNoty({
            type: 'success',
            icon: 'fa fa-check',
            message: msg,
            container: 'floating',
            timer: time
        });
    },
    //msg提示文本，time延时关闭（默认3秒）
    error: function(msg, time) {
        if ((typeof time) != 'number') {
            time = 3000;
        }

        $.niftyNoty({
            type: 'danger',
            icon: 'fa fa-times',
            message: msg,
            container: 'floating',
            timer: time
        });
    },
    //msg提示文本，time延时关闭（true为默认3秒，不指定数值不自动关闭）
    info: function(msg, time) {
        if (time === true) {
            time = 3000;
        } else if ((typeof time) != 'number' || time < 0) {
            time = 0;
        }

        $.niftyNoty({
            type: 'primary',
            icon: 'fa fa-info',
            message: msg,
            container: 'floating',
            timer: time
        });
    }
}


var tcview = '<div></div>';

var body = '<div class="panel-body nano-content content">';

var buttonPanel = '<h3 class="panel-title">';

var tabPanel = '<ul class="nav nav-tabs">';

var nanoPanel = '<div class="panel nano">';

var headPanel = '<div class="panel-heading">';

var closeButton = '<button class="btn btn-default"><i class="fa fa-times"></i></button>';

var headPanelControl = '<div class="panel-control">';

var toggleNav = function() {
    if (nifty.container.hasClass('mainnav-in') && nifty.screenSize != 'xs') {
        if (nifty.screenSize == 'sm') {
            $.niftyNav('collapse');
        } else {
            nifty.container.removeClass('mainnav-in mainnav-lg mainnav-sm').addClass('mainnav-out');
        }
    }
};

window.slides = {
    list: {},
    add: function(d) {
        if (this.list.length < 3) {
            this.list[d.id - 1] = d;
        }
    },
    closeAll: function() {
        for (var i in this.list) {
            n++;
        }
    },
    curr: null
};

var show = function(id) {
    //$.niftyTcView('show');
    nifty.container.addClass('tcview-in-' + id);
    nifty.window.trigger('resize');
    toggleNav();
}







var hide = function(id) {
    nifty.container.removeClass('tcview-in-' + id);
    nifty.window.trigger('resize');
    $("#tcview-" + id + " .panel-body.content").html('');

    if (slides.list[id]) {
        slides.list[id].cancelCallback();
    }

    delete slides.list[id - 1]
    ;
}








window.tcSlide = function tcSlide($obj) {

    if ($obj.result) {
        $obj.result = $.extend({
            'success': 'succeed',
            'error': 'error'
        }, $obj.result);
    } else {
        $obj.result = {
            'success': 'succeed',
            'error': 'error'
        };
    }

    //初始化等待
    var no = null;

    var _container = $(container);

    var _tcview = $(tcview);

    var _body = $(body);

    var _buttonPanel = $(buttonPanel);

    var _tabPanel = $(tabPanel);

    var _nanoPanel = $(nanoPanel);

    var _headPanel = $(headPanel);

    var _closeButton = $(closeButton);

    var _headPanelControl = $(headPanelControl);


    _headPanelControl.append(_closeButton);
    _headPanelControl.append(_tabPanel);

    _headPanel.append(_headPanelControl);
    _headPanel.append(_buttonPanel);

    _nanoPanel.append(_headPanel);
    _nanoPanel.append(_body);

    _tcview.append(_nanoPanel);

    // _container.append(_tcview);



    //绑定关闭按钮事件
    // closeButton.click(closeSlide);

    //默认按钮配置
    var defaultButtons = {
        cancel: {
            type: 'cancel',
            label: "关闭",
        },
        submit: {
            type: 'submit',
            label: "提交",
            classname: 'btn-primary',
        },
        save: {
            type: 'submit',
            label: "保存",
            classname: 'btn-primary',
        },
        reply: {
            type: 'submit',
            label: "回复",
            classname: 'btn-primary',
        },
    };

    //初始化操作对象，包含niftyTcView、bootbox操作
    var d = {
        tcview: null,
        id: null,
        opt: null,
        //全局初始化
        init: function(d) {

            d.id = 1;

            d.opt = $obj;

            d.tcview = _tcview;
            no = _tcview.niftyOverlay();

            if ($obj.level) {
                d.id = $obj.level;
            }

            var _container = $('.tcview-container-' + d.id);

            if ($obj.width) {
                _container.attr('style', 'width:' + Math.min(65, $obj.width) + '% !important;');
            }

            _tcview.attr('id', 'tcview-' + d.id);
            _tcview.attr('data-target', '#tcview-' + d.id);

            _closeButton.click(function() {
                hide(d.id);
            });

            _container.html('').append(_tcview);

            if (slides.list[d.id - 1]) {
                hide(d.id);
            }

            slides.list[d.id - 1] = d;
            slides.curr = d;

            // $('#container > .boxed').eq(0).append(_container);

        // isInit=true;
        },
        /**
         * 判断当前url是否存在参数
         */
        indexOf: function() {
            var s = $obj.url.indexOf('?');
            if (s === -1) {
                // 没有参数
                return '?';
            } else {
                // 有参数
                return '&';
            }
        },
        /**
         * 初始化URL
         */
        initUrl: function(_url) {
            if (_url == undefined) {
                _url = $obj.url;
            }

            return _url + ($obj.where ? (this.indexOf() + $obj.where) : '');
        },
        /**
         * 初始化按钮
         */
        initButtons: function(d, defbtn) {
            var buttons = [];
            var btns = null;
            var hasBtns = $obj.buttons && $obj.buttons.length > 0;

            if (hasBtns) {
                btns = $obj.buttons;
            } else if (defbtn != undefined) {
                btns = [defaultButtons['cancel'], defaultButtons[defbtn]];
            } else {
                btns = [defaultButtons['cancel']];
            }

            if (btns != null) {
                $.each(btns, function(key) {
                    var value = this;

                    if (hasBtns && defbtn != undefined) {
                        //覆盖默认按钮参数
                        if (value.type == 'submit') {
                            value = $.extend(defaultButtons[defbtn], value);
                        } else if (value.type == 'cancel') {
                            value = $.extend(defaultButtons['cancel'], value);
                        }
                    }

                    (value.classname == undefined) ? value.classname = "btn-default" : value.classname = value.classname;

                    var btn = $("<button type='button' style='margin-left:5px;' class='btn " + value.classname + " btn-name-" + value.type + "'>" + value.label + "</button>");
                    if (value.callback) {
                        btn.click(function() {
                            value.callback(d);
                        });
                    } else {
                        //设置默认回调
                        if (value.type == 'submit') {
                            btn.click(d.submitCallback);
                        } else if (value.type == 'cancel') {
                            btn.click(d.cancelCallback);
                        }
                    }

                    buttons[key] = btn;
                });

                _buttonPanel.html('').append(buttons);
            }
        },
        /**
         * 初始化Tabs
         */
        initTabs: function(d) {
            var navtabs = _tabPanel.html('');

            // //显示标题
            if ($obj.title) {
                navtabs.append('<li class="title">' + $obj.title + '</li>')
            }

            if ($obj.tabs) {
                $.each($obj.tabs, function(key, value) {
                    var classname = '';
                    if (value.classname) {
                        classname = 'class="' + value.classname + '"';
                    }
                    navtabs.append('<li ' + classname + '"><a href="#tcview-tabs-box-' + key + '" data-toggle="tab">' + value.title + '</a></li>');
                });
            }
        },
        /**
         * 关闭回调
         */
        cancelCallback: function() {
            hide(d.id);
        },
        /**
         * 提交回调
         */
        submitCallback: function() {
            if ($obj.submitBeforeCallback && $obj.submitBeforeCallback() === false) {
                return;
            }

            var formname = $obj.formname || 'form#dialogForm';

            var postData = $(formname).serializeArray();

            d.showOverlay();

            $.ajax({
                url: d.initUrl(),
                type: 'POST',
                data: postData,
                success: function(data) {
                    d.hideOverlay();
                    if (data == $obj.result.success) {

                        tcAlert.success($obj.title + "成功");



                        if ($obj.upPrev) {
                            var p = slides.list[$obj.upPrev - 1];

                            p._show(p);
                        }

                        if ($obj.submitAfterCallback) {
                            var _return = $obj.submitAfterCallback();
                            if (_return === false) {
                                hide(d.id);
                                return;
                            } else if (_return === true) {
                                return;
                            }
                        } else {
                            hide(d.id);
                        }


                        setTimeout(function() {
                            location.reload();
                        }, 1000);

                    } else if (data == $obj.result.error) {
                        tcAlert.error($obj.title + "失败");
                    } else {
                        tcAlert.error(data);
                    }
                },
                error: function() {
                    d.hideOverlay();
                    tcAlert.error('请求失败');
                }
            });
        },
        //显示等待
        showOverlay: function() {
            no.niftyOverlay('hide');
            no.niftyOverlay('show');
        },
        //隐藏等待
        hideOverlay: function() {
            no.niftyOverlay('hide');
        },
        closeDailog: function(dailog) {
            dailog.find('button').attr('disable', 'disable');
        },
        /**
         * 显示面板
         */
        _show: function(d) {
            var body = _body;

            body.html('');



            show(d.id);
            d.showOverlay();

            $.ajax({
                url: d.initUrl(),
                type: 'GET',
                success: function(data) {
                    d.hideOverlay();
                    //显示加载的内容
                    body.html(data);

                    if ($obj.scroll !== false) {
                        tcviewScroll(_nanoPanel);
                    } else if ($obj.scroll === false) {
                        body.css('overflow', 'initial');
                    }
                },
                error: function() {
                    tcAlert.error('加载失败');

                    d.hideOverlay();
                    d.cancelCallback();
                }
            })

            if ($obj.submitUrl) {
                $obj.url = $obj.submitUrl;
            }
        },
        /**
         * 修改
         */
        edit: function() {
            this.init(this);
            this.initTabs(this);
            this.initButtons(this, 'save');
            this._show(this);
        },
        /**
         * 添加
         */
        add: function() {
            this.init(this);
            this.initTabs(this);
            this.initButtons(this, 'submit');
            this._show(this);
        },
        /**
         *删除对话框
         */
        del: function() {
            var d = this;
            var msg = '<div class="space-6"></div>' + '<p class="text-center">' + '<i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>' + '是否确定删除?' + '</p>';

            if ($obj.tips) {
                msg = '<p class="text-center">您正在删除 ' + $obj.tips + ' 此操作将不可恢复，请谨慎操作.' + '</p>' + msg;
            } else {
                msg = '<p class="text-center">您正在执行删除，此操作将不可恢复，请谨慎操作.' + '</p>' + msg;
            }

            var bc = bootbox.confirm({
                title: $obj.title,
                width: $obj.width,
                message: msg,
                callback: function(result) {
                    d.closeDailog(bc);
                    if (result) {
                        var alert = $.tcWaitAlert({
                            message: '正在删除...'
                        });
                        $.ajax({
                            timeout: 0,
                            type: "POST",
                            url: d.initUrl(),
                            data: $obj.data,
                            dataType: "JSON",
                            success: function(data) {
                                if (data == $obj.result.success) {
                                    alert.done(function(e) {
                                        e.func.message($obj.title + "成功");
                                    });
                                    if ($obj.upPrev) {
                                        var p = slides.list[$obj.upPrev - 1];

                                        p._show(p);
                                    } else if ($obj.divid) {
                                        $("#" + $obj.divid).load($obj.reload);
                                    } else {
                                        if ($obj.submitAfterCallback && $obj.submitAfterCallback() === false) {
                                            return;
                                        }
                                        setTimeout(function() {
                                            location.reload();
                                        }, 1000);
                                    }
                                } else if (data == $obj.result.error) {
                                    alert.error(function(e) {
                                        e.func.message($obj.title + "失败");
                                    });
                                } else {
                                    alert.info(function(e) {
                                        e.func.message(data);
                                    });
                                }
                            },
                            error: function() {
                                alert.error(function(e) {
                                    e.func.message('请求失败');
                                });
                            }
                        });
                    }
                },
                animateIn: '',
                animateOut: ''
            });
        },
        /**
         *确认对话框
         */
        one: function() {
            var d = this;
            var msg;
            if ($obj.title == "开通虚拟主机") {
                msg = '<p class="text-center">正在开通虚拟主机，请稍后...</p>';
            } else if ($obj.title == "恢复到云主机") {
                var msg = '<div class="space-6"></div>' + '<p class="text-center">' + '<i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>' + '是否确认继续?' + '</p>';
                if ($obj.title) {
                    msg = '<p class="text-center">您正在操作<br/> ' + $obj.title + ' 此操作会将当前快照所属的主机恢复到快照所在时间点，如果要基于快照新建主机请到云服务器页面中进行购买，购买时选择当前快照<br/>请谨慎操作.' + '</p>' + msg;
                } else {
                    msg = '<p class="text-center">您即将执行的操作将不可恢复，请谨慎操作.' + '</p>' + msg;
                }
            } else {
                var msg = '<div class="space-6"></div>' + '<p class="text-center">' + '<i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>' + '是否确认继续?' + '</p>';
                if ($obj.title) {
                    msg = '<p class="text-center">您正在操作 ' + $obj.title + ' 此操作将不可恢复，请谨慎操作.' + '</p>' + msg;
                } else {
                    msg = '<p class="text-center">您即将执行的操作将不可恢复，请谨慎操作.' + '</p>' + msg;
                }
            }

            var bc = bootbox.confirm({
                title: $obj.title,
                width: $obj.width,
                message: msg,
                callback: function(result) {
                    d.closeDailog(bc);
                    if (result) {
                        var alert = $.tcWaitAlert({
                            message: $obj.title ? '正在' + $obj.title + "..." : '正在处理...'
                        });
                        $.ajax({
                            timeout: 0,
                            type: "POST",
                            url: d.initUrl(),
                            data: $obj.data,
                            dataType: "JSON",
                            success: function(data) {
                                if (data == $obj.result.success) {
                                    alert.done(function(e) {
                                        e.func.message($obj.title + "成功");
                                    });

                                    if ($obj.submitAfterCallback && $obj.submitAfterCallback() === false) {
                                        return;
                                    }
                                    setTimeout(function() {
                                        location.reload();
                                    }, 1000);
                                } else if (data == $obj.result.error) {
                                    alert.error(function(e) {
                                        e.func.message($obj.title + "失败");
                                    });
                                } else {
                                    alert.info(function(e) {
                                        e.func.message(data);
                                    });
                                }
                            },
                        // error: function() {
                        //  tcAlert.error("请求失败");
                        // }
                        });
                    }
                },
                animateIn: 'rubberBand',
                animateOut: 'bounceOut'
            });

        },
        /**
         *回复
         */
        reply: function() {
            this.init(this);
            this.initTabs(this);
            this.initButtons(this, 'reply');
            this._show(this);
        },
        /**
         * 自定义(不判断默认按钮)
         */
        open: function() {
            this.init(this);
            this.initTabs(this);
            this.initButtons(this);
            this._show(this);
        },

    };

    return d;
}

window.getSlide = function() {
    return {
        slide: window.slides.curr,
        setTab: function(index, url, submit_url, action) {
            var slide = this.slide;
            $(slide.tcview.find("a[href=#tcview-tabs-box-" + index + "]")).click(function() {
                var op = slide.opt;

                op.url = url;
                op.submitUrl = submit_url;
                hide(slide.id);
                var s = tcSlide(op);
                alert(action);
                s[action]();
            });
        }
    };
}
});



document.write("<script type='text/javascript' src='/Adm/View/default/Public/Js/common.js'></script>");
