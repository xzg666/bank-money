<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-tree
          ref="tree"
          :data="treeData"
          :props="defaultProps"
          :expand-on-click-node="false"
          default-expand-all
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :span="14">
        <div class="iframe-container">
          <iframe :src="iframeSrc" width="100%" height="600px" scrolling="auto" frameborder="0"></iframe>
        </div>
      </el-col>
      <el-col :span="6">
        <el-form v-if="nodeInfoTitle" ref="form" :model="form" label-width="80px">
          <el-form-item
            :label="nodeInfoTitle"
            style="padding-bottom:20px;border-bottom:1px solid #eee"
          >
            <el-button type="primary" size="mini" style="margin-left:100px" @click="onSubmit">确定</el-button>
          </el-form-item>
          <el-form-item label="处理人">
            <el-input v-model="form.dealMan" size="mini" @focus="focusDealPerson"></el-input>
          </el-form-item>
          <el-form-item label="绑定表单">
            <el-input v-model="form.formName" size="mini" @focus="focusForm"></el-input>
          </el-form-item>
          <el-form-item label="发起表单">
            <el-checkbox
              v-model="form.assigneeTaskKey"
              true-label="start"
              false-label="no"
            >是否以表单发起流程</el-checkbox>
          </el-form-item>
          <el-form-item label="节点状态">
            <el-select v-model="form.procStatus" style="width:100%" size="mini" placeholder="请选择表单">
              <el-option
                v-for="item in $store.getters.dictData.workOrder_status || []"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会签类型">
            <el-select
              v-model="form.multiInstanceType"
              style="width:100%"
              size="mini"
              placeholder="请选择表单"
            >
              <el-option
                v-for="item in multiInstanceTypeOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前置回调">
            <el-select
              v-model="form.prevMethod"
              style="width:100%"
              size="mini"
              placeholder="请选择表单"
              clearable
            >
              <el-option
                v-for="item in callBackOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成回调">
            <el-select
              v-model="form.callbackMethod"
              style="width:100%"
              size="mini"
              placeholder="请选择表单"
              clearable
            >
              <el-option
                v-for="item in callBackOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理时限">
            <el-input-number v-model="form.dealTime" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dedalPersonDialog" title="选择处理人" :width="DialogWidth" append-to-body>
      <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="用户" name="users">
          <user @userConfirm="userConfirm" @cancel="dedalPersonDialog=false"></user>
        </el-tab-pane>
        <el-tab-pane label="机构" name="orgs">
          <organization @orgConfirm="userConfirm" @cancel="dedalPersonDialog=false"></organization>
        </el-tab-pane>
        <el-tab-pane label="角色" name="roles">
          <roles @userConfirm="userConfirm" @cancel="dedalPersonDialog=false"></roles>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      :visible.sync="fromSelectDialog"
      width="1200px"
      style="height:700px"
      :title="nodeInfoTitle"
      append-to-body
    >
      <select-form is-component @selectForm="selectForm"></select-form>
    </el-dialog>
  </div>
</template>

