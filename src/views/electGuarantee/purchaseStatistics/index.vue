<template>
  <div class="app-container">
    <!-- <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data='getData'
      :inline='false'
    >
    <template slot="table">
      <el-table-column align="center" show-overflow-tooltip label="累计增信笔数(笔)" prop="zxedSumNow"></el-table-column>
      <el-table-column align="center" label="累计增信余额(元)" prop="zxedSumHis"></el-table-column>
      <el-table-column align="center" label="累计成功推送笔数(笔)" prop="successHisCount"></el-table-column>
      <el-table-column align="center" label="累计担保费(元)" prop="dbfSumHis"></el-table-column>
      <el-table-column align="center" label="新增担保笔数(笔)" prop="bsSumNow"></el-table-column>
      <el-table-column align="center" label="当前成功推送笔数(笔)" prop="successNowCount"></el-table-column>
      <el-table-column align="center" label="当前增信成功金额(元)" prop="zxedSumNow"></el-table-column>
      <el-table-column align="center" label="当前应收担保费(元)" prop="dbfSumNow"></el-table-column>
    </template>
    </query-table>-->
    <el-row>
      <el-form>
        <el-col :span="6">
          <el-form-item label="开始时间">
            <el-date-picker v-model="queryParams.blrqStart" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间">
            <el-date-picker v-model="queryParams.blrqEnd" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分支机构">
            <el-select v-model="queryParams.fzOrg" clearable>
              <el-option
                v-for="(item,index) in orgOptions"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-col :span="6" :push="1">
        <el-button
          type="primary"
          plain
          size="mini"
          :icon="exportIcon"
          :disabled="exportIcon=='el-icon-loading'"
          @click="clickExport"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData">
        <el-table-column align="center" show-overflow-tooltip label="累计增信笔数(笔)" prop="bsSumHis"></el-table-column>
        <el-table-column align="center" label="累计增信余额(元)" prop="zxedSumHis"></el-table-column>
        <el-table-column align="center" label="累计成功推送笔数(笔)" prop="successHisCount"></el-table-column>
        <el-table-column align="center" label="累计担保费(元)" prop="dbfSumHis"></el-table-column>
        <el-table-column align="center" label="新增担保笔数(笔)" prop="bsSumNow"></el-table-column>
        <el-table-column align="center" label="当前成功推送笔数(笔)" prop="successNowCount"></el-table-column>
        <el-table-column align="center" label="当前增信成功金额(元)" prop="zxedSumNow"></el-table-column>
        <el-table-column align="center" label="当前应收担保费(元)" prop="dbfSumNow"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { purchaseStaisticsApi } from '@/api/electGuarantee'
export default {
  name: 'PruChaseStatistics',

  components: {},

  directives: {},

  data() {
    return {
      queryParams: {
        blrqStart: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1)}-01`,
        blrqEnd: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
        fzOrg: undefined
      },
      exportIcon: 'el-icon-download',
      orgOptions: [
        { dictLabel: '长沙', dictValue: '长沙' },
        { dictLabel: '株洲', dictValue: '株洲' },
        { dictLabel: '湘潭', dictValue: '湘潭' },
        { dictLabel: '湘西', dictValue: '湘西' },
        { dictLabel: '郴州', dictValue: '郴州' }
      ],
      tableData: [],
      getData: purchaseStaisticsApi.getPageList
    };
  },
  computed: {
  },
  created() {
    this.getPageList(this.queryParams)
  },
  mounted() {

  },

  methods: {
    handleQuery() {
      if (!this.queryParams.blrqStart || !this.queryParams.blrqEnd) {
        this.$msgError('请选择开始时间和结束时间')
        return
      }
      this.getPageList(this.queryParams)
    },
    getPageList(data) {
      purchaseStaisticsApi.getPageList(data).then(res => {
        if (res.code === 200) {
          this.tableData = res.rows
        }
      })
    },
    resetQuery() {
      this.queryParams = {
        blrqStart: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1)}-01`,
        blrqEnd: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
        fzOrg: undefined
      }
    },
    clickExport() {
      purchaseStaisticsApi.exportStatistic(this.tableData).then(res => {
        if (res.code === 200) {
          this.$download(res.msg)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>