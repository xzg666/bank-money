<template>
  <div class="app-container">
    <urge-information :form-list="formList" :form-data="formData" />
  </div>
</template>

<script>
import UrgeInformation from '../../urgeForm/index.vue';
export default {
  name: 'Message',

  components: { UrgeInformation },

  directives: {},

  data() {
    return {
      formList: [
        {
          label: '催收方式', type: 'select', model: 'urgeType', dictOptions: [
            { dictLabel: '经济紧张', dictValue: 1 },
            { dictLabel: '其他', dictValue: 2 }
          ]
        },
        { label: '催收方式备注', model: 'urgeTypeMark', span: '18', inputType: 'textarea' },
        { label: '联系对象', model: 'contactTarge' },
        {
          label: '是否联系成功', type: 'select', model: 'isContact', dictOptions: [
            { dictLabel: '经济紧张', dictValue: 1 },
            { dictLabel: '其他', dictValue: 2 }
          ]
        },
        { label: '聊天条数', model: 'talkNumber' },
        { label: '工作量', model: 'workload' },
        {
          label: '拖欠原因', type: 'select', model: 'delayReason', dictOptions: [
            { dictLabel: '经济紧张', dictValue: 1 },
            { dictLabel: '其他', dictValue: 2 }
          ]
        },
        { label: '拖欠原因说明', model: 'delayReasonText', span: '18', inputType: 'textarea' },
        {
          label: '家庭月收入', type: 'select', model: 'homeIncome', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '个人月收入', type: 'select', model: 'personIncome', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '催收日期', type: 'date', model: 'urgeData'
        },
        {
          label: '还款意愿', type: 'select', model: 'paybackDesire', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '预约还款日', type: 'date', model: 'appointmentDate'
        },
        { label: '预约还款金额', model: 'appointmentNumber' },
        {
          label: '风险程度', type: 'select', model: 'riskDegree', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        {
          label: '预警时间', type: 'date', model: 'preventionDate'
        },
        {
          label: '预警方式', type: 'select', model: 'preventionType', dictOptions: [
            { dictLabel: '11', dictValue: 1 },
            { dictLabel: '22', dictValue: 2 }
          ]
        },
        { label: '催款描述', model: 'urgeDescribe', inputType: 'textarea', span: '24', rows: '4' }

      ],
      formData: {
        homeIncome: 1,
        personIncome: 1,
        urgeType: 2,
        urgeTypeMark: '',
        isContact: 1,
        talkNumber: '',
        workload: '',
        delayReason: '',
        contactTarge: '',
        delayReasonText: '13333333333',
        urgeData: '',
        paybackDesire: 1,
        appointmentDate: '',
        appointmentNumber: '',
        riskDegree: '',
        preventionDate: '',
        preventionType: '',
        urgeDescribe: '短信模板'
      }
    };
  },

  mounted() {

  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
