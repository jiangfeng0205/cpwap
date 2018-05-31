// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex';
import VueScroller from 'vue-scroller';
import layer from '../static/layer.m'
import toast from '../static/toast'
import BaiduMap from 'vue-baidu-map'
import '../static/need/layer.css'
import units from './tools/units'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import mintui from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import FastClick from 'fastclick' //解决ios点击延迟
require('swiper/dist/css/swiper.css');

// import Navigation from 'vue-navigation'  //页面缓存

import defins from './router/define';
import uploader from './components/frame/uploader'//多图上传
import VueInputCode from 'vue-input-code';
Vue.component('VueInputCode', VueInputCode)
FastClick.attach(document.body);

Vue.use(ElementUI)
Vue.use(VueLazyload);
Vue.use(VueAwesomeSwiper)
Vue.use(mintui)

Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
});
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueScroller);
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;
Vue.http.options.xhr = {withCredentials: true};
Vue.use(Vuex);
Vue.use(layer);
Vue.use(toast);

Vue.use(BaiduMap, {
    ak:'Isfaaj45HoG35tgG1rEv0U3G'
});
// Vue.prototype.href  =function ($url='') {
//     if(window.navigator.onLine==true){  //未联网状态跳转错误页
//         location.href = '#/'+$url;
//     } else {
//         layer.msg('网络开小差了~~~')
//     }
// };
Vue.prototype.hrefNav  =function ($url='') {
    location.href = '#/'+$url;
};
Vue.prototype.host = units.getHost();
Vue.prototype.units = units;
import window from './tools/window'
Vue.prototype.window = window;

Vue.prototype.Http = function (cont,data,cb) {
    //let host = cont.split('/');
    this.$http.post(units.domin(cont), units.params(data)).then(function (res) {
        cb&&cb(res.data);
    });
};


Vue.prototype.href = function (name) {
    if(navigator.onLine==true){  //未联网状态跳转错误页
        location.href = '#/'+name;
    } else {
        layer.msg('网络开小差了~~~');
        return;
    }
}
const store = new Vuex.Store({
    state: {
        // 多图上传
        img_upload_cache: [],
        img_paths: [],
        img_status: 'ready', // 上传状态 ready selected uploading finished
        // 头部导航
        islogin:function () {},
        userinfo: {},
        serviceType:'',
        isVIP: false,
        phone: 4009998703,
        header:{
            open:true,
            title:'',
            rightContent: '',
            left:function () {
                if(location.href.split('/#/')[1] === 'peccancquery'){
                    localStorage.removeItem('peccanctQuery')
                    location.href = '#/vehicletool';
                }else {
                    console.log(1)
                    localStorage.removeItem('peccanctQuery')
                    history.go(-1);
                }
            },
            titleShow: true,
            leftShow:true,
            right:false,
            rightTouch:function () {
                console.log('右键')
            },
            background:true
        },
        routeBackground:['/login','/register','/cansuccess','/article/content'],
    },
    mutations: {
        set_img_upload_cache (state, arg) {
            state.img_upload_cache = arg
        },
        set_img_paths (state, arg) {
            state.img_paths = arg
        },
        set_img_status (state, arg) {
            state.img_status = arg
        }
    }
});

Vue.use(uploader, store)  
// Vue.use(Navigation, {router, store, moduleName: 'navigation', keyName: 'VNK'})
//多图上传
Vue.component('uploader', uploader)
store.registerModule('imgstore', store)
   


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});


async function defineInit(name) {
    store.state.header.open = defins.header.init(name);
    store.state.header.leftShow = true;
    store.state.header.background = defins.header.setBackground(name);
}
// Vue.http.interceptors.push((request, next) => {
//     // 通过控制 组件的`v-show`值显示loading组件
//     if(navigator.onLine==true){  //未联网状态跳转错误页
      
//         layer.open({
//             type: 2
//         })
//         next((response) => {
//             return response
//         });
//     }
// });
router.beforeEach(function(to,from,next) {
    if(to.path !='/server/start') {
        if(navigator.onLine==true){  //未联网状态跳转错误页
            // layer.open({
            //     type: 2
            // })
            // var sendDate = (new Date()).getTime();      //发送的时间
            // Vue.http.post(units.host('response', 'api')).then( function (res) {
            //     var receiveDate = (new Date()).getTime();   //获取数据的时间

            //     var responseTimeMs = receiveDate - sendDate; //服务器响应时间   （如果大于150毫秒显示动画）
            //     console.log(responseTimeMs)
            // })
        }
    }

    store.state.header.left = function () {
        if(location.href.split('/#/')[1] === 'peccancquery'){
            location.href = '#/vehicletool';
        }else if(location.href.split('/#/')[1] == 'vehicletool'){
            location.href = '#/';
        }
        else {
            history.go(-1);
        }
    };
    defineInit(to.name);
    next();
});

router.afterEach(function(to, from, next) {
    defineInit(to.name);
    setTimeout(function () {
        layer.loading(false);
    },500);
});


//解析数字格式
Number.prototype.formatMoney = function (places,thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};