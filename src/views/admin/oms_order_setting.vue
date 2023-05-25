<template>
  <div class="settings">
    <div class="settingpage-tools">
      <el-button type="warning"
                 @click="toAdd">添加</el-button>
    </div>
    <el-table :data="settings"
              style="width: 100%">
      <el-table-column fixed
                       prop="id"
                       width="150" />
      <el-table-column prop="flashOrderOvertime"
                       label="秒杀订单超时关闭时间（分）"
                       width="120" />
      <el-table-column prop="normalOrderOvertime"
                       label="正常订单超时关闭时间（分）"
                       width="120" />
      <el-table-column prop="confirmOvertime"
                       label="发货后自动确认收货时间（天）"
                       width="120" />
      <el-table-column prop="finishOvertime"
                       label="自动完成交易时间，不能申请售后（天）"
                       width="120" />
      <el-table-column prop="commentOvertime"
                       label="订单完成后自动好评时间（天）"
                       width="120" />
      <el-table-column fixed="right"
                       label="功能管理"
                       width="120">
        <template #default="scope">
          <el-button link
                     type="primary"
                     size="smpage"
                     @click="toEdit(scope.row)">更新</el-button>
          <el-button v-confirm='您确定要删除吗'
                     v-on:click="handleDelete"
                     link
                     type="primary"
                     size="smpage"
                     @click="del(scope.row.id)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next"
                   :page-size="page.size"
                   :total="page.total"
                   @current-change="currentchange" />
  </div>
  <el-dialog v-model="dialogFormVisible"
             title="setting编辑">
    <el-form :model="setting">
      <el-form-item label="秒杀订单超时关闭时间（分）"
                    :label-width="formLabelWidth">
        <el-input v-model="setting.flashOrderOvertime"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="正常订单超时关闭时间（分）"
                    :label-width="formLabelWidth">
        <el-input v-model="setting.normalOrderOvertime"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="发货后自动确认收货时间（天）"
                    :label-width="formLabelWidth">
        <el-input v-model="setting.confirmOvertime"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="自动完成交易时间，不能申请售后（天）"
                    :label-width="formLabelWidth">
        <el-input v-model="setting.finishOvertime"
                  autocomplete="off" />
      </el-form-item><el-form-item label="订单完成后自动好评时间（天）"
                    :label-width="formLabelWidth">
        <el-input v-model="setting.commentOvertime"
                  autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="save">保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { settingPage, settingAdd, settingEdit, settingDelId } from '../../http/oms_order_setting.js';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
  directives: {
    confirm: {
      bind: function (el, binding) {
        el.addEventListener('click', function () {
          if (confirm(binding.value)) {
            binding.arg()
          }
        })
      }
    }
  },

  data () {
    return {
      settings: [],
      page: {
        total: 0,
        current: 1,
        size: 10
      },
      dialogFormVisible: false,
      setting: {
        "id": "",
        "flashOrderOvertime": "",
        "normalOrderOvertime": "",
        "confirmOvertime": "",
        "finishOvertime": "",
        "commentOvertime": "",

      },
      formLabelWidth: 80
    }
  },
  mounted () {
    this.getsettingsPage(1)
  },
  methods: {
    toEdit (setting) {
      console.log(setting);
      this.dialogFormVisible = true;
      this.setting = cloneDeep(setting);
    },
    getsettingsPage (current) {
      const data = {
        current: current,
        size: 10
      }
      settingPage(data).then(res => {
        console.log(res);
        const page = res.data.data.page;
        this.settings = page.records;
        this.page = page;
      }).catch(err => {
        console.log(err);
      })

    },
    currentchange (current) {
      // console.log(current);
      this.getsettingsPage(current);
      this.page.current = current;//数据更新目前显示的页面
    },
    del (id) {
      if (confirm("您确认要删除吗") == true)
        console.log(id);
      console.log(id)
      const params = {
        id: id
      }
      settingDelId(params).then(res => {
        if (res.success) {
          this.getsettingsPage(this.page.current)
        }
        else {
          console.log(res.msg)
          return false
        }
      }).catch(err => {

      })
    },
    toAdd () {
      this.dialogFormVisible = true;
      this.setting = {
        "id": "",
        "flashOrderOvertime": "",
        "normalOrderOvertime": "",
        "confirmOvertime": "",
        "finishOvertime": "",
        "commentOvertime": "",
      }
    },
    save () {
      const setting = this.setting;
      if (setting.id == 0) {
        settingAdd(setting).then(res => {
          if (res.success) {
            //刷新页面
            this.dialogFormVisible = false;
            this.getsettingsPage(this.page.current)
            ElMessage(res.msg)
          }
          else {
            ElMessage(res.msg)
            return false
          }
        }).catch(err => {
          ElMessage('网络错误联系管理员')
        })
      }
      else {
        settingEdit(setting).then(res => {
          if (res.success) {
            //刷新页面
            this.dialogFormVisible = false;
            this.getsettingsPage(this.page.current)
            ElMessage(res.msg)
          }
          else {
            ElMessage(res.msg)
            return false
          }
        }).catch(err => {
          ElMessage('网络错误联系管理员')
        })
      }

    }
  }
});
</script>
<style lang = "scss" scoped></style>