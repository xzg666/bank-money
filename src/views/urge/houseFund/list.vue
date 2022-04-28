-
<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-position="right"
      label-width="130px"
    >
      <el-form-item label="客户姓名" prop="xingming">
        <el-input
          v-model="queryParams.xingming"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="担保类型" prop="dkdblx">
        <el-select
          v-model="queryParams.dkdblx"
          placeholder="请选择担保类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in guaranteeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="rwzt">
        <el-select
          v-model="queryParams.rwzt"
          placeholder="请选择处理状态"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in dealStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="还款银行" prop="hkyh">
        <el-select
          v-model="queryParams.hkyh"
          placeholder="请选择还款银行"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in payBankOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型" prop="ywlx">
        <el-select
          v-model="queryParams.ywlx"
          placeholder="请选择业务类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in businessOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前逾期期数(月)" prop="dyqs">
        <el-input
          v-model="queryParams.dyqs"
          placeholder="请输入当前逾期期数"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款类型" prop="dklx">
        <el-select
          v-model="queryParams.dklx"
          placeholder="请选择贷款类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in loanOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="贷款管理部" prop="dkglb">
        <el-select
          v-model="queryParams.dkglb"
          placeholder="请选择贷款管理部"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in glbOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="催收专员" prop="ywyxm">
        <el-input
          v-model="queryParams.ywyxm"
          placeholder="请输入催收专员"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="催收类型" prop="cslx">
        <el-select
          v-model="queryParams.cslx"
          placeholder="请选择催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in collectionTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务批次号" prop="rwpch">
        <el-input
          v-model="queryParams.rwpch"
          placeholder="请输入任务批次号"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item style="padding-left:65px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8" style="padding-left:65px">
      <!-- <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:add']"
          type="primary"
          plain
          icon="el-icon-s-fold"
          size="mini"
          @click="clickOverdue('rwfp')"
        >任务分派</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:edit']"
          type="primary"
          plain
          icon="el-icon-s-operation"
          size="mini"
          @click="changeDispatch"
        >改派</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:edit']"
          type="primary"
          icon="el-icon-s-unfold"
          plain
          size="mini"
          @click="clickOverdue('yjfp')"
        >一键分配</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:edit']"
          type="primary"
          plain
          icon="el-icon-remove"
          size="mini"
          @click="cancelTask('dialog_qxfp')"
        >取消任务</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-checkbox v-model="autoRelation" label="自动关联" border size="small"></el-checkbox>
      </el-col>-->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" prop="xingming" width="120" align="center" />
      <el-table-column
        label="证件号码"
        prop="zjhm"
        align="center"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column label="催收类型" width="150" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(collectionTypeOptions, scope.row.cslx) }}</template>
      </el-table-column>
      <el-table-column label="担保类型" align="center" width="100">
        <template slot-scope="scope">{{ $selectDictLabel(guaranteeOptions, scope.row.dblx) }}</template>
      </el-table-column>
      <el-table-column label="处理状态" width="100" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(dealStatus, scope.row.rwzt) }}</template>
      </el-table-column>
      <el-table-column label="审核状态" width="100" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(auditOptions, scope.row.shzt) }}</template>
      </el-table-column>
      <el-table-column label="业务类型" width="100" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(businessOptions, scope.row.ywlx) }}</template>
      </el-table-column>
      <el-table-column label="逾期总金额(元)" prop="dctqje" width="120" align="center" />
      <el-table-column label="当期逾期期数(月)" prop="dyqs" width="120" align="center" />
      <el-table-column label="月还款额" prop="dqjhhkje" width="100" align="center" />
      <el-table-column label="本金(元)" prop="bj" width="100" align="center" />
      <el-table-column label="利息(元)" prop="lx" width="100" align="center" />
      <el-table-column label="罚息(元)" prop="fx" width="100" align="center" />
      <el-table-column label="复利(元)" prop="fl" width="100" align="center" />
      <el-table-column label="任务生成时间" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sjscsj ? $parseTime(new Date(scope.row.sjscsj)) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划完成时间" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rwjhwcsj ? $parseTime(new Date(scope.row.rwjhwcsj)) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同贷款金额(元)" prop="htdkje" width="120" align="center" />
      <el-table-column label="贷款类型" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ $selectDictLabel(loanOptions, scope.row.dklx) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="贷款余额(元)" prop="dkye" width="100" align="center" />
      <el-table-column label="导入账号" prop="drzh" width="100" align="center" />
      <el-table-column label="导入管理部" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ $selectDictLabel(glbOptions, scope.row.dkglb) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分派时间" prop="roleSort" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fpsj ? $parseTime(new Date(scope.row.fpsj)) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="催收专员" prop="ywyxm" width="100" align="center" />
      <el-table-column label="分派账号" prop="fpzh" width="100" align="center" />
      <el-table-column label="是否有其他收款" prop="roleSort" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ $selectDictLabel(yesNoOptions, scope.row.sfyqtcs) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务批次号"
        prop="rwpch"
        width="120"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="任务关联ID" prop="glid" width="170" show-overflow-tooltip align="center" />
      <el-table-column
        label="意见与建议"
        prop="yjjjy"
        width="150"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="是否改派" prop="roleSort" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ $selectDictLabel(yesNoOptions, scope.row.sfgp) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="改派原因" prop="gpyy" width="100" align="center">
        <template slot-scope="scope">
          {{ $selectDictLabel(changeDisOptions,scope.row.gpyy) }}
        </template>
      </el-table-column>
      <el-table-column label="取消理由" prop="qxly" width="100" align="center">
        <template slot-scope="scope">
          {{ $selectDictLabel(cancelOptions || [], scope.row.qxly) }}
        </template>
      </el-table-column>
      <el-table-column
        label="取消备注"
        prop="qxbz"
        width="150"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="代偿总额(元)" prop="dcje" width="100" align="center" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 任务分派对话框 -->
    <el-dialog :title="dialogTitle_fp" :visible.sync="dialog_rwfp" width="700px" append-to-body>
      <h2 class="dialog_content_word">本次任务批次号{{ taskBatchNumber }}共{{ selectTaskList.length }}条数据</h2>
      <h2 class="dialog_content_word">所选任务包含{{ cancleNumber }}条【已取消】数据</h2>
      <el-card>
        <el-form
          ref="dialog_form"
          :model="queryParams_rwfp"
          :inline="true"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="人员选择" prop="ids">
            <el-select
              v-model="queryParams_rwfp.ids"
              placeholder="催收类型(可输入筛选)"
              filterable
              multiple
              clearable
              size="small"
              style="width: 180px"
            >
              <el-option
                v-for="dict in dealUserOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间" prop="rwjhwcsj">
            <el-date-picker
              v-model="queryParams_rwfp.rwjhwcsj"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 180px"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-if="dialogTitle_fp=='任务改派'" label="改派原因" prop="gpyy">
            <el-select
              v-model="queryParams_rwfp.gpyy"
              placeholder="请选择改派原因"
              clearable
              size="small"
              style="width: 180px"
            >
              <el-option
                v-for="dict in changeDisOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="dialogTitle_fp=='任务改派'" label="备注" style="width:100%" prop="gpbz">
            <el-input
              v-model="queryParams_rwfp.gpbz"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              style="width:470px"
            ></el-input>
          </el-form-item>
          <el-form-item v-else label="意见与建议" style="width:100%" prop="yjjjy">
            <el-input
              v-model="queryParams_rwfp.yjjjy"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              style="width:470px"
            ></el-input>
          </el-form-item>
          <el-form-item style="width:100%">
            <el-row type="flex" justify="center" style="width:618px">
              <el-button type="primary" icon="el-icon-plus" @click="save_rwfp">提交</el-button>
              <el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>

    <!-- 取消分配对话框 -->
    <el-dialog title="取消任务" :visible.sync="dialog_qxfp" width="700px" append-to-body>
      <h2 class="dialog_content_word">本次任务批次号{{ taskBatchNumber }}共1条数据</h2>
      <h2 class="dialog_content_word">所选任务保函{{ cancleNumber }}条【已取消】数据</h2>
      <el-card>
        <el-form
          ref="dialog_form"
          :model="queryParams_rwfp"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="取消原因" prop="qxly">
            <el-select
              v-model="queryParams_rwfp.qxly"
              placeholder="催收类型"
              clearable
              size="small"
              style="width: 180px"
            >
              <el-option
                v-for="dict in cancelOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" style="width:100%" prop="qxbz">
            <el-input
              v-model="queryParams_rwfp.qxbz"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              style="width:470px"
            ></el-input>
          </el-form-item>
          <el-form-item style="width:100%" label-width="0">
            <el-row type="flex" justify="center">
              <el-button type="primary" icon="el-icon-plus" @click="cancel_rw">提交</el-button>
              <el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { houseFund } from '@/api/urge/houseFund';
