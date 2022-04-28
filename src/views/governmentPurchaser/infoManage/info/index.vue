<!--客户管理列表-->
<template>
  <div class="app-container">
    <el-row>
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        label-position="right"
        label-width="130px"
      >
        <el-col :span="8">
          <el-form-item label="首次额度评估时间" prop="value">
            <el-date-picker
              v-model="queryParams.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              style="width:100%"
              @change="getQueryData"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input
              v-model="queryParams.supplierName"
              style="width:100%"
              placeholder="请输入供应商名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人身份证号码" prop="idCard">
            <el-input
              v-model="queryParams.idCard"
              style="width:100%"
              placeholder="请输入法人身份证号码"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="社会统一信用代码" prop="socialCreditCode">
            <el-input
              v-model="queryParams.socialCreditCode"
              style="width:100%"
              placeholder="请输入社会统一信用代码"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法定代表人" prop="legalPerson">
            <el-input
              v-model="queryParams.legalPerson"
              style="width:100%"
              placeholder="请输入法定代表人"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授信额度">
            <el-input
              v-model="queryParams.sBegin"
              style="width:40%"
              placeholder="请输入"
              clearable
              size="small"
            />
            至
            <el-input
              v-model="queryParams.sEnd"
              style="width:40%"
              placeholder="请输入"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="使用额度">
            <el-input
              v-model="queryParams.zBegin"
              style="width:40%"
              placeholder="请输入"
              clearable
              size="small"
            />
            至
            <el-input
              v-model="queryParams.zEnd"
              style="width:40%"
              placeholder="请输入"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button>
            <el-button
icon="el-icon-refresh"
size="mini"
@click="resetQuery"
>重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="btn-group">
      <el-button
size="mini"
plain
type="primary"
@click="handleExport"
>导出</el-button>
    </div>
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
      @cell-click="cellHandleclick"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="法定代表人" prop="legalPerson">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="color: #46a6ff;cursor: pointer;">{{
              scope.row.legalPerson
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" prop="supplierName" width="230" />

      <el-table-column label="法人身份证号码" prop="idCard" width="200" />
      <!-- <el-table-column label="业务流水号" prop="applyno" width="150" /> -->
      <el-table-column
        label="统一社会信用代码"
        prop="socialCreditCode"
        width="200"
      />
      <el-table-column
        label="授信额度(元)"
        prop="finalMoney"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column label="使用额度(元)" prop="autidMoney" width="120" />
      <el-table-column label="首次额度评估时间" prop="firstTime" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <template slot="other">
      <!--  自定义组件部分  -->
    </template>
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import { infoList, exportList } from '@/api/governmentPurchaser/info';

import { getToken } from '@/utils/auth';
export default {
  name: 'Reconcile',
  mixins: [tableMixin()],
  data() {
    return {
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      showSearch: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 表格数据
      dataList: [],
      // deleteApi: deleteApi,
      selectRows: [],
      // 总条数
      total: '',
      totalRelation: 0,
      // 复选框
      multipleSelection: [],
      // 查看详情参数
      detailParams: {},
      tzTitle: '',
      // 台账标识
      identifyOptions: [],
      // 显示隐藏取消关联按钮
      showCacleBtn: false,
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/loan/dchsqr/importData'
      }
    };
  },
  computed: {
    multiple() {
      return this.selectRows.length === 0;
    }
  },
  watch: {},
  // life cycle start
  created() {
    this.$getDicts('dzbh_db_status').then(response => {
      this.bhztFormat = response.data;
    });
    // 支付方式
    this.$getDicts('dzbh_zfsf').then(response => {
      this.zffsFormat = response.data;
    });
    // 对账状态
    this.$getDicts('dzbh_dzzt').then(response => {
      this.dzztFormat = response.data;
    });
    // 对账状态dzbh_dzzt
  },
  mounted() {
    this.getList();
  },
  // life cycle end
  methods: {
    getQueryData(value) {
      this.queryParams.pBeginDate = value[0];
      this.queryParams.pEndDate = value[1];
    },
    cellHandleclick(row, column, cell, event) {
      if (column.label === '法定代表人') {
        // 执行逻辑
        this.$router.push({
          path: '/governmentPurchaser/infoManage/infoDetails',
          query: {
            id: row.id
          }
        });
      }
    },

    // 导出
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return exportList(queryParams);
        })
        .then(response => {
          this.$download(response.msg);
        })
        .catch(() => {});
    },
    getList() {
      infoList(this.queryParams).then(response => {
        this.dataList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$resetForm('queryForm');
      this.queryParams = {};
      this.handleQuery();
    },

    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.id);
      this.lsid = val[0].id;
      this.runNum = val[0].yhlsh;
      this.detailId = val[0].id;
      this.dzzt = val[0].dzzt;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-bottom: 10px;
}
.cacle-btn {
  position: relative;
  top: -60px;
}
.table-tit {
  font-size: 18px;
  height: 45px;
  line-height: 45px;
}
</style>
