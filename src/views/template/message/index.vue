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
              icon="el-icon-plus"
              size="mini"
              @click="clickAdd"
            >新增</el-button>
          </el-col>
          <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" label="模板类型">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel(messageTempalteOptions , scope.row.mblx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="模板名称" prop="mbmc" />
        <el-table-column
          align="center"
          label="短信内容"
          prop="dxnr"
          width="150px"
          :show-overflow-tooltip="true"
        />
        <el-table-column align="center" label="创建人账号" prop="cjrzh" />
        <el-table-column align="center" label="创建人姓名" prop="cjrxm" />
        <el-table-column align="center" label="创建时间" prop="cjsj" />
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">{{ $selectDictLabel(auditStatusOptions, scope.row.shzt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickEdit(scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.shzt != 4"
              type="text"
              size="small"
              @click="deleteMessage(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ $parseTime(scope.row.createTime) }}</span>
        </template>
        </el-table-column>-->
      </template>
    </query-table>

    <!-- 添加用户信息对话框 -->
    <el-dialog
      title="新增"
      :visible.sync="openAddDialog"
      width="800px"
      append-to-body
      style="height:95%; overflow:auto"
    >
      <component
        ref="_component"
        :is="currentComponent"
        :form-list="dialogFormList"
        :form-data="dialogFormData"
      >
        <template slot="operate">
          <el-row type="flex" justify="center">
            <el-button type="success" size="small" @click="save">保存</el-button>
            <el-button type="primary" size="small" @click="resetForm">重置</el-button>
          </el-row>
        </template>
      </component>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import SimpleForm from '@/components/SimpleForm';
import FreeForm from '@/components/FreeForm';
import { messageApi } from '@/api/template/message'
export default {
  name: 'HouseFundCreate',
  components: {
    QueryTable,
    SimpleForm,
    FreeForm
  },
  data() {
    return {
      showSearch: true,
      currentComponent: 'SimpleForm',
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '130px'
        }
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      dialogFormData: {
        mbmc: '',
        mblx: '',
        dxnr: ''
      },
      currentDialogType: '',
      getData: messageApi.getList,
      statusOptions: [],
      messageTempalteOptions: [],
      auditStatusOptions: [],
      // 添加代办对话框
      openAddDialog: false
    };
  },
  computed: {
    formData() {
      return [
        { label: '模板类型', model: 'mblx', type: 'select', dictOptions: this.messageTempalteOptions },
        { label: '模板名称', model: 'mbmc' },
        { label: '审核状态', model: 'shzt', type: 'select', dictOptions: this.auditStatusOptions }
      ]
    },
    dialogFormList() {
      return [
        { label: '催收类型', model: 'mblx', type: 'select', span: 12, dictOptions: this.messageTempalteOptions },
        { label: '模板名称', model: 'mbmc', span: 12 },
        { label: '短信类容', model: 'dxnr', span: 24, inputType: 'textarea' }
      ]
    }
  },
  created() {
    // this.getList();
    this.$getDicts('sys_normal_disable').then((response) => {
      this.statusOptions = response.data;
    });
    this.$getDicts('message_template_type').then((response) => {
      this.messageTempalteOptions = response.data;
    });
    this.$getDicts('message_audit_status').then((response) => {
      this.auditStatusOptions = response.data;
    });
  },
  methods: {
    save() {
      const url = this.currentDialogType === 'add' ? '/loan/smsConfig/addSmsConfig' : '/loan/smsConfig/updateSmsConfig'
      messageApi.saveMessage(url, this.dialogFormData).then(res => {
        if (res.code === 200) {
          this.$msgSuccess(res.msg)
          this.openAddDialog = false
          this.queryParams = {
            pageNum: 1,
            pageSize: 10
          }
          this.$refs.queryTable.getList()
        }
      })
    },
    deleteMessage(row) {
      this.$confirm('确认删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        messageApi.deleteMessage(row.id).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    // 新增用户
    clickAdd() {
      this.dialogFormData = {
        mbmc: '',
        mblx: '',
        dxnr: ''
      }
      this.currentComponent = 'SimpleForm'
      this.openAddDialog = true
      this.currentDialogType = 'add'
    },
    // 编辑联系人
    clickEdit(row) {
      this.dialogFormData = Object.assign({}, row)
      this.currentComponent = 'SimpleForm'
      this.openAddDialog = true
    },
    resetForm() {
      this.$refs._component.resetForm()
    }
  }
};
</script>

<style>
</style>
