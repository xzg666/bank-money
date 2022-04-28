<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="创建时间" />
      <el-table-column label="催收类型" />
      <el-table-column label="发函模板" />
      <el-table-column label="当前流转环节" />
      <el-table-column label="处理状态" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'RuoyiUiSendfile',

  components: {},

  data() {
    return {
      tableData: []
    };
  },

  mounted() {

  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
