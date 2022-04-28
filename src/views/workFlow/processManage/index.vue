<template>
  <div>
    <el-row :gutter="10" class="mb8" style="padding:20px 30px 0">
      <el-col style="margin-bottom:5px" :span="1.5">
        <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="clickAdd">新增</el-button>
      </el-col>
    </el-row>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getPageList"
      :inline="false"
      @selects-change="selectRows = $event"
    >
      <template slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="clickAdd">新增</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" show-overflow-tooltip label="流程类别" prop="name">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel($store.getters.dictData.workFlow_type || [],scope.row.category) }}</template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="流程名称" prop="name"></el-table-column>
        <el-table-column align="center" label="key" prop="key"></el-table-column>
        <el-table-column align="center" label="版本" prop="rev"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime">
          <template
            slot-scope="scope"
          >{{ moment(scope.row.createTime).format('YYYY-MM-DD hh:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" label="最后更新时间">
          <template
            slot-scope="scope"
          >{{ moment(scope.row.lastUpdateTime).format('YYYY-MM-DD hh:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" width="170" label="操作">
          <template slot-scope="scope">
            <el-col :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-edit"
                size="mini"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-s-promotion"
                size="mini"
                @click="handlePublic(scope.row)"
              >发布</el-button>
            </el-col>
          </template>
        </el-table-column>
      </template>
    </query-table>

    <!--表单配置详情-->
    <el-dialog title="添加模型" :visible.sync="addDialogShow" width="920px" append-to-body>
      <el-form ref="form" :model="addForm" :rules="rules" :inline="true" label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="流程类别" prop="category">
              <el-select v-model="addForm.category">
                <el-option
                  v-for="item in $store.getters.dictData.workFlow_type"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="key" prop="key">
              <el-input v-model="addForm.key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="流程简介" prop="metaInfo">
              <el-input v-model="addForm.metaInfo" style="width:770px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="success" size="small" @click="confirmAdd">新增</el-button>
          <el-button type="primary" size="small" @click="addDialogShow=false">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { processApi } from '@/api/workFlow/index';
import moment from 'moment'
import { getToken } from '@/utils/auth'
export default {
  name: 'WorkFlowForm',
  components: {
    QueryTable
  },

  data() {
    return {
      moment,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        vueTxt: undefined,
        createUser: undefined
      },
      getPageList: processApi.getProcessList,
      selectRows: [],
      workFlowNameOptions: [],
      addDialogShow: false,
      rules: {
        category: [{ required: true, message: '流程类别不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '流程名称不能为空', trigger: 'blur' }],
        key: [{ required: true, message: '流程key不能为空', trigger: 'blur' }]
      },
      addForm: {}
    };
  },
  computed: {
    formData: function () {
      return [
        // { label: '流程类别', type: 'select', model: 'vueTxt', dictOptions: this.$store.getters.dictData.workFlow_type || [] },
        // { label: '流程名称', type: 'select', model: 'createUser', dictOptions: this.workFlowNameOptions || [] },
        // { label: '表单名称', type: 'input', model: 'name' }
      ]
    }
  },
  watch: {
    'queryParams.vueTxt': function (value) {
      // console.log(value);
      // processApi.getWorkFlowListByTypeId(value).then(res => {
      //   if (res.code === 200) {
      //     if (res.data.length) {
      //       res.data.map(item => {
      //         item.dictLabel = item.name
      //         item.dictValue = item.key
      //       })
      //       this.workFlowNameOptions = res.data
      //     }
      //   }
      // })
    }
  },
  mounted() {

  },

  methods: {
    clickAdd() {
      this.addDialogShow = true
    },
    confirmAdd() {
      this.$refs.form.validate(validate => {
        if (validate) {
          processApi.addProcess(this.addForm).then(res => {
            if (res.code === 200) {
              window.open(`${this.$iframeBaseUrl}/modeler.html?modelId=${res.data.id}&token=${getToken()}`)
            }
          })
        }
      })
    },
    handleView(row) {
      this.addDialogShow = true
    },
    handleUpdate(row) {
      window.open(`${this.$iframeBaseUrl}/modeler.html?modelId=${row.id}&token=${getToken()}`)
      // this.$router.push({
      //   path: '/tool/build',
      //   query: {
      //     formId: row.formId
      //   }
      // })
    },
    handleDelete(row) {
      this.$confirm(`确定删除所选的${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        processApi.delProcessById(row.id).then(res => {
          if (res.code === 200) {
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    handlePublic(row) {
      this.$confirm(`确定发布${row.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        processApi.publicProcess(row.id).then(res => {
          if (res.code === 200) {
            this.$msgSuccess(res.msg)
            this.$refs.queryTable.getList()
          }
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>