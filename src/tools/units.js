import cookie from './cookie'
export default {
    /**
     * 照片裁切尺寸
     * @param w
     * @returns {string}
     */
    clip: function (w) {
        switch (w) {
            case 40:
                return '-40.40';
                break;
            case 20:
                return '-20.20';
                break;
            case 12:
                return '-20.12';
                break;
            case 60:
                return '-120.60';
            default:
                return '-40.40';
                break;
        }
    },
    isVehicleNumber(vehicleNumber) { //匹配车牌的正则表达式
        var result = false;
        if (vehicleNumber.length == 6){
          var express = /^[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
          result = express.test(vehicleNumber);
        }
        return result;
    },
    isCardNo(card) {  //匹配身份证的正则
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        if(reg.test(card) === false) { 
            alert("身份证输入不合法"); 
            return false; 
        } 
    },
    eval:function (str) {
        return  eval('(' + str + ')');
    },
    isNull:function (str) {

    },
    get:function (that,t) {

    },
    random:function () {
      return Math.random();
    },
    timeGs:function (nS,sss=true) {
            let now = new Date(parseInt(nS) * 1000);
            let y = now.getFullYear();
            let m = now.getMonth() + 1;
            let d = now.getDate();
        if(sss){
            return now.toTimeString().substr(0, 8);
        }else{
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        }
    },
    isUndefined:function (und) {
        if(und == undefined){
            return true
        }
        return false;
    },
    cacheGet:function (str) {
        let tempStr = cookie.get(str);
        if(tempStr){
            return this.eval(tempStr);
        }else{
            return [];
        }

    },
    isLogin:function (back) {
      if(cookie.get('user_id') && cookie.get('user_token')){
          return true;
      }else{
          if(back){
              cookie.set('goBack',location.href);
              location.href = '#/login';
              return false;
          }
          return false;
      }
    },
    title:{
        set:function (title) {
            document.title = title;
            setTimeout(function () {
                $('.header .title').html(title)
            })
        }
    },
    strlen: function (str) {
        let realLength = 0, len = str.length, charCode = -1;
        for (let i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
                realLength += 1;
            else
                realLength += 2;
        }
        return realLength;
    },
    gogo:function (url='') {
        if(url != '') location.href = url
    },
    formatDateTime: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    timemake: function (date) {
        date = new Date(Date.parse(date.replace(/-/g, "/")));
        date = date.getTime();
        return this.getDateDiff(date);
    },
    abc: function () {
        return 1;
    },
    time: function () {
        return new Date();
    },
    getHost:function () {
        return 'https://www.kkok.cn'; //线上环境
    },
    getPicHost:function(){//图片链接地址
        // return 'https://www.kkok.cn'; //线上环境
        return 'https://wuweiyixun.oss-cn-beijing.aliyuncs.com';
    },
    // getHost:function () {
    //     return 'http://h5.wwcrpt.com'; //线上环境
    // },
    // getHost:function () { //测试服务器
    //     return 'http://47.93.190.162'; 
    // },
    domin:function (name = '') {
        return this.getHost()+'/index.php/api/'+ name;
    },
    host: function (name = '', model = 'Index') {
        // console.log(name)
        return this.getHost()+'/index.php/index/'+model+'/' + name;
    },
    tips:function (tips='操作成功',time=2000,type='success') {
        let toast = new auiToast();
        switch (type) {
            case "success":
                toast.success({
                    title:tips,
                    duration:time
                });
                break;
            case "fail":
                toast.fail({
                    title:tips,
                    duration:time
                });
                break;
            case "custom":
                toast.custom({
                    title:tips,
                    html:'<i class="aui-iconfont aui-icon-laud"></i>',
                    duration:time
                });
                break;
            case "loading":
                toast.loading({
                    title:tips,
                    duration:time
                },function(ret){
                    console.log(ret);
                    setTimeout(function(){
                        toast.hide();
                    }, 3000)
                });
                break;
        }
    },
    doname:function (name) {
        return this.getHost()+'/'+name;
    },
    params:function (json,type) { //有用户id
        let systoken = 'asd654ds654#654dsv4$556$45';
        let uid = cookie.get('user_id');
        let token = cookie.get('user_token');
        if(token) {
            token = systoken+'_'+token;
        } else {
            token = systoken;
        }
        if(type){
            return JSON.stringify($.extend({}, {uid:uid,token:token},json))
        }
        return $.extend({}, {uid:uid,token:token},json);
    },
    paramsno:function (json,type) { //无用户id
        let systoken = 'asd654ds654#654dsv4$556$45';
        let token = cookie.get('user_token');
        if(token) {
            token = systoken+'_'+token;
        } else {
            token = systoken;
        }
        if(type){
            return JSON.stringify($.extend({}, {token:token},json))
        }
        return $.extend({}, {token:token},json);
    },
    api: function (name) {
        return this.getHost+'/api.php/' + name;
    },
    http: function () {
    },
    loading: function (text = '加载中...') {
        let toast = new auiToast({});
        if (text == false) {
            $('#loadingStatus').hide();
            toast.hide();
        } else {
            $('#loadingStatus').show();
            toast.loading({
                title: text,
                duration: 2000
            });
        }
    },
    getDateDiff: function (dateTimeStamp) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime();
        let diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            console.log("结束日期不能小于开始日期！");
        }
        let monthC = diffValue / month;
        let weekC = diffValue / (7 * day);
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;
        let result = '';
        if (monthC >= 1) {
            result = "" + parseInt(monthC) + "个月前";
        } else if (weekC >= 1) {
            result = "" + parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前";
        } else {
            result = "刚刚发表";
        }
        return result;
    },
    cutString: function (str, len) {
        if (str == null) return '这人好懒啊,什么介绍都没写.';
        if (str.length * 2 <= len) {
            return str;
        }
        let strlen = 0;
        let s = "";
        for (let i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + "...";
                }
            }
        }
        return s;
    },
    GetQuery: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    },
    cache: function (key, value = '') {
        if (value == '') {
            return localStorage.getItem(key);
        } else {
            if (value == 'del') {
                return localStorage.removeItem(key);
            } else {
                return localStorage.setItem(key, value);
            }
        }
    },
    iFrameHeight: function () {
        let ifm = document.getElementById("iframepage");
        let subWeb = document.frames ? document.frames["iframepage"].document
            : ifm.contentDocument;
        if (ifm != null && subWeb != null) {
            ifm.height = subWeb.body.scrollHeight;
        }
    },
    GetLength: function (str) {
        let realLength = 0, len = str.length, charCode = -1;
        for (let i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
                realLength += 1;
            else
                realLength += 2;
        }
        return realLength;
    },
    upload: function (formData, url = 'http://www.wwtest.com') {
        $.ajax({
            url: url,
            type: 'POST',
            data: formData[0],
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                reject(response);
            }
        });
    },
    removeArr: function (array, index) {
        if (index <= (array.length - 1)) {
            for (let i = index; i < array.length; i++) {
                array[i] = array[i + 1];
            }
        } else {
            throw new Error('超出最大索引！');
        }
        array.length = array.length - 1;
        return array;
    },
    base64Encode: function (input) {
        let rv;
        rv = encodeURIComponent(input);
        rv = unescape(rv);
        rv = window.btoa(rv);
        return rv;
    },
    base64Decode: function (input) {
        if(!input) return '';
        let rv = window.atob(input);
        rv = escape(rv);
        rv = decodeURIComponent(rv);
        return rv;
    },
    encode:function (str) {
        if(str){
            return escape(this.base64Encode(JSON.stringify(str)));
        }
    },
    decode:function (str) {
        if(str){
            return eval('(' + this.base64Decode(unescape(str)) + ')');
        }else{
            return {};
        }
    },
    uid:function (type='?') {
        if(cookie.get('uid')){
            return type+'uid='+cookie.get('uid');
        }else{
            return '';
        }
    },
    isWeixin:function () {
        let ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    },
    noScroll:function () {
        $("body").on("touchmove",function(event){
            event.preventDefault;
        })
    },
    Scroll:function () {
        $("body").off("touchmove");
    },
    direction:function () {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            if (window.orientation === 180 || window.orientation === 0) {
                return 0; //竖屏
            }
            if (window.orientation === 90 || window.orientation === -90 ){
                return 1; //横屏
            }
        }, false);
    }
}
