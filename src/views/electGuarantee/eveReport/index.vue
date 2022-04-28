<!-- 电子保函报表-->
<template>
  <div class="app-container queryList">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :get-data="getData"
      :form-data="formData"
      :select-rows="selectRows"
      :form-style="queryFormStyle"
      :inline="false"
      pagination
      @row-dblclick="clickRow"
      @selection-change="handleSelectionChange"
    >
      <template slot="operating">
        <div style="margin-top:20px;padding-left:60px">
          <el-button
size="mini"
plain
type="primary"
@click="handleExport"
>导出</el-button>
        </div>
      </template>
      <template slot="table">
        <el-table-column label="日期" prop="date" width="120px" />

        <el-table-column label="在保余额(元)" prop="countY" width="120px" />
        <el-table-column label="当月新增担保笔数" prop="newNum" width="130px" />
        <el-table-column
          label="当月新增担保金额(元)"
          prop="newAmount"
          width="150px"
        />
        <el-table-column
          label="当月累计担保费(元)"
          prop="newPremium"
          width="150px"
        />
        <el-table-column label="当月解保笔数" prop="psNum" width="120px" />
        <el-table-column
          label="当月解保金额(元)"
          prop="psMoney"
          width="150px"
        />
        <el-table-column label="累计担保笔数" prop="countN" width="120px" />
        <el-table-column label="累计担保金额(元)" prop="countA" width="150px" />
        <el-table-column label="累计担保费用(元)" prop="countP" width="150px" />
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
import { eveReportList, exportBbList } from '@/api/electGuarantee/query';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';

export default {
  name: 'EveReportIndex',
  components: {
    QueryTable
  },
  mixins: [tableMixin()],
  data() {
    return {
      fileListHk: [],
      fileListHkPre: [],
      selectRows: [],
      multipleSelection: [],
      openDetails: false,
      single: '1',
      activeTab: 'xq',
      ids: [],
      id: '',

      queryFormStyle: {
        'label-width': '100px',
        'label-position': 'right',
        'form-item': {
          width: '200px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      getData: eveReportList
    };
  },
  computed: {
    formData: function(params) {
      return [
        {
          label: '开始时间',
          model: 'baohanapplytimeStartDate',
          type: 'month'
        },
        { label: '结束时间', model: 'baohanapplytimeEndDate', type: 'month' }
      ];
    }
  },
  watch: {},
  // life cycle start
  created() {
    // this.getTime();
  },

  mounted() {
    // this.getTemplate();
    console.log('listData', this.listData);
  },
  // life cycle end
  methods: {
    // 查看详情
    hanldleDetails(id) {
      this.openDetails = true;
    },
    // 导出
    handleExport() {
      // const url =
      //   process.env.VUE_APP_BASE_API +
      //   '/xtdzztbbus/ywinfo/export?' +
      //   'fileId=' +
      //   this.imageUrlFrontData.fileId;
      // location.href = url;

      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return exportBbList(queryParams);
        })
        .then(response => {
          this.$download(response.msg);
        })
        .catch(() => {});
    },

    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.single = val.length !== 1;
      this.ids = val.map(item => item.ywId);
      this.id = this.ids[0];
      this.single = val.length !== 1;
    }
    // 判断数组中的值是否相等
  }
};
</script>

<style lang="scss" scoped>
.area {
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.title {
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 15px;
  text-align: left;
  margin-bottom: 20px;
}
.area .el-row {
  margin-bottom: 0px;
}
.queryList .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  font-weight: bold;
}
</style>
