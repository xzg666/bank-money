<template>
  <el-radio :label="true" :value="select" @change="change">
    <span />
  </el-radio>
</template>

<script>
export default {
  name: 'MyRadio',
  props: {
    select: Boolean
  },
  methods: {
    change(event) {
      this.$emit('change', !event)
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep.el-radio__label {
  padding: 0;
}
</style>
