<template>
  <div>
    <el-card>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :form-data="formData"
        :get-data="getData"
        :form-style="queryFormStyle"
        :show-export="true"
        button-span="6"
      >
        <template slot="operating">
          <el-button type="primary">打印预览</el-button>
        </template>
        <template slot="table">
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <!-- <el-table-column label="催收任务关联id" prop="roleId" width="120" /> -->
          <el-table-column label="客户姓名" prop="roleName" :show-overflow-tooltip="true" width="150" />
          <el-table-column label="逾期月份" prop="roleSort" width="130" />
          <el-table-column label="贷款管理部" prop="roleKey" :show-overflow-tooltip="true" width="150" />
          <el-table-column label="月还款额(元)" prop="roleSort" width="100" />
          <el-table-column label="逾期总金额(元)" prop="roleSort" width="120" />
          <el-table-column label="当期逾期/代偿逾期(月)" prop="roleSort" width="150" />
          <el-table-column label="逾期/代偿利息(元)" prop="roleSort" width="130" />
          <el-table-column label="逾期/代偿复利(元)" prop="roleSort" width="130" />
          <el-table-column label="逾期/代偿罚息(元)" prop="roleSort" width="130" />
          <el-table-column label="证件类型" prop="roleSort" width="100" />
          <el-table-column label="证件号码" prop="roleSort" width="100" />
          <el-table-column label="合同贷款金额(元)" prop="roleSort" width="120" />
          <el-table-column label="任务生成时间" prop="roleSort" width="100" />
          <el-table-column label="分派账号" prop="roleSort" width="100" />
          <el-table-column label="分派时间" prop="roleSort" width="100" />
          <el-table-column label="业务员姓名" prop="roleSort" width="120" />
          <el-table-column label="处理状态" prop="roleSort" width="100" />
          <el-table-column label="建议优先处理方式" prop="roleSort" width="130" />
          <el-table-column label="催收类型" prop="roleSort" width="100" />
          <el-table-column label="贷款金额" prop="roleSort" width="100" />
          <el-table-column label="抵偿拖欠金额" prop="roleSort" width="100" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ $parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </template>
      </query-table>
    </el-card>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { queryTableApi } from '@/api/ledger/history'
export default {
  name: 'Delay',

  components: { QueryTable },

  directives: {},

  data() {
    return {
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right'
      },
      queryParams: {
        urgeType: '',
        urgeMode: '',
        urgeTime: '',
        startDt: '',
        endDt: ''
      },
      formData: [],
      getData: queryTableApi
    };
  },

  mounted() {

  },

  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
