<template>
  <span>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      v-bind="$attrs"
      :row-key="rowKey"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-class-name="rowClassName"
      v-on="$listeners"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column
        v-if="selectionType === 'checkbox'"
        type="selection"
        width="50"
        align="center"
        v-bind="tableSelection"
      />
      <el-table-column
        v-if="selectionType === 'radio'"
        width="50"
        align="center"
        v-bind="tableSelection"
        type="index"
      >
        <template slot-scope="scope">
          <my-radio :select="radioValue(scope)" @change="changeRadio(scope, $event)" />
        </template>
      </el-table-column>
      <el-table-column v-if="indexed" label="序号" align="center" prop="index" width="80" />
      <slot />
    </el-table>
    <pagination
      v-if="pagination !== false"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="$emit('get-list')"
    />
  </span>
</template>

<script>
import MyRadio from './components/MyRadio'
export default {
  name: 'MyTable',
  components: { MyRadio },
  props: {
    // 查询用参数
    queryParams: {
      type: Object,
      required: true
    },
    loading: Boolean,
    data: Array,
    total: {
      type: [Number, String],
      default: 0
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    selectRows: {
      type: [Array, Object],
      default: () => { }
    },
    /** 序号，注意，分页树形结构请不要使用 */
    indexed: Boolean,
    tableSelection: {
      type: Object
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    /** 判断单选多选 */
    selectionType() {
      if (Array.isArray(this.selectRows)) {
        return 'checkbox'
      }
      if (typeof this.selectRows === 'object') {
        return 'radio'
      }
      return false
    },
    /** 扁平data */
    flattenData() {
      if (Array.isArray(this.data)) {
        const list = []
        const dg = (sz) => {
          sz.forEach(item => {
            list.push(item)
            if (Array.isArray(item.children)) {
              dg(item.children)
            }
          })
        }
        dg(this.data)
        return list
      }
      return []
    },
    selectChange() {
      return [this.flattenData, this.selectRows]
    }
  },
  watch: {
    selectChange: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.selectionType && this.selectionType !== 'radio') {
            this.toggleSelection(this.selectRows || [])
          }
        })
      }
    },
    // 表格数据更新的时候，将选中的数据列表清空
    data: function () {
      this.$emit('selects-change', []);
    }
  },
  created() {
  },
  methods: {
    /** 以下是处理多选情况 */
    /** 多选下的单选 */
    handleSelect(selection, row) {
      const rowKey = this.rowKey
      if (selection.some(i => i === row)) {
        if (Array.isArray(this.selectRows)) {
          this.multipleSelection = [...this.selectRows, row]
        }
      } else {
        this.multipleSelection = this.selectRows.filter(item => item[rowKey] !== row[rowKey])
      }
      this.emitSelection()
    },
    /** 全选或全取消选中 */
    handleSelectAll(selection) {
      if (this.data?.length) {
        const rowKey = this.rowKey
        // 此处校验全选或取消
        const selectAll = this.data.every(item => selection.some(s => s[rowKey] === item[rowKey]))
        if (selectAll) {
          const addList = this.flattenData.filter(sel =>
            !this.selectRows.some(item =>
              item[rowKey] === sel[rowKey]))
          this.multipleSelection = this.selectRows.concat(addList)
        } else {
          this.multipleSelection = this.selectRows.filter(item =>
            !this.flattenData.some(l => l[rowKey] === item[rowKey]))
        }
        this.emitSelection()
      }
    },
    /** 为传入的选中项勾选 */
    toggleSelection(rows) {
      const rowKey = this.rowKey
      if (this.$refs.table) {
        this.$refs.table.clearSelection()
        const list = this.flattenData?.filter(item =>
          rows?.some(r =>
            r[rowKey] === item[rowKey])) || []
        list.forEach(row => {
          try {
            this.$refs.table.toggleRowSelection(row, true)
          } catch {
            console.log('error');
          }
        })
      }
    },
    emitSelection() {
      this.$emit('selects-change', this.multipleSelection)
    },

    /** 以下是处理单选情况 */
    radioValue(scope) {
      const rowKey = this.rowKey
      return scope.row[rowKey] === this.selectRows?.[rowKey];
    },
    changeRadio(scope, event) {
      if (event) {
        this.$emit('selects-change', scope.row)
      }
    },
    /** 序号 */
    rowClassName({ row, rowIndex }) {
      if (!row.index) {
        row.index = rowIndex + ((this.queryParams?.pageNum || 1) - 1) * 10 + 1;
      }
    }
  }
}
</script>

<style scoped>
</style>
