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
    >
      <template slot="operating">
        <el-col :span="1.5" :push="1">
          <el-button
            v-hasPermi="['system:role:edit']"
            type="primary"
            size="mini"
            plain
            icon="el-icon-chat-dot-square"
            @click="changeTask"
          >任务改派</el-button>
        </el-col>
        <el-col :span="1.5" :push="1">
          <el-button
            v-hasPermi="['system:role:edit']"
            type="primary"
            size="mini"
            plain
            icon="el-icon-remove"
            @click="cancel"
          >取消待办</el-button>
        </el-col>
        <el-col :span="1.5" :push="1">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-user-solid"
            @click="selectDealPerson"
          >指定实际处理人</el-button>
        </el-col>
        <el-col :span="1.5" :push="1">
          <el-button type="primary" size="mini" plain icon="el-icon-s-custom" @click="clickAudit">审核</el-button>
        </el-col>
      </template>
      <template slot="table">
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
          >{{ $selectDictLabel($store.getters.dictData.collection_type || [],scope.row.cslx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="催收方式" prop="csfs" width="120">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.collection_mode || [],scope.row.csfs) }}</template>
        </el-table-column>
        <el-table-column align="center" label="登记账号" prop="djrzh" width="150" />
        <el-table-column align="center" label="待办状态" prop="dbzt" width="150">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.todo_status || [],scope.row.dbzt) }}</template>
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
        <el-table-column align="center" label="要求完成时间" prop="dbyqwcsj" width="170" />
        <el-table-column align="center" label="待办类型" prop="dblx" width="100">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.todo_type || [],scope.row.dblx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="业务类型" prop="ywlx" width="100">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.business_type || [],scope.row.ywlx) }}</template>
        </el-table-column>
        <el-table-column align="center" label="发起方式" prop="fqfs" width="100">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.start_type || [],scope.row.fqfs) }}</template>
        </el-table-column>
        <el-table-column align="center" label="任务批次号" prop="rwpch" width="100" />
        <el-table-column align="center" label="任务场景" prop="rwcj" width="100" />
        <!-- <el-table-column align="center" label="处理人数" prop="rwclrs" width="100" /> -->
        <el-table-column align="center" label="贷款管理部" prop="dkglb" width="100" />
        <el-table-column align="center" label="紧急程度" prop="jjcd" width="100" />
      </template>
    </query-table>
    <el-dialog
      title="选择处理人"
      :visible.sync="dialogShwo"
      width="80%"
      append-to-body
      style="height:95%; overflow:auto"
    >
      <user-select @selectionChange="selectUsers = $event"></user-select>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择指定处理人"
      :visible.sync="appiontDialogShwo"
      width="50%"
      append-to-body
      style="height:95%; overflow:auto"
    >
      <el-form>
        <el-form-item label="选择处理人">
          <el-select v-model="appiontForm.appiontUser" clearable filterable>
            <el-option
              v-for="item in SameCityUserOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button size="mini" type="primary" @click="submitAppiontUser">确 定</el-button>
        <el-button size="mini" @click="appiontDialogShwo=false">取 消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import UserSelect from '@/components/UserSelect';
