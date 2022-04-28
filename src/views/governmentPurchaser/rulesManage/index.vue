<!-- 实收流水页面 -->
<template>
  <div class="app-container">
    <div class="choose">
      <el-dialog
        title="业务类型选择"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <div>
          <el-form
            ref="busForm"
            :model="busForm"
            :rules="busRules"
            label-width="100px"
          >
            <el-form-item label="业务选择" prop="businessData">
              <el-cascader
                ref="myCascaderBus"
                v-model="busForm.businessData"
                :options="bussniseeOptions"
                :props="optionPropsBus"
                @change="handleChangeBusType"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <!-- <label class="label-item">业务选择:</label> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
type="primary"
@click="chooseBussiness('busForm')"
>确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="isTable">
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
>新建
          </el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleUpdata"
>修改</el-button>
          <!-- <el-button size="mini" plain type="primary">删除</el-button> -->
          <el-button
size="mini"
plain
type="primary"
@click="handleDetails"
>查看</el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleAffect"
>生效</el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleHistory"
>历史版本</el-button>
          <el-button
size="mini"
plain
type="primary"
@click="handleLog"
>配置日志</el-button>
        </template>
        <template slot="operating">
          <div class="table-tit">{{ busName }}</div>
        </template>

        <template slot="table">
          <!-- <el-table-column label="参数表名称" prop="ruleVersionNum" />
          <el-table-column label="参数类型" prop="dksj" /> -->
          <el-table-column label="版本号" prop="ruleVersionNum" />
          <el-table-column label="版本名称" prop="ruleVersionName" />
          <el-table-column label="状态" prop="ruleVersionStatus">
            <template slot-scope="scope">
              <span v-if="scope.row.ruleVersionStatus == '0'">不生效</span>
              <span v-if="scope.row.ruleVersionStatus == '1'">生效</span>
              <span v-if="scope.row.ruleVersionStatus == '2'">待生效</span>
            </template>
          </el-table-column>
          <el-table-column label="状态理由" prop="ruleVersionStatusReason" />
          <el-table-column
            label="规则类型名称"
            prop="ruleTypeName"
            width="170"
          />
          <el-table-column label="生效日期" prop="ruleVersionEffectiveDate" />
          <el-table-column label="失效日期" prop="ruleVersionExpirationDate" />
          <el-table-column label="最近修改日期" prop="updateTime" width="180" />
          <el-table-column label="操作人" prop="createByName" />
        </template>
        <template slot="other">
          <!--  自定义组件部分  -->
        </template>
      </query-table>
    </div>

    <!--新建弹窗-->
    <div>
      <el-dialog
        title="规则类型选择"
        :visible.sync="dialogVisibleNew"
        width="30%"
      >
        <div>
          <!-- <label class="label-item">参数表选择:</label> -->
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option-group
              v-for="group in bussniseeOptions"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-option-group>
          </el-select> -->

          <el-form
            ref="ruleTypeForm"
            :model="ruleTypeForm"
            :rules="rulesTypeRules"
            label-width="100px"
          >
            <el-form-item label="参数表选择" prop="rulesData">
              <el-cascader
                ref="myCascader"
                v-model="ruleTypeForm.rulesData"
                :options="rulesOptions"
                :props="optionProps"
                @change="handleChangeBussiness"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleNew = false">取 消</el-button>
          <el-button
type="primary"
@click="chooseRules('ruleTypeForm')"
>确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!--生效弹窗-->
    <div>
      <el-dialog title="生效" :visible.sync="dialogVisibleEffect" width="50%">
        <div>
          <div style="color:#747070;font-weight:700;font-size:16px">
            <span
class="el-icon-warning"
>确定要将(参数表名称+版本号)生效吗</span>
          </div>
          <p style="color:red">生效后系统将以此参数表进行规则运算</p>
          <p style="color:#333">你还要继续吗?</p>
        </div>
        <div>
          <el-form
            ref="effectForm"
            :model="effectForm"
            :rules="effectRules"
            label-width="120px"
          >
            <el-form-item label="生效意见:" prop="ruleVersionStatusReason">
              <el-input
                v-model="effectForm.ruleVersionStatusReason"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传文件:" prop="ruleVersionEffectiveFileId">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :headers="headers"
                name="files"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  支持扩展名: .rar .zip .doc .docx .pdf .jpg...
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEffect = false">取 消</el-button>
          <el-button type="primary" @click="confirmEffect">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!--历史版本-->
    <div>
      <el-dialog title="历史版本" :visible.sync="dialogVisibleHis" width="50%">
        <el-table :data="dialogTableHisData">
          <el-table-column type="selection" width="55" align="center" />

          <el-table-column
            label="版本名称"
            prop="ruleVersionName"
            width="180"
          />
          <el-table-column label="版本号" prop="ruleVersionNum" />
          <el-table-column label="操作人" prop="updateByName" />

          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClickHis(scope.row)"
                >查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="totalHis > 0"
          :total="totalHis"
          :page.sync="queryHisParams.pageNum"
          :limit.sync="queryHisParams.pageSize"
          @pagination="getHisList"
        />

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleHis = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <!--历史版本-->
    <div>
      <el-dialog title="配置日志" :visible.sync="dialogVisibleLog" width="55%">
        <el-form
          ref="queryForm"
          :model="queryLogParams"
          label-position="right"
          label-width="80px"
        >
          <el-col :span="12">
            <el-form-item label="操作时间" prop="createTime">
              <el-date-picker
                v-model="queryLogParams.createTime"
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
                @click="getLogList"
                >搜索</el-button>
              <el-button
