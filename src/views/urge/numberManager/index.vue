<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :inline="false"
      :select-rows="selectRows"
      @selects-change="selectRows = $event"
      @queryResult="getQueryResult"
    >
      <template slot="operating">
        <el-row :gutter="10" class="mb8 mt10" style="padding-left:65px">
          <!-- <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-delete"
              @click="clickExport"
            >编号删除</el-button>
          </el-col>-->
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addNumber">编号新增</el-button>
          </el-col>
          <!-- <el-col style="margin-bottom:5px" :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="clickExport"
            >修改编号</el-button>
          </el-col>-->
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-checkbox v-model="switchValue" size="mini" border>修改排序</el-checkbox>
          </el-col>
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" width="170" show-overflow-tooltip label="ID" prop="id"></el-table-column>
        <el-table-column align="center" width="170" label="编号排序" prop="orderNumber"></el-table-column>
        <el-table-column align="center" width="170" label="关联工号" prop="userName"></el-table-column>
        <el-table-column align="center" width="100" label="工号名称" prop="userNickname"></el-table-column>
        <el-table-column align="center" width="150" label="任务数量" prop="taskNum"></el-table-column>
        <el-table-column align="center" width="150" label="编号上移">
          <template v-if="switchValue===true" slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-top"
              circle
              @click="upMove(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="编号下移">
          <template v-if="switchValue===true" slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-bottom"
              circle
              @click="upDown(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="编号状态" prop="status">
          <template slot-scope="scope">{{ $selectDictLabel(numberStatus || [],scope.row.status) }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="170"
          show-overflow-tooltip
          label="修改时间"
          prop="createTime"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="350">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="clickEdit(scope.row)">编辑 |</el-button>
            <el-button type="text" size="small" @click="clickDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </query-table>
    <el-dialog :visible.sync="dialogShow" :title="dialogTitle" append-to-body>
      <el-form ref="form" v-model="dialogFormData" label-width="80px" inline>
        <el-form-item label="编号序号" prop="orderNumber">
          <el-input v-model="dialogFormData.orderNumber" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="编号状态" prop="status">
          <el-select v-model="dialogFormData.status" style="width:200px">
            <el-option
              v-for="item in numberStatus"
              :key="item.dictValue"
              :value="item.dictValue"
              :label="item.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联工号" prop="userName">
          <!-- <el-select v-model="dialogFormData.userName" style="width:200px">
            <el-option v-for="item in urgeUserList" :key="item" :value="item" :label="item"></el-option>
          </el-select>-->
          <el-input
            v-model="dialogFormData.userName"
            size="mini"
            style="width:200px"
            @focus="focusDealPerson"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号名称" prop="userNickname">
          <el-input v-model="dialogFormData.userNickname" disabled style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button size="mini" type="warning" @click="dialogShow=false">取消</el-button>
        <el-button size="mini" type="primary" @click="confirm">确定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="userDialogShow" title="选择人员" width="1000px" append-to-body>
      <user-select @userConfirm="userConfirm" @cancel="userDialogShow=false"></user-select>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import userSelect from '@/components/UserSelectByTree'
import numberApi from '@/api/urge/number.js'
export default {
  name: 'NumberManager',

  components: { QueryTable, userSelect },

  data() {
    return {
      switchValue: false,
      dialogShow: false,
      userDialogShow: false,
      dialogTitle: '新增编号',
      getData: numberApi.getPageList,
      currentTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        zxsxrq: undefined,
        zxgqrq: undefined,
        userNickname: undefined,
        orderNumber: undefined,
        fzOrg: undefined,
        blrq: undefined
      },
      numberStatus: [
        { dictLabel: '有效', dictValue: '1' },
        { dictLabel: '无效', dictValue: '2' }
      ],
      selectUser: {},
      urgeUserList: [],
      dialogFormData: {
        orderNumber: ''
      },
      selectRows: [],
      exportIcon: 'el-icon-download'
      // getData: guaranteeSendApi.getPageList
    };
  },
  computed: {
    formData: function () {
      return [
        {
          label: '关联工号', model: 'userName'
        },
        { label: '工号名称', model: 'userNickname' },
        { label: '编号序号', model: 'orderNumber' },
        {
          label: '编号状态', type: 'select', model: 'status', dictOptions: this.numberStatus
        }
      ]
    }
  },
  mounted() {
    this.getUrgeUserOptions()
  },

  methods: {
    getQueryResult(queryData) {
      if (queryData.code === 200) {
        this.currentTotal = queryData.total
      }
    },
    getPageList(data) {
      // 处理页面请求参数
      const paramsData = {}
      paramsData.gysmc = data.gysmc
      paramsData.sendStatus = data.sendStatus
      paramsData.fzOrg = data.fzOrg
      paramsData.pageNum = data.pageNum
      paramsData.pageSize = data.pageSize
      if (data.timeType === '1') {
        paramsData.zxyxStart = data.startTime
        paramsData.zxyxEnd = data.endTime
      } else {
        paramsData.blrqStart = data.startTime
        paramsData.blrqEnd = data.endTime
      }
      // return guaranteeSendApi.getPageList(paramsData)
    },
    // 编号新增
    async addNumber() {
      this.dialogTitle = '新增编号'
      // for (const key in this.dialogFormData) {
      //   if (Object.hasOwnProperty.call(this.dialogFormData, key)) {
      //     this.dialogFormData[key] = ''
      //   }
      // }
      const { data } = await numberApi.getNewOrderNumber()
      console.log('data: ', data);
      this.dialogFormData = {
        orderNumber: data
      }
      this.dialogShow = true
    },
    async getUrgeUserOptions() {
      const res = await numberApi.getSysNameList()
      if (res.code === 200) {
        this.urgeUserList = res.data
      }
    },
    focusDealPerson() {
      this.userDialogShow = true
    },
    userConfirm(data) {
      const { userName, nickName } = data[0]
      this.dialogFormData.userName = userName
      this.dialogFormData.userNickname = nickName
      this.userDialogShow = false
    },
    confirm() {
      const tempData = this.dialogFormData
      let url = `/collectUser/add`
      if (this.dialogFormData.id) {
        url = `/collectUser/update`
      }
      numberApi.operationNumber(url, tempData).then(res => {
        if (res.code === 200) {
          this.$msgSuccess(res.msg)
          this.dialogShow = false
          this.$refs.queryTable.getList()
        }
      })
    },
    clickDel(row) {
      this.$confirm(`确定删除编号 ${row.orderNumber} 这条数据?`, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        numberApi.delNumber(row.id).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    clickEdit(row) {
      this.dialogTitle = '编辑'
      this.dialogShow = true
      this.dialogFormData = Object.assign({}, row)
    },
    upMove(id) {
      numberApi.upSort(id).then(res => {
        if (res.code === 200) {
          this.$msgSuccess(res.msg)
          this.$refs.queryTable.getList()
        } else {
          this.$msgError(res.msg)
        }
      })
    },
    upDown(id) {
      numberApi.downSort(id).then(res => {
        if (res.code === 200) {
          this.$msgSuccess(res.msg)
          this.$refs.queryTable.getList()
        } else {
          this.$msgError(res.msg)
        }
      })
    },
    clickExport() {

    },
    exportDetail(Obj) {

    },
    getSelectRowsIdList(arr) {
      const tempList = []
      let str = ''
      arr.map(item => {
        tempList.push(item.id)
      })
      str = tempList.toString()
      return str
    }
  }
};
</script>

<style lang="scss" scoped>
</style>