import { toDoTaskAudit } from '@/api/toDoTask/auditTask';
import { commonApi } from '@/api/common';
export default {

  name: 'Audit',

  components: { QueryTable, UserSelect },

  directives: {},

  data() {
    return {
      dialogShwo: false,
      appiontDialogShwo: false,
      SameCityUserOptions: [],
      appiontForm: {
        appiontUser: ''
      },
      // 查询表单样式
      queryFormStyle: {
        'label-width': '130px',
        'label-position': 'right',
        'form-item': {
          width: '100%'
        }
      },
      getData: toDoTaskAudit.getList,
      selectUsers: [],
      selectRows: [],
      provinceOptions: [],
      cityDicts: [],
      areaDicts: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cslx: '',
        csfs: '',
        dbzt: '',
        registerNumber: '',
        rwpch: '',
        department: '',
        launchType: '',
        address: '',
        address1: '',
        address2: ''
      }
    };
  },
  computed: {
    formData() {
      return [
        {
          label: '催收类型', model: 'cslx', type: 'select',
          dictOptions: this.$store.getters.dictData.collection_type || []
        },
        {
          label: '催收方式', model: 'csfs', type: 'select',
          dictOptions: this.$store.getters.dictData.collection_mode || []
        },
        {
          label: '待办状态', model: 'dbzt', type: 'select',
          dictOptions: this.$store.getters.dictData.todo_status || []
        },
        { label: '催收登记号', model: 'registerNumber' },
        { label: '任务批次号', model: 'rwpch' },
        {
          label: '贷款管理部', model: 'department', type: 'select',
          dictOptions: this.$store.getters.dictData.dkglb || []
        },
        {
          label: '发起方式', model: 'launchType', span: 6, type: 'select',
          dictOptions: this.$store.getters.dictData.start_type || []
        },
        {
          label: '省', model: 'address', type: 'select',
          dictOptions: this.provinceOptions
        },
        {
          label: '市', model: 'address1', type: 'select',
          dictOptions: this.cityDicts
        },
        {
          label: '县/区', model: 'address2', type: 'select',
          dictOptions: this.areaDicts
        }
      ]
    }
  },
  watch: {
    'queryParams.address': function (id) {
      commonApi.getCity(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.cityName
            item.dictValue = item.cityId
          })
          this.cityDicts = res.data
        }
      })
    },
    'queryParams.address1': function (id) {
      commonApi.getArea(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.districtName
            item.dictValue = item.districtId
          })
          this.areaDicts = res.data
        }
      })
    }
  },
  created() {
    commonApi.getProvince().then(res => {
      if (res.code === 200) {
        res.data.map(item => {
          item.dictLabel = item.provinceName
          item.dictValue = item.provinceId
        })
        this.provinceOptions = res.data
      }
    })
    toDoTaskAudit.querySameCityUserList().then(res => {
      if (res.code === 200) {
        res.data.map(item => {
          item.dictLabel = item.nickName
          item.dictValue = item.userName
        })
        this.SameCityUserOptions = res.data
      }
    })
  },
  mounted() {
  },
  methods: {
    changeTask() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据')
        return
      } else {
        if (this.selectRows.some(item => '2,3,4,5'.indexOf(item.dbzt) !== -1)) {
          this.$msgError('选择数据中含有处理完成或取消的数据，请重新选择！')
          return
        } else {
          this.dialogShwo = true
        }
      }
    },
    // 弹出框确认
    submitForm() {
      if (this.selectUsers.length === 0) {
        this.$msgInfo('请选择转办人!')
        return
      }
      this.$confirm(`当前共选中${this.selectRows.length}条任务，是否改派?`, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const arr = []
        const userArr = []
        this.selectRows.map(item => {
          arr.push(item.id)
        })
        this.selectUsers.map(item => {
          userArr.push(item)
        })
        const ids = arr.join()
        const userNames = userArr.join()
        toDoTaskAudit.changeTask({ ids, userNames }).then(res => {
          if (res.code === 200) {
            this.$refs.queryTable.getList()
            this.dialogShwo = false
            this.$msgSuccess(res.msg)
          }
        })
      })
    },
    cancel() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据！')
        return
      } else {
        this.$confirm(`当前共选中${this.selectRows.length}条任务，是否取消?`, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const arr = []
          this.selectRows.map(item => {
            arr.push(item.id)
          })
          const ids = arr.join()
          toDoTaskAudit.cancel({ ids }).then(res => {
            if (res.code === 200) {
              this.$refs.queryTable.getList()
              this.$msgSuccess(res.msg)
            }
          })
        })
      }
    },
    selectDealPerson() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据')
        return
      }
      if (this.selectRows.some(item => item.csfs !== '3')) {
        this.$msgError('所选数据包含催收类型为非上门催收!')
        return
      }
      if (this.selectRows.some(item => item.dbzt !== '1')) {
        this.$msgError('所选数据包含状态为非待处理!')
        return
      }
      this.appiontDialogShwo = true
    },
    clickAudit() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据')
        return
      }
      if (this.selectRows.some(item => item.dbzt !== '0')) {
        this.$msgError('所选数据包含审核状态为非待审核!')
        return
      }
      const ids = []
      this.selectRows.map(item => {
        ids.push(item.id)
      })
      this.$confirm(`确定审核所选的${this.selectRows.length}条数据？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        toDoTaskAudit.auditTask(ids.toString()).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          } else {
            this.$msgError(res.msg)
          }
        })
      }).catch(() => { })
    },
    submitAppiontUser() {
      this.selectRows.map(item => {
        item.sjclr = this.appiontForm.appiontUser
      })
      console.log('aaa', this.selectRows);
      toDoTaskAudit.saveAppiontUser(this.selectRows).then(res => {
        if (res.code === 200) {
          this.appiontDialogShwo = false
          this.$refs.queryTable.getList()
          this.$msgSuccess(res.msg)
        } else {
          this.$msgError(res.msg)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
