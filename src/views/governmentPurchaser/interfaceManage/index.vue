<!-- 接口配置页面 -->
<template>
  <div class="app-container">
    <div>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :get-data="getData"
        :form-data="formData"
        :select-rows="selectRows"
        :form-style="queryFormStyle"
        pagination
        @selection-change="handleSelectionChange"
      >
        <template slot="operating">
          <el-button
size="mini"
plain
type="primary"
@click="handleAdd"
>新增
          </el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleUpdata"
>修改</el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleDelete"
>删除</el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleDetails"
>查看详情</el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleLog"
>查看日志</el-button>
        </template>

        <template slot="table">
          <!-- <el-table-column label="参数表名称" prop="ruleVersionNum" />
          <el-table-column label="参数类型" prop="dksj" /> -->
          <!-- <el-table-column label="接口ID" prop="interfaceInfoId" /> -->
          <el-table-column label="接口名称" prop="interfaceInfoName" />
          <el-table-column label="接口编号" prop="interfaceInfoCode" />
          <el-table-column label="模块名称" prop="interfaceInfoMoudeName" />
          <el-table-column label="接口地址" prop="interfaceInfoAddress" />
          <el-table-column label="请求方式" prop="interfaceInfoReqMode" />
          <el-table-column
            label="接口状态"
            prop="interfaceInfoStatus"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.interfaceInfoStatus == '0'">关闭</span>
              <span v-if="scope.row.interfaceInfoStatus == '1'">开启</span>
            </template>
          </el-table-column>
          <el-table-column label="接口描述" prop="interfaceInfoDesc" />
          <el-table-column label="排序号" prop="interfaceInfoOrder" />
        </template>
        <template slot="other">
          <!--  自定义组件部分  -->
        </template>
      </query-table>
    </div>

    <!--新增，修改-->
    <div>
      <el-dialog :title="titleType" :visible.sync="dialogFormVisible">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="接口编号" prop="interfaceInfoCode">
            <el-input
              v-model="ruleForm.interfaceInfoCode"
              placeholder="请输入"
              :readonly="titleType == '查看' ? true : false"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="接口名称" prop="interfaceInfoName">
            <el-input
              v-model="ruleForm.interfaceInfoName"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="模块名称" prop="interfaceInfoMoudeName">
            <el-input
              v-model="ruleForm.interfaceInfoMoudeName"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="接口地址" prop="interfaceInfoAddress">
            <el-input
              v-model="ruleForm.interfaceInfoAddress"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="请求方式" prop="interfaceInfoReqMode">
            <el-input
              v-model="ruleForm.interfaceInfoReqMode"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="接口状态" prop="interfaceInfoStatus">
            <el-select
              v-model="ruleForm.interfaceInfoStatus"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请选择"
            >
              <el-option label="关闭" value="0"></el-option>
              <el-option label="开启" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口描述" prop="interfaceInfoDesc">
            <el-input
              v-model="ruleForm.interfaceInfoDesc"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input
              v-model="ruleForm.interfaceInfoOrder"
              :readonly="titleType == '查看' ? true : false"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div v-if="titleType != '查看'" slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="confirm-btn"
            @click="submitForm('ruleForm')"
            >确 定</el-button>
          <el-button
class="cancel-btn"
@click="dialogFormVisible = false"
>取 消</el-button>
        </div>
      </el-dialog>
    </div>

    <!--接口日志-->
    <div>
      <el-dialog
        title="接口日志"
        :visible.sync="dialogVisibleInterface"
        width="55%"
      >
        <!-- <el-form
          ref="queryForm"
          :model="queryinterParams"
          label-position="right"
          label-width="80px"
        >
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                v-model="queryinterParams.createTime"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd hh:mm"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="getLogData"
                >搜索</el-button>
              <el-button
