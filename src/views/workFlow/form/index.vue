<template>
  <div>
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getPageList"
      :inline="false"
      :select-rows="selectRows"
      @selects-change="selectRows = $event"
    >
      <template v-if="!isComponent" slot="operating">
        <el-row :gutter="10" class="mb8" style="padding-left:65px">
          <el-col style="margin-bottom:5px" :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="clickAdd">新增</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="table">
        <el-table-column align="center" show-overflow-tooltip label="表单名称" prop="name"></el-table-column>
        <el-table-column align="center" label="创建人" prop="createUserName"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime">
          <template
            slot-scope="scope"
          >{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" width="170" label="操作">
          <template slot-scope="scope">
            <el-col :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-view"
                size="mini"
                @click="handleView(scope.row)"
              >预览</el-button>
            </el-col>
            <el-col v-if="!isComponent" :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-edit"
                size="mini"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
            </el-col>
            <el-col v-if="!isComponent" :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </el-col>
            <el-col v-if="isComponent" :span="8">
              <el-button
                type="text"
                plain
                icon="el-icon-check"
                size="mini"
                @click="handleSelect(scope.row)"
              >选择</el-button>
            </el-col>
          </template>
        </el-table-column>
      </template>
    </query-table>

    <!--表单配置详情-->
    <el-dialog title="表单配置详情" :visible.sync="formConfOpen" width="60%" append-to-body>
      <div class="test-form">
        <form-create v-model="fapi" :rule="formConf.formRule" :option="formConf.formOptions"></form-create>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { form_api } from '@/api/workFlow/index';
import moment from 'moment'
export default {
  name: 'WorkFlowForm',
  components: {
    QueryTable
  },
  props: {
    isComponent: {
      type: Boolean,
      default: () => false
    }
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
      getPageList: form_api.getFormList,
      selectRows: [],
      workFlowNameOptions: [],
      fapi: null,
      formConfOpen: false,
      // 表单配置文件
      formConf: {}
    };
  },
  computed: {
    formData: function () {
      return [
        { label: '流程类别', type: 'select', model: 'vueTxt', dictOptions: this.$store.getters.dictData.workFlow_type || [] },
        { label: '流程名称', type: 'select', model: 'createUser', dictOptions: this.workFlowNameOptions || [] },
        { label: '表单名称', type: 'input', model: 'name' }
      ]
    }
  },
  watch: {
    'queryParams.vueTxt': function (value) {
      console.log(value);
      form_api.getWorkFlowListByTypeId(value).then(res => {
        if (res.code === 200) {
          if (res.data.length) {
            res.data.map(item => {
              item.dictLabel = item.name
              item.dictValue = item.key
            })
            this.workFlowNameOptions = res.data
          }
        }
      })
    }
  },
  mounted() {

  },

  methods: {
    clickAdd() {
      this.$router.push(`/tool/build`)
    },
    handleView(row) {
      console.log('row: ', JSON.parse(row.vueTxt));
      this.formConf = JSON.parse(row.vueTxt)
      this.formConfOpen = true
    },
    handleUpdate(row) {
      this.$router.push({
        path: '/tool/build',
        query: {
          formId: row.formId
        }
      })
    },
    handleDelete(row) {
      this.$confirm(`确定删除所选的${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        form_api.deleteFormById(row.formId).then(res => {
          if (res.code === 200) {
            this.$refs.queryTable.getList()
          }
        })
      })
    },
    handleSelect(row) {
      this.$emit('selectForm', row);
    },
    onSubmit() {

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