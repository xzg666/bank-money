<!-- 销售人员管理页面 -->
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
      <el-form-item label="客户姓名" prop="khxm">
        <el-input
          v-model="queryParams.khxm"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号" prop="sfzh">
        <el-input
          v-model="queryParams.sfzh"
          placeholder="请输入身份证号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item style="padding-left:65px">
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
    </el-form>
    <div>
      <el-button
        size="mini"
        plain
        icon="el-icon-plus"
        type="primary"
        @click="registerFunc"
        >登记</el-button>
    </div>
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    <el-table
      v-loading="loading"
      :data="registerList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="客户姓名"
        width="180"
        align="center"
        prop="xingming"
      />
      <el-table-column
        label="证件号码"
        align="center"
        prop="zjhm"
        width="200"
      />
      <el-table-column
        label="代偿本金(元)"
        width="200"
        align="center"
        prop="bj"
      />
      <el-table-column
        label="代偿利息(元)"
        width="150"
        align="center"
        prop="lx"
      />
      <el-table-column
        label="代偿罚息(元)"
        width="120"
        align="center"
        prop="fx"
      />
      <el-table-column
        label="代偿复利(元)"
        align="center"
        prop="fl"
        width="150"
      />
      <el-table-column
        label="代偿总额(元)"
        width="120"
        align="center"
        prop="zje"
      />
      <el-table-column
        label="实收代偿本金金额(元)"
        align="center"
        prop="ssbjje"
        width="150"
      />
      <el-table-column
        label="实收代偿利息金额(元)"
        align="center"
        prop="sslxje"
        width="150"
      />
      <el-table-column
        label="实收代偿罚息金额(元)"
        align="center"
        prop="ssfxje"
        width="150"
      />
      <el-table-column
        label="实收代偿复利金额(元)"
        align="center"
        prop="ssflje"
        width="150"
      />
      <el-table-column
        label="本次代偿金额(元)"
        align="center"
        prop="dqjhhkje"
        width="150"
      />
      <el-table-column
        label="本次代偿金额本金(元)"
        align="center"
        prop="dqjhghbj"
        width="150"
      />
      <el-table-column
        label="本次代偿金额利息(元)"
        align="center"
        prop="dqjhghlx"
        width="150"
      />
      <el-table-column
        label="个人归属公司"
        align="center"
        prop="grgsgs"
        width="150"
        :formatter="companyFormat"
      />
      <el-table-column label="个人余额" align="center" prop="grye" />
      <el-table-column
        label="导入批次号"
        align="center"
        prop="drpch"
        width="150"
      />
      <!-- <el-table-column label="操作" fixed="right" align="center" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="clickLedger(scope.row.id)"
            >
              查看台账
            </el-button>
          </template>
        </el-table-column> -->
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

    <el-dialog :visible.sync="openAddDialog" width="90%" append-to-body>
      <data-form
        ref="dataForm"
        :form-list="addFormList"
        :form-data="addFormData"
        :rules-data="rulesForm"
        :is-block="isBlockBasic"
        @addSubmit="addSubmit"
        @inputChange="inputChange"
      ></data-form>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import DataForm from '@/components/DataForm';
