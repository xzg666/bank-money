<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="(item,index) in columnList"
        :key="index"
        align="center"
        :label="item.label"
        :prop="item.prop"
      ></el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="600" append-to-body :visible.sync="dialogShow">
      <el-form v-model="selectRow" inline>
        <el-form-item v-for="(item,index) in columnList" :key="index" :label="item.label">
          <el-input v-model="selectRow[item.prop]" style="width:150px"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button size="mini" type="primary" @click="confirmChange">确定</el-button>
        <el-button size="mini" type="warning" @click="dialogShow=false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Edittable',
  props: {
    columnList: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      dialogShow: false,
      selectRow: [],
      selectIndex: undefined
    };
  },

  mounted() {

  },

  methods: {
    edit(scope) {
      this.selectRow = Object.assign({}, scope.row)
      this.selectIndex = scope.$index
      this.dialogShow = true
    },
    confirmChange() {
      this.dialogShow = false
      const { selectIndex, selectRow } = { ...this }
      this.$emit('confirmChange', { selectIndex, selectRow });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>