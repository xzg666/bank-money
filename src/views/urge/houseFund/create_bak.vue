-
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
      <el-form-item label="客户姓名" prop="custName">
        <el-input
          v-model="queryParams.custName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号" prop="IDNumber">
        <el-input
          v-model="queryParams.IDNumber"
          placeholder="请输入客户身份证号"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号" prop="IDNumber">
        <el-input
          v-model="queryParams.IDNumber"
          placeholder="请输入客户身份证号"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "urgeManage",
  data() {
    return {
      showSearch: true,
      queryParams: {
        custName: undefined,
        IDNumber: undefined,
      },
    };
  },
  methods: {
    handleQuery() {},
  },
};
</script>

<style>
</style>