<template>
  <div style="margin-left: 50px">
    <el-button
      v-show="isPrtBtnShow"
      size="mini"
      type="primary"
      icon="el-icon-printer"
      @click="print()"
      >打印</el-button>
    <div style="margin-bottom: 50px;font-size: 15px">
      <el-row>
        <el-col :span="6">
          <label>姓名:</label>
          <span>{{ this.$route.query.name }}</span>
        </el-col>
        <el-col :span="6">
          <label>身份证号:</label>
          <span>{{ this.$route.query.certNo }}</span>
        </el-col>
        <el-col :span="6">
          <label>开始日期:</label>
          <span>{{ this.$route.query.startDate }}</span>
        </el-col>
        <el-col :span="6">
          <label>结束日期:</label>
          <span>{{ this.$route.query.endDate }}</span>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
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
    </el-table>
  </div>
</template>

<script>
import { registerBody } from '@/api/urge/register';
export default {
  name: 'Repayment',
  data() {
    return {
      isPrtBtnShow: true,
      tableData: [],
      loading: false
    };
  },
  computed: {},
  created() {
    const params = {};
    params.dkzh = this.$route.query.dkzh;
    params.startDate = this.$route.query.startDate;
    params.endDate = this.$route.query.endDate;
    params.pageSize = 1000;
    params.pageNum = 1;
    // this.tableData = registerBody.getCustBackInfo(params);
    this.loading = true
    registerBody.getCustBackInfo(params).then(res => {
      this.loading = false
      if (res.code === 200) {
        this.tableData = res.rows;
      } else {
        this.$msgError(res.msg)
      }
    });
    console.log('tableData', this.tableData);
  },
  methods: {
    print() {
      this.isPrtBtnShow = false;
      setTimeout(function() {
        window.print();
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped></style>
