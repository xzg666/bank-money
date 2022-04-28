<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :form-style="queryFormStyle"
    >
      <template slot="operating">
        <el-col :span="6" :push="1">
          <el-button
            v-hasPermi="['system:role:add']"
            type="primary"
            plain
            size="mini"
            icon="el-icon-s-promotion"
          >重新发送</el-button>
        </el-col>
      </template>
      <template slot="table">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="短信模板ID" prop="roleId" width="120" />
        <el-table-column
          label="发送的借款合同编号"
          prop="roleName"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column label="催收类型名称" prop="roleKey" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="发送业务类型名称" prop="roleSort" width="100" />
        <el-table-column label="发送对象" prop="roleSort" width="120" />
        <el-table-column label="发送状态" prop="roleSort" width="150" />
        <el-table-column label="发送对象号码" prop="roleSort" width="130" />
        <el-table-column label="发送类容" prop="roleSort" width="130" />
        <el-table-column label="发送备注" prop="roleSort" width="130" />
        <el-table-column label="发送人" prop="roleSort" width="130" />
        <el-table-column label="回执时间" prop="roleSort" width="100" />
        <el-table-column label="发送时间" prop="roleSort" width="100" />
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { queryTableApi } from '@/api/ledger/history';
export default {
  name: 'RuoyiUiMessagestastics',

  components: { QueryTable },

  directives: {},

  data() {
    return {
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      getData: queryTableApi,
      formData: [
        { label: '开始时间', type: 'date', model: 'startSendDate' },
        { label: '结束时间', type: 'date', model: 'endSendDate' },
        {
          label: '催收类型', model: 'urgeType', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '业务类型', model: 'businessType', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        {
          label: '发送状态', model: 'sendStatus', type: 'select',
          dictOptions: [
            { dictValue: '1', dictLabel: '12' },
            { dictValue: '2', dictLabel: '34' }
          ]
        },
        { label: '开始时间', model: 'sendTarget' },
        { label: '发送对象手机号', model: 'targetPhone' }
      ],
      queryParams: {
        startSendDate: '',
        endSendDate: '',
        urgeType: '',
        businessType: '',
        sendStatus: '',
        sendTarget: '',
        targetPhone: ''
      }
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
