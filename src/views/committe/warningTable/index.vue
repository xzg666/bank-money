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
        <el-table-column label="业务状态" prop="sqrq" width="120px" />
        <el-table-column label="节点状态" prop="sqrxm" width="120px" />
        <el-table-column label="借款合同编号" prop="sqrbm" width="200px" />
        <el-table-column label="借款人姓名" prop="sqzt">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_apply_statu || [],
                scope.row.sqzt
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="借款人证件号码" prop="ywlx" width="200px">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_bussniss_type || [],
                scope.row.ywlx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="贷款金额(元)" prop="zjdwrq" width="150px" />
        <el-table-column label="受理机构" prop="sqje" />
        <el-table-column label="60日资金回笼异常" prop="sqly" />
        <el-table-column label="80日资金回笼异常" prop="zjbdlx" width="150px">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.apply_reason || [],
                scope.row.zjbdlx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="90日资金回笼异常" prop="cjsj" width="150px" />
        <el-table-column label="商贷结清异常" prop="bz" />
        <el-table-column label="商贷解押异常" prop="bz" />
        <el-table-column label="公积金入押异常" prop="bz" />
        <el-table-column label="是否按时放款" prop="bz" />
        <el-table-column label="回款时间" prop="bz" />
        <el-table-column label="创建时间" prop="bz" />
        <el-table-column label="婚姻状态" prop="bz" />
        <el-table-column label="共同借款人姓名" prop="bz" />
        <el-table-column label="共同借款人身份证号码" prop="bz" />
        <el-table-column label="办理业务员名称" prop="bz" />
        <el-table-column label="房屋坐落" prop="bz" />
        <el-table-column label="房屋总价(元)" prop="bz" />
        <el-table-column label="建筑面积(平方米)" prop="bz" />
        <el-table-column label="贷款类型" prop="bz" />
        <el-table-column label="合作方类型" prop="bz" />
        <el-table-column label="合作方" prop="bz" />
        <el-table-column label="客户收款账号" prop="bz" />
        <el-table-column label="业务ID" prop="bz" />

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
          label: '创建日期',
          model: 'sqStartRq',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },
        { label: '借款合同编号', model: 'minDkQje' },
        { label: '借款人姓名', model: 'minDkQje' },
        { label: '借款人身份证号码', model: 'minDkQje' },
        { label: '贷款金额(元)', model: 'minDkQje' },
        { label: '业务状态', model: 'dzzt', type: 'select', dictOptions: [] },
        { label: '合作方类型', model: 'dzzt', type: 'select', dictOptions: [] },
        { label: '合作方', model: 'dzzt', type: 'select', dictOptions: [] },
        { label: '预警类型', model: 'dzzt', type: 'select', dictOptions: [] }
        // { label: '打款金额(小)', model: 'minDkQje' },
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
