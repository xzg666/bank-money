<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <el-form label-width="80px">
            <el-form-item label="流程类别">
              <el-button
                v-for="item in processTypeList"
                :key="item.dictValue"
                :type="currentTypeId===item.dictValue ? 'primary' : ''"
                @click="clickFlowType(item.dictValue)"
              >{{ item.dictLabel }}</el-button>
            </el-form-item>
            <el-form-item label="流程名称">
              <el-input v-model="flowName" type="text" placeholder="请输入类容" style="width:230px"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="50">
        <el-col v-for="item in flowList" :key="item.id" :span="6" class="mb20">
          <el-card>
            <div class="process_container" @click="hideParent(item)">
              <div class="icon el-icon-s-order"></div>
              <div class="text">{{ item.name }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { processApi } from '@/api/process';
export default {
  name: 'CydbUiAllProcess',

  components: {},

  directives: {},

  data() {
    return {
      // processTypeList: [
      //   { name: '全部' },
      //   { name: '短信模板审核' },
      //   { name: 'test' },
      //   { name: '电子保函流程' },
      //   { name: '催收任务' }
      // ]
      currentTypeId: '0',
      flowName: undefined,
      flowList: []
    }
  },
  computed: {
    processTypeList: function () {
      return [{ dictLabel: '全部', dictValue: '0' }].concat(this.$store.getters.dictData.workFlow_type || [])
    }
  },
  created() {
    this.getProcessByFlowId('0')
  },
  mounted() {

  },

  methods: {
    hideParent(item) {
      this.$emit('hideParent', 'start', item);
    },
    clickFlowType(id) {
      this.getProcessByFlowId(id)
    },
    getProcessByFlowId(id) {
      this.currentTypeId = id
      const params = {
        category: id,
        name: this.flowName
      }
      processApi.getProcessByFlowId(params).then(res => {
        if (res.code === 200) {
          this.flowList = res.data
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.process_container {
  cursor: pointer;
  display: flex;
  .icon {
    color: rgb(64, 158, 255);
    font-size: 45px;
  }
  .text {
    padding: 5px;
    font-size: 14px;
  }
}
</style>