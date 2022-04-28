<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      :inline="false"
      pagination
      @selection-change="handleSelectionChange"
    >
      <template slot="operating">
        <el-button
size="mini"
plain
type="primary"
@click="handleAdd"
>新增</el-button>
        <el-button
size="mini"
plain
type="primary"
@click="handleEdit"
>修改</el-button>
        <el-button
size="mini"
plain
type="primary"
@click="handleDel"
>删除</el-button>
      </template>
      <template slot="table">
        <!-- <el-table-column label="规则类型Id" prop="ruleTypeId" /> -->
        <el-table-column label="条目类型名称" prop="entryTypeName" />
        <el-table-column label="规则类型名称" prop="ruleTypeName" />
        <el-table-column label="排序号" prop="entryTypeOrder" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="备注" prop="remark" />
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>

    <!--新增，修改-->
    <div>
      <el-dialog :title="titleType" :visible.sync="dialogFormVisible">
        <el-form
          ref="ruleForm"
          :model="addForm"
          :rules="rules"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="条目类型" prop="ruleTypeId">
            <!-- <el-input
              v-model="addForm.entryTypeName"
              placeholder="请输入"
              autocomplete="off"
            ></el-input> -->
            <el-cascader
              ref="myCascader"
              v-model="addForm.ruleTypeId"
              :options="bussniseeOptions"
              :props="optionProps"
              @change="handleChangeBussiness"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="条目名称" prop="entryTypeName">
            <el-input
              v-model="addForm.entryTypeName"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="entryTypeOrder">
            <el-input
              v-model="addForm.entryTypeOrder"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
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
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  itemListApi,
  addItemList,
  queryItems,
  delItems,
  getBussinessSelect
} from '@/api/governmentPurchaser/rules';
export default {
  name: 'ItemList',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      isTable: false,

      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      formData: [{ label: '条目类型名称', model: 'entryTypeName' }],
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      getData: itemListApi,
      optionProps: {
        value: 'value',
        label: 'lable'
      },
      dialogVisible: true,
      dialogFormVisible: false,
      titleType: '',
      addForm: {},
      rules: {
        entryTypeName: [{ required: true, message: '请输入', trigger: 'blur' }],
        ruleTypeId: [{ required: true, message: '请选择', trigger: 'change' }],
        entryTypeOrder: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      entryTypeId: '',
      ruleTypeId: '',
      selectRows: [],
      multipleSelection: [],
      businessData: '',
      nodeName: '',
      nodeBussinessId: '',
      bussniseeOptions: []
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
    console.log('  this.addForm ', this.addForm);
    this.getBussinessSelectData();
  },
  // life cycle end
  methods: {
    getBussinessSelectData() {
      getBussinessSelect().then(res => {
        this.bussniseeOptions = res.data[0].children;
      });
    },
    // 新增
    handleAdd() {
      this.titleType = '新增';
      this.dialogFormVisible = true;
      this.addForm = {};
    },
    handleChangeBussiness(value) {
      console.log('handleChangeBussiness', value);
      if (value != undefined) {
        const nodeName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels;
        this.nodeName = nodeName[nodeName.length - 1];
        if (value.length) {
          this.nodeBussinessId = value[value.length - 1];
        } else {
          this.nodeBussinessId = value;
        }

        console.log('nodeName', this.nodeName);
        console.log(' this.nodeBussinessId', this.nodeBussinessId);
      }
    },
    // 删除
    handleDel() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择数据!');
        return;
      } else {
        this.$confirm('确定删除该条目吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const params = {
              entryTypeId: this.entryTypeId
            };
            const result = await delItems(params);
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
    // 修改
    handleEdit() {
      this.titleType = '修改';
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择数据!');
        return;
      } else {
        this.dialogFormVisible = true;
        const params = {
          entryTypeId: this.entryTypeId
        };
        queryItems(params).then(res => {
          this.addForm = res.data;
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        if (this.titleType == '新增') {
          this.addForm.ruleTypeId = this.nodeBussinessId;
          addItemList(this.addForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功!');
              this.$refs.queryTable.getList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          this.addForm.ruleTypeId =
            this.nodeBussinessId || this.addForm.ruleTypeId;
          this.addForm.entryTypeId = this.entryTypeId;
          addItemList(this.addForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功!');
              this.$refs.queryTable.getList();
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    chooseBussiness() {
      this.isTable = true;
      this.dialogVisible = false;
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
      const entryTypeIdArr = val.map(item => item.entryTypeId);
      this.entryTypeId = entryTypeIdArr[0];
      const ruleTypeIdArr = val.map(item => item.ruleTypeId);
      this.ruleTypeId = ruleTypeIdArr[0];
    },
    addFunc() {}
  }
};
</script>

<style lang="scss" scoped></style>
