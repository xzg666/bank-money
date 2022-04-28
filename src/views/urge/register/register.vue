-
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :form-style="queryFormStyle"
    >
      <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:add']"
              type="primary"
              plain
              size="mini"
              icon="el-icon-upload2"
            >导出数据</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-order"
              @click="clickOverdue"
            >催收登记</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-claim"
              @click="clickAdd"
            >添加代办</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              plain
              size="mini"
              icon="el-icon-s-cooperation"
            >代办任务管理</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-checkbox v-model="autoRelation" label="自动关联" border size="small" />
          </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>
      </template>
      <template slot="table">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="催收任务关联id" prop="roleId" width="120" />
        <el-table-column label="姓名" prop="roleName" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="贷款管理部" prop="roleKey" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="月还款额(元)" prop="roleSort" width="100" />
        <el-table-column label="逾期总金额(元)" prop="roleSort" width="120" />
        <el-table-column label="当期逾期/代偿逾期(月)" prop="roleSort" width="150" />
        <el-table-column label="逾期/代偿本金(元)" prop="roleSort" width="130" />
        <el-table-column label="逾期/代偿利息(元)" prop="roleSort" width="130" />
        <el-table-column label="逾期/代偿复利(元)" prop="roleSort" width="130" />
        <el-table-column label="逾期/代偿罚息(元)" prop="roleSort" width="130" />
        <el-table-column label="证件类型" prop="roleSort" width="100" />
        <el-table-column label="证件号码" prop="roleSort" width="100" />
        <el-table-column label="合同贷款金额(元)" prop="roleSort" width="120" />
        <el-table-column label="任务生成时间" prop="roleSort" width="100" />
        <el-table-column label="分派账号" prop="roleSort" width="100" />
        <el-table-column label="分派时间" prop="roleSort" width="100" />
        <el-table-column label="业务员姓名" prop="roleSort" width="120" />
        <el-table-column label="处理状态" prop="roleSort" width="100" />
        <el-table-column label="建议优先处理方式" prop="roleSort" width="130" />
        <el-table-column label="催收类型" prop="roleSort" width="100" />
        <el-table-column label="贷款金额" prop="roleSort" width="100" />
        <el-table-column label="抵偿拖欠金额" prop="roleSort" width="100" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template slot-scope="scope">
            <span>{{ $parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
      </template>
    </query-table>

    <!-- <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">

    </el-table> -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 催收登记对话框 -->
    <el-dialog title="公积金催收登记详情" :visible.sync="openDataScope" width="90%" append-to-body style="height:95%; overflow:auto">
      <dialog-body />
    </el-dialog>
    <!-- 添加代办对话框 -->
    <el-dialog title="添加待办任务=> 当前催收客户共【0】条催收任务" :visible.sync="openAddDialog" width="90%" append-to-body style="height:95%; overflow:auto">
      <toDeal />
    </el-dialog>

  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import toDeal from './component/toDeal';
import { queryTableApi } from '@/api/ledger/history';
import { registerBody } from '@/api/urge/register';
import DialogBody from './component/dialogBody.vue';
export default {
  name: 'HouseFundCreate',
  components: {
    QueryTable,
    DialogBody,
    toDeal
  },
  data() {
    return {
      showSearch: true,
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        khxm: undefined,
        sjhm: undefined,
        zjhm: undefined,
        rwfpkssj: undefined,
        rwfpjssj: undefined,
        dblx: undefined,
        clzt: undefined,
        hkyh: undefined,
        dkdblx: undefined,
        csfs: undefined,
        csry: undefined,
        ywlx: undefined,
        sfyqtcs: undefined,
        sfglfp: undefined,
        dklx: undefined,
        dkglb: undefined,
        sfgp: undefined,
        startDt: undefined,
        endDt: undefined
      },
      formData: [
        { label: '客户名称', model: 'khxm' },
        { label: '手机号码', model: 'sjhm' },
        { label: '证件号码', model: 'zjhm' },
        { label: '任务分配开始时间', model: 'rwfpkssj', type: 'date' },
        { label: '任务分配结束时间', model: 'rwfpjssj', type: 'date' },
        {
          label: '贷款担保类型', model: 'dkdblx', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '处理状态', model: 'clzt', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '催收方式', model: 'csfs', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '催收人员', model: 'csry', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '业务类型', model: 'ywlx', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '贷款类型', model: 'dklx', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '贷款管理部', model: 'dkglb', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '是否有其他催收', model: 'sfyqtcs', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '是否关联分配', model: 'sfglfp', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '是否改派', model: 'sfgp', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        }
      ],
      getData: queryTableApi,
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
      openAddDialog: false,
      // 自动关联
      autoRelation: false
    };
  },
  created() {
    // this.getList();
    console.log('aaa');
    registerBody.getTodoNumber({
      fpclrzh: 'admin',
      ids: ['13', '17']
    }).then(res => {
      console.log(res)
    })
    this.$getDicts('sys_normal_disable').then((response) => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    handleQuery() { },
    resetQuery() { },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.roleId);
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
      console.log('点击');
      this.openDataScope = true;
    },
    // 添加代办
    clickAdd() {
      this.openAddDialog = true;
    }
  }
};
</script>

<style>
</style>
