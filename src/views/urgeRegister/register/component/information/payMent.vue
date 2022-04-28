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
          <el-table-column
            label="个人账号"
            prop="grzh"
            :show-overflow-tooltip="true"
            width="200"
          />
          <el-table-column label="记账日期" prop="jzrq" width="200" />
<!--          <el-table-column-->
<!--            label="汇款年月"-->
<!--            prop="hjny"-->
<!--            :show-overflow-tooltip="true"-->
<!--            width="150"-->
<!--          />-->
          <!-- <el-table-column label="收入金额(元)" prop="srje" width="100" />
          <el-table-column label="支出金额(元)" prop="zcje" width="120" /> -->
          <el-table-column label="个人账户余额(元)" prop="grzhye" width="200" />
          <el-table-column label="发生额" prop="fse" width="200" />
          <el-table-column label="缴存类型" prop="jclx" width="200">
            <!-- <template slot-scope="scope">
              {{
                $selectDictLabel(
                  $store.getters.dictData.fund_deposit_busiType || [],
                  scope.row.jclx
                )
              }}
            </template> -->
          </el-table-column>
          <el-table-column label="单位名称" prop="dwmc" width="250" />
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
  name: 'Payment', // 缴存信息

  components: { QueryTable },

  directives: {},
  props: {
    certNo: {
      type: String,
      default: () => ''
    },
    grzh: {
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
        grzh: this.grzh,
        pageSize: 10,
        pageNum: 1,
        startDate: moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD')
      },
      formData: [
        { label: '记账开始日期', type: 'date', model: 'startDate', span: 8 },
        { label: '记账结束日期', type: 'date', model: 'endDate', span: 8 }
      ],
      getData: registerBody.getPersonalAmtInfo
    };
  },

  mounted() {},

  methods: {
    print() {
      const { href } = this.$router.resolve({
        path: '/urge/print/payMent',
        query: {
          grzh: this.grzh,
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
