<!-- 资金池申请记录 -->
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
        <el-table-column label="申请日期" prop="sqrq" width="120px" />
        <el-table-column label="申请人姓名" prop="sqrxm" width="120px" />
        <el-table-column label="申请人部门" prop="sqrbm" width="200px" />
        <el-table-column label="申请状态" prop="sqzt">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_apply_statu || [],
                scope.row.sqzt
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="业务类型" prop="ywlx" width="200px">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_bussniss_type || [],
                scope.row.ywlx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="资金到位日期" prop="zjdwrq" width="150px" />
        <el-table-column label="金额(元)" prop="sqje" />
        <el-table-column label="申请理由" prop="sqly" />
        <el-table-column label="资金变动类型" prop="zjbdlx" width="150px">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.fund_change_type || [],
                scope.row.zjbdlx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="cjsj" width="150px" />
        <el-table-column label="备注" prop="bz" />

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
import { applyList } from '@/api/committe/apply';
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
      formData: [
        {
          label: '开始日期',
          model: 'sqStartRq',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },
        {
          label: '结束日期',
          model: 'sqEndRq',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },

        { label: '申请人姓名', model: 'sqrxm' },
        {
          label: '申请状态',
          model: 'sqzt',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_apply_statu || []
        },
        {
          label: '业务类型',
          model: 'ywlx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.wd_bussniss_type || []
        },
        { label: '金额（元）', model: 'sqje' },
        // {
        //   label: '资金变动类型',
        //   model: 'zjbdlx',
        //   type: 'select',
        //   dictOptions: this.$store.getters.dictData.apply_reason || []
        // },
        {
          label: '资金变动类型',
          model: 'zjbdlx',
          type: 'select',
          dictOptions: this.$store.getters.dictData.fund_change_type || []
        }
        // { label: '打款金额(大)', model: 'maxDkDje' },
        // { label: '打款开始时间', model: 'dkStartTime', type: 'time' },
        // { label: '打款结束时间', model: 'dkEndTime', type: 'time' },
        // { label: '台账状态', model: 'dzzt', type: 'select', dictOptions: [] },
        // { label: '导入批次号', model: 'drpch' },
        // { label: '被认领数量', model: 'brlsl' }
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sqStartRq: '',
        sqEndRq: ''
      },
      getData: applyList
    };
  },
  computed: {},
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
      // if (d.length == '0') {
      //   var time = y + '-' + m + '-' + '0' + d;
      // } else {
      //   var time = y + '-' + m + '-' + d;
      // }
      var time = y + '-' + m + '-' + d;
      this.queryParams.sqStartRq = time;
      this.queryParams.sqEndRq = time;
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
