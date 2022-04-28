<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getPageList"
      :inline="false"
    >
      <template slot="table">
        <el-table-column align="center" width="170" show-overflow-tooltip label="分支机构" prop="fzOrg"></el-table-column>
        <el-table-column align="center" width="170" label="是否使用优惠" prop="khbh">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.yes_no || [],scope.row.sfyh) }}</template>
        </el-table-column>
        <el-table-column align="center" width="170" label="星级" prop="cusStar"></el-table-column>
        <el-table-column align="center" label="费率(%)" prop="yhhl"></el-table-column>
        <el-table-column align="center" width="150" label="增信成功总笔数" prop="cs"></el-table-column>
        <el-table-column align="center" width="150" label="增信总金额(元)" prop="sumZxed"></el-table-column>
        <el-table-column align="center" width="150" label="增信收费总额(元)" prop="sumSfje"></el-table-column>
        <el-table-column align="center" label="优惠总金额(元)" prop="sumYhje"></el-table-column>
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { creditStatisticsApi } from '@/api/governmentPurchaser'
export default {
  name: 'CreditStatistics',

  components: { QueryTable },
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        zxsxrq: undefined,
        zxgqrq: undefined,
        gysmc: undefined,
        timeType: undefined,
        fzOrg: undefined,
        blrq: undefined,
        startTime: undefined,
        endTime: undefined,
        useYh: '1'
      },
      selectRows: [],
      exportIcon: 'el-icon-download'
      // getData: creditStatisticsApi.getPageList
    };
  },
  computed: {
    formData: function () {
      return [
        {
          label: '时间范围', type: 'select', model: 'timeType', dictOptions: [
            { dictLabel: '增信生效时间', dictValue: '1' },
            { dictLabel: '办理时间', dictValue: '2' }
          ]
        },
        { label: '开始时间', type: 'date', model: 'startTime' },
        { label: '结束时间', type: 'date', model: 'endTime' },
        {
          label: '分支机构', type: 'select', model: 'fzOrg', dictOptions: [
            { dictLabel: '长沙', dictValue: '长沙' },
            { dictLabel: '株洲', dictValue: '株洲' },
            { dictLabel: '湘潭', dictValue: '湘潭' },
            { dictLabel: '湘西', dictValue: '湘西' },
            { dictLabel: '郴州', dictValue: '郴州' }
          ]
        },
        {
          label: '是否使用优惠', type: 'select', model: 'useYh', clearable: false, dictOptions: [
            { dictLabel: '是', dictValue: '1' },
            { dictLabel: '否', dictValue: '0' },
            { dictLabel: '全部', dictValue: '' }
          ]
        }
      ]
    }
  },
  mounted() {

  },

  methods: {
    getPageList(data) {
      // 处理页面请求参数
      const paramsData = {}
      paramsData.fzOrg = data.fzOrg
      paramsData.useYh = data.useYh
      paramsData.pageNum = data.pageNum
      paramsData.pageSize = data.pageSize
      if (data.timeType === '1') {
        paramsData.zxyxStart = data.startTime
        paramsData.zxyxEnd = data.endTime
      } else {
        paramsData.blrqStart = data.startTime
        paramsData.blrqEnd = data.endTime
      }
      return creditStatisticsApi.getPageList(paramsData)
    },
    clickExport() {
      const exportObj = Object.assign({}, this.queryParams)
      delete exportObj.pageSize
      delete exportObj.pageNum
      for (const key in exportObj) {
        if (exportObj[key]) {
          this.exportDetail(exportObj)
          return
        } else {
          this.$confirm('当前未输入导出条件，确定要导出所有数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.exportDetail(exportObj)
          })
        }
      }
    },
    // exportDetail(Obj) {
    //   this.exportIcon = 'el-icon-loading'
    //   detailSearchApi.exportDetail(Obj).then(res => {
    //     if (res.code === 200) {
    //       this.$download(res.msg)
    //     }
    //     this.exportIcon = 'el-icon-download'
    //   })
    // },
    getSelectRowsIdList(arr) {
      const tempList = []
      let str = ''
      arr.map(item => {
        tempList.push(item.id)
      })
      str = tempList.toString()
      return str
    }
  }
};
</script>

<style lang="scss" scoped>
</style>