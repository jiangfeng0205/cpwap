function isVIP (vip) {
    if(sessionStorage.getItem("isVIP")){
        vip = sessionStorage.getItem("isVIP")
        console.log(vip)
    } else {
        vip = this.$store.state.isVIP
    }
}

export default  isVIP