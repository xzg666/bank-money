-
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" label-position="right" label-width="130px">
      <el-form-item label="客户姓名" prop="khxm">
        <el-input
          v-model="queryParams.khxm"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="担保类型" prop="dblx">
        <el-select
          v-model="queryParams.dblx"
          placeholder="请选择贷款管理部"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="clzt">
        <el-select
          v-model="queryParams.clzt"
          placeholder="请选择贷款管理部"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="还款银行" prop="hkyh">
        <el-select
          v-model="queryParams.hkyh"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型" prop="ywlx">
        <el-select
          v-model="queryParams.ywlx"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当期逾期期数(月)" prop="dqyqqs">
        <el-select
          v-model="queryParams.dqyqqs"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="贷款类型" prop="dklx">
        <el-select
          v-model="queryParams.dklx"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="贷款管理部" prop="dkglb">
        <el-select
          v-model="queryParams.dkglb"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="催收专员" prop="cszy">
        <el-select
          v-model="queryParams.cszy"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务批次号" prop="rwpch">
        <el-select
          v-model="queryParams.rwpch"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="催收类型" prop="cslx">
        <el-select
          v-model="queryParams.cslx"
          placeholder="催收类型"
          clearable
          size="small"
          style="width: 150px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="padding-left:65px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8" style="padding-left:65px" >
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="clickOverdue"
          v-hasPermi="['system:role:add']"
        >任务改派</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['system:role:edit']"
        >改派</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['system:role:edit']"
        >一键分派</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['system:role:edit']"
        >取消任务</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-checkbox v-model="autoRelation" label="自动关联" border size="small"></el-checkbox>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" prop="roleId" width="120" />
      <el-table-column label="证件号码" prop="roleName" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="催收类型" prop="roleKey" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="担保类型" prop="roleSort" width="100" />
      <el-table-column label="处理状态" prop="roleSort" width="100" />
      <el-table-column label="审核状态" prop="roleSort" width="100" />
      <el-table-column label="业务类型" prop="roleSort" width="100" />
      <el-table-column label="逾期总金额(元)" prop="roleSort" width="120" />
      <el-table-column label="当期逾期期数(月)" prop="roleSort" width="120" />
      <el-table-column label="月还款额" prop="roleSort" width="100" />
      <el-table-column label="本金(元)" prop="roleSort" width="100" />
      <el-table-column label="利息(元)" prop="roleSort" width="100" />
      <el-table-column label="罚息(元)" prop="roleSort" width="100" />
      <el-table-column label="复利(元)" prop="roleSort" width="100" />
      <el-table-column label="任务生成时间" prop="roleSort" width="100" />
      <el-table-column label="计划完成时间" prop="roleSort" width="100" />
      <el-table-column label="合同贷款金额(元)" prop="roleSort" width="120" />
      <el-table-column label="贷款类型" prop="roleSort" width="100" />
      <el-table-column label="贷款余额(元)" prop="roleSort" width="100" />
      <el-table-column label="导入账号" prop="roleSort" width="100" />
      <el-table-column label="导入管理部" prop="roleSort" width="100" />
      <el-table-column label="分派时间" prop="roleSort" width="100" />
      <el-table-column label="催收专员" prop="roleSort" width="100" />
      <el-table-column label="分派账号" prop="roleSort" width="100" />
      <el-table-column label="是否有其他收款" prop="roleSort" width="120" />
      <el-table-column label="任务批次号" prop="roleSort" width="100" />
      <el-table-column label="任务关联ID" prop="roleSort" width="100" />
      <el-table-column label="意见与建议" prop="roleSort" width="100" />
      <el-table-column label="是否改派" prop="roleSort" width="100" />
      <el-table-column label="改派原因" prop="roleSort" width="100" />
      <el-table-column label="取消理由" prop="roleSort" width="100" />
      <el-table-column label="取消备注" prop="roleSort" width="100" />
      <el-table-column label="代偿总额(元)" prop="roleSort" width="100" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ $parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    
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
import { listRole } from "@/api/system/role";
export default {
  name: "houseFundCreate",
  data() {
    return {
      showSearch: true,
      //查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        khxm: undefined,
        dblx: undefined,
        clzt: undefined,
        hkyh: undefined,
        ywlx: undefined,
        dqyqqs: undefined,
        dklx: undefined,
        dkglb: undefined,
        cszy: undefined,
        cslx: undefined,
        rwpch: undefined,
        startDt: undefined,
        endDt: undefined,
      },
      statusOptions: [],
      // 遮罩层
      loading: false,
      // 表格数据
      roleList: [],
      // 总条数
      total: 0,
      //弹出框名称
      title: "催收逾期任务导入",
      // 是否显示弹出层
      openDataScope: false,
      //自动关联
      autoRelation: false,
    };
  },
  created() {
    // this.getList();
    this.$getDicts("sys_normal_disable").then((response) => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    handleQuery() { },
    resetQuery() { },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.roleId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 查询数据列表 */
    getList() {
      this.loading = true;
      this.loading = false;
    },
    //点击逾期导入
    clickOverdue() {
      console.log("点击");
      this.openDataScope = true;
    },
  },
};
</script>

<style>
</style>