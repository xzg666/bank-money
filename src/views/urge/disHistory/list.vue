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
      <el-form-item label="任务类型" prop="rwlx">
        <el-select
          v-model="queryParams.rwlx"
          placeholder="请选择任务类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in taskTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="修改类型" prop="updateType">
        <el-select
          v-model="queryParams.updateType"
          placeholder="请选择修改类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in taskUpdateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="原处理账号" prop="oldAccount">
        <el-input
          v-model="queryParams.oldAccount"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="改派处理账号" prop="newAccount">
        <el-input
          v-model="queryParams.newAccount"
          placeholder="请输入客户姓名"
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

    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <!-- <el-table-column align="center" type="selection" width="55" /> -->
      <el-table-column align="center" label="客户姓名" prop="xingming" />
      <el-table-column align="center" label="催收类型" width="150">
        <template slot-scope="scope">{{ $selectDictLabel(collectionTypeOptions, scope.row.cslx) }}</template>
      </el-table-column>
      <el-table-column align="center" label="修改类型" prop="roleSort">
        <template slot-scope="scope">{{ $selectDictLabel(taskUpdateOptions, scope.row.updateType) }}</template>
      </el-table-column>
      <el-table-column align="center" label="业务类型" width="100">
        <template slot-scope="scope">{{ $selectDictLabel(businessOptions, scope.row.ywlx) }}</template>
      </el-table-column>
      <el-table-column align="center" label="更新账号" prop="updateAccount" />
      <el-table-column align="center" label="更新时间" prop="createTime" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ? $parseTime(new Date(scope.row.updateTime)) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务类型" width="100">
        <template slot-scope="scope">{{ $selectDictLabel(taskTypeOptions, scope.row.rwlx) }}</template>
      </el-table-column>
      <el-table-column align="center" label="原处理账号" prop="oldAccount" />
      <el-table-column align="center" label="改派处理账号" prop="newAccount" />
      <el-table-column align="center" label="备注" width="170" show-overflow-tooltip prop="gpbz" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 任务改派对话框 -->
    <el-dialog title="逾期催收任务分派" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-input></el-input>
    </el-dialog>

    <!-- 改派对话框 -->
    <el-dialog title="逾期催收任务改派" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-input></el-input>
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
        ywlx: undefined,
        cslx: undefined,
        rwlx: undefined,
        updateType: undefined,
        oldAccount: undefined,
        newAccount: undefined
      },
      statusOptions: [],
      collectionTypeOptions: [],
      taskUpdateOptions: [],
      businessOptions: [],
      taskTypeOptions: [],
      loanOptions: [],
      // 遮罩层
      loading: false,
      // 表格数据
      tableData: [],
      // 总条数
      total: 0,
      // 弹出框名称
      title: '催收逾期任务导入',
      // 是否显示弹出层
      openDataScope: false,
      // 自动关联
      autoRelation: false
    };
  },
  created() {
    // this.getList();
    this.$getDicts('loan_type').then((response) => {
      this.loanOptions = response.data;
    });
    this.$getDicts('sys_normal_disable').then((response) => {
      this.statusOptions = response.data;
    });
    this.$getDicts('collection_type').then((response) => {
      this.collectionTypeOptions = response.data;
    });
    this.$getDicts('taskUpdate_type').then((response) => {
      this.taskUpdateOptions = response.data;
    });
    this.$getDicts('business_type').then((response) => {
      this.businessOptions = response.data;
    });
    this.$getDicts('task_type').then((response) => {
      this.taskTypeOptions = response.data;
    });
    this.handleQuery()
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
      this.ids = selection.map((item) => item.roleId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 查询数据列表 */
    getList() {
      this.loading = true;
      houseFund.getDispatchList(this.queryParams).then(res => {
        if (res.code === 200) {
          this.total = res.total
          this.tableData = res.rows
        }
      })
      this.loading = false;
    },
    // 点击逾期导入
    clickOverdue() {
      console.log('点击');
      this.openDataScope = true;
    }
  }
};
</script>

<style>
</style>