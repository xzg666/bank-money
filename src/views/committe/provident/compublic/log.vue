<template>
  <div class="app-container">
    <div>
      <el-table :data="dialogTableData">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="操作内容" prop="operateContent">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wdywzt || [],
                scope.row.operateContent
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="operateUser" />
        <el-table-column label="操作类型" prop="operateType" />
        <el-table-column label="操作时间" prop="operateTime" width="180" />
      </el-table>
      <!-- <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryOprateParams.pageNum"
        :limit.sync="queryOprateParams.pageSize"
        @pagination="getData"
      /> -->
    </div>
  </div>
</template>

<script>
import { oprate_api } from '@/api/committe/index';
export default {
  name: 'Log',
  data() {
    return {
      dialogTableData: [],
      // queryOprateParams: {
      //   pageNum: 1,
      //   pageSize: 10
      // },
      total: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        // pageNum: this.queryOprateParams.pageNum,
        // pageSize: this.queryOprateParams.pageSize,
        wdywId: this.$route.query.id
      };
      oprate_api(params).then(res => {
        this.dialogTableData = res.rows;
        this.total = res.total;
      });
    }
  }
};
</script>
