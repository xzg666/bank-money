<!--对账列表-->
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
          <el-form-item label="支付开始日期" prop="paymentStartDate">
            <el-date-picker
              v-model="queryParams.paymentStartDate"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付结束日期" prop="paymentEndDate">
            <el-date-picker
              v-model="queryParams.paymentEndDate"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="付款方式" prop="paymentWay">
            <el-select
              v-model="queryParams.paymentWay"
              placeholder="请选择付款方式"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in zffsFormat"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对账状态" prop="reconStatus">
            <el-select
              v-model="queryParams.reconStatus"
              placeholder="请选择对账状态"
              clearable
              size="small"
              style="width:100%"
            >
              <el-option
                v-for="dict in dzztFormat"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
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
      <el-button
size="mini"
plain
type="primary"
@click="hanldeGetZjReconFile"
>获取中金对账文件</el-button>
      <el-button
size="mini"
plain
type="primary"
@click="hanldeGetJxReconFile"
>解析中金对账文件</el-button>
      <el-button
size="mini"
plain
type="primary"
@click="hanldedz"
>对账</el-button>
    </div>
    <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    <div class="table-tit">对账列表</div>
    <el-table
      v-loading="loading"
      :data="reconData"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="业务流水号" prop="applyno" width="130" />
      <el-table-column
        label="订单创建时间"
        prop="orderCreateDate"
        width="160"
      />

      <el-table-column label="付款时间" prop="paymentDate" width="160" />
      <!-- <el-table-column label="业务流水号" prop="applyno" width="150" /> -->
      <el-table-column label="保函编号" prop="baohanno" width="120" />
      <el-table-column
        label="投标企业名称"
        prop="policyname"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column label="保函状态" prop="guaranteestatus" width="120">
        <template slot-scope="scope">
          {{
            $selectDictLabel(
              $store.getters.dictData.dzbh_db_status || [],
              scope.row.guaranteestatus
            )
          }}
        </template>
      </el-table-column>
      <el-table-column label="支付状态" prop="paystatus" width="120">
        <template slot-scope="scope">
          {{
            $selectDictLabel(
              $store.getters.dictData.dzbh_zfzt || [],
              scope.row.paystatus
            )
          }}
        </template>
      </el-table-column>
      <el-table-column label="担保保额(元)" prop="sumamount" width="120" />
      <el-table-column label="应收保额(元)" prop="sumpremium" width="120" />
      <el-table-column label="实收保费(元)" prop="amount" width="120">
        <template slot-scope="scope">
          {{ scope.row.amount / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="付款方式" prop="paymentWay" width="120">
        <template slot-scope="scope">
          {{
            $selectDictLabel(
              $store.getters.dictData.dzbh_zfsf || [],
              scope.row.paymentWay
            )
          }}
        </template>
      </el-table-column>
      <el-table-column label="对账状态" prop="reconStatus">
        <template slot-scope="scope">
          {{
            $selectDictLabel(
              $store.getters.dictData.dzbh_dzzt || [],
              scope.row.reconStatus
            )
          }}
        </template>
      </el-table-column>
      <el-table-column label="对账结果" prop="reconResult" width="120" />
      <el-table-column label="对账时间" prop="reconDate" width="120" />
      <!-- <el-table-column label="操作" fixed="right" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="clickLedger(scope.row)">
            查看台账
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <div class="table-tit">对账统计数据</div>
    <div class="btn-group">
      <el-button
size="mini"
plain
type="primary"
@click="handleExportReport"
>导出</el-button>
    </div>
    <el-table v-loading="loading" :data="reprotData">
      <el-table-column label="业务结算总笔数" prop="busPayTotal" width="120" />
      <el-table-column
        label="业务应收总保费(元)"
        prop="busYsTotalAmount"
        width="150"
      />
      <el-table-column
        label="业务实收总保费(元)"
        prop="busSsTotalAmount"
        width="150"
      />
      <el-table-column label="业务退保总笔数" prop="busTbTotal" width="120" />
      <el-table-column
        label="业务退款总金额(元)"
        prop="busTkTotalAmount"
        width="150"
      />
      <el-table-column label="总手续费(元)" prop="busTotalSxf" />
      <el-table-column label="对账笔数" prop="reconTotal" />
      <el-table-column label="对账正常笔数" prop="reconZcTotal" />
      <el-table-column label="对账异常笔数" prop="reconYcTotal" />
      <el-table-column label="待对账笔数" prop="reconDdzTotal" />
      <!-- <el-table-column label="操作" fixed="right" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="clickLedger(scope.row)">
            查看台账
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- <pagination
      v-show="tjTotal > 0"
      :total="tjTotal"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
    <template slot="other">
      <!--  自定义组件部分  -->
    </template>

    <!-- 获取中金对账文件对话框 -->
    <el-dialog
      title="获取中金对账文件"
      :visible.sync="openDataScope"
      width="90%"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <el-form
        ref="hqzjForm"
        :inline="true"
        :rules="hqzjdzRules"
        :model="hqzjdzData"
        class="demo-form-inline"
      >
        <el-form-item label="开始日期" prop="kssj">
          <el-date-picker
            v-model="hqzjdzData.kssj"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="jssj">
          <el-date-picker
            v-model="hqzjdzData.jssj"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
type="primary"
@click="onHqzjSubmit('hqzjForm')"
>获取</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 解析中金对账文件对话框 -->
    <el-dialog
      title="解析中金对账文件"
      :visible.sync="openJxDataScope"
      width="90%"
      append-to-body
      style="height: 95%; overflow: auto"
    >
      <el-form
        ref="jxzjForm"
        :inline="true"
        :rules="jxzjdzRules"
        :model="jxzjdzData"
        class="demo-form-inline"
      >
        <el-form-item label="开始日期" prop="jxKssj">
          <el-date-picker
            v-model="jxzjdzData.jxKssj"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="jxJssj">
          <el-date-picker
            v-model="jxzjdzData.jxJssj"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
type="primary"
@click="onJxzjSubmit('jxzjForm')"
>解析</el-button>
        </el-form-item>
      </el-form>
      <el-form
        ref="downForm"
        :inline="true"
        :rules="downRules"
        :model="downData"
        class="demo-form-inline"
      >
        <el-form-item label="下载日期" prop="downDate">
          <el-date-picker
            v-model="downData.downDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
type="primary"
@click="downloadFile('downForm')"
>下载对账文件</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from '@/components/QueryTable/mixins/tableMixin';
import {
  reconList,
  exportRecon,
  queryReconReprot,
  exportReconReprot,
  getZjReconFile,
  jxZjReconFile,
  payRecon
} from '@/api/electGuarantee/query';

import { getToken } from '@/utils/auth';
export default {
  name: 'Reconcile',
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
      hqzjdzData: {},
      jxzjdzData: {},
      downData: {},
      openDataScope: false,
      openJxDataScope: false,
      dialogTableData: [],
      reprotData: {},
      dialogTableRelationData: [],
      statusOptions: [],
      bhztFormat: [],
      zffsFormat: [],
      dzztFormat: [],
      importDialog: false,
      openDataRelation: false,
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
      queryRelationParams: {
        pageNum: 1,
        pageSize: 10
        // lsid: this.detailId
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        paymentStartDate: '',
        paymentEndDate: ''
      },
      // 表格数据
      reconData: [],
      // deleteApi: deleteApi,
      selectRows: [],
      // 总条数
      total: '',
      totalRelation: 0,
      // 复选框
      multipleSelection: [],
      // 查看台账复选框
      multipleSelectionRation: [],
      // 关联台账复选框
      multipleSelectionRationConfirm: [],
      // 挂起参数
      gqParams: {},
      ids: [],
      // 取消关联台账id
      relationIds: [],
      lsid: '',
      // 关联id
      relationIdsRation: [],
      // 显示搜索条件
      showSearch: true,
      runNum: '',
      detailId: '',
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
      },
      multipleSelectionRationCacle: [],
      relationIdsRationCacle: [],
      dzzt: ''
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
    this.getReportList();
  },
  // life cycle end
  methods: {
    // 对账
    hanldedz() {
      if (
        this.queryParams.paymentStartDate == '' ||
        this.queryParams.paymentEndDate == ''
      ) {
        this.$message.warning('请选择支付开始日期和支付结束日期!');
      } else {
        this.$confirm(
          '确定要对账付款时间段为' +
            this.queryParams.paymentStartDate +
            '~' +
            this.queryParams.paymentEndDate +
            '的数据吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            // return exportRecon(queryParams);
            // if (this.queryParams.paymentStartDate != '') {
            //   var paymentStartDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
            //     this.queryParams.paymentStartDate
            //   );
            //   var paymentEndDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
            //     this.queryParams.paymentEndDate
            //   );
            //   var params = {
            //     paymentStartDate: paymentStartDate + ' 00:00:00',
            //     paymentEndDate: paymentEndDate + ' 23:59:59'
            //   };
            // }
            var params = {
              paymentStartDate: this.queryParams.paymentStartDate,
              paymentEndDate: this.queryParams.paymentEndDate
            };
            payRecon(params).then(res => {
              if (res.msg == '对账成功') {
                this.$message.success('对账成功!');
                this.openDataScope = false;
                this.getList();
                this.getReportList();
              } else if (res.msg == 'noFile') {
                this.$message.warning(
                  '没有查询到中金对账数据,请检查是否已经获取中金对账文件且文件中有数据并且解析成功!'
                );
                this.openDataScope = false;
              } else if (res.msg == '对账失败') {
                this.$message.warning('对账失败');
                this.openDataScope = false;
              }
            });
          })
          //   .then(response => {
          //     this.$download(response.msg);
          //   })
          .catch(() => {});
      }
    },

    onHqzjSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getZjReconFile(this.hqzjdzData).then(res => {
            if (res.msg == 'yes') {
              this.$message.success('获取成功!');
              this.openDataScope = false;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 解析中金文件
    onJxzjSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          jxZjReconFile(this.jxzjdzData).then(res => {
            if (res.msg == 'yes') {
              this.$message.success('获取成功!');
              this.openJxDataScope = false;
              this.getList();
              this.getReportList();
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    downloadFile(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // jxZjReconFile(this.jxzjdzData).then(res => {
          //
          //   if (res.msg == 'yes') {
          //     this.$message.success('获取成功!');
          //     this.openJxDataScope = false;
          //   }
          // });
          const url =
            process.env.VUE_APP_BASE_API +
            '/zj/recon/downZjReconFile?' +
            'downDate=' +
            this.downData.downDate;
          window.open(url);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取中金对账文件
    hanldeGetZjReconFile() {
      this.openDataScope = true;
    },
    // 解析中金对账文件
    hanldeGetJxReconFile() {
      this.openJxDataScope = true;
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
          return exportRecon(queryParams);
        })
        .then(response => {
          this.$download(response.msg);
        })
        .catch(() => {});
    },
    // 统计列表导出
    handleExportReport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return exportReconReprot(queryParams);
        })
        .then(response => {
          this.$download(response.msg);
        })
        .catch(() => {});
    },
    getList() {
      debugger;
      // if (this.queryParams.paymentStartDate != '') {
      //   var paymentStartDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
      //     this.queryParams.paymentStartDate
      //   );
      //   var paymentEndDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
      //     this.queryParams.paymentEndDate
      //   );
      //   (this.queryParams.paymentStartDate = paymentStartDate + ' 00:00:00'),
      //   (this.queryParams.paymentEndDate = paymentEndDate + ' 23:59:59');
      // }
      reconList(this.queryParams).then(response => {
        this.reconData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 对账统计数据列表
    getReportList() {
      // if (this.queryParams.paymentStartDate != '') {
      //   var paymentStartDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
      //     this.queryParams.paymentStartDate
      //   );
      //   var paymentEndDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(
      //     this.queryParams.paymentEndDate
      //   );
      //   (this.queryParams.paymentStartDate = paymentStartDate + ' 00:00:00'),
      //   (this.queryParams.paymentEndDate = paymentEndDate + ' 23:59:59');
      // }
      queryReconReprot(this.queryParams).then(response => {
        this.reprotData = response.data;
        this.tjTotal = response.total;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      this.getReportList();
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
