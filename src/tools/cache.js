export default {
    pex:'...he29_',
    /**
     * 设置local缓存
     * @param key key
     * @param v value值
     * @param time 过期时间秒
     */
    set:function (key,v,time=3600) {
        this.over();
        let timed = new Date().getTime()+time*1000;
        return localStorage.setItem(this.pex+key,JSON.stringify({key:v,time:timed}));
    },
    get:function (k) {
        this.over();
        let data = localStorage.getItem(this.pex+k);
        let obj = eval('(' + data + ')');
        if(obj.time <= new Date().getTime()){
            return obj;
        }else{
            localStorage.removeItem(k);
            return '';
        }
    },
    del:function (k) {
        localStorage.removeItem(this.pex+k);
    },
    over:function () {
        let storage = window.localStorage;
        let pef = this.pex;
        for(let i=0; i< storage.length;i++ ){
            let key = storage.key(i);
            if(key.indexOf(pef) >= 0){
                let data = storage.getItem(key);
                let obj = eval('(' + data + ')');
                if(obj.time >= new Date().getTime()){
                    localStorage.removeItem(k);
                }
            }
        }
    },
    start:function (k,cache='',time=3600) {
        if(cache == ''){
            return this.get(k);
        }else{
            return this.set(k,cache,time)
        }
    }
}
