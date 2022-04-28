<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="dynamicValidateForm" label-position="right" label-width="130px">
      <div
        v-for="(item,index) in dynamicValidateForm.formData"
        :key="index"
        style="width:100%;display:flex;flex-wrap:wrap"
        class="free_form_container"
      >
        <el-col v-for="(ele) in formList" :key="ele.model" :span="item.span || 6">
          <el-form-item
            :label="ele.label"
            :prop="'formData.' + index +'.'+ ele.model"
            :rules="dynamicValidateForm.formData[index]['custRelationship'] !== '中心预留电话' && ele.label !=='备注' ? [{required:true,message:'此项必填'}] : []"
          >
            <el-input
              v-if="!ele.type || ele.type == 'input'"
              v-model="dynamicValidateForm.formData[index][ele.model]"
              :placeholder="`请输入${ele.label}`"
              :type="ele.inputType || 'text'"
              :rows="ele.rows || 1"
              :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留电话'"
            ></el-input>
            <el-select
              v-if="ele.type=='select'"
              v-model="dynamicValidateForm.formData[index][ele.model]"
              :value="dynamicValidateForm.formData[index][ele.model]"
              :disabled="ele.disabled"
              v-on="$listeners"
              @change="$emit('change', $event)"
            >
              <el-option
                v-for="option in ele.dictOptions"
                :key="option.dictLabel"
                :label="option.dictLabel"
                :value="option.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-radio v-model="radio" :label="index">是否默认</el-radio>
          </el-form-item>
        </el-col>
      </div>
      <el-form-item class="operate_container">
        <el-button type="primary" @click="clickAdd">添加</el-button>
        <el-button type="primary" @click="clickDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button type="success" size="small" @click="save">保存</el-button>
      <el-button type="primary" size="small" @click="$emit('realtionClose')">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import { customInformationApi } from '@/api/customInformation'
export default {
  name: 'RelationshipSelect',
  model: {
    prop: 'formData',
    event: 'change'
  },
  props: {
    certNo: {
      type: String,
      default: () => ''
    },
    custId: {
      type: String,
      default: () => ''
    },
    formList: {
      type: Array,
      default: () => [
        { label: '关系', model: 'custRelationship' },
        { label: '联系方式', model: 'tel' },
        { label: '备注', model: 'remark' }
      ]
    },
    formData: {
      type: Array,
      default: () => [
        {
          certNo: '',
          custRelationship: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          address: '',
          remark: ''
        }
      ]
    }
  },
  data() {
    return {
      itemList: [
        {}
      ],
      // dynamicValidateForm: {
      //   formData: [
      //     {
      //       certNo: '',
      //       custRelationship: '',
      //       tel: '',
      //       remark: ''
      //     }
      //   ]
      // },
      queryParams: {
        urgeType: ''
      },
      tempDataList: [],
      statusOptions: [],
      radio: null
    }
  },
  computed: {
    dynamicValidateForm: function () {
      return {
        formData: this.formData
      }
    }
  },
  watch: {
    radio: function (params) {
      this.dynamicValidateForm.formData.map((item, index) => {
        if (index === params) {
          item.isDefault = '1'
        } else {
          item.isDefault = '0'
        }
      })
    },
    'dynamicValidateForm.formData': function (data) {
      if (data.length === 1) {
        this.radio = 0
      }
      // 初始化是否默认单选框
      data.map((item, index) => {
        if (item.isDefault === '1') {
          this.radio = index
        }
      })
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      });
    }
  },
  created() {
    this.radio = 0
    // this.getFormData()
  },
  methods: {
    getFormData() {
      customInformationApi.getCustonContactsInfoByCertNo(this.certNo).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              delete item.params
            })
            this.dynamicValidateForm.formData = res.data
          }
        }
      })
    },
    clickAdd() {
      const tempObj = JSON.parse(JSON.stringify(this.dynamicValidateForm.formData[0]))
      for (const key in tempObj) {
        if (key !== 'certNo') {
          // 保留certNo的值
          tempObj[key] = ''
        }
      }
      this.dynamicValidateForm.formData.push(tempObj)
    },
    clickDelete() {
      if (this.dynamicValidateForm.formData.length === 1) {
        this.radio = 0
        this.dynamicValidateForm.formData[0].isDefault = '1'
        return
      }
      this.dynamicValidateForm.formData.pop()
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.dynamicValidateForm.formData.length > 10) {
            this.$msgError('最多维护10个联系人')
            return
          }
          // 更新 客户信息 实际电话 为选中默认的电话
          customInformationApi.editCustomInfo({ actualTel: this.dynamicValidateForm.formData.find(info => info.isDefault === '1').tel, id: this.custId }).then(res => {
          })
          customInformationApi.updateContacts(this.dynamicValidateForm.formData).then(res => {
            if (res.code === 200) {
              this.$msgSuccess(res.msg)
              this.$emit('realtionSuccess');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
.operate_container {
  /* position: absolute;
  right: 10%;
  bottom: 50px; */
}
</style>
