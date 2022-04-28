<template>
  <div class="app-container">
    <el-row>
      <el-form label-position="right" label-width="130px">
        <el-col v-for="item in formList" :key="item.model" :span="item.span || 6" :class="{'_textarea' : item.inputType}">
          <el-form-item :label="item.label">
            <el-input
              v-if="!item.type || item.type == 'input'"
              v-model="formData[item.model]"
              :placeholder="`请输入${item.label}`"
              :type="item.inputType || 'text'"
              :rows="item.rows || 1"
              :disabled="item.disabled"
            />
            <el-select
              v-if="item.type=='select'"
              :value="formData[item.model]"
              :disabled="item.disabled"
              v-on="$listeners"
              @change="$emit('change', $event)"
            >
              <el-option
                v-for="ele in item.dictOptions"
                :key="ele.dictLabel"
                :label="ele.dictLabel"
                :value="ele.dictValue"
              />
            </el-select>
            <el-date-picker
              v-if="item.type=='date'"
              v-model="formData[item.model]"
              type="date"
              style="width: 168px"
              :disabled="item.disabled"
              placeholder="选择日期"
              @change="$emit('change',value)"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="success" size="small">保存</el-button>
      <el-button type="primary" size="small">重置</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UrgeInformationIndex',
  model: {
    prop: 'formData',
    event: 'change'
  },
  props: {
    formList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
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

<style scoped>
</style>
