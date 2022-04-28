<template>
  <div>
    <el-row>
      <el-tree
        ref="tree"
        :data="deptOptions"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        default-expand-all
        show-checkbox
        check-on-click-node
        @node-click="handleNodeClick"
      />
    </el-row>
    <el-row type="flex" justify="end" style="margin-top:50px">
      <el-button size="mini" type="primary" @click="confirm">确定</el-button>
      <el-button size="mini" type="warning" @click="$emit('cancel')">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import { treeselect } from '@/api/system/dept';
export default {
  name: 'Organization',

  data() {
    return {
      deptOptions: undefined,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  mounted() {
    this.getTreeselect()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      // this.queryParams.deptId = data.id;
      // this.getList();
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    confirm() {
      console.log(this.$refs.tree.getCheckedNodes().filter(item => !item.children));
      this.$emit('orgConfirm', this.$refs.tree.getCheckedNodes().filter(item => !item.children));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>