<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :form-style="queryFormStyle"
    >
      <template slot="table">
        <el-table-column align="center" label="工单编号" prop="businessKey" width="170"></el-table-column>
        <el-table-column align="center" label="流程类别" prop="category">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.workFlow_type || [],scope.row.category) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="流程名称"
          prop="processName"
          width="170"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="工单状态" prop="procStatus">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.workOrder_status || [],scope.row.procStatus) }}</template>
        </el-table-column>
        <el-table-column align="center" label="发起人" prop="startUser" width="170"></el-table-column>
        <el-table-column align="center" label="发起时间" prop="startTime" width="170">
          <template
            slot-scope="scope"
          >{{ moment(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" label="结束时间" prop="endTime" width="170">
          <template
            slot-scope="scope"
          >{{ scope.row.endTime ? moment(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="当前环节" prop="name"></el-table-column>
        <el-table-column align="center" label="耗时(小时)" width="120">
          <template
            slot-scope="scope"
          >{{ Number(moment(scope.row.endTime).diff(moment(scope.row.startTime),'hours',true)).toFixed(1) }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickEdit(scope.row)">详情 |</el-button>
            <el-button type="text" size="small" @click="$emit('showFlow',scope.row)">查看流程图</el-button>
          </template>
        </el-table-column>
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { processApi } from '@/api/process';
import { form_api } from '@/api/workFlow/index';
import moment from 'moment';
export default {
  name: 'CydbUiAllorder',

  components: {
    QueryTable
  },

  directives: {},

  data() {
    return {
      moment,
      getData: processApi.queryAllOrder,
      queryFormStyle: {
        'form-item': {
          width: '100%'
        }
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        category: undefined,
        key: undefined,
        procStatus: undefined,
        startUser: undefined,
        startTime: undefined,
        endTime: undefined,
        businessKey: undefined
      },
      selectRows: [],
      workFlowNameOptions: []
      // formData: [
      //   { label: '流程类别', type: 'select', model: '' },
      //   { label: '流程名称', type: 'select', model: '' },
      //   { label: '工单状态', type: 'select', model: '' },
      //   { label: '发起人', type: 'select', model: '' },
      //   { label: '开始时间', type: 'date', model: '' },
      //   { label: '结束时间', type: 'date', model: '' },
      //   { label: '发起人', model: '' }
      // ]
    };
  },
  computed: {
    formData: function () {
      return [
        { label: '流程类别', type: 'select', model: 'category', dictOptions: this.$store.getters.dictData.workFlow_type || [] },
        { label: '流程名称', type: 'select', model: 'key', dictOptions: this.workFlowNameOptions || [] },
        { label: '工单状态', type: 'select', model: 'procStatus', dictOptions: this.$store.getters.dictData.workOrder_status || [] },
        { label: '发起人', type: 'input', model: 'startUser' },
        { label: '开始时间', type: 'date', model: 'startTime' },
        { label: '结束时间', type: 'date', model: 'endTime' },
        { label: '工单编号', model: 'businessKey' }
      ]
    }
  },
  watch: {
    'queryParams.category': function (value) {
      this.queryParams.key = undefined
      form_api.getWorkFlowListByTypeId(value).then(res => {
        if (res.code === 200) {
          if (res.data.length) {
            res.data.map(item => {
              item.dictLabel = item.name
              item.dictValue = item.key
            })
            this.workFlowNameOptions = res.data
          }
        }
      })
    }
  },
  async mounted() {
    if (this.$route.query.processInstanceId) {
      const { processInstanceId } = this.$route.query
      const result = await processApi.queryAllOrder({ processInstanceId })
      if (result.rows.length > 0) {
        this.$emit('hideParent', 'detail', result.rows[0])
      } else {
        this.$msgError(result.msg)
      }
    }
  },

  methods: {
    clickEdit(row) {
      console.log('row: ', row);
      this.$emit('hideParent', 'detail', row);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-form-item__content {
    width: calc(100% - 70px);
  }
}
</style>
