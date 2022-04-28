<template>
  <el-time-picker
    v-model="value"
    :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
    :style="queryForm.formStyle['form-item']"
    placeholder="任意时间点"
    value-format="HH:mm:ss"
    @change="$emit('change', value)"
  >
  </el-time-picker>
</template>

<script>
export default {
  name: 'MyTime',
  components: {},
  directives: {},
  inject: ['queryForm'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {},

  data() {
    return {
      value: ''
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
