<template>
  <div class="app-container">
    <el-form label-position="right" label-width="130px">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="催收方式">
            <el-select
              v-model="urgeType"
              placeholder="请选择催收方式"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in urgeTypeList"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="urgeType===1" :gutter="24">
        <el-col :span="8">
          <el-form-item label="面谈开始时间">
            <el-date-picker
              v-model="talkParams.startDt"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="面谈结束时间">
            <el-date-picker
              v-model="talkParams.endDt"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="面谈地址">
            <el-select
              v-model="talkParams.urgeType"
              placeholder="请选择面谈地址"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择地址">
            <el-select
              v-model="talkParams.urgeType"
              placeholder="请选择面谈地址"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
            <el-button icon="el-icon-edit" type="primary" style="position:absolute;margin-left:5px" @click="clickAddAddress">地址维护</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省">
            <el-select
              v-model="talkParams.province"
              placeholder="请选择省"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市">
            <el-select
              v-model="talkParams.city"
              placeholder="请选择市"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="区/县">
            <el-select
              v-model="talkParams.area"
              placeholder="请选择区/县"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="urgeType===3" :gutter="24">
        <el-col :span="8">
          <el-form-item label="函件类型">
            <el-select
              v-model="talkParams.urgeType"
              placeholder="请选择面谈地址"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="函件模板">
            <el-select
              v-model="talkParams.urgeType"
              placeholder="请选择面谈地址"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务要求时间">
            <el-date-picker
              v-model="talkParams.endDt"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="urgeType===4" :gutter="24">
        <el-col :span="8">
          <el-form-item label="面谈开始时间">
            <el-date-picker
              v-model="talkParams.startDt"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="面谈结束时间">
            <el-date-picker
              v-model="talkParams.endDt"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择地址">
            <el-select
              v-model="talkParams.urgeType"
              placeholder="请选择面谈地址"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
            <el-button icon="el-icon-edit" type="primary" style="position:absolute;margin-left:5px" @click="clickAddAddress">地址维护</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省">
            <el-select
              v-model="talkParams.province"
              placeholder="请选择省"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市">
            <el-select
              v-model="talkParams.city"
              placeholder="请选择市"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="区/县">
            <el-select
              v-model="talkParams.area"
              placeholder="请选择区/县"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in statusOptions"
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
          <el-button icon="el-icon-check" type="success" size="small">保存</el-button>
          <el-button icon="el-icon-refresh" type="primary" size="small">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="openAddDialog" width="90%" append-to-body style="height:95%; overflow:auto">
      <free-form :form-list="formLis" :form-data="formData" />
    </el-dialog>
  </div>
</template>

<script>
import FreeForm from '@/components/FreeForm/index';
export default {
  name: 'RuoyiUiTodeal',

  components: { FreeForm },

  directives: {},

  data() {
    return {
      openAddDialog: false,
      urgeTypeList: [
        { dictLabel: '面谈催收', dictValue: 1 },
        { dictLabel: '诉讼催收', dictValue: 2 },
        { dictLabel: '发函催收', dictValue: 3 },
        { dictLabel: '上门催收', dictValue: 4 }
      ],
      statusOptions: [],
      urgeType: 1,
      talkParams: {
        startDt: '',
        endDt: '',
        province: '',
        city: '',
        area: ''
      },
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
      formData: {

      }
    };
  },

  mounted() {

  },

  methods: {
    clickAddAddress() {
      this.openAddDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
