<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="dynamicValidateForm" label-position="right" label-width="130px">
      <div
        v-for="(item,index) in dynamicValidateForm.formData"
        :key="index"
        style="width:100%;display:flex;flex-wrap:wrap"
        class="free_form_container"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item
              label="关系"
              :prop="'formData.' + index +'.custRelationship'"
              :rules="dynamicValidateForm.formData[index]['custRelationship'] !== '中心预留地址' ? [{required:true,message:'此项必填'}] : []"
            >
              <el-input
                v-model="dynamicValidateForm.formData[index]['custRelationship']"
                placeholder="请输入关系"
                :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留地址'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="省"
              :prop="'formData.' + index +'.provinceId'"
              :rules="dynamicValidateForm.formData[index]['custRelationship'] !== '中心预留地址' ? [{required:true,message:'此项必填'}] : []"
            >
              <el-select
                v-model="dynamicValidateForm.formData[index]['provinceId']"
                :value="dynamicValidateForm.formData[index].provinceId"
                :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留地址'"
                @change="(data)=>provinceSlectChange(data,index)"
              >
                <el-option
                  v-for="option in provinceOptions"
                  :key="option.dictValue"
                  :label="option.dictLabel"
                  :value="option.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="市"
              :prop="'formData.' + index +'.cityId'"
              :rules="dynamicValidateForm.formData[index]['custRelationship'] !== '中心预留地址' ? [{required:true,message:'此项必填'}] : []"
            >
              <el-select
                v-model="dynamicValidateForm.formData[index]['cityId']"
                :value="dynamicValidateForm.formData[index].cityId"
                :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留地址'"
                @change="(data)=>citySelectChange(data,index)"
              >
                <el-option
                  v-for="option in optionsList[index].cityOptions"
                  :key="option.dictValue"
                  :label="option.dictLabel"
                  :value="option.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="区/县"
              :prop="'formData.' + index +'.districtId'"
              :rules="dynamicValidateForm.formData[index]['custRelationship'] !== '中心预留地址' ? [{required:true,message:'此项必填'}] : []"
            >
              <el-select
                v-model="dynamicValidateForm.formData[index]['districtId']"
                :value="dynamicValidateForm.formData[index].districtId"
                :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留地址'"
              >
                <el-option
                  v-for="option in optionsList[index].areaOptions"
                  :key="option.dictValue"
                  :label="option.dictLabel"
                  :value="option.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="地址"
              :prop="'formData.' + index +'.address'"
              :rules="dynamicValidateForm.formData[index]['custRelationship'] !== '中心预留地址' ? [{required:true,message:'此项必填'}] : []"
            >
              <el-input
                v-model="dynamicValidateForm.formData[index]['address']"
                :placeholder="`请输入地址`"
                :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留地址'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注">
              <el-input
                v-model="dynamicValidateForm.formData[index]['remark']"
                :placeholder="`请输入备注`"
                :disabled="dynamicValidateForm.formData[index]['custRelationship'] === '中心预留地址'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-radio v-model="radio" :label="index">是否默认</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item class="operate_container">
        <el-button type="primary" @click="clickAdd">添加</el-button>
        <el-button type="primary" @click="clickDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button type="success" size="small" @click="save">保存</el-button>
      <el-button type="primary" size="small" @click="$emit('cancelAddressSelect')">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import { commonApi } from '@/api/common'
