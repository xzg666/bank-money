<!--客户管理列表-->
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
        <el-col :span="8">
          <el-form-item label="时间维度">
            <el-select
              v-model="queryParams.sBegin"
              placeholder="请选择时间维度"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in istbFormat"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间区间">
            <el-date-picker
              v-model="queryParams.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              style="width:100%"
              @change="getQueryData"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称">
            <el-input
              v-model="queryParams.supplierName"
              style="width:100%"
              placeholder="请输入供应商名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码">
            <el-input
              v-model="queryParams.socialCreditCode"
              style="width:100%"
              placeholder="请输入统一社会信用代码"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法定代表人">
            <el-input
              v-model="queryParams.legalPerson"
              style="width:100%"
              placeholder="请输入法定代表人"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人身份证号码">
            <el-input
              v-model="queryParams.idCard"
              style="width:100%"
              placeholder="请输入法人身份证号码"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借据号">
            <el-input
              v-model="queryParams.lncfno"
              placeholder="请输入借据号"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="还款类型">
            <el-select
              v-model="queryParams.repytype"
              placeholder="请选择还款类型"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in istbFormat"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分支结构">
            <el-select
              v-model="queryParams.branch"
              placeholder="请选择分支结构"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in istbFormat"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道">
            <el-select
              v-model="queryParams.qudao"
              placeholder="请选择渠道"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in istbFormat"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
type="primary"
@click="handleImport"
>导入</el-button>
      <el-button
size="mini"
plain
type="primary"
@click="handleExport"
>导出</el-button>
      <el-button
size="mini"
plain
type="primary"
@click="handleDowload"
>下载模板</el-button>
      <el-button
size="mini"
plain
type="primary"
@click="handleLog"
>日志</el-button>
    </div>
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
      @cell-click="cellHandleclick"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="基本信息" align="center">
        <el-table-column label="借据号" prop="lncfno" width="180" />
        <el-table-column label="放款时间" prop="" />

        <el-table-column label="法定代表人" prop="legalPerson" width="120">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="color: #46a6ff;cursor: pointer;">{{
                scope.row.legalPerson
              }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="业务流水号" prop="applyno" width="150" /> -->
        <el-table-column label="法人身份证号码" prop="idCard" width="200" />
        <el-table-column
          label="手机号码"
          prop="phone"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column label="供应商名称" prop="supplierName" width="120" />
        <el-table-column
          label="统一社会信用代码"
          prop="socialCreditCode"
          width="200"
        />
        <el-table-column label="分支机构" prop="branch" />
        <el-table-column label="渠道" prop="qudao" />
      </el-table-column>
      <el-table-column label="还款计划" align="center">
        <el-table-column label="还款期次" prop="" />
        <el-table-column label="还款日期" prop="repydt" width="120" />
        <el-table-column
          label="当期应还本息合计"
          prop="planTotlam"
          width="130"
        />
        <el-table-column label="应还本金" prop="planRetucp" />
        <el-table-column label="应还利息" prop="planYsinst" />
        <el-table-column label="担保费金额" prop="poliam" width="120" />
      </el-table-column>
      <el-table-column label="还款明细" align="center">
        <el-table-column label="还款日期" prop="repydt" width="120" />
        <el-table-column label="还款类型" prop="repytype" />
        <el-table-column label="还款总金额" prop="totlam" width="120" />
        <el-table-column label="实还本金" prop="retucp" />
        <el-table-column label="实还利息" prop="ysinst" />
        <el-table-column label="实还罚息" prop="ysxxpi" />
        <el-table-column label="实还复息" prop="cixxxx" />
        <el-table-column label="实扣担保费" prop="" width="120" />
      </el-table-column>
      <el-table-column fixed="left" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
type="text"
size="small"
@click="handleClick(scope.row)"
>查看</el-button>
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

    <!--上传附件按钮---->
    <el-dialog
      title="导入"
      :visible.sync="openFile"
      width="30%"
      :close-on-click-modal="false"
      class="addDialog"
      append-to-body
    >
      <div>
        <el-form
          ref="importParams"
          :model="importParams"
          label-position="left"
          label-width="110px"
        >
          <el-form-item label="还款信息导入">
            <el-upload
              ref="upload"
              class="upload-demo"
              :action="uploadFileUrl"
              :headers="headers"
              name="file"
              :disabled="isUploading"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeAvatarUpload"
              multiple
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
              :on-progress="handleFileUploadProgress"
            >
              <el-button size="small" type="primary">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">
                支持扩展名.xls,.xlsx
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFile">取 消</el-button>
        <el-button
type="primary"
@click="submitUpload('importParams')"
>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  repaymentList,
  importRepayment
} from '@/api/governmentPurchaser/repayment';

