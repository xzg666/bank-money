<!-- 销售人员管理页面 -->
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      :inline="false"
      pagination
      @selects-change="selectRows = $event"
      @selection-change="handleSelectionChange"
    >
      <template slot="operating">
        <el-button
          size="mini"
          plain
          icon="el-icon-upload2"
          type="primary"
          @click="clcikImport"
          >导入</el-button>
        <el-button
          v-if="$route.query.lsid"
          size="mini"
          plain
          type="primary"
          @click="confirmRelation"
          >确认关联</el-button>
        <el-button
          size="mini"
          plain
          :disabled="selectRows.length > 1"
          type="primary"
          @click="clickUpdata"
          >修改</el-button>
        <el-button
          v-hasPermi="['tzdj:btn:del']"
          size="mini"
          plain
          :disabled="selectRows.length < 1"
          type="primary"
          @click="clickDelete"
        >删除</el-button>
      </template>
      <template slot="table">
        <el-table-column label="台账ID" width="200" align="center" prop="id" />
        <el-table-column label="客户姓名" align="center" prop="khxm" />
        <el-table-column
          label="身份证号"
          width="200"
          align="center"
          prop="sfzh"
        />
        <el-table-column
          label="登记时间"
          width="150"
          align="center"
          prop="djsj"
        />
        <el-table-column
          label="代偿本金"
          width="120"
          align="center"
          prop="dcbj"
        />
        <el-table-column label="代偿利息" align="center" prop="dclx" />
        <el-table-column
          label="代偿罚息"
          width="120"
          align="center"
          prop="dcfx"
        />
        <el-table-column label="代偿复利" align="center" prop="dcfl" />
        <el-table-column
          label="代偿总金额"
          align="center"
          prop="dczje"
          width="150"
        />
        <el-table-column
          label="本次回收金额"
          align="center"
          prop="bchsje"
          width="150"
        />
        <el-table-column
          label="本次回收本金"
          align="center"
          prop="bchsbj"
          width="150"
        />
        <el-table-column
          label="本次回收利息"
          align="center"
          prop="bchslx"
          width="150"
        />
        <el-table-column
          label="本次回收罚息"
          align="center"
          prop="bchsfx"
          width="150"
        />
        <el-table-column
          label="本次回收复利"
          align="center"
          prop="bchsfl"
          width="150"
        />
        <el-table-column label="个人余额" align="center" prop="grye" />
        <el-table-column
          label="个人归属公司"
          align="center"
          prop="grgsgs"
          :formatter="companyFormat"
          width="150"
        />
        <el-table-column
          label="业务部门应收"
          align="center"
          prop="ywbmys"
          width="150"
        />
        <el-table-column
          label="业务部门实收"
          align="center"
          prop="ywbmss"
          width="150"
        />
        <el-table-column
          label="预约实际还款时间"
          align="center"
          prop="yysjhk"
          width="150"
        />
        <el-table-column
          label="台账状态"
          align="center"
          prop="tzzk"
          :formatter="statuFormat"
          width="150"
        />
        <el-table-column
          label="是否批量导入"
          align="center"
          prop="sfpldr"
          width="150"
        />
        <el-table-column
          label="精准对账批次号"
          align="center"
          prop="jqdzpch"
          width="150"
        />
        <el-table-column
          label="台账标识"
          align="center"
          prop="tzbs"
          :formatter="identifyFormat"
          width="150"
        />
        <el-table-column label="备注" align="center" prop="bz" />
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>
    <el-dialog
      title="导入"
      :visible.sync="importDialog"
      width="500px"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
      >
        <el-button
slot="trigger"
size="small"
type="primary"
>选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传.xlsx, .xls文件</div>
      </el-upload>
      <el-row>
        <el-col :push="15">
          <el-button
type="primary"
plain
size="mini"
@click="submitFileForm"
>开始导入</el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            :loading="exportLoading"
            @click="handleExport"
            >模板下载</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="openAddDialog" width="90%" append-to-body>
      <data-form
        ref="dataForm"
        :form-list="addFormList"
        :form-data="addFormData"
        :is-block="isBlockBasic"
        :rules-data="rulesForm"
        @addSubmit="updataSubmit"
        @inputChange="inputChange"
      ></data-form>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { queryList, exportTemplate, updateInfo, deleteTzdj } from '@/api/ledger/recode';
