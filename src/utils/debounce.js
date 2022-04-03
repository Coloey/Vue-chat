export default (fun,delay=500,immediate=true)=>{
    let timer=null//保存定时器
    return function(args){
        let that=this
        let _args=args
        if(timer)clearTimeout(timer)//不管是否立即执行都要清空定时器
        if(immediate){
            if(!timer)fun.apply(that,_args)
            //不管上一个延时是否完成都需要重新置定时器
            timer=setTimeout(function(){//到时间后，定时器置null，避免内存泄漏
                timer=null;
            },delay)
        }else{
            timer=setTimeout(function(){
                fun.call(that,_args)
            },delay)
        }
    }

}