import { getToken } from '@/utils/auth';
export default {
  name: 'Reconcile',
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
      importRules: {
        fileList: [{ required: true, message: '请上传文件' }]
      },

      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 表格数据
      dataList: [],
      // deleteApi: deleteApi,
      selectRows: [],
      // 总条数
      total: '',
      totalRelation: 0,
      // 复选框
      multipleSelection: [],
      // 查看详情参数
      detailParams: {},
      tzTitle: '',
      isUploading: false,
      // 台账标识
      identifyOptions: [],
      // 显示隐藏取消关联按钮
      showCacleBtn: false,
      filePath: '',
      fileList: [],
      importParams: {
        fileList: []
      },
      uploadAction: '',
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
        url: process.env.VUE_APP_BASE_API
      },
      istbFormat: [],
      openFile: false,
      uploadFileUrl:
        process.env.VUE_APP_BASE_API + '/creditloan/repaydetail/detailImport', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
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
    this.$getDicts('dzbh_db_status').then(response => {
      this.bhztFormat = response.data;
    });
    // 支付方式
    this.$getDicts('dzbh_zfsf').then(response => {
      this.zffsFormat = response.data;
    });
    // 对账状态
    this.$getDicts('dzbh_dzzt').then(response => {
      this.dzztFormat = response.data;
    });
    this.$getDicts('is_tb').then(response => {
      this.istbFormat = response.data;
    });
    // 对账状态dzbh_dzzt
  },
  mounted() {
    this.getList();
  },
  // life cycle end
  methods: {
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.isUploading = true;
    },
    submitUpload(formName) {
      // this.$refs.uploadFiles.submit();
      // this.fileListHk = [];
      //   const params = {
      //     file: this.filePath
      //   };
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      this.$refs.upload.submit();
      //   importRepayment(params).then(res => {
      //     if (res.code == 200) {
      //       this.$message.success('上传成功!');
      //       this.getList();
      //       this.openFile = false;
      //       this.fileList = [];
      //     }
      //   });
      //     }
      //   });
    },
    handleImport() {
      this.openFile = true;
      this.fileList = [];
    },
    closeFile() {
      this.openFile = false;
      this.fileList = [];
    },
    beforeAvatarUpload(file) {
      debugger;
      const Xls = file.name.split('.');
      if (Xls[1] === 'xls' || Xls[1] === 'xlsx') {
        return file;
      } else {
        this.$message.error('上传文件只能是 xls/xlsx 格式');
        return false;
      }
    },
    // 上传附件按钮
    handleSuccess(response, file, fileList) {
      //   console.log(response, file, fileList);
      //   this.filePath = response.data[0].filePath;
      //   this.importParams.fileList.push(response.data[0].filePath);
      //   this.fileList.push(response.data[0].filePath);
      //   console.log('filepath', this.filePath);
      //   console.log('fileList', this.fileList);
      this.openFile = false;
      this.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$message.success(response.msg);
      //   this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true });
      this.getList();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    getQueryData(value) {
      this.queryParams.pBeginDate = value[0];
      this.queryParams.pEndDate = value[1];
    },
    cellHandleclick(row, column, cell, event) {
      if (column.label === '法定代表人') {
        // 执行逻辑
        this.$router.push({
          path: '/governmentPurchaser/infoManage/infoDetails',
          query: {
            id: row.id
          }
        });
      }
    },

    // 导出
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return exportList(queryParams);
        })
        .then(response => {
          this.$download(response.msg);
        })
        .catch(() => {});
    },
    getList() {
      repaymentList(this.queryParams).then(response => {
        this.dataList = response.rows;
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
      this.queryParams = {};
      this.handleQuery();
    },

    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
      this.lsid = val[0].id;
      this.runNum = val[0].yhlsh;
      this.detailId = val[0].id;
      this.dzzt = val[0].dzzt;
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
.table-tit {
  font-size: 18px;
  height: 45px;
  line-height: 45px;
}
</style>
