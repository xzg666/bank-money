<template>
  <div>
    <el-table :data="tableData">
      <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="消息类型" prop="createTime">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.tx_busi_type || [], scope.row.txBusiType) }}</template>
      </el-table-column>
      <el-table-column align="center" label="消息内容" prop="msg" width="170px" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="状态" prop="isHandle">
        <template slot-scope="scope">
          <p v-if="scope.row.isHandle===0">进行中</p>
          <p v-if="scope.row.isHandle===1">已结束</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="toDeal(scope.row)"
          >{{ scope.row.isHandle===0 ? '处理' : '查看' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      style="padding:0 !important"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="pageChange"
    />

    <el-dialog :visible.sync="dialogVisible" append-to-body width="800px">
      <el-form
        v-if="selectRow && selectRow.isHandle===0"
        ref="form"
        :model="formData"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="业务类型:">
          <div>{{ $selectDictLabel($store.getters.dictData.tx_biz_type || [], selectRow.bizType) }}</div>
        </el-form-item>
        <el-form-item label="监控点:">
          <div>{{ $selectDictLabel($store.getters.dictData.tx_busi_type || [], selectRow.txBusiType) }}</div>
        </el-form-item>
        <el-form-item label="消息内容:">
          <div>{{ selectRow.msg }}</div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item v-if="selectRow.isHandleStatus" label="待办日期" prop="dbTime">
          <el-date-picker
            v-model="formData.dbTime"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            style="width:50%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="selectRow.isHandleStatus" label="处理意见">
          <el-input v-model="formData.remark" type="textarea" style="width:50%" />
        </el-form-item>
        <el-row v-if="selectRow.isHandleStatus" type="flex" justify="center">
          <el-button type="primary" size="mini" @click="confirm('0')">保存</el-button>
          <!-- <el-button type="primary" size="mini" @click="confirm('1')">保存并结束任务</el-button> -->
          <el-button size="mini" @click="dialogVisible=false">取消</el-button>
        </el-row>
      </el-form>
      <span>历史处理记录</span>
      <el-divider></el-divider>
      <el-table :data="hisTableData">
        <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column align="center" label="待办日期" prop="dbTime"></el-table-column>
        <el-table-column align="center" label="处理人" prop="nickName"></el-table-column>
        <el-table-column label="处理意见" width="170">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="max-width:400px">{{ scope.row.remark }}</p>
              <div slot="reference" class="name-wrapper">{{ scope.row.remark }}</div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="hisTotal > 0"
        style="padding:0 !important"
        :total="hisTotal"
        :page.sync="hisQueryParams.pageNum"
        :limit.sync="hisQueryParams.pageSize"
        @pagination="hisPageChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import { noticeApi } from '@/api/noticeCenter';
import moment from 'moment'
export default {
  name: 'ToDeal',

  data() {
    return {
      tableData: [],
      hisTableData: [],
      dialogVisible: false,
      formData: {
        dbTime: moment(new Date()).format('YYYY-MM-DD')
        // dbTime: 123
      },
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      hisTotal: 0,
      hisQueryParams: {
        pageNum: 1,
        pageSize: 10
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      rules: {
        dbTime: [{ required: true, message: '请选择时间' }]
      },
      selectId: '',
      selectRow: undefined
    };
  },

  mounted() {
    this.getMessageList()
  },

  methods: {
    getMessageList() {
      noticeApi.getNoticeList({
        // isHandle: '0',
        txType: '1',
        ...this.queryParams
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.rows
          this.total = res.total
          this.$emit('changTodoNum', res.total);
        }
      })
    },
    pageChange(data) {
      this.queryParams.pageNum = data.page
      this.queryParams.pageSize = data.limit
      this.getMessageList()
    },
    hisPageChange(data) {
      this.hisQueryParams.pageNum = data.page
      this.hisQueryParams.pageSize = data.limit
      this.queryHisotryList()
    },
    toDeal(row) {
      this.selectId = row.id
      // this.selectRow = row
      // noticeApi.changeTodoStatus(row.id).then(res => {

      // })
      noticeApi.getMessageInfo(row.id).then(res => {
        if (res.code === 200) {
          this.selectRow = res.data
          this.queryHisotryList()
          this.dialogVisible = true
          this.formData = {
            dbTime: moment(new Date()).format('YYYY-MM-DD')
          }
        }
      })
    },
    queryHisotryList() {
      const hisQueryParams = {
        dbId: this.selectId,
        ...this.hisQueryParams
      }
      noticeApi.queryHisTodoList(hisQueryParams).then(res => {
        if (res.code === 200) {
          this.hisTableData = res.rows
          this.hisTotal = res.total
        }
      })
    },
    confirm(type) {
      this.$refs.form.validate(validate => {
        if (validate) {
          const tempData = Object.assign({}, this.formData)
          tempData.status = type
          tempData.id = this.selectId
          if (type === '1') {
            this.$confirm('确定要结束当前待办吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              noticeApi.todo(tempData).then(res => {
                if (res.code === 200) {
                  this.dialogVisible = false
                  this.$msgSuccess(res.msg)
                  // 查询未读消息总数量
                  this.$store.dispatch('changeTotal')
                  this.getMessageList()
                }
              })
            })
          } else {
            noticeApi.todo(tempData).then(res => {
              if (res.code === 200) {
                this.dialogVisible = false
                this.$msgSuccess(res.msg)
                // 查询未读消息总数量
                this.$store.dispatch('changeTotal')
                this.getMessageList()
              }
            })
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.name-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>