<template>
  <div>
    <el-table :data="tableData">
      <el-table-column align="center" label="催收人员" prop="djrxm">
        <template slot-scope="scope">
          {{ scope.row.djrzh ? scope.row.djrzh : scope.row.fpclrzh }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="催收类型">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.collection_type, scope.row.cslx) }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="dbcjsj" />
      <el-table-column align="center" label="催收日期" prop="csrq" />
      <el-table-column align="center" label="催收完成时间" prop="dbwcsj" />
      <el-table-column align="center" label="待办状态">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.todo_status, scope.row.dbzt) }}</template>
      </el-table-column>
      <el-table-column align="center" label="催收方式">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.collection_mode, scope.row.csfs) }}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="预警方式" prop="yjfs">
        <template
          slot-scope="scope"
        >{{ $selectDictLabel($store.getters.dictData.prevent_type, scope.row.yjfs) }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="预约还款日" prop="yyhkr" />
      <el-table-column align="center" label="催收描述" prop="csms" />
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { registerBody } from '@/api/urge/register';
import eventBus from '../eventBus'
export default {
  name: 'Urgerecord',
  components: {},

  directives: {},
  props: {
    selectRows: {
      type: Object,
      default: () => { }
    }
  },

  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    };
  },
  created() {
    eventBus.$on('urgeHisChange', () => {
      this.getTableList()
    })
  },
  mounted() {
    this.getTableList()
  },

  methods: {
    getTableList() {
      registerBody.getUrgeHistory({
        zjhm: this.selectRows.zjhm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.total = res.total
          this.tableData = res.rows
        }
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTableList()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.getTableList()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
