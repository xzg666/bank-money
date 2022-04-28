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
        <el-table-column align="center" label="工单编号" prop="businessKey"></el-table-column>
        <el-table-column align="center" label="到达时间" prop="createTime">
          <template
            slot-scope="scope"
          >{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" label="流程名称" prop="processName"></el-table-column>
        <el-table-column align="center" label="当期环节" prop="name"></el-table-column>
        <el-table-column align="center" label="流程类别" prop="category">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.workFlow_type || [] , scope.row.category) }}</template>
        </el-table-column>
        <el-table-column align="center" label="发起人" prop="startUser"></el-table-column>
        <el-table-column align="center" label="发起时间" prop="startTime">
          <template
            slot-scope="scope"
          >{{ moment(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" label="已耗时(小时)" prop="duration">
          <template
            slot-scope="scope"
          >{{ Number(moment(new Date().getTime()).diff(moment(scope.row.startTime),'hours',true)).toFixed(1) }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status===0"
              type="text"
              size="small"
              @click="singFor(scope.row)"
            >处理 |</el-button>
            <el-button
              v-if="scope.row.status===1"
              type="text"
              size="small"
              @click="deal(scope.row)"
            >处理 |</el-button>
            <!-- <el-button type="text" size="small" @click="clickEdit">转办 |</el-button> -->
            <el-button type="text" size="small" @click="$emit('showFlow',scope.row)">查看流程图</el-button>
          </template>
        </el-table-column>
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { processApi } from '@/api/process'
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
      getData: processApi.queryMyTask,
      queryFormStyle: {
        // 'label-width': '130px',
        // 'label-position': 'right',
        // 'form-item': {
        //   width: '150px'
        // }
      },
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        category: undefined,
        key: undefined,
        linkId: undefined
      },
      workFlowNameOptions: [],
      linkIdOptions: []
    };
  },
  computed: {
    formData: function () {
      return [
        { label: '流程类别', type: 'select', model: 'category', dictOptions: this.$store.getters.dictData.workFlow_type || [] },
        { label: '流程名称', type: 'select', model: 'key', dictOptions: this.workFlowNameOptions || [] },
        { label: '当前节点', type: 'select', model: 'linkId', dictOptions: this.linkIdOptions || [] },
        { label: '表单名称', type: 'input', model: 'name' }
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
    },
    'queryParams.key': function (value) {
      this.queryParams.linkId = undefined
      form_api.queryAllTaskBykey(value).then(res => {
        if (res.code === 200) {
          if (res.data.length) {
            res.data.map(item => {
              item.dictLabel = item.linkName
              item.dictValue = item.linkId
            })
            this.linkIdOptions = res.data
          }
        }
      })
    }
  },
  mounted() {

  },

  methods: {
    getList() {
      this.$refs.queryTable.getList()
    },
    singFor(row) {
      processApi.signforProcess(row.id).then(res => {
        if (res.code === 200) {
          this.deal(row)
          // this.$msgSuccess(res.msg)
          this.$refs.queryTable.getList()
        }
      })
    },
    deal(row) {
      this.$emit('hideParent', 'deal', row);
    },
    clickEdit() {

    }
  }
};
</script>

<style lang="scss" scoped>
</style>