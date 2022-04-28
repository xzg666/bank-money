<!-- 台账登记实收流水业务部门页面 -->
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
              value-format="HH:mm:ss"
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
              value-format="HH:mm:ss"
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
              size="small"
              style="width:100%"
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
              size="small"
              style="width:100%"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="对账状态" prop="dzzt">
            <el-select
              v-model="queryParams.dzzt"
              placeholder="请选择对账状态"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导入批次号" prop="drpch">
            <el-input
              v-model="queryParams.drpch"
              style="width:100%"
              placeholder="请输入导入批次号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="被认领数量" prop="brlsl">
            <el-input
              v-model="queryParams.brlsl"
              style="width:100%"
              placeholder="请输入被认领数量"
              clearable
              size="small"
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
        icon="el-icon-takeaway-box"
        type="primary"
        @click="hangUpFunc"
        >挂起</el-button>
      <el-button
        size="mini"
        plain
        icon="el-icon-takeaway-box"
        type="primary"
        @click="cacleHangUpFunc"
        >取消挂起</el-button>
      <el-button
        size="mini"
        plain
        icon="el-icon-upload2"
        type="primary"
        @click="clcikImport"
        >导入</el-button>
      <el-button
        size="mini"
        plain
        icon="el-icon-s-check"
        type="primary"
        @click="CorrelationParameter"
        >关联台账</el-button>
      <el-button
        size="mini"
        plain
        icon="el-icon-warning"
        type="primary"
        @click="cancelRelation"
        >取消关联</el-button>
      <el-button
        size="mini"
        plain
        icon="el-icon-s-management"
        type="primary"
        @click="automatch"
        >自动匹配</el-button>
      <el-button
        size="mini"
        plain
        icon="el-icon-s-custom"
        type="primary"
        @click="goCheck"
        >提交审核</el-button>
    </div>
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    <el-table
      v-loading="loading"
      :data="bussinessList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="打款日期" prop="dkrq" width="120" />
      <el-table-column label="打款时间" prop="dksj" width="120" />
      <el-table-column label="银行名称" prop="yhmc" />
      <el-table-column label="收款账户" prop="skzh" width="120" />
      <el-table-column label="银行流水号" prop="yhlsh" width="120" />
      <el-table-column label="打款金额" prop="dkje" />
      <el-table-column label="备注" prop="bz" />
      <el-table-column
        label="对账状态"
        prop="dzzt"
        :formatter="statusFormat"
        width="120"
      />
      <el-table-column label="被认领数量" prop="brlsl" width="90" />
      <el-table-column label="退回理由" prop="thly" />
      <el-table-column label="操作" fixed="right" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="clickLedger(scope.row)">
            查看台账
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
        @selection-change="handleSelectionChangeRationCacle"
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

    <!-- 关联台账对话框 -->
    <el-dialog
      title="关联台账"
      :visible.sync="openDataRelation"
      width="90%"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <div>当前流水号:</div>
      <p>{{ runNum }}</p>
      <div class="cacle-btn">
        <el-button
          size="mini"
          plain
          type="primary"
          style="float: right"
          @click="okRelationBtn"
          >确认关联</el-button>
      </div>
      <el-form
        v-show="showSearch"
        ref="relationForm"
        :model="queryRelationParams"
        label-position="right"
        label-width="130px"
        style="margin-top:40px"
      >
        <!-- <el-col :span="6">
          <el-form-item label="打款开始日期" prop="dkStartDate">
            <el-date-picker
              v-model="queryRelationParams.dkStartDate"
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
              v-model="queryRelationParams.dkEndDate"
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
              v-model="queryRelationParams.dkStartTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点"
              style="width:100%"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款结束时间" prop="dkEndTime">
            <el-time-picker
              v-model="queryRelationParams.dkEndTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点"
              style="width:100%"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打款结束时间" prop="dkEndTime">
            <el-time-picker
              v-model="queryRelationParams.dkEndTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点"
              style="width:100%"
            >
            </el-time-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="客户姓名" prop="khxm">
            <el-input
              v-model="queryRelationParams.khxm"
              placeholder="请输入客户姓名"
              clearable
              size="small"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证号" prop="sfzh">
            <el-input
              v-model="queryRelationParams.sfzh"
              placeholder="请输入身份证号"
              clearable
              size="small"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否批量导入" prop="sfpldr">
            <el-input
              v-model="queryRelationParams.sfpldr"
              placeholder="请输入是否批量导入"
              clearable
              size="small"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导入批次号" prop="drpch">
            <el-input
              v-model="queryRelationParams.drpch"
              style="width:100%"
              placeholder="请输入导入批次号"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="精准对账批次号" prop="jzdzpch">
            <el-input
              v-model="queryRelationParams.jzdzpch"
              style="width:100%"
              placeholder="请输入精准对账批次号"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="台账状态" prop="tzzt">
            <el-select
              v-model="queryRelationParams.tzzt"
              placeholder="请选择台账状态"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleRelationQuery"
              >搜索</el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetRelationQuery"
              >重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table
        :data="dialogTableRelationData"
        @selection-change="handleSelectionChangeRationConfirm"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="台账ID" width="200" align="center" prop="id" />
        <el-table-column label="客户姓名" align="center" prop="khxm" />
        <el-table-column
          label="台账状态"
          align="center"
          prop="tzzk"
          :formatter="statuFormat"
          width="150"
        />
        <el-table-column
          label="身份证号"
          width="200"
          align="center"
          prop="sfzh"
        />
        <el-table-column
          label="登记时间"
          width="150"
          align="center"
          prop="djsj"
        />
        <el-table-column
          label="代偿本金"
          width="120"
          align="center"
          prop="dcbj"
        />
        <el-table-column label="代偿利息" align="center" prop="dclx" />
        <el-table-column
          label="代偿罚息"
          width="120"
          align="center"
          prop="dcfx"
        />
        <el-table-column label="代偿复利" align="center" prop="dcfl" />
        <el-table-column
          label="代偿总金额"
          align="center"
          prop="dczje"
          width="150"
        />
        <el-table-column
          label="本次回收金额"
          align="center"
          prop="bchsje"
          width="150"
        />
        <el-table-column
          label="本次回收本金"
          align="center"
          prop="bchsbj"
          width="150"
        />
        <el-table-column
          label="本次回收利息"
          align="center"
          prop="bchslx"
          width="150"
        />
        <el-table-column
          label="本次回收罚息"
          align="center"
          prop="bchsfx"
          width="150"
        />
        <el-table-column
          label="本次回收复利"
          align="center"
          prop="bchsfl"
          width="150"
        />
        <el-table-column label="个人余额" align="center" prop="grye" />
        <el-table-column
          label="个人归属公司"
          align="center"
          prop="grgsgs"
          :formatter="companyFormat"
          width="150"
        />
        <el-table-column
          label="业务部门应收"
          align="center"
          prop="ywbmys"
          width="150"
        />
        <el-table-column
          label="业务部门实收"
          align="center"
          prop="ywbmss"
          width="150"
        />
        <el-table-column
          label="预约实际还款时间"
          align="center"
          prop="yysjhk"
          width="150"
        />

        <el-table-column
          label="是否批量导入"
          align="center"
          prop="sfpldr"
          width="150"
        />
        <el-table-column
          label="精准对账批次号"
          align="center"
          prop="jqdzpch"
          width="150"
        />
        <el-table-column
          label="台账标识"
          align="center"
          prop="tzbs"
          :formatter="identifyFormat"
          width="150"
        />
        <el-table-column label="备注" align="center" prop="bz" />
      </el-table>

      <pagination
        v-show="totalRelation > 0"
        :total="totalRelation"
        :page.sync="queryRelationParams.pageNum"
        :limit.sync="queryRelationParams.pageSize"
        @pagination="getRelationList"
      />
    </el-dialog>
    <el-dialog
      title="导入"
      :visible.sync="importDialog"
      width="500px"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
      >
        <el-button
