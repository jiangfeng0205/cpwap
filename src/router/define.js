const define = {
    header:{
        owm:['server_content','listdIndex','index','findIndex','listdIndex','listdFirm','login'],
        init:function (name) {
            // console.log(name);
            return !this.owm.includes(name);
        },
        setBackground:function (name) {
            let set = ['login','register'];
            let is = set.includes(name);
            new Promise(()=>{
                setTimeout(()=>{
                    if(is){
                        $('html').addClass('backColor')
                    }else{
                        $('html').removeClass('backColor')
                    }
                },20)
            });
            return is;
        }
    },
    init:function (to,from) {
        return this.header.init(to)
    }
};
export default define;