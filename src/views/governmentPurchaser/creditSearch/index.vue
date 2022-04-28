<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getPageList"
      :inline="false"
    >
      <!-- <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
                type="primary"
                plain
                size="mini"
              :icon="exportIcon"
              :disabled='exportIcon=="el-icon-loading"'
              @click="clickExport"
            >导出</el-button>
          </el-col>
        </el-row>
      </template>-->
      <template slot="table">
        <el-table-column align="center" label="增信状态">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.addCredit_status || [],scope.row.sendStatus) }}</template>
        </el-table-column>
        <el-table-column align="center" label="增信类型">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.addCredit_type || [],scope.row.zxType) }}</template>
        </el-table-column>
        <el-table-column align="center" width="120" label="客户星级" prop="khxjpd"></el-table-column>
        <el-table-column align="center" label="优惠费率(%)" width="120" prop="yhfl"></el-table-column>
        <el-table-column align="center" label="实际费率(%)" width="120" prop="sjfl"></el-table-column>
        <el-table-column align="center" width="150" label="是否使用优惠">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.yes_no || [],scope.row.useYh) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="统一社会信用代码"
          prop="gysshdb"
        ></el-table-column>
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="供应商名称"
          prop="gysmc"
        ></el-table-column>
        <el-table-column label="客户编号" align="center" width="150" prop="khbh" />
        <el-table-column label="保函编号" align="center" width="170" prop="bhNo" />
        <el-table-column label="增信额度(元)" align="center" width="150" prop="zxed" />
        <!-- <el-table-column label="优惠金额(元)" align="center" width="150" prop /> -->
        <el-table-column label="实际金额(元)" align="center" width="150" prop="sfje" />
        <el-table-column label="受理日期" align="center" width="150" prop="blrq" />
        <el-table-column align="center" width="150" label="增信生效日期" prop="zxsxrq"></el-table-column>
        <el-table-column align="center" width="150" label="增信失效日期" prop="zxgqrq"></el-table-column>
        <el-table-column align="center" width="150" label="卖场注册手机号码" prop="mczcsjh"></el-table-column>
        <el-table-column align="center" label="分支机构" prop="fzOrg"></el-table-column>
        <el-table-column align="center" label="合作方" width="170" show-overflow-tooltip prop="hzf"></el-table-column>
        <!-- <el-table-column align="center" width="150" label="增信时长" prop="zxsxrq"></el-table-column>
      <el-table-column align="center" width="150" label="增信年限" prop="zxgqrq"></el-table-column>
      <el-table-column align="center" label="卖场星级" prop="sfje"></el-table-column>
      <el-table-column align="center" width="170" show-overflow-tooltip label="是否违约" prop="hzf"></el-table-column>
      <el-table-column align="center" width="150" label="是否警示" prop="mczcsjh"></el-table-column>
      <el-table-column align="center" label="担保期内订单" prop="send_status">
        <template slot-scope="scope">
          {{ $selectDictLabel($store.getters.dictData.addCredit_status || [],scope.row.sendStatus) }}
        </template>
        </el-table-column>-->
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { guaranteeSendApi, detailSearchApi } from '@/api/electGuarantee'
export default {
  name: 'CreditSearch',

  components: { QueryTable },

  directives: {},

  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zxsxrq: undefined,
        zxgqrq: undefined,
        gysmc: undefined,
        sendStatus: undefined,
        fzOrg: undefined,
        blrq: undefined,
        zxType: undefined,
        useYh: undefined
      },
      selectRows: [],
      exportIcon: 'el-icon-download'
      // getData: guaranteeSendApi.getPageList
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
        { label: '增信状态', type: 'select', model: 'sendStatus', dictOptions: this.$store.getters.dictData.addCredit_status || [] },
        { label: '客户星级', type: 'select', model: 'khxjpd', dictOptions: this.$store.getters.dictData.supplier_level || [] },
        // { label: '当笔可享受费率', type: 'select', model: 'sendStatus', dictOptions: this.$store.getters.dictData.addCredit_status || [] },
        { label: '供应商名称', model: 'gysmc' },
        { label: '社会信用代码', model: 'gysshdb' },
        { label: '增信类型', type: 'select', model: 'zxType', dictOptions: this.$store.getters.dictData.addCredit_type || [] },
        { label: '是否使用优惠', type: 'select', model: 'useYh', dictOptions: this.$store.getters.dictData.yes_no || [] }
      ]
    }
  },
  mounted() {

  },

  methods: {
    getPageList(data) {
      // 处理页面请求参数
      const paramsData = {}
      paramsData.gysmc = data.gysmc
      paramsData.sendStatus = data.sendStatus
      paramsData.khxjpd = data.khxjpd
      paramsData.gysshdb = data.gysshdb
      paramsData.zxType = data.zxType
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
      return guaranteeSendApi.getPageList(paramsData)
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
    exportDetail(Obj) {
      this.exportIcon = 'el-icon-loading'
      detailSearchApi.exportDetail(Obj).then(res => {
        if (res.code === 200) {
          this.$download(res.msg)
        }
        this.exportIcon = 'el-icon-download'
      })
    },
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