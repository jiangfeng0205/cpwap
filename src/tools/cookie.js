let cookie = {
    /**
     *
     * @param key
     * @param value
     * @param day 小时
     * @returns {string}
     */
    origin:function () {
        if(location.origin == 'file://'){
            return false;
        }
        return true;
    },
    set:function (key,value,day=7) {
        if(!this.origin()){
            return localStorage.setItem(key,value);
        }else{
            let exp = new Date();
            exp.setTime(exp.getTime() + day*(60*60*1000*24));
            return document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString();
        }
    },
    get:function (key) {

        if(!this.origin()){
            return localStorage.getItem(key);
        }else{
            let arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
    },
    clear:function () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
        console.log('clear')
        if(keys) {  
            for(var i = keys.length; i--;)  
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
        }  
    },
    del:function (key) {
        if(!this.origin()){
            return localStorage.removeItem(key);
        }else{
            let exp = new Date();
            exp.setTime(exp.getTime() - 1);
            let cval = this.get(key);
            if(cval!=null)
                return document.cookie= key + "="+cval+";expires="+exp.toGMTString();
        }
    },
    value:function(name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            let expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                let date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            let path = options.path ? '; path=' + options.path : '';
            let domain = options.domain ? '; domain=' + options.domain : '';
            let secure = options.secure ? '; secure' : '';
            return document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            let cookieValue = null;
            if (document.cookie && document.cookie != '') {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },
    islogin:function () {
        if(this.get('a_token') && this.get('uid')){
            return true;
        }else{
            let goUrl = window.location.href;
            this.set('backUrl',goUrl);
            location.href = '#/login';
        }
    },
    referrer:function () {
        let ref = '';
        if (document.referrer.length > 0) {
            ref = document.referrer;
        }
        try {  if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
        } catch (e) {}
        return ref;
    }
};
export default cookie;