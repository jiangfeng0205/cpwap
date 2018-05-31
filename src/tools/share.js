import '../../static/NativeShare'
export default {
    init:function (shareData,open) {
        if(this.is_weixin()) {
            this.weixin(shareData);
        }
        if(this.is_qq()) {
            this.qqShare(shareData);
        }
        if(open) this.default(shareData);

    },
    default: function (shareData) {
        let nativeShare = new NativeShare();
        nativeShare.setShareData(shareData);
        nativeShare.call();
    },
    weixin: function (shareData) {
        if(!this.is_weixin()){
            console.info('不是微信浏览器');
            this.qqShare(shareData);
            return false;
        }
        $.post('http://he29.com/api.php/wechat/sharejs',
            {
                url: location.href.split('#')[0]
            }, function (res) {
                let share = res.data;
                wx.config({
                    debug: false,
                    appId: share.appid,
                    timestamp: share.timestamp,
                    nonceStr: share.noncestr,
                    signature: share.sign,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ]
                });
                let title = shareData.title;
                let desc = shareData.desc;
                let _imgUrl = shareData.icon;
                let url = shareData.link;
                wx.ready(function () {
                    //分享朋友圈
                    wx.onMenuShareTimeline({
                        title: title,
                        link: window.location.href,
                        imgUrl: _imgUrl, // 分享图标
                        success: function () {
                            //layer.msg('分享成功');
                        }
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: desc,
                        link: window.location.href,
                        imgUrl: _imgUrl, // 分享图标
                        trigger: function (res) {
                        },
                        success: function (res) {
                            //layer.msg('分享成功');
                        }
                    });
                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: _imgUrl, // 分享图标
                        success: function () {
                            //layer.msg('分享成功');
                        }
                    });
                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: _imgUrl, // 分享图标
                        success: function () {
                            //layer.msg('分享成功');
                        }
                    });
                });
            });
    },
    qqShare:function (shareData) {
        if(document.querySelector('meta[name="description"]') != null) {
            document.querySelector('meta[name="description"]').setAttribute('content',shareData.desc);
            document.querySelector('meta[name="description"]').setAttribute('itemprop',"description");
            document.querySelector('meta[itemprop="name"]').setAttribute('content',shareData.title);
            document.querySelector('meta[itemprop="image"]').setAttribute('content',shareData.icon);
        } else {
            var meta1 = document.createElement('meta');
            meta1.setAttribute('content',shareData.desc);
            meta1.setAttribute('name','description');
            meta1.setAttribute('itemprop','description');
            var meta2 = document.createElement('meta');
            meta2.setAttribute('content',shareData.title);
            meta2.setAttribute('itemprop','name');
            var meta3 = document.createElement('meta');
            meta3.setAttribute('content',shareData.icon);
            meta3.setAttribute('itemprop','image');
            var head = document.querySelector('head');
            head.insertBefore(meta3,head.firstElementChild);
            head.insertBefore(meta2,head.firstElementChild);
            head.insertBefore(meta1,head.firstElementChild);

        }
    },
    is_weixin:function () {
        let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    is_qq:function () {
        return navigator.userAgent.indexOf("MQQBrowser")>-1
    }
}