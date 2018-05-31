/*! layer mobile-v2.0 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function (a) {
    "use strict";
    var b = document, c = "querySelectorAll", d = "getElementsByClassName", e = function (a) {
        return b[c](a)
    }, f = {type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: "scale"}, g = {
        extend: function (a) {
            var b = JSON.parse(JSON.stringify(f));
            for (var c in a)b[c] = a[c];
            return b
        }, timer: {}, end: {}
    };
    g.touch = function (a, b) {
        a.addEventListener("click", function (a) {
            b.call(this, a)
        }, !1)
    };
    var h = 0, i = ["layui-m-layer"], j = function (a) {
        var b = this;
        b.config = g.extend(a), b.view()
    };
    j.prototype.view = function () {
        var a = this, c = a.config, f = b.createElement("div");
        a.id = f.id = i[0] + h, f.setAttribute("class", i[0] + " " + i[0] + (c.type || 0)), f.setAttribute("index", h);
        var g = function () {
            var a = "object" == typeof c.title;
            return c.title ? '<h3 style="' + (a ? c.title[1] : "") + '">' + (a ? c.title[0] : c.title) + "</h3>" : ""
        }(), j = function () {
            "string" == typeof c.btn && (c.btn = [c.btn]);
            var a, b = (c.btn || []).length;
            return 0 !== b && c.btn ? (a = '<span yes type="0">' + c.btn[0] + "</span>", 2 === b && (a = '<span no type="1">' + c.btn[1] + "</span>" + a), '<div class="layui-m-layerbtn">' + a + "</div>") : ""
        }();
        if (c.fixed || (c.top = c.hasOwnProperty("top") ? c.top : 100, c.style = c.style || "", c.style += " top:" + (b.body.scrollTop + c.top) + "px"), 2 === c.type && (c.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (c.content || "") + "</p>"), c.skin && (c.anim = "up"), "msg" === c.skin && (c.shade = !1), f.innerHTML = (c.shade ? "<div " + ("string" == typeof c.shade ? 'style="' + c.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (c.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (c.skin ? "layui-m-layer-" + c.skin + " " : "") + (c.className ? c.className : "") + " " + (c.anim ? "layui-m-anim-" + c.anim : "") + '" ' + (c.style ? 'style="' + c.style + '"' : "") + ">" + g + '<div class="layui-m-layercont">' + c.content + "</div>" + j + "</div></div></div>", !c.type || 2 === c.type) {
            var k = b[d](i[0] + c.type), l = k.length;
            l >= 1 && layer.close(k[0].getAttribute("index"))
        }
        document.body.appendChild(f);
        var m = a.elem = e("#" + a.id)[0];
        c.success && c.success(m), a.index = h++, a.action(c, m)
    }, j.prototype.action = function (a, b) {
        var c = this;
        a.time && (g.timer[c.index] = setTimeout(function () {
            layer.close(c.index)
        }, 1e3 * a.time));
        var e = function () {
            var b = this.getAttribute("type");
            0 == b ? (a.no && a.no(), layer.close(c.index)) : a.yes ? a.yes(c.index) : layer.close(c.index)
        };
        if (a.btn)for (var f = b[d]("layui-m-layerbtn")[0].children, h = f.length, i = 0; h > i; i++)g.touch(f[i], e);
        if (a.shade && a.shadeClose) {
            var j = b[d]("layui-m-layershade")[0];
            g.touch(j, function () {
                layer.close(c.index, a.end)
            })
        }
        a.end && (g.end[c.index] = a.end)
    }, a.layer = {
        v: "2.0", index: h, open: function (a) {
            var b = new j(a || {});
            return b.index
        }, close: function (a) {
            var c = e("#" + i[0] + a)[0];
            c && (c.innerHTML = "", b.body.removeChild(c), clearTimeout(g.timer[a]), delete g.timer[a], "function" == typeof g.end[a] && g.end[a](), delete g.end[a])
        }, closeAll: function () {
            for (var a = b[d](i[0]), c = 0, e = a.length; e > c; c++)layer.close(0 | a[0].getAttribute("index"))
        }
    }, "function" == typeof define ? define(function () {
        return layer
    }) : function () {
        var a = document.scripts, c = a[a.length - 1], d = c.src, e = d.substring(0, d.lastIndexOf("/") + 1);
        c.getAttribute("merge") || document.head.appendChild(function () {
            var a = b.createElement("link");
            return a.href = e + "need/layer.css?2.0", a.type = "text/css", a.rel = "styleSheet", a.id = "layermcss", a
        }())
    }()
}(window);

//以下是自定义的扩展~

/**
 *  mes 弹层消息
 * @param data 消息内容
 * @param time 时间
 * @param cb 去哪儿,可以传入网址或者回调函数
 */
