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
    <el-form-item label="手机号码" prop="sjhm">
        <el-input
          v-model="queryParams.sjhm"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="证件号码" prop="zjhm">
        <el-input
          v-model="queryParams.zjhm"
          placeholder="请输入证件号码"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务分配开始时间" prop="rwfpkssj">
        <el-date-picker
            v-model="queryParams.rwfpkssj"
            type="date"
            style="width: 150px"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务分配结束时间" prop="rwfpjssj">
        <el-date-picker
            v-model="queryParams.rwfpjssj"
            type="date"
            style="width: 150px"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="贷款担保类型" prop="dkdblx">
        <el-select
          v-model="queryParams.dkdblx"
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
      <el-form-item label="处理状态" prop="clzt">
        <el-select
          v-model="queryParams.clzt"
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
      <el-form-item label="催收方式" prop="csfs">
        <el-select
          v-model="queryParams.csfs"
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
      <el-form-item label="催收人员" prop="csry">
        <el-select
          v-model="queryParams.csry"
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
      <el-form-item label="是否有其他催收" prop="sfyqtcs">
        <el-select
          v-model="queryParams.sfyqtcs"
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
      <el-form-item label="是否关联分配" prop="sfglfp">
        <el-select
          v-model="queryParams.sfglfp"
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
      <el-form-item label="是否改派" prop="sfgp">
        <el-select
          v-model="queryParams.sfgp"
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
          v-hasPermi="['system:role:add']"
        >导出数据</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="clickOverdue"
          v-hasPermi="['system:role:edit']"
        >催收登记</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['system:role:edit']"
        >添加代办</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          v-hasPermi="['system:role:edit']"
        >代办任务管理</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-checkbox v-model="autoRelation" label="自动关联" border size="small"></el-checkbox>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
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
    
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 催收登记对话框 -->
    <el-dialog title="公积金催收登记详情" :visible.sync="openDataScope" width="90%" append-to-body>
      <el-row :gutter="10" class="mb8" style="padding-left:65px" >
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            v-hasPermi="['system:role:add']"
          >导出数据</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="clickOverdue"
            v-hasPermi="['system:role:edit']"
          >催收登记</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            v-hasPermi="['system:role:edit']"
          >添加代办</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            v-hasPermi="['system:role:edit']"
          >代办任务管理</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-checkbox v-model="autoRelation" label="自动关联" border size="small"></el-checkbox>
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
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