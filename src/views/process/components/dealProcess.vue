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
    <el-card v-for="(item,index) in firstHistoryForm" :key="item.id" class="box-card">
      <div v-if="index===0" slot="header" class="clearfix card-header">
        <span>{{ item.name }}</span>
        <span class="node-info-text">{{ item.userName }}</span>
        <span class="node-info-text">{{ moment(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <form-create
        v-if="!historyShowTable && index===0&& item.vueTxt"
        :ref="`formCreate_${index}`"
        v-model="formCreateObj[`fApi_${index}`]"
        :rule="item.vueTxt.formRule"
        :option="item.vueTxt.formOptions"
      ></form-create>
      <el-table v-if="historyShowTable" :data="tableData">
        <el-table-column
          v-for="(_item,_index) in columnList"
          :key="_index"
          align="center"
          :label="_item.label"
          :prop="_item.prop"
        ></el-table-column>
      </el-table>
    </el-card>
    <el-card v-if="processViewType==='deal'" class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>{{ processInfo.name }}</span>
      </div>
      <form-create
        v-show="!currentShowTable"
        v-model="fApi"
        :rule="formConf.formRule"
        :option="formConf.formOptions"
        @submit="onSubmit"
      ></form-create>
      <edit-table
        v-if="currentShowTable"
        :column-list="columnList"
        :table-data="tableData"
        @confirmChange="changeTableRow"
      ></edit-table>
      <el-row
        v-if="nodeInfo.outgoingAction && processViewType==='deal'"
        style="padding-left:80px;padding-top:20px"
      >
        <el-col v-for="item in JSON.parse(nodeInfo.outgoingAction)" :key="item.name" :span="3">
          <el-button
            v-if="item.name"
            type="primary"
            :loading="btnLoad"
            @click="onSubmit(item)"
          >{{ item.name }}</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="backToNode">回退到指定节点</el-button>
        </el-col>
      </el-row>
    </el-card>
    <p style="font-size:18px;margin-top:40px">流程记录</p>
    <el-divider></el-divider>
    <el-card v-for="(item,index) in otherHistoryForm" :key="item.id" class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>{{ item.name }}</span>
        <span class="node-info-text">{{ item.userName }}</span>
        <span class="node-info-text">{{ moment(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <!-- 其他表单是从第二条数据开始的，所以对应的ref和v-model要index+1 -->
      <form-create
        v-show="item.vueTxt && item.vueTxt.formRule[0].type!=='el-table'"
        :ref="`formCreate_${index+1}`"
        v-model="formCreateObj[`fApi_${index+1}`]"
        :rule="item.vueTxt.formRule"
        :option="item.vueTxt.formOptions"
      ></form-create>
      <!-- <div
        v-if="item.vueTxt && item.vueTxt.formRule[0].type==='el-table'"
      >{{ item.vueTxt.formRule[0].value }}aaa</div>-->
      <el-table
        v-if="item.vueTxt && item.vueTxt.formRule[0].type==='el-table'"
        :data="item.vueTxt.formRule[0].value"
      >
        <!-- formCreateObj[`fApi_${index+1}`].form[item.vueTxt.formRule[0].filed] -->
        <el-table-column
          v-for="(_item,_index) in columnList"
          :key="_index"
          align="center"
          :label="_item.label"
          :prop="_item.prop"
        ></el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" append-to-body title="选择退回节点" width="600px">
      <el-radio-group v-model="selectNodeId">
        <el-radio
          v-for="(item,index) in nodeUserList"
          :key="index"
          :label="item.activityId"
          style="margin-bottom:10px"
          @change="()=>historyNodeChange(item)"
        >{{ item.activityName }}</el-radio>
      </el-radio-group>
      <el-row type="flex" justify="center">
        <el-button type="primary" :loading="btnLoad" size="mini" @click="confirmBack()">确定</el-button>
        <!-- <el-button type="primary" size="mini" @click="confirm('1')">保存并结束任务</el-button> -->
        <el-button size="mini" @click="dialogVisible=false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { processApi } from '@/api/process'
import { form_api } from '@/api/workFlow'
import editTable from './editTable';
import moment from 'moment';
import { getToken } from '@/utils/auth'
// 定义自定义组件
window.formCreate.component('inputBtn', {
  data: function () {
    return {
      downloadPath: this.value
    }
  },
  render($h) {
    return $h('ElButton', {
      props: {
        disabled: this.disabled,
        long: true
      },
      on: {
        click: () => {
          this.onClick()
        }
      }
      // }, [this.value.split('/')[2]])
    }, [this.value.btnName])
  },
  props: {
    // 预定义
    disabled: Boolean,
    value: Object,
    processViewType: String
  },
  watch: {
    value(n) {
      // 同步 value 的值
      // this.downloadPath = n
    }
  },
  methods: {
    onClick: function () {
      // this.downloadPath++
      // 更新组件内部的值
      // this.$emit('input', this.downloadPath)
      // window.open(`${this.$iframeBaseUrl}/loan/uploadFiles/download?filePath=${this.downloadPath}`)
      window.open(this.value.downloadPath)
    }
  }
})
export default {
  name: 'CydbForntedDealprocess',
  components: {
    editTable
  },
  props: {
    processInfo: {
      type: Object,
      default: () => {

      }
    },
    processViewType: {
      type: String,
      default: () => 'deal'
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
      ],
      dialogVisible: false,
      nodeUserList: [],
      selectNodeItem: {},
      selectNodeId: '',
      // 可编辑表格
      showTable: false,
      currentShowTable: false,
      historyShowTable: false,
      columnList: [],
      tableData: []
    };
  },
  computed: {
    firstHistoryForm: function () {
      // 取第一条
      return this.historyForm.slice(0, 1)
    },
    // 取第一条之后
    otherHistoryForm: function () {
      return this.historyForm.slice(1)
    }
    // formItemFiles: function () {
    //   const tempObj = {}
    //   Object.keys(this.formCreateObj).forEach((item, index) => {
    //     tempObj[item] = this.formCreateObj[item].fields()
    //   })
    //   return tempObj
    // }
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
      // 如果是处理页面 查询当前表单
      if (this.processViewType === 'deal') {
        processApi.queryLinkConfig(queryData).then(res => {
          this.nodeInfo = res.data
          if (res.data.formId) {
            form_api.getFormByFormId(res.data.formId).then(res => {
              if (res.code === 200) {
                this.formConf = JSON.parse(res.data.vueTxt)
                this.formConf.formOptions.submitBtn = false
                // 修改select、upload组件的配置
                this.$nextTick(() => {
                  this.changeFormRule(this.fApi, 'current')
                });
              }
            })
          }
        })
      }
    },
    onSubmit(actionName) {
      const insertDbList = this.findInsertDbList()
      this.btnLoad = true
      // 如果有表格,修改保存的formdata
      if (this.currentShowTable) {
        for (const key in this.fApi.form) {
          if (Object.hasOwnProperty.call(this.fApi.form, key)) {
            this.fApi.form[key] = this.tableData;
          }
        }
      }
      const processData = {
        action: actionName.id,
        actionName: actionName.name,
        formData: JSON.stringify(this.fApi.form),
        dbcolumns: JSON.stringify(insertDbList)
      }
      //  是否是处理节点
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
        // 是发起节点
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
    findInsertDbList() {
      const fileds = this.fApi.model()
      const insertDbList = []
      // 找出需要存入数据库的字段
      for (const key in fileds) {
        if (Object.hasOwnProperty.call(fileds, key)) {
          const element = fileds[key]
          if (element.props && element.props.insertDb === '1') {
            insertDbList.push(key)
          }
        }
      }
      return insertDbList
    },
    changeSelectLable(dictCode) {
      const dictList = this.$store.getters.dictData[dictCode]
      dictList.map(item => {
        item.label = item.dictLabel
        item.value = item.dictValue
      })
      return dictList
    },
    // 查询历史表单
    queryHistoryForm(processInstanceId, id) {
      processApi.queryHistoryForm(processInstanceId, id).then(res => {
        if (res.code === 200) {
          // 如果有linkId则当期流程未处理完，而且当前节点的结束时间为空(当前节点为处理完) 需要删除当前节点的表单
          if (this.processInfo.linkId && !res.data[0].endTime) res.data.shift()
          // res.data.shift()
          // 循环表单结构用于页面渲染表单
          res.data.map((item, index) => {
            // 创建每个表单绑定的对象，用于下面给表单赋值
            this.$set(this.formCreateObj, `fApi_${index}`, {});
            // 解析接口返回的表单结构
            item.vueTxt = JSON.parse(item.vueTxt)
            // 隐藏默认的提交按钮
            item.vueTxt.formOptions.submitBtn = false
          })
          this.historyForm = res.data
          processApi.queryLinkFormData(processInstanceId).then(resopnse => {
            if (resopnse.code === 200) {
              // 如果有linkId则当期流程未处理完，需要删除当前节点的空数据
              if (this.processInfo.linkId) resopnse.data.pop()
              const reverserCurrentFormTextList = res.data.concat().reverse()
              const reverserCurrentFormDataList = resopnse.data.concat().reverse()
              this.overWriteCurrentForm(reverserCurrentFormTextList, reverserCurrentFormDataList)
              this.$nextTick(() => {
                resopnse.data.map((ele, _index) => {
                  // 循环给对应的表单赋值
                  this.formCreateObj[`fApi_${_index}`].coverValue(JSON.parse(resopnse.data[_index]))
                  // 修改select、upload组件的配置
                  const rules = this.formCreateObj[`fApi_${_index}`]
                  this.changeFormRule(rules, 'history', resopnse.data[0])
                  // 获取每个表单的字段
                  const fileds = this.formCreateObj[`fApi_${_index}`].fields()
                  // 禁用对应的字段值
                  fileds.map(item => {
                    this.formCreateObj[`fApi_${_index}`].disabled(true, item)
                    // this.formCreateObj[`fApi_${_index}`].sync(item)
                    this.formCreateObj[`fApi_${_index}`].reload()
                  })
                })
              });
            }
          })
        }
      })
    },
    changeFormRule(obj, formType, historyFormData) {
      const rules = obj.model()
      let downloadBtn = false
      const filePathList = []
      for (const key in rules) {
        if (Object.hasOwnProperty.call(rules, key)) {
          if (rules[key].type === 'upload') {
            const componentInfo = rules[key]
            if (formType === 'history') {
              downloadBtn = true
              // 删除上传组件
              obj.removeField(key)
              // 添加上面自定义的组件
              if (componentInfo.value && componentInfo.value.length) {
                componentInfo.value.forEach((item) => {
                  // filePathList.push(`${this.$iframeBaseUrl}/loan/uploadFiles/download?filePath=${item}`)
                  filePathList.push(`${item}`)
                  // obj.append(window.formCreate.maker.create('inputBtn', 'testField', componentInfo.title).value(item))
                  obj.append(window.formCreate.maker.create('inputBtn', 'testField', componentInfo.title).value({
                    downloadPath: `${this.$iframeBaseUrl}/loan/uploadFiles/download?filePath=${item}`,
                    btnName: item.split('/')[2]
                  }))
                })
              }
            } else {
              // 当前表单，则修改上传组件规则
              obj.updateRule(key, {
                props: {
                  action: `${this.$iframeBaseUrl}/loan/uploadFiles/multifileUpload`,
                  headers: {
                    Authorization: 'Bearer ' + getToken()
                  },
                  name: 'files',
                  onSuccess: function (res, file, fileList) {
                    file.url = res.data[0].filePath
                    // file.url = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1112%2F11291Q41F8%2F1Q129141F8-2.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638502450&t=32a1416d8c7d47087fa6590c9834500f'
                  }
                }
              })
            }
          }
          if (rules[key].type === 'select') {
            let selectDictCode = ''
            if (rules[key].effect) {
              selectDictCode = rules[key].effect.fetch.action
              obj.updateRule(key, {
                props: {
                  // 貌似没有用到远程请求数据
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
          if (rules[key].type === 'el-table') {
            this.showTable = true
            if (formType === 'history') {
              this.historyShowTable = true
            } else {
              this.currentShowTable = true
            }
            // 取出存好的表格列字段
            // eslint-disable-next-line no-eval
            const columnFiles = eval(rules[key].props.columnFiles)
            this.columnList = columnFiles
            // 取出表格的数据
            if (historyFormData) {
              this.tableData = JSON.parse(historyFormData)[key]
            }
            // this.tableData = [
            //   {
            //     name: '张三',
            //     gender: '男',
            //     age: 13
            //   },
            //   {
            //     name: '李四',
            //     gender: '女',
            //     age: 15
            //   }
            // ]
            // columnFiles.map(item => {
            //   const tempObj = {
            //     type: 'el-table-column',
            //     props: item
            //   }
            //   columnList.push(tempObj)
            // })
            // obj.removeField(key)
            // setTimeout(() => {
            //   obj.updateRule(key, {
            //     props: {
            //       border: true,
            //       data: [
            //         {
            //           name: '苹果',
            //           price: 12
            //         },
            //         {
            //           name: '梨子',
            //           price: 15
            //         }
            //       ]
            //     },
            //     children: columnList
            //   })
            // }, 1000);
          }
        }
      }
      if (downloadBtn) {
        const filePathString = filePathList.toString()
        console.log('filePathString: ', filePathString);
        obj.append(window.formCreate.maker.create('inputBtn', 'testField', '批量下载').value({
          downloadPath: `${this.$iframeBaseUrl}/common/download/fileZip?strFilePath=${filePathString}`,
          btnName: '点击下载所有附件'
        }))
      }
    },
    changeTableRow({ selectIndex, selectRow }) {
      this.$set(this.tableData, selectIndex, selectRow);
    },
    // 反显当前表单数据
    overWriteCurrentForm(formTextList = [], formDataList = []) {
      formTextList.forEach((item, index) => {
        if (item.taskKey === this.processInfo.linkId) {
          const currentFormData = formDataList[index]
          this.fApi.coverValue(JSON.parse(currentFormData))
          return
        }
      })
    },
    // 流程回退
    backToNode() {
      processApi.queryHistoryNode(this.processInfo.processInstanceId).then(res => {
        if (res.code === 200) {
          this.nodeUserList = res.data
          this.dialogVisible = true
        }
      })
    },
    historyNodeChange(item) {
      this.selectNodeItem = item
    },
    confirmBack() {
      if (this.selectNodeItem.activityName) {
        this.$confirm(`确定退回到 ${this.selectNodeItem.activityName}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const insertDbList = this.findInsertDbList()
          this.btnLoad = true
          const processData = {
            action: '',
            actionName: '回退',
            formData: JSON.stringify(this.fApi.form),
            returnTask: JSON.stringify(this.selectNodeItem),
            dbcolumns: JSON.stringify(insertDbList)
          }
          const { processInstanceId, id } = this.processInfo
          processApi.completeTask(processInstanceId, id, processData).then(res => {
            if (res.code === 200) {
              this.btnLoad = false
              if (res.data.msg === 'success') {
                this.selectNodeItem = {}
                this.selectNodeId = ''
                this.$msgSuccess('操作成功')
                this.$emit('parentShow');
              } else {
                this.$msgError(res.data.msg)
              }
            }
          })
        })
      } else {
        this.$msgInfo('请选择要回退的节点!')
        return
      }
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