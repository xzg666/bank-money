<template>
  <div>
    <el-row :gutter="10">
      <el-col>
        <el-form
          v-show="showSearch"
          ref="queryForm"
          :inline="
            typeof queryForm.$attrs.inline === 'boolean'
              ? queryForm.$attrs.inline
              : true
          "
          v-bind="queryForm.$attrs"
          class="rowForm"
          :model="query"
          :label-position="
            queryForm.formStyle
              ? queryForm.formStyle['label-position']
              : 'right'
          "
          :label-width="
            queryForm.formStyle ? queryForm.formStyle['label-width'] : 'auto'
          "
          v-on="$listeners"
        >
          <slot />
          <el-col
            v-if="queryForm.formData.length > 0"
            :span="buttonSpan || baseSpan"
            style="text-align: left;padding-left:60px"
          >
            <!-- <el-form-item label-width='0'>
              <el-button
                v-loading="loading"
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
              >搜索</el-button>
              <el-button
                v-loading="loading"
                icon="el-icon-refresh"
                size="mini"
                @click="resetQuery"
              >重置</el-button>
              <el-button
                v-if="queryForm.showExport"
                v-loading="loading"
                type="primary"
                icon="el-icon-printer"
                size="mini"
                @click="resetQuery"
              >打印预览</el-button>
            </el-form-item>-->
            <el-button
              v-loading="loading"
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button>
            <el-button
              v-loading="loading"
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
              >重置</el-button>
            <el-button
              v-if="queryForm.showExport"
              v-loading="loading"
              type="primary"
              icon="el-icon-printer"
              size="mini"
              @click="resetQuery"
              >打印预览</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb8">
      <slot name="operating" />
      <right-toolbar
        :show-search.sync="showSearch"
        @queryTable="$emit('get-list')"
      />
    </el-row>
  </div>
</template>

<script>
import { baseSpan } from './utils/config';
export default {
  name: 'MyForm',
  inject: ['queryForm'],
  props: {
    // 查询用参数
    queryParams: {
      type: Object,
      required: true
    },
    loading: Boolean,
    buttonSpan: Number
  },
  data() {
    return {
      showSearch: true,
      baseSpan,
      query: {}
    };
  },
  created() {},
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      if (!this.loading) {
        this.queryParams.pageNum = 1;
        this.queryParams.pageSize = 10;
        this.$emit('get-list');
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$resetForm('queryForm');
      Object.keys(this.query).forEach(key => {
        if (this.queryParams[key]) {
          this.queryParams[key] = null;
        }
      });
      this.handleQuery();
    }
  }
};
</script>

<style scoped lang="scss">
.rowForm {
  .el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
    }
    .el-select {
      width: 100%;
    }
    .el-input {
      width: 100%;
    }
  }
}
</style>
