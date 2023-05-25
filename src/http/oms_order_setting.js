import instance from "./index";
const settingPage=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'/mall/oms-order-setting/page', 
        method:'post',
        data,
      
    })
}
const settingAdd=(data)=>{
    return instance.request({
        url:'/mall/oms-order-setting/add',
        method:'post',
        data
    })}
    const settingEdit=(data)=>{
        return instance.request({
            url:'/mall/oms-order-setting/edit',
            method:'post',
            data
        })
    }
    const settingDelId=(params)=>{
        return instance.request({
            url:'/mall/oms-order-setting/del/{id}',
            params
        })
    }
export {
    settingPage,
    settingAdd,
    settingEdit,
    settingDelId
}