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
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <!-- <el-table-column label="催收任务关联id" prop="roleId" width="120" /> -->
          <!-- <el-table-column
            label="客户姓名"
            prop="khxm"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column
            label="生成时间"
            prop="scsj"
            :show-overflow-tooltip="true"
            width="150"
          /> -->

          <el-table-column
            label="贷款管理部"
            prop="dkglb"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="月还款额" prop="yhke" width="130" />
          <el-table-column label="拖欠金额(元)" prop="tqje" />

          <el-table-column label="逾期期数(月)" prop="yqqs" width="130" />
          <el-table-column label="证件类型" prop="zjlx" width="130">
            <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.cert_type || [],
                  scope.row.zjlx
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="证件编号" prop="zjbh" width="130" />
          <el-table-column label="客户姓名" prop="khxm" width="100" />
          <el-table-column label="客户单位" prop="khdw" />
          <el-table-column label="经办人姓名" prop="jbrxm" />
          <el-table-column
            label="经办人固定号码"
            prop="jbrgddhhm"
            width="150"
          />
          <el-table-column label="经办人手机号码" prop="jbrsjhm" />
          <el-table-column label="逾期月份" prop="yqyf" />
          <!-- <el-table-column label="单位电话" prop="dwdh" width="120" />
          <el-table-column label="移动电话" prop="gddhhm" width="120" /> -->
          <el-table-column label="贷款金额(元)" prop="dkje" width="100" />
          <el-table-column label="贷款余额(元)" prop="dkye" width="100" />
          <el-table-column label="贷款银行" prop="dkyh" width="100" />
          <!-- <el-table-column label="起贷日期" prop="qdrq" width="120" /> -->
          <el-table-column label="结束日期" prop="jsrq" width="100" />
          <!-- <el-table-column label="主办客户经理" prop="zbkhjl" width="130" />
          <el-table-column label="经办人手机号码" prop="jbrsjhm" width="100" /> -->
          <el-table-column label="还款方式" prop="hkfs" width="100" >
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.fund_loan_repay || [],
                scope.row.hkfs
              )
            }}
          </template>
        </el-table-column>
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
  name: 'Delay', // 拖欠信息，逾期历史信息

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
        dkzh: this.dkzh,
        pageSize: 10,
        pageNum: 1,
        startDate: moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD')
      },
      formData: [
        { label: '开始日期', type: 'date', model: 'startDate', span: 8 },
        { label: '结束日期', type: 'date', model: 'endDate', span: 8 }
      ],
      getData: registerBody.getOverDueInfo
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
