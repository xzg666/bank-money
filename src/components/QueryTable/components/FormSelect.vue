<template>
  <el-select
    :clearable="$attrs.clearable===false ? $attrs.clearable : true"
    size="small"
    v-bind="$attrs"
    :value="value"
    :placeholder="placeholder"
    :style="queryForm.formStyle ? queryForm.formStyle['form-item'] : 'width:100%' "
    v-on="$listeners"
  >
    <el-option
      v-for="dict in dictOptions"
      :key="dict.dictValue"
      :label="dict.dictLabel"
      :value="dict.dictValue"
    />
  </el-select>
</template>

<script>

export default {
  name: 'FormSelect',
  inject: ['queryForm'],
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: [Number, String, null],
    dictOptions: {
      type: Array,
      required: true
    },
    placeholder: String
  },
  created() {
    // console.log(this.$attrs);
  }
}
</script>

<style scoped>
</style>
