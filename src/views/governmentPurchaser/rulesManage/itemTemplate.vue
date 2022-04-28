<template>
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
@click="handleDetails"
>查看</el-button>
        <el-button
size="mini"
plain
type="primary"
@click="handleDel"
>删除</el-button>
      </template>
      <template slot="table">
        <el-table-column label="条目编码" prop="entryCode" />
        <el-table-column label="条目内容" prop="entryDesc" />
        <el-table-column label="条目名称" prop="entryName" />
        <el-table-column label="条目类型名称" prop="entryTypeName" />
        <el-table-column label="规则类型名称" prop="ruleTypeName" width="170" />
        <el-table-column label="展示类型" prop="entryShowType">
          <template slot-scope="scope">
            <span v-if="scope.row.entryShowType == '1'">普通条目</span>
            <span v-if="scope.row.entryShowType == '2'">测算条目</span>
          </template>
        </el-table-column>
        <el-table-column label="排序号" prop="entryOrder" />
        <el-table-column label="是否有效" prop="entryShowType">
          <template slot-scope="scope">
            <span v-if="scope.row.entryShowType == '0'">无效</span>
            <span v-if="scope.row.entryShowType == '1'">有效</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180" />
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
          :model="ruleForm"
          :rules="rules"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="条目编码" prop="entryCode">
            <el-input
              v-model="ruleForm.entryCode"
              placeholder="请输入"
              autocomplete="off"
              :disabled="!isFlag"
            ></el-input>
          </el-form-item>
          <el-form-item label="条目名称" prop="entryName">
            <el-input
              v-model="ruleForm.entryName"
              placeholder="请输入"
              autocomplete="off"
              :disabled="!isFlag"
            ></el-input>
          </el-form-item>
          <el-form-item label="条目类型" prop="entryTypeId">
            <el-select
              v-model="ruleForm.entryTypeId"
              placeholder="请选择"
              @change="changeType"
            >
              <el-option
                v-for="item in itemOptions"
                :key="item.entryTypeId"
                :label="item.entryTypeName"
                :value="item.entryTypeId"
                :disabled="!isFlag"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条目内容" prop="entryDesc">
            <el-input
              v-model="ruleForm.entryDesc"
              type="textarea"
              placeholder="请输入"
              autocomplete="off"
              :disabled="!isFlag"
              @change="itemContent"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="条目名称" prop="entryName">
            <el-input
              v-model="ruleForm.entryName"
              placeholder="请输入"
              autocomplete="off"
              :disabled="!isFlag"
            ></el-input>
          </el-form-item> -->

          <el-form-item label="展示类型" prop="entryShowType">
            <el-select v-model="ruleForm.entryShowType" placeholder="请选择">
              <el-option
                v-for="item in entryShowTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="!isFlag"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序号" prop="entryOrder">
            <el-input
              v-model="ruleForm.entryOrder"
              placeholder="请输入"
              autocomplete="off"
              :disabled="!isFlag"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="entryIsUse">
            <el-radio-group v-model="ruleForm.entryIsUse" :disabled="!isFlag">
              <el-radio :label="'0'">无效</el-radio>
              <el-radio :label="'1'">有效</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="变量英文" prop="variableEngName">
                  <el-input
                    v-model="ruleForm.variableEngName"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="变量中文名" prop="variableChName">
                  <el-input
                    v-model="ruleForm.variableChName"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="变量描述" prop="variableDesc">
                  <el-input
                    v-model="ruleForm.variableDesc"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序号" prop="variableOrder">
                  <el-input
                    v-model="ruleForm.variableOrder"
                    placeholder="请输入"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div> -->
          <div
            v-for="(domain, index) in ruleForm.tdRuleEntryVariableList"
            :key="index"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="变量英文"
                  :prop="
                    'tdRuleEntryVariableList.' + index + '.variableEngName'
                  "
                  :rules="{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                  }"
                >
                  <el-input
                    v-model="domain.variableEngName"
                    placeholder="请输入"
                    autocomplete="off"
                    readonly
                    :disabled="!isFlag"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="变量中文名"
                  :prop="'tdRuleEntryVariableList.' + index + '.variableChName'"
                  :rules="{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                  }"
                >
                  <el-input
                    v-model="domain.variableChName"
                    placeholder="请输入"
                    autocomplete="off"
                    :disabled="!isFlag"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="变量描述"
                  :prop="'tdRuleEntryVariableList.' + index + '.variableDesc'"
                  :rules="{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                  }"
                >
                  <el-input
                    v-model="domain.variableDesc"
                    placeholder="请输入"
                    autocomplete="off"
                    :disabled="!isFlag"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row> </el-row>
            <el-row :gutter="50" style="display:none">
              <el-col :span="12">
                <el-form-item label="排序号">
                  <el-input
                    v-model="index"
                    placeholder="请输入"
                    autocomplete="off"
                    :disabled="!isFlag"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-button
                  type="danger"
                  size="mini"
                  :disabled="!isFlag"
                  @click.prevent="removeDomain(domain, index)"
                  >删除</el-button>
              </el-col> -->
            </el-row>
          </div>
          <!-- <div style="margin-left:50px">
            <el-button
              size="mini"
              type="success"
              :disabled="!isFlag"
              @click.prevent="addDomain()"
              >添加</el-button>
          </div> -->
        </el-form>
        <div v-if="isFlag" slot="footer" class="dialog-footer">
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
  rulesListApi,
  rulesAddUpdataApi,
  queryRulesTemplate,
  delRulesTemplate,
  itemListApi
} from '@/api/governmentPurchaser/rules';
export default {
  name: 'ItemTemplate',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    const idStringReg = (rule, value, callback) => {
      if (this.ruleForm.entryDesc) {
        const reg = /(?<={)[^0-9]*?(?=})/g;
        if (this.ruleForm.entryDesc.match(reg)) {
          return callback();
        } else {
          return callback(new Error('请输入字符模板！'));
        }
      } else {
        return callback(new Error('请输入字符模板！'));
      }
    };
    return {
      rules: {
        entryCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        ruleTypeName: [{ required: true, message: '请输入', trigger: 'blur' }],
        entryTypeId: [{ required: true, message: '请选择', trigger: 'change' }],
        entryDesc: [
          { required: true, validator: idStringReg, trigger: 'blur' }
        ],
        entryShowType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        // entryOrder: [{ required: true, message: '请输入', trigger: 'blur' }],
        entryIsUse: [{ required: true, message: '请选择', trigger: 'change' }]
        // variableEngName: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        // variableChName: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        // variableDesc: [{ required: true, message: '请输入', trigger: 'blur' }],
        // variableOrder: [{ required: true, message: '请输入', trigger: 'blur' }]
      },

      isTable: false,
      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      formData: [
        { label: '条目名称', model: 'entryName' },
        {
          label: '展示类型',
          model: 'entryShowType',
          type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '普通条目' },
            { dictValue: '2', dictLabel: '测算条目' }
          ]
        }
      ],
      queryParams: {
        customName: null,
        IDNumber: null
      },
      selectRows: [],
      multipleSelection: [],
      getData: rulesListApi,
      dialogVisible: true,
      titleType: '',
      dialogFormVisible: false,
      isAdd: false,
      entryShowTypeArr: [
        {
          value: '1',
          label: '普通条目'
        },
        {
          value: '2',
          label: '测算条目'
        }
      ],
      ruleForm: {
        tdRuleEntryVariableList: [
          {
            variableEngName: '',
            variableChName: '',
            variableDesc: '',
            variableOrder: ''
          }
        ],
        entryIsUse: '1',
        entryDesc: ''
      },
      entryTemplateId: '',
      entryTypeId: '',
      isFlag: false,
      itemOptions: [],
      descArr: []
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
    this.getItemSelect();
  },
  // life cycle end
  methods: {
    getItemSelect() {
      itemListApi().then(res => {
        this.itemOptions = res.rows;
      });
    },
    itemContent() {
      var patt = new RegExp(/(?<={)[^0-9]*?(?=})/g);
      var result;

      const reg = /(?<={)[^0-9]*?(?=})/g;
      this.descArr = this.ruleForm.entryDesc.match(reg);
      this.ruleForm.tdRuleEntryVariableList = [];
      for (let i = 0; i < this.descArr.length; i++) {
        this.ruleForm.tdRuleEntryVariableList.push({
          variableEngName: this.descArr[i],
          variableOrder: i
        });

        // if (
        //   this.ruleForm.tdRuleEntryVariableList.length == this.descArr.length
        // ) {
        //   this.ruleForm.tdRuleEntryVariableList.push({
        //     variableEngName: this.descArr[i]
        //   });
        // }
      }
      // this.ruleForm.tdRuleEntryVariableList.this.descArr
    },
    changeType(val) {
      let obj = {};
      obj = this.itemOptions.find(item => {
        return item.entryTypeId === val;
      });
      this.ruleForm.entryTypeName = obj.entryTypeName;
      this.ruleForm.entryTypeId = obj.entryTypeId;
      console.log('this.ruleForm.entryName', this.ruleForm.entryName);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }

        if (this.ruleForm.tdRuleEntryVariableList[0].variableDesc == '') {
          this.ruleForm.tdRuleEntryVariableList.splice(0, 1);
          this.ruleForm.tdRuleEntryVariableList.push({
            variableEngName: this.ruleForm.variableEngName,
            variableChName: this.ruleForm.variableChName,
            variableDesc: this.ruleForm.variableDesc,
            variableOrder: this.ruleForm.variableOrder
          });
        }
        delete this.ruleForm.variableEngName;
        delete this.ruleForm.variableChName;
        delete this.ruleForm.variableDesc;
        delete this.ruleForm.variableOrder;
        delete this.ruleForm.entryTemplateId;
        if (this.titleType == '新增') {
          rulesAddUpdataApi(this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功!');
              this.$refs.queryTable.getList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          // this.ruleForm.entryTypeId = this.entryTypeId;
          this.ruleForm.entryTemplateId = this.entryTemplateId;
          rulesAddUpdataApi(this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功!');
              this.$refs.queryTable.getList();
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    removeDomain(item, order) {
      if (order != 0) {
        var index = this.ruleForm.tdRuleEntryVariableList.indexOf(item);
        if (index !== -1) {
          this.ruleForm.tdRuleEntryVariableList.splice(index, 1);
        }
      } else {
        this.$message.warning('至少保留一项!');
      }
    },
    addDomain() {
      this.ruleForm.tdRuleEntryVariableList.push({
        variableEngName: this.ruleForm.variableEngName,
        variableChName: this.ruleForm.variableChName,
        variableDesc: this.ruleForm.variableDesc,
        variableOrder: this.ruleForm.variableOrder,
        entryTemplateId: this.ruleForm.entryTemplateId
      });
    },
    handleDetails() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择数据!');
        return;
      } else {
        this.titleType = '查看';
        this.isFlag = false;
        this.dialogFormVisible = true;
        const params = {
          entryTemplateId: this.entryTemplateId
        };
        queryRulesTemplate(params).then(res => {
          this.ruleForm = res.data;
        });
      }
    },
    // 修改
    handleEdit() {
      this.titleType = '修改';
      this.isFlag = true;
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择数据!');
        return;
      } else {
        this.dialogFormVisible = true;
        const params = {
          entryTemplateId: this.entryTemplateId
        };
        queryRulesTemplate(params).then(res => {
          this.ruleForm = res.data;
        });
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
              entryTemplateId: this.entryTemplateId
            };
            const result = await delRulesTemplate(params);
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
    // 新增
    handleAdd() {
      this.titleType = '新增';
      this.dialogFormVisible = true;
      this.isFlag = true;
      this.ruleForm = {
        tdRuleEntryVariableList: [
          {
            variableEngName: '',
            variableChName: '',
            variableDesc: '',
            variableOrder: ''
          }
        ],
        entryIsUse: '1'
      };
    },
    chooseBussiness() {
      this.isTable = true;
      this.dialogVisible = false;
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
      const entryTemplateIdArr = val.map(item => item.entryTemplateId);
      this.entryTemplateId = entryTemplateIdArr[0];
      const entryTypeIdArr = val.map(item => item.entryTypeId);
      this.entryTypeId = entryTypeIdArr[0];
    }
  }
};
</script>

<style lang="scss" scoped></style>