icon="el-icon-refresh"
size="mini"
@click="resetQuery"
>重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
        <el-table :data="dialogTableLogData">
          <el-table-column label="操作时间" prop="createTime" width="150px" />
          <el-table-column label="规则类型名称" prop="ruleTypeName" />
          <el-table-column label="版本名称" prop="ruleVersionName" />
          <el-table-column label="版本号" prop="ruleVersionNum" />
          <el-table-column label="生效意见" prop="ruleVersionStatusReason" />
          <el-table-column label="操作类型" prop="doType" />
          <el-table-column label="证明文件" prop="ruleVersionEffectiveFileId">
            <template slot-scope="scope">
              <span
                v-if="scope.row.ruleVersionEffectiveFileId"
                class="download"
                @click="downloadFunc(scope.row.ruleVersionEffectiveFileId)"
                >下载</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="totalLog > 0"
          :total="totalLog"
          :page.sync="queryLogParams.pageNum"
          :limit.sync="queryLogParams.pageSize"
          @pagination="getLogList"
        />

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleLog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  getBussinessSelect,
  getRulesConfigList,
  queryTemplateConfig,
  getBusSelect,
  queryHis,
  effectApi,
  configLogApi,
  downloadApi
} from '@/api/governmentPurchaser/rules';
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
      effectForm: {
        uploadFilesCreditList: []
      },
      fileList: [],
      totalHis: '',
      uploadUrl:
        process.env.VUE_APP_BASE_API + '/loan/uploadFiles/multifileUpload',
      headers: { Authorization: 'Bearer ' + getToken() },
      busRules: {
        businessData: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      rulesTypeRules: {
        rulesData: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      effectRules: {
        ruleVersionStatusReason: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
        // ruleVersionEffectiveFileId: [
        //   { required: true, message: '请选择', trigger: 'blur' }
        // ]
      },
      busForm: {
        businessData: ''
      },
      ruleTypeForm: {
        rulesData: ''
      },
      dialogVisibleHis: false,
      isTable: false,
      dialogTableHisData: [],
      queryHisParams: {
        pageNum: 1,
        pageSize: 10
      },
      queryLogParams: {
        pageNum: 1,
        pageSize: 10
      },
      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      optionProps: {
        value: 'value',
        label: 'lable'
      },
      optionPropsBus: {
        value: 'busTypeId',
        label: 'busTypeName'
      },
      selectRows: [],
      value: '',
      dialogVisibleNew: false,
      businessData: '',
      rulesData: '',
      formData: [
        { label: '版本名称', model: 'ruleVersionName' },
        { label: '操作人', model: 'createByName' },
        { label: '版本号', model: 'ruleVersionNum' },
        {
          label: '状态',
          model: 'ruleVersionStatus',
          type: 'select',
          dictOptions: [
            { dictValue: '0', dictLabel: '不生效' },
            { dictValue: '1', dictLabel: '生效' },
            { dictValue: '2', dictLabel: '待生效' }
          ]
        },
        { label: '生效日期', model: 'ruleVersionEffectiveDate', type: 'date' },
        { label: '失效日期', model: 'ruleVersionExpirationDate', type: 'date' }
      ],
      bussniseeOptions: [],
      rulesOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        busTypeId: ''
      },
      getData: getRulesConfigList,
      dialogVisible: true,
      nodeName: '',
      nodeBussinessId: '',
      ruleVersionId: '',
      dialogVisibleEffect: false,
      dialogVisibleLog: false,
      dialogTableLogData: [],
      busName: '',
      busId: '',
      totalLog: '',
      ruleVersionLogId: '',
      files: [],
      ruleTypeIds: [],
      ruleTypeId: ''
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

  mounted() {
    this.getRulesSelectData();
    // 获取业务类型下拉
    this.getBussinessSelectData();
    if (this.$route.query.busId) {
      this.queryParams.busTypeId = this.$route.query.busId;
      this.dialogVisible = false;
      this.isTable = true;
      this.busName = Cookies.get('busName');
    }
  },
  // life cycle end
  methods: {
    // 下载
    downloadFunc(id) {
      const url =
        process.env.VUE_APP_BASE_API +
        '/loan/ruleVersion/download?' +
        'glid=' +
        id;
      location.href = url;
    },
    // 生效
    confirmEffect() {
      this.effectForm.ruleVersionId = this.ruleVersionId;
      this.effectForm.ruleVersionStatus = '1';
      this.effectForm.uploadFilesCreditList = this.files;
      effectApi(this.effectForm).then(res => {
        if (res.code == 200) {
          this.$message.success('生效成功!');
          this.dialogVisibleEffect = false;
          this.$refs.queryTable.getList();
        }
      });
    },
    handleClickHis(rows) {
      // ruleVersionId
      this.ruleVersionLogId = rows.ruleVersionId;
      this.dialogVisibleLog = true;
      this.getLogList();
    },
    getLogList(type) {
      console.log('type', type);
      if (type === '' || type === undefined) {
        this.queryLogParams.ruleVersionId = this.ruleVersionLogId;
      } else {
        this.queryLogParams.ruleVersionId = this.ruleVersionId;
      }
      configLogApi(this.queryLogParams).then(res => {
        this.dialogTableLogData = res.rows;
        this.totalLog = res.total;
      });
    },
    handleSuccess(res, file) {
      this.files.push({
        fileMimetype: res.data[0].fileMimetype,
        fileName: res.data[0].fileName,
        filePath: res.data[0].filePath,
        filePostfix: res.data[0].filePostfix,
        fileSize: res.data[0].fileSize
      });

      console.log(
        ' this.effectForm.uploadFilesCreditList',
        this.effectForm.uploadFilesCreditList
      );
      console.log('arr', this.files);
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
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 历史版本
    handleHistory() {
      this.dialogVisibleHis = true;
      this.getHisList();
    },
    getHisList() {
      this.queryHisParams.busTypeId = this.busId;
      queryHis(this.queryHisParams).then(res => {
        this.dialogTableHisData = res.rows;
        this.totalHis = res.total;
      });
    },
    handleAdd() {
      this.dialogVisibleNew = true;
    },
    // 配置日志
    handleLog() {
      if (this.ruleVersionId == '') {
        this.$message.warning('请先选中数据!');
      } else {
        this.dialogVisibleLog = true;
        this.getLogList('list');
        // this.effectForm = {};
        // this.dialogVisibleEffect = true;
      }
    },
    // 生效
    handleAffect() {
      if (this.ruleVersionId == '') {
        this.$message.warning('请先选中数据!');
      } else {
        this.effectForm = {};
        this.dialogVisibleEffect = true;
      }
    },
    handleUpdata() {
      if (this.ruleVersionId == '') {
        this.$message.warning('请先选中数据!');
      } else {
        this.$router.push({
          path: '/governmentPurchaser/rulesManage/updataRule',
          query: {
            ruleVersionId: this.ruleVersionId,
            ruleTypeId:
              this.nodeBussinessId[this.nodeBussinessId.length - 1] ||
              this.ruleTypeId,
            busId: this.busId || this.$route.query.busId
          }
        });
      }
    },
    handleDetails() {
      if (this.ruleVersionId == '') {
        this.$message.warning('请先选中数据!');
      } else {
        this.$router.push({
          path: '/governmentPurchaser/rulesManage/lookRule',
          query: {
            ruleVersionId: this.ruleVersionId,
            ruleTypeId: this.nodeBussinessId[this.nodeBussinessId.length - 1],
            busId: this.busId || this.$route.query.busId
          }
        });
      }
    },
    handleChangeBussiness(value) {
      console.log('handleChangeBussiness', value);
      if (value != undefined) {
        const nodeName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels;
        this.nodeName = nodeName[nodeName.length - 1];
        this.nodeBussinessId = value;
        console.log('nodeName', this.nodeName);
        console.log(' this.nodeBussinessId', this.nodeBussinessId);
      }
    },
    handleChangeBusType(value) {
      if (value != undefined) {
        const nodeName = this.$refs.myCascaderBus.getCheckedNodes()[0]
          .pathLabels;
        this.busName = nodeName[nodeName.length - 1];
        Cookies.set('busName', this.busName);
        this.busId = value[value.length - 1];
        this.queryParams.busTypeId = this.busId;
        console.log(' this.busId ', this.busId);
      }
    },
    getBussinessSelectData() {
      getBusSelect().then(res => {
        this.bussniseeOptions = res.rows[0].children;
      });
    },
    // 规则类型
    getRulesSelectData() {
      getBussinessSelect().then(res => {
        this.rulesOptions = res.data[0].children;
      });
    },
    chooseBussiness(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isTable = true;
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    chooseRules(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({
            path: '/governmentPurchaser/rulesManage/checking',
            query: {
              ruleTypeId: this.nodeBussinessId[this.nodeBussinessId.length - 1],
              busId: this.busId || this.$route.query.busId
            }
          });
        } else {
          return false;
        }
      });
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.ruleVersionId);
      this.ruleVersionId = this.ids[0];
      this.ruleTypeIds = val.map(item => item.ruleTypeId);
      this.ruleTypeId = this.ruleTypeIds[0];
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
.download {
  display: inline-block;
  /* color: blue; */
  background: #46a6ff;
  color: #fff;
  padding: 2px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
