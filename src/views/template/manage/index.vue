<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-row type="flex" justify="center" :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                :disabled="!clickNodeData.id"
                @click="handleTreeAdd"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="!clickNodeData.id || clickNodeData.id=='0'"
                @click="handleCategoryUpdate"
              >修改</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="!clickNodeData.id || clickNodeData.id=='0'"
                @click="handleTreeDelete"
              >删除</el-button>
            </el-col>
          </el-row>
          <el-input
            v-model="deptName"
            placeholder="请输入模板名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleTableAdd"
            >新增模板</el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-download"
              size="mini"
              :loading="exportLoading"
              @click="handleExport"
            >模板下载</el-button>
          </el-col> -->
          <right-toolbar :show-search.sync="showSearch" :columns="columns" @queryTable="getList" />
        </el-row>

        <el-table
          v-loading="loading"
          :data="tableList"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column key="userId" label="模板编号" align="center" prop="templateNo" />
          <el-table-column key="userName" label="模板名称" align="center" prop="templateName" :show-overflow-tooltip="true" />
          <el-table-column key="nickName" label="版本号" align="center" prop="version" />
          <el-table-column key="deptName" label="创建人" align="center" prop="createUserId" :show-overflow-tooltip="true" />
          <el-table-column key="phonenumber" label="创建日期" align="center" prop="createDate" width="170" />
          <el-table-column
            label="操作"
            align="center"
            width="300"
            class-name="small-padding fixed-width"
          >
            <template v-if="scope.row.userId !== 1" slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-question"
                @click="clickHistory(scope.row)"
              >查看历史版本</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-download"
                @click="handleExport(scope.row)"
              >模板下载</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleTableEdit(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleTableDelete(scope.row)"
                v-show="false"
              >删除</el-button>
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
      </el-col>
    </el-row>

    <!-- 添加或修改模板分类对话框 -->
    <el-dialog :title="categoryDialogInsertOrUpdate === 'insert' ? '添加模板分类' : '修改模板分类'" :visible.sync="categoryDialog" width="800px" append-to-body>
      <el-form ref="treeForm" :model="treeForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item v-show="categoryDialogInsertOrUpdate === 'insert'" label="分类编号" prop="id">
              <el-input v-model="treeForm.id" placeholder="请输入分类编号" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input v-model="treeForm.categoryName" placeholder="请输入分类名称" maxlength="30" />
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="treeForm.remark" placeholder="请输入备注" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTemplateForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改模板对话框 -->
    <el-dialog :title="tableDialogInsertOrUpdate === 'insert' ? '添加模板' : '修改模板'" :visible.sync="tableDialog" width="600px" append-to-body>
      <el-form ref="tableForm" :model="tableForm" :rules="tableFormRules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板编号" prop="templateNo">
              <el-input v-model="tableForm.templateNo" placeholder="请输入模板编号" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="tableForm.templateName" placeholder="请输入模板名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-upload
            ref="upload"
            :action="baseUrl + '/loan/templateDefInfoMana/uploadFile'"
            :headers="headers"
            name='files'
            multiple
            :limit="1"
            :file-list="fileList"
            :on-success='unloadSuccess'
            >
              <el-button size="small" type="primary" icon="el-icon-upload2">上传附件</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="success" @click="submitTableForm">确 定</el-button>
          <el-button size="small" type="primary" @click="tableDialog=false">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 查看历史版本对话框 -->
    <el-dialog title="历史版本" :visible.sync="historyDialog" width="90%" append-to-body>
      <el-card>
        <el-table :data="historyTableData">
         <el-table-column key="userId" label="模板编号" align="center" prop="templateNo" />
          <el-table-column key="userName" label="模板名称" align="center" prop="templateName" :show-overflow-tooltip="true" />
          <el-table-column key="nickName" label="版本号" align="center" prop="version" />
          <el-table-column key="deptName" label="创建人" align="center" prop="createUserId" :show-overflow-tooltip="true" />
          <el-table-column key="phonenumber" label="创建日期" align="center" prop="createDate" width="170" />
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="text"
                icon="el-icon-download"
                @click="historyTemplateDownload(scope.row)"
              >模板下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="historyTableTotal>0"
          :total="historyTableTotal"
          :page.sync="hsitoryParams.pageNum"
          :limit.sync="hsitoryParams.pageSize"
          @pagination="getHistoryList"
        />
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { resetUserPwd, changeUserStatus, importTemplate } from '@/api/system/user';
import { getToken } from '@/utils/auth';
import { templateListApi } from '@/api/template/list';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'TemplateList',
  components: {},
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      historyTableTotal: 0,
      // 用户表格数据
      tableList: null,
      // 弹出层标题
      title: '',
      // 部门树选项
      deptOptions: [{
        label: '模板分类树',
        id: '0',
        children: []
      }],
      // 点击树节点数据
      clickNodeData: {
      },
      // 选中的table行数据
      selectRowData: {},
      // 点击历史版本选中数据
      clickHistoryId: '',
      // 是否显示模板分类弹出层
      categoryDialog: false,
      // 模板分类新增或修改标识
      categoryDialogInsertOrUpdate: null,
      // 模板新增或修改标识
      tableDialogInsertOrUpdate: null,
      // 是否显示模板弹出层
      tableDialog: false,
      // 历史版本弹出框
      historyDialog: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      treeForm: {},
      // 历史版本表格数据
      historyTableData: [],
      // 表格弹出框
      tableForm: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      hsitoryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `用户名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `部门`, visible: true },
        { key: 4, label: `手机号码`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true }
      ],
      // 表单校验
      rules: {
        id: [
          { required: true, message: '模板分类编号不能为空', trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: '模板分类名称不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      tableFormRules: {
        templateNo: [
          { required: true, message: '模板编号不能为空', trigger: 'blur' }
        ],
        templateName: [
          { required: true, message: '模板名称不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    'clickNodeData.id'(val) {
      this.getList()
    }
  },
  created() {
    this.getList();
    this.getTreeselect();
    this.$getDicts('sys_normal_disable').then(response => {
      this.statusOptions = response.data;
    });
    this.$getDicts('sys_user_sex').then(response => {
      this.sexOptions = response.data;
    });
    this.$getConfigKey('sys.user.initPassword').then(response => {
      this.initPassword = response.msg;
    });
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      templateListApi.getTableData({ ...this.queryParams, categoryId: this.clickNodeData.id }).then(response => {
        this.tableList = response.rows;
        this.total = response.total;
        this.loading = false;
      }
      );
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      templateListApi.gettreeData().then(response => {
        // response.data.map(item => {
        //   item.label = item.categoryName
        // })
        this.deptOptions[0].children = response.data;
      });
    },
    getHistoryList() {
      templateListApi.getHistoryList({ templateNo: this.clickHistoryId }).then(res => {
        this.historyTableData = res.rows
        this.historyDialog = true
      })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.clickNodeData = data
      this.queryParams.deptId = data.id;
    },
    // 用户状态修改
    handleStatusChange(row) {
      const text = row.status === '0' ? '启用' : '停用';
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeUserStatus(row.userId, row.status);
      }).then(() => {
        this.$msgSuccess(text + '成功');
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0';
      });
    },
    // 取消按钮
    cancel() {
      this.categoryDialog = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: '0',
        remark: undefined,
        postIds: [],
        roleIds: []
      };
      this.$resetForm('treeForm');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.$resetForm('queryForm');
      this.handleQuery();
    },
    // 表单行选中
    handleCurrentChange(row) {
      this.selectRowData = row
    },
    handleTableAdd() {
      if (!this.clickNodeData.id) {
        this.$msgInfo('请选择模板分类')
        return
      }
      this.tableForm = {}
      this.fileList = []
      this.tableDialogInsertOrUpdate = 'insert' // 设为新增标识
      this.tableDialog = true
    },
    handleTableEdit(row) {
      this.tableForm = Object.assign({}, row)
      this.tableDialogInsertOrUpdate = 'update' // 设为修改标识
      this.tableDialog = true
    },
    handleTableDelete(row) {
      this.$confirm('是否确认删除"' + row.templateName + '"的模板?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        templateListApi.delTemplate(row.id).then((res) => {
          if (res.code === 200) {
            this.getTreeselect()
            this.getList();
            this.$msgSuccess('删除成功');
          }
        }).catch(() => { });
      })
    },
    /** 新增按钮操作 */
    handleTreeAdd() {
      this.treeForm = {}
      this.categoryDialogInsertOrUpdate = 'insert' // 模板分类新增
      this.categoryDialog = true
    },
    // handleTableAdd() {
    //   this.tableDialog = true
    // },
    // 查看历史版本
    clickHistory(row) {
      this.clickHistoryId = row.templateNo
      this.getHistoryList()
    },
    /** 修改按钮操作 */
    handleCategoryUpdate() {
      this.treeForm = Object.assign({}, this.clickNodeData)
      this.categoryDialogInsertOrUpdate = 'update' // 模板分类修改
      this.categoryDialog = true
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: '用户密码长度必须介于 5 和 20 之间'
      }).then(({ value }) => {
        resetUserPwd(row.userId, value).then(response => {
          this.$msgSuccess('修改成功，新密码是：' + value);
        });
      }).catch(() => { });
    },
    // 文件上传成功
    unloadSuccess(res) {
      if (res.code === 200) {
        this.tableForm.filePath = res.fileName
      }
    },
    /** 分配角色操作 */
    handleAuthRole: function (row) {
      const userId = row.userId;
      this.$router.push('/auth/role/' + userId);
    },
    /** 提交按钮 */
    submitTemplateForm: function () {
      this.$refs['treeForm'].validate(valid => {
        if (valid) {
          if (this.categoryDialogInsertOrUpdate === 'update') {
            // 修改模板分类
            templateListApi.editCategory(this.treeForm).then(response => {
              if (response.code === 200) {
                this.$msgSuccess('修改成功');
                this.categoryDialog = false;
                this.getTreeselect()
                this.getList();
              }
            });
          } else if (this.categoryDialogInsertOrUpdate === 'insert') {
            // 新增模板分类，用户会输入模板分类id
            this.treeForm.parentId = this.clickNodeData.id
            templateListApi.addCategory(this.treeForm).then(response => {
              if (response.code === 200) {
                this.$msgSuccess('新增成功');
                this.categoryDialog = false;
                this.getTreeselect()
                this.getList();
              }
            });
          }
        }
      });
    },
    // 模板表格保存
    submitTableForm() {
      this.$refs['tableForm'].validate((validate) => {
        if (validate) {
          // 根据新增或修改标识来判断
          if (this.tableDialogInsertOrUpdate === 'insert') {
            if (!this.tableForm.filePath) {
              this.$msgError('请上传附件!')
              return
            }
            this.tableForm.categoryId = this.clickNodeData.id
            templateListApi.addTemplate(this.tableForm).then(res => {
              if (res.code === 200) {
                this.getList()
                this.$msgSuccess(res.msg)
                this.tableDialog = false
              }
            })
          } else if (this.tableDialogInsertOrUpdate === 'update') {
            templateListApi.editTemplate(this.tableForm).then(res => {
              if (res.code === 200) {
                this.getList()
                this.$msgSuccess(res.msg)
                this.tableDialog = false
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleTreeDelete(row) {
      this.$confirm('是否确认删除"' + this.clickNodeData.label + '"的模板?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        templateListApi.delCategory(this.clickNodeData.id).then((res) => {
          if (res.code === 200) {
            this.getTreeselect()
            this.getList();
            this.$msgSuccess('删除成功');
          }
        }).catch(() => { });
      })
    },
    /** 导出按钮操作 */
    handleExport(row) {
      // this.$download(this.selectRowData.id);
      // window.location.href = `${this.baseUrl}/loan/templateDefInfoMana/downloadFileById?id=${this.selectRowData.id}`
      window.location.href = this.baseUrl + '/loan/templateDefInfoMana/downloadFileById?id=' + encodeURI(row.id)
      // window.location.href = this.baseUrl + '/common/download?fileName=' + encodeURI(this.selectRowData.id) + '&delete=' + true;
    },
    historyTemplateDownload(row) {
      window.location.href = this.baseUrl + '/loan/templateDefHisMana/downloadFileById?id=' + encodeURI(row.id)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '用户导入';
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.$download(response.msg);
      });
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
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
