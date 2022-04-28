<!-- 实收流水页面 -->
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      pagination
      @selects-change="selectRows = $event"
      @selection-change="handleSelectionChange"
    >
      <template slot="operating">
        <el-button
          size="mini"
          plain
          icon="el-icon-back"
          type="primary"
          @click="rollBack"
          >回退</el-button>
        <el-button
          size="mini"
          plain
          icon="el-icon-check"
          type="primary"
          @click="approve"
          >审核通过</el-button>
      </template>
      <template slot="table">
        <el-table-column label="打款日期" prop="dkrq" />
        <el-table-column label="打款时间" prop="dksj" />
        <el-table-column label="银行名称" prop="yhmc" />
        <el-table-column label="收款账户" prop="skzh" />
        <el-table-column label="银行流水号" prop="yhlsh" />
        <el-table-column label="打款金额" prop="dkje" />
        <el-table-column label="备注" prop="bz" />
        <el-table-column
          label="对账状态"
          prop="dzzt"
          :formatter="statusFormat"
        />
        <el-table-column label="被认领数量" prop="brlsl" />
        <el-table-column label="退回理由" prop="thly" />
        <el-table-column label="操作" fixed="right" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="clickLedger(scope.row)">
              查看台账
            </el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>

    <!-- 查看台账对话框 -->
    <el-dialog
      :title="tzTitle"
      :visible.sync="openDataScope"
      width="90%"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <div>当前流水号:</div>
      <p>{{ runNum }}</p>
      <div v-show="showCacleBtn" class="cacle-btn">
        <el-button
          size="mini"
          plain
          icon="el-icon-warning"
          type="primary"
          style="float: right"
          @click="cancelRelationBtn"
          >取消关联</el-button>
      </div>
      <el-table
        :data="dialogTableData"
        @selection-change="handleSelectionChangeRation"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="客户姓名" prop="khxm" />
        <el-table-column label="身份证号" prop="sfzh" width="180" />
        <el-table-column label="代偿拖欠金额" prop="grye" width="180" />
        <el-table-column label="本次回收总额" prop="bchsje" width="180" />
        <el-table-column
          label="台账状态"
          prop="tzzt"
          :formatter="statusFormat2"
          width="160"
        />
        <el-table-column label="登记账号" prop="djzh" width="160" />
        <el-table-column label="登记时间" prop="djsj" width="180" />
        <el-table-column label="实际还款时间" prop="yysjhcsj" width="180" />
        <el-table-column label="业务部门应收" prop="ywbmys" width="180" />
        <el-table-column label="精确对账批次号" prop="jqdzpch" width="160" />
        <el-table-column label="本次回收本金" prop="bchsbj" width="180" />
        <el-table-column label="本次回收利息" prop="bchslx" width="180" />
        <el-table-column label="本次回收复利" prop="bchsfl" width="180" />
        <el-table-column
          label="台账标识"
          prop="tzbs"
          width="160"
          :formatter="identifyFormat"
        />
        <el-table-column label="台账ID" prop="tzid" width="230" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { queryList } from '@/api/ledger/flowFinanace';
import { queryDetail } from '@/api/ledger/history';
import { tjdzssApi } from '@/api/ledger/flowBusiness';
export default {
  name: 'FlowFinance',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      formData: [
        { label: '打款开始日期', model: 'dkStartDate', type: 'date' },
        { label: '打款结束日期', model: 'dkEndDate', type: 'date' },
        { label: '打款金额(小)', model: 'minDkQje' },
        { label: '打款金额(大)', model: 'maxDkDje' },
        { label: '打款开始时间', model: 'dkStartTime', type: 'time' },
        { label: '打款结束时间', model: 'dkEndTime', type: 'time' },
        { label: '台账状态', model: 'dzzt', type: 'select', dictOptions: [] },
        { label: '导入批次号', model: 'drpch' },
        { label: '被认领数量', model: 'brlsl' }
      ],
      queryParams: {
        customName: null,
        IDNumber: null
      },
      getData: queryList,
      // deleteApi: deleteApi,
      selectRows: [],
      statusOptions: [],
      multipleSelection: [],
      ids: [],
      tzTitle: '',
      openDataScope: false,
      dialogTableData: [],
      statusOptions: [],
      importDialog: false,
      runNum: '',
      detailId: '',
      // 台账标识
      identifyOptions: [],
      // 显示隐藏取消关联按钮
      showCacleBtn: false
    };
  },
  computed: {
    multiple() {
      return this.selectRows.length === 0;
    }
  },
  watch: {},
  // life cycle start
  created() {
    this.$getDicts('Check_state').then(response => {
      this.statusOptions = response.data;
      this.formData.find(
        item => item.model === 'dzzt'
      ).dictOptions = this.statusOptions;
    });
  },

  mounted() {},
  // life cycle end
  methods: {
    goAdd() {},
    // 查看台账
    clickLedger(row) {
      console.log(row);
      this.runNum = row.yhlsh;
      this.detailId = row.id;
      this.openDataScope = true;
      this.tzTitle = '关联台账';
      this.showCacleBtn = false;
      this.getQueryDetail();
    },
    statusFormat2(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.tzzt);
    },
    // 查看台账接口
    getQueryDetail() {
      this.detailParams = {
        lsid: this.detailId || this.lsid,
        isls: '1'
      };
      // 查询查看台账接口
      queryDetail(this.detailParams).then(response => {
        this.dialogTableData = response.rows;
        console.log(this.dialogTableData);
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.dzzt);
    },
    // 审核通过
    approve() {
      this.$confirm('确认审核通过当前选中的银行流水?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.multipleSelection.length <= 0) {
            this.$message.warning('请选择一条记录');
          } else {
            const gqParams = {
              lsids: this.ids,
              status: '5'
            };
            tjdzssApi(gqParams).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功');
                this.getList();
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    rollBack() {
      this.$confirm('确认回退当前选中的银行流水?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.multipleSelection.length <= 0) {
            this.$message.warning('请选择一条记录');
          } else {
            const gqParams = {
              lsids: this.ids,
              status: '4'
            };
            tjdzssApi(gqParams).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功');
                this.getList();
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
