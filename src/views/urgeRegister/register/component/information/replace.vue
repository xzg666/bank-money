<template>
  <div>
    <el-card>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :form-data="formData"
        :get-data="getData"
        :form-style="queryFormStyle"
      >
        <template slot="table">
          <el-table-column
            label="客户姓名"
            prop="xingming"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column label="创建日期" prop="cjrq" width="130" /> -->
          <el-table-column
            label="证件类型"
            prop="jkrzjlx"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.cert_type || [],
                  scope.row.jkrzjlx
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="证件ID" prop="zjhm" />
          <el-table-column label="代偿金额(元)" prop="qhhj" />
          <el-table-column label="代偿时间" prop="dcsj" />
          <!-- <el-table-column label="代偿描述" prop="dcms" width="150" /> -->
          <!-- <el-table-column label="代偿类型" prop="dclx" width="130" /> -->
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
  name: 'Replace', // 代偿信息

  components: { QueryTable },

  directives: {},
  props: {
    certNo: {
      type: String,
      default: () => ''
    },
    dkzh: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      queryFormStyle: {
        'label-width': '110px',
        'label-position': 'left'
      },
      queryParams: {
        zjhm: this.certNo,
        pageSize: 10,
        pageNum: 1,
        startDate: moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD')
      },
      formData: [
        { label: '开始日期', type: 'date', model: 'startDate', span: 8 },
        { label: '结束日期', type: 'date', model: 'endDate', span: 8 }
      ],
      getData: registerBody.getUnitInformation
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