import { customInformationApi } from '@/api/customInformation';
export default {
  name: 'AdressSelect',
  model: {
    prop: 'formData',
    event: 'change'
  },
  props: {
    // 地址数据条数，默认一条，多条时数据从父组件传过来
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
      // dynamicValidateForm: {
      //   formData: this.formData
      // },
      itemList: [
        {}
      ],
      queryParams: {
        urgeType: ''
      },
      tempDataList: [],
      statusOptions: [],
      provinceOptions: [],
      radio: null,
      optionsList: [
        {
          provinceOptions: [],
          cityOptions: [],
          areaOptions: []
        }
      ]
    }
  },
  computed: {
    formList() {
      return [
        { label: '关系', model: 'custRelationship' },
        { label: '省', model: 'provinceId', type: 'select', dictOptions: this.provinceOptions },
        { label: '市', model: 'cityId', type: 'select' },
        { label: '区/县', model: 'districtId' },
        { label: '地址', model: 'address' },
        { label: '备注', model: 'remark' }
      ]
    },
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
        // 先创建对应数量的下拉列表数据，防止页面初始化的时候找不到数据报错
        const tempObj = {
          provinceOptions: this.provinceOptions,
          cityOptions: [],
          areaOptions: []
        }
        // 需要手动设置为响应式数据,否则下拉框内容不会更新
        this.$set(this.optionsList, index, tempObj);
        let cityOptions = []
        let areaOptions = []
        commonApi.getCity(item.provinceId).then(res => {
          if (res.code === 200) {
            res.data.map(item => {
              item.dictLabel = item.cityName
              item.dictValue = item.cityId
            })
            cityOptions = res.data
            commonApi.getArea(item.cityId).then(_res => {
              if (_res.code === 200) {
                _res.data.map(item => {
                  item.dictLabel = item.districtName
                  item.dictValue = item.districtId
                })
                areaOptions = _res.data
                // 增加下拉框数据
                const optionsObj = {
                  provinceOptions: this.provinceOptions,
                  cityOptions,
                  areaOptions
                }
                this.$set(this.optionsList, index, optionsObj);
              }
            })
          }
        })
      })
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      });
    }
  },
  created() {
    this.radio = 0
    commonApi.getProvince().then(res => {
      if (res.code === 200) {
        res.data.map(item => {
          item.dictLabel = item.provinceName
          item.dictValue = item.provinceId
        })
        this.provinceOptions = res.data
      }
    })
  },
  mounted() {

  },
  methods: {
    clickAdd() {
      // 增加页面内容
      const tempObj = JSON.parse(JSON.stringify(this.dynamicValidateForm.formData[0]))
      for (const key in tempObj) {
        if (key !== 'certNo') {
          // 保留certNo的值
          tempObj[key] = ''
        }
      }
      this.dynamicValidateForm.formData.push(tempObj)
      // 增加下拉框数据
      const optionsObj = {
        provinceOptions: this.provinceOptions,
        cityOptions: [],
        areaOptions: []
      }
      this.optionsList.push(optionsObj)
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
            this.$msgError('最多维护10个地址')
            return
          }
          customInformationApi.updateAddress(this.dynamicValidateForm.formData).then(res => {
            if (res.code === 200) {
              // 更新客户信息实际地址 为选中默认的地址
              customInformationApi.editActualAddress(this.dynamicValidateForm.formData.find(info => info.isDefault === '1')).then(res => {
                if (res.code === 200) {
                  this.$msgSuccess(res.msg)
                  this.$emit('AddressSelectSuccess');
                }
              })
            }
          })

          // if (this.dynamicValidateForm.formData.length > 10) {
          //   this.$msgError('最多维护10个联系人')
          //   return
          // }
          // // 更新 客户信息 实际电话 为选中默认的电话
          // customInformationApi.editCustomInfo({ actualTel: this.dynamicValidateForm.formData.find(info => info.isDefault === '1').tel, id: this.custId }).then(res => {
          // })
          // customInformationApi.updateContacts(this.dynamicValidateForm.formData).then(res => {
          //   if (res.code === 200) {
          //     this.$msgSuccess(res.msg)
          //     this.$emit('realtionClose');
          //   }
          // })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
      this.$emit('save', this.dynamicValidateForm.formData);
    },
    provinceSlectChange(data, index) {
      commonApi.getCity(data).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.cityName
            item.dictValue = item.cityId
          })
          // 省份重新选择后，城市置空
          this.dynamicValidateForm.formData[index].cityId = ''
          this.optionsList[index].cityOptions = res.data
        }
      })
    },
    citySelectChange(data, index) {
      commonApi.getArea(data).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.districtName
            item.dictValue = item.districtId
          })
          // 城市选择后，区县置空
          this.dynamicValidateForm.formData[index].districtId = ''
          this.optionsList[index].areaOptions = res.data
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
