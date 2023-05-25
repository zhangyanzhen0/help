import instance from "./index";

export default {
  //获取列表
  getReasonList(data){
    //返回Promise对象
   return instance.request({
        url:'mall/oms-order-return-reason/page', 
        method:'post',
        data:data
    })
  },

  //新增退货原因
  addReason(data){
    //返回Promise对象
   return instance.request({
        url:'mall/oms-order-return-reason/add', 
        method:'post',
        data:data
    })
  },

  //编辑退货原因
  updateReason(data){
    //返回Promise对象
   return instance.request({
        url:'mall/oms-order-return-reason/edit', 
        method:'post',
        data:data
    })
  },

    //删除退货原因
    deleteReason(id){
      //返回Promise对象
     return instance.request({
          url:`/mall/oms-order-return-reason/del/${id}`, 
          method:'get',
      })
    },
    

}
