-
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :inline="false"
      :form-style="queryFormStyle"
    >
      <template slot="checked">
        <el-checkbox v-model="queryParams.isRelated" border>是否关联</el-checkbox>
      </template>
      <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px;margin-top:20px">
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
        <el-table-column align="center" label="客户姓名" prop="custName" />
        <el-table-column align="center" label="关系" prop="custRelationship" />
        <el-table-column align="center" label="证件编号" prop="certNo" width="170" />
        <el-table-column align="center" label="证件类型" prop="certType">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.cert_type || [] , scope.row.certType) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="身份证地址"
          prop="certAddress"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="客户姓名全拼"
          prop="custNameSpell"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="性别" prop="sex">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.sys_user_sex || [] , scope.row.sex) }}</template>
        </el-table-column>
        <el-table-column align="center" label="婚姻状况" prop="maritalStatus">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.marital_status || [] , scope.row.maritalStatus) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="职业"
          prop="occupation"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="毕业院校"
          prop="college"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="最高学历" prop="highestDegree">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.highest_degree || [] , scope.row.highestDegree) }}</template>
        </el-table-column>
        <el-table-column align="center" label="个人月收入" prop="personalMonthIncome" width="100">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.personal_income || [] , scope.row.personalMonthIncome) }}</template>
        </el-table-column>
        <el-table-column align="center" label="家庭月收入" prop="familyMonthIncome" width="100">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.home_income || [] , scope.row.familyMonthIncome) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单位名称"
          prop="workName"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="单位电话" prop="fixedTel" width="150" />
        <el-table-column align="center" label="手机号码" prop="phone" width="150" />
        <el-table-column align="center" label="单位手机号码" prop="workTel" width="150" />
        <el-table-column align="center" label="实际电话" prop="actualTel" width="150" />
        <el-table-column
          align="center"
          label="实际地址"
          prop="actualAddress"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickEdit(scope.row)">编辑 |</el-button>
            <el-button type="text" size="small" @click="clickDel(scope.row)">删除 |</el-button>
            <el-button type="text" size="small" @click="clickContacts(scope.row)">联系人维护 |</el-button>
            <el-button type="text" size="small" @click="clickAddress(scope.row)">地址维护</el-button>
          </template>
        </el-table-column>
      </template>
    </query-table>
    <!-- 添加用户信息对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="openAddDialog"
      width="90%"
      append-to-body
      style="height:95%; overflow:auto"
    >
      <component
        :is="currentComponent"
        :form-list="dialogFormList"
        :form-data="dialogFormData"
        :form-style="simpleFormStyle"
        :cert-no="selectRows.certNo"
        :cust-id="selectRows.id"
        @realtionClose="openAddDialog = false"
        @realtionSuccess="realtionSuccess"
        @cancelAddressSelect="openAddDialog=false"
        @AddressSelectSuccess="AddressSelectSuccess"
      >
        <template slot="operate">
          <el-row type="flex" justify="center">
            <el-button type="success" size="small" @click="save">保存</el-button>
            <el-button type="primary" size="small" @click="openAddDialog = false">取消</el-button>
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
import AddressSelect from '@/components/AddressSelect';
import RelationshipSelect from '@/components/RelationshipSelect';
import { customInformationApi } from '@/api/customInformation'
import { commonApi } from '@/api/common'
export default {
  name: 'CustonInformation',
  components: {
    QueryTable,
    SimpleForm,
    FreeForm,
    AddressSelect,
    RelationshipSelect
  },
  data() {
    return {
      showSearch: true,
      // 当前渲染组件
      currentComponent: 'SimpleForm',
      // 当前弹出框内容
      currentDialogType: 'userInfo',
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      // 弹出框表单样式
      simpleFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      dialogTitle: '新增客户',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        custName: undefined,
        phone: undefined,
        certNo: undefined,
        isRelated: false
      },
      formData: [
        { label: '客户名称', model: 'custName' },
        { label: '证件号码', model: 'certNo' },
        { label: '手机号码', model: 'phone' },
        { label: '', model: 'sfgl', type: 'checked', name: '是否关联' }
      ],
      dialogFormData: {
        custName: '',
        certNo: '',
        certType: '',
        custNameSpell: '',
        sex: '',
        maritalStatus: '',
        occupation: '',
        college: '',
        highestDegree: '',
        personalMonthIncome: '',
        familyMonthIncome: '',
        phone: '',
        workTel: '',
        actualTel: '',
        actualAddress: ''
      },

      getData: customInformationApi.getCustomInfoList,
      statusOptions: [],
      provinceOptions: [],
      // 遮罩层
      loading: false,
      // 表格数据
      roleList: [],
      // 总条数
      total: 0,
      // 弹出框名称
      title: '催收逾期任务导入',
      // 是否显示弹出层
      openDataScope: false,
      // 添加代办对话框
      openAddDialog: false,
      // 地址维护对话框
      addressDialog: false,
      // 自动关联
      autoRelation: false,
      // 联系人维护贺地址维护传入custId
      custId: '',
      selectRows: {}
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    formList() {
      switch (this.currentComponent) {
        case 'SimpleForm':
          return [
            { label: '客户姓名', model: 'custName' },
            { label: '证件编号', model: 'certNo' },
            { label: '证件类型', model: 'certType', type: 'select', dictOptions: this.$store.getters.dictData.cert_type || [] },
            { label: '身份证地址', model: 'certAddress' },
            { label: '姓名全拼', model: 'custNameSpell' },
            { label: '性别', model: 'sex', type: 'select' },
            { label: '婚姻状况', model: 'maritalStatus', type: 'select' },
            { label: '职业', model: 'occupation' },
            { label: '毕业院校', model: 'college' },
            { label: '最高学历', model: 'highestDegree', type: 'select' },
            { label: '个人月收入', model: 'personalMonthIncome' },
            { label: '家庭月收入', model: 'familyMonthIncome' },
            { label: '单位名称', model: 'workName' },
            { label: '单位电话', model: 'fixedTel' },
            { label: '手机号码', model: 'phone' },
            { label: '单位手机号码', model: 'workTel' },
            { label: '实际电话', model: 'actualTel' },
            { label: '实际地址', model: 'actualAddress', inputType: 'textarea', span: 24 }
          ];
        case 'FreeForm':
          return [

          ]
      }
    },
    dialogFormList() {
      switch (this.currentDialogType) {
        case 'userInfoAdd':
          return [
            { label: '客户姓名', model: 'custName' },
            { label: '证件编号', model: 'certNo' },
            { label: '证件类型', model: 'certType', type: 'select', dictOptions: this.$store.getters.dictData.cert_type || [] },
            { label: '身份证地址', model: 'certAddress' },
            { label: '姓名全拼', model: 'custNameSpell' },
            { label: '性别', model: 'sex', type: 'select', dictOptions: this.$store.getters.dictData.sys_user_sex || [] },
            { label: '婚姻状况', model: 'maritalStatus', type: 'select', dictOptions: this.$store.getters.dictData.marital_status || [] },
            { label: '职业', model: 'occupation' },
            { label: '毕业院校', model: 'college' },
            { label: '最高学历', model: 'highestDegree', type: 'select', dictOptions: this.$store.getters.dictData.highest_degree || [] },
            { label: '个人月收入', model: 'personalMonthIncome', type: 'select', dictOptions: this.$store.getters.dictData.personal_income || [] },
            { label: '家庭月收入', model: 'familyMonthIncome', type: 'select', dictOptions: this.$store.getters.dictData.home_income || [] },
            { label: '单位名称', model: 'workName' },
            { label: '单位电话', model: 'fixedTel' },
            { label: '手机号码', model: 'phone' },
            { label: '单位手机号码', model: 'workTel' },
            { label: '实际电话', model: 'actualTel' },
            { label: '实际地址', model: 'actualAddress', inputType: 'textarea', span: 24 }
          ];
        case 'userInfoEdit':
          return [
            { label: '客户姓名', model: 'custName' },
            { label: '证件编号', model: 'certNo' },
            { label: '证件类型', model: 'certType', type: 'select', dictOptions: this.$store.getters.dictData.cert_type || [] },
            { label: '身份证地址', model: 'certAddress' },
            { label: '姓名全拼', model: 'custNameSpell' },
            { label: '性别', model: 'sex', type: 'select', dictOptions: this.$store.getters.dictData.sys_user_sex || [] },
            { label: '婚姻状况', model: 'maritalStatus', type: 'select', dictOptions: this.$store.getters.dictData.marital_status || [] },
            { label: '职业', model: 'occupation' },
            { label: '毕业院校', model: 'college' },
            { label: '最高学历', model: 'highestDegree', type: 'select', dictOptions: this.$store.getters.dictData.highest_degree || [] },
            { label: '个人月收入', model: 'personalMonthIncome', type: 'select', dictOptions: this.$store.getters.dictData.personal_income || [] },
            { label: '家庭月收入', model: 'familyMonthIncome', type: 'select', dictOptions: this.$store.getters.dictData.home_income || [] },
            { label: '单位名称', model: 'workName' },
            { label: '单位电话', model: 'fixedTel' },
            { label: '手机号码', model: 'phone' },
            { label: '单位手机号码', model: 'workTel' },
            { label: '实际电话', model: 'actualTel' },
            { label: '实际地址', model: 'actualAddress', inputType: 'textarea', span: 24 }
          ];
        case 'contacts':
          return [
            { label: '关系', model: 'custRelationship' },
            { label: '联系方式', model: 'tel' },
            { label: '备注', model: 'remark' }
          ];
        case 'address':
          return [
            { label: '关系', model: 'custRelationship' },
            { label: '省', model: 'province', type: 'select', dictOptions: this.provinceOptions },
            { label: '市', model: 'city', type: 'select' },
            { label: '区/县', model: 'area' },
            { label: '备注', model: 'remark' }
          ];
        default:
          return []
      }
    },
    certTypeOptions() {
      return this.$store.getters.dictData.cert_type || []
    }
  },
  created() {
    // this.getList();
    this.$getDicts('sys_normal_disable').then((response) => {
      this.statusOptions = response.data;
    });
    commonApi.getProvince().then(res => {
      if (res.code === 200) {
        res.data.map(item => {
          item.dictLabel = item.provinceName
          item.dictValue = item.provinceId
        })
        this.provinceOptions = res.data
      }
    })
  },
  methods: {
    handleQuery() { },
    resetQuery() { },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.roleId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 查询数据列表 */
    getList() {
      this.loading = true;
      this.loading = false;
    },
    // 点击逾期导入
    clickOverdue() {
      this.openDataScope = true;
    },
    // 新增用户
    clickAdd() {
      // 清空数据
      this.dialogFormData = {
        name: '',
        certNo: '',
        certType: '',
        custNameSpell: '',
        sex: '',
        maritalStatus: '',
        occupation: '',
        college: '',
        highestDegree: '',
        personalMonthIncome: '',
        familyMonthIncome: '',
        phone: '',
        workTel: '',
        actualTel: '',
        actualAddress: ''
      }
      this.dialogTitle = '新增客户'
      this.currentComponent = 'SimpleForm'
      this.restFormInformation('userInfoAdd')
      this.openAddDialog = true
    },
    // 编辑联系人
    clickEdit(row) {
      this.dialogTitle = '编辑客户'
      this.currentComponent = 'SimpleForm'
      this.restFormInformation('userInfoEdit')
      this.dialogFormData = Object.assign({}, row)
      this.openAddDialog = true
    },
    // 删除客户信息
    clickDel(row) {
      this.$confirm(`确定删除此条数据?`, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        customInformationApi.deleteCustomInfo(row.id).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    // 维护联系人
    clickContacts(row) {
      this.dialogTitle = '维护联系人'
      this.selectRows = row
      // this.currentComponent = 'FreeForm'
      this.currentComponent = 'RelationshipSelect'
      this.restFormInformation('contacts', row)
      this.openAddDialog = true
      this.custId = row.id // 传入custId 做更新
    },
    // 联系人弹出框关闭
    realtionSuccess() {
      this.$refs.queryTable.getList()
      this.openAddDialog = false
    },
    AddressSelectSuccess() {
      this.$refs.queryTable.getList()
      this.openAddDialog = false
    },
    // 地址维护
    clickAddress(row) {
      this.dialogTitle = '地址维护'
      this.currentComponent = 'AddressSelect'
      this.restFormInformation('address', row)
      this.openAddDialog = true
      // this.addressDialog = true
      this.custId = row.id // 传入custId 做更新
    },
    // 重置表单内容
    restFormInformation(type, row) {
      this.currentDialogType = type
      // 如果是用户新增或者编辑
      if (type === 'userInfo') {
        this.dialogFormData = {
          name: '',
          certNo: '',
          certType: '',
          custNameSpell: '',
          sex: '',
          maritalStatus: '',
          occupation: '',
          college: '',
          highestDegree: '',
          personalMonthIncome: '',
          familyMonthIncome: '',
          phone: '',
          workTel: '',
          actualTel: '',
          actualAddress: ''
        }
      } else if (type === 'contacts') {
        // 维护联系人,动态表单需要传数组
        this.dialogFormData = [
          {
            certNo: row.certNo,
            custRelationship: '',
            tel: '',
            remark: ''
          }
        ]
        customInformationApi.getCustonContactsInfoByCertNo(row.certNo).then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              res.data.map(item => {
                delete item.params
              })
              this.dialogFormData = res.data
            }
          }
        })
      } else if (type === 'address') {
        // 地址维护  动态表单需要传数组
        this.dialogFormData = [
          {
            certNo: row.certNo,
            custRelationship: '',
            provinceId: '',
            cityId: '',
            districtId: '',
            address: '',
            remark: ''
          }
        ]
        customInformationApi.getAddressInfoByCertNo(row.certNo).then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              res.data.map(item => {
                delete item.params
              })
              this.dialogFormData = res.data
            }
          }
        })
      }
    },
    save() {
      if (this.currentDialogType === 'userInfoAdd') {
        if (this.dialogFormData.certNo === null || this.dialogFormData.certNo === '') {
          this.$msgError('请输入证件号')
          return
        }
        if (this.dialogFormData.phone === null || this.dialogFormData.phone === '') {
          this.$msgError('请输入手机号')
          return
        }
        customInformationApi.addCustomInfo(this.dialogFormData).then(res => {
          if (res.code === 200) {
            this.openAddDialog = false
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      } else if (this.currentDialogType === 'userInfoEdit') {
        customInformationApi.editCustomInfo(this.dialogFormData).then(res => {
          if (res.code === 200) {
            this.openAddDialog = false
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      } else if (this.currentDialogType === 'contacts') {
        if (this.dialogFormData.length > 10) {
          this.$msgError('最多维护10个联系人')
          return
        }
        customInformationApi.updateContacts(this.dialogFormData).then(res => {
          if (res.code === 200) {
            customInformationApi.editCustomInfo({ actualTel: this.dialogFormData.find(info => info.isDefault === '1').tel, id: this.custId }).then(res => { })
            this.openAddDialog = false
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      } else if (this.currentDialogType === 'address') {
        const array = this.dialogFormData
        if (array.length > 10) {
          this.$msgError('最多维护10个地址')
          return
        }
        var find = array.filter(item => item.custRelationship === '中心预留地址');
        if (find.length > 1) {
          this.$msgError('不可维护其他中心预留地址')
          return
        }
        for (let i = 0; i < array.length; i++) {
          if (array[i].custRelationship === '中心预留地址') {
            continue
          }
          if (array[i].custRelationship === '') {
            this.$msgError('请输入关系')
            return
          }
          if (array[i].provinceId === '') {
            this.$msgError('请选择省')
            return
          }
          if (array[i].cityId === '') {
            this.$msgError('请选择市')
            return
          }
          if (array[i].districtId === '') {
            this.$msgError('请选择区县')
            return
          }
          if (array[i].address === '') {
            this.$msgError('请输入地址')
            return
          }
        }
        customInformationApi.updateAddress(this.dialogFormData).then(res => {
          if (res.code === 200) {
            customInformationApi.editActualAddress(this.dialogFormData.find(info => info.isDefault === '1')).then(res => {
              if (res.code === 200) {
                this.openAddDialog = false
                this.$msgSuccess(res.msg)
                this.$refs.queryTable.getList()
              }
            })
          }
        })
      }
    }
  }
};
</script>

<style>
</style>
