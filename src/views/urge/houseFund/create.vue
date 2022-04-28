
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
      <el-form-item label="身份证号" prop="zjhm">
        <el-input
          v-model="queryParams.zjhm"
          placeholder="请输入客户身份证号"
          clearable
          size="small"
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="任务生成开始时间" prop="rwcjsjStrart">
        <el-date-picker
          v-model="queryParams.rwcjsjStrart"
          value-format="yyyy-MM-dd"
          type="date"
          style="width: 150px"
          placeholder="请选择选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="任务生成结束时间" prop="rwcjsjEnd">
        <el-date-picker
          v-model="queryParams.rwcjsjEnd"
          value-format="yyyy-MM-dd"
          type="date"
          style="width: 150px"
          placeholder="请选择选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="padding-left:65px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8" style="padding-left:65px">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:add']"
          type="primary"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="clickOverdue"
        >逾期导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:edit']"
          type="primary"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="clickInstead"
        >代偿导入</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table
      v-loading="loading"
      align="center"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="姓名" prop="xingming" align="center" width="120" />
      <el-table-column
        label="证件号码"
        prop="zjhm"
        align="center"
        :show-overflow-tooltip="true"
        width="180"
      />
      <el-table-column label="催收类型" width="150" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(collectionTypeOptions, scope.row.cslx) }}</template>
      </el-table-column>
      <el-table-column label="审核状态" width="100" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(dealStatus, scope.row.shzt) }}</template>
      </el-table-column>
      <el-table-column label="业务类型" width="100" align="center">
        <template slot-scope="scope">{{ $selectDictLabel(businessOptions, scope.row.ywlx) }}</template>
      </el-table-column>
      <el-table-column label="拖欠金额(元)" prop="dctqje" width="100" align="center" />
      <el-table-column label="当期逾期期数(月)" prop="dyqs" width="120" align="center" />
      <el-table-column label="月还款额" prop="dqjhhkje" width="100" align="center" />
      <el-table-column label="本金(元)" prop="bj" width="100" align="center" />
      <el-table-column label="利息(元)" prop="lx" width="100" align="center" />
      <el-table-column label="罚息(元)" prop="fx" width="100" align="center" />
      <el-table-column label="复利(元)" prop="fl" width="100" align="center" />
      <el-table-column label="数据入库时间" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ $parseTime(new Date(scope.row.sjrksj)) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同贷款金额(元)" prop="htdkje" width="120" align="center" />
      <el-table-column label="贷款类型" width="100">
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
      <el-table-column label="创建时间" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.rwcjsj ? $parseTime(new Date(scope.row.rwcjsj)) : '' }}</span>
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

    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-upload
        ref="upload"
        style="border-bottom: 1px solid #eee;padding-bottom:10px;margin-bottom:20px"
        class="upload-demo"
        name="file"
        :limit="1"
        :headers="headers"
        accept=".xlsx, .xls"
        :action="baseUrl + uploadAction"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="uploadSuccess"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
      </el-upload>
      <el-row>
        <el-col :push="15">
          <el-button type="primary" plain size="mini" @click="confirmUpload">上传文件</el-button>
          <el-button type="primary" plain size="mini" @click="downloadTemplate">模板下载</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { houseFund } from '@/api/urge/houseFund';
import { getToken } from '@/utils/auth'
export default {
  name: 'HouseFundCreate',
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xingming: undefined,
        zjhm: undefined,
        dkglb: undefined,
        cslx: undefined,
        rwzt: undefined,
        rwcjsjStrart: undefined,
        rwcjsjEnd: undefined
      },
      glbOptions: [],
      collectionTypeOptions: [],
      dealStatus: [],
      businessOptions: [],
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
      // 选中文件列表
      fileList: [],
      uploadAction: ``
    };
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
      this.dealStatus = response.data;
    });
    this.$getDicts('business_type').then((response) => {
      this.businessOptions = response.data;
    });
    this.$getDicts('loan_type').then((response) => {
      this.loanOptions = response.data;
    });
    this.getList()
  },
  methods: {
    handleQuery() {
      this.getList()
    },
    resetQuery() {
      this.$resetForm('queryForm');
      this.getList()
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
      houseFund.getListByPage(this.queryParams).then(res => {
        if (res.code === 200) {
          this.tableData = res.rows
          this.total = res.total
        }
      })
      this.loading = false;
    },
    // 点击逾期上传按钮
    clickOverdue() {
      this.title = '催收逾期任务导入';
      this.uploadAction = `/loan/overdueExcel/importYqData`
      this.openDataScope = true;
    },
    // 点击代偿上传按钮
    clickInstead() {
      this.title = '催收代偿任务导入';
      this.uploadAction = `/loan/overdueExcel/importDcData`
      this.openDataScope = true;
    },
    // 模板下载
    downloadTemplate() {
      houseFund.getTemplatePath().then(res => {
        if (res.code === 200 && res.msg) {
          window.open(`${this.$iframeBaseUrl}/common/download?fileName=${encodeURI(res.msg)}`)
        }
      })
    },
    // 文件上传
    confirmUpload() {
      this.$refs.upload.submit();
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.fileList = []
        this.$msgSuccess(response.msg)
        this.openDataScope = false
      } else {
        this.$msgError(response.msg)
      }
    },
    // 文件上传预览
    handlePreview() { },
    // 删除文件
    handleRemove() { }
  }
};
</script>

<style>
</style>
