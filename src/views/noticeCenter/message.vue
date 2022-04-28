<template>
  <div>
    <el-table :data="tableData">
      <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="消息类型" prop="createTime">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.tx_busi_type || [], scope.row.txBusiType) }}</template>
      </el-table-column>
      <el-table-column align="center" label="业务编码" prop="bizId"></el-table-column>
      <el-table-column align="center" label="消息内容" prop="msg" width="170px" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="状态" prop="createTime">
        <template slot-scope="scope">
          <p v-if="scope.row.isView===0" :class="{notice:scope.row.isView===0}">未读</p>
          <p v-if="scope.row.isView===1">已读</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="预警时间"
        prop="createTime"
        width="170px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.txType===0" type="text" @click="changeStatus(scope.row)">查看</el-button>
          <el-button
            v-if=" scope.row.isView===0&scope.row.txType===1"
            type="text"
            @click="toDeal(scope.row)"
          >处理</el-button>
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
    <el-dialog :visible.sync="toDoDialogVisible" append-to-body width="400px">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-form-item label="修改时间" prop="date">
          <el-date-picker v-model="formData.date" value-format="yyyy-MM-DD" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" />
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="confirm()">保存</el-button> -->
          <el-button @click="dialogVisible=false">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="messageDialogVisible" append-to-body width="400px">
      <el-form ref="form" :model="messageInfo" label-width="80px">
        <el-form-item label="业务类型:">
          <div>{{ $selectDictLabel($store.getters.dictData.tx_biz_type || [], messageInfo.bizType) }}</div>
        </el-form-item>
        <el-form-item label="监控点:">
          <div>{{ $selectDictLabel($store.getters.dictData.tx_busi_type || [], messageInfo.txBusiType) }}</div>
        </el-form-item>
        <el-form-item label="消息内容:">
          <div>{{ messageInfo.msg }}</div>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button size="mini" type="primary" @click="viewDetail">查看详情</el-button>
        <el-button size="mini" type="primary" @click="messageDialogVisible=false">确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { noticeApi } from '@/api/noticeCenter';
export default {
  name: 'Message',

  data() {
    return {
      tableData: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        txType: 0
      },
      toDoDialogVisible: false,
      messageDialogVisible: false,
      messageInfo: {

      },
      formData: {},
      rules: {},
      selectId: ''
    };
  },

  mounted() {
    this.getMessageList()
  },

  methods: {
    getMessageList() {
      noticeApi.getNoticeList({
        ...this.queryParams
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.rows
          this.total = res.total
          // this.$emit('changMessageNum', res.total);
        }
      })
    },
    changeStatus(row) {
      console.log('row: ', row);
      // noticeApi.changeMessageStatus(row.id).then(res => {
      //   if (res.code === 200) {
      //     this.$msgSuccess(res.msg)
      //     // 查询未读消息总数量
      //     this.$store.dispatch('changeTotal')
      //     this.getMessageList()
      //   }
      // })
      noticeApi.getMessageInfo(row.id).then(res => {
        if (res.code === 200) {
          this.messageInfo = res.data
          this.messageDialogVisible = true
          this.$store.dispatch('changeTotal')
          this.getMessageList()
        }
      })
    },
    toDeal(row) {
      this.selectId = row.id
      this.toDoDialogVisible = true
      noticeApi.changeTodoStatus(row.id).then(res => {
        if (res.code === 200) {
          this.$store.dispatch('changeTotal')
        }
      })
    },
    // 查看详情
    viewDetail() {
      this.$router.push('/committe/compublic')
    },
    confirm() {
      const tempData = Object.assign({}, this.formData)
      tempData.id = this.selectId
      // noticeApi.changeTodoStatus(this.selectId).then(res => {
      //   this.toDoDialogVisible = false
      //   this.$msgSuccess(res.msg)
      //   // 查询未读消息总数量
      //   this.$store.dispatch('changeTotal')
      //   this.getMessageList()
      // })
      noticeApi.todo(tempData).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$msgSuccess(res.msg)
          this.getMessageList()
        }
      })
    },
    pageChange(data) {
      this.queryParams.pageNum = data.page
      this.queryParams.pageSize = data.limit
      this.getMessageList()
    }
  }
};
</script>

<style lang="scss" scoped>
.notice {
  color: red;
}
</style>