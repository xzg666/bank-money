<!-- 资金池变动记录 -->
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      pagination
      @selects-change="selectRows = $event"
      @selection-change="handleSelectionChange"
    >
      <!-- <template slot="operating">
        <el-button
          size="mini"
          plain
          icon="el-icon-back"
          type="primary"
          @click="rollBack"
          >回退</el-button>
        <el-button
          size="mini"
          plain
          icon="el-icon-check"
          type="primary"
          @click="approve"
          >审核通过</el-button>
      </template> -->
      <template slot="table">
        <el-table-column label="资金变动类型" prop="operateType">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.fund_change_type || [],
                scope.row.operateType
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="变动金额(元)" prop="quotaMoney">
          <template slot-scope="scope">
            <span v-if="scope.row.operateType == '7'">
              -{{ scope.row.quotaMoney }}</span>
            <span v-if="scope.row.operateType == '2'">
              +{{ scope.row.quotaMoney }}</span>
            <span v-if="scope.row.operateType == '3'">
              +{{ scope.row.quotaMoney }}</span>
            <span v-if="scope.row.operateType == '1'">
              +{{ scope.row.quotaMoney }}</span>
            <span v-if="scope.row.operateType == '4'">
              +{{ scope.row.quotaMoney }}</span>
            <span
              v-if="
                scope.row.operateType != '2' &&
                  scope.row.operateType != '' &&
                  scope.row.operateType != '3' &&
                  scope.row.operateType != '1'
              "
            >
              {{ scope.row.quotaMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余金额(元)" prop="surplusMoney" width="150px">
          <template slot-scope="scope">
            <span v-if="scope.row.surplusMoney >= 0">
              +{{ scope.row.surplusMoney }}</span>
            <span v-if="scope.row.surplusMoney < 0">
              {{ scope.row.surplusMoney }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作时间" prop="operateTime" /> -->
        <el-table-column label="创建时间" prop="operateTime" width="150px" />
        <el-table-column label="操作人" prop="operateUserName" />
        <el-table-column label="备注" prop="remark" />

        <!-- <el-table-column label="操作" fixed="right" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="clickLedger(scope.row.id)">
              查看台账
            </el-button>
          </template>
        </el-table-column> -->
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { recordList } from '@/api/committe/record';
export default {
  name: 'FlowFinance',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startDate: '',
        endDate: ''
      },
      getData: recordList
      // formData: [
      //   {
      //     label: '开始日期',
      //     model: 'startDate',
      //     type: 'date',
      //     valuefFormat: 'yy-MM-dd'
      //   },
      //   {
      //     label: '结束日期',
      //     model: 'endDate',
      //     type: 'date',
      //     valuefFormat: 'yy-MM-dd'
      //   }
      // ]
    };
  },
  computed: {
    formData: function(params) {
      return [
        {
          label: '开始日期',
          model: 'startDate',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },
        {
          label: '结束日期',
          model: 'endDate',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },
        {
          label: '资金变动类型',
          model: 'operateType',
          type: 'select',
          dictOptions: this.$store.getters.dictData.fund_change_type || []
        }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    this.getTime();
  },

  mounted() {},
  // life cycle end
  methods: {
    getTime() {
      const date = new Date();
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, 0);
      const d = date
        .getDate()
        .toString()
        .padStart(2, 0);
      const time = y + '-' + m + '-' + d;
      this.queryParams.startDate = time;
      this.queryParams.endDate = time;
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
