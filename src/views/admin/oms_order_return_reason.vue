<template> 
  <div class="app-container">
    <!-- <el-input v-model="searchText"
              placeholder="请输入搜索关键字"
              clearable
              @clear="clearSearch"
              @keyup.enter="performSearch"
              style="margin-bottom: 20px">
    </el-input> -->

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        size="mini"
        style="float:right"
        
        @click="dialogVisible = true"
        class="btn-add">添加
      </el-button>
    </el-card>
    <div class="table-container">
    <el-table
    :data="list"
    border
    >
    <el-table-column
      fixed
      align='center' 
      prop="id"
      label="编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      align='center' 
      label="原因类型"
      width="230">
    </el-table-column>
    <el-table-column
      prop="sort"
      label="排序"
      align='center' 
      width="150">
      <template #default="scope">
            {{ enumn.sort[scope.row.sort] }}
      </template>
    </el-table-column>
    <el-table-column
      label="是否可用"
      align='center' 
      prop="status"
      width="220">
      <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="change(scope.row)"
          />
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="添加时间"
      align='center' 
      width="190"
      :formatter="formatDate"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align='center' 
      width="190">
      <template #default="scope">
        <el-button  type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
        <el-button type="text" size="small" @click="updateButton(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
    <div class="pagination-container">
      <el-pagination 
      background 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="listArg.size"
      layout="prev, pager, next" 
      :total="total" />
      
    </div>
    <el-dialog
      title="添加退货原因"
      v-model="dialogVisible" width="30%">
      <el-form :model="returnReason"
               ref="reasonForm" label-width="150px">
        <el-form-item label="原因类型：">
          <el-input v-model="returnReason.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="returnReason.sort" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch v-model="returnReason.status"
           :active-value="1" 
           :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diagCancel()">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>

import reasonApi from '@/http/returnreason.js'
import { ElMessage,ElMessageBox } from 'element-plus'
import { enumn } from '@/utils/reason.js'
export default {
	data(){ //定义变量和初始值
		return {
      returnReason:{
        name:'',
        sort:'',
        status:'',
        createTime:''

      },
      total:0,
      operateReasonId:null,
      listArg:{
        current:0,
        size:5
      },
      dialogVisible:false,
			listLoading: true, // 是否显示loading信息
			list:[],  //查询之后接口返回的数据集合
      findname:'', //查找
      enumn:enumn,//枚举的

      searchText: '',
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页显示的数据条数
      tableData: [],

		}
	},
 

  created(){
    this.getList()
  },

  // computed: {
  //   paginatedData () {
  //     const startIndex = (this.currentPage - 1) * this.pageSize
  //     const endIndex = startIndex + this.pageSize
  //     return this.filteredtableData.slice(startIndex, endIndex)
  //   },
  //   filteredtableData () {
  //     if (this.searchText) {
  //       return this.tableData.filter((item) => {
  //         return String(item.name).includes(String(this.searchText))
  //       })
  //     } else {
  //       return this.tableData
  //     }
  //   },
  // },

  methods:{
    change(row){
      //TODO  发送请求到接口，修改可用状态
      // returnReason.post('mall/oms-order-return-reason/edit')
      // .then(response =>{
      //   console.log(row.status);
      // }).catch(error =>{
      //   console.error(error);
      // })

      // console.log(row)
      // console.log(row.status)
    },
    //日期格式化
    formatDate(row, column) {
		      // 获取单元格数据
		      let data = row[column.property];
		      if(data == null) {
		        return null;
		      }
		      let dt = new Date(data)
           
		      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes();
          
        },
   
    // changetext () {
    //     this.list.filter(item => {
    //       if (this.name === item.name) {
    //         let sin = {
    //           name: item.name,
    //           sort: item.sort,
    //           status: item.status,
    //           createTime: item.createTime

    //         }
    //         this.nlist.push(sin)
    //         this.flag = true
    //       }
    //     })

    //     this.nlist.forEach(item => {
    //       if (this.name !== item.name) {
    //         this.nlist = []
    //         this.flag = false
    //       }
    //     })
    //   },
    //   queryadd (item) {
    //     alert('原因类型是:' + item.name + '\r\n排序是:' + item.sort + '\r\n是否可以用:' + item.status + '\r\n添加时间是:' + item.createTime)
    //   },
    getList(){
      reasonApi.getReasonList(this.listArg).then(resonse=>{
        // console.log(resonse)
        this.list = resonse.data.page.records
        this.total = resonse.data.page.total
        // console.log(this.list)
      })
    },
    //点击更新按钮
    updateButton(row){
      this.dialogVisible = true
      this.operateReasonId = row.id
      this.returnReason.id = row.id
      this.returnReason.name = row.name
      this.returnReason.sort = row.sort
      this.returnReason.status = row.status
    },
    diagCancel(){
      this.dialogVisible = false;
      this.initreason()
    },
    initreason(){
      this.returnReason.name = ''
      this.returnReason.status = ''
      this.returnReason.sort = ''
    },
    //添加或者更新
    addOrUpdate(){
        if(this.operateReasonId==null){
          //添加操作
          reasonApi.addReason(this.returnReason).then(response=>{
            this.dialogVisible=false;
            this.operateReasonId=null;
            ElMessage({
              message: '添加成功！',
              type: 'success',
            })
            // console.log("添加")
            // console.log(response)
            this.getList();
          });
        }else{
          //编辑操作
          this.returnReason.id = this.operateReasonId;
          reasonApi.updateReason(this.returnReason).then(response=>{
            this.dialogVisible=false;
            this.operateReasonId=null;
            ElMessage({
              message: '编辑成功！',
              type: 'success',
            })
            this.returnReason.id = null;
            //重新渲染数据
            this.getList();
          });
        }
    },
    //删除
    deleteData(row){
      ElMessageBox.confirm(
        '该操作将会永久删除该行数据，是否继续?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        reasonApi.deleteReason(row.id).then(response=>{
            if(response.code==1){
              ElMessage({
              type: 'success',
              message: '删除成功！',
              })
              //重新渲染数据
              this.getList()
            }
        })

      }) .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除失败！',
        })
    })

    },
    //分页处理
    handleSizeChange(val){
        this.listArg.current = 1;
        this.listArg.size = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listArg.current = val;
        this.getList();
      },
  }
}


</script>

<style  lang="scss">
body {
  margin: 0;
  padding: 0;
  background-size: cover;
  opacity: 0.9 !important; /* 使用 !important 提高优先级 */
  background-repeat: no-repeat;
}
.input-width {
    width: 80%;
  }

  .item {
    text-align: center;
    input {
      border: 2px solid #B8B8B8;
      height: 40px;
      width: 35%;
      font-size: 16px;
    }
    input:focus{
      border: 2px solid #3385FF;
    }
  }
  .item-ul {
    .item-ul-li{
      margin: auto;
      height: 30px;
      line-height: 30px;
      width: 35%;
      span{
        font-size: 16px;
      }
    }
    .item-ul-li:hover{
      background-color: #F1F3F4;
    }
  }


</style>