<template>
  <div class="info-details app-container">
    <div class="info-name">姓名</div>
    <el-row class="basic-info">
      <el-col v-for="(item, index) in detailItem" :key="index" :span="8">
        <label v-if="item.label != '额度占用：'">{{ item.label }}</label>
        <label v-if="item.label == '额度占用：'" style="color:blue">{{
          item.label
        }}</label>
        <span v-if="item.label != '额度占用：'">{{ item.data }}</span>
        <span v-if="item.label == '额度占用：'" class="proccess-bar">
          <div class="proccess">
            <el-progress :percentage="50"></el-progress>
          </div>
        </span>
      </el-col>
    </el-row>
    <div>
      <el-tabs v-model="activeName" @click="handleClick">
        <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
        <el-tab-pane label="证件信息" name="second">证件信息</el-tab-pane>
        <el-tab-pane label="账号信息" name="third">账号信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailItem: [
        { label: '身份证号码：', data: '111111' },
        { label: '客户星级：', data: 'A' },
        { label: '额度申请时间：', data: 'A' },
        { label: '供应商名称：', data: 'A' },
        { label: '统一社会信用代码：', data: 'A' },
        { label: '额度占用：', data: 'A' },
        { label: '注册地：', data: 'A' },
        { label: '供应商类型：', data: 'A' },
        { label: '渠道：', data: 'A' },
        { label: '分支机构：', data: 'A' },
        { label: '业务状态：', data: 'A' }
      ],
      activeName: 'second'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.info-details {
  .info-name {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin: 10px 0;
  }
  .proccess-bar {
    position: relative;
  }
  .proccess {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    /* height: 30px; */
    top: 0;
  }
  .basic-info {
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
