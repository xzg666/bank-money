<template>
  <div class="app-container">
    <div v-if="overDateShow">
      <span>逾期催收</span>
      <el-divider />
      <urge-information
        :form-list="formList"
        :form-data="overDateFormData"
        :rules="overDataRules"
        @save="saveOverDate"
      />
    </div>
    <div v-if="insteadShow">
      <span>代偿催收</span>
      <el-divider />
      <urge-information
        :form-list="formList"
        :form-data="insteadFormData"
        :rules="insteadRules"
        @save="saveInstead"
      />
    </div>
  </div>
</template>

<script>
import UrgeInformation from '../../urgeForm/index.vue';
import { registerBody } from '@/api/urge/register';
import eventBus from '../../eventBus'
import moment from 'moment'
export default {
  name: 'Telephone',
  components: { UrgeInformation },
  directives: {},
  inject: ['taskStatus'],
  props: {
    overDateData: {
      type: Object,
      default: () => { }
    },
    allDicts: {
      type: Object,
      default() {
        return {};
      }
    },
    taskId: {
      type: Number,
      default() {
        return 13;
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      userName: this.$store.state.user.name,
      // 是否显示逾期表单
      overDateShow: false,
      connectList: [
        { dictLabel: '', dictValue: '' }
      ],
      overDateFormData: {
        jtysr: null,
        grysr: null,
        tqyy: null,
        lxdx: null,
        tqyysm: null,
        lxhm: null,
        sfjt: null,
        wjtyy: null,
        wjtbz: null,
        csrq: moment(new Date()).format('YYYY-MM-DD'),
        hkyy: null,
        yyhkr: null,
        yyhkje: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        dbyqwcsj: null,
        dxnr: null
      },
      // 是否显示代偿表单
      insteadShow: false,
      insteadFormData: {
        jtysr: null,
        grysr: null,
        tqyy: null,
        lxdx: null,
        tqyysm: null,
        lxhm: null,
        sfjt: null,
        wjtyy: null,
        wjtbz: null,
        csrq: moment(new Date()).format('YYYY-MM-DD'),
        hkyy: null,
        yyhkr: null,
        yyhkje: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        dbyqwcsj: null,
        dxnr: null
      },
      // 致电对象列表
      telephonelist: [],
      overDataRules: {
        sfjt: [{ required: true, message: '请选择是否接通' }],
        lxdx: [{ required: true, message: '请输入致电对象' }],
        lxhm: [{ required: true, message: '请输入致电号码' }],
        csrq: [{ required: true, message: '请输入催收日期' }]
        // tqyy: [{ required: true, message: '请选择是否接通', trigger: 'change' }],
      },
      insteadRules: {
        sfjt: [{ required: true, message: '请选择是否接通' }],
        lxdx: [{ required: true, message: '请输入致电对象' }],
        lxhm: [{ required: true, message: '请输入致电号码' }],
        csrq: [{ required: true, message: '请输入催收日期' }]
      }
    };
  },
  computed: {
    formList() {
      return [
        {
          label: '是否接通',
          type: 'select',
          model: 'sfjt',
          dictOptions: this.allDicts.yes_no
        },
        {
          label: '未接通原因',
          type: 'select',
          model: 'wjtyy',
          dictOptions: this.allDicts.unconnect_reason
        },
        {
          label: '未接通备注',
          model: 'wjtbz',
          span: 12,
          inputType: 'textarea'
        },
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
          label: '致电对象',
          type: 'select',
          model: 'lxdx',
          dictOptions: this.connectList
        },
        { label: '致电号码', model: 'lxhm' },
        {
          label: '催收日期',
          type: 'date',
          model: 'csrq',
          disabledDate: 'gt'
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
    // rules: function () {
    //   const rules0bj = {
    //     sfjt: [{ required: true, message: '请选择是否接通', trigger: 'change' }]
    //   }
    //   return rules0bj
    // }
  },
  watch: {
    'overDateFormData.lxdx'(newValue, old) {
      console.log('newValue: ', newValue);
      this.overDateFormData.lxhm = this.connectList.find(
        item => item.lxdxValue === newValue
      ).lxhm;
    },
    'overDateFormData.sfjt'(newValue) {
      console.log('newValue: ', newValue);
      if (newValue === '1') {
        this.overDataRules = {
          sfjt: [{ required: true, message: '请选择是否接通' }],
          tqyy: [{ required: true, message: '请选择拖欠原因' }],
          hkyy: [{ required: true, message: '请选择还款意愿' }],
          csms: [{ required: true, message: '请输入催收描述' }]
        }
      } else {
        this.overDataRules = {
          sfjt: [{ required: true, message: '请选择是否接通' }],
          wjtyy: [{ required: true, message: '请输入未接通原因' }]
        }
      }
    },
    'overDateFormData.tqyy'(newValue) {
      console.log('newValue: ', newValue);
      if (newValue === '4') {
        this.$set(this.overDataRules, 'tqyysm', [{ required: true, message: '请输入拖欠原因' }]);
      } else {
        this.$set(this.overDataRules, 'tqyysm', [{ required: false, message: '请输入拖欠原因' }]);
      }
    },
    'insteadFormData.sfjt'(newValue) {
      console.log('newValue: ', newValue);
      if (newValue === '1') {
        this.insteadRules = {
          sfjt: [{ required: true, message: '请选择是否接通' }],
          tqyy: [{ required: true, message: '请选择拖欠原因' }],
          hkyy: [{ required: true, message: '请选择还款意愿' }],
          csms: [{ required: true, message: '请输入催收描述' }],
          lxdx: [{ required: true, message: '请输入致电对象' }],
          lxhm: [{ required: true, message: '请输入致电号码' }],
          csrq: [{ required: true, message: '请输入催收日期' }]
        }
      } else {
        this.insteadRules = {
          sfjt: [{ required: true, message: '请选择是否接通' }],
          wjtyy: [{ required: true, message: '请输入未接通原因' }],
          lxdx: [{ required: true, message: '请输入致电对象' }],
          lxhm: [{ required: true, message: '请输入致电号码' }],
          csrq: [{ required: true, message: '请输入催收日期' }]
        }
      }
    },
    'insteadFormData.tqyy'(newValue) {
      if (newValue === '4') {
        this.$set(this.insteadRules, 'tqyysm', [{ required: true, message: '请输入拖欠原因' }]);
      } else {
        this.$set(this.insteadRules, 'tqyysm', [{ required: false, message: '请输入拖欠原因' }]);
      }
    }
  },
  created() {
    // 获取致电对象
    // const telephoneList = [
    //   {
    //     lxhm: '17680144682111',
    //     lxdxLable: '11',
    //     lxdxValue: '11'
    //   }
    // ];
    this.judgeTaskStauts(this.selectRows)
    registerBody.getConectList(this.selectRows.zjhm).then(res => {
      if (res.code === 200) {
        // this.telephonelist = res.data
        res.data.map(item => {
          item.dictLabel = item.lxdxLable;
          item.dictValue = item.lxdxValue;
        });
        this.connectList = res.data
      }
    })
    // this.telephonelist = telephoneList;
    // telephoneList.map(item => {
    //   item.dictLabel = item.lxdxLable;
    //   item.dictValue = item.lxdxValue;
    // });
    // this.$setSelectOptions(this.formList, telephoneList, '致电对象');
    // this.selectRows.glid && this.getTaskStatus(this.selectRows.glid);
    // // 获取任务数据 1:逾期
    // this.getTaskByCond('1', res => {
    //   this.overDateFormData = res;
    // });
    // // 获取任务数据 2:代偿
    // this.getTaskByCond('2', res => {
    //   this.insteadFormData = res;
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
    this[formShowMapObj[cslx]] = true
    // 取当前任务状态和数据
    this.getTaskByCond(cslx, id, res => {
      if (Object.keys(res).length > 0) {
        if (!res.csrq) res.csrq = moment(new Date()).format('YYYY-MM-DD')
        this[formDataMapObj[cslx]] = res;
      }
    })
    // 取关联任务状态和数据
    if (glid) {
      const glcslx = cslx === '1' ? '2' : '1'
      this[formShowMapObj[glcslx]] = true
      this.getTaskByCond(glcslx, glid, res => {
        if (Object.keys(res).length > 0) {
          if (!res.csrq) res.csrq = moment(new Date()).format('YYYY-MM-DD')
          this[formDataMapObj[glcslx]] = res;
        }
      })
    }
  },
  mounted() { },

  methods: {
    // 保存逾期催收
    saveOverDate() {
      this.overDateFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.id : this.selectRows.glid;
      if (this.overDateFormData.dbzt && this.overDateFormData.dbzt === '2') {
        this.overDateFormData.id = null
      }
      this.overDateFormData.csfs = '2';
      this.overDateFormData.cslx = '1';
      this.overDateFormData.dbzt = '2'
      this.overDateFormData.djrxm = this.$store.state.user.nickName
      this.overDateFormData.djrzh = this.$store.state.user.name
      this.overDateFormData.dblx = this.overDateFormData.dblx || '2'
      this.overDateFormData.ywlx = this.overDateFormData.ywlx || this.selectRows.ywlx
      if (!this.overDateFormData.id) {
        this.overDateFormData.fqfs = '2'
        this.overDateFormData.fpclrzh = this.$store.state.user.name
      }
      const tempData = {
        fileList: [],
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
    saveInstead(data) {
      data.taskId = this.selectRows.cslx === '1' ? this.selectRows.glid : this.selectRows.id;
      if (this.insteadFormData.dbzt && this.insteadFormData.dbzt === '2') {
        this.insteadFormData.id = null
      }
      data.csfs = '2';
      data.cslx = '2';
      data.dbzt = '2'
      data.djrxm = this.$store.state.user.nickName
      data.djrzh = this.$store.state.user.name
      data.dblx = this.insteadFormData.dblx || '2'
      data.ywlx = this.insteadFormData.ywlx || this.selectRows.ywlx
      if (!this.insteadFormData.id) {
        data.fqfs = '2'
        data.fpclrzh = this.$store.state.user.name
      }
      const tempData = {
        fileList: [],
        // registerEntity: this.insteadFormData
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
    },
    // 查询待办数据
    getTaskByCond(cslx, id, cb) {
      const tempData = {
        csfs: '2',
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
    // 查询任务状态
    getTaskStatus(taskId) {
      // 获取任务状态
      registerBody.getTaksStatusByTaskId(taskId).then(res => {
        if (res.code === 200 && res.data) {
          const resData = res.data;
          this.judgeTaskStauts(resData)
        }
      });
    },
    judgeTaskStauts(resData) {
      if (resData.cslx === '1') {
        // 当前任务是逾期
        if ('3,4,6,7'.indexOf(resData.rwzt) > -1) {
          // 当前任务已完成或取消
          this.overDateShow = false;
        }
      } else {
        // 当前任务是代偿
        if ('3,4,6,7'.indexOf(resData.rwzt) > -1) {
          // 当前任务已完成或取消
          this.insteadShow = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
