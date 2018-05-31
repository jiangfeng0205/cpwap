<template>
    <div id="app" :class="{'backColor':$store.state.header.background}">
        <!-- <div id="app"> -->
        <headers v-if="$store.state.header.open"></headers>
        <keep-alive>     <!--使用keep-alive会将页面缓存-->
        <!-- <navigation> -->
            <router-view v-if="$route.meta.keepAlive"></router-view>
        <!-- </navigation> -->
        </keep-alive> 
        <!-- <navigation> -->
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!-- </navigation> -->
    </div>
</template>

<script>
    (function (doc, win) {
        let docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 100 * (clientWidth / 1080) + 'px';
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    import headers from './components/template/header.vue'
    import defins from './router/define';
    export default {
        name: 'app',
        data () {
            return {
                open:true,
                headerOpen:true
            }
        },
        components:{
            headers
        },
        created:function () {
            this.open = this.$store.state.header.open;
            let inroute = $.inArray(this.$route.path,this.$store.state.routeBackground);
            // if(parseInt(inroute) >= 0){
            //     $('body').addClass('white').css('background','#fff');
            // }else{
            //     $('body').removeClass('white').removeAttr('style');
            // }
        },
        mounted(){},
        beforeCreate:function () {
            this.$store.state.header.open = defins.header.init(this.$route.name);
        },
        beforeDestroy:function () {
        },
        destroyed:function () {
        }
    }
</script>
<style>
    @import "./assets/style/comm.css";
    /*淡入淡出*/
    /* .fade-enter-active{animation:fade-in .5s}
    .fade-leave-active{display:none;animation:fade-out .5s}
    @keyframes fade-in{0%{opacity:0}
        50%{opacity:.5}
        100%{opacity:1}
    }
    @keyframes fade-out{0%{opacity:1}
        50%{opacity:.5}
        100%{opacity:0}
    } */
    /*左右*/
    .slide-fade-enter-active{transition:all .3s ease}
    .slide-fade-leave-active{transition:all .8s cubic-bezier(1,.5,.8,1)}
    .slide-fade-enter,.slide-fade-leave-to{transform:translateX(10px);opacity:0}
    .backColor{height:100%}
    /* background:#fff;  */
    /* .backColor{background:#f2f6f7; height:100%} */
    #app{
        height: 100%;
    }
</style>