<script>
import { processConfigApi } from '@/api/workFlow';
import { getToken } from '@/utils/auth';
import selectForm from '../form/index.vue';
import User from './user';
import Organization from './organization';
import Roles from './roles';
export default {
  name: 'ProcessConfig',
  components: {
    selectForm, User, Organization, Roles
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [
        {
          name: '流程列表',
          id: 0,
          children: [

          ]
        }
      ],
      iframeSrc: ``,
      dedalPersonDialog: false,
      DialogWidth: '1000px',
      // 会签类型
      multiInstanceTypeOptions: [
        { dictLabel: '无', dictValue: '0' },
        { dictLabel: '顺序会签', dictValue: '1' },
        { dictLabel: '并行会签', dictValue: '2' }
      ],
      callBackOptions: [],
      fromSelectDialog: false,
      nodeInfoTitle: '',
      flowNodeInfo: {

      },
      form: {
        formName: undefined,
        dealMan: undefined,
        dealId: undefined,
        dealType: 'user',
        flowId: undefined,
        formId: undefined,
        lsh: undefined,
        linkId: undefined,
        dealTime: '0',
        assigneeTaskKey: 'no'
      },
      activeTab: 'users'
      // iframeSrc: `http://127.0.0.1:5500/static/modeler2.html?modelId=447501&token=${getToken()}`
    };
  },
  watch: {
    activeTab: function (value) {
      this.form.dealType = value
    }
  },
  mounted() {
    this.getTreeData()
    window.addEventListener('message', e => {
      const nodeData = e.data
      if (nodeData.name) {
        console.log('nodeData1: ', nodeData);
        this.nodeInfoTitle = nodeData.name
        if (nodeData.outgoingAction) {
          // nodeData.outgoingAction = JSON.stringify(nodeData.outgoingAction)
          console.log('nodeData: ', nodeData);
        }
        this.flowNodeInfo = nodeData
        this.form.linkId = nodeData.linkId
        this.getNodeConfig(nodeData.linkId)
        // this.dedalPersonDialog = true
      }
    })
    this.getCallBackOptions()
  },

  methods: {
    getTreeData() {
      processConfigApi.getTreeData().then(res => {
        if (res.code === 200) {
          this.treeData[0].children = res.data
        }
      })
    },
    handleNodeClick(data) {
      if (data.id !== 0) {
        this.iframeSrc = `${this.$iframeBaseUrl}/modeler2.html?modelId=${data.id}&token=${getToken()}`
        this.form.flowId = data.key
      }
    },
    onSubmit() {
      const saveObj = Object.assign(this.form, this.flowNodeInfo)
      saveObj.linkName = this.flowNodeInfo.name
      if (saveObj.outgoingAction && typeof (saveObj.outgoingAction) === 'object') {
        saveObj.outgoingAction = JSON.stringify(saveObj.outgoingAction)
      }
      this.form.dealType = this.activeTab
      console.log('saveObj: ', saveObj);
      processConfigApi.saveConfig(saveObj).then(res => {
        if (res.code === 200) {
          this.$msgSuccess(res.msg)
        }
      })
    },
    focusDealPerson() {
      this.dedalPersonDialog = true
    },
    focusForm() {
      this.fromSelectDialog = true
    },
    selectForm(row) {
      console.log(row);
      this.form.formName = row.name
      this.form.formId = row.formId
      this.fromSelectDialog = false
    },
    handleTabClick() {

    },
    userConfirm(data) {
      console.log(data);
      const userNameList = []
      const userIdList = []
      data.map(item => {
        if (this.activeTab === 'users') {
          userNameList.push(item.nickName)
          userIdList.push(item.userName)
        } else if (this.activeTab === 'orgs') {
          userNameList.push(item.label)
          userIdList.push(item.id)
        } else if (this.activeTab === 'roles') {
          userNameList.push(item.roleName)
          userIdList.push(item.roleId)
        }
      })
      this.form.dealMan = userNameList.toString()
      this.form.dealId = userIdList.toString()
      this.dedalPersonDialog = false
    },
    // 获取完成回调函数
    getCallBackOptions() {
      processConfigApi.getCallBack().then(res => {
        if (res.code === 200) {
          this.callBackOptions = res.data
        }
      })
    },
    // 获取节点配置
    getNodeConfig(id) {
      processConfigApi.getNodeConfig(id).then(res => {
        if (res.code === 200 && res.data) {
          this.form = res.data
          processConfigApi.getFormName(res.data.formId).then(response => {
            if (response.code === 200) {
              // this.form.formName = response.data.name
              this.$set(this.form, 'formName', response.data.name);
            }
          })
        } else {
          // 重置节点信息,flowId和linkId保留
          for (const key in this.form) {
            if (key !== 'flowId' && key !== 'linkId') {
              this.form[key] = undefined
            }
          }
          this.form.assigneeTaskKey = 'no'
          // this.form = {
          //   formName: undefined,
          //   dealMan: undefined,
          //   dealId: undefined,
          //   dealType: 'user',
          //   flowId: undefined,
          //   formId: undefined,
          //   lsh: undefined,
          //   linkId: undefined,
          //   dealTime: '0'
          // }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.iframe-container {
  min-height: 400px;
  width: 100%;
}
</style>