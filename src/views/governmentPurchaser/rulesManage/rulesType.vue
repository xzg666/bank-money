<template>
  <div class="app-container">
    <div class="rules-type">
      <!-- <el-input v-model="filterText" placeholder="输入关键字进行过滤"> -->
      </el-input>
      <div style="margin-top:20px">
        <el-tree
          ref="tree"
          :data="treeData"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="custom-tree-span">
              <el-button
                type="text"
                size="mini"
                @click="() => appendTree(data)"
              >
                新增
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => editTree(node, data)"
              >
                修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => removeTree(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
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
          <el-form-item label="类型编号" prop="ruleTypeCode">
            <el-input
              v-model="ruleForm.ruleTypeCode"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型名称" prop="ruleTypeName">
            <el-input
              v-model="ruleForm.ruleTypeName"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型描述" prop="ruleTypeRemake">
            <el-input
              v-model="ruleForm.ruleTypeRemake"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="ruleTypeOrder">
            <el-input
              v-model="ruleForm.ruleTypeOrder"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div v-show="flag" slot="footer" class="dialog-footer">
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
// 规则管理
import {
  rulesTypeTree,
  addRules,
  queryRules,
  delRules
} from '@/api/governmentPurchaser/rules';

export default {
  name: 'RulesType',
  data() {
    return {
      filterText: '',
      treeData: [],
      ruleForm: {},
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      rules: {
        ruleTypeCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        ruleTypeName: [{ required: true, message: '请输入', trigger: 'blur' }],
        ruleTypeRemake: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        ruleTypeOrder: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'ruleTypeName'
      },
      flag: true,
      titleType: '',
      dialogFormVisible: false,
      ruleTypeParentId: '',
      // 主键id
      ruleTypeId: ''
    };
  },
  computed: {
    multiple() {
      return this.selectRows.length === 0;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  // life cycle start
  created() {},

  mounted() {
    this.getTree();
  },
  // life cycle end
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return;
        }
        let data = null;
        // 不传主键id是新增，传主键id是修改
   
        if (this.titleType == '新增') {
               this.ruleForm.ruleTypeParentId = this.ruleTypeId;
          data = await addRules(this.ruleForm);
          if (data.code == '200') {
            this.$message.success('操作成功!');
            this.dialogFormVisible = false;
            this.getTree();
          }
        } else {
          this.ruleForm.ruleTypeId = this.ruleTypeId;
          data = await addRules(this.ruleForm);
          if (data.code == '200') {
            this.$message.success('操作成功!');
            this.dialogFormVisible = false;
            this.getTree();
          }
        }
      });
    },
    // 新增
    appendTree(data) {
        
      this.ruleForm = {};
      this.titleType = '新增';
      this.dialogFormVisible = true;
      // 父id
      this.ruleTypeParentId = data.ruleTypeParentId;
      // 主键id
      this.ruleTypeId = data.ruleTypeId;
    },
    async editTree(data) {
      this.titleType = '修改';
      this.dialogFormVisible = true;
      // 父id
      this.ruleTypeParentId = data.data.ruleTypeParentId;
      // 主键id
      this.ruleTypeId = data.data.ruleTypeId;
      const params = {
        ruleTypeId: this.ruleTypeId
      };
      const queraData = await queryRules(params);
      this.ruleForm = queraData.data;
      console.log('queraData', queraData);
    },
    async removeTree(data) {
      // 主键id
      this.ruleTypeId = data.data.ruleTypeId;

      this.$confirm('确定删除该类别吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            ruleTypeId: this.ruleTypeId
          };
          const result = await delRules(params);
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTree();
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 获取树形列表
    getTree() {
      rulesTypeTree().then(res => {
        this.treeData = res.rows;
      });
    },
    chooseBussiness() {
      this.isTable = true;
      this.dialogVisible = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.rules-type {
  width: 80%;
  .custom-tree-node {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .custom-tree-span {
    float: right;
  }
}
</style>
