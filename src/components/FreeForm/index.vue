<template>
  <div class="app-container">
      <el-form label-position="right" label-width="130px">
          <div v-for="(item,index) in formData" :key="index" style="width:100%;display:flex;flex-wrap:wrap" class="free_form_container">
              <el-col v-for="(ele) in formList" :key="ele.model" :span="item.span || 6">
                  <el-form-item :label="ele.label">
                    <el-input
                    v-if="!ele.type || ele.type == 'input'"
                    v-model="formData[index][ele.model]"
                    :placeholder="`请输入${ele.label}`"
                    :type="ele.inputType || 'text'"
                    :rows="ele.rows || 1"
                    :disabled="ele.disabled"
                   ></el-input>
                   <el-select
                        v-if="ele.type=='select'"
                        v-model="formData[index][ele.model]"
                        :value='formData[index][ele.model]'
                        :disabled="ele.disabled"
                        v-on="$listeners"
                        @change="$emit('change', $event)"
                    >
                       <el-option
                        v-for="option in ele.dictOptions"
                        :key="option.dictLabel"
                        :label="option.dictLabel"
                        :value="option.dictValue"
                       >
                       </el-option>
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
      <slot name="operate"></slot>
  </div>
</template>

<script>
export default {
  name: 'FreeForm',
  model: {
    prop: 'formData',
    event: 'change'
  },
  props: {
    formList: {
      type: Array,
      default: () => { }
    },
    formData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      itemList: [
        {}
      ],
      queryParams: {
        urgeType: ''
      },
      tempDataList: [],
      statusOptions: [],
      radio: 0
    }
  },
  watch: {
    radio: function (params) {
      this.formData.map((item, index) => {
        if (index === params) {
          item.isDefault = '1'
        } else {
          item.isDefault = '0'
        }
      })
    },
    formData: function (data) {
      // 初始化是否默认单选框
      data.map((item, index) => {
        if (item.isDefault === '1') {
          this.radio = index
        }
      })
    }
  },
  created() {

  },
  methods: {
    clickAdd() {
      const tempObj = JSON.parse(JSON.stringify(this.formData[0]))
      for (const key in tempObj) {
        if (key !== 'certNo') {
          // 保留certNo的值
          tempObj[key] = ''
        }
      }
      this.formData.push(tempObj)
    },
    clickDelete() {
      if (this.formData.length === 1) {
        this.radio = 0
        this.formData[0].isDefault = '1'
        return
      }
      this.formData.pop()
    },
    save() {

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