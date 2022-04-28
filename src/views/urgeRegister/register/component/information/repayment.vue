<template>
  <div>
    <el-card>
      <div style="margin-left:25px;">
        <el-row>
          <el-col :span="4">
            <label>姓名:</label>
            <span>{{ name }}</span>
          </el-col>
          <el-col :span="5">
            <label>身份证号:</label>
            <span>{{ certNo }}</span>
          </el-col>
        </el-row>
      </div>
      <query-table
        ref="queryTable"
        :query-params="queryParams"
        :form-data="formData"
        :get-data="getData"
        :form-style="queryFormStyle"
      >
        <template slot="operating">
          <el-row :gutter="10" style="padding-left:2px">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-printer"
                size="mini"
                @click="print()"
              >打印</el-button>
            </el-col>
          </el-row>
        </template>
        <template slot="table">
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <!-- <el-table-column label="催收任务关联id" prop="roleId" width="120" /> -->
          <el-table-column
            label="还款金额(元)"
            prop="fse"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="还款本金(元)" prop="bjje" width="130" />
          <el-table-column
            label="还款利息(元)"
            prop="lxje"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column label="实扣罚息(元)" prop="fxje" width="120" />
          <el-table-column label="实扣复利(元)" prop="flje" width="150" />
          <el-table-column label="还款日期" prop="hkrq" width="130" />
          <el-table-column label="还款类型" prop="hklx" width="130">
            <!-- <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.fund_loan_busiType || [],
                  scope.row.hklx
                )
              }}
            </template> -->
          </el-table-column>
          <el-table-column label="应还日期" prop="yhrq" width="130" />
          <el-table-column label="缴款方式" prop="jkfs" width="130">
            <!-- <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.fund_payment_way || [],
                  scope.row.jkfs
                )
              }}
            </template> -->
          </el-table-column>
          <el-table-column label="贷款余额" prop="dkye" width="100" />
          <!-- <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ $parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column> -->
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
  name: 'Repayment', // 还款信息

  components: { QueryTable },

  directives: {},
  props: {
    dkzh: {
      type: String,
      default: () => ''
    },
    certNo: {
      type: String,
      default: () => ''
    },
    name: {
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
      getData: registerBody.getCustBackInfo
    };
  },

  mounted() {},

  methods: {
    print() {
      const { href } = this.$router.resolve({
        path: '/urge/print/repayment',
        query: {
          name: this.name,
          certNo: this.certNo,
          dkzh: this.dkzh,
          startDate: this.queryParams.startDate,
          endDate: this.queryParams.endDate
        }
      });
      window.open(href, '_blank');
      return Promise.resolve(false); // 不刷新表格
    }
  }
};
</script>

<style lang="scss" scoped></style>
