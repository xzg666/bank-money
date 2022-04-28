<template>
  <div class="app-container">
    <p v-if="number === 0" style="text-align:center">当前【面谈】无任务,请点击"添加代办"增加任务!</p>
    <div v-else>
      <div v-if="overDateShow">
        <span>逾期催收</span>
        <el-divider />
        <urge-information
         :form-list="formList"
        :form-data="overDateFormData"
        :rules="formRules"
        :show-upload="true"
        @save="saveOverDate"
        />
      </div>
      <div v-if="insteadShow">
        <span>代偿催收</span>
        <el-divider />
        <urge-information
         :form-list="formList"
        :form-data="insteadFormData"
        :rules="formRules"
        :show-upload="true"
        @save="saveInstead"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UrgeInformation from '../../urgeForm/index.vue';
import { registerBody } from '@/api/urge/register';
import eventBus from '../../eventBus'
import moment from 'moment'
export default {
  name: 'Talk',
  components: { UrgeInformation },

  directives: {},
  props: {
    number: {
      type: Number,
      default() {
        return 0;
      }
    },
    allDicts: {
      type: Object,
      default() {
        return {};
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    },
    addressOptions: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      overDateShow: false,
      insteadShow: false,
      overDateFormData: {
        jtysr: null,
        grysr: null,
        tqyy: null,
        lxdx: null,
        tqyysm: null,
        lxhm: null,
        csdzlx: null,
        csdzSheng: null,
        csdzShi: null,
        csdzQu: null,
        csxxdz: null,
        csrq: moment(new Date()).format('YYYY-MM-DD'),
        hkyy: null,
        yyhkr: null,
        yyhkje: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        dbyqwcsj: null,
        csms: null
      },
      insteadFormData: {
        jtysr: null,
        grysr: null,
        tqyy: null,
        lxdx: null,
        tqyysm: null,
        lxhm: null,
        csdzlx: null,
        csdzSheng: null,
        csdzShi: null,
        csdzQu: null,
        csxxdz: null,
        csrq: moment(new Date()).format('YYYY-MM-DD'),
        hkyy: null,
        yyhkr: null,
        yyhkje: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        dbyqwcsj: null,
        csms: null
      },
      formRules: {
        csrq: [{ required: true, message: '请选择催收日期' }],
        csms: [{ required: true, message: '请输入催收描述' }]
      },
      cityDicts: [],
      areaDicts: []
    };
  },
  computed: {
    formList() {
      return [
        {
          label: '拖欠原因',
          type: 'select',
          model: 'tqyy',
          dictOptions: this.allDicts.delay_reason
        },
        {
          label: '拖欠原因说明',
          model: 'tqyysm',
          span: 18,
          inputType: 'textarea'
        },
        {
          label: '家庭月收入',
          type: 'select',
          model: 'jtysr',
          dictOptions: this.allDicts.home_income
        },
        {
          label: '个人月收入',
          type: 'select',
          model: 'grysr',
          dictOptions: this.allDicts.personal_income
        },
        {
          label: '面谈开始时间',
          type: 'date',
          model: 'cskssj',
          disabled: true
        },
        { label: '结束时间', type: 'date', model: 'csjssj', disabled: true },
        {
          label: '地址类型',
          type: 'select',
          model: 'csdzlx',
          dictOptions: this.allDicts.talk_adress_type,
          disabled: true
        },
        {
          label: '省',
          type: 'select',
          model: 'csdzSheng',
          dictOptions: this.allDicts.province,
          disabled: true
        },
        {
          label: '市',
          type: 'select',
          model: 'csdzShi',
          dictOptions: this.cityDicts,
          disabled: true
        },
        {
          label: '区',
          type: 'select',
          model: 'csdzQu',
          dictOptions: this.areaDicts,
          disabled: true
        },
        {
          label: '面谈地址',
          model: 'csxxdz',
          span: 24,
          inputType: 'textarea',
          disabled: true
        },
        {
          label: '催收日期',
          type: 'date',
          model: 'csrq',
          disabledDate: 'lt'
        },
        {
          label: '还款意愿',
          type: 'select',
          model: 'hkyy',
          dictOptions: this.allDicts.repayment_attitude
        },
        {
          label: '预约还款日',
          type: 'date',
          model: 'yyhkr',
          disabledDate: 'lt'
        },
        { label: '预约还款金额', model: 'yyhkje' },
        {
          label: '风险程度',
          type: 'select',
          model: 'fxcd',
          dictOptions: this.allDicts.risk_degree
        },
        {
          label: '预警时间',
          type: 'date',
          model: 'yjsj',
          disabledDate: 'lt'
        },
        {
          label: '预警方式',
          type: 'select',
          model: 'yjfs',
          dictOptions: this.allDicts.prevent_type
        },
        {
          label: '要求完成时间',
          type: 'date',
          model: 'dbyqwcsj',
          disabled: true
        },
        {
          label: '催收描述',
          model: 'csms',
          inputType: 'textarea',
          span: 24,
          rows: 4
        }
      ];
    }
  },
  watch: {
    'overDateFormData.csdzSheng': function (id) {
      registerBody.getCity(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.cityName;
            item.dictValue = item.cityId;
          });
          this.cityDicts = res.data;
          console.log('this.cityDicts: ', this.cityDicts);
        }
      });
    },
    'overDateFormData.csdzShi': function (id) {
      registerBody.getArea(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.districtName;
            item.dictValue = item.districtId;
          });
          this.areaDicts = res.data;
          console.log('this.areaDicts: ', this.areaDicts);
        }
      });
    },
    'insteadFormData.csdzSheng': function (id) {
      registerBody.getCity(id).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.cityName;
            item.dictValue = item.cityId;
          });
          this.cityDicts = res.data;
        }
      });
    },
    'insteadFormData.csdzShi': function (id) {
      registerBody.getArea(id).then(res => {
        // console.log('市res: ', res);
        if (res.code === 200) {
          res.data.map(item => {
            item.dictLabel = item.districtName;
            item.dictValue = item.districtId;
          });
          this.areaDicts = res.data;
          // console.log('this.areaDicts: ', this.areaDicts);
        }
      });
    }
  },
  created() {
    // // 获取任务数据 1:逾期
    // this.getTaskByCond('1', res => {
    //   if (Object.keys(res).length > 0) {
    //     this.overDateShow = true;
    //     this.overDateFormData = res;
    //   }
    // });
    // // 获取任务数据 2:代偿
    // this.getTaskByCond('2', res => {
    //   if (Object.keys(res).length > 0) {
    //     this.insteadShow = true;
    //     this.insteadFormData = res;
    //   }
    // });
    const formShowMapObj = {
      '1': 'overDateShow',
      '2': 'insteadShow'
    }
    const formDataMapObj = {
      '1': 'overDateFormData',
      '2': 'insteadFormData'
    }
    const { cslx, id, glid } = this.selectRows
    // 取当前任务状态和数据
    this.getTaskByCond(cslx, id, res => {
      if (Object.keys(res).length > 0) {
        if (!res.csrq) res.csrq = moment(new Date()).format('YYYY-MM-DD')
        this[formShowMapObj[cslx]] = true
        // 反显地址中文
        if (res.csxxdz) {
          res.csxxdz = this.$selectDictLabel(this.addressOptions, res.csxxdz)
        }
        this[formDataMapObj[cslx]] = res;
      }
    })
    // 取关联任务状态和数据
    if (glid) {
      const glcslx = cslx === '1' ? '2' : '1'
      this.getTaskByCond(glcslx, glid, res => {
        if (Object.keys(res).length > 0) {
          if (!res.csrq) res.csrq = moment(new Date()).format('YYYY-MM-DD')
          this[formShowMapObj[glcslx]] = true
          // 反显地址中文
          if (res.csxxdz) {
            res.csxxdz = this.$selectDictLabel(this.addressOptions, res.csxxdz)
          }
          this[formDataMapObj[glcslx]] = res;
        }
      })
    }
  },
  mounted() { },

  methods: {
    // 查询待办数据
    getTaskByCond(cslx, id, cb) {
      const tempData = {
        csfs: '6',
        cslx: cslx,
        fpclrzh: this.$store.state.user.name,
        taskId: id
      };
      registerBody.getTaskByCond(tempData).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.dbzt !== '1') {
            // 当前待办任务不需要更新数据库，而是新增一条记录
            delete res.data.id;
          }
          cb(res.data || {});
        } else {
          this.$msgError(res.msg);
        }
      });
    },
    // 保存逾期催收
    saveOverDate() {
      this.overDateFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.id : this.selectRows.glid;
      this.overDateFormData.csfs = '6';
      this.overDateFormData.cslx = '1';
      this.overDateFormData.dbzt = '2'
      this.overDateFormData.djrxm = this.$store.state.user.nickName
      this.overDateFormData.djrzh = this.$store.state.user.name
      this.overDateFormData.dblx = this.overDateFormData.dblx || '2'
      this.overDateFormData.ywlx = this.overDateFormData.ywlx || this.selectRows.ywlx
      const tempData = {
        fileList: this.overDateFormData.fileList || [],
        registerEntity: this.overDateFormData
      };
      registerBody.saveTelephoneTask(tempData).then(response => {
        if (response.code === 200) {
          this.$msgSuccess(response.msg)
          eventBus.$emit('urgeHisChange')
        } else {
          this.$msgError(response.msg)
        }
      });
    },
    // 保存代偿催收
    saveInstead() {
      this.insteadFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.glid : this.selectRows.id;
      this.insteadFormData.csfs = '6'
      this.insteadFormData.cslx = '2'
      this.insteadFormData.dbzt = '2'
      this.insteadFormData.djrxm = this.$store.state.user.nickName
      this.insteadFormData.djrzh = this.$store.state.user.name
      this.insteadFormData.dblx = this.insteadFormData.dblx || '2'
      this.insteadFormData.ywlx = this.insteadFormData.ywlx || this.selectRows.ywlx
      const tempData = {
        fileList: this.insteadFormData.fileList || [],
        registerEntity: this.insteadFormData
      };
      registerBody.saveTelephoneTask(tempData).then(response => {
        if (response.code === 200) {
          this.$msgSuccess(response.msg)
          eventBus.$emit('urgeHisChange')
        } else {
          this.$msgError(response.msg)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