export default {
  name: 'HouseFundCreate',
  data() {
    return {
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xingming: undefined,
        dkdblx: undefined,
        rwzt: undefined,
        hkyh: undefined,
        ywlx: undefined,
        dyqs: undefined,
        dklx: undefined,
        dkglb: undefined,
        ywyxm: undefined,
        cslx: undefined,
        rwpch: undefined,
        startDt: undefined,
        endDt: undefined
      },
      queryParams_rwfp: {

      },
      glbOptions: [],
      collectionTypeOptions: [],
      dealStatus: [],
      businessOptions: [],
      guaranteeOptions: [],
      payBankOptions: [],
      loanOptions: [],
      auditOptions: [],
      yesNoOptions: [],
      changeDisOptions: [],
      cancelOptions: [],
      // 遮罩层
      loading: false,
      // 表格数据
      tableData: [],
      // 选中的任务数据
      selectTaskList: [],
      dialogTitle_fp: '',
      // 处理人列表
      dealUserOptions: [],
      // 任务批次号
      taskBatchNumber: '',
      // 总条数
      total: 0,
      // 弹出框名称
      title: '催收逾期任务导入',
      // 是否显示任务分派弹出层
      dialog_rwfp: false,
      dialog_yjfp: false,
      dialog_qxfp: false,
      // 自动关联
      autoRelation: false,
      // 弹出框时间
      dialog_timer: '',
      // 弹出框文本域
      dialog_textarea: ''
    };
  },
  computed: {
    cancleNumber() {
      let tempNumber = 0
      this.selectTaskList.map(item => {
        if (item.rwzt === '6') {
          tempNumber++
        }
      })
      return tempNumber
    }
  },
  created() {
    // this.getList();
    this.$getDicts('dkglb').then((response) => {
      this.glbOptions = response.data;
    });
    this.$getDicts('collection_type').then((response) => {
      this.collectionTypeOptions = response.data;
    });
    this.$getDicts('houseFund_deal_status').then((response) => {
      response.data.forEach((item, index) => {
        if (item.dictValue === '9' || item.dictValue === '8') {
          response.data.splice(index, 1)
        }
      })
      this.dealStatus = response.data;
    });
    this.$getDicts('business_type').then((response) => {
      this.businessOptions = response.data;
    });
    this.$getDicts('guarantee_type').then((response) => {
      this.guaranteeOptions = response.data;
    });
    this.$getDicts('pay_bank').then((response) => {
      this.payBankOptions = response.data;
    });
    this.$getDicts('loan_type').then((response) => {
      this.loanOptions = response.data;
    });
    this.$getDicts('audit_type').then((response) => {
      this.auditOptions = response.data;
    });
    this.$getDicts('yes_no').then((response) => {
      this.yesNoOptions = response.data;
    });
    this.$getDicts('hous_change_dis_reason').then((response) => {
      this.changeDisOptions = response.data;
    });
    this.$getDicts('hous_cancel_reason').then((response) => {
      this.cancelOptions = response.data;
    });

    this.getList()
    this.getDealUserList()
  },
  methods: {
    handleQuery() {
      this.getList()
    },
    resetQuery() {
      this.$refs.queryForm.resetFields()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selectTaskList = selection
    },
    /** 查询数据列表 */
    getList() {
      this.loading = true;
      this.queryParams.autoRelation = this.autoRelation || undefined
      houseFund.getListByPage(this.queryParams).then(res => {
        if (res.code === 200) {
          this.tableData = res.rows
          this.total = res.total
        }
      })
      this.loading = false;
    },
    // 获取处理用户列表
    getDealUserList() {
      houseFund.getDealUser().then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.userName
            item.dictValue = item.userId
          })
          this.dealUserOptions = res.data
        }
      })
    },
    // 点击逾期导入
    clickOverdue(type) {
      if (type === 'rwfp' && this.selectTaskList.length === 0) {
        this.$msgError('请选择至少一条数据')
      } else {
        // 一键分配选中列表所有数据
        if (type === 'yjfp') {
          this.selectTaskList = Object.assign([], this.tableData)
        }
        if (this.selectTaskList.some(item => '0,6'.indexOf(item.rwzt) === -1)) {
          this.$msgError('所选任务无法分派')
          return
        }
        houseFund.getTskBatchNumber().then(res => {
          if (res.code === 200) {
            this.taskBatchNumber = res.data
          }
        })
        this.dialogTitle_fp = type === 'rwfp' ? '任务分派' : '一键分配'
        this.dialog_rwfp = true
      }
    },
    // 点击任务改派
    changeDispatch() {
      if (this.selectTaskList.length === 0) this.$msgError('请选择至少一条数据')
      if (this.selectTaskList.some(item => '1,2,5'.indexOf(item.rwzt) === -1)) this.$msgError('所选数据无法改派')
      houseFund.getTskBatchNumber().then(res => {
        if (res.code === 200) {
          this.taskBatchNumber = res.data
        }
      })
      this.dialogTitle_fp = '任务改派'
      this.dialog_rwfp = true
    },
    // 保存任务分派
    save_rwfp() {
      const tempData = {
        ...this.queryParams_rwfp,
        isZdgl: this.autoRelation,
        records: this.selectTaskList,
        rwpch: this.taskBatchNumber
      }
      if (this.dialogTitle_fp === '任务改派') {
        houseFund.save_rwgp(tempData).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.dialog_rwfp = false
            this.getList()
            this.queryParams_rwfp = {}
          }
        })
      } else {
        houseFund.save_rwfp(tempData).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.dialog_rwfp = false
            this.getList()
            this.queryParams_rwfp = {}
          }
        })
      }
    },
    // 取消任务
    cancelTask() {
      if (this.selectTaskList.length === 0) {
        this.$msgError('请选择至少一条数据')
      } else {
        this.dialog_qxfp = true
      }
    },
    cancel_rw() {
      const tempData = {
        ...this.queryParams_rwfp,
        records: this.selectTaskList
      }
      houseFund.cancel_rw(tempData).then(res => {
        if (res.code === 200) {
          this.$msgSuccess(res.msg)
          this.dialog_qxfp = false
          this.getList()
          this.queryParams_rwfp = {}
        }
      })
    },
    resetForm() {
      this.$refs.dialog_form.resetFields()
    }
  }
};
</script>

<style lang='scss' scoped>
.dialog_content_word {
  text-align: center;
}
</style>