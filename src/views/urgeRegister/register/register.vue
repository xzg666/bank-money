-
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :inline="false"
      :form-style="queryFormStyle"
      :select-rows="selectRows"
      @selects-change="selectRows = $event"
      @cell-dblclick="cellDbClick"
    >
      <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col :span="1.5">
            <el-checkbox
              v-model="queryParams.queryType"
              true-label="wall"
              label="全部数据"
              border
              size="small"
            />
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              :icon="exportIcon"
              @click="clickExport()"
            >导出数据</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-order"
              @click="clickOverdue"
            >催收登记</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-claim"
              @click="clickAdd"
            >添加待办</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-cooperation"
              @click="clickToDoTask"
            >待办任务管理</el-button>
          </el-col>
          <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" label="是否有关联任务" prop="glid" width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.glid">是</p>
            <p v-else>否</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          prop="xingming"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column
          align="center"
          label="贷款管理部"
          prop="dkglb"
          :show-overflow-tooltip="true"
          width="150"
        >
          <template slot-scope="scope">
            {{
            $selectDictLabel(
            $store.getters.dictData.dkglb || [],
            scope.row.dkglb
            )
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="月还款额(元)" prop="yhje" width="100" />
        <el-table-column align="center" label="逾期总金额(元)" prop="zje" width="120" />
        <el-table-column align="center" label="当期逾期/代偿逾期(月)" prop="dyqs" width="150" />
        <el-table-column align="center" label="逾期/代偿本金(元)" prop="bj" width="130" />
        <el-table-column align="center" label="逾期/代偿利息(元)" prop="lx" width="130" />
        <el-table-column align="center" label="逾期/代偿复利(元)" prop="fl" width="130" />
        <el-table-column align="center" label="逾期/代偿罚息(元)" prop="fx" width="130" />
        <el-table-column align="center" label="证件类型" prop="zjlx" width="150">
          <template slot-scope="scope">
            {{
            $selectDictLabel(
            $store.getters.dictData.cert_type || [],
            scope.row.zjlx
            )
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="证件号码" prop="zjhm" width="170" />
        <el-table-column align="center" label="合同贷款金额(元)" prop="htdkje" width="120" />
        <el-table-column align="center" label="任务生成时间" prop="rwcjsj" width="160">
          <template
            slot-scope="scope"
          >{{ scope.row.rwcjsj ? $parseTime(new Date(scope.row.rwcjsj)) : '' }}</template>
        </el-table-column>
        <el-table-column align="center" label="分派账号" prop="fpzh" width="100" />
        <el-table-column align="center" label="分派时间" prop="fpsj" width="170">
          <template
            slot-scope="scope"
          >{{ scope.row.fpsj ? $parseTime(new Date(scope.row.fpsj)) : '' }}</template>
        </el-table-column>
        <el-table-column align="center" label="催收专员" prop="ywyxm" width="120" />
        <el-table-column align="center" label="处理状态" prop="rwzt" width="100">
          <template slot-scope="scope">
            {{
            $selectDictLabel(
            $store.getters.dictData.collect_deal_status || [],
            scope.row.rwzt
            )
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="建议优先处理方式" prop="jyyxclfs" width="130" /> -->
        <el-table-column align="center" label="催收类型" prop="cslx" width="100">
          <template slot-scope="scope">
            {{
            $selectDictLabel(
            $store.getters.dictData.collection_type || [],
            scope.row.cslx
            )
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="贷款金额(元)" prop="htdkje" width="100" />
        <el-table-column align="center" label="抵偿拖欠金额" prop="dctqje" width="100" />
      </template>
    </query-table>

    <!-- <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">

    </el-table>-->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 催收登记对话框 -->
    <div v-if="openDataScope">
      <el-dialog
        title="公积金催收登记详情"
        :visible.sync="openDataScope"
        width="92%"
        append-to-body
        style="height:95%; overflow:auto"
      >
        <dialog-body :select-rows="selectRows[0]" />
      </el-dialog>
    </div>
    <!-- 添加代办对话框 -->
    <div v-if="openAddDialog">
      <el-dialog
        title="添加待办任务"
        :visible.sync="openAddDialog"
        width="90%"
        append-to-body
        style="height:95%; overflow:auto"
      >
        <toDeal :select-rows="selectRows" @saveSuccess="openAddDialog=false" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import toDeal from './component/toDeal';
import { registerBody } from '@/api/urge/register';
import DialogBody from './component/dialogBody.vue';
export default {
  name: 'HouseFundCreate',
  components: {
    QueryTable,
    DialogBody,
    toDeal
  },
  provide() {
    return {
      selectRowsa: this.selectRows
    };
  },
  data() {
    return {
      showSearch: true,
      exportIcon: 'el-icon-download',
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xingming: undefined,
        sjhm: undefined,
        zjhm: undefined,
        cskssj: undefined,
        csjssj: undefined,
        dblx: undefined,
        rwzt: undefined,
        hkyh: undefined,
        dkdblx: undefined,
        cslx: undefined,
        ywyxm: undefined,
        ywlx: undefined,
        sfyqtcs: undefined,
        sfglfp: undefined,
        dklx: undefined,
        dkglb: undefined,
        sfgp: undefined,
        startDt: undefined,
        endDt: undefined,
        queryType: undefined
      },
      selectRows: [],
      getData: registerBody.getRegisterList,
      statusOptions: [],
      // 遮罩层
      loading: false,
      // 表格数据
      roleList: [],
      // 总条数
      total: 0,
      // 弹出框名称
      title: '催收逾期任务导入',
      // 是否显示弹出层
      openDataScope: false,
      // 添加代办对话框
      openAddDialog: false
    };
  },
  computed: {
    formData: function (params) {
      return [
        { label: '客户名称', model: 'xingming' },
        { label: '手机号码', model: 'sjhm' },
        { label: '证件号码', model: 'zjhm' },
        {
          label: '任务分配开始时间',
          model: 'cskssj',
          type: 'date',
          dateType: 'datetime',
          valuefFormat: 'yy-MM-dd HH:mm:ss'
        },
        {
          label: '任务分配结束时间',
          model: 'csjssj',
          type: 'date',
          dateType: 'datetime',
          valuefFormat: 'yy-MM-dd HH:mm:ss'
        },
        {
          label: '贷款担保类型',
          model: 'dkdblx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.guarantee_type || []
        },
        {
          label: '处理状态',
          model: 'rwzt',
          type: 'select',
          dictOptions: this.$store.getters.dictData.collect_deal_status || []
        },
        {
          label: '催收方式',
          model: 'cslx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.collection_type || []
        },
        {
          label: '催收专员',
          model: 'ywyxm',
          type: 'select',
          dictOptions: this.$store.getters.dictData.collect_users || []
        },
        {
          label: '业务类型',
          model: 'ywlx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.business_type || []
        },
        {
          label: '贷款类型',
          model: 'dklx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.loan_type || []
        },
        {
          label: '贷款管理部',
          model: 'dkglb',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dkglb || []
        },
        {
          label: '是否有其他催收',
          model: 'sfyqtcs',
          type: 'select',
          dictOptions: this.$store.getters.dictData.yes_no || []
        },
        {
          label: '是否关联分配',
          model: 'sfglfp',
          type: 'select',
          dictOptions: this.$store.getters.dictData.yes_no || []
        },
        {
          label: '是否改派',
          model: 'sfgp',
          type: 'select',
          dictOptions: this.$store.getters.dictData.yes_no || []
        }
      ];
    }
  },
  created() {
    // this.getList();
    this.$getDicts('sys_normal_disable').then(response => {
      this.statusOptions = response.data;
    });
    // registerBody.getTestdata();
  },
  methods: {
    handleQuery() { },
    resetQuery() { },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.glid);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 查询数据列表 */
    getList() {
      this.loading = true;
      this.loading = false;
    },
    // 点击逾期导入
    clickOverdue() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据');
        return;
      }
      this.openDataScope = true;
    },
    // 添加代办
    clickAdd() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据');
        return;
      }
      if (this.selectRows.length > 1) {
        this.$msgError('请选择一条数据');
        return;
      }
      if (this.selectRows.some(item => item.cslx !== this.selectRows[0].cslx)) {
        this.$msgError('请选择同一种催收类型的数据');
        return;
      }
      this.openAddDialog = true;
    },
    // 打开代办任务管理
    clickToDoTask() {
      this.$router.push('/loan/toDoTask/list');
    },
    cellDbClick(row, column, cell, event) {
      if (column.property === 'xingming') {
        this.selectRows = [row]
        this.clickOverdue()
      }
    },
    // 导出数据
    clickExport() {
      const exportObj = Object.assign({}, this.queryParams)
      if (exportObj.timeType === '1') {
        exportObj.zxyxStart = exportObj.startTime
        exportObj.zxyxEnd = exportObj.endTime
      } else {
        exportObj.blrqStart = exportObj.startTime
        exportObj.blrqEnd = exportObj.endTime
      }
      delete exportObj.startTime
      delete exportObj.endTime
      delete exportObj.pageSize
      delete exportObj.pageNum
      for (const key in exportObj) {
        if (exportObj[key]) {
          this.exportDetail(exportObj)
          return
        } else {
          this.$confirm('当前未输入导出条件，确定要导出所有数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.exportDetail(exportObj)
          })
        }
      }
    },
    exportDetail(Obj) {
      this.exportIcon = 'el-icon-loading'
      registerBody.exportDetail(Obj).then(res => {
        if (res.code === 200) {
          this.$download(res.msg)
        }
        this.exportIcon = 'el-icon-download'
      })
    }
  }
};
</script>

<style></style>
