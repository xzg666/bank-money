<template>
  <div>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-position="right" label-width="130px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="短信模板" prop="dxmb">
            <el-select v-model="form.dxmb" @change="messageSelectChange">
              <el-option
                v-for="item in messageTempList"
                :key="item.id"
                :label="item.mbmc"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发送对象" prop="lxdx">
            <el-select v-model="form.lxdx" @change="telePhoneSelectChange">
              <el-option
                v-for="item in targetList"
                :key="item.id"
                :label="item.lxdxLable"
                :value="item.lxdxValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发送号码" prop="lxhm">
            <el-input v-model="form.lxhm" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="短信内容" prop="dxnr">
            <el-input
              v-model="form.dxnr"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              readonly
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="success" size="small" @click="save">保存</el-button>
        <el-button type="primary" size="small" @click="resetForm">重置</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'CydbFrontedMessageform',
  props: {
    messageTempList: {
      type: Array,
      default() {
        return []
      }
    },
    targetList: {
      type: Array,
      default() {
        return []
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    }
  },

  data() {
    return {
      form: {
        dxmb: '',
        lxdx: '',
        lxhm: '',
        dxnr: ''
      },
      rules: {
        dxmb: [{ required: true, message: '请选择短信模板', trigger: 'change' }],
        lxdx: [{ required: true, message: '请选择联系对象', trigger: 'change' }]
      }
    };
  },
  mounted() {

  },

  methods: {
    // 短信模板下拉框切换
    messageSelectChange(data) {
      var smsTmep = this.messageTempList.find(item => item.id === data).dxnr
      // 短信模板填充
      var parttern = /\$\{[^\}]*\}/g
      var matchAll = smsTmep.match(parttern);
      if (matchAll != null) {
        for (let i = 0; i < matchAll.length; i++) {
          var attr = matchAll[i].substring(2, matchAll[i].length - 1)
          var temp = this.selectRows[attr];
          if (attr === 'dkffrq') {
            temp = moment(new Date(temp)).format('YYYY年MM月DD日')
          }
          smsTmep = smsTmep.replace(matchAll[i], temp)
        }
      }
      this.form.dxnr = smsTmep
    },
    // 电话模板下拉框切换
    telePhoneSelectChange(data) {
      this.form.lxhm = this.targetList.find(item => item.lxdxValue === data).lxhm
    },
    // 点击保存
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('save', this.form)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
