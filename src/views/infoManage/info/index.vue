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
      <template slot="operating">
        <el-button
size="mini"
plain
icon="el-icon-back"
type="primary"
>查看</el-button>
        <el-button
size="mini"
plain
icon="el-icon-check"
type="primary"
>导出</el-button>
      </template>
      <template slot="table">
        <el-table-column label="法人代表人" prop="sqrq" width="120px" />
        <el-table-column label="法人身份证号码" prop="sqrxm" width="120px" />
        <el-table-column label="手机号码" prop="sqrbm" width="200px" />
        <el-table-column label="供应商名称" prop="sqzt">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_apply_statu || [],
                scope.row.sqzt
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="统一社会信用代码" prop="ywlx" width="200px">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.wd_bussniss_type || [],
                scope.row.ywlx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="所属行业" prop="zjdwrq" width="150px" />
        <el-table-column label="供应商类型" prop="sqje" />
        <el-table-column label="增信时长(月)" prop="sqly" />
        <el-table-column label="分支机构" prop="zjbdlx" width="150px">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.apply_reason || [],
                scope.row.zjbdlx
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="渠道" prop="cjsj" width="150px" />
        <el-table-column label="注册时间" prop="bz" />
        <el-table-column label="业务状态" prop="bz" />

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
        'label-width': '125px',
        'label-position': 'right',
        'form-item': {
          width: '140px'
        }
      },
      formData: [
        { label: '供应商名称', model: 'minDkQje' },
        { label: '所属行业', model: 'dzzt', type: 'select', dictOptions: [] },
        {
          label: '统一社会信用代码',
          model: 'dzzt'
        },
        { label: '业务状态', model: 'dzzt', type: 'select', dictOptions: [] },
        { label: '法定代表人', model: 'minDkQje' },
        { label: '法人身份证号码', model: 'minDkQje' },
        { label: '分支机构', model: 'dzzt', type: 'select', dictOptions: [] },
        { label: '渠道', model: 'dzzt', type: 'select', dictOptions: [] },
        {
          label: '注册时间',
          model: 'sqStartRq',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        }
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
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const time = y + '-' + m + '-' + d;
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
