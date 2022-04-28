<template>
  <el-date-picker
    v-bind="$attrs"
    :value="value"
    :type="$attrs.dateType || 'datetime'"
    size="small"
    style="width: 100%"
    :style="queryForm.formStyle ? queryForm.formStyle['form-item'] : ''"
    placeholder="选择日期时间"
    :value-format="$attrs.valuefFormat || 'yyyy-MM-dd HH:mm:ss'"
    v-on="$listeners"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'MyDateTime',
  components: {},

  directives: {},
  inject: ['queryForm'],
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: [Number, String, null]
  },

  data() {
    return {};
  },
  created() {},
  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
