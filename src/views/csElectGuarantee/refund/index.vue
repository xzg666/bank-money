<!-- 退款查询-->
<template>
  <div v-loading.fullscreen.lock="loading" class="app-container queryList">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      :inline="false"
      pagination
      @row-dblclick="clickRow"
      @selection-change="handleSelectionChange"
    >
      <template slot="operating">
        <div style="margin-top:20px;padding-left:60px">
          <el-button
            size="mini"
            plain
            type="primary"
            :disabled="single"
            @click="handleSync"
            >重新退款</el-button>
          <el-button
            size="mini"
            plain
            type="primary"
            :disabled="single"
            @click="handleSync"
            >导出</el-button>
        </div>
      </template>
      <template slot="table">
        <el-table-column label="支付交易流水号" prop="applyno" width="150" />
        <el-table-column
          label="退款支付交易流水号"
          prop="paymentNo"
          width="220"
        />
        <el-table-column label="保函业务流水号" prop="paymentNo" width="220" />
        <el-table-column label="退款状态" prop="status" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_zfzt || [],
                scope.row.status
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="退款时间" prop="paymentDate" width="180" />
        <el-table-column label="付款方账号" prop="paymentDate" width="180" />
        <el-table-column label="退款金额(元)" prop="amount" width="180">
          <template slot-scope="scope">
            {{ scope.row.amount / 100 }}
          </template>
        </el-table-column>
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>

    <!--批量登记---->

    <el-dialog
      title=""
      :visible.sync="openDetails"
      width="75%"
      :close-on-click-modal="false"
      class="addDialog"
      append-to-body
    >
      <!-- <div>
        <list-details
          :form-list="listData"
          :data="listInterfaceData"
        ></list-details>
      </div> -->

      <div>
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="详情" name="xq">
            <list-details
              :form-list="listData"
              :data="listInterfaceData"
            ></list-details>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  paymentList,
  synPayResult,
  getZfInfo,
  listQuery
} from '@/api/electGuarantee/query';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';
export default {
  name: 'Refund',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      fileListHk: [],
      fileListHkPre: [],
      selectRows: [],
      multipleSelection: [],
      openDetails: false,
      single: '1',
      activeTab: 'xq',
      ids: [],
      ywid: '',
      loading: false,

      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '200px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        paymentStartDate: '',
        paymentEndDate: ''
      },
      getData: paymentList,
      // 支付流水号
      paymentNo: ''
    };
  },
  computed: {
    formData: function(params) {
      return [
        { label: '退款开始日期', model: 'paymentStartDate', type: 'date' },
        { label: '退款结束日期', model: 'paymentEndDate', type: 'date' },
        { label: '保函业务流水号', model: 'applyno' },
        { label: '退款交易流水号', model: 'paymentNo' },
        {
          label: '退款状态',
          model: 'status',
          type: 'select'
          // dictOptions: this.$store.getters.dictData.dzbh_zfzt || []
        }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    this.getTime();
  },

  mounted() {
    // this.getTemplate();
    console.log('listData', this.listData);
  },
  // life cycle end
  methods: {
    getTime() {
      const date = new Date();
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, 0);
      const d = date
        .getDate()
        .toString()
        .padStart(2, 0);
      // if (d.length == '0') {
      //   var time = y + '-' + m + '-' + '0' + d;
      // } else {
      //   var time = y + '-' + m + '-' + d;
      // }
      var time = y + '-' + m + '-' + d;
      this.queryParams.paymentStartDate = time;
      this.queryParams.paymentEndDate = time;
    },
    // 查看详情
    hanldleDetails(id) {
      this.openDetails = true;
    },
    closeDetails() {
      this.openDetails = false;
      this.$refs.queryTable.getList();
    },
    // 导出
    handleSync() {
      // const url =
      //   process.env.VUE_APP_BASE_API +
      //   '/xtdzztbbus/ywinfo/export?' +
      //   'fileId=' +
      //   this.imageUrlFrontData.fileId;
      // location.href = url;
      if (this.multipleSelection.length == 0) {
        this.$message.warning('请先选中列表!');
      } else {
        this.$confirm(
          '您确定要对[支付流水号' + this.paymentNo + ']进行支付同步吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            synPayResult(this.multipleSelection[0]).then(res => {
              if (res.code == 200) {
                this.$message.success('操作成功!');
              }
            });
          })
          .catch(() => {});
      }
    },
    // 下载
    handleDownload() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning('请先选中列表!');
      } else {
        if (this.multipleSelection[0].downloadurl != '') {
          const downUrl = this.multipleSelection[0].downloadurl;
          window.open(downUrl);
        } else {
          this.$message.warning('保函没有开标，无法进行保函下载!');
        }
      }
    },

    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.single = val.length !== 1;
      this.ids = val.map(item => item.ywid);
      this.ywid = this.ids[0];
      this.single = val.length !== 1;
      const paymentNos = val.map(item => item.paymentNo);
      this.paymentNo = paymentNos[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.title {
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 15px;
  text-align: left;
  margin-bottom: 20px;
}
.area .el-row {
  margin-bottom: 0px;
}
.queryList .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  font-weight: bold;
}
</style>
