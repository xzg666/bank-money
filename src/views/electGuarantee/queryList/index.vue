<!-- 电子保函查询-->
<template>
  <div class="app-container queryList">
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
@click="handleExport"
>导出</el-button>
          <el-button
            size="mini"
            plain
            type="primary"
            :disabled="false"
            @click="handleDownload"
            >保函预览</el-button>
        </div>
      </template>
      <template slot="table">
        <el-table-column label="业务流水号" prop="applyno" width="150" />
        <el-table-column label="支付状态" prop="paystatus" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_zfzt || [],
                scope.row.paystatus
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="开票状态" prop="invoicestatus" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_kp_status || [],
                scope.row.invoicestatus
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="退保状态" prop="bankstatus" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_tbzt || [],
                scope.row.bankstatus
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="理赔状态" prop="claimstatus" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_lp_status || [],
                scope.row.claimstatus
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="担保状态" prop="guaranteestatus" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_db_status || [],
                scope.row.guaranteestatus
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="投标企业名称"
          prop="biddername"
          width="200px"
          show-overflow-tooltip
        />
        <el-table-column
          label="项目标段编号"
          prop="bidsectioncode"
          width="180"
        />
        <el-table-column
          label="投保人统一社会信用代码"
          prop="idnumber"
          width="180"
        />
        <!-- <el-table-column
          label="提交结算时间"
          width="150"
          align="center"
          prop="baohansubmitsettlementtime"
        /> -->
        <el-table-column label="担保保额(元)" prop="sumamount" width="180" />
        <el-table-column label="担保保费(元)" prop="sumpremium" width="150" />
        <el-table-column
          label="保函申请时间"
          prop="baohanapplytime"
          width="180"
        />
        <el-table-column
          label="保函审核时间"
          prop="baohanverifytime"
          width="180"
        />

        <el-table-column
          label="保函提交结算时间"
          prop="baohansubmitsettlementtime"
          width="180"
        />
        <el-table-column
          label="保函受理时间"
          prop="baohanverifytime"
          width="180"
        />
        <el-table-column label="开标时间" prop="kaibiaotime" width="180" />
        <el-table-column label="保函起保日期" prop="startdate" width="150" />
        <el-table-column label="保函终保日期" prop="enddate" width="150" />
        <el-table-column label="担保号" prop="baohanno" width="120" />
        <el-table-column label="担保期限(天)" prop="tender" width="120" />
        <el-table-column label="特别条款" prop="endorsetext" width="120" />
        <el-table-column label="投保人姓名" prop="policyname" width="200" />

        <el-table-column label="投保人手机号码" prop="mobile" width="120" />

        <el-table-column label="开票类型" prop="invoicetype" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_kp_type || [],
                scope.row.invoicetype
              )
            }}
          </template>
        </el-table-column>

        <el-table-column label="招标人" prop="tendereename" width="180" />
        <el-table-column
          label="招标人统一社会信用代码"
          prop="tendereecode"
          width="180"
        />
        <el-table-column
          label="招标人地址"
          prop="tendereeaddress"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          label="招标人联系电话"
          prop="tendereecontactphonenumber"
          width="180"
        />
        <el-table-column
          label="保函申请状态"
          prop="baohanapplystatus"
          width="180"
        >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_sq_status || [],
                scope.row.baohanapplystatus
              )
            }}
          </template>
        </el-table-column>

        <el-table-column label="退保原因" prop="policyreason" width="180" />
        <el-table-column label="理赔原因" prop="cliaimreason" width="180" />
        <!-- <el-table-column label="支付保费银行账户户名" prop="accountno" width="180" />
           <el-table-column label="支付保费银行账户号码" prop="bankno" width="180" /> -->
        <el-table-column
          label="金融机构名称"
          prop="companyname"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          label="金融机构地址"
          prop="companyaddress"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          label="金融机构联系电话"
          prop="companyphone"
          width="180"
        />
        <!-- <el-table-column
          label="开标开始日期"
          prop="kaibiaoStartDate"
          width="120"
        />
        <el-table-column
          label="开标结束日期"
          prop="kaibiaoEndDate"
          width="120"
        />
        <el-table-column
          label="申请开始日期"
          prop="baohanapplytimeStartDate"
          width="120"
        />
        <el-table-column
          label="申请结束日期"
          prop="baohanapplytimeEndDate"
          width="120"
        />
        <el-table-column
          label="结算开始日期"
          prop="baohansubmitsettlementtimeStartDate"
          width="120"
        />
        <el-table-column
          label="结算结束日期"
          prop="baohansubmitsettlementtimeEndDate"
          width="120"
        /> -->
        <!-- <el-table-column label="操作" fixed="right" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="hanldleDetails(scope.row.id)">
              查看详情
            </el-button>
          </template>
        </el-table-column> -->
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>

    <!--批量登记---->
    <div v-loading.fullscreen.lock="loading">
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
            <el-tab-pane label="开票处理" name="kpcl">
              <kpcl
                :ywid="ywid"
                :resettime="resettime"
                :invoicestatus="invoicestatus"
                @closeDetails="closeDetails"
              ></kpcl>
            </el-tab-pane>
            <el-tab-pane label="退保处理" name="tbcl">
              <tbcl
                :ywid="ywid"
                :applyquittime="applyquittime"
                :bankstatus="bankstatus"
                @closeDetails="closeDetails"
              ></tbcl>
            </el-tab-pane>
            <el-tab-pane label="理赔处理" name="lpcl">
              <lpcl
                :ywid="ywid"
                :applyclaimtime="applyclaimtime"
                :claimstatus="claimstatus"
                @closeDetails="closeDetails"
              ></lpcl>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  listQuery,
  getDzbhDetails,
  getZfInfo,
  exportLog,
  getDict
} from '@/api/electGuarantee/query';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';
import listDetails from './listDetails';
import kpcl from './kpcl';
import tbcl from './tbcl';
import lpcl from './lpcl';
export default {
  name: 'GuaranteeIndex',
  components: {
    QueryTable,
    listDetails,
    kpcl,
    tbcl,
    lpcl
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
            { label: '订单创建时间', prop: 'orderCreateDate' },
            {
              label: '支付状态',
              prop: 'paystatus',
              dict: this.$store.getters.dictData.dzbh_zfzt || []
            },
            { label: '支付时间', prop: 'paymentDate' },
            {
              label: '支付金额(元)',
              prop: 'amount'
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
              label: '业务类型',
              prop: 'busiType',
              dict: this.$store.getters.dictData.dzbh_yylx || []
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

            { label: '退款时间', prop: 'refundDate' },
            {
              label: '是否支付超时',
              prop: 'isOverTime',
              dict: this.$store.getters.dictData.dzbh_sfzfcs || []
            },
            { label: '商品描述', prop: 'goods' },
            { label: '可打折金额', prop: 'discountAmount' },
            { label: '手续费收取模式', prop: 'feeMode' },
            { label: '分期期数', prop: 'numberOfInstallments' }
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
        'label-width': '105px',
        'label-position': 'right',
        'form-item': {
          width: '200px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      getData: listQuery,
      resettime: '',
      invoicestatus: '',
      // 退保时间
      applyquittime: '',
      // 退保状态
      bankstatus: '',
      // 理赔状态
      claimstatus: '',
      // 理赔申请时间
      applyclaimtime: ''
    };
  },
  computed: {
    formData: function(params) {
      return [
        { label: '开标开始日期', model: 'kaibiaoStartDate', type: 'datetime' },
        { label: '开标结束日期', model: 'kaibiaoEndDate', type: 'datetime' },
        {
          label: '申请开始日期',
          model: 'baohanapplytimeStartDate',
          type: 'datetime'
        },
        {
          label: '申请结束日期',
          model: 'baohanapplytimeEndDate',
          type: 'datetime'
        },
        {
          label: '结算开始日期',
          model: 'baohansubmitsettlementtimeStartDate',
          type: 'datetime'
        },
        {
          label: '结算结束日期',
          model: 'baohansubmitsettlementtimeEndDate',
          type: 'datetime'
        },
        // {
        //   label: '开票申请开始日期',
        //   model: 'applybilltimeStartDate',
        //   type: 'date'
        // },
        // {
        //   label: '开票申请结束日期',
        //   model: ' applybilltimeEndDate',
        //   type: 'date'
        // },
        { label: '担保号', model: 'baohanno' },
        { label: '预担保号', model: 'preguaranteenumber' },
        { label: '业务流水号', model: 'applyno' },
        { label: '投标企业名称', model: 'biddername' },
        {
          label: '担保状态',
          model: 'guaranteestatus',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_db_status || []
        },
        {
          label: '支付状态',
          model: 'paystatus',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_zfzt || []
        },
        {
          label: '保函申请状态',
          model: 'baohanapplystatus',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_sq_status || []
        },
        { label: '保函终保时间', model: 'enddate', type: 'datetime' },
        {
          label: '开票类型',
          model: 'invoicetype',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_kp_type || []
        },
        {
          label: '开票状态',
          model: 'invoicestatus',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_kp_status || []
        }
        // {
        //   label: '退保状态',
        //   model: 'bankstatus',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.dzbh_tbzt || []
        // },
        // {
        //   label: '理赔状态',
        //   model: 'claimstatus',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.dzbh_lp_status || []
        // }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    // this.getTime();
  },

  mounted() {
    // this.getTemplate();
    console.log('listData', this.listData);
  },
  // life cycle end
  methods: {
    // 查看详情
    hanldleDetails(id) {
      this.openDetails = true;
    },
    closeDetails() {
      this.openDetails = false;
      this.$refs.queryTable.getList();
    },
    // 导出
    handleExport() {
      // const url =
      //   process.env.VUE_APP_BASE_API +
      //   '/xtdzztbbus/ywinfo/export?' +
      //   'fileId=' +
      //   this.imageUrlFrontData.fileId;
      // location.href = url;

      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return exportLog(queryParams);
        })
        .then(response => {
          this.$download(response.msg);
        })
        .catch(() => {});
    },
    // 下载
    handleDownload() {
      debugger;
      if (this.multipleSelection.length == 0) {
        this.$message.warning('请先选中列表!');
      } else {
        console.log(' this.multipleSelection[0]', this.multipleSelection[0]);
        if (
          this.multipleSelection[0].downloadurl == '' ||
          this.multipleSelection[0].downloadurl == null
        ) {
          this.$message.warning('保函没有开标，无法进行保函下载!');
        } else {
          const downUrl = this.multipleSelection[0].downloadurl;
          window.open(downUrl);
        }
      }
    },

    clickRow(row) {
      debugger;
      this.listInterfaceData = row;
      this.loading = true;

      const params1 = {
        applyno: row.applyno
      };
      getZfInfo(params1).then(res => {
        Object.assign(this.listInterfaceData, res.rows[0]);
      });

      this.ywid = row.ywid;
      this.resettime = row.resettime;
      this.invoicestatus = row.invoicestatus;
      this.applyquittime = row.applyquittime;
      this.bankstatus = row.bankstatus;
      this.claimstatus = row.claimstatus;
      this.applyclaimtime = row.applyclaimtime;
      setTimeout(() => {
        this.openDetails = true;
        this.loading = false;
      }, 3000);
      // getDict().then(res => {
      //   if (res.code == '200') {

      //   } else {
      //     this.$message.warning('字典请求失败!');
      //     this.loading = false;
      //   }
      // });

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
