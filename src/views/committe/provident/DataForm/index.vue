<template>
  <div class="app-container">
    <el-row>
      <el-form
        ref="formRef"
        label-position="right"
        label-width="150px"
        :rules="rulesData"
        :model="formData"
      >
        <el-col
          v-for="item in formList"
          :key="item.model"
          :span="item.span || 6"
          :class="{ _textarea: item.inputType }"
        >
          <el-form-item :label="item.label" :prop="item.model">
            <el-input
              v-if="!item.type || item.type == 'input'"
              v-model="formData[item.model]"
              :placeholder="`请输入`"
              :type="item.inputType || 'text'"
              :rows="item.rows || 1"
              :disabled="item.disabled"
              @input="$emit('inputChange', $event)"
            >
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">{{
                item.unit
              }}</i>
            </el-input>
            <el-select
              v-if="item.type == 'select'"
              v-model="formData[item.model]"
              :disabled="item.disabled"
              v-on="$listeners"
              @change="$emit('change', formData)"
            >
              <el-option
                v-for="ele in item.dictOptions"
                :key="ele.dictLabel"
                :label="ele.dictLabel"
                :value="ele.dictValue"
              />
            </el-select>
            <el-date-picker
              v-if="item.type == 'date'"
              v-model="formData[item.model]"
              type="date"
              style="width: 168px"
              :disabled="item.disabled"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="$emit('change', value)"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div v-if="isBlock">
      <el-row type="flex" justify="center">
        <el-button
          type="success"
          size="small"
          @click="$emit('addSubmit')"
          @dbclick="$emit('addSubmitDb')"
          >保存</el-button>
        <el-button
type="primary"
size="small"
style="display:none"
>取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataForm',
  model: {
    prop: 'formData',
    event: 'change'
  },
  props: {
    formList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    isBlock: {
      type: Boolean,
      dafault: true
    },
    rulesData: {
      type: Object,
      default() {
        return {};
      }
    },
    formRef: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    validateFormFunc(callback) {
      this.$refs.formRef.validate(callback);
    }
  }
};
</script>

<style scoped></style>