slot="trigger"
size="small"
type="primary"
>选取文件</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传.xlsx, .xls文件
        </div>
      </el-upload>
      <el-row>
        <el-col :push="15">
          <el-button
type="primary"
plain
size="mini"
@click="submitFileForm"
>开始导入</el-button>
          <el-button
type="primary"
plain
size="mini"
@click="handleExport"
>模板下载</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { relataionApi } from '@/api/ledger/flowBusiness';
import {
  queryYwbmList,
  queryAutomatch,
  hangUpApi,
  updateRetaion,
  exportTemplate,
  submitCheck,
  cacleHanUp
} from '@/api/ledger/flowBusiness';
import { queryList } from '@/api/ledger/recode';
import { queryDetail } from '@/api/ledger/history';
import { getToken } from '@/utils/auth';
export default {
  name: 'Bussiness',
  mixins: [tableMixin()],
  data() {
    return {
      openDataScope: false,
      dialogTableData: [],
      dialogTableRelationData: [],
      statusOptions: [],
      importDialog: false,
      openDataRelation: false,
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      // 遮罩层
      loading: true,
      queryRelationParams: {
        pageNum: 1,
        pageSize: 10
        // lsid: this.detailId
      },
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
        brlsl: undefined,
        customName: null,
        IDNumber: null
      },
      // 表格数据
      bussinessList: [],
      // deleteApi: deleteApi,
      selectRows: [],
      // 总条数
      total: 0,
      totalRelation: 0,
      // 复选框
      multipleSelection: [],
      // 查看台账复选框
      multipleSelectionRation: [],
      // 关联台账复选框
      multipleSelectionRationConfirm: [],
      // 挂起参数
      gqParams: {},
      ids: [],
      // 取消关联台账id
      relationIds: [],
      lsid: '',
      // 关联id
      relationIdsRation: [],
      // 显示搜索条件
      showSearch: true,
      runNum: '',
      detailId: '',
      // 查看详情参数
      detailParams: {},
      tzTitle: '',
      // 台账标识
      identifyOptions: [],
      // 显示隐藏取消关联按钮
      showCacleBtn: false,
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/loan/dchsqr/importData'
      },
      multipleSelectionRationCacle: [],
      relationIdsRationCacle: [],
      dzzt: ''
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
      this.addFormList.find(
        item => item.model === 'tzzt'
      ).dictOptions = this.statusOptions;
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
    getList() {
      queryYwbmList(this.queryParams).then(response => {
        this.bussinessList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 台账状态
    statuFormat(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.tzzt);
    },
    okRelationBtn() {
      if (this.multipleSelectionRationConfirm.length <= 0) {
        this.$message.warning('请选择要关联的列表!');
      } else {
        const paramsData = {
          ids: this.relationIdsRation,
          lsid: this.detailId
        };
        relataionApi(paramsData).then(response => {
          if (response.code === 200) {
            this.$message.success('银行流水关联台账成功!');
            this.getList();
            this.openDataRelation = false;
          }
        });
      }
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
    /** 搜索按钮操作 */
    handleRelationQuery() {
      this.queryRelationParams.pageNum = 1;
      this.getRelationList();
    },
    /** 重置按钮操作 */
    resetRelationQuery() {
      this.$resetForm('relationForm');
      this.handleRelationQuery();
    },
    goCheck() {
      // if (this.multipleSelection.length <= 0) {
      //   this.$message.warning('请选择一条记录');
      // } else {
      //   submitCheck().then(res => {});
      // }
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择一条记录');
      } else {
        this.$confirm('确认提交审核吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const params = {
              // 实收流水id
              ids: this.ids
            };
            submitCheck(params).then(response => {
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.openDataScope = false;
                this.getList();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
      }
    },
    clcikImport() {
      this.importDialog = true;
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '导入';
      this.upload.open = true;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$message.success('导入成功!');
      this.importDialog = false;
      // this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 取消关联
    cancelRelation() {
      this.tzTitle = '取消关联台账';
      this.showCacleBtn = true;
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择一条记录');
      } else {
        this.openDataScope = true;
        this.getQueryDetail();
      }
    },
    // 确定取消关联
    cancelRelationBtn() {
      if (this.multipleSelectionRationCacle.length <= 0) {
        this.$message.warning('请选择一条记录');
        console.log(
          '第一this.multipleSelectionRationConfirm.length',
          this.multipleSelectionRationConfirm.length
        );
      } else {
        this.$confirm('确认取消关联的台账?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.multipleSelectionRationCacle.length <= 0) {
              this.$message.warning('请选择一条记录');
              console.log(
                '第2this.multipleSelectionRationConfirm.length',
                this.multipleSelectionRationConfirm.length
              );
            } else {
              const updateParams = {
                // 实收流水id
                lsid: this.lsid,
                // tzid集合
                tzids: this.relationIdsRationCacle.toString()
              };
              updateRetaion(updateParams).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功!');
                  this.openDataScope = false;
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
      }
    },
    // 查看台账接口
    getQueryDetail() {
      this.detailParams = {
        lsid: this.detailId || this.lsid,
        isls: '2'
      };
      // 查询查看台账接口
      queryDetail(this.detailParams).then(response => {
        this.dialogTableData = response.rows;
        console.log(this.dialogTableData);
      });
    },
    // 查看台账
    clickLedger(row) {
      console.log(row);
      this.runNum = row.yhlsh;
      this.detailId = row.id;
      this.openDataScope = true;
      this.tzTitle = '查看台账';
      this.showCacleBtn = false;
      this.getQueryDetail();
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
    /** 导出按钮操作 */
    handleExport() {
      // const queryParams = this.queryParams;
      this.$confirm('是否确认导出实收流水?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.exportLoading = true;
          return exportTemplate();
        })
        .then(response => {
          this.$download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    // 自动匹配
    automatch() {
      queryAutomatch().then(response => {
        if (response.code === 200) {
          this.$message.success('操作成功');
        }
      });
    },
    // 挂起
    hangUpFunc() {
      if (this.dzzt == '1') {
        this.$confirm('确认挂起当前选中的银行流水?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.multipleSelection.length <= 0) {
              this.$message.warning('请选择一条记录');
            } else {
              this.gqParams = {
                lsids: this.ids,
                status: '9'
              };
              hangUpApi(this.gqParams).then(response => {
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
      } else {
        this.$message({
          type: 'warning',
          message: '待确认状态才能挂起!'
        });
      }
    },
    // 取消挂起
    cacleHangUpFunc() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择一条记录');
      } else {
        if (this.dzzt == '9') {
          this.$confirm('确认取消挂起当前选中的银行流水?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const params = {
                ids: this.ids
              };
              cacleHanUp(params).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功');
                  this.getList();
                }
                console.log(response);
              });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
        } else {
          this.$message({
            type: 'info',
            message: '挂起状态才可以取消挂起!'
          });
        }
      }
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
      this.lsid = val[0].id;
      this.runNum = val[0].yhlsh;
      this.detailId = val[0].id;
      this.dzzt = val[0].dzzt;
    },
    // 查看台账弹窗的复选框
    handleSelectionChangeRation(val) {
      this.multipleSelectionRation = val;
      this.relationIds = val.map(item => item.id);
    },
    handleSelectionChangeRationConfirm(val) {
      this.multipleSelectionRationConfirm = val;
      this.relationIdsRation = val.map(item => item.id);
    },
    handleSelectionChangeRationCacle(val) {
      this.multipleSelectionRationCacle = val;
      this.relationIdsRationCacle = val.map(item => item.tzid);
    },
    getRelationList() {
      queryList(this.queryRelationParams).then(response => {
        this.dialogTableRelationData = response.rows;
        this.totalRelation = response.total;
        // console.log(this.dialogTableData);
      });
    },

    // 关联台账
    CorrelationParameter() {
      // if (this.multipleSelection.length <= 0) {
      //   this.$message.warning('请选择一条记录');
      // } else {
      //   this.$router.push({ path: '/ledger/list', query: { lsid: this.lsid }});
      // }
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请选择一条记录');
      } else {
        this.openDataRelation = true;
        // 查询查看台账接口
        this.queryRelationParams = {
          pageNum: 1,
          pageSize: 10
          // lsid: this.detailId
        };
        queryList(this.queryRelationParams).then(response => {
          this.dialogTableRelationData = response.rows;
          this.totalRelation = response.total;
          // console.log(this.dialogTableData);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-bottom: 10px;
}
.cacle-btn {
  position: relative;
  top: -60px;
}
</style>
