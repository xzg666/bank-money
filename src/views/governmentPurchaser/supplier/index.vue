<!-- 供应商合同查询 -->
<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      pagination
      @selection-change="handleSelectionChange"
    >
      <!-- <template slot="operating">
        <el-button
          size="mini"
          plain
          icon="el-icon-back"
          type="primary"
          @click="rollBack"
          >回退</el-button>
        <el-button
          size="mini"
          plain
          icon="el-icon-check"
          type="primary"
          @click="approve"
          >审核通过</el-button>
      </template> -->
      <template slot="table">
        <el-table-column label="企业信用代码" prop="socialUnifiedCreditCode" />
        <el-table-column label="供应商名称" prop="suppliername" />
        <!-- <el-table-column label="操作时间" prop="operateTime" /> -->
        <el-table-column label="合同笔数" prop="cunt" />
        <el-table-column label="累计合同金额(元)" prop="contractamountSum" />
      </template>
      <template slot="other">
        <!--  自定义组件部分  -->
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { supplierList } from '@/api/governmentPurchaser/supplier';
export default {
  name: 'FlowFinance',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      queryFormStyle: {
        'label-width': '125px',
        'label-position': 'right',
        'form-item': {
          width: '135px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        registerTimeStart: '',
        registerTimeEnd: ''
      },
      getData: supplierList
      // formData: [
      //   {
      //     label: '开始日期',
      //     model: 'startDate',
      //     type: 'date',
      //     valuefFormat: 'yy-MM-dd'
      //   },
      //   {
      //     label: '结束日期',
      //     model: 'endDate',
      //     type: 'date',
      //     valuefFormat: 'yy-MM-dd'
      //   }
      // ]
    };
  },
  computed: {
    formData: function(params) {
      return [
        {
          label: '合同备案开始时间',
          model: 'registerTimeStart',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },
        {
          label: '合同备案结束时间',
          model: 'registerTimeEnd',
          type: 'date',
          valuefFormat: 'yy-MM-dd'
        },
        {
          label: '供应商名称',
          model: 'suppliername'
        }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    this.getTime();
  },

  mounted() {},
  // life cycle end
  methods: {
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
    },
    getTime() {
      const date = new Date();
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, 0);
      const d = date
        .getDate()
        .toString()
        .padStart(2, 0);
      const time = y + '-' + m + '-' + d;
      this.queryParams.registerTimeStart = time;
      this.queryParams.registerTimeEnd = time;
    }
  }
};
</script>

<style lang="scss" scoped></style>
