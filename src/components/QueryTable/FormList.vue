<template>
  <span>
    <el-col
      v-for="item in formList"
      :key="item.model"
      :span="item.span || baseSpan"
    >
      <el-form-item v-bind="item" :label="item.label" :prop="item.model">
        <el-input
          v-if="!item.type || item.type === 'input'"
          v-model="form[item.model]"
          v-bind="item.slotOption"
          :placeholder="`请输入${item.label}`"
          clearable
          size="small"
          :disabled="item.disabled"
          :style="queryForm.formStyle ? queryForm.formStyle['form-item'] : ''"
          v-on="item.slotOption"
          @keyup.enter.native="handleQuery"
          @clear="form[item.model] = undefined"
        />
        <form-select
          v-if="item.type === 'select'"
          v-model="form[item.model]"
          v-bind="item"
          :placeholder="`请选择${item.label}`"
          :dict-options="item.dictOptions"
          @clear="form[item.model] = undefined"
          v-on="item.slotOption"
        />
        <my-date v-if="item.type === 'date'" v-model="form[item.model]" />
        <my-time v-if="item.type === 'time'" v-model="form[item.model]" />
        <my-month v-if="item.type === 'month'" v-model="form[item.model]" />
        <my-date-range
          v-if="item.type === 'daterange'"
          v-model="form[item.model]"
        />
        <my-date-time
          v-if="item.type === 'datetime'"
          v-model="form[item.model]"
        />
        <slot v-else :name="item.type" :item="item" />
      </el-form-item>
    </el-col>
  </span>
</template>

<script>
import FormSelect from './components/FormSelect';
import MyDate from './components/MyDate.vue';
import MyMonth from './components/MyMonth.vue';
import MyTime from './components/MyTime.vue';
import MyDateTime from './components/MyDateTime.vue';
import { baseSpan } from './utils/config';
export default {
  name: 'FormList',
  components: { FormSelect, MyDate, MyTime, MyMonth, MyDateTime },
  inject: ['queryForm'],
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    formData: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      baseSpan
    };
  },
  computed: {
    formList() {
      return this.formData;
    }
  },
  methods: {
    handleQuery() {
      this.$emit('change', { ...this.form, pageNum: 1 });
      this.$emit('get-list');
    }
  }
};
</script>

<style scoped></style>
