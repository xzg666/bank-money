<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="催收人员" />
      <el-table-column label="催收类型" />
      <el-table-column label="催收日期" />
      <el-table-column label="催收方式" />
      <el-table-column label="预警方式" />
      <el-table-column label="预约时间" />
      <el-table-column label="催收描述" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Urgerecord',
  components: {},

  directives: {},
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {

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
