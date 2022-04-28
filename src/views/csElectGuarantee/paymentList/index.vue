<!-- 电子保函查询-->
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
            >支付同步</el-button>
        </div>
      </template>
      <template slot="table">
        <el-table-column label="保函业务流水号" prop="applyno" width="150" />
        <el-table-column label="支付交易流水号" prop="paymentNo" width="220" />
        <el-table-column label="支付金额(元)" prop="amount" width="180">
          <template slot-scope="scope">
            {{ scope.row.amount / 100 }}
          </template>
        </el-table-column>
        <el-table-column label="支付状态" prop="status" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_zfzt || [],
                scope.row.status
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="支付申请时间"
          prop="orderCreateDate"
          width="180"
        />
        <el-table-column label="支付时间" prop="paymentDate" width="180" />

        <el-table-column
          label="付款方账号"
          prop="payerAccountNumber"
          width="180"
        />
        <el-table-column label="分支行" prop="payerBranchName" width="200px" />
        <el-table-column label="支付方式" prop="paymentWay" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_zfsf || [],
                scope.row.paymentWay
              )
            }}
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
import listDetails from './listDetails';
export default {
  name: 'PaymentList',
  components: {
    QueryTable,
    listDetails
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
      listData: [
        {
          title: '保函信息',
          data: [
            { label: '预担保单号', prop: 'preguaranteenumber' },
            { label: '担保单号', prop: 'baohanno' },
            { label: '项目名称', prop: 'projectname' },
            {
              label: '项目类型',
              prop: 'projecttype',
              dict: this.$store.getters.dictData.dzbh_xmlx || []
              //
            },
            { label: '投保人姓名', prop: 'policyname' },
            { label: '投保人统一信用社会代码', prop: 'idnumber' },
            { label: '项目标段编号', prop: 'bidsectioncode' },
            { label: '招标人名称', prop: 'tendereename' },
            { label: '招标统一社会信用代码', prop: 'tendereecode' },
            { label: '招标人地址', prop: 'tendereeaddress' },
            { label: '招标人联系电话', prop: 'tendereecontactphonenumber' },
            { label: '担保保费(元)', prop: 'sumpremium' },
            { label: '担保保额(元)', prop: 'sumamount' },
            { label: '起保日期', prop: 'startdate' },
            { label: '终保日期', prop: 'enddate' },
            { label: '担保期限(天)', prop: 'tender' },
            { label: '特别条款', prop: 'endorsetext' },
            { label: '第三方合作公司', prop: 'policyremark' },
            {
              label: '担保状态',
              prop: 'guaranteestatus',
              dict: this.$store.getters.dictData.dzbh_db_status || []
            },
            {
              label: '保函申请状态',
              prop: 'baohanapplystatus',
              dict: this.$store.getters.dictData.dzbh_sq_status || []
            },
            {
              label: '保函申请审核状态',
              prop: 'applystatus',
              dict: this.$store.getters.dictData.dzbh_sqshzt || []
            },

            { label: '保函申请时间', prop: 'baohanapplytime' },
            { label: '保函审核时间', prop: 'baohanverifytime' },
            { label: '保函提交时间', prop: 'baohansubmittime' },
            { label: '结算时间', prop: 'baohansubmitsettlementtime' },
            { label: '保函受理时间', prop: 'baohanacceptancetime' },
            { label: '批改保函时间', prop: 'resettime' }
          ]
        },
        {
          title: '支付信息',
          data: [
            {
              label: '支付状态',
              prop: 'paystatus',
              dict: this.$store.getters.dictData.dzbh_zfzt || []
            },
            {
              label: '支付方式',
              prop: 'paymentWay',
              dict: [
                { dictValue: '30', dictLabel: '网银' },
                { dictValue: '10', dictLabel: '支付宝' },
                { dictValue: '20', dictLabel: '微信' }
              ]
            },
            {
              label: '付款人注册ID',
              prop: 'payerId'
            },
            { label: '付款人名称', prop: 'payerName' },
            // { label: '结算标识', prop: 'settlementFlag' },
            { label: '分账模式', prop: 'splitType' },
            { label: '资金用途', prop: 'usage' },
            {
              label: '付款银行标识',
              prop: 'bankId',
              dict: this.$store.getters.dictData.zjPayBank || []
            },
            {
              label: '账户类型',
              prop: 'accountType',
              dict: this.$store.getters.dictData.dzbh_zhlx || []
            },
            {
              label: '卡类型',
              prop: 'cardType',
              dict: this.$store.getters.dictData.dzbh_klx || []
            },
            {
              label: '支付状态',
              prop: 'status',
              dict: this.$store.getters.dictData.dzbh_zfzt || []
            },
            { label: '退款状态', prop: 'refundStatus' },
            { label: '付款方账户名称', prop: 'payerAccountName' },
            { label: '付款方账号', prop: 'payerAccountNumber' },
            { label: '分支行', prop: 'payerBranchName' },
            { label: '省份', prop: 'payerProvince' },
            { label: '城市', prop: 'payerCity' },
            { label: '支付回单流水号', prop: 'bankTraceNo' },
            {
              label: '订单类型',
              prop: 'orderType',
              dict: this.$store.getters.dictData.dzbh_ddlx || []
            },
            { label: '订单创建时间', prop: 'orderCreateDate' },
            { label: '支付时间', prop: 'paymentDate' },
            { label: '退款时间', prop: 'refundDate' },
            {
              label: '是否支付超时',
              prop: 'isOverTime',
              dict: this.$store.getters.dictData.dzbh_sfzfcs || []
            },
            { label: '商品描述', prop: 'goods' },
            { label: '可打折金额', prop: 'discountAmount' },
            { label: '手续费收取模式', prop: 'feeMode' },
            { label: '分期期数', prop: 'numberOfInstallments' },
            {
              label: '业务类型',
              prop: 'busiType',
              dict: this.$store.getters.dictData.dzbh_yylx || []
            }
          ]
        },
        {
          title: '开票信息',
          data: [
            {
              label: '开票类型',
              prop: 'invoicetype',
              dict: this.$store.getters.dictData.dzbh_kp_type || []
            },
            { label: '开票申请时间', prop: 'applybilltime' },
            {
              label: '开票状态',
              prop: 'invoicestatus',
              dict: this.$store.getters.dictData.dzbh_kp_status || []
            },
            { label: '纳税人识别号', prop: 'cusccode' },
            { label: '发票抬头', prop: 'invoicehead' },
            { label: 'e-mail', prop: 'email' },
            { label: '收件人', prop: 'addressee' },
            { label: '收件人手机号', prop: 'addresseephone' },
            { label: '收件地址', prop: 'address' },
            { label: '注册地址', prop: 'addinfo' },
            { label: '开户行', prop: 'bankinfo' },
            { label: '开户账号', prop: 'bankacc' },
            { label: '联系电话', prop: 'phoneno' },
            { label: '电子发票下载地址', prop: 'invoicedownloadurl' },
            { label: '快递公司', prop: 'expressname' },
            { label: '快递单号', prop: 'expressno' }
          ]
        },
        {
          title: '退保信息',
          data: [
            {
              label: '退保状态',
              prop: 'bankstatus',
              dict: this.$store.getters.dictData.dzbh_tbzt || []
            },
            { label: '退保申请时间', prop: 'applyquittime' },
            { label: '退保原因', prop: 'policyreason' },
            { label: '退款账户名', prop: 'accountno' },
            { label: '退款账户开户行', prop: 'bankname' },
            { label: '退款银行账户', prop: 'bankno' },
            {
              label: '退款处理结果',
              prop: 'policyresult',
              dict: this.$store.getters.dictData.dzbh_tbjg || []
            }
          ]
        },
        {
          title: '理赔信息',
          data: [
            {
              label: '理赔状态',
              prop: 'claimstatus',
              dict: this.$store.getters.dictData.dzbh_lp_status || []
            },
            { label: '理赔申请时间', prop: 'applyclaimtime' },
            { label: '理赔原因', prop: 'cliaimreason' },
            { label: '理赔人姓名', prop: 'claimname' },
            { label: '理赔人联系方式', prop: 'claimphone' },
            {
              label: '理赔处理结果',
              prop: 'claimresult',
              dict: this.$store.getters.dictData.dzbh_tbjg || []
            }
          ]
        }
      ],
      listInterfaceData: {},

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
        { label: '支付开始日期', model: 'paymentStartDate', type: 'date' },
        { label: '支付结束日期', model: 'paymentEndDate', type: 'date' },
        { label: '保函业务流水号', model: 'applyno' },
        { label: '支付交易流水号', model: 'paymentNo' },
        {
          label: '支付状态',
          model: 'status',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_zfzt || []
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

    clickRow(row) {
      this.loading = true;
      this.listInterfaceData = row;

      const params1 = {
        applyno: row.applyno
      };
      listQuery(params1).then(res => {
        Object.assign(this.listInterfaceData, res.rows[0]);
        this.loading = false;
        this.openDetails = true;
      });

      this.ywid = row.ywid;
      this.resettime = row.resettime;
      this.invoicestatus = row.invoicestatus;
      this.applyquittime = row.applyquittime;
      this.bankstatus = row.bankstatus;
      this.claimstatus = row.claimstatus;
      this.applyclaimtime = row.applyclaimtime;
      console.log('this.listInterfaceData', this.listInterfaceData);
      console.log('this.id', this.ywid);
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
