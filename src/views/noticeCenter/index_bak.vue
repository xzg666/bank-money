<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane :label="`消息列表 (${messageNum})`" name="first">
        <message @changMessageNum="messageNum=$event"></message>
      </el-tab-pane>
      <el-tab-pane :label="`待办列表 (${todoNum})`" name="second">
        <to-deal @changTodoNum="todoNum=$event"></to-deal>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Message from './message';
import toDeal from './toDeal';
export default {
  name: 'NoticeCenter',
  components: {
    Message,
    toDeal
  },
  data() {
    return {
      activeTab: 'first',
      messageNum: 0,
      todoNum: 0
    };
  },

  mounted() {

  },

  methods: {
    handleClick() {

    }
  }
};
</script>

<style lang="scss" scoped>
</style>