layer.msg = function(data,time,cb) {
    time = time == undefined ? 3 : time;
    cb = cb == undefined ? '' : cb;
    layer.open({
        content: data,
        skin: 'msg',
        shadeClose: false,
        time: time, //2秒后自动关闭
        end: function(){
            if(cb &&typeof(cb)=="function"){
                cb && cb();
            }else{
                if(cb != ''){
                    location.href = cb;
                }
            }
        }
    });
};
/**
 *  带回调的弹窗~
 * @param data 内容
 * @param btn 时间
 * @param cb 回调函数
 */
layer.alert = function (data,btn,cb) {
    btn = isNull(btn) == false ? '我知道了' : btn;
    layer.open({
        content: data,
        btn: btn,
        end: function(){
            cb && cb();
        }
    });
};
/**
 * 加载中...
 * @param open 关闭时间
 * @param data 提示文字
 */
layer.loading = function(data) {
    content = !isNull(data)?'加载中...':data;
    if(data != undefined && data == false){
        layer.closeAll();
        // console.log('close--loading');
        return true;
    }else{
        layer.open({
            type: 2,
            shadeClose: false,
            content:content
        });
    }
};
/**
 * 新页面弹出
 * @param html
 */
layer.page = function(html,style,up) {
    html = !isNull(html)?'<h1>hello world<br/> <button onclick="layer.closeAll()">关掉</button></h1>':html;
    var obStyle = 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;';
    style = isNull(style)?style:obStyle;
    up = isNull(up)?'up':up;
    var pageii = layer.open({
        type: 1,
        content: html,
        anim: up,
        style:style,
    });
};
/**
 *  带回调的弹窗
 * @param html html内容
 * @param btn 按钮
 * @param cb 回调
 */
layer.shadow = function(html,btn,cb) {
    html = isNull(html)?'hello world':html;
    btn = isNull(btn)?'我知道了':btn;
    layer.open({
        content: html,
        btn: btn,
        shadeClose: false,
        yes: function(){
            layer.closeAll();
            cb&&cb();
        }
    });
};
/**
 *  判断是否为Null
 * @param data 内容
 * @returns {number} 返回结果
 */
function isNull(data){
    return (data == "" || data == undefined || data == null || data == false) ? false : true;
}

/*!
 * Collapsible, jQuery Plugin
 * jquery.actionsheet-1.0.js
 * Copyright (c) 2014
 * author: Bian Kaiming (Walle)
 * @ version: 1.0.1
 * Date: 7/28 17:59 2015
 */
