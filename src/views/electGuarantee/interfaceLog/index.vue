<!--对账列表-->
<template>
  <div class="app-container">
    <el-row>
      <el-form
        ref="queryForm"
        :model="queryParams"
        label-position="right"
        label-width="130px"
      >
        <el-col :span="6">
          <el-form-item label="请求开始日期" prop="timestampStartDate">
            <el-date-picker
              v-model="queryParams.timestampStartDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="请求结束日期" prop="timestampEndDate">
            <el-date-picker
              v-model="queryParams.timestampEndDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务流水号" prop="applyno">
            <el-input
              v-model="queryParams.applyno"
              style="width:100%"
              placeholder="请输入业务流水号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="保函编号" prop="baohanno">
            <el-input
              v-model="queryParams.baohanno"
              style="width:100%"
              placeholder="请输入保函编号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="支付编号" prop="paymentno">
            <el-input
              v-model="queryParams.paymentno"
              style="width:100%"
              placeholder="请输入支付编号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item> -->
        </el-col>
        <el-col :span="6">
          <el-form-item label="调用方" prop="usermechanism">
            <el-select
              v-model="queryParams.usermechanism"
              placeholder="请选择调用方"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in dyzOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="调用状态" prop="code">
            <el-select
              v-model="queryParams.code"
              placeholder="请选择对账状态"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in dyztOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />

    <el-table
      v-loading="loading"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="业务流水号" prop="applyno" width="180" />
      <el-table-column label="保函编号" prop="baohanno" width="180" />
      <!-- <el-table-column label="支付编号" prop="paymentno" width="180">
        <template slot-scope="scope">
          {{
            $selectDictLabel(
              $store.getters.dictData.dzbh_zfzt || [],
              scope.row.status
            )
          }}
        </template>
      </el-table-column> -->
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
      <!-- <el-table-column label="接口地址" prop="url" width="200px" /> -->
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
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  interfaceList,
  synPayResult,
  getZfInfo,
  listQuery
} from '@/api/electGuarantee/query';

import { getToken } from '@/utils/auth';
export default {
  name: 'InterfaceLog',
  mixins: [tableMixin()],
  data() {
    return {
      hqzjdzRules: {
        kssj: [{ required: true, message: '请选择', trigger: 'blur' }],
        jssj: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      jxzjdzRules: {
        jxKssj: [{ required: true, message: '请选择', trigger: 'blur' }],
        jxJssj: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      downRules: {
        downDate: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      tableData: [],
      hqzjdzData: {},
      jxzjdzData: {},
      downData: {},
      openDataScope: false,
      openJxDataScope: false,
      dialogTableData: [],
      reprotData: {},
      dialogTableRelationData: [],
      dyzOptions: [],
      dyztOptions: [],
      importDialog: false,
      openDataRelation: false,
      // 显示搜索条件
      showSearch: true,
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '150px'
        }
      },
      tjTotal: '',
      // 遮罩层
      loading: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },

      selectRows: [],
      // 总条数
      total: 0,

      // 复选框
      multipleSelection: []
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
    this.$getDicts('dzbh_dyzt').then(response => {
      this.dyztOptions = response.data;
    });
    this.$getDicts('dzbh_dyf').then(response => {
      this.dyzOptions = response.data;
    });
  },
  mounted() {
    // this.getList();
    this.loading = false;
    this.tableData = [];
  },
  // life cycle end
  methods: {
    getList() {
      interfaceList(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 对账统计数据列表
    getReportList() {
      queryReconReprot(this.queryParams).then(response => {
        this.reprotData = response.data;
        this.tjTotal = response.total;
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
      this.handleQuery();
    },
    /** 搜索按钮操作 */
    handleRelationQuery() {
      this.queryRelationParams.pageNum = 1;
      this.getRelationList();
    },
    /** 重置按钮操作 */
    resetRelationQuery() {
      this.$resetForm('relationForm');
      this.handleRelationQuery();
    },

    // 复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = val.map(item => item.ywid);
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
