<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-descriptions title="基础信息" style="border-bottom:1px solid #eee">
        <el-descriptions-item label="流程名称">{{ processInfo.name }}</el-descriptions-item>
        <el-descriptions-item
          label="流程类别"
        >{{ $selectDictLabel($store.getters.dictData.workFlow_type || [], processInfo.category) }}</el-descriptions-item>
        <el-descriptions-item
          label="流程简介"
        >{{ processInfo.metaInfo ? JSON.parse(processInfo.metaInfo).description :'' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>表单内容</span>
      </div>
      <form-create
        v-model="fApi"
        :rule="formConf.formRule"
        :option="formConf.formOptions"
        @submit="onSubmit"
      ></form-create>
      <el-row v-if="nodeInfo.outgoingAction" style="padding-left:80px">
        <el-col v-for="item in JSON.parse(nodeInfo.outgoingAction)" :key="item.name" :span="3">
          <el-button type="primary" :loading="btnLoad" @click="onSubmit(item)">{{ item.name }}</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { processApi } from '@/api/process'
import { form_api } from '@/api/workFlow'
import { getToken } from '@/utils/auth'
export default {
  name: 'CydbForntedDealprocess',
  components: {
  },
  props: {
    processInfo: {
      type: Object,
      default: () => {

      }
    }
  },
  data() {
    return {
      fApi: {},
      nodeInfo: {},
      formConf: {
        formRule: [],
        formOptions: {}
      },
      btnLoad: false,
      historyForm: []
    };
  },
  mounted() {
    this.queryLinkConfig(this.processInfo.key, this.processInfo.linkId)
  },

  methods: {
    queryLinkConfig(flowId, linkId) {
      const queryData = {
        flowId: flowId
      }
      // 是否是发起节点，有Linkid则是第发起节点，否则则是处理节点
      if (linkId) {
        queryData.linkId = linkId
      } else {
        queryData.assigneeTaskKey = 'start'
      }
      processApi.queryLinkConfig(queryData).then(res => {
        this.nodeInfo = res.data
        console.log(JSON.parse(this.nodeInfo.outgoingAction));
        if (res.data.formId) {
          form_api.getFormByFormId(res.data.formId).then(res => {
            if (res.code === 200) {
              this.formConf = JSON.parse(res.data.vueTxt)
              this.formConf.formOptions.submitBtn = false
              this.$nextTick(() => {
                this.changeFormRule(this.fApi)
              });
              if (this.processInfo.processInstanceId) {
                this.queryCurrentNodeFormData(this.processInfo.processInstanceId)
              }
            }
          })
        }
      })
    },
    onSubmit(actionName) {
      this.btnLoad = true
      const processData = {
        action: actionName.id,
        actionName: actionName.name,
        formData: JSON.stringify(this.fApi.form)
      }
      //  是否是发起节点
      if (this.processInfo.linkId) {
        const { processInstanceId, id } = this.processInfo
        processApi.completeTask(processInstanceId, id, processData).then(res => {
          if (res.code === 200) {
            this.btnLoad = false
            if (res.data.msg === 'success') {
              this.$msgSuccess('操作成功')
              this.$emit('parentShow');
            } else {
              this.$msgError(res.data.msg)
            }
          }
        })
      } else {
        processApi.startProcess(this.processInfo.key, processData).then(res => {
          if (res.code === 200) {
            this.btnLoad = false
            if (res.data.msg === 'success') {
              this.$msgSuccess('操作成功')
              this.$emit('parentShow');
            } else {
              this.$msgError(res.data.msg)
            }
          }
        })
      }
    },
    changeSelectLable(dictCode) {
      const dictList = this.$store.getters.dictData[dictCode]
      dictList.map(item => {
        item.label = item.dictLabel
        item.value = item.dictValue
      })
      return dictList
    },
    changeFormRule(obj) {
      const rules = obj.model()
      console.log('rules: ', rules);
      for (const key in rules) {
        if (Object.hasOwnProperty.call(rules, key)) {
          if (rules[key].type === 'upload') {
            console.log('rules[key]: ', rules[key]);
            obj.mergeRule(key, {
              props: {
                action: `${process.env.VUE_APP_BASE_API}/loan/uploadFiles/multifileUpload`,
                headers: {
                  Authorization: 'Bearer ' + getToken()
                },
                name: 'files',
                onSuccess: function (res, file, fileList) {
                  file.url = res.data[0].filePath
                }
              }
            })
          }
          if (rules[key].type === 'select') {
            let selectDictCode = ''
            console.log('rules[key]: ', rules[key]);
            if (rules[key].effect) {
              selectDictCode = rules[key].effect.fetch.action
              obj.updateRule(key, {
                props: {
                  headers: {
                    Authorization: 'Bearer ' + getToken()
                  }
                },
                // options: [{ label: 'aaa', value: '0' }, { label: 'bbb', value: '1' }]
                options: this.changeSelectLable(selectDictCode)
              })
            }
            delete rules[key].effect
          }
        }
      }
    },
    // 查询当前表单
    queryCurrentNodeFormData(processInstanceId) {
      processApi.queryLinkFormData(processInstanceId).then(res => {
        if (res.code === 200) {
          this.fApi.coverValue(JSON.parse(res.data[0]))
          const fileds = this.fApi.fields()
          fileds.map(item => {
            this.fApi.disabled(true, item)
          })
        }
      })
    },
    // 查询历史表单
    queryHistoryForm(processInstanceId, id) {
      processApi.queryHistoryForm(processInstanceId, id).then(res => {
        if (res.code === 200) {
          this.historyForm = res.data
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
.card-header {
  span {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>