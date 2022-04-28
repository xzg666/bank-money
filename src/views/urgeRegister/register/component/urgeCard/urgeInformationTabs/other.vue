<template>
  <div class="app-container">
    <div v-if="overDateShow">
      <span>逾期催收</span>
      <el-divider />
      <urge-information
       :form-list="formList"
      :form-data="overDateFormData"
      :rules="formRules"
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
      @save="saveInstead"
      />
    </div>
  </div>
</template>

<script>
import UrgeInformation from '../../urgeForm/index.vue';
import { registerBody } from '@/api/urge/register';
import moment from 'moment'
import eventBus from '../../eventBus'
export default {
  name: 'Other',

  components: { UrgeInformation },

  directives: {},
  inject: ['taskStatus'],
  props: {
    allDicts: {
      type: Object,
      default() {
        return {

        }
      }
    },
    selectRows: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      overDateShow: false,
      insteadShow: false,
      overDateFormData: {
        jtysr: null,
        grysr: null,
        csfs: null,
        csfsbz: null,
        sflxcg: null,
        ltts: null,
        gzl: null,
        tqyy: null,
        lxdx: null,
        tqyysm: null,
        csrq: moment(new Date()).format('YYYY-MM-DD'),
        hkyy: null,
        yyhkr: null,
        yyhkje: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        csms: null
      },
      insteadFormData: {
        jtysr: null,
        grysr: null,
        csfs: null,
        csfsbz: null,
        sflxcg: null,
        ltts: null,
        gzl: null,
        tqyy: null,
        lxdx: null,
        tqyysm: null,
        csrq: moment(new Date()).format('YYYY-MM-DD'),
        hkyy: null,
        yyhkr: null,
        yyhkje: null,
        fxcd: null,
        yjsj: null,
        yjfs: null,
        csms: null
      },
      formRules: {
        csfs: [{ required: true, message: '请选择催收方式' }],
        lxdx: [{ required: true, message: '请输入联系对象' }],
        sflxcg: [{ required: true, message: '请选择是否联系成功' }],
        csrq: [{ required: true, message: '请选择催收日期' }],
        csms: [{ required: true, message: '请输入催收描述' }]
      }
    };
  },
  computed: {
    formList() {
      return [
        {
          label: '催收方式', type: 'select', model: 'csfs', dictOptions: this.allDicts.collection_type_other
        },
        { label: '催收方式备注', model: 'csfsbz', span: 18, inputType: 'textarea' },
        { label: '联系对象', model: 'lxdx' },
        {
          label: '是否联系成功', type: 'select', model: 'sflxcg', dictOptions: this.allDicts.yes_no
        },
        { label: '聊天条数', model: 'ltts' },
        { label: '工作量', model: 'gzl' },
        {
          label: '拖欠原因', type: 'select', model: 'tqyy', dictOptions: this.allDicts.delay_reason
        },
        { label: '拖欠原因说明', model: 'tqyysm', span: 18, inputType: 'textarea' },
        {
          label: '家庭月收入', type: 'select', model: 'jtysr', dictOptions: this.allDicts.home_income
        },
        {
          label: '个人月收入', type: 'select', model: 'grysr', dictOptions: this.allDicts.personal_income
        },
        {
          label: '催收日期', type: 'date', model: 'csrq'
        },
        {
          label: '还款意愿', type: 'select', model: 'hkyy', dictOptions: this.allDicts.repayment_attitude
        },
        {
          label: '预约还款日', type: 'date', model: 'yyhkr'
        },
        { label: '预约还款金额', model: 'yyhkje' },
        {
          label: '风险程度', type: 'select', model: 'fxcd', dictOptions: this.allDicts.risk_degree
        },
        {
          label: '预警时间', type: 'date', model: 'yjsj'
        },
        {
          label: '预警方式', type: 'select', model: 'yjfs', dictOptions: this.allDicts.prevent_type
        },
        { label: '催款描述', model: 'csms', inputType: 'textarea', span: 24, rows: 4 }
      ]
    }
  },
  mounted() {
    // // this.getTaskStatus(this.selectRows.id);
    // this.judgeTaskStauts(this.selectRows)
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
    // const formDataMapObj = {
    //   '1': 'overDateFormData',
    //   '2': 'insteadFormData'
    // }
    const { cslx, glid } = this.selectRows
    this[formShowMapObj[cslx]] = true
    // 取关联任务状态和数据
    if (glid) {
      const glcslx = cslx === '1' ? '2' : '1'
      this[formShowMapObj[glcslx]] = true
    }
  },

  methods: {
    // 保存逾期催收
    saveOverDate() {
      this.overDateFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.id : this.selectRows.glid;
      this.overDateFormData.csfs = '10';
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
    saveInstead() {
      this.insteadFormData.taskId = this.selectRows.cslx === '1' ? this.selectRows.glid : this.selectRows.id;
      this.insteadFormData.csfs = '10';
      this.insteadFormData.cslx = '2';
      this.insteadFormData.dbzt = '2';
      this.insteadFormData.djrxm = this.$store.state.user.nickName
      this.insteadFormData.djrzh = this.$store.state.user.name
      this.insteadFormData.dblx = this.insteadFormData.dblx || '2'
      this.insteadFormData.ywlx = this.insteadFormData.ywlx || this.selectRows.ywlx
      if (!this.insteadFormData.id) {
        this.insteadFormData.fqfs = '2'
        this.insteadFormData.fpclrzh = this.$store.state.user.name
      }
      const tempData = {
        fileList: [],
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
    getTaskByCond(cslx, cb) {
      const tempData = {
        csfs: '10',
        cslx: cslx,
        fpclrzh: this.$store.state.user.name,
        taskId: this.selectRows.id
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

<style lang="scss" scoped>
</style>
