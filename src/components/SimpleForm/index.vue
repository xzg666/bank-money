<template>
  <div class="app-container">
    <el-row>
      <el-form
        ref="ruleForm"
        :label-position="formStyle['label-position']"
        :label-width="formStyle['label-width']"
        :model="formData"
      >
        <el-col
          v-for="item in formList"
          :key="item.model"
          :span="item.span || 6"
          :class="{'_textarea' : item.inputType}"
        >
          <el-form-item :label="item.label" :prop="item.model">
            <el-input
              v-if="!item.type || item.type == 'input'"
              v-model="formData[item.model]"
              :placeholder="(item.model === 'actualTel' || item.model === 'actualAddress') ? '' : `请输入${item.label}`"
              :type="item.inputType || 'text'"
              :rows="item.rows || 1"
              :disabled="item.disabled === undefined ? (item.model === 'actualTel' || item.model === 'actualAddress') : item.disabled"
              :style="formStyle['form-item']"
            ></el-input>
            <el-select
              v-if="item.type=='select'"
              v-model="formData[item.model]"
              :value="formData[item.model]"
              :disabled="item.disabled"
              :style="formStyle['form-item']"
              v-on="$listeners"
              @change="$emit('change', $event)"
            >
              <el-option
                v-for="ele in item.dictOptions"
                :key="ele.dictLabel"
                :label="ele.dictLabel"
                :value="ele.dictValue"
              ></el-option>
            </el-select>
            <el-date-picker
              v-if="item.type=='date'"
              v-model="formData[item.model]"
              type="date"
              :style="formStyle['form-item']"
              :disabled="item.disabled"
              :value-format="item['value-format'] ? item['value-format'] : 'yyyy-MM-dd'"
              placeholder="选择日期"
              @change="$emit('change',value)"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <slot name="operate"></slot>
    <!-- <el-row type="flex" justify="center">
               <el-button type="success" size="small">保存</el-button>
               <el-button type="primary" size="small">重置</el-button>
    </el-row>-->
  </div>
</template>

<script>
export default {
  name: 'SimpleForm',
  model: {
    prop: 'formData',
    event: 'change'
  },
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => { }
    },
    formStyle: {
      type: Object,
      default: () => {
        return {
          'label-position': 'right',
          'label-width': 'auto',
          'form-item': 'width:100%'
        }
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
    resetForm() {
      console.log('重置');
      this.$refs.ruleForm.resetFields()
    }
  }
};
</script>

<style scoped lang='scss'>
// .app-container {
//   ::v-deep .el-form-item__content {
//     margin-left: 0px !important;
//   }
// }
</style>