;(function($){
    $.fn.actionsheet = function(options){
        var defaultVal = {
            title : false, 				//消息头，为空或字符串
            textArr : ["是","否"],		//消息文本
            icon : false,				//图标路径,不填或false为无图标，true为默认图标
            opacity : 0.5,				//屏幕锁层透明度
            cancelText : "取消",		//取消按钮文本
            lockEvent : true,
            cancelImgUrl : "",			//取消按钮图标路径
            callback : function(){},	//正确选择回调函数
            cancel : function(){}		//取消后要执行的函数
        };
        var options = $.extend(defaultVal,options);
        var strVar = "<style id='actionsheetCss'>";
        strVar += "#haodai_actionsheet{position:fixed;left:0;right:0;padding-top:10px;margin:auto;float:left;z-index:9999;border-top:#fff 1px solid;box-shadow:0 -1px 2px rgba(0,0,0,.4);bottom:0;padding-left:10px;padding-right:10px;border-top:transparent 1px solid;box-shadow:0 -1px 2px transparent}";
        strVar += "#actionsheet_cancel,#haodai_info{width:100%;border-radius:5px;overflow:hidden;background:#fff}";
        strVar += "#actionsheet_cancel,#haodai_info p{text-align:center;background-image:none;text-shadow:none;box-shadow:none;font-weight:400;border:none;color:#157dfb;background-color:#fff;cursor:pointer;line-height:40px;font-size:16px;border-bottom:1px solid #e5e5e5;padding:0;margin:0}";
        strVar += "#actionsheet_btn{font-weight:700;margin:9px 0;border-radius:5px;background-color:#fff;color:#157dfb}";
        strVar += "</style>";
        $('body').append(strVar);
        return this.each(function(){
            var _self = $(this);
            var building = {//构建
                init : function(){
                    if(options.textArr[0]['name'] == undefined){
                        var tempArr = [];
                        $.each(options.textArr,function (v,k) {
                            tempArr[v] = {};
                            tempArr[v]['name'] = k;
                            tempArr[v]['id'] = v;
                        });
                        options.textArr = tempArr;
                    }
                    var actionsheet_html = this.build_alert();
                    $(_self).append(actionsheet_html);
                    screen_lock("body");
                    building.position();
                    $("#actionsheet_cancel").on("click",function(){//取消函数
                        removeactionsheet();
                        options.cancel(options.textArr);
                    });
                    if(options.lockEvent){
                        $("#screen_lock").on("click",function(){//取消函数
                            removeactionsheet();
                            options.cancel(options.textArr);
                        });
                    }else{}
                    $("p","#haodai_actionsheet").on("click",function(){
                        options.callback($(this).text(),$(this).attr('value'),$(this).attr("id").substr(7),options.textArr);
                        removeactionsheet();
                    });
                },
                stru : {
                    actionsheet_star : "<div id='haodai_actionsheet'>",//最外层
                    info_star : "<div id='haodai_info'>",//信息层
                    textArr : function(){
                        var conTextArr = "";
                        for (var i = 0; i < options.textArr.length; i++) {
                            conTextArr = conTextArr + "<p value='"+options.textArr[i]['id']+"' id='choose_" + i + "'>"+ options.textArr[i]['name'] +"</p>";
                        }
                        return conTextArr;
                    },//文字层
                    icon : "<img src='"+ options.icon +"' />",//图标
                    btn_star : "<div id='actionsheet_btn'>",//按钮层
                    cancel : function(){
                        if(options.cancelImgUrl != ""){
                            return "<button type='button' id='actionsheet_cancel'>" + "<img src='"+ options.cancelImgUrl +"' />" + options.cancelText +"</button>";
                        }else{
                            return "<button type='button' id='actionsheet_cancel'>"+ options.cancelText +"</button>";
                        }
                    },//Cancel按钮
                    div_end : "</div>"
                },
                position : function(){
                    var h = $("#haodai_actionsheet").height();
                    $("#haodai_actionsheet").css("bottom",-h);
                    $("#haodai_actionsheet").animate({
                        bottom:0
                    },150);
                },
                build_alert : function(){
                    var layer = this.stru.actionsheet_star +
                        this.stru.info_star;
                    if(options.icon){
                        layer += this.stru.icon;
                    }
                    layer += this.stru.textArr();
                    layer += this.stru.div_end;
                    layer += this.stru.btn_star;
                    layer += this.stru.cancel();
                    layer += this.stru.div_end;
                    layer += this.stru.div_end;
                    return layer;
                }
            };
            //从DOM中删除
            var removeactionsheet = function(){
                var h = $("#haodai_actionsheet").height();
                $("#haodai_actionsheet").animate({
                    bottom : -h
                },150,function(){
                    $(this).remove();
                    $("#screen_lock").fadeOut(150,function(){
                        $(this).remove()
                    });
                    //$("body").css("overflow","auto");
                    $('#actionsheetCss').remove();
                });
            };

            //屏幕锁
            var screen_lock = function(con){
                //var screenH =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scrollH = $(document).height();
                var heigh = parseFloat(scrollH);
                //$("body").css("overflow","hidden");
                var lock_div = "<div id='screen_lock' style='position:absolute;background:#000;opacity:"+ options.opacity +";top:0px;left:0px;z-index:9998;width:100%;height:"+heigh+"px;'></div>";
                $(con).append(lock_div);
                $("#screen_lock").on('touchmove', function (event) {
                    event.preventDefault();
                }, false);
            }

            building.init();
        });
    };
})(jQuery);

/**
 * tips 底部弹窗选择插件
 * @param textArr 结果数组
 * @param c 当前对象
 * @param call 回调函数
 */
layer.tips = function(textArr, c, call) {
    $("body").actionsheet({
        textArr: textArr,
        /**
         * 回调函数里面获取的数据
         * @param inst 当前的值
         * @param bd 当前的id，如果传入
         * @param cd 当前的序号
         * @param ed 之前传入进去的对象
         */
        callback: function (inst,bd,cd,ed) {
            $(c).addClass("active").val(inst,bd,cd,ed);
            //如果没有传入回调函数,则直接调用页面中自定义的chose.CallBack方法
            try{
                if(!call){
                    chose.CallBack(inst,bd,cd,ed);
                }else{
                    call(inst,bd,cd,ed);
                }
            }catch(err) {
                //没有传入回调.页面也没有定义方法,直接忽略~
            }
        }
    });
}

layer.confirm = function (data,btn,cb) {
    btn = isNull(btn) == false ? '我知道了' : btn;
    layer.open({
            content: data
            ,btn: btn
            ,yes: function(index){
                layer.close(index);
            },no:function(){
                cb && cb();
            }
    });
};