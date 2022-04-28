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
    <el-card v-for="(item,index) in historyForm" :key="index" class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>{{ item.name }}</span>
        <span class="node-info-text">{{ item.userName }}</span>
        <span class="node-info-text">{{ moment(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <form-create
        v-if="item.vueTxt"
        :ref="`formCreate_${index}`"
        v-model="formCreateObj[`fApi_${index}`]"
        :rule="item.vueTxt.formRule"
        :option="item.vueTxt.formOptions"
      ></form-create>
    </el-card>
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>表单内容</span>
      </div>
      <form-create
        v-model="fApi"
        :rule="formConf.formRule"
        :option="formConf.formOptions"
        @submit="onSubmit"
      ></form-create>
    </el-card>-->
  </div>
</template>

<script>
import { processApi } from '@/api/process'
// import { form_api } from '@/api/workFlow'
import moment from 'moment';
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
      moment,
      fApi: {},
      nodeInfo: {},
      formConf: {
        formRule: [],
        formOptions: {}
      },
      btnLoad: false,
      formCreateObj: {

      },
      historyForm: [
        {
          formRule: [],
          formOptions: {}
        }
      ]
    };
  },
  mounted() {
    this.queryLinkConfig(this.processInfo.key, this.processInfo.linkId)
    this.queryHistoryForm(this.processInfo.processInstanceId, this.processInfo.id)
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
      // 查询当前那表单
      // processApi.queryLinkConfig(queryData).then(res => {
      //   this.nodeInfo = res.data
      //   console.log(JSON.parse(this.nodeInfo.outgoingAction));
      //   if (res.data.formId) {
      //     form_api.getFormByFormId(res.data.formId).then(res => {
      //       if (res.code === 200) {
      //         this.formConf = JSON.parse(res.data.vueTxt)
      //         this.formConf.formOptions.submitBtn = false
      //       }
      //     })
      //   }
      // })
    },
    onSubmit(actionName) {
      console.log('data: ', this.fApi.form)
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
            } else {
              this.$msgError(res.msg)
            }
          }
        })
      } else {
        processApi.startProcess(this.processInfo.key, processData).then(res => {
          if (res.code === 200) {
            this.btnLoad = false
            if (res.data.msg === 'success') {
              this.$msgSuccess('操作成功')
            } else {
              this.$msgError(res.msg)
            }
          }
        })
      }
    },
    // 查询历史表单
    queryHistoryForm(processInstanceId, id) {
      processApi.queryHistoryForm(processInstanceId, id).then(res => {
        if (res.code === 200) {
          // 删除当前节点的表单
          // res.data.shift()
          // 循环表单结构用于页面渲染表单
          res.data.map((item, index) => {
            // 创建每个表单绑定的对象，用于下面给表单赋值
            this.$set(this.formCreateObj, `fApi_${index}`, {});
            // 解析接口返回的表单结构
            item.vueTxt = JSON.parse(item.vueTxt)
            // 隐藏默认的提交按钮
            item.vueTxt.formOptions.submitBtn = false
            // item.vueTxt.formRule.map(ele => {
            //   ele.value = JSON.parse(resopnse.data[index])[ele.field]
            //   ele.props = {
            //     disabled: true
            //   }
            // })
          })
          this.historyForm = res.data
          processApi.queryLinkFormData(processInstanceId).then(resopnse => {
            if (resopnse.code === 200) {
              // resopnse.data.pop()
              this.$nextTick(() => {
                resopnse.data.map((ele, index) => {
                  // 循环给对应的表单赋值
                  this.formCreateObj[`fApi_${index}`].coverValue(JSON.parse(resopnse.data[index]))
                  // 获取每个表单的字段
                  const fileds = this.formCreateObj[`fApi_${index}`].fields()
                  // 禁用对应的字段值
                  fileds.map(item => {
                    this.formCreateObj[`fApi_${index}`].disabled(true, item)
                  })
                })
              });
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
  .node-info-text {
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    color: #606266;
    float: right;
  }
}
.card-header {
  span {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>