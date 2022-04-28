<template>
  <div style="margin-left: 50px">
    <el-button
      v-show="isPrtBtnShow"
      type="primary"
      size="mini"
      icon="el-icon-printer"
      @click="print()"
      >打印</el-button>
    <div style="margin-bottom: 50px;font-size: 15px">
      <el-row>
        <el-col :span="8">
          <label>记账开始日期:</label>
          <span :v-model="startDate">{{ this.$route.query.startDate }}</span>
        </el-col>
        <el-col :span="8">
          <label>记账结束日期:</label>
          <span>{{ this.$route.query.endDate }}</span>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="tableData" stripe>
      <el-table-column
        label="个人账号"
        prop="grzh"
        :show-overflow-tooltip="true"
        width="200"
      />
      <el-table-column label="记账日期" prop="jzrq" />
      <!--          <el-table-column-->
      <!--            label="汇款年月"-->
      <!--            prop="hjny"-->
      <!--            :show-overflow-tooltip="true"-->
      <!--            width="150"-->
      <!--          />-->
      <!-- <el-table-column label="收入金额(元)" prop="srje" width="100" />
          <el-table-column label="支出金额(元)" prop="zcje" width="120" /> -->
      <el-table-column label="个人账户余额(元)" prop="grzhye" />
      <el-table-column label="发生额" prop="fse" />
      <el-table-column label="缴存类型" prop="jclx">
<!--        <template slot-scope="scope">-->
<!--          {{-->
<!--            $selectDictLabel(-->
<!--              $store.getters.dictData.fund_deposit_busiType || [],-->
<!--              scope.row.jclx-->
<!--            )-->
<!--          }}-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="单位名称" prop="dwmc" />
    </el-table>
  </div>
</template>

<script>
import { registerBody } from '@/api/urge/register';
export default {
  name: 'PayMent',
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
    params.grzh = this.$route.query.grzh;
    params.startDate = this.$route.query.startDate;
    params.endDate = this.$route.query.endDate;
    params.pageSize = 1000;
    params.pageNum = 1;
    this.loading = true
    registerBody.getPersonalAmtInfo(params).then(res => {
      this.loading = false
      if (res.code === 200) {
        this.tableData = res.rows;
      } else {
        this.$msgError(res.msg)
      }
    });
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