import { relataionApi } from '@/api/ledger/flowBusiness';
import { getToken } from '@/utils/auth';
import DataForm from '@/components/DataForm';
export default {
  name: 'History',
  components: {
    QueryTable,
    DataForm
  },
  mixins: [tableMixin()],
  data() {
    return {
      queryFormStyle: {
        'label-width': '120px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      openAddDialog: false,
      isUpdate: true,
      updataStatus: [
        { dictValue: '9', dictLabel: '挂起' },
        { dictValue: '1', dictLabel: '待确认' }
      ],
      queryParams: {
        startDt: null,
        endDt: null,
        amount_low: null,
        amount_cap: null,
        claimNumber: null,
        parentAgent: null
      },
      getData: queryList,
      // deleteApi: deleteApi,
      selectRows: [],
      importDialog: false,
      // 所属公司
      companyOptions: [],
      // 台账状态
      statusOptions: [],
      // 台账标识
      identifyOptions: [],
      exportLoading: false,
      multipleSelection: [],
      ids: [],
      isBlockBasic: false,
      // 实收流水id
      booleanShow: false,
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
        url: process.env.VUE_APP_BASE_API + '/tzdj/importData'
      },
      addFormData: {
        khxm: '',
        sfzh: '',
        djsj: undefined,
        dcbj: 0,
        dclx: 0,
        dcfx: 0,
        dcfl: 0,
        dczje: undefined,
        bchsje: undefined,
        bchsbj: 0,
        bchslx: 0,
        bchsfx: 0,
        bchsfl: 0,
        grye: undefined,
        grgsgs: undefined,
        ywbmys: undefined,
        ywbmss: undefined,
        yysjhcsj: undefined,
        tzzt: undefined,
        jqdzpch: undefined,
        tzbs: undefined,
        bz: undefined
      },
      tzStatus: '',
      rulesForm: {
        djsj: [{ required: true, message: '请选择', trigger: 'change' }],
        bchsbj: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    };
  },
  computed: {
    multiple() {
      return this.selectRows.length === 0;
    },
    formData: function(params) {
      return [
        { label: '客户姓名', model: 'khxm' },
        { label: '身份证号', model: 'sfzh' },
        {
          label: '所属分公司',
          model: 'grgsgs',
          type: 'select',
          dictOptions: []
        },
        { label: '是否批量导入', model: 'sfpldr' },
        { label: '台账标识', model: 'tzbs' },
        {
          label: '台账状态',
          model: 'tzzt',
          type: 'select',
          dictOptions: []
        },
        { label: '还款开始时间', model: 'startDt', type: 'date' },
        { label: '还款结束时间', model: 'endDt', type: 'date' },
        { label: '精准对账批次号', model: 'jzdzpch' },
        { label: '导入批次号', model: 'drpch' }
      ];
    },
    addFormList: function(params) {
      return [
        { label: '客户姓名', model: 'khxm', disabled: true },
        { label: '身份证号', model: 'sfzh', disabled: true },
        {
          label: '登记时间',
          model: 'djsj',
          type: 'date',
          disabled: this.isUpdate
        },
        { label: '代偿本金', model: 'dcbj', disabled: true },
        { label: '代偿利息', model: 'dclx', disabled: true },
        { label: '代偿罚息', model: 'dcfx', disabled: true },
        { label: '代偿复利', model: 'dcfl', disabled: true },
        { label: '代偿总金额', model: 'dczje', disabled: true },
        { label: '本次回收金额', model: 'bchsje', disabled: true },
        {
          label: '本次回收本金',
          model: 'bchsbj',
          disabled: this.isUpdate
        },
        {
          label: '本次回收利息',
          model: 'bchslx',
          disabled: this.isUpdate
        },
        {
          label: '本次回收罚息',
          model: 'bchsfx',
          disabled: this.isUpdate
        },
        {
          label: '本次回收复利',
          model: 'bchsfl',
          disabled: this.isUpdate
        },
        { label: '个人余额', model: 'grye', disabled: true },
        {
          label: '归属公司',
          model: 'grgsgs',
          dictOptions: this.$store.getters.dictData.check_company || [],
          disabled: true
        },
        {
          label: '业务部门应收',
          model: 'ywbmys',
          disabled: this.isUpdate
        },
        {
          label: '业务部门实收',
          model: 'ywbmss',
          disabled: this.isUpdate
        },
        {
          label: '预约还款时间',
          model: 'yysjhcsj',
          type: 'date',
          disabled: this.isUpdate
        },
        {
          label: '台账状态',
          model: 'tzzt',
          type: 'select',
          dictOptions:
            this.tzStatus == '1' || this.tzStatus == '9'
              ? this.updataStatus
              : this.$store.getters.dictData.Check_state,
          disabled:
            this.tzStatus == '1' || this.tzStatus == '9' ? this.isUpdate : true
        },
        {
          label: '对账批次号',
          model: 'jqdzpch',
          disabled:
            this.tzStatus == '1' || this.tzStatus == '9' ? this.isUpdate : true
        },
        {
          label: '台账标识',
          model: 'tzbs',
          type: 'select',
          disabled: true,
          dictOptions:
            this.$store.getters.dictData.Parameter_identification || []
        },
        {
          label: '备注',
          model: 'bz',
          inputType: 'textarea',
          disabled: this.isUpdate
        }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    // if (this.$route.query.lsid === '' || this.$route.query.lsid === undefined) {
    //   this.booleanShow = false;
    // } else {
    //   this.booleanShow = true;
    // }
    // 所属公司
    this.$getDicts('check_company').then(response => {
      this.companyOptions = response.data;
      this.formData.find(
        item => item.model === 'grgsgs'
      ).dictOptions = this.companyOptions;
      console.log(this.companyOptions);
    });
    // 台账状态
    this.$getDicts('Check_state').then(response => {
      this.statusOptions = response.data;
      this.formData.find(
        item => item.model === 'tzzt'
      ).dictOptions = this.statusOptions;
      console.log(this.companyOptions);
    });
    // 台账标识
    this.$getDicts('Parameter _identification').then(response => {
      this.identifyOptions = response.data;
    });
  },
  mounted() {},
  // life cycle end
  methods: {
    goAdd() {},
    clcikImport() {
      this.importDialog = true;
    },
    updataSubmit() {
      // const params = {
      //   id: this.id
      // };
      this.$refs.dataForm.validateFormFunc(msg => {
        if (msg) {
          this.addFormData.id = this.id;
          updateInfo(this.addFormData).then(response => {
            if (response.code === 200) {
              this.$message.success('修改成功!');
              this.openAddDialog = false;
              this.getList();
            }
          });
        }
      });
    },
    clickUpdata() {
      if (
        this.id == ' ' ||
        this.id == undefined ||
        this.selectRows.length == '0'
      ) {
        this.$message.warning('请选择一条记录');
      } else {
        this.addFormData = this.multipleSelection[0];
        this.openAddDialog = true;
        // this.$getDicts('Check_state').then(response => {
        //   this.statusOptions = response.data;
        //   this.addFormList.find(
        //     item => item.model === 'tzzt'
        //   ).dictOptions = this.statusOptions;

        //   console.log(this.statusOptions);
        // });

        console.log('this.multipleSelection', this.multipleSelection);
        console.log('this.addFormData', this.addFormData);
      }
    },
    clickDelete() {
      if (this.multipleSelection[0].tzzt == '1') {
        this.$confirm('确认删除当前选中的台账?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.multipleSelection.length <= 0) {
              this.$message.warning('请选择一条记录');
            } else {
              this.gqParams = {
                ids: this.ids
              };
              deleteTzdj(this.gqParams).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功');
                  this.getList();
                }
                console.log(response);
              });
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
      } else {
        this.$message({
          type: 'warning',
          message: '待确认状态才能删除!'
        });
      }
    },
    // 累加
    amount(...args) {
      return args.reduce((sum, number) => {
        // 非数字不相加
        number = Number(number);
        if (Number.isNaN(number)) return sum;
        return sum + number;
      }, 0);
    },
    // 失去焦点计算
    inputChange() {
      this.addFormData.dczje = this.amount(
        this.addFormData.dcbj,
        this.addFormData.dclx,
        this.addFormData.dcfx,
        this.addFormData.dcfl
      );
      this.addFormData.bchsje = this.amount(
        this.addFormData.bchsbj,
        this.addFormData.bchslx,
        this.addFormData.bchsfx,
        this.addFormData.bchsfl
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '导入';
      this.upload.open = true;
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
      this.$message.success('导入成功!');
      this.importDialog = false;
      // this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 所属公司
    companyFormat(row, column) {
      return this.$selectDictLabel(this.companyOptions, row.grgsgs);
    },
    // 台账状态
    statuFormat(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.tzzt);
    },
    // 台账标识
    identifyFormat(row, column) {
      return this.$selectDictLabel(this.identifyOptions, row.tzbs);
    },
    /** 导出按钮操作 */
    handleExport() {
      // const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有台账记录?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.exportLoading = true;
          return exportTemplate();
        })
        .then(response => {
          this.$download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => {});
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
      this.id = this.ids[0];
      this.tzStatus = this.multipleSelection[0].tzzt;
      console.log('his.tzStatus', this.tzStatus);
      if (
        this.tzStatus == '1' ||
        this.tzStatus == '9' ||
        this.tzStatus == '2' ||
        this.tzStatus == '4'
      ) {
        this.isUpdate = false;
      } else {
        this.isUpdate = true;
      }
      console.log('this.isUpdate ', this.isUpdate);
    },
    // 确认关联
    confirmRelation() {
      const paramsData = {
        ids: this.ids,
        lsid: this.$route.query.lsid
      };
      relataionApi(paramsData).then(response => {
        if (response.code === 200) {
          this.$message.success('银行流水关联台账成功!');
          this.getList();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
