<!-- 电子保函查询-->
<template>
  <div v-loading.fullscreen.lock="loading" class="app-container queryList">
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
      <template slot="table">
        <el-table-column label="ID" prop="id" width="150" />
        <el-table-column label="业务流水号" prop="applyno" width="180" />
        <el-table-column label="保函编号" prop="baohanno" width="180" />
        <el-table-column label="支付编号" prop="paymentno" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_zfzt || [],
                scope.row.status
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="请求时间" prop="timestamp" width="180" />

        <el-table-column label="调用方" prop="usermechanism" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_dyf || [],
                scope.row.usermechanism
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="接口地址" prop="url" width="200px" />
        <el-table-column label="调用状态" prop="code" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_dyzt || [],
                scope.row.code
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="请求内容" prop="requestcontent">
          <span
            slot-scope="scope"
            :title="scope.row.requestcontent"
            style="height:50px;
    overflow: hidden;
    display: inline-block;"
            >{{ scope.row.requestcontent }}</span></el-table-column>

        <el-table-column label="响应内容" prop="responsecontent">
          <span
            slot-scope="scope"
            :title="scope.row.responsecontent"
            style="height:50px;
    overflow: hidden;
    display: inline-block;"
            >{{ scope.row.responsecontent }}</span></el-table-column>
        <el-table-column label="接口类型" prop="interfacetype" width="180" />
      </template>
      <template slot="table">
        <el-table-column label="ID" prop="id" width="150" />
        <el-table-column label="业务流水号" prop="applyno" width="180" />
        <el-table-column label="保函编号" prop="baohanno" width="180" />
        <el-table-column label="支付编号" prop="paymentno" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_zfzt || [],
                scope.row.status
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="请求时间" prop="timestamp" width="180" />

        <el-table-column label="调用方" prop="usermechanism" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_dyf || [],
                scope.row.usermechanism
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="接口地址" prop="url" width="200px" />
        <el-table-column label="调用状态" prop="code" width="180">
          <template slot-scope="scope">
            {{
              $selectDictLabel(
                $store.getters.dictData.dzbh_dyzt || [],
                scope.row.code
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="请求内容" prop="requestcontent">
          <span
            slot-scope="scope"
            :title="scope.row.requestcontent"
            style="height:50px;
    overflow: hidden;
    display: inline-block;"
            >{{ scope.row.requestcontent }}</span></el-table-column>

        <el-table-column label="响应内容" prop="responsecontent">
          <span
            slot-scope="scope"
            :title="scope.row.responsecontent"
            style="height:50px;
    overflow: hidden;
    display: inline-block;"
            >{{ scope.row.responsecontent }}</span></el-table-column>
        <el-table-column label="接口类型" prop="interfacetype" width="180" />
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
import {
  interfaceList,
  synPayResult,
  getZfInfo,
  listQuery
} from '@/api/electGuarantee/query';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { getUserName } from '@/utils/auth';
export default {
  name: 'Bank',
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
      ids: [],
      id: '',
      loading: false,
      listInterfaceData: {},

      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '120px'
        }
      },

      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      getData: interfaceList,
      // 支付流水号
      paymentNo: ''
    };
  },
  computed: {
    formData: function(params) {
      return [
        { label: '请求开始日期', model: 'timestampStartDate', type: 'date' },
        { label: '请求结束日期', model: 'timestampEndDate', type: 'date' },
        { label: '业务流水号', model: 'applyno' },
        { label: '保函编号', model: 'baohanno' },
        { label: '支付编号', model: 'paymentno' },
        {
          label: '调用方',
          model: 'usermechanism',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_dyf || []
        },
        {
          label: '调用状态',
          model: 'code',
          type: 'select',
          dictOptions: this.$store.getters.dictData.dzbh_dyzt || []
        }
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
    closeDetails() {
      this.openDetails = false;
      this.$refs.queryTable.getList();
    },
    // 导出
    handleSync() {
      // const url =
      //   process.env.VUE_APP_BASE_API +
      //   '/xtdzztbbus/ywinfo/export?' +
      //   'fileId=' +
      //   this.imageUrlFrontData.fileId;
      // location.href = url;
      if (this.multipleSelection.length == 0) {
        this.$message.warning('请先选中列表!');
      } else {
        this.$confirm(
          '您确定要对[支付流水号' + this.paymentNo + ']进行支付同步吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            synPayResult(this.multipleSelection[0]).then(res => {
              if (res.code == 200) {
                this.$message.success('操作成功!');
              }
            });
          })
          .catch(() => {});
      }
    },
    // 下载
    handleDownload() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning('请先选中列表!');
      } else {
        if (this.multipleSelection[0].downloadurl != '') {
          const downUrl = this.multipleSelection[0].downloadurl;
          window.open(downUrl);
        } else {
          this.$message.warning('保函没有开标，无法进行保函下载!');
        }
      }
    },

    clickRow(row) {
      this.loading = true;
      this.listInterfaceData = row;

      const params1 = {
        applyno: row.applyno
      };
      listQuery(params1).then(res => {
        Object.assign(this.listInterfaceData, res.rows[0]);
        this.loading = false;
        this.openDetails = true;
      });

      this.id = row.id;
      this.resettime = row.resettime;
      this.invoicestatus = row.invoicestatus;
      this.applyquittime = row.applyquittime;
      this.bankstatus = row.bankstatus;
      this.claimstatus = row.claimstatus;
      this.applyclaimtime = row.applyclaimtime;
      console.log('this.listInterfaceData', this.listInterfaceData);
      console.log('this.id', this.id);
    },
    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.single = val.length !== 1;
      this.ids = val.map(item => item.ywId);
      this.id = this.ids[0];
      this.single = val.length !== 1;
      const paymentNos = val.map(item => item.paymentNo);
      this.paymentNo = paymentNos[0];
    }
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
