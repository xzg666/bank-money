<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :form-style="queryFormStyle"
      :select-rows="selectRows"
      :inline="false"
      @selects-change="selectRows = $event"
      @cell-dblclick="cellDbClick"
    >
      <template slot="operating">
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-checkbox v-model="queryParams.allData" label="全部数据" border size="small" />
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              size="mini"
              plain
              icon="el-icon-chat-dot-square"
              @click="sendMessage"
            >发送短信</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              size="mini"
              plain
              icon="el-icon-chat-dot-square"
              @click="sendAll"
            >全量发送</el-button>
          </el-col>
          <!--
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="sendFile"
            >发函申请</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:role:edit']"
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="lawsuitApply"
            >诉讼申请</el-button>
          </el-col>-->
        </el-row>
      </template>
      <template slot="table">
        <!-- <el-table-column align='center' type="selection" width="55"/> -->
        <el-table-column
          align="center"
          label="分派处理账号"
          prop="fpclrzh"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column
          align="center"
          label="客户姓名"
          prop="xingming"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column align="center" label="催收类型" prop="cslx" width="100">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel(collectionTypeOptions , scope.row.cslx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="催收方式" width="120">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel(collectionModeOptions , scope.row.csfs) }}</template>
        </el-table-column>
        <el-table-column align="center" label="登记账号" prop="djrzh" width="150" />
        <el-table-column align="center" label="待办状态" prop="dbzt" width="150">
          <template slot-scope="scope">{{ $selectDictLabel(todoStatusOptions , scope.row.dbzt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="工单流当前环节" prop="gdldqlzhj" width="150" />
        <el-table-column align="center" label="待办创建时间" prop="dbcjsj" width="170">
          <template
            slot-scope="scope"
          >{{ scope.row.dbcjsj ? $parseTime(new Date(scope.row.dbcjsj)) : '' }}</template>
        </el-table-column>
        <el-table-column align="center" label="待办完成时间" prop="dbwcsj" width="170">
          <template
            slot-scope="scope"
          >{{ scope.row.dbwcsj ? $parseTime(new Date(scope.row.dbwcsj)) : '' }}</template>
        </el-table-column>
        <el-table-column align="center" label="催收日期" prop="csrq" width="130" />
        <el-table-column align="center" label="要求完成时间" prop="dbyqwcsj" width="130" />
        <el-table-column align="center" label="待办类型" prop="dblx" width="130">
          <template slot-scope="scope">{{ $selectDictLabel(todoTypeOption , scope.row.dblx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="业务类型" prop="ywlx" width="100">
          <template slot-scope="scope">{{ $selectDictLabel(businessTypeOptions , scope.row.ywlx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="发起方式" prop="fqfs" width="100">
          <template slot-scope="scope">{{ $selectDictLabel(startTypeOptions , scope.row.fqfs) }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" label="任务批次号" prop="rwpch" width="100" /> -->
        <el-table-column align="center" label="任务场景" prop="rwcj" width="100" />
        <!-- <el-table-column align='center' label="处理人数" prop="rwclrs" width="100" /> -->
        <el-table-column align="center" label="贷款管理部" prop="dkglb" width="100">
          <template slot-scope="scope">{{ $selectDictLabel(glbOptions , scope.row.dkglb) }}</template>
        </el-table-column>
        <el-table-column align="center" label="紧急程度" prop="jjcd" width="100" />
      </template>
    </query-table>
    <!-- 催收登记对话框 -->
    <div v-if="openDataScope">
      <el-dialog
        title="公积金催收登记详情"
        :visible.sync="openDataScope"
        width="92%"
        append-to-body
        style="height:95%; overflow:auto"
      >
        <dialog-body :select-rows="selectRows[0]" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { toDoTaskManage } from '@/api/toDoTask/manageList';
import DialogBody from '../urgeRegister/register/component/dialogBody.vue';
export default {
  name: 'RuoyiUiMessagestastics',

  components: { QueryTable, DialogBody },

  directives: {},
  provide() {
    return {
      selectRowsa: this.selectRows
    };
  },
  data() {
    return {
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      autoRelation: false,
      getData: toDoTaskManage.getList,
      collectionTypeOptions: [],
      collectionModeOptions: [],
      todoStatusOptions: [],
      todoTypeOption: [],
      businessTypeOptions: [],
      startTypeOptions: [],
      glbOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        allData: false,
        cslx: '',
        csfs: '',
        dbzt: '',
        djrzh: '',
        rwpch: '',
        dkglb: '',
        fqfs: ''
      },
      selectRows: [],
      openDataScope: false
    };
  },
  computed: {
    formData() {
      return [
        {
          label: '催收类型', model: 'cslx', type: 'select',
          dictOptions: this.collectionTypeOptions
        },
        {
          label: '催收方式', model: 'csfs', type: 'select',
          dictOptions: this.collectionModeOptions
        },
        {
          label: '待办状态', model: 'dbzt', type: 'select',
          dictOptions: this.todoStatusOptions
        },
        { label: '登记账号', model: 'djrzh' },
        { label: '任务批次号', model: 'rwpch' },
        {
          label: '贷款管理部', model: 'dkglb', type: 'select',
          dictOptions: this.glbOptions
        },
        {
          label: '待办发起方式', model: 'fqfs', type: 'select',
          dictOptions: this.startTypeOptions
        }
      ]
    }
  },
  created() {
    this.$getDicts('collection_type').then((response) => {
      this.collectionTypeOptions = response.data;
    });
    this.$getDicts('collection_mode').then((response) => {
      this.collectionModeOptions = response.data;
    });
    this.$getDicts('todo_status').then((response) => {
      this.todoStatusOptions = response.data;
    });
    this.$getDicts('todo_type').then((response) => {
      this.todoTypeOption = response.data;
    });
    this.$getDicts('business_type').then((response) => {
      this.businessTypeOptions = response.data;
    });
    this.$getDicts('start_type').then((response) => {
      this.startTypeOptions = response.data;
    });
    this.$getDicts('dkglb').then((response) => {
      this.glbOptions = response.data;
    });
  },
  mounted() {

  },

  methods: {
    selectionChange(rows) {
      console.log(rows)
    },
    cellDbClick(row, column, cell, event) {
      // 双击功能暂时隐藏
      // if (column.property === 'xingming') {
      //   this.selectRows = [row]
      //   this.clickOverdue()
      // }
    },
    clickOverdue() {
      if (this.selectRows.length !== 1) {
        this.$msgError('请选择一条数据');
        return;
      }
      this.openDataScope = true;
    },
    sendMessage() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据！')
        return
      } else {
        if (this.selectRows.some(item => item.csfs !== '1' || item.dbzt !== '1')) {
          this.$msgError('选中包含非待处理状态或不为短信催收方式的数据，请重新选择！')
          return
        } else {
          this.$confirm(`当前共选中${this.selectRows.length}条短信催收任务，是否发送?`, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const arr = []
            this.selectRows.map(item => {
              arr.push(item.id)
            })
            const ids = arr.join()
            toDoTaskManage.sendMessage({ ids }).then(res => {
              if (res.code === 200) {
                this.$refs.queryTable.getList()
                this.$msgSuccess(`发送短信成功：${res.data.successNum}条，"+"发送短信失败：${res.data.failNum}条,有${res.data.exitsNum}条为非待办状态!`)
              }
            })
          })
        }
      }
    },
    sendAll() {
      this.$confirm(`确定将当前工号 ${this.$store.state.user.nickName} 下的短信催收任务全量发送?`, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        toDoTaskManage.sendAllMessage().then(res => {
          if (res.code === 200) {
            this.$refs.queryTable.getList()
            this.$msgSuccess(res.msg)
          }
        })
      })
    },
    sendFile() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据！')
        return
      } else {
        if (this.selectRows.some(item => item.csfs !== '4' || item.dbzt !== '0')) {
          this.$msgError('选中包含非待审核状态或不为发函催收方式的数据，请重新选择！')
          return
        } else {
          this.$confirm(`当前共选中${this.selectRows.length}条发函催收任务，是否发起发函工单流?`, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const arr = []
            this.selectRows.map(item => {
              arr.push(item.id)
            })
            const ids = arr.join()
            toDoTaskManage.sendFile({ ids }).then(res => {
              if (res.code === 200) {
                this.$refs.queryTable.getList()
                this.$msgSuccess(`发起发函工单流成功`)
              } else {
                this.$msgError('发起发函工单流失败')
              }
            })
          })
        }
      }
    },
    lawsuitApply() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据！')
        return
      } else {
        if (this.selectRows.some(item => item.csfs !== '5' || item.dbzt !== '1')) {
          this.$msgError('选中包含非待处理状态或不为诉讼催收方式的数据')
          return
        } else {
          this.$confirm(`当前共选中${this.selectRows.length}条诉讼催收任务，是否发起诉讼工单流?`, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const arr = []
            this.selectRows.map(item => {
              arr.push(item.id)
            })
            const ids = arr.join()
            toDoTaskManage.lawsuitApply({ ids }).then(res => {
              if (res.code === 200) {
                this.$refs.queryTable.getList()
                this.$msgSuccess(`发起诉讼工单流成功`)
              } else {
                this.$msgError('发起诉讼工单流失败')
              }
            })
          })
        }
      }
    }

  }
};
</script>

<style lang="scss" scoped>
</style>
