<template>
  <div class="app-container">
    <el-tabs v-if="showSelf" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部流程" name="first">
        <all-process @hideParent="hideParent"></all-process>
      </el-tab-pane>
      <el-tab-pane label="全部工单" name="second">
        <all-order @showFlow="showFlow" @hideParent="hideParent"></all-order>
      </el-tab-pane>
      <el-tab-pane label="我的待办" name="third">
        <my-todo ref="mytodo" @showFlow="showFlow" @hideParent="hideParent"></my-todo>
      </el-tab-pane>
    </el-tabs>
    <div v-else>
      <el-row type="flex" justify="end">
        <el-button size="mini" @click="showFlow('currentPage')">查看流程</el-button>
        <el-button
          v-if="$route.query.processInstanceId"
          size="mini"
          type="danger"
          @click="$router.go(-1)"
        >返回</el-button>
        <el-button v-else size="mini" type="danger" @click="parentShow">关闭</el-button>
      </el-row>
      <deal-process
        v-if="processViewType==='deal' || processViewType==='detail'"
        :process-info="processInfo"
        :process-view-type="processViewType"
        @parentShow="parentShow"
      ></deal-process>
      <!-- <process-detail v-if="processViewType==='detail'" :process-info="processInfo"></process-detail> -->
      <start-process
        v-if="processViewType==='start'"
        :process-info="processInfo"
        @parentShow="parentShow"
      ></start-process>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="1200px">
      <iframe :src="iframeSrc" width="100%" height="600px" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import AllOrder from './components/allOrder.vue';
import AllProcess from './components/allProcess.vue';
import MyTodo from './components/myTodo.vue';
import DealProcess from './components/dealProcess';
import StartProcess from './components/startProcess';
// import processDetail from './components/processDetail.vue'
import { getToken } from '@/utils/auth';
export default {
  name: 'Process',
  components: {
    AllProcess,
    AllOrder,
    MyTodo,
    DealProcess,
    StartProcess
  },

  data() {
    return {
      activeName: 'first',
      showSelf: true,
      processInfo: '',
      dialogVisible: false,
      iframeSrc: '',
      processViewType: 'start'
    };
  },
  mounted() {

  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === 'third') {
        this.$refs.mytodo.getList()
      }
    },
    hideParent(type, item) {
      this.processViewType = type
      this.processInfo = item
      this.showSelf = false
    },
    parentShow() {
      this.showSelf = true
    },
    showFlow(data) {
      if (typeof (data) === 'object') {
        this.iframeSrc = `${this.$iframeBaseUrl}/modeler2.html?modelId=${data.modelId}&token=${getToken()}&linkId=${data.linkId}`
      } else {
        this.iframeSrc = `${this.$iframeBaseUrl}/modeler2.html?modelId=${this.processInfo.modelId}&token=${getToken()}&linkId=${this.processInfo.linkId}`
      }
      this.dialogVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>