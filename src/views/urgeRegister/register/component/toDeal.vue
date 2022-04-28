<template>
  <div>
    <!-- <p>
      当前客户已有催收任务:
      <span
        v-for="item in existedTodoList"
        :key="item.csfs"
      >{{ $selectDictLabel($store.getters.dictData.collection_type_todo || [],item.csfs) }}</span>
    </p>-->
    <el-form>
      <el-row>
        <el-form-item label="当前客户已有催收任务: ">
          <el-tag
            v-for="item in existedTodoList"
            :key="item.csfs"
          >{{ $selectDictLabel($store.getters.dictData.collection_type_todo || [],item.csfs) }}</el-tag>
        </el-form-item>
      </el-row>
    </el-form>
    <el-form ref="ruleForm" :model="talkParams" label-position="right" label-width="120px">
      <!-- 多选时才显示 -->
      <el-row v-if="selectRows.length>1" :gutter="24">
        <el-col :span="24">
          <el-form-item label="选中的客户">
            <el-input type="textarea" :value="selectdCustomName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="催收方式">
            <el-select v-model="urgeType" placeholder="请选择催收方式" clearable style="width:80%" @change="urgeTypeChange">
              <el-option
                v-for="dict in collectTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
                :disabled="dict.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 面谈催收 -->
      <el-row v-if="urgeType==='6'" :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="面谈开始时间"
            prop="cskssj"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-date-picker
              v-model="talkParams.cskssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始时间"
              style="width:80%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="面谈结束时间"
            prop="csjssj"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-date-picker
              v-model="talkParams.csjssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束时间"
              style="width:80%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="面谈地址"
            prop="csdzlx"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzlx"
              placeholder="请选择面谈地址"
              clearable
              style="width:80%"
            >
              <el-option
                v-for="dict in $store.getters.dictData.talk_adress_type"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 地址类型为其他地址时才需要显示 -->
      <el-row v-if="urgeType==='6' && talkParams.csdzlx==='3'" :gutter="24">
        <!-- 选中数据只有一条时才是下拉框，否则是输入框 -->
        <el-col v-if="selectRows.length===1" :span="8">
          <el-form-item
            label="选择地址"
            prop="csxxdz"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-select
              v-model="talkParams.csxxdz"
              placeholder="请选择面谈地址"
              clearable
              style="width:80%"
              @change="talkAddressChange"
            >
              <el-option
                v-for="dict in addressOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="small"
              style="position:absolute;margin-left:5px"
              @click="clickAddAddress"
            >地址维护</el-button>
          </el-form-item>
        </el-col>
        <el-col v-else :span="8">
          <el-form-item label="请输入地址">
            <el-input v-model="talkParams.csxxdz" placeholder="请输入地址" clearable style="width:80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="省"
            prop="csdzSheng"
            :rules="[
                { required: true, message: '此项必填,请前往地址维护补充地址信息' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzSheng"
              placeholder="请选择省"
              clearable
              style="width:80%"
              disabled
            >
              <el-option
                v-for="dict in provinceOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="市"
            prop="csdzShi"
            :rules="[
                { required: true, message: '此项必填,请前往地址维护补充地址信息' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzShi"
              placeholder="请选择市"
              clearable
              style="width:80%"
              disabled
            >
              <el-option
                v-for="dict in cityOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="区/县"
            prop="csdzQu"
            :rules="[
                { required: true, message: '此项必填,请前往地址维护补充地址信息' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzQu"
              placeholder="请选择区/县"
              clearable
              style="width:80%"
              disabled
            >
              <el-option
                v-for="dict in areaOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 发函催收 -->
      <el-row v-if="urgeType==='4'" :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="函件类型"
            prop="hjlx"
            :rules="[
                      { required: true, message: '此项必填' }
                    ]"
            >
            <el-select
              v-model="talkParams.hjlx"
              placeholder="请选择函件类型"
              clearable
              @change="lettersChange"
            >
              <el-option
                v-for="dict in $store.getters.dictData.letters_type"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="函件模板"
            prop="hjmbid"
            :rules="[
                      { required: true, message: '此项必填' }
                    ]"
            >
            <el-select v-model="talkParams.hjmbid" placeholder="请选择函件模板" clearable>
              <el-option
                v-for="dict in filesOption"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="任务要求时间"
            prop="fhsj"
            :rules="[
                      { required: true, message: '此项必填' }
                    ]"
            >
            <el-date-picker
              v-model="talkParams.fhsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 上门催收 -->
      <el-row v-if="urgeType==='3'" :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="上门开始时间"
            prop="cskssj"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-date-picker
              v-model="talkParams.cskssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              style="width:70%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="上门结束时间"
            prop="csjssj"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-date-picker
              v-model="talkParams.csjssj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              style="width:70%"
            />
          </el-form-item>
        </el-col>
        <!-- 选中数据只有一条时才是下拉框，否则是输入框 -->
        <el-col v-if="selectRows.length===1" :span="8">
          <el-form-item
            label="选择地址"
            prop="csxxdz"
            :rules="[
                { required: true, message: '此项必填' }
              ]"
          >
            <el-select
              v-model="talkParams.csxxdz"
              placeholder="请选择面谈地址"
              clearable
              style="width:70%"
              @change="talkAddressChange"
            >
              <el-option
                v-for="dict in addressOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="small"
              style="position:absolute;margin-left:5px"
              @click="clickAddAddress"
            >地址维护</el-button>
          </el-form-item>
        </el-col>
        <el-col v-else :span="8">
          <el-form-item label="请输入地址">
            <el-input v-model="talkParams.csxxdz" placeholder="请输入地址" clearable style="width:80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="省"
            prop="csdzSheng"
            :rules="[
                { required: true, message: '此项必填,请前往地址维护补充地址信息' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzSheng"
              placeholder="请选择省"
              clearable
              style="width:70%"
              disabled
            >
              <el-option
                v-for="dict in provinceOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="市"
            prop="csdzShi"
            :rules="[
                { required: true, message: '此项必填,请前往地址维护补充地址信息' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzShi"
              placeholder="请选择市"
              clearable
              style="width:70%"
              disabled
            >
              <el-option
                v-for="dict in cityOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="区/县"
            prop="csdzQu"
            :rules="[
                { required: true, message: '此项必填,请前往地址维护补充地址信息' }
              ]"
          >
            <el-select
              v-model="talkParams.csdzQu"
              placeholder="请选择区/县"
              clearable
              style="width:70%"
              disabled
            >
              <el-option
                v-for="dict in areaOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" type="flex" justify="center">
        <el-col :span="4">
          <el-button icon="el-icon-check" type="success" size="small" @click="save">保存</el-button>
          <!-- <el-button icon="el-icon-refresh" type="primary" size="small">重置</el-button> -->
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="openAddDialog"
      width="90%"
      append-to-body
      style="height:95%; overflow:auto"
    >
      <address-select
        :form-data="addressDialogData"
        @cancelAddressSelect="openAddDialog=false"
        @AddressSelectSuccess="AddressSelectSuccess"
      ></address-select>
    </el-dialog>
  </div>
</template>

<script>
import AddressSelect from '@/components/AddressSelect';
import { commonApi } from '@/api/common'
import { customInformationApi } from '@/api/customInformation'
import { toDealApi } from '@/api/urge/register';
export default {
  name: 'RuoyiUiTodeal',

  components: { AddressSelect },

  directives: {},
  props: {
    selectRows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openAddDialog: false,
      filesOption: [],
      urgeType: '',
      talkParams: {
        cskssj: '',
        csjssj: '',
        csdzSheng: '',
        csdzShi: '',
        csdzQu: ''
      },
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      addressOptions: [],
      formLis: [
        { label: '关系' },
        {
          label: '省', type: 'select', dictOptions: [
            { dictLabel: '湖南省', dictValue: 1 },
            { dictLabel: '湖南省', dictValue: 1 }
          ]
        },
        {
          label: '市', type: 'select', dictOptions: [
            { dictLabel: '长沙市', dictValue: 1 },
            { dictLabel: '娄底市', dictValue: 1 }
          ]
        },
        {
          label: '区/县', type: 'select', dictOptions: [
            { dictLabel: '长沙市', dictValue: 1 },
            { dictLabel: '娄底市', dictValue: 1 }
          ]
        },
        { label: '地址' },
        { label: '备注' }
      ],
      addressDialogData: [
        {
          certNo: '',
          custRelationship: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          address: '',
          remark: ''
        }
      ],
      formData: {

      },
      existedTodoList: []
    };
  },
  computed: {
    selectdCustomName: function () {
      const tempList = []
      this.selectRows.map(item => {
        tempList.push(item.xingming)
      })
      const tempStr = tempList.toString()
      return tempStr
    },
    collectTypeOptions: function () {
      console.log('genxing');
      const list = this.$store.getters.dictData.collection_type_todo
      list.map((item, index) => {
        // this.existedTodoList.some(ele => {
        //   console.log(ele.cslx, item.dictValue);
        //   ele.cslx === item.dictValue
        // })
        if (item.dictValue === '5') {
          list.splice(index, 1)
        }
        if (this.existedTodoList.some(ele => ele.csfs === item.dictValue)) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
      return list
    }
  },
  watch: {
    'talkParams.csdzSheng': function (id) {
      commonApi.getCity(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.cityName
            item.dictValue = item.cityId
          })
          this.cityOptions = res.data
        }
      })
    },
    'talkParams.csdzShi': function (id) {
      commonApi.getArea(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.districtName
            item.dictValue = item.districtId
          })
          this.areaOptions = res.data
        }
      })
    }
  },
  mounted() {
    this.queryExistedTodoType()
    commonApi.getProvince().then(res => {
      if (res.code === 200) {
        res.data.map(item => {
          item.dictLabel = item.provinceName
          item.dictValue = item.provinceId
        })
        this.provinceOptions = res.data
      }
    })
    // 如果只选择了一条数据
    if (this.selectRows.length === 1) {
      customInformationApi.getAddressInfoByCertNo(this.selectRows[0].zjhm).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              item.dictLabel = item.address
              item.dictValue = item.id
            })
            this.addressOptions = res.data
          }
        }
      })
    }
  },

  methods: {
    queryExistedTodoType() {
      const tempList = []
      this.selectRows.map(item => {
        tempList.push(item.id)
      })
      const data = {
        cslx: this.selectRows[0].cslx,
        ids: tempList
      }
      toDealApi.queryExistedTodoType(data).then(res => {
        if (res.code === 200) {
          this.existedTodoList = res.data
        }
      })
    },
    clickAddAddress() {
      // 查询客户已有的地址数据
      customInformationApi.getAddressInfoByCertNo(this.selectRows[0].zjhm).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              delete item.params
            })
            this.addressDialogData = res.data
          }
        }
      })
      this.openAddDialog = true;
    },
    // 地址弹出框保存
    AddressSelectSuccess() {
      // 刷新地址下拉列表
      customInformationApi.getAddressInfoByCertNo(this.selectRows[0].zjhm).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            res.data.map(item => {
              item.dictLabel = item.address
              item.dictValue = item.id
            })
            this.addressOptions = res.data
          }
        }
      })
      this.openAddDialog = false
    },
    // 面谈地址切换
    talkAddressChange(id) {
      const SelectAddressData = this.addressOptions.find(item => item.id === id)
      this.talkParams.csdzSheng = SelectAddressData.provinceId
      this.talkParams.csdzShi = SelectAddressData.cityId
      this.talkParams.csdzQu = SelectAddressData.districtId
    },
    // 函件类型切换
    lettersChange(id) {
      toDealApi.getHjmbByDbId({ categoryId: id }).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.templateName
            item.dictValue = item.templateNo
          })
          this.filesOption = res.data
        }
      })
    },
    urgeTypeChange() {
      this.$refs.ruleForm.resetFields()
    },
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.selectRows.length === 1) {
            const tempData = this.talkParams
            tempData.csfs = this.urgeType
            tempData.taskId = this.selectRows[0].id
            toDealApi.saveTaskBySingle(tempData).then(res => {
              if (res.code === 200) {
                this.$msgSuccess('添加成功')
                this.$emit('saveSuccess');
              }
            })
          } else {
            const tempData = this.talkParams
            const tempList = []
            tempData.csfs = this.urgeType
            this.selectRows.map(item => {
              tempData.taskId = item.id
              tempList.push(tempData)
            })
            tempData.taskId = this.selectRows[0].id
            toDealApi.saveTaskByMultiple(tempList).then(res => {
              if (res.code === 200) {
                this.$msgSuccess('添加成功')
                this.$emit('saveSuccess');
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