icon="el-icon-refresh"
size="mini"
@click="resetQuery"
>重置</el-button>
            </el-form-item>
          </el-col>
        </el-form> -->
        <el-table :data="dialogTableInterData">
          <el-table-column label="创建时间" prop="createTime" width="150px" />
          <el-table-column label="接口ID" prop="interfaceInfoId" />
          <el-table-column label="接口名称" prop="interfaceInfoName" />
          <el-table-column label="接口地址" prop="interfaceInfoAddress" />
          <el-table-column label="入参" prop="interfaceLogInParam">
            <span
              slot-scope="scope"
              :title="scope.row.interfaceLogInParam"
              style="height:50px;
    overflow: hidden;
    display: inline-block;"
              >{{ scope.row.interfaceLogInParam }}</span></el-table-column>
          <el-table-column label="出参" prop="interfaceLogOutParam">
            <span
              slot-scope="scope"
              :title="scope.row.interfaceLogOutParam"
              style="height:50px;
    overflow: hidden;
    display: inline-block;"
              >{{ scope.row.interfaceLogOutParam }}</span></el-table-column>
          <!-- <el-table-column label="是否报错" prop="doType" />
          <el-table-column label="报错原因" prop="doType" />
          <el-table-column label="操作人" prop="doType" /> -->
        </el-table>

        <pagination
          v-show="totalInter > 0"
          :total="totalInter"
          :page.sync="queryinterParams.pageNum"
          :limit.sync="queryinterParams.pageSize"
          @pagination="getLogList"
        />

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleInterface = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  interfaceList,
  addUpdataApi,
  interfaceDetails,
  delInterfaceApi,
  interfaceLogApi
} from '@/api/governmentPurchaser/interface';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
export default {
  name: 'FlowFinance',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      rules: {
        interfaceInfoCode: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interfaceInfoName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interfaceInfoMoudeName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interfaceInfoAddress: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interfaceInfoReqMode: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interfaceInfoDesc: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        interfaceInfoStatus: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      effectForm: {},
      fileList: [],
      totalHis: '',
      uploadUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload',
      headers: { Authorization: 'Bearer ' + getToken() },
      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      selectRows: [],
      ruleForm: {},
      value: '',
      dialogFormVisible: false,
      businessData: '',
      rulesData: '',
      formData: [
        { label: '接口名称', model: 'interfaceInfoName' },
        { label: '模块名称', model: 'interfaceInfoMoudeName' }
      ],
      bussniseeOptions: [],
      rulesOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      getData: interfaceList,
      ids: [],
      interfaceInfoId: '',
      queryinterParams: {},
      dialogTableInterData: [],
      totalInter: '',
      dialogVisibleInterface: false
    };
  },
  computed: {
    multiple() {
      return this.selectRows.length === 0;
    }
  },
  watch: {},
  // life cycle start
  created() {},

  mounted() {},
  // life cycle end
  methods: {
    async handleDelete() {
      // 主键id
      if (this.interfaceInfoId == '') {
        this.$message.warning('请先选择数据!');
      } else {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const params = {
              interfaceInfoId: this.interfaceInfoId
            };
            const result = await delInterfaceApi(params);
            if (result.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$refs.queryTable.getList();
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    handleLog() {
      if (this.interfaceInfoId == '') {
        this.$message.warning('请先选择数据!');
      } else {
        this.getLogData();
        this.dialogVisibleInterface = true;
      }
    },
    getLogData() {
      this.queryinterParams.interfaceInfoId = this.interfaceInfoId;
      interfaceLogApi(this.queryinterParams).then(res => {
        this.dialogTableInterData = res.data;
      });
    },
    async handleDetails() {
      if (this.interfaceInfoId == '') {
        this.$message.warning('请先选择数据!');
      } else {
        this.titleType = '查看';
        this.dialogFormVisible = true;
        const params = {
          interfaceInfoId: this.interfaceInfoId
        };
        const queraData = await interfaceDetails(params);
        this.ruleForm = queraData.data;
      }
    },
    async handleUpdata() {
      if (this.interfaceInfoId == '') {
        this.$message.warning('请先选择数据!');
      } else {
        this.titleType = '修改';
        this.dialogFormVisible = true;
        const params = {
          interfaceInfoId: this.interfaceInfoId
        };
        const queraData = await interfaceDetails(params);
        this.ruleForm = queraData.data;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        let data = null;
        // 不传主键id是新增，传主键id是修改

        if (this.titleType == '新增') {
          data = await addUpdataApi(this.ruleForm);
          if (data.code == '200') {
            this.$message.success('操作成功!');
            this.dialogFormVisible = false;
            this.$refs.queryTable.getList();
          }
        } else {
          this.ruleForm.interfaceInfoId = this.interfaceInfoId;
          data = await addUpdataApi(this.ruleForm);
          if (data.code == '200') {
            this.$message.success('操作成功!');
            this.dialogFormVisible = false;
            this.$refs.queryTable.getList();
          }
        }
      });
    },
    handleAdd() {
      this.titleType = '新增';
      this.ruleForm = {};
      this.dialogFormVisible = true;
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.interfaceInfoId);
      this.interfaceInfoId = this.ids[0];
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table {
  margin-top: -33px;
}
.table-tit {
  font-size: 18px;
  margin-top: 10px;
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
  height: 35px;
  line-height: 35px;
  width: 200px;
  text-align: center;
}
</style>
