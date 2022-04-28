<template>
  <div class="app-container">
    <query-table
      ref="queryTable"
      :query-params="queryParams"
      :form-data="formData"
      :get-data="getData"
      :inline="false"
      :form-style="queryFormStyle"
      :select-rows="selectRows"
      @selects-change="selectRows = $event"
    >
      <template slot="operating">
        <el-col :span="6" :push="1">
          <el-button
            v-hasPermi="['system:role:add']"
            type="primary"
            plain
            size="mini"
            icon="el-icon-s-promotion"
            @click="reSendMessage"
          >重新发送</el-button>
        </el-col>
      </template>
      <template slot="table">
        <el-table-column
          align="center"
          label="短信模板ID"
          prop="sendDxMbId"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="发送的借款合同编号"
          prop="sendJkhtbh"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column
          align="center"
          label="催收类型"
          prop="sendCsLxName"
          :show-overflow-tooltip="true"
          width="150"
        />
        <el-table-column align="center" label="发送业务类型名称" prop="sendYwLxName" width="150" />
        <el-table-column align="center" label="发送对象" prop="sendObj" width="120" />
        <el-table-column align="center" label="发送状态" prop="sendStatus" width="150">
          <template
            slot-scope="scope"
          >{{ $selectDictLabel(sendStatusOptions,scope.row.sendStatus) }}</template>
        </el-table-column>
        <el-table-column align="center" label="发送对象号码" prop="sendObjMobile" width="130" />
        <el-table-column
          align="center"
          label="发送类容"
          prop="sendContent"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="发送备注" prop="sendBz" width="130" />
        <el-table-column align="center" label="发送人" prop="sendUser" width="130" />
        <el-table-column align="center" label="回执时间" prop="sendHzDate" width="160" />
        <el-table-column align="center" label="发送时间" prop="startSendDate" width="160" />
      </template>
    </query-table>
  </div>
</template>

<script>
import QueryTable from '@/components/QueryTable';
import { messageStaticsApi } from '@/api/urge/register';
import { mapGetters } from 'vuex'
export default {
  name: 'Messagestastics',

  components: { QueryTable },

  directives: {},

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
      selectRows: [],
      getData: messageStaticsApi.getMseeageStaticsList,
      sendStatusOptions: [
        { dictValue: '1', dictLabel: '发送成功' },
        { dictValue: '0', dictLabel: '发送失败' }
      ],
      queryParams: {
        startSendDate: undefined,
        sendHzDate: undefined,
        sendCsLx: undefined,
        sendYwLx: undefined,
        sendStatus: undefined,
        sendObj: undefined,
        sendObjMobile: undefined,
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapGetters(['dictData']),
    formData: function () {
      return [
        { label: '发送时间', type: 'date', model: 'startSendDate' },
        { label: '回执时间', type: 'date', model: 'sendHzDate' },
        {
          label: '催收类型', model: 'sendCsLx', type: 'select',
          dictOptions: this.dictData.collection_type || []
        },
        {
          label: '业务类型', model: 'sendYwLx', type: 'select',
          dictOptions: this.dictData.business_type || []
        },
        {
          label: '发送状态', model: 'sendStatus', type: 'select',
          dictOptions: this.sendStatusOptions || []
        },
        { label: '发送对象', model: 'sendObj' },
        { label: '发送对象手机号', model: 'sendObjMobile' }
      ]
    }
  },
  mounted() {

  },

  methods: {
    reSendMessage() {
      if (this.selectRows.length === 0) {
        this.$msgError('请选择数据!')
        return
      }
      this.$confirm(`确定对选中的${this.selectRows.length}条数据重新发送短信?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          messageStaticsApi.reSendMessage(this.selectRows).then(res => {
            console.log('res: ', res);
            if (res.code === 200) {
              this.$msgSuccess(res.msg)
            }
          })
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