import { IsCard } from '@/utils/validate';
import {
  queryList,
  addUpadataRegister,
  getRegisterData
} from '@/api/ledger/register';
export default {
  name: 'History',
  components: {
    DataForm
  },
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
      // 所属公司
      companyOptions: [],
      isBlockBasic: false,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        khxm: undefined,
        sfzh: undefined
      },
      openAddDialog: false,
      loading: true,
      selectRows: [],
      showSearch: true,
      statusOptions: [],
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
      // 查询数据
      registerList: [],
      multipleSelection: [],
      id: '',
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
    addFormList: function(params) {
      return [
        { label: '客户姓名', model: 'khxm' },
        { label: '身份证号', model: 'sfzh' },
        { label: '登记时间', model: 'djsj', type: 'date' },
        { label: '代偿本金', model: 'dcbj' },
        { label: '代偿利息', model: 'dclx' },
        { label: '代偿罚息', model: 'dcfx' },
        { label: '代偿复利', model: 'dcfl' },
        { label: '代偿总金额', model: 'dczje', disabled: true },
        { label: '本次回收金额', model: 'bchsje', disabled: true },
        { label: '本次回收本金', model: 'bchsbj' },
        { label: '本次回收利息', model: 'bchslx' },
        { label: '本次回收罚息', model: 'bchsfx' },
        { label: '本次回收复利', model: 'bchsfl' },
        { label: '个人余额', model: 'grye' },
        {
          label: '归属公司',
          model: 'grgsgs',
          type: 'select',
          dictOptions: this.$store.getters.dictData.check_company || []
        },
        { label: '业务部门应收', model: 'ywbmys' },
        { label: '业务部门实收', model: 'ywbmss' },
        { label: '预约还款时间', model: 'yysjhcsj', type: 'date' },
        {
          label: '台账状态',
          model: 'tzzt',
          type: 'select',
          dictOptions: [
            { dictValue: '9', dictLabel: '挂起' },
            { dictValue: '1', dictLabel: '待确认' }
          ]
        },
        { label: '对账批次号', model: 'jqdzpch' },
        {
          label: '台账标识',
          model: 'tzbs',
          type: 'select',
          dictOptions:
            this.$store.getters.dictData.Parameter_identification || []
        },
        { label: '备注', model: 'bz', inputType: 'textarea' }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    // this.$getDicts('Check_state').then(response => {
    //   this.statusOptions = response.data;
    //   this.addFormList.find(
    //     item => item.model === 'tzzt'
    //   ).dictOptions = this.statusOptions;
    //   console.log(this.statusOptions);
    // });
  },
  mounted() {
    this.getList();
    this.$getDicts('check_company').then(response => {
      this.companyOptions = response.data;
      this.formData.find(
        item => item.model === 'grgsgs'
      ).dictOptions = this.companyOptions;
      console.log(this.companyOptions);
    });
  },
  // life cycle end
  methods: {
    // 所属公司
    companyFormat(row, column) {
      return this.$selectDictLabel(this.companyOptions, row.grgsgs);
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
    // 确认登记按钮
    addSubmit() {
      // 新增
      this.$refs.dataForm.validateFormFunc(msg => {
        if (msg) {
          if (this.multipleSelection.length <= 0) {
            if (this.addFormData.khxm === undefined) {
              this.$message.warning('客户姓名不能为空!');
              console.log('客户姓名不能为空');
              return false;
            }
            if (this.addFormData.sfzh === undefined) {
              this.$message.warning('身份证号不能为空!');
              return false;
            }
            if (IsCard(this.addFormData.sfzh)) {
              addUpadataRegister(this.addFormData).then(response => {
                if (response.code === 200) {
                  this.$message.success('操作成功!');
                  this.openAddDialog = false;
                  this.getList();
                }
              });
            } else {
              this.$message.warning('请填写正确的身份证号!');
            }
          } else {
            // 修改
            console.log(this.addFormData);
            addUpadataRegister(this.addFormData).then(response => {
              console.log(this.addFormData);
              if (response.code === 200) {
                this.$message.success('操作成功!');
                this.openAddDialog = false;
                this.getList();
              }
            });
          }
        } else {
          this.$message.warning('请填写完整!');
        }
      });
      // 修改updateRegister
    },
    statusFormat(row, column) {
      return this.$selectDictLabel(this.statusOptions, row.status);
    },
    getList() {
      queryList(this.queryParams).then(response => {
        this.registerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    registerFunc() {
      // this.addFormData = {};
      // 新增
      if (this.multipleSelection.length <= 0) {
        this.addFormData = {};
        this.openAddDialog = true;
      } else {
        // 修改
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.id = this.multipleSelection[i].id;
        }
        getRegisterData(this.id).then(response => {
          this.addFormData.khxm = response.rows[0].xingming;
          this.addFormData.sfzh = response.rows[0].zjhm;
          // 登记时间
          // this.addFormData.djsj = response.rows[0].zjhm;
          // 代偿本金
          this.addFormData.dcbj = response.rows[0].bj;
          // 代偿利息
          this.addFormData.dclx = response.rows[0].lx;
          // 代偿罚息
          this.addFormData.dcfx = response.rows[0].fx;
          // 代偿复利
          this.addFormData.dcfl = response.rows[0].fl;
          // 代偿总金额
          this.addFormData.dczje = response.rows[0].zje;
          // 本次回收金额
          // this.addFormData.bchsje = response.rows[0].ssbjje;
          // 本次回收本金
          this.addFormData.bchsbj = response.rows[0].ssbjje;
          // 本次回收利息
          this.addFormData.bchslx = response.rows[0].sslxje;
          // 本次回收罚息
          this.addFormData.bchsfx = response.rows[0].ssfxje;
          // 本次回收复利
          this.addFormData.bchsfl = response.rows[0].ssflje;
          // 个人余额
          this.addFormData.grye = response.rows[0].dctqje;
          // 归属公司
          this.addFormData.grgsgs = response.rows[0].dkglb;
          console.log(this.addFormData);
          this.openAddDialog = true;
        });
      }
    },
    clickLedger() {},
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      if (this.queryParams.khxm == '') {
        delete this.queryParams.khxm;
      }
      if (this.queryParams.sfzh == '') {
        delete this.queryParams.sfzh;
      }
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$resetForm('queryForm');
      this.handleQuery();
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.id = val.map(item => item.id);
      // this.addFormData = {};
    }
  }
};
</script>

<style lang="scss" scoped></style>
