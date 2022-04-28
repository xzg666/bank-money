<template>
  <div class="app-container">
    <slot name="openOtherUrl"></slot>
    <el-row>
      <el-form
        ref="ruleForm"
        :model="formData"
        :rules="rules"
        label-position="right"
        label-width="130px"
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
              :placeholder="`请输入${item.label}`"
              :type="item.inputType || 'text'"
              :rows="item.rows || 1"
              :disabled="item.disabled"
            />
            <el-select
              v-if="item.type=='select'"
              v-model="formData[item.model]"
              :value="formData[item.model]"
              :disabled="item.disabled"
              :clearable="item.clearable ? item.clearable : true"
              v-on="$listeners"
              @change="$emit('change', $event)"
            >
              <el-option
                v-for="ele in item.dictOptions"
                :key="ele.dictValue"
                :label="ele.dictLabel"
                :value="ele.dictValue"
              />
            </el-select>
            <el-date-picker
              v-if="item.type=='date'"
              v-model="formData[item.model]"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              type="date"
              style="width: 168px"
              :disabled="item.disabled"
              :picker-options="item.disabledDate ? item.disabledDate=='lt' ? ltPickerOptions : gtPickerOptions : ''"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col v-if="showUpload" :span="24" :push="1">
        <el-upload
          :action="baseUrl + '/loan/uploadFiles/multifileUpload'"
          :headers="headers"
          name="files"
          multiple
          :limit="3"
          :on-success='uploadSuccess'
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <el-button size="small" type="primary" icon="el-icon-upload2">上传附件</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="success" size="small" @click="save">保存</el-button>
      <el-button type="primary" size="small" @click="resetForm">重置</el-button>
    </el-row>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
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
    },
    rules: {
      type: Object,
      default: () => { }
    },
    showUpload: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: [],
      fileListToSend: [],
      //  禁用当前日期之前的日期选项
      gtPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      //  禁用当前日期之后的日期选项
      ltPickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  watch: {
    rules: function (rules) {
      console.log('rules: ', rules);
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      });
    }
  },
  mounted() {
    console.log(process.env.VUE_APP_BASE_API);
  },

  methods: {
    save() {
      console.log(this.fileListToSend);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formData.fileList = this.fileListToSend
          this.$emit('save', this.formData)
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    uploadSuccess(response, file, fileList) {
      console.log('fileList: ', fileList);
      console.log('file: ', file);
      console.log('response: ', response);
      this.fileListToSend = []
      fileList.map(item => {
        const { response: { data }} = item
        this.fileListToSend.push(data[0])
      })
    },
    handleRemove(file, fileList) {
      console.log('fileList: ', fileList);
      console.log('file: ', file);
      this.fileListToSend = []
      fileList.map(item => {
        const { response: { data }} = item
        this.fileListToSend.push(data[0])
      })
    }
  }
};
</script>

<style scoped>
</style>
