<!-- 资金池变动记录 -->
<template>
  <div class="app-container manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="manage-tit">资金统计情况</span>
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <label>初始金额(万元)：</label>
            <span>{{ resultData.originAmount }}</span>
          </el-col>
          <el-col :span="6">
            <label>已用金额(万元)：</label>
            <span>{{ resultData.usedAmount }}</span>
          </el-col>
          <el-col :span="6">
            <label>正常已用金额(万元)：</label>
            <span>{{ resultData.normalUsedAmount }}</span>
          </el-col>
          <el-col :span="6">
            <label>逾期已用金额(万元)：</label>
            <span>{{ resultData.overdueUsedAmount }}</span>
          </el-col>
          <el-col :span="6">
            <label>总余额(万元)：</label>
            <span>{{ resultData.currentBalance }}</span>
          </el-col>
          <el-col :span="6">
            <label>已用数量(笔)：</label>
            <span>{{ resultData.usedNum }}</span>
          </el-col>

          <el-col :span="6">
            <label>正常已用数量(笔)：</label>
            <span>{{ resultData.normalUsedNum }}</span>
          </el-col>

          <el-col :span="6">
            <label>逾期已用数量(笔)：</label>
            <span>{{ resultData.overdueUsedNum }}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-card class="box-card" style="height:28vh">
            <div slot="header" class="clearfix">
              <span class="manage-tit">资金使用情况</span>
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <label>当月最高使用金额(万元)：</label>
                  <span>{{ resultData.currentMonthUsedestAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月最高使用数量(笔)：</label>
                  <span>{{ resultData.currentMonthUsedestNum }}</span>
                </el-col>
                <el-col :span="12">
                  <label>上月最高使用金额(万元)：</label>
                  <span>{{ resultData.lastMonthUsedestAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>上月最高使用数量(笔)：</label>
                  <span>{{ resultData.lastMonthUsedestNum }}</span>
                </el-col>
                <el-col :span="12">
                  <label>全年最高使用金额(万元)：</label>
                  <span>{{ resultData.allYearUsedestAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>全年最高使用数量(笔)：</label>
                  <span>{{ resultData.allYearUsedestNum }}</span>
                </el-col>
                <el-col :span="12">
                  <label>&nbsp;</label>
                  <span></span>
                </el-col>
                <el-col :span="12">
                  <label>&nbsp;</label>
                  <span></span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" style="height:28vh">
            <div slot="header" class="clearfix">
              <span class="manage-tit">资金回收情况</span>
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <label>当月回收金额(万元)：</label>
                  <span>{{ resultData.currentMonthRefundAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月回收数量(笔)：</label>
                  <span>{{ resultData.currentMonthRefundNum }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月正常回收金额(万元)：</label>
                  <span>{{ resultData.currentMonthNormalRefundAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月正常回收数量(笔)：</label>
                  <span>{{ resultData.currentMonthNormalRefundNum }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月逾期回收金额(万元)：</label>
                  <span>{{ resultData.currentMonthOverdueRefundAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月逾期回收数量(笔)：</label>
                  <span>{{ resultData.currentMonthOverdueRefundNum }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月提前回收金额(万元)：</label>
                  <span>{{ resultData.currentMonthAdvanceRefundAmount }}</span>
                </el-col>
                <el-col :span="12">
                  <label>当月提前回收笔数(笔)：</label>
                  <span>{{ resultData.currentMonthAdvanceRefundNum }}</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { moneyManage } from '@/api/committe/record';
export default {
  name: 'Manage',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      resultData: []
    };
  },
  computed: {},
  watch: {},
  // life cycle start
  created() {},

  mounted() {
    this.getData();
  },
  // life cycle end
  methods: {
    getData() {
      moneyManage().then(res => {
        this.resultData = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.manage-tit {
  font-size: 16px;
}
.box-card {
  margin-bottom: 30px;
}
.manage .el-col {
  margin-bottom: 25px;
  font-size: 14px;
}
</style>
