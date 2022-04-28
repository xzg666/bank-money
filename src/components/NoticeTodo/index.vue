<template>
  <div>
    <!-- <svg-icon icon-class="el-icon-bell" @click="click" /> -->
    <el-badge class="_badge" :value="$store.getters.todoNum" :hidden="$store.getters.todoNum===0">
      <i class="el-icon-message-solid" @click="click"></i>
    </el-badge>
  </div>
</template>

<script>

export default {
  name: 'NoticeTodo',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    console.log(this.$store.getters.notice);
  },
  beforeDestroy() {
  },
  methods: {
    click() {
      this.$router.push('/noticeCenter/toDeal')
    }
  }
}
</script>

<style lang='scss' scoped>
.el-icon-message-solid {
  font-size: 22px;
}
._badge {
  ::v-deep .el-badge__content {
    top: 10px;
  }
}
</style>
