<!-- 销售人员管理页面 -->
<template>
  <div class="app-container">
    <el-row>
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        label-position="right"
        label-width="130px"
      >
        <el-col :span="6">
          <el-form-item label="打款开始日期" prop="dkStartDate">
            <el-date-picker
              v-model="queryParams.dkStartDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款结束日期" prop="dkEndDate">
            <el-date-picker
              v-model="queryParams.dkEndDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款开始时间" prop="dkStartTime">
            <el-time-picker
              v-model="queryParams.dkStartTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format=" HH:mm:ss"
              placeholder="任意时间点"
              style="width:100%"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款结束时间" prop="dkEndTime">
            <el-time-picker
              v-model="queryParams.dkEndTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format=" HH:mm:ss"
              placeholder="任意时间点"
              style="width:100%"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款金额(小)" prop="minDkQje">
            <el-input
              v-model="queryParams.minDkQje"
              placeholder="请输入打款金额"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款金额(大)" prop="maxDkDje">
            <el-input
              v-model="queryParams.maxDkDje"
              placeholder="请输入打款金额"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导入批次号" prop="drpch">
            <el-input
              v-model="queryParams.drpch"
              placeholder="请输入导入批次号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="被认领数量" prop="brlsl">
            <el-input
              v-model="queryParams.brlsl"
              placeholder="请输入被认领数量"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button>
            <el-button
icon="el-icon-refresh"
size="mini"
@click="resetQuery"
>重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="btn-group">
      <el-button
        size="mini"
        plain
        icon="el-icon-s-flag"
        type="primary"
        @click="CheckComplaint"
        >对账申诉</el-button>
    </div>
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    <el-table
      v-loading="loading"
      :data="historyList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="打款日期" prop="dkrq" width="125" />
      <el-table-column label="打款时间" prop="dksj" width="125" />
      <el-table-column label="银行名称" prop="yhmc" />
      <el-table-column label="收款账户" prop="skzh" width="125" />
      <el-table-column label="银行流水号" prop="yhlsh" width="120" />
      <el-table-column label="打款金额" prop="dkje" />
      <el-table-column label="备注" prop="bz" />
      <el-table-column
        label="对账状态"
        prop="dzzt"
        :formatter="statusFormat"
        width="155"
      />
      <el-table-column label="被认领数量" prop="brlsl" width="90" />
      <el-table-column label="退回理由" prop="thly" />
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="clickLedger(scope.row)">
            查看台账
          </el-button>
          <el-button
            v-if="scope.row.dzzt == '8'"
            type="text"
            @click="getOrder(scope.row.lcid)"
          >
            查看工单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <template slot="other">
      <!--  自定义组件部分  -->
    </template>

    <!-- 查看台账对话框 -->
    <el-dialog
      title="查看关联台账"
      :visible.sync="openDataScope"
      width="90%"
      append-to-body
      style="height:95%; overflow:auto"
    >
      <div>当前流水号:</div>
      <p>{{ runNum }}</p>
      <el-table :data="dialogTableData">
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

    <!-- <el-dialog :visible.sync="dialogVisible" append-to-body width="1200px">
      <iframe
        :src="iframeSrc"
        width="100%"
        height="600px"
        frameborder="0"
      ></iframe>
    </el-dialog> -->
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { queryList, queryDetail } from '@/api/ledger/history';
import { tjdzssApi } from '@/api/ledger/flowBusiness';
import { getToken } from '@/utils/auth';
import { processApi } from '@/api/process';
export default {
  name: 'History',
  components: {},
  mixins: [tableMixin()],
  data() {
    return {
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      dialogVisible: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined,
        dkStartDate: undefined,
        dkEndDate: undefined,
        dkStartTime: undefined,
        dkEndTime: undefined,
        minDkQje: undefined,
        maxDkDje: undefined,
        tring: undefined,
        drpch: undefined,
        brlsl: undefined
      },
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      selectRows: [],
      historyList: [],
      showSearch: true,
      openDataScope: false,
      runNum: '',
      ywlsh: '',
      // 查看台账数据
      dialogTableData: [],
      // 查看详情参数
      detailParams: {},
      // 复选框
      multipleSelection: [],
      ids: [],
      // 对账申诉参数
      dzssParams: {},
      identifyOptions: []
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
      console.log(this.statusOptions);
    });
    // 台账标识
    this.$getDicts('Parameter _identification').then(response => {
      this.identifyOptions = response.data;
    });
  },
  mounted() {
    this.getList();
  },
  // life cycle end
  methods: {
    goAdd() {},
    // showFlow(data) {
    //   if (this.multipleSelection.length <= 0) {
    //     this.$message.warning('请选择一条记录');
    //   } else {
    //     if (typeof data === 'object') {
    //       this.iframeSrc = `${this.$iframeBaseUrl}/modeler2.html?modelId=${
    //         data.modelId
    //       }&token=${getToken()}&linkId=${data.linkId}`;
    //     } else {
    //       this.iframeSrc = `${this.$iframeBaseUrl}/modeler2.html?modelId=${
    //         this.processInfo.modelId
    //       }&token=${getToken()}&linkId=${this.processInfo.linkId}`;
    //     }
    //     this.dialogVisible = true;
    //   }
    // },
    getOrder(id) {
      this.$router.push({
        path: '/process',
        query: { processInstanceId: id }
      });
      // const params = {
      //   businessKey: id
      // };
      // processApi.queryAllOrder(params).then(res => {
      //   if (res.code === 200) {
      //
      //   }
      // });
    },
    // 打开查看台账弹窗
    clickLedger(row) {
      console.log(row);
      this.runNum = row.yhlsh;
      this.detailId = row.id;
      this.openDataScope = true;
      this.detailParams = {
        lsid: row.id,
        isls: '0'
      };
      // 查询查看台账接口
      queryDetail(this.detailParams).then(response => {
        this.dialogTableData = response.rows;
        console.log(this.dialogTableData);
      });
    },
    getList() {
      queryList(this.queryParams).then(response => {
        this.historyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$resetForm('queryForm');
      this.handleQuery();
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.dzzt);
    },
    statusFormat2(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.tzzt);
    },
    // 台账标识
    identifyFormat(row, column) {
      return this.$selectDictLabel(this.identifyOptions, row.tzbs);
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
    },
    // 对账申诉
    CheckComplaint() {
      this.$confirm('确认对当前选中的银行流水发起申诉?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.multipleSelection.length <= 0) {
            this.$message.warning('请选择一条记录');
          } else {
            this.dzssParams = {
              lsids: this.ids,
              status: '8'
            };
            tjdzssApi(this.dzssParams).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功');
                this.getList();
              }
              console.log(response);
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-bottom: 10px;
}
</style>
