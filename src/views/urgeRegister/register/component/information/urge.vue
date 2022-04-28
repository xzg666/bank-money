<template>
  <div>
    <el-card>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :form-data="formData"
        :get-data="getData"
        :form-style="queryFormStyle"
        button-span="6"
      >
        <template slot="table">
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <!-- <el-table-column label="催收任务关联id" prop="roleId" width="120" /> -->
          <!-- <el-table-column
            label="开始日期"
            prop="startDate"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="结束日期" prop="endDate" />
          <el-table-column
            label="贷款管理部"
            prop="endDate"
            :show-overflow-tooltip="true"
          /> -->
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
        </template>
      </query-table>
    </el-card>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { registerBody } from '@/api/urge/register';
import moment from 'moment';
export default {
  name: 'Urge', // 催收信息

  components: { QueryTable },

  directives: {},
  props: {
    certNo: {
      type: String,
      default: () => ''
    },
    cslx: {
      type: String,
      default: () => ''
    }
  },

  data() {
    return {
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '170px'
        }
      },
      queryParams: {
        zjhm: this.certNo,
        cslx: this.cslx,
        startDate: moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD')
      },
      getData: registerBody.getOverDueHisInfo
    };
  },
  computed: {
    formData: function(params) {
      return [
        { label: '开始日期', type: 'date', model: 'startDate', span: 8 },
        { label: '结束日期', type: 'date', model: 'endDate', span: 8 },
        {
          label: '催收类型',
          model: 'cslx',
          type: 'select',
          span: 8,
          dictOptions: this.$store.getters.dictData.collection_type || []
        }
        // {
        //   label: '催收方式',
        //   model: 'csfs',
        //   type: 'select',
        //   span: 8,
        //   dictOptions: this.$store.getters.dictData.collection_type || []
        // },
        // {
        //   label: '催收时间',
        //   model: 'cssj',
        //   type: 'select',
        //   span: 8,
        //   dictOptions: [
        //     { dictValue: '0', dictLabel: '全部' },
        //     { dictValue: '1', dictLabel: '近一周' },
        //     { dictValue: '2', dictLabel: '近一月' },
        //     { dictValue: '3', dictLabel: '近三月' },
        //     { dictValue: '4', dictLabel: '近半年' },
        //     { dictValue: '5', dictLabel: '近一年' },
        //     { dictValue: '6', dictLabel: '按起始时间' }
        //   ]
        // },
      ];
    }
  },
